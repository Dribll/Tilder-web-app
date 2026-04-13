export async function activate(api) {
  // Language intelligence for python-flow
  api.completions.register('python', [
    {
        label: "def",
        insertText: "def ${1:function_name}(${2:args}):\n    ${3:pass}",
        detail: "Function definition"
    },
    {
        label: "class",
        insertText: "class ${1:ClassName}:\n    def __init__(self):\n        ${2:pass}",
        detail: "Class definition"
    },
    {
        label: "ifmain",
        insertText: "if __name__ == \__main__\:\n    ${1:main()}",
        detail: "Main execution block"
    }
]);
  
  api.commands.register('run-tests', () => {
    api.notifications.info('Started test runner for python-flow environment...');
  });
}