export async function activate(api) {
  // Generic fallback for json-lab
  api.completions.register('plaintext', [
    { label: 'json-lab-init', insertText: 'Initialized json-lab', detail: 'json-lab base', kind: 'snippet' }
  ]);
  api.commands.register('run', () => {
    api.notifications.info('json-lab executed successfully.');
  });
}