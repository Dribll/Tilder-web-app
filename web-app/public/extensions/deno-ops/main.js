export async function activate(api) {
  // Generic fallback for deno-ops
  api.completions.register('plaintext', [
    { label: 'deno-ops-init', insertText: 'Initialized deno-ops', detail: 'deno-ops base', kind: 'snippet' }
  ]);
  api.commands.register('run', () => {
    api.notifications.info('deno-ops executed successfully.');
  });
}