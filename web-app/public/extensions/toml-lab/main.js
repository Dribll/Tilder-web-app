export async function activate(api) {
  // Generic fallback for toml-lab
  api.completions.register('plaintext', [
    { label: 'toml-lab-init', insertText: 'Initialized toml-lab', detail: 'toml-lab base', kind: 'snippet' }
  ]);
  api.commands.register('run', () => {
    api.notifications.info('toml-lab executed successfully.');
  });
}