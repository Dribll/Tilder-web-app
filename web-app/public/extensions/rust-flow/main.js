export async function activate(api) {
  // Language intelligence for rust-flow
  api.completions.register('rust', [
    {
        label: "fn",
        insertText: "fn ${1:name}(${2:args}) -> ${3:Type} {\n    ${4}\n}",
        detail: "Function"
    },
    {
        label: "impl",
        insertText: "impl ${1:Type} {\n    ${2}\n}",
        detail: "Implementation block"
    }
]);
  
  api.commands.register('run-tests', () => {
    api.notifications.info('Started test runner for rust-flow environment...');
  });
}