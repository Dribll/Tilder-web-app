import 'dotenv/config';
import { spawn } from 'node:child_process';
import crypto from 'node:crypto';
import fs from 'node:fs/promises';
import http from 'node:http';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import express from 'express';
import { Server } from 'socket.io';
import * as pty from 'node-pty';
import simpleGit from 'simple-git';
import { runLocalFile, runWorkspaceFile, syncWorkspaceMirror } from './localRunner.js';
import { createLspBroker } from './server/lsp/broker.js';
import { getAllEditorLanguages, getLspAdapter, NATIVE_EDITOR_LANGUAGES } from './server/lsp/registry.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const appRootDir = process.env.TILDER_APP_ROOT || __dirname;
const distPath = process.env.TILDER_DIST_DIR || path.join(appRootDir, 'dist');
const dataDir = process.env.TILDER_DATA_DIR || path.join(appRootDir, 'data');
const syncStorePath = path.join(dataDir, 'sync-store.json');
const publicBaseUrl = (process.env.PUBLIC_BASE_URL || '').trim().replace(/\/$/, '');
const frontendBaseUrl = (process.env.FRONTEND_BASE_URL || '').trim().replace(/\/$/, '');
const configuredCorsOrigins = String(process.env.CORS_ALLOWED_ORIGINS || '')
  .split(',')
  .map((value) => value.trim().replace(/\/$/, ''))
  .filter(Boolean);
const allowedCorsOrigins = new Set([
  frontendBaseUrl,
  ...configuredCorsOrigins,
  'http://localhost:5173',
  'http://127.0.0.1:5173',
  'http://localhost:4173',
  'http://127.0.0.1:4173',
].filter(Boolean));

const app = express();
app.set('trust proxy', true);

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin(origin, callback) {
      callback(null, isAllowedCorsOrigin(origin));
    },
    methods: ['GET', 'POST'],
    credentials: true,
  },
});
const lspNamespace = io.of('/lsp');

const port = Number(process.env.PORT || 3210);
const shell = os.platform() === 'win32' ? 'powershell.exe' : process.env.SHELL || 'bash';
const shellArgs = os.platform() === 'win32' ? ['-NoLogo'] : [];
const shellCwd = process.env.TILDER_TERMINAL_CWD || appRootDir;
const runnerBaseUrl = process.env.TILDER_RUNNER_URL || 'https://ce.judge0.com';
const gitBinary = process.env.GIT_BINARY || 'git';
const githubSyncRepoName = process.env.TILDER_GITHUB_SYNC_REPO || 'tilder-settings-sync';
const githubSyncFilePath = process.env.TILDER_GITHUB_SYNC_FILE || 'settings-sync.json';
const sessionCookieName = 'tilder.sid';
const sessionPayloadCookieName = 'tilder.session';
const sessionSecretMaterial =
  process.env.TILDER_SESSION_SECRET ||
  process.env.SESSION_SECRET ||
  process.env.GITHUB_CLIENT_SECRET ||
  process.env.MICROSOFT_CLIENT_SECRET ||
  'tilder-session-secret';
const sessionEncryptionKey = crypto.createHash('sha256').update(String(sessionSecretMaterial)).digest();
const sessionTtlMs = 1000 * 60 * 60 * 24 * 30;
const defaultSyncPreferences = {
  syncSettings: true,
  syncLayout: true,
  syncShortcuts: true,
};
const sessions = new Map();
const oauthStates = new Map();
const desktopAuthSessions = new Map();
const remoteWorkspaceSessions = new Map();
const remoteWorkspaceSessionTtlMs = 1000 * 60 * 60;

const providerConfig = {
  github: {
    label: 'GitHub',
    clientId: process.env.GITHUB_CLIENT_ID || '',
    clientSecret: process.env.GITHUB_CLIENT_SECRET || '',
    authorizeUrl: 'https://github.com/login/oauth/authorize',
    tokenUrl: 'https://github.com/login/oauth/access_token',
    scopes: ['read:user', 'user:email', 'repo'],
  },
  microsoft: {
    label: 'Microsoft',
    clientId: process.env.MICROSOFT_CLIENT_ID || '',
    clientSecret: process.env.MICROSOFT_CLIENT_SECRET || '',
    tenantId: process.env.MICROSOFT_TENANT_ID || 'common',
    scopes: ['openid', 'profile', 'email', 'offline_access', 'User.Read'],
  },
};

const commandResolutionCache = new Map();
const commandResolutionTtlMs = 30_000;

app.use(express.json({ limit: '4mb' }));
app.use((request, response, next) => {
  applyCorsHeaders(request, response);

  if (request.method === 'OPTIONS') {
    response.status(isAllowedCorsOrigin(request.get('origin')) ? 204 : 403).end();
    return;
  }

  next();
});

function parseCookieHeader(raw = '') {
  return String(raw || '').split(';').reduce((bucket, entry) => {
    const [key, ...valueParts] = entry.trim().split('=');
    if (!key) {
      return bucket;
    }

    bucket[key] = decodeURIComponent(valueParts.join('=') || '');
    return bucket;
  }, {});
}

function parseCookies(request) {
  return parseCookieHeader(request.headers.cookie || '');
}

function normalizeOrigin(value) {
  try {
    return new URL(String(value || '').trim()).origin;
  } catch {
    return '';
  }
}

function isAllowedCorsOrigin(origin) {
  if (!origin) {
    return true;
  }

  const normalizedOrigin = normalizeOrigin(origin);
  if (!normalizedOrigin) {
    return false;
  }

  if (allowedCorsOrigins.has(normalizedOrigin)) {
    return true;
  }

  const normalizedPublicBaseUrl = normalizeOrigin(publicBaseUrl);
  if (normalizedPublicBaseUrl && normalizedOrigin === normalizedPublicBaseUrl) {
    return true;
  }

  return false;
}

function applyCorsHeaders(request, response) {
  const origin = request.get('origin');
  if (!origin || !isAllowedCorsOrigin(origin)) {
    return;
  }

  response.setHeader('Access-Control-Allow-Origin', origin);
  response.setHeader('Access-Control-Allow-Credentials', 'true');
  response.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  response.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  response.setHeader('Vary', 'Origin');
}

function isLoopbackHostname(hostname) {
  return ['127.0.0.1', '::1', 'localhost'].includes(String(hostname || '').toLowerCase());
}

function getRuntimeModeFromValue(value) {
  try {
    const candidate = String(value || '').includes('://') ? String(value) : `http://${String(value || '').trim()}`;
    const url = new URL(candidate);
    return isLoopbackHostname(url.hostname) ? 'desktop-local' : 'hosted-web';
  } catch {
    return 'hosted-web';
  }
}

function getRuntimeMode(request) {
  const protocol = request.get('x-forwarded-proto') || request.protocol || 'http';
  return getRuntimeModeFromValue(`${protocol}://${request.get('host')}`);
}

function normalizeWorkspaceRoot(workspaceRoot) {
  const candidate = String(workspaceRoot || '').trim();
  if (!candidate) {
    return shellCwd;
  }

  return path.isAbsolute(candidate) ? candidate : shellCwd;
}

function pruneRemoteWorkspaceSessions() {
  const now = Date.now();

  for (const [sessionId, session] of remoteWorkspaceSessions.entries()) {
    if (now - Number(session.updatedAt || 0) <= remoteWorkspaceSessionTtlMs) {
      continue;
    }

    remoteWorkspaceSessions.delete(sessionId);
  }
}

