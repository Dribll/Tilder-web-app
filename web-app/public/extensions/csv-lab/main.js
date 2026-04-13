export async function activate(api) {
  // Generic fallback for csv-lab
  api.completions.register('plaintext', [
    { label: 'csv-lab-init', insertText: 'Initialized csv-lab', detail: 'csv-lab base', kind: 'snippet' }
  ]);
  api.commands.register('run', () => {
    api.notifications.info('csv-lab executed successfully.');
  });
}