export async function activate(api) {
  // Generic fallback for openapi-lens
  api.completions.register('plaintext', [
    { label: 'openapi-lens-init', insertText: 'Initialized openapi-lens', detail: 'openapi-lens base', kind: 'snippet' }
  ]);
  api.commands.register('run', () => {
    api.notifications.info('openapi-lens executed successfully.');
  });
}