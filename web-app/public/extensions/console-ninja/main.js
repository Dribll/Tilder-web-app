export async function activate(api) {
  api.completions.register('javascript', [
  {
    "label": "clg",
    "insertText": "console.log(${1});",
    "detail": "console.log",
    "kind": "snippet"
  },
  {
    "label": "cco",
    "insertText": "console.count('${1}');",
    "detail": "console.count",
    "kind": "snippet"
  },
  {
    "label": "cerr",
    "insertText": "console.error(${1});",
    "detail": "console.error",
    "kind": "snippet"
  },
  {
    "label": "cwarn",
    "insertText": "console.warn(${1});",
    "detail": "console.warn",
    "kind": "snippet"
  },
  {
    "label": "ctable",
    "insertText": "console.table(${1});",
    "detail": "console.table",
    "kind": "snippet"
  },
  {
    "label": "ctime",
    "insertText": "console.time('${1}');\n${2}\nconsole.timeEnd('${1}');",
    "detail": "console.time/timeEnd block",
    "kind": "snippet"
  },
  {
    "label": "cgroup",
    "insertText": "console.group('${1}');\n${2}\nconsole.groupEnd();",
    "detail": "console.group block",
    "kind": "snippet"
  }
]);
  api.completions.register('typescript', [
  {
    "label": "clg",
    "insertText": "console.log(${1});",
    "detail": "console.log",
    "kind": "snippet"
  },
  {
    "label": "cco",
    "insertText": "console.count('${1}');",
    "detail": "console.count",
    "kind": "snippet"
  },
  {
    "label": "cerr",
    "insertText": "console.error(${1});",
    "detail": "console.error",
    "kind": "snippet"
  },
  {
    "label": "cwarn",
    "insertText": "console.warn(${1});",
    "detail": "console.warn",
    "kind": "snippet"
  },
  {
    "label": "ctable",
    "insertText": "console.table(${1});",
    "detail": "console.table",
    "kind": "snippet"
  },
  {
    "label": "ctime",
    "insertText": "console.time('${1}');\n${2}\nconsole.timeEnd('${1}');",
    "detail": "console.time/timeEnd block",
    "kind": "snippet"
  },
  {
    "label": "cgroup",
    "insertText": "console.group('${1}');\n${2}\nconsole.groupEnd();",
    "detail": "console.group block",
    "kind": "snippet"
  }
]);
  
  api.commands.register('clean-logs', async () => {
    api.notifications.info('Console Ninja: All logs cleaned (Simulated).');
  });
  api.notifications.info('Console Ninja activated. Drop those logs!');
}