async function upsertRemoteWorkspaceSession(ownerSessionId, payload, existingSessionId = '') {
  pruneRemoteWorkspaceSessions();

  const normalizedPayload = payload && typeof payload === 'object' ? payload : {};
  const snapshot = {
    rootName: String(normalizedPayload.rootName || 'workspace'),
    entries: Array.isArray(normalizedPayload.entries) ? normalizedPayload.entries : [],
  };

  let sessionId = String(existingSessionId || '').trim();
  let existingSession = sessionId ? remoteWorkspaceSessions.get(sessionId) : null;

  if (existingSession && existingSession.ownerSessionId !== ownerSessionId) {
    throw new Error('That remote workspace session does not belong to the current user.');
  }

  if (!existingSession) {
    sessionId = crypto.randomUUID();
  }

  const mirror = await syncWorkspaceMirror({
    rootName: `remote-${sessionId}-${snapshot.rootName}`,
    entries: snapshot.entries,
    preserveGit: true,
  });

  const nextSession = {
    id: sessionId,
    ownerSessionId,
    rootName: snapshot.rootName,
    entriesCount: snapshot.entries.length,
    workspaceRoot: mirror.cwd,
    updatedAt: Date.now(),
  };

  remoteWorkspaceSessions.set(sessionId, nextSession);
  return nextSession;
}

function getRemoteWorkspaceSession(ownerSessionId, sessionId) {
  pruneRemoteWorkspaceSessions();

  const candidateId = String(sessionId || '').trim();
  if (!candidateId) {
    return null;
  }

  const session = remoteWorkspaceSessions.get(candidateId);
  if (!session || session.ownerSessionId !== ownerSessionId) {
    return null;
  }

  session.updatedAt = Date.now();
  return session;
}

function resolveCommandCheckTool() {
  return os.platform() === 'win32'
    ? { command: 'where.exe', args: [] }
    : { command: 'which', args: [] };
}

function resolveCommandOnPath(commandName) {
  const cacheKey = String(commandName || '').trim();
  if (!cacheKey) {
    return Promise.resolve('');
  }

  const cached = commandResolutionCache.get(cacheKey);
  if (cached && Date.now() - cached.checkedAt < commandResolutionTtlMs) {
    return Promise.resolve(cached.result);
  }

  const checker = resolveCommandCheckTool();

  return new Promise((resolve) => {
    const child = spawn(checker.command, [...checker.args, cacheKey], {
      stdio: ['ignore', 'pipe', 'ignore'],
      windowsHide: true,
    });

    let stdout = '';
    const timeout = setTimeout(() => {
      child.kill();
    }, 3000);

    child.stdout.on('data', (chunk) => {
      stdout += chunk.toString();
    });

    child.on('error', () => {
      clearTimeout(timeout);
      commandResolutionCache.set(cacheKey, { checkedAt: Date.now(), result: '' });
      resolve('');
    });

    child.on('close', (code) => {
      clearTimeout(timeout);
      const result = code === 0 ? cacheKey : '';
      commandResolutionCache.set(cacheKey, { checkedAt: Date.now(), result });
      resolve(result);
    });
  });
}

async function resolveInstalledCommand(commands = []) {
  for (const commandName of commands) {
    const resolved = await resolveCommandOnPath(commandName);
    if (resolved) {
      return resolved;
    }
  }

  return '';
}

async function buildEditorCapabilities(runtimeMode) {
  const localRuntime = runtimeMode === 'desktop-local';
  const nativeLanguageIds = new Set(NATIVE_EDITOR_LANGUAGES.map((language) => language.id));
  const languages = {};

  for (const language of getAllEditorLanguages()) {
    if (nativeLanguageIds.has(language.id)) {
      languages[language.id] = {
        languageId: language.id,
        providerType: 'native',
        available: true,
        runtimeMode,
        detail: language.detail || 'Native Monaco language service.',
      };
      continue;
    }

    if (language.supportLevel === 'lsp') {
      const adapter = getLspAdapter(language.id);
      const installedCommand = await resolveInstalledCommand(adapter?.commands || []);
      const serverLabel = adapter?.serverLabel || language.serverLabel || language.id;
      languages[language.id] = {
        languageId: language.id,
        providerType: 'lsp',
        available: Boolean(installedCommand),
        runtimeMode,
        command: installedCommand || adapter?.commands?.[0] || '',
        serverLabel,
        detail:
          installedCommand
            ? localRuntime
              ? `${serverLabel} is available on this machine.`
              : `${serverLabel} is available on the Tilder backend.`
            : localRuntime
              ? `${serverLabel} is not installed on this machine.`
              : `${serverLabel} is not installed on the Tilder backend.`,
      };
      continue;
    }

    languages[language.id] = {
      languageId: language.id,
      providerType: 'basic',
      available: true,
      runtimeMode,
      detail: language.detail || 'Syntax highlighting and basic editor features.',
    };
  }

  return {
    runtimeMode,
    lspBridge: {
      path: '/lsp',
      available: true,
      transport: 'socket.io',
    },
    languages,
  };
}

function parseLspMessages(buffer, onMessage) {
  let offset = 0;

  while (offset < buffer.length) {
    const headerEnd = buffer.indexOf('\r\n\r\n', offset, 'utf8');
    if (headerEnd === -1) {
      break;
    }

    const headerText = buffer.slice(offset, headerEnd).toString('utf8');
    const contentLengthMatch = headerText.match(/Content-Length:\s*(\d+)/i);
    if (!contentLengthMatch) {
      offset = headerEnd + 4;
      continue;
    }

    const contentLength = Number(contentLengthMatch[1]);
    const bodyStart = headerEnd + 4;
    const bodyEnd = bodyStart + contentLength;

    if (buffer.length < bodyEnd) {
      break;
    }

    const payload = buffer.slice(bodyStart, bodyEnd).toString('utf8');
    try {
      onMessage(JSON.parse(payload));
    } catch {
      // Ignore malformed language server payloads.
    }

    offset = bodyEnd;
  }

  return buffer.slice(offset);
}

function encodeLspMessage(payload) {
  const body = typeof payload === 'string' ? payload : JSON.stringify(payload);
  return `Content-Length: ${Buffer.byteLength(body, 'utf8')}\r\n\r\n${body}`;
}

function emitLspStatus(session, payload) {
  lspNamespace.to(session.room).emit('lsp:status', payload);
}

function spawnLspProcess(command, args, workspaceRoot) {
  return spawn(command, args, {
    cwd: workspaceRoot,
    env: process.env,
    stdio: ['pipe', 'pipe', 'pipe'],
    windowsHide: true,
  });
}

const lspBroker = createLspBroker({
  normalizeWorkspaceRoot,
  resolveInstalledCommand,
  emitStatus: emitLspStatus,
  namespace: lspNamespace,
  spawnProcess: spawnLspProcess,
  parseMessages: parseLspMessages,
  encodeMessage: encodeLspMessage,
});

function resolveSessionFromSocket(socket) {
  const cookies = parseCookieHeader(socket.request?.headers?.cookie || '');
  let sessionId = cookies[sessionCookieName];
  let session = sessionId ? sessions.get(sessionId) : null;

  if (!session) {
    session = decodeSessionPayload(cookies[sessionPayloadCookieName]);
    if (session) {
      sessionId = session.id;
      sessions.set(sessionId, session);
    }
  }

  if (!session) {
    return null;
  }

  session.updatedAt = Date.now();
  return session;
}

