export async function activate(api) {
  // Generic fallback for snippet-vault
  api.completions.register('plaintext', [
    { label: 'snippet-vault-init', insertText: 'Initialized snippet-vault', detail: 'snippet-vault base', kind: 'snippet' }
  ]);
  api.commands.register('run', () => {
    api.notifications.info('snippet-vault executed successfully.');
  });
}