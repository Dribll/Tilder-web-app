export async function activate(api) {
  // Generic fallback for terraform-field
  api.completions.register('plaintext', [
    { label: 'terraform-field-init', insertText: 'Initialized terraform-field', detail: 'terraform-field base', kind: 'snippet' }
  ]);
  api.commands.register('run', () => {
    api.notifications.info('terraform-field executed successfully.');
  });
}