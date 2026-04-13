export async function activate(api) {
  // Generic fallback for graph-flow
  api.completions.register('plaintext', [
    { label: 'graph-flow-init', insertText: 'Initialized graph-flow', detail: 'graph-flow base', kind: 'snippet' }
  ]);
  api.commands.register('run', () => {
    api.notifications.info('graph-flow executed successfully.');
  });
}