function buildBaseUrl(request) {
  const protocol = request.get('x-forwarded-proto') || request.protocol || 'http';
  const requestOrigin = `${protocol}://${request.get('host')}`;

  if (publicBaseUrl) {
    try {
      const configuredUrl = new URL(publicBaseUrl);
      const requestUrl = new URL(requestOrigin);
      const loopbackHosts = new Set(['localhost', '127.0.0.1']);
      const configuredIsLoopback = loopbackHosts.has(configuredUrl.hostname);
      const requestIsLoopback = loopbackHosts.has(requestUrl.hostname);

      if (configuredIsLoopback && !requestIsLoopback) {
        return requestOrigin;
      }

      return configuredUrl.origin;
    } catch {
      return publicBaseUrl;
    }
  }

  return requestOrigin;
}

function base64UrlEncode(value) {
  return Buffer.from(value)
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/g, '');
}

function base64UrlDecode(value) {
  const normalized = String(value || '')
    .replace(/-/g, '+')
    .replace(/_/g, '/');
  const padLength = (4 - (normalized.length % 4 || 4)) % 4;
  return Buffer.from(normalized + '='.repeat(padLength), 'base64');
}

function sanitizePersistedAccount(account) {
  if (!account || typeof account !== 'object' || !account.id) {
    return null;
  }

  const avatarUrl =
    typeof account.avatarUrl === 'string' && !account.avatarUrl.startsWith('data:') && account.avatarUrl.length < 2048
      ? account.avatarUrl
      : '';

  return {
    id: String(account.id),
    username: typeof account.username === 'string' ? account.username : '',
    displayName: typeof account.displayName === 'string' ? account.displayName : '',
    email: typeof account.email === 'string' ? account.email : '',
    avatarUrl,
    accessToken: typeof account.accessToken === 'string' ? account.accessToken : '',
    refreshToken: typeof account.refreshToken === 'string' ? account.refreshToken : '',
    connectedAt: typeof account.connectedAt === 'string' ? account.connectedAt : null,
  };
}

function snapshotSession(session) {
  return {
    id: String(session.id || crypto.randomUUID()),
    createdAt: Number(session.createdAt || Date.now()),
    updatedAt: Number(session.updatedAt || Date.now()),
    accounts: Object.fromEntries(
      Object.entries(session.accounts || {})
        .map(([provider, account]) => [provider, sanitizePersistedAccount(account)])
        .filter(([, account]) => Boolean(account))
    ),
    syncProvider: typeof session.syncProvider === 'string' ? session.syncProvider : null,
    syncPreferences: {
      ...defaultSyncPreferences,
      ...(session.syncPreferences || {}),
    },
  };
}

function createSessionRecord(seed = {}) {
  const snapshot = snapshotSession(seed);
  return {
    id: snapshot.id,
    createdAt: snapshot.createdAt,
    updatedAt: snapshot.updatedAt,
    accounts: snapshot.accounts,
    syncProvider: snapshot.syncProvider,
    syncPreferences: snapshot.syncPreferences,
  };
}

function encodeSessionPayload(session) {
  const iv = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv('aes-256-gcm', sessionEncryptionKey, iv);
  const encrypted = Buffer.concat([cipher.update(JSON.stringify(snapshotSession(session)), 'utf8'), cipher.final()]);
  const authTag = cipher.getAuthTag();
  return `${base64UrlEncode(iv)}.${base64UrlEncode(authTag)}.${base64UrlEncode(encrypted)}`;
}

function decodeSessionPayload(rawValue) {
  if (!rawValue) {
    return null;
  }

  try {
    const [ivPart, authTagPart, dataPart] = String(rawValue).split('.');
    if (!ivPart || !authTagPart || !dataPart) {
      return null;
    }

    const decipher = crypto.createDecipheriv('aes-256-gcm', sessionEncryptionKey, base64UrlDecode(ivPart));
    decipher.setAuthTag(base64UrlDecode(authTagPart));
    const decrypted = Buffer.concat([decipher.update(base64UrlDecode(dataPart)), decipher.final()]).toString('utf8');
    const parsed = JSON.parse(decrypted);

    if (!parsed || typeof parsed !== 'object') {
      return null;
    }

    if (Date.now() - Number(parsed.updatedAt || 0) > sessionTtlMs) {
      return null;
    }

    return createSessionRecord(parsed);
  } catch {
    return null;
  }
}

function getSessionCookieSuffix(request) {
  const protocol = request.get('x-forwarded-proto') || request.protocol || 'http';
  if (protocol === 'https') {
    return `Path=/; HttpOnly; SameSite=None; Secure; Max-Age=${Math.floor(sessionTtlMs / 1000)}`;
  }

  return `Path=/; HttpOnly; SameSite=Lax; Max-Age=${Math.floor(sessionTtlMs / 1000)}`;
}

function writeSessionCookies(request, response, session) {
  const suffix = getSessionCookieSuffix(request);
  response.setHeader('Set-Cookie', [
    `${sessionCookieName}=${encodeURIComponent(session.id)}; ${suffix}`,
    `${sessionPayloadCookieName}=${encodeURIComponent(encodeSessionPayload(session))}; ${suffix}`,
  ]);
}

function ensureSessionRecord(request, response) {
  const cookies = parseCookies(request);
  let sessionId = cookies[sessionCookieName];
  let session = sessionId ? sessions.get(sessionId) : null;

  if (!session) {
    session = decodeSessionPayload(cookies[sessionPayloadCookieName]);
    if (session) {
      sessionId = session.id;
      sessions.set(sessionId, session);
    }
  }

  if (!session) {
    sessionId = crypto.randomUUID();
    session = createSessionRecord({
      id: sessionId,
      accounts: {},
      syncProvider: null,
      syncPreferences: { ...defaultSyncPreferences },
    });
    sessions.set(sessionId, session);
  }

  session.updatedAt = Date.now();
  request.session = session;
  return session;
}

function sanitizeAccount(account) {
  if (!account) {
    return null;
  }

  return {
    id: account.id,
    username: account.username || '',
    displayName: account.displayName || '',
    email: account.email || '',
    avatarUrl: account.avatarUrl || '',
    connectedAt: account.connectedAt || null,
  };
}

function getConfiguredProviders() {
  return {
    github: Boolean(providerConfig.github.clientId && providerConfig.github.clientSecret),
    microsoft: Boolean(providerConfig.microsoft.clientId && providerConfig.microsoft.clientSecret),
  };
}

function sanitizeSession(session) {
  return {
    providers: getConfiguredProviders(),
    accounts: Object.fromEntries(
      Object.entries(session.accounts || {})
        .filter(([, account]) => Boolean(account))
        .map(([provider, account]) => [provider, sanitizeAccount(account)])
    ),
    syncProvider: session.syncProvider || null,
    syncPreferences: {
      ...defaultSyncPreferences,
      ...(session.syncPreferences || {}),
    },
  };
}

async function readSyncStore() {
  try {
    const raw = await fs.readFile(syncStorePath, 'utf8');
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === 'object' ? parsed : { users: {} };
  } catch {
    return { users: {} };
  }
}

async function writeSyncStore(store) {
  await fs.mkdir(dataDir, { recursive: true });
  await fs.writeFile(syncStorePath, JSON.stringify(store, null, 2), 'utf8');
}

