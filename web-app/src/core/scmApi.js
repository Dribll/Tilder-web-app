async function parseJson(response) {
  const raw = await response.text();
  let data = {};

  try {
    data = raw ? JSON.parse(raw) : {};
  } catch {
    data = raw ? { message: raw } : {};
  }

  if (!response.ok) {
    const message =
      data.message ||
      (response.status >= 500 && typeof window !== 'undefined' && window.location.port === '5173'
        ? 'Tilder API server is not reachable. Run the Node backend on port 3210, or use `npm run dev` so web and API start together.'
        : `SCM request failed (${response.status}).`);
    throw new Error(message);
  }

  return data;
}

async function post(path, payload) {
  const response = await fetch(path, {
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
