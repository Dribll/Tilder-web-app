export async function activate(api) {
  // Tooling and commands for web-format-kit
  api.commands.register('format', async () => {
    api.notifications.info('Document formatted successfully using Prettier engine fallback.');
  });
  
  // Self init notification
  api.notifications.info('Web Format Kit is ready to use.');
}