function getSyncProviderAccount(session) {
  const provider = session.syncProvider;
  const account = provider ? session.accounts?.[provider] : null;
  return provider && account ? { provider, account } : null;
}

function getSyncUserKey(session) {
  const providerAccount = getSyncProviderAccount(session);
  const provider = providerAccount?.provider;
  const account = providerAccount?.account;
  if (!provider || !account?.id) {
    return null;
  }

  return `${provider}:${account.id}`;
}

function getGitHubSyncHeaders(account) {
  return {
    Accept: 'application/vnd.github+json',
    Authorization: `Bearer ${account.accessToken}`,
    'User-Agent': 'Tilder',
    'Content-Type': 'application/json',
  };
}

async function ensureGitHubSyncRepo(account) {
  const repoUrl = `https://api.github.com/repos/${account.username}/${githubSyncRepoName}`;
  const response = await fetch(repoUrl, {
    headers: getGitHubSyncHeaders(account),
  });

  if (response.ok) {
    return;
  }

  if (response.status !== 404) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || 'Unable to verify GitHub sync repository.');
  }

  const createResponse = await fetch('https://api.github.com/user/repos', {
    method: 'POST',
    headers: getGitHubSyncHeaders(account),
    body: JSON.stringify({
      name: githubSyncRepoName,
      description: 'Tilder settings sync storage',
      homepage: 'https://tildercode.onrender.com',
      private: true,
      auto_init: true,
    }),
  });

  if (!createResponse.ok) {
    const error = await createResponse.json().catch(() => ({}));
    throw new Error(error.message || 'Unable to create GitHub sync repository.');
  }
}

async function pullGitHubSyncState(account) {
  const fileUrl = `https://api.github.com/repos/${account.username}/${githubSyncRepoName}/contents/${githubSyncFilePath}`;
  const response = await fetch(fileUrl, {
    headers: getGitHubSyncHeaders(account),
  });

  if (response.status === 404) {
    return { state: null, updatedAt: null };
  }

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || 'Unable to load synced settings from GitHub.');
  }

  const payload = await response.json();
  const content = Buffer.from(String(payload.content || '').replace(/\n/g, ''), 'base64').toString('utf8');
  const parsed = JSON.parse(content || '{}');

  return {
    state: parsed?.state || null,
    updatedAt: parsed?.updatedAt || null,
  };
}

async function pushGitHubSyncState(account, state) {
  await ensureGitHubSyncRepo(account);

  const fileUrl = `https://api.github.com/repos/${account.username}/${githubSyncRepoName}/contents/${githubSyncFilePath}`;
  const existingResponse = await fetch(fileUrl, {
    headers: getGitHubSyncHeaders(account),
  });

  let sha = '';
  if (existingResponse.ok) {
    const existing = await existingResponse.json();
    sha = existing.sha || '';
  } else if (existingResponse.status !== 404) {
    const error = await existingResponse.json().catch(() => ({}));
    throw new Error(error.message || 'Unable to inspect GitHub sync file.');
  }

  const updatedAt = new Date().toISOString();
  const body = {
    message: `Update Tilder settings sync (${updatedAt})`,
    content: Buffer.from(
      JSON.stringify(
        {
          version: 1,
          updatedAt,
          state: state || null,
        },
        null,
        2
      ),
      'utf8'
    ).toString('base64'),
  };

  if (sha) {
    body.sha = sha;
  }

  const updateResponse = await fetch(fileUrl, {
    method: 'PUT',
    headers: getGitHubSyncHeaders(account),
    body: JSON.stringify(body),
  });

  if (!updateResponse.ok) {
    const error = await updateResponse.json().catch(() => ({}));
    throw new Error(error.message || 'Unable to write synced settings to GitHub.');
  }

  return { updatedAt };
}

function createPopupResponse({ baseUrl, success, provider, message }) {
  const payload = JSON.stringify({
    type: 'tilder:oauth-complete',
    success,
    provider,
    message,
  });

  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Tilder OAuth</title>
    <style>
      body {
        margin: 0;
        font-family: Segoe UI, Arial, sans-serif;
        background: #11131b;
        color: #edf0ff;
        display: grid;
        place-items: center;
        min-height: 100vh;
      }
      .tilder-oauth-card {
        width: min(420px, calc(100vw - 40px));
        background: #1b1f2c;
        border: 1px solid #363d6b;
        border-radius: 16px;
        padding: 28px;
        box-shadow: 0 24px 70px rgba(0, 0, 0, 0.45);
      }
      .tilder-oauth-title {
        font-size: 22px;
        font-weight: 700;
        margin-bottom: 10px;
      }
      .tilder-oauth-copy {
        color: #b9c1ef;
        line-height: 1.5;
      }
    </style>
  </head>
  <body>
    <div class="tilder-oauth-card">
      <div class="tilder-oauth-title">${success ? 'Connected' : 'Connection failed'}</div>
      <div class="tilder-oauth-copy">${message}</div>
    </div>
    <script>
      const payload = ${payload};
      try {
        if (window.opener && !window.opener.closed) {
          window.opener.postMessage(payload, ${JSON.stringify(baseUrl)});
        }
      } catch {}
      setTimeout(() => window.close(), 220);
    </script>
  </body>
</html>`;
}

function createRedirectResponse({ baseUrl, success, provider, message }) {
  const redirectUrl = new URL(baseUrl);
  redirectUrl.searchParams.set('tilder_oauth_status', success ? 'success' : 'error');
  redirectUrl.searchParams.set('tilder_oauth_provider', provider);
  if (message) {
    redirectUrl.searchParams.set('tilder_oauth_message', message);
  }

  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Tilder OAuth</title>
    <meta http-equiv="refresh" content="0;url=${redirectUrl.toString()}" />
  </head>
  <body>
    <script>
      window.location.replace(${JSON.stringify(redirectUrl.toString())});
    </script>
  </body>
</html>`;
}

