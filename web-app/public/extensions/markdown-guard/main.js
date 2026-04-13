export async function activate(api) {
  // Generic fallback for markdown-guard
  api.completions.register('plaintext', [
    { label: 'markdown-guard-init', insertText: 'Initialized markdown-guard', detail: 'markdown-guard base', kind: 'snippet' }
  ]);
  api.commands.register('run', () => {
    api.notifications.info('markdown-guard executed successfully.');
  });
}