export async function activate(api) {
  // Generic fallback for solid-craft
  api.completions.register('plaintext', [
    { label: 'solid-craft-init', insertText: 'Initialized solid-craft', detail: 'solid-craft base', kind: 'snippet' }
  ]);
  api.commands.register('run', () => {
    api.notifications.info('solid-craft executed successfully.');
  });
}