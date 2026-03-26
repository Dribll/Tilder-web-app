import 'dotenv/config';
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

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distPath = path.join(__dirname, 'dist');
const dataDir = path.join(__dirname, 'data');
const syncStorePath = path.join(dataDir, 'sync-store.json');

const app = express();
app.set('trust proxy', true);

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: true,
    methods: ['GET', 'POST'],
  },
});

const port = Number(process.env.PORT || 3210);
const shell = os.platform() === 'win32' ? 'powershell.exe' : process.env.SHELL || 'bash';
const shellArgs = os.platform() === 'win32' ? ['-NoLogo'] : [];
const shellCwd = process.env.TILDER_TERMINAL_CWD || __dirname;
const runnerBaseUrl = process.env.TILDER_RUNNER_URL || 'https://ce.judge0.com';
const gitBinary = process.env.GIT_BINARY || 'git';
const publicBaseUrl = (process.env.PUBLIC_BASE_URL || '').trim().replace(/\/$/, '');
const sessionCookieName = 'tilder.sid';
const sessionTtlMs = 1000 * 60 * 60 * 24 * 30;
const defaultSyncPreferences = {
  syncSettings: true,
  syncLayout: true,
  syncShortcuts: true,
};
const sessions = new Map();
const oauthStates = new Map();

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

app.use(express.json({ limit: '4mb' }));

function parseCookies(request) {
  const raw = request.headers.cookie || '';
  return raw.split(';').reduce((bucket, entry) => {
    const [key, ...valueParts] = entry.trim().split('=');
    if (!key) {
      return bucket;
    }

    bucket[key] = decodeURIComponent(valueParts.join('=') || '');
    return bucket;
  }, {});
}

function buildBaseUrl(request) {
  if (publicBaseUrl) {
    return publicBaseUrl;
  }

  const protocol = request.get('x-forwarded-proto') || request.protocol || 'http';
  return `${protocol}://${request.get('host')}`;
}

function ensureSessionRecord(request, response) {
  const cookies = parseCookies(request);
  let sessionId = cookies[sessionCookieName];
  let session = sessionId ? sessions.get(sessionId) : null;

  if (!session) {
    sessionId = crypto.randomUUID();
    session = {
      id: sessionId,
      createdAt: Date.now(),
      updatedAt: Date.now(),
      accounts: {},
      syncProvider: null,
      syncPreferences: { ...defaultSyncPreferences },
    };
    sessions.set(sessionId, session);
  }

  session.updatedAt = Date.now();
  request.session = session;
  response.setHeader(
    'Set-Cookie',
    `${sessionCookieName}=${encodeURIComponent(sessionId)}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${Math.floor(sessionTtlMs / 1000)}`
  );

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

function getSyncUserKey(session) {
  const provider = session.syncProvider;
  const account = provider ? session.accounts?.[provider] : null;
  if (!provider || !account?.id) {
    return null;
  }

  return `${provider}:${account.id}`;
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
  next();
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

app.get('/api/auth/:provider/callback', async (request, response) => {
  const provider = request.params.provider;
  const state = String(request.query.state || '');
  const code = String(request.query.code || '');
  const error = String(request.query.error || '');

  const oauthRequest = oauthStates.get(state);
  oauthStates.delete(state);
  const clientOrigin = oauthRequest?.clientOrigin || buildBaseUrl(request);

  if (error) {
    response.status(400).send(
      createPopupResponse({
        baseUrl: clientOrigin,
        success: false,
        provider,
        message: `The ${provider} sign-in flow was cancelled or rejected.`,
      })
    );
    return;
  }

  if (!oauthRequest || oauthRequest.provider !== provider || oauthRequest.sessionId !== request.session.id) {
    response.status(400).send(
      createPopupResponse({
        baseUrl: clientOrigin,
        success: false,
        provider,
        message: 'This sign-in session is no longer valid. Please try again from Tilder.',
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

    request.session.accounts[provider] = account;
    if (!request.session.syncProvider) {
      request.session.syncProvider = provider;
    }

    response.send(
      createPopupResponse({
        baseUrl: clientOrigin,
        success: true,
        provider,
        message: `${providerConfig[provider].label} is now connected. You can close this window.`,
      })
    );
  } catch (caughtError) {
    response.status(500).send(
      createPopupResponse({
        baseUrl: clientOrigin,
        success: false,
        provider,
        message: caughtError instanceof Error ? caughtError.message : 'Sign-in failed.',
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

  const store = await readSyncStore();
  response.json({
    session: sanitizeSession(request.session),
    state: store.users?.[userKey]?.state || null,
    updatedAt: store.users?.[userKey]?.updatedAt || null,
  });
});

app.post('/api/sync/push', async (request, response) => {
  const userKey = getSyncUserKey(request.session);
  if (!userKey) {
    response.status(400).json({ message: 'Connect a sync provider first.' });
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

app.use(express.static(distPath));

app.use((_request, response) => {
  response.sendFile(path.join(distPath, 'index.html'));
});

server.listen(port, () => {
  console.log(`Tilder server running on http://localhost:${port}`);
});
