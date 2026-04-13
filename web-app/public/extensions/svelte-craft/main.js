export async function activate(api) {
  // Generic fallback for svelte-craft
  api.completions.register('plaintext', [
    { label: 'svelte-craft-init', insertText: 'Initialized svelte-craft', detail: 'svelte-craft base', kind: 'snippet' }
  ]);
  api.commands.register('run', () => {
    api.notifications.info('svelte-craft executed successfully.');
  });
}