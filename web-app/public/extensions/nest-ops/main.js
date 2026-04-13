export async function activate(api) {
  // Generic fallback for nest-ops
  api.completions.register('plaintext', [
    { label: 'nest-ops-init', insertText: 'Initialized nest-ops', detail: 'nest-ops base', kind: 'snippet' }
  ]);
  api.commands.register('run', () => {
    api.notifications.info('nest-ops executed successfully.');
  });
}