export async function activate(api) {
  // Language intelligence for go-flow
  api.completions.register('go', [
    {
        label: "func",
        insertText: "func ${1:name}(${2:args}) ${3:type} {\n\t${4}\n}",
        detail: "Function"
    },
    {
        label: "iferr",
        insertText: "if err != nil {\n\treturn ${1:err}\n}",
        detail: "Error check"
    }
]);
  
  api.commands.register('run-tests', () => {
    api.notifications.info('Started test runner for go-flow environment...');
  });
}