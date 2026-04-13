export async function activate(api) {
  // Generic fallback for fastapi-ops
  api.completions.register('plaintext', [
    { label: 'fastapi-ops-init', insertText: 'Initialized fastapi-ops', detail: 'fastapi-ops base', kind: 'snippet' }
  ]);
  api.commands.register('run', () => {
    api.notifications.info('fastapi-ops executed successfully.');
  });
}