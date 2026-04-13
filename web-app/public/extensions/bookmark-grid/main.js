export async function activate(api) {
  // Tooling and commands for bookmark-grid
  api.commands.register('toggle', async () => {
    api.notifications.info('Bookmark Grid: Toggle bookmark at cursor. (Press F2 to jump)');
  });
  
  // Self init notification
  api.notifications.info('Bookmark Grid is ready to use.');
}