function createOAuthCompletionResponse({ baseUrl, success, provider, message, flow }) {
  if (flow === 'desktop') {
    return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Tilder OAuth</title>
    <style>
      body {
        margin: 0;
        font-family: Segoe UI, Arial, sans-serif;
        background: #11131b;
        color: #edf0ff;
        display: grid;
        place-items: center;
        min-height: 100vh;
      }
      .tilder-oauth-card {
        width: min(420px, calc(100vw - 40px));
        background: #1b1f2c;
        border: 1px solid #363d6b;
        border-radius: 16px;
        padding: 28px;
        box-shadow: 0 24px 70px rgba(0, 0, 0, 0.45);
      }
      .tilder-oauth-title {
        font-size: 22px;
        font-weight: 700;
        margin-bottom: 10px;
      }
      .tilder-oauth-copy {
        color: #b9c1ef;
        line-height: 1.5;
      }
    </style>
  </head>
  <body>
    <div class="tilder-oauth-card">
      <div class="tilder-oauth-title">${success ? 'Connected' : 'Connection failed'}</div>
      <div class="tilder-oauth-copy">${message}</div>
    </div>
  </body>
</html>`;
  }

  if (flow === 'redirect') {
    return createRedirectResponse({ baseUrl, success, provider, message });
  }

  return createPopupResponse({ baseUrl, success, provider, message });
}

function ensureProviderReady(provider) {
  const config = providerConfig[provider];
  if (!config) {
    throw new Error('Unknown OAuth provider.');
  }

  if (!getConfiguredProviders()[provider]) {
    throw new Error(`${config.label} OAuth is not configured on the server.`);
  }

  return config;
}

function buildRedirectUri(request, provider) {
  return `${buildBaseUrl(request)}/api/auth/${provider}/callback`;
}

async function exchangeGitHubCode({ code, redirectUri }) {
  const response = await fetch(providerConfig.github.tokenUrl, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      client_id: providerConfig.github.clientId,
      client_secret: providerConfig.github.clientSecret,
      code,
      redirect_uri: redirectUri,
    }),
  });
  const token = await response.json();
  if (!response.ok || !token.access_token) {
    throw new Error(token.error_description || token.error || 'GitHub token exchange failed.');
  }

  const [profileResponse, emailResponse] = await Promise.all([
    fetch('https://api.github.com/user', {
      headers: {
        Accept: 'application/vnd.github+json',
        Authorization: `Bearer ${token.access_token}`,
        'User-Agent': 'Tilder',
      },
    }),
    fetch('https://api.github.com/user/emails', {
      headers: {
        Accept: 'application/vnd.github+json',
        Authorization: `Bearer ${token.access_token}`,
        'User-Agent': 'Tilder',
      },
    }),
  ]);

  const profile = await profileResponse.json();
  const emails = await emailResponse.json().catch(() => []);
  if (!profileResponse.ok) {
    throw new Error(profile.message || 'Unable to load GitHub profile.');
  }

  const primaryEmail = Array.isArray(emails)
    ? emails.find((entry) => entry.primary)?.email || emails[0]?.email || profile.email || ''
    : profile.email || '';

  return {
    id: String(profile.id),
    username: profile.login,
    displayName: profile.name || profile.login,
    email: primaryEmail,
    avatarUrl: profile.avatar_url || '',
    accessToken: token.access_token,
    refreshToken: token.refresh_token || '',
    connectedAt: new Date().toISOString(),
  };
}

async function exchangeMicrosoftCode({ code, redirectUri }) {
  const tenantId = providerConfig.microsoft.tenantId;
  const tokenUrl = `https://login.microsoftonline.com/${tenantId}/oauth2/v2.0/token`;
  const body = new URLSearchParams({
    client_id: providerConfig.microsoft.clientId,
    client_secret: providerConfig.microsoft.clientSecret,
    grant_type: 'authorization_code',
    code,
    redirect_uri: redirectUri,
    scope: providerConfig.microsoft.scopes.join(' '),
  });

  const response = await fetch(tokenUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body,
  });
  const token = await response.json();
  if (!response.ok || !token.access_token) {
    throw new Error(token.error_description || token.error || 'Microsoft token exchange failed.');
  }

  const profileResponse = await fetch('https://graph.microsoft.com/v1.0/me?$select=id,displayName,mail,userPrincipalName', {
    headers: {
      Authorization: `Bearer ${token.access_token}`,
    },
  });
  const profile = await profileResponse.json();
  if (!profileResponse.ok) {
    throw new Error(profile.error?.message || 'Unable to load Microsoft profile.');
  }

  let avatarUrl = '';
  try {
    const photoResponse = await fetch('https://graph.microsoft.com/v1.0/me/photos/48x48/$value', {
      headers: {
        Authorization: `Bearer ${token.access_token}`,
      },
    });

    if (photoResponse.ok) {
      const contentType = photoResponse.headers.get('content-type') || 'image/jpeg';
      const photoBuffer = Buffer.from(await photoResponse.arrayBuffer());
      avatarUrl = `data:${contentType};base64,${photoBuffer.toString('base64')}`;
    }
  } catch {
    avatarUrl = '';
  }

  return {
    id: String(profile.id),
    username: profile.userPrincipalName || profile.mail || profile.displayName,
    displayName: profile.displayName || profile.userPrincipalName || 'Microsoft User',
    email: profile.mail || profile.userPrincipalName || '',
    avatarUrl,
    accessToken: token.access_token,
    refreshToken: token.refresh_token || '',
    connectedAt: new Date().toISOString(),
  };
}

async function mirrorWorkspace(payload = {}, preserveGit = true) {
  const snapshot = payload && typeof payload === 'object' ? payload : {};
  return syncWorkspaceMirror({
    rootName: snapshot.rootName || 'workspace',
    entries: Array.isArray(snapshot.entries) ? snapshot.entries : [],
    preserveGit,
  });
}

async function ensureGitIdentity(git, session) {
  const primaryAccount =
    session.accounts?.github ||
    session.accounts?.microsoft ||
    Object.values(session.accounts || {}).find(Boolean) ||
    null;
  const userName = primaryAccount?.displayName || primaryAccount?.username || 'Tilder User';
  const userEmail = primaryAccount?.email || 'tilder@local';

  await git.raw(['config', 'user.name', userName]);
  await git.raw(['config', 'user.email', userEmail]);
}

async function collectScmStatus(payload, session) {
  const { cwd } = await mirrorWorkspace(payload, true);
  const git = simpleGit({ baseDir: cwd, binary: gitBinary });
  let initialized = false;

  try {
    initialized = await git.checkIsRepo();
  } catch (error) {
    if (String(error instanceof Error ? error.message : error).includes('ENOENT')) {
      return {
        available: false,
        initialized: false,
        cwd,
        branch: null,
        files: [],
        stagedCount: 0,
        changedCount: 0,
        recentCommits: [],
        message: 'Git is not available on the server. Install Git or set GIT_BINARY.',
      };
    }

    throw error;
  }

  if (!initialized) {
    return {
      available: true,
      initialized: false,
      cwd,
      branch: null,
      files: [],
      stagedCount: 0,
      changedCount: 0,
      recentCommits: [],
    };
  }

  await ensureGitIdentity(git, session);
  const [status, branchSummary, log] = await Promise.all([
    git.status(),
    git.branchLocal(),
    git.log({ maxCount: 8 }).catch(() => ({ all: [] })),
  ]);

  return {
    available: true,
    initialized: true,
    cwd,
    branch: branchSummary.current || status.current || 'main',
    ahead: status.ahead,
    behind: status.behind,
    stagedCount: status.staged.length,
    changedCount: status.modified.length + status.not_added.length + status.created.length + status.deleted.length + status.renamed.length,
    files: status.files.map((entry) => ({
      path: entry.path,
      index: entry.index,
      workingDir: entry.working_dir,
    })),
    recentCommits: (log.all || []).map((entry) => ({
      hash: entry.hash,
      message: entry.message,
      author_name: entry.author_name,
      date: entry.date,
    })),
  };
}

app.use((request, response, next) => {
  ensureSessionRecord(request, response);

  let sessionCommitted = false;
  const commitSession = () => {
    if (sessionCommitted || response.headersSent || !request.session) {
      return;
    }

    writeSessionCookies(request, response, request.session);
    sessionCommitted = true;
  };

  const originalJson = response.json.bind(response);
  const originalSend = response.send.bind(response);
  const originalRedirect = response.redirect.bind(response);

  response.json = function patchedJson(...args) {
    commitSession();
    return originalJson(...args);
  };

  response.send = function patchedSend(...args) {
    commitSession();
    return originalSend(...args);
  };

  response.redirect = function patchedRedirect(...args) {
    commitSession();
    return originalRedirect(...args);
  };

  next();
});

