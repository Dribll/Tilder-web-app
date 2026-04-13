export async function activate(api) {
  // Generic fallback for spring-ops
  api.completions.register('plaintext', [
    { label: 'spring-ops-init', insertText: 'Initialized spring-ops', detail: 'spring-ops base', kind: 'snippet' }
  ]);
  api.commands.register('run', () => {
    api.notifications.info('spring-ops executed successfully.');
  });
}