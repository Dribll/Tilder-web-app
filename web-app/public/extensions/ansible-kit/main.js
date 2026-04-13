export async function activate(api) {
  // Generic fallback for ansible-kit
  api.completions.register('plaintext', [
    { label: 'ansible-kit-init', insertText: 'Initialized ansible-kit', detail: 'ansible-kit base', kind: 'snippet' }
  ]);
  api.commands.register('run', () => {
    api.notifications.info('ansible-kit executed successfully.');
  });
}