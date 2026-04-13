export async function activate(api) {
  // Generic fallback for path-smart
  api.completions.register('plaintext', [
    { label: 'path-smart-init', insertText: 'Initialized path-smart', detail: 'path-smart base', kind: 'snippet' }
  ]);
  api.commands.register('run', () => {
    api.notifications.info('path-smart executed successfully.');
  });
}