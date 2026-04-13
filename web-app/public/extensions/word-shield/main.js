export async function activate(api) {
  // Generic fallback for word-shield
  api.completions.register('plaintext', [
    { label: 'word-shield-init', insertText: 'Initialized word-shield', detail: 'word-shield base', kind: 'snippet' }
  ]);
  api.commands.register('run', () => {
    api.notifications.info('word-shield executed successfully.');
  });
}