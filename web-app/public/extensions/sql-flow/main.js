export async function activate(api) {
  // Generic fallback for sql-flow
  api.completions.register('plaintext', [
    { label: 'sql-flow-init', insertText: 'Initialized sql-flow', detail: 'sql-flow base', kind: 'snippet' }
  ]);
  api.commands.register('run', () => {
    api.notifications.info('sql-flow executed successfully.');
  });
}