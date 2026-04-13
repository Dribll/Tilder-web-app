export async function activate(api) {
  // Generic fallback for ini-companion
  api.completions.register('plaintext', [
    { label: 'ini-companion-init', insertText: 'Initialized ini-companion', detail: 'ini-companion base', kind: 'snippet' }
  ]);
  api.commands.register('run', () => {
    api.notifications.info('ini-companion executed successfully.');
  });
}