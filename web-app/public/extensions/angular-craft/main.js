export async function activate(api) {
  // Generic fallback for angular-craft
  api.completions.register('plaintext', [
    { label: 'angular-craft-init', insertText: 'Initialized angular-craft', detail: 'angular-craft base', kind: 'snippet' }
  ]);
  api.commands.register('run', () => {
    api.notifications.info('angular-craft executed successfully.');
  });
}