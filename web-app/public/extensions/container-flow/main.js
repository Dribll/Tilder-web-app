export async function activate(api) {
  // Generic fallback for container-flow
  api.completions.register('plaintext', [
    { label: 'container-flow-init', insertText: 'Initialized container-flow', detail: 'container-flow base', kind: 'snippet' }
  ]);
  api.commands.register('run', () => {
    api.notifications.info('container-flow executed successfully.');
  });
}