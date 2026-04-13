export async function activate(api) {
  // Language intelligence for tailwind-garden
  api.completions.register('html', [
    {
        label: "tw-flex-center",
        insertText: "flex items-center justify-center",
        detail: "Flexbox center"
    },
    {
        label: "tw-card",
        insertText: "p-6 bg-white rounded-xl shadow-md space-y-4",
        detail: "Tailwind card layout"
    },
    {
        label: "tw-btn",
        insertText: "px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75",
        detail: "Tailwind button"
    }
]);
  
  api.commands.register('run-tests', () => {
    api.notifications.info('Started test runner for tailwind-garden environment...');
  });
}