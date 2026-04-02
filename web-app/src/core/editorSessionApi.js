import { apiFetch } from './apiBase.js';

export async function upsertEditorWorkspaceSession(payload, sessionId = '') {
  const response = await apiFetch('/api/editor/workspace-session', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      ...(payload || {}),
      sessionId,
    }),
  });

  const result = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(result?.message || 'Unable to sync the editor workspace session.');
  }

  return result;
}

export async function fetchEditorWorkspaceSession(sessionId) {
  const response = await apiFetch(`/api/editor/workspace-session/${encodeURIComponent(sessionId)}`);
  const result = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(result?.message || 'Unable to load the editor workspace session.');
  }

  return result;
}
