export async function activate(api) {
  // Generic fallback for pipeline-flow
  api.completions.register('plaintext', [
    { label: 'pipeline-flow-init', insertText: 'Initialized pipeline-flow', detail: 'pipeline-flow base', kind: 'snippet' }
  ]);
  api.commands.register('run', () => {
    api.notifications.info('pipeline-flow executed successfully.');
  });
}