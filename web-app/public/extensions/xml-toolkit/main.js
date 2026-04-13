export async function activate(api) {
  // Generic fallback for xml-toolkit
  api.completions.register('plaintext', [
    { label: 'xml-toolkit-init', insertText: 'Initialized xml-toolkit', detail: 'xml-toolkit base', kind: 'snippet' }
  ]);
  api.commands.register('run', () => {
    api.notifications.info('xml-toolkit executed successfully.');
  });
}