export async function activate(api) {
  // Generic fallback for laravel-ops
  api.completions.register('plaintext', [
    { label: 'laravel-ops-init', insertText: 'Initialized laravel-ops', detail: 'laravel-ops base', kind: 'snippet' }
  ]);
  api.commands.register('run', () => {
    api.notifications.info('laravel-ops executed successfully.');
  });
}