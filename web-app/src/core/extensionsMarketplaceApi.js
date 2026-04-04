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
