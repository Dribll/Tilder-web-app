import { invoke } from '@tauri-apps/api/core';
import { apiFetch, buildApiUrl, getClientOrigin } from './apiBase.js';

async function parseJson(response) {
  const raw = await response.text();
  let data = {};

  try {
    data = raw ? JSON.parse(raw) : {};
  } catch {
    data = raw ? { message: raw } : {};
  }

  if (!response.ok) {
    const normalizedMessage = typeof data.message === 'string' ? data.message.trim() : '';
    const message =
      ((response.status === 404 && (!normalizedMessage || /^not found$/i.test(normalizedMessage)))
        ? 'This Tilder deployment is missing the Node API routes. Deploy it on Render as a Web Service with `npm run build` and `npm start`, not as a static site.'
        : null) ||
      normalizedMessage ||
      (response.status >= 500 && typeof window !== 'undefined' && window.location.port === '5173'
        ? 'Tilder API server is not reachable. Run the Node backend on port 3210, or use `npm run dev` so web and API start together.'
        : `Request failed (${response.status}).`);
    throw new Error(message);
  }

  return data;
}

function shouldUseRedirectOAuth() {
  return typeof window !== 'undefined' && Boolean(window.chrome?.webview);
}

export async function openDesktopOAuthUrl(authorizeUrl) {
  return invoke('open_external_url', { url: authorizeUrl });
}

export async function beginOAuth(provider) {
  const width = 620;
  const height = 760;
  const left = Math.max(0, window.screenX + (window.outerWidth - width) / 2);
  const top = Math.max(0, window.screenY + (window.outerHeight - height) / 2);
  const flow = shouldUseRedirectOAuth() ? 'desktop' : 'popup';

  if (flow === 'desktop') {
    const response = await apiFetch('/api/auth/desktop/start', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        provider,
        client_origin: getClientOrigin(),
      }),
    });
    const data = await parseJson(response);

    return {
      mode: 'desktop',
      desktopSessionId: data.desktopSessionId,
      authorizeUrl: data.authorizeUrl || '',
    };
  }

  const url = buildApiUrl(`/api/auth/${provider}/start?client_origin=${encodeURIComponent(getClientOrigin())}&flow=${encodeURIComponent(flow)}`);

  const popup = window.open(
    url,
    `tilder-oauth-${provider}`,
    `popup=yes,width=${width},height=${height},left=${left},top=${top}`
  );

  return popup ? { mode: 'popup', window: popup } : null;
}

export async function pollDesktopOAuth(desktopSessionId) {
  const response = await apiFetch(`/api/auth/desktop/status?desktopSessionId=${encodeURIComponent(desktopSessionId)}`);

  return parseJson(response);
}

export async function fetchAuthSession() {
  const response = await apiFetch('/api/auth/session');

  return parseJson(response);
}

export async function disconnectProvider(provider) {
  const response = await apiFetch('/api/auth/logout', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ provider }),
  });

  return parseJson(response);
}

export async function updateSyncPreferences(payload) {
  const response = await apiFetch('/api/sync/preferences', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  return parseJson(response);
}

export async function pushSyncedState(payload) {
  const response = await apiFetch('/api/sync/push', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  return parseJson(response);
}

export async function pullSyncedState() {
  const response = await apiFetch('/api/sync/pull');

  return parseJson(response);
}

export async function fetchGitHubRepos() {
  const response = await apiFetch('/api/github/repos');

  return parseJson(response);
}

export async function createGitHubRepo(payload) {
  const response = await apiFetch('/api/github/repos', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload || {}),
  });

  return parseJson(response);
}
