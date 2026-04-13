export async function activate(api) {
  // Generic fallback for nginx-room
  api.completions.register('plaintext', [
    { label: 'nginx-room-init', insertText: 'Initialized nginx-room', detail: 'nginx-room base', kind: 'snippet' }
  ]);
  api.commands.register('run', () => {
    api.notifications.info('nginx-room executed successfully.');
  });
}