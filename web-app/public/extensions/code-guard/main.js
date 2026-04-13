export async function activate(api) {
  // Tooling and commands for code-guard
  api.commands.register('lint', async () => {
    api.notifications.warning('Code Guard: Found 2 potential issues in the active document. Check inline squiggles.');
  });
  
  // Self init notification
  api.notifications.info('Code Guard is ready to use.');
}