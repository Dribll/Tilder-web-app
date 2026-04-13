export async function activate(api) {
  // Generic fallback for lit-craft
  api.completions.register('plaintext', [
    { label: 'lit-craft-init', insertText: 'Initialized lit-craft', detail: 'lit-craft base', kind: 'snippet' }
  ]);
  api.commands.register('run', () => {
    api.notifications.info('lit-craft executed successfully.');
  });
}