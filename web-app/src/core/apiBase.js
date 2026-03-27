const rawApiBaseUrl = typeof import.meta !== 'undefined' ? String(import.meta.env.VITE_API_BASE_URL || '').trim() : '';

export const apiBaseUrl = rawApiBaseUrl.replace(/\/$/, '');

export function getClientOrigin() {
  return typeof window !== 'undefined' ? window.location.origin : '';
}

export function buildApiUrl(path = '') {
  if (!path) {
    return apiBaseUrl || '';
  }

  if (/^https?:\/\//i.test(path)) {
    return path;
  }

  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return apiBaseUrl ? `${apiBaseUrl}${normalizedPath}` : normalizedPath;
}

export function getApiOrigin() {
  const candidate = buildApiUrl('/');
  try {
    return candidate ? new URL(candidate, getClientOrigin() || undefined).origin : getClientOrigin();
  } catch {
    return getClientOrigin();
  }
}

export async function apiFetch(path, init = {}) {
  const headers = {
    ...(init.headers || {}),
  };

  return fetch(buildApiUrl(path), {
    credentials: 'include',
    ...init,
    headers,
  });
}
