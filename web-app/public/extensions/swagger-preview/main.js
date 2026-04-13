export async function activate(api) {
  // Generic fallback for swagger-preview
  api.completions.register('plaintext', [
    { label: 'swagger-preview-init', insertText: 'Initialized swagger-preview', detail: 'swagger-preview base', kind: 'snippet' }
  ]);
  api.commands.register('run', () => {
    api.notifications.info('swagger-preview executed successfully.');
  });
}