export async function activate(api) {
  // Generic fallback for sass-room
  api.completions.register('plaintext', [
    { label: 'sass-room-init', insertText: 'Initialized sass-room', detail: 'sass-room base', kind: 'snippet' }
  ]);
  api.commands.register('run', () => {
    api.notifications.info('sass-room executed successfully.');
  });
}