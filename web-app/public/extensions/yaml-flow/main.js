export async function activate(api) {
  // Generic fallback for yaml-flow
  api.completions.register('plaintext', [
    { label: 'yaml-flow-init', insertText: 'Initialized yaml-flow', detail: 'yaml-flow base', kind: 'snippet' }
  ]);
  api.commands.register('run', () => {
    api.notifications.info('yaml-flow executed successfully.');
  });
}