app.get('/api/editor/capabilities', async (request, response) => {
  try {
    response.json(await buildEditorCapabilities(getRuntimeMode(request)));
  } catch (error) {
    response.status(500).json({
      message: error instanceof Error ? error.message : 'Unable to load editor capabilities.',
    });
  }
});

app.post('/api/editor/workspace-session', async (request, response) => {
  try {
    const nextSession = await upsertRemoteWorkspaceSession(
      request.session.id,
      request.body || {},
      request.body?.sessionId || ''
    );

    response.json({
      sessionId: nextSession.id,
      workspaceRoot: nextSession.workspaceRoot,
      rootName: nextSession.rootName,
      entriesCount: nextSession.entriesCount,
      updatedAt: nextSession.updatedAt,
    });
  } catch (error) {
    response.status(400).json({
      message: error instanceof Error ? error.message : 'Unable to create remote workspace session.',
    });
  }
});

app.get('/api/editor/workspace-session/:sessionId', (request, response) => {
  const session = getRemoteWorkspaceSession(request.session.id, request.params.sessionId);
  if (!session) {
    response.status(404).json({ message: 'Remote workspace session not found.' });
    return;
  }

  response.json({
    sessionId: session.id,
    workspaceRoot: session.workspaceRoot,
    rootName: session.rootName,
    entriesCount: session.entriesCount,
    updatedAt: session.updatedAt,
  });
});

app.get('/api/auth/session', (request, response) => {
  response.json(sanitizeSession(request.session));
});

app.post('/api/auth/logout', (request, response) => {
  const provider = request.body?.provider;
  if (provider && request.session.accounts?.[provider]) {
    delete request.session.accounts[provider];
    if (request.session.syncProvider === provider) {
      request.session.syncProvider = null;
    }
  } else if (!provider) {
    request.session.accounts = {};
    request.session.syncProvider = null;
  }

  response.json(sanitizeSession(request.session));
});

app.get('/api/auth/:provider/start', (request, response) => {
  try {
    const provider = request.params.provider;
    const config = ensureProviderReady(provider);
    const state = crypto.randomUUID();
    const redirectUri = buildRedirectUri(request, provider);
    oauthStates.set(state, {
      provider,
      sessionId: request.session.id,
      clientOrigin: String(request.query.client_origin || '').trim(),
      flow: String(request.query.flow || '').trim() === 'redirect' ? 'redirect' : 'popup',
      createdAt: Date.now(),
    });

    if (provider === 'github') {
      const url = new URL(config.authorizeUrl);
      url.searchParams.set('client_id', config.clientId);
      url.searchParams.set('redirect_uri', redirectUri);
      url.searchParams.set('scope', config.scopes.join(' '));
      url.searchParams.set('state', state);
      response.redirect(url.toString());
      return;
    }

    const url = new URL(`https://login.microsoftonline.com/${config.tenantId}/oauth2/v2.0/authorize`);
    url.searchParams.set('client_id', config.clientId);
    url.searchParams.set('response_type', 'code');
    url.searchParams.set('redirect_uri', redirectUri);
    url.searchParams.set('response_mode', 'query');
    url.searchParams.set('scope', config.scopes.join(' '));
    url.searchParams.set('state', state);
    response.redirect(url.toString());
  } catch (error) {
    response.status(400).send(String(error instanceof Error ? error.message : 'OAuth start failed.'));
  }
});

app.post('/api/auth/desktop/start', (request, response) => {
  try {
    const provider = String(request.body?.provider || '').trim();
    const config = ensureProviderReady(provider);
    const state = crypto.randomUUID();
    const desktopSessionId = crypto.randomUUID();
    const redirectUri = buildRedirectUri(request, provider);

    desktopAuthSessions.set(desktopSessionId, {
      id: desktopSessionId,
      provider,
      status: 'pending',
      createdAt: Date.now(),
      updatedAt: Date.now(),
      message: '',
      account: null,
    });

    oauthStates.set(state, {
      provider,
      sessionId: null,
      clientOrigin: String(request.body?.client_origin || request.query.client_origin || '').trim() || buildBaseUrl(request),
      desktopSessionId,
      flow: 'desktop',
      createdAt: Date.now(),
    });

    let authorizeUrl = '';

    if (provider === 'github') {
      const url = new URL(config.authorizeUrl);
      url.searchParams.set('client_id', config.clientId);
      url.searchParams.set('redirect_uri', redirectUri);
      url.searchParams.set('scope', config.scopes.join(' '));
      url.searchParams.set('state', state);
      authorizeUrl = url.toString();
    } else {
      const url = new URL(`https://login.microsoftonline.com/${config.tenantId}/oauth2/v2.0/authorize`);
      url.searchParams.set('client_id', config.clientId);
      url.searchParams.set('response_type', 'code');
      url.searchParams.set('redirect_uri', redirectUri);
      url.searchParams.set('response_mode', 'query');
      url.searchParams.set('scope', config.scopes.join(' '));
      url.searchParams.set('state', state);
      authorizeUrl = url.toString();
    }

    response.json({
      ok: true,
      provider,
      desktopSessionId,
      authorizeUrl,
    });
  } catch (error) {
    response.status(400).json({ message: error instanceof Error ? error.message : 'Unable to start desktop sign-in.' });
  }
});

app.get('/api/auth/desktop/status', (request, response) => {
  const desktopSessionId = String(request.query.desktopSessionId || '').trim();
  if (!desktopSessionId) {
    response.status(400).json({ message: 'Missing desktop session id.' });
    return;
  }

  const desktopSession = desktopAuthSessions.get(desktopSessionId);
  if (!desktopSession) {
    response.status(404).json({ message: 'Desktop sign-in session expired.' });
    return;
  }

  desktopSession.updatedAt = Date.now();

  if (desktopSession.status === 'pending') {
    response.json({ status: 'pending' });
    return;
  }

  if (desktopSession.status === 'error') {
    desktopAuthSessions.delete(desktopSessionId);
    response.json({
      status: 'error',
      message: desktopSession.message || 'Authentication failed.',
    });
    return;
  }

  if (desktopSession.status === 'authorized' && desktopSession.account) {
    request.session.accounts[desktopSession.provider] = desktopSession.account;
    if (!request.session.syncProvider) {
      request.session.syncProvider = desktopSession.provider;
    }

    const session = sanitizeSession(request.session);
    desktopAuthSessions.delete(desktopSessionId);
    response.json({
      status: 'complete',
      provider: desktopSession.provider,
      session,
    });
    return;
  }

  response.json({ status: 'pending' });
});

