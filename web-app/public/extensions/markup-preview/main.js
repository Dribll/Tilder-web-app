export async function activate(api) {
  // Generic fallback for markup-preview
  api.completions.register('plaintext', [
    { label: 'markup-preview-init', insertText: 'Initialized markup-preview', detail: 'markup-preview base', kind: 'snippet' }
  ]);
  api.commands.register('run', () => {
    api.notifications.info('markup-preview executed successfully.');
  });
}