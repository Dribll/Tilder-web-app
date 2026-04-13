export async function activate(api) {
  // Generic fallback for express-ops
  api.completions.register('plaintext', [
    { label: 'express-ops-init', insertText: 'Initialized express-ops', detail: 'express-ops base', kind: 'snippet' }
  ]);
  api.commands.register('run', () => {
    api.notifications.info('express-ops executed successfully.');
  });
}