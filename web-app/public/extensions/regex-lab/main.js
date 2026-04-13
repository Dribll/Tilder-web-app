export async function activate(api) {
  // Generic fallback for regex-lab
  api.completions.register('plaintext', [
    { label: 'regex-lab-init', insertText: 'Initialized regex-lab', detail: 'regex-lab base', kind: 'snippet' }
  ]);
  api.commands.register('run', () => {
    api.notifications.info('regex-lab executed successfully.');
  });
}