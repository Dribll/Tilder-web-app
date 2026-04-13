export async function activate(api) {
  // Generic fallback for node-ops
  api.completions.register('plaintext', [
    { label: 'node-ops-init', insertText: 'Initialized node-ops', detail: 'node-ops base', kind: 'snippet' }
  ]);
  api.commands.register('run', () => {
    api.notifications.info('node-ops executed successfully.');
  });
}