import { apiFetch } from './apiBase.js';

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
      (response.status === 413 || normalizedMessage.includes('PayloadTooLargeError')
        ? 'The workspace mirror payload is too large. Tilder should skip generated folders like node_modules, dist, and build for Source Control.'
        : null) ||
      normalizedMessage ||
      (response.status === 404
        ? 'This Tilder deployment is missing the Node API routes. Deploy it on Render as a Web Service with `npm run build` and `npm start`, not as a static site.'
        : null) ||
      (response.status >= 500 && typeof window !== 'undefined' && window.location.port === '5173'
        ? 'Tilder API server is not reachable. Run the Node backend on port 3210, or use `npm run dev` so web and API start together.'
        : `SCM request failed (${response.status}).`);
    throw new Error(message);
  }

  return data;
}

async function post(path, payload) {
  const response = await apiFetch(path, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  return parseJson(response);
}

export function fetchScmStatus(payload) {
  return post('/api/scm/status', payload);
}

export function initializeScm(payload) {
  return post('/api/scm/init', payload);
}

export function stageAllScm(payload) {
  return post('/api/scm/stage', payload);
}

export function commitScm(payload) {
  return post('/api/scm/commit', payload);
}
