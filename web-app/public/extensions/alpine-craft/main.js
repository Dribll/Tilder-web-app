export async function activate(api) {
  // Generic fallback for alpine-craft
  api.completions.register('plaintext', [
    { label: 'alpine-craft-init', insertText: 'Initialized alpine-craft', detail: 'alpine-craft base', kind: 'snippet' }
  ]);
  api.commands.register('run', () => {
    api.notifications.info('alpine-craft executed successfully.');
  });
}