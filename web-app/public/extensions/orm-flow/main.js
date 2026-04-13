export async function activate(api) {
  // Generic fallback for orm-flow
  api.completions.register('plaintext', [
    { label: 'orm-flow-init', insertText: 'Initialized orm-flow', detail: 'orm-flow base', kind: 'snippet' }
  ]);
  api.commands.register('run', () => {
    api.notifications.info('orm-flow executed successfully.');
  });
}