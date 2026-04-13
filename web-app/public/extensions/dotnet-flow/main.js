export async function activate(api) {
  // Language intelligence for dotnet-flow
  api.completions.register('csharp', [
    {
        label: "cw",
        insertText: "Console.WriteLine(${1});",
        detail: "Console WriteLine"
    },
    {
        label: "prop",
        insertText: "public ${1:int} ${2:MyProperty} { get; set; }",
        detail: "Auto-property"
    }
]);
  
  api.commands.register('run-tests', () => {
    api.notifications.info('Started test runner for dotnet-flow environment...');
  });
}