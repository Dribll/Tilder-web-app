import { apiFetch } from './apiBase.js';

export async function fetchExtensionMarketplace() {
  const response = await apiFetch('/api/extensions/marketplace');
  const payload = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(payload.message || 'Unable to load the Tilder extension marketplace.');
  }

  return {
    extensions: Array.isArray(payload.extensions) ? payload.extensions : [],
    publishers: payload.publishers && typeof payload.publishers === 'object' ? payload.publishers : {},
    stats: payload.stats && typeof payload.stats === 'object' ? payload.stats : {},
    updatedAt: payload.updatedAt || '',
  };
}

export async function fetchExtensionPublishers() {
  const response = await apiFetch('/api/extensions/publishers');
  const payload = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(payload.message || 'Unable to load Tilder extension publishers.');
  }

  return {
    publishers: Array.isArray(payload.publishers) ? payload.publishers : [],
    updatedAt: payload.updatedAt || '',
  };
}

export async function fetchMyExtensionPublishers() {
  const response = await apiFetch('/api/extensions/publishers/me');
  const payload = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(payload.message || 'Unable to load your Tilder publishers.');
  }

  return {
    publishers: Array.isArray(payload.publishers) ? payload.publishers : [],
    updatedAt: payload.updatedAt || '',
  };
}

export async function createExtensionPublisher(payload) {
  const response = await apiFetch('/api/extensions/publishers', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload || {}),
  });
  const result = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(result.message || 'Unable to create the Tilder publisher.');
  }

  return result;
}

export async function createExtensionPublisherToken(publisherId, payload) {
  const response = await apiFetch(`/api/extensions/publishers/${encodeURIComponent(publisherId)}/tokens`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload || {}),
  });
  const result = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(result.message || 'Unable to create the Tilder publisher token.');
  }

  return result;
}

export async function validateExtensionMarketplacePackage(payload) {
  const response = await apiFetch('/api/extensions/packages/validate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload || {}),
  });
  const result = await response.json().catch(() => ({}));

  return {
    ok: response.ok,
    ...result,
  };
}

export async function publishExtensionMarketplacePackage(payload, token = '') {
  const headers = {
    'Content-Type': 'application/json',
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await apiFetch('/api/extensions/publish', {
    method: 'POST',
    headers,
    body: JSON.stringify(payload || {}),
  });
  const result = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(result.message || 'Unable to publish the Tilder extension package.');
  }

  return result;
}

export async function submitExtensionMarketplacePackage(payload) {
  const response = await apiFetch('/api/extensions/submissions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload || {}),
  });
  const result = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(result.message || 'Unable to submit the extension package.');
  }

  return result;
}
