export async function activate(api) {
  // Generic fallback for qwik-craft
  api.completions.register('plaintext', [
    { label: 'qwik-craft-init', insertText: 'Initialized qwik-craft', detail: 'qwik-craft base', kind: 'snippet' }
  ]);
  api.commands.register('run', () => {
    api.notifications.info('qwik-craft executed successfully.');
  });
}