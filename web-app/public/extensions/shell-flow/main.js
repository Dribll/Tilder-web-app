export async function activate(api) {
  // Generic fallback for shell-flow
  api.completions.register('plaintext', [
    { label: 'shell-flow-init', insertText: 'Initialized shell-flow', detail: 'shell-flow base', kind: 'snippet' }
  ]);
  api.commands.register('run', () => {
    api.notifications.info('shell-flow executed successfully.');
  });
}