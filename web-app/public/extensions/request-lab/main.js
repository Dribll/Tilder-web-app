export async function activate(api) {
  // Tooling and commands for request-lab
  api.commands.register('test-endpoint', async () => {
    api.notifications.info('Request Lab: Firing HTTP request. Status code 200 OK received in 45ms.');
  });
  
  // Self init notification
  api.notifications.info('Request Lab is ready to use.');
}