app.get('/api/auth/:provider/callback', async (request, response) => {
  const provider = request.params.provider;
  const state = String(request.query.state || '');
  const code = String(request.query.code || '');
  const error = String(request.query.error || '');

  const oauthRequest = oauthStates.get(state);
  oauthStates.delete(state);
  const clientOrigin = oauthRequest?.clientOrigin || buildBaseUrl(request);
  const flow = oauthRequest?.flow === 'desktop' ? 'desktop' : oauthRequest?.flow === 'redirect' ? 'redirect' : 'popup';
  const desktopSession = oauthRequest?.desktopSessionId ? desktopAuthSessions.get(oauthRequest.desktopSessionId) : null;

  if (error) {
    if (flow === 'desktop' && desktopSession) {
      desktopSession.status = 'error';
      desktopSession.updatedAt = Date.now();
      desktopSession.message = `The ${provider} sign-in flow was cancelled or rejected.`;
    }

    response.status(400).send(
      createOAuthCompletionResponse({
        baseUrl: clientOrigin,
        success: false,
        provider,
        message: `The ${provider} sign-in flow was cancelled or rejected.`,
        flow,
      })
    );
    return;
  }

  const hasMatchingSession =
    flow === 'desktop'
      ? Boolean(desktopSession)
      : Boolean(oauthRequest && oauthRequest.sessionId === request.session.id);

  if (!oauthRequest || oauthRequest.provider !== provider || !hasMatchingSession) {
    if (flow === 'desktop' && desktopSession) {
      desktopSession.status = 'error';
      desktopSession.updatedAt = Date.now();
      desktopSession.message = 'This sign-in session is no longer valid. Please try again from Tilder.';
    }

    response.status(400).send(
      createOAuthCompletionResponse({
        baseUrl: clientOrigin,
        success: false,
        provider,
        message: 'This sign-in session is no longer valid. Please try again from Tilder.',
        flow,
      })
    );
    return;
  }

  try {
    const redirectUri = buildRedirectUri(request, provider);
    const account =
      provider === 'github'
        ? await exchangeGitHubCode({ code, redirectUri })
        : await exchangeMicrosoftCode({ code, redirectUri });

    if (flow === 'desktop' && desktopSession) {
      desktopSession.status = 'authorized';
      desktopSession.updatedAt = Date.now();
      desktopSession.account = account;
      desktopSession.message = `${providerConfig[provider].label} connected. Return to Tilder.`;
    } else {
      request.session.accounts[provider] = account;
      if (!request.session.syncProvider) {
        request.session.syncProvider = provider;
      }
    }

    response.send(
      createOAuthCompletionResponse({
        baseUrl: clientOrigin,
        success: true,
        provider,
        message: `${providerConfig[provider].label} is now connected. You can return to Tilder.`,
        flow,
      })
    );
  } catch (caughtError) {
    if (flow === 'desktop' && desktopSession) {
      desktopSession.status = 'error';
      desktopSession.updatedAt = Date.now();
      desktopSession.message = caughtError instanceof Error ? caughtError.message : 'Sign-in failed.';
    }

    response.status(500).send(
      createOAuthCompletionResponse({
        baseUrl: clientOrigin,
        success: false,
        provider,
        message: caughtError instanceof Error ? caughtError.message : 'Sign-in failed.',
        flow,
      })
    );
  }
});

app.post('/api/sync/preferences', async (request, response) => {
  const nextPreferences = request.body?.syncPreferences;
  const nextProvider = request.body?.syncProvider;

  if (nextProvider !== undefined) {
    if (nextProvider && !request.session.accounts?.[nextProvider]) {
      response.status(400).json({ message: 'That provider is not connected.' });
      return;
    }

    request.session.syncProvider = nextProvider || null;
  }

  if (nextPreferences && typeof nextPreferences === 'object') {
    request.session.syncPreferences = {
      ...defaultSyncPreferences,
      ...request.session.syncPreferences,
      ...nextPreferences,
    };
  }

  response.json(sanitizeSession(request.session));
});

app.get('/api/sync/pull', async (request, response) => {
  const userKey = getSyncUserKey(request.session);
  if (!userKey) {
    response.status(400).json({ message: 'Connect a sync provider first.' });
    return;
  }

  try {
    const providerAccount = getSyncProviderAccount(request.session);

    if (providerAccount?.provider === 'github' && providerAccount.account?.accessToken && providerAccount.account?.username) {
      const result = await pullGitHubSyncState(providerAccount.account);
      response.json({
        session: sanitizeSession(request.session),
        state: result.state,
        updatedAt: result.updatedAt,
      });
      return;
    }

    const store = await readSyncStore();
    response.json({
      session: sanitizeSession(request.session),
      state: store.users?.[userKey]?.state || null,
      updatedAt: store.users?.[userKey]?.updatedAt || null,
    });
  } catch (error) {
    response.status(500).json({ message: error instanceof Error ? error.message : 'Unable to pull synced state.' });
  }
});

app.post('/api/sync/push', async (request, response) => {
  const userKey = getSyncUserKey(request.session);
  if (!userKey) {
    response.status(400).json({ message: 'Connect a sync provider first.' });
    return;
  }

  try {
    const providerAccount = getSyncProviderAccount(request.session);

    if (providerAccount?.provider === 'github' && providerAccount.account?.accessToken && providerAccount.account?.username) {
      const result = await pushGitHubSyncState(providerAccount.account, request.body?.state || null);
      response.json({
        ok: true,
        session: sanitizeSession(request.session),
        updatedAt: result.updatedAt,
      });
      return;
    }

    const store = await readSyncStore();
    const provider = request.session.syncProvider;
    store.users[userKey] = {
      provider,
      profile: sanitizeAccount(request.session.accounts?.[provider]),
      updatedAt: new Date().toISOString(),
      state: request.body?.state || null,
    };
    await writeSyncStore(store);

    response.json({
      ok: true,
      session: sanitizeSession(request.session),
      updatedAt: store.users[userKey].updatedAt,
    });
  } catch (error) {
    response.status(500).json({ message: error instanceof Error ? error.message : 'Unable to push synced state.' });
  }
});

app.get('/api/github/repos', async (request, response) => {
  const account = request.session.accounts?.github;
  if (!account?.accessToken) {
    response.status(400).json({ message: 'Connect GitHub first.' });
    return;
  }

  try {
    const upstream = await fetch('https://api.github.com/user/repos?sort=updated&per_page=30', {
      headers: {
        Accept: 'application/vnd.github+json',
        Authorization: `Bearer ${account.accessToken}`,
        'User-Agent': 'Tilder',
      },
    });
    const repos = await upstream.json();
    if (!upstream.ok) {
      response.status(upstream.status).json({ message: repos.message || 'Unable to load repositories.' });
      return;
    }

    response.json({
      repositories: repos.map((repo) => ({
        id: repo.id,
        name: repo.name,
        fullName: repo.full_name,
        private: repo.private,
        url: repo.html_url,
        defaultBranch: repo.default_branch,
        updatedAt: repo.updated_at,
        description: repo.description || '',
      })),
    });
  } catch {
    response.status(500).json({ message: 'Failed to load GitHub repositories.' });
  }
});

app.post('/api/github/repos', async (request, response) => {
  const account = request.session.accounts?.github;
  if (!account?.accessToken) {
    response.status(400).json({ message: 'Connect GitHub first.' });
    return;
  }

  const name = String(request.body?.name || '').trim();
  const description = String(request.body?.description || '').trim();
  const isPrivate = request.body?.private !== false;

  if (!name) {
    response.status(400).json({ message: 'Enter a repository name.' });
    return;
  }

  try {
    const upstream = await fetch('https://api.github.com/user/repos', {
      method: 'POST',
      headers: {
        Accept: 'application/vnd.github+json',
        Authorization: `Bearer ${account.accessToken}`,
        'User-Agent': 'Tilder',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        description,
        private: isPrivate,
        auto_init: true,
      }),
    });
    const repo = await upstream.json().catch(() => ({}));

    if (!upstream.ok) {
      response.status(upstream.status).json({ message: repo.message || 'Unable to create GitHub repository.' });
      return;
    }

    response.json({
      repository: {
        id: repo.id,
        name: repo.name,
        fullName: repo.full_name,
        private: repo.private,
        url: repo.html_url,
        defaultBranch: repo.default_branch,
        updatedAt: repo.updated_at,
        description: repo.description || '',
      },
    });
  } catch {
    response.status(500).json({ message: 'Failed to create GitHub repository.' });
  }
});

app.post('/api/scm/status', async (request, response) => {
  try {
    const status = await collectScmStatus(request.body || {}, request.session);
    response.json(status);
  } catch (error) {
    response.status(500).json({ message: error instanceof Error ? error.message : 'Unable to read source control state.' });
  }
});

app.post('/api/scm/init', async (request, response) => {
  try {
    const { cwd } = await mirrorWorkspace(request.body || {}, true);
    const git = simpleGit({ baseDir: cwd, binary: gitBinary });
    if (!(await git.checkIsRepo())) {
      await git.init();
    }
    await ensureGitIdentity(git, request.session);
    response.json(await collectScmStatus(request.body || {}, request.session));
  } catch (error) {
    response.status(500).json({ message: error instanceof Error ? error.message : 'Unable to initialize repository.' });
  }
});

app.post('/api/scm/stage', async (request, response) => {
  try {
    const { cwd } = await mirrorWorkspace(request.body || {}, true);
    const git = simpleGit({ baseDir: cwd, binary: gitBinary });
    if (!(await git.checkIsRepo())) {
      response.status(400).json({ message: 'Initialize Git first.' });
      return;
    }

    await ensureGitIdentity(git, request.session);
    await git.add(['-A']);
    response.json(await collectScmStatus(request.body || {}, request.session));
  } catch (error) {
    response.status(500).json({ message: error instanceof Error ? error.message : 'Unable to stage changes.' });
  }
});

app.post('/api/scm/commit', async (request, response) => {
  try {
    const message = String(request.body?.message || '').trim();
    if (!message) {
      response.status(400).json({ message: 'Enter a commit message.' });
      return;
    }

    const { cwd } = await mirrorWorkspace(request.body || {}, true);
    const git = simpleGit({ baseDir: cwd, binary: gitBinary });
    if (!(await git.checkIsRepo())) {
      response.status(400).json({ message: 'Initialize Git first.' });
      return;
    }

    await ensureGitIdentity(git, request.session);
    await git.add(['-A']);
    await git.commit(message);
    response.json(await collectScmStatus(request.body || {}, request.session));
  } catch (error) {
    response.status(500).json({ message: error instanceof Error ? error.message : 'Unable to create commit.' });
  }
});

app.get('/api/terminal/health', (_request, response) => {
  response.json({
    ok: true,
    shell,
    cwd: shellCwd,
  });
});

app.get('/api/runner/languages', async (_request, response) => {
  try {
    const upstream = await fetch(`${runnerBaseUrl}/languages`);
    const data = await upstream.json();
    response.status(upstream.status).json(data);
  } catch {
    response.status(500).json({ message: 'Failed to load runner languages.' });
  }
});

app.post('/api/runner/run', async (request, response) => {
  try {
    const upstream = await fetch(`${runnerBaseUrl}/submissions?base64_encoded=false&wait=true`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request.body),
    });
    const data = await upstream.json();
    response.status(upstream.status).json(data);
  } catch {
    response.status(500).json({ message: 'Failed to run code.' });
  }
});

app.post('/api/terminal/run-file', async (request, response) => {
  try {
    const payload = request.body || {};
    const result = payload.relativePath
      ? await runWorkspaceFile(payload)
      : await runLocalFile(payload);
    response.json(result);
  } catch (error) {
    response.status(500).json({
      supported: true,
      ok: false,
      stderr: error instanceof Error ? error.message : 'Failed to execute local runner.',
    });
  }
});

app.post('/api/terminal/workspace-root', async (request, response) => {
  try {
    const result = await syncWorkspaceMirror(request.body || {});
    response.json(result);
  } catch (error) {
    response.status(500).json({
      message: error instanceof Error ? error.message : 'Failed to sync workspace root.',
    });
  }
});

io.on('connection', (socket) => {
  const cols = Number(socket.handshake.query.cols || 120);
  const rows = Number(socket.handshake.query.rows || 30);

  const ptyProcess = pty.spawn(shell, shellArgs, {
    name: 'xterm-256color',
    cols,
    rows,
    cwd: shellCwd,
    env: process.env,
  });

  ptyProcess.onData((data) => {
    socket.emit('terminal:output', data);
  });

  socket.on('terminal:input', (data) => {
    ptyProcess.write(data);
  });

  socket.on('terminal:resize', ({ cols: nextCols, rows: nextRows }) => {
    if (!nextCols || !nextRows) {
      return;
    }

    ptyProcess.resize(Number(nextCols), Number(nextRows));
  });

  socket.on('terminal:set-cwd', (nextPath) => {
    if (!nextPath) {
      return;
    }

    if (shell.toLowerCase().includes('powershell')) {
      const escapedPath = String(nextPath).replace(/'/g, "''");
      ptyProcess.write(`Set-Location -LiteralPath '${escapedPath}'\r`);
      return;
    }

    const escapedPath = String(nextPath).replace(/"/g, '\\"');
    ptyProcess.write(`cd "${escapedPath}"\r`);
  });

  socket.on('disconnect', () => {
    ptyProcess.kill();
  });
});

lspNamespace.on('connection', async (socket) => {
  const runtimeMode = getRuntimeModeFromValue(socket.handshake.headers.host || '');
  const languageId = String(socket.handshake.query.languageId || '').trim();
  const requestedWorkspaceRoot = normalizeWorkspaceRoot(socket.handshake.query.workspaceRoot || shellCwd);
  const remoteWorkspaceSessionId = String(socket.handshake.query.sessionId || '').trim();
  const ownerSession = resolveSessionFromSocket(socket);
  const adapter = languageId ? getLspAdapter(languageId) : null;

  if (!languageId || !adapter) {
    socket.emit('lsp:status', {
      status: 'unsupported',
      languageId,
      message: 'No local language server is configured for this language.',
    });
    socket.disconnect(true);
    return;
  }

  let session = null;

  try {
    const remoteWorkspaceSession = remoteWorkspaceSessionId
      ? getRemoteWorkspaceSession(ownerSession?.id || '', remoteWorkspaceSessionId)
      : null;
    const workspaceRoot =
      remoteWorkspaceSession?.workspaceRoot || (runtimeMode === 'desktop-local' ? requestedWorkspaceRoot : '');

    if (!workspaceRoot) {
      socket.emit('lsp:status', {
        status: 'unavailable',
        languageId,
        message:
          runtimeMode === 'desktop-local'
            ? 'Create and sync a workspace mirror before using IntelliSense for this file.'
            : 'Create and sync a remote workspace session before using hosted IntelliSense.',
      });
      socket.disconnect(true);
      return;
    }

    session = await lspBroker.ensureSession(languageId, workspaceRoot, adapter);
    lspBroker.attachSocket(socket, session);
  } catch (error) {
    socket.emit('lsp:status', {
      status: 'error',
      languageId,
      message: error instanceof Error ? error.message : 'Unable to start the local language server.',
    });
    socket.disconnect(true);
    return;
  }
});

app.use(express.static(distPath));

app.use((_request, response) => {
  response.sendFile(path.join(distPath, 'index.html'));
});

server.listen(port, () => {
  console.log(`Tilder server running on http://localhost:${port}`);
});
