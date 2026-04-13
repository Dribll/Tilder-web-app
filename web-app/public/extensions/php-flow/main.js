export async function activate(api) {
  // Language intelligence for php-flow
  api.completions.register('php', [
    {
        label: "<?php",
        insertText: "<?php\n\n${1}",
        detail: "PHP Tag"
    },
    {
        label: "class",
        insertText: "class ${1:Name} {\n    ${2}\n}",
        detail: "PHP Class"
    },
    {
        label: "pubf",
        insertText: "public function ${1:name}(${2:args}) {\n    ${3}\n}",
        detail: "Public method"
    }
]);
  
  api.commands.register('run-tests', () => {
    api.notifications.info('Started test runner for php-flow environment...');
  });
}