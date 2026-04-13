export async function activate(api) {
  // Generic fallback for mongo-view
  api.completions.register('plaintext', [
    { label: 'mongo-view-init', insertText: 'Initialized mongo-view', detail: 'mongo-view base', kind: 'snippet' }
  ]);
  api.commands.register('run', () => {
    api.notifications.info('mongo-view executed successfully.');
  });
}