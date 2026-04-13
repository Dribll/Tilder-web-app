export async function activate(api) {
  // Language intelligence for clang-flow
  api.completions.register('cpp', [
    {
        label: "#include",
        insertText: "#include <${1:iostream}>\n",
        detail: "Include directive"
    },
    {
        label: "main",
        insertText: "int main(int argc, char* argv[]) {\n    ${1}\n    return 0;\n}",
        detail: "Main function"
    }
]);
  
  api.commands.register('run-tests', () => {
    api.notifications.info('Started test runner for clang-flow environment...');
  });
}