export async function activate(api) {
  // Tooling and commands for todo-scout
  api.commands.register('scan', async () => {
    if (api.app && typeof api.app.getActiveTabSnapshot === 'function') {
        const snapshot = await api.app.getActiveTabSnapshot();
        const content = snapshot?.content || '';
        const count = (content.match(/TODO:/gi) || []).length;
        if (count > 0) {
          api.notifications.info(`Todo Scout found ${count} TODO note(s) in this file.`);
        } else {
          api.notifications.info('Todo Scout: Workspace is clean, no TODOs found!');
        }
      } else {
        api.notifications.info('Todo Scout activated.');
      }
  });
  
  // Self init notification
  api.notifications.info('Todo Scout is ready to use.');
}