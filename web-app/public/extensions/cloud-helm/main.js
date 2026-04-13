export async function activate(api) {
  // Generic fallback for cloud-helm
  api.completions.register('plaintext', [
    { label: 'cloud-helm-init', insertText: 'Initialized cloud-helm', detail: 'cloud-helm base', kind: 'snippet' }
  ]);
  api.commands.register('run', () => {
    api.notifications.info('cloud-helm executed successfully.');
  });
}