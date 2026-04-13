export async function activate(api) {
  // Generic fallback for astro-craft
  api.completions.register('plaintext', [
    { label: 'astro-craft-init', insertText: 'Initialized astro-craft', detail: 'astro-craft base', kind: 'snippet' }
  ]);
  api.commands.register('run', () => {
    api.notifications.info('astro-craft executed successfully.');
  });
}