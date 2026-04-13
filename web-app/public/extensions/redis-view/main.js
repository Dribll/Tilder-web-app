export async function activate(api) {
  // Generic fallback for redis-view
  api.completions.register('plaintext', [
    { label: 'redis-view-init', insertText: 'Initialized redis-view', detail: 'redis-view base', kind: 'snippet' }
  ]);
  api.commands.register('run', () => {
    api.notifications.info('redis-view executed successfully.');
  });
}