export async function activate(api) {
  // Language intelligence for java-flow
  api.completions.register('java', [
    {
        label: "psvm",
        insertText: "public static void main(String[] args) {\n    ${1}\n}",
        detail: "Main method"
    },
    {
        label: "sout",
        insertText: "System.out.println(${1});",
        detail: "Print to console"
    }
]);
  
  api.commands.register('run-tests', () => {
    api.notifications.info('Started test runner for java-flow environment...');
  });
}