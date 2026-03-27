import { emmetCSS, emmetHTML, emmetJSX } from 'emmet-monaco-es';
import friendlySnippetBundle from './friendlySnippets.generated.json';
import languageCompletionsBundle from './languageCompletions.generated.json';

let providersRegistered = false;
let emmetRegistered = false;

function snippet(label, insertText, detail, documentation = detail) {
  return {
    label,
    insertText,
    detail,
    documentation,
    kind: 'Snippet',
    sortText: 'aa',
  };
}

const javascriptLikeAliases = [
  snippet('clg', 'console.log($0);', 'console.log'),
  snippet('clo', "console.log('${1:value}', ${1:value});", 'console.log named value'),
  snippet('fn', 'function ${1:name}(${2}) {\n\t$0\n}', 'function'),
  snippet('afn', 'const ${1:name} = (${2}) => {\n\t$0\n};', 'arrow function'),
  snippet('imp', "import ${1:module} from '${2:package}';", 'import default'),
  snippet('imd', "import { ${1:name} } from '${2:package}';", 'import named'),
  snippet('exp', 'export default ${1:name};', 'export default'),
  snippet('fori', 'for (let ${1:i} = 0; ${1:i} < ${2:length}; ${1:i}++) {\n\t$0\n}', 'for loop'),
  snippet('foreach', '${1:items}.forEach((${2:item}) => {\n\t$0\n});', 'forEach loop'),
  snippet('tryc', 'try {\n\t$1\n} catch (${2:error}) {\n\t$0\n}', 'try/catch'),
];

const htmlAliases = [
  snippet('html5', '<!DOCTYPE html>\n<html lang="en">\n<head>\n\t<meta charset="UTF-8" />\n\t<meta name="viewport" content="width=device-width, initial-scale=1.0" />\n\t<title>${1:Document}</title>\n</head>\n<body>\n\t$0\n</body>\n</html>', 'HTML5 document'),
  snippet('divc', '<div class="${1:name}">$0</div>', 'div with class'),
  snippet('divi', '<div id="${1:name}">$0</div>', 'div with id'),
  snippet('linkcss', '<link rel="stylesheet" href="${1:styles.css}" />', 'stylesheet link'),
  snippet('scriptsrc', '<script src="${1:app.js}"></script>', 'script tag'),
];

const cssAliases = [
  snippet('df', 'display: flex;', 'display flex'),
  snippet('dg', 'display: grid;', 'display grid'),
  snippet('jc', 'justify-content: ${1:center};', 'justify-content'),
  snippet('ai', 'align-items: ${1:center};', 'align-items'),
  snippet('fdc', 'flex-direction: column;', 'flex-direction column'),
  snippet('bgr', 'background: ${1:#000};', 'background'),
  snippet('br', 'border-radius: ${1:8px};', 'border radius'),
  snippet('m0', 'margin: 0;', 'margin 0'),
  snippet('p0', 'padding: 0;', 'padding 0'),
];

const customCompletions = {
  java: [
    snippet('sopln', 'System.out.println($0);', 'System.out.println'),
    snippet('sopl', 'System.out.print($0);', 'System.out.print'),
    snippet('main', 'public static void main(String[] args) {\n\t$0\n}', 'main method'),
    snippet('psvm', 'public static void main(String[] args) {\n\t$0\n}', 'main method'),
    snippet('fori', 'for (int ${1:i} = 0; ${1:i} < ${2:length}; ${1:i}++) {\n\t$0\n}', 'for loop'),
    snippet('soutv', 'System.out.println("${1:name} = " + ${1:name});', 'print variable'),
  ],
  python: [
    snippet('ifmain', "if __name__ == '__main__':\n\t$0", 'if __name__ == "__main__"'),
    snippet('main', "def main():\n\t$0\n\n\nif __name__ == '__main__':\n\tmain()", 'main function'),
    snippet('pr', 'print($0)', 'print'),
    snippet('def', 'def ${1:name}(${2}):\n\t$0', 'function'),
    snippet('class', 'class ${1:Name}:\n\tdef __init__(self, ${2}):\n\t\t$0', 'class'),
    snippet('fori', 'for ${1:i} in range(${2:n}):\n\t$0', 'for range'),
  ],
  cpp: [
    snippet('main', 'int main() {\n\t$0\n\treturn 0;\n}', 'main function'),
    snippet('cout', 'std::cout << ${1:value} << std::endl;$0', 'std::cout'),
    snippet('cin', 'std::cin >> ${1:value};$0', 'std::cin'),
    snippet('fori', 'for (int ${1:i} = 0; ${1:i} < ${2:length}; ++${1:i}) {\n\t$0\n}', 'for loop'),
    snippet('cls', 'class ${1:Name} {\npublic:\n\t${1:Name}() {\n\t\t$0\n\t}\n};', 'class'),
  ],
  c: [
    snippet('main', 'int main(void) {\n\t$0\n\treturn 0;\n}', 'main function'),
    snippet('printf', 'printf("${1:text}\\n"${2});$0', 'printf'),
    snippet('scanf', 'scanf("${1:%d}", &${2:value});$0', 'scanf'),
    snippet('fori', 'for (int ${1:i} = 0; ${1:i} < ${2:length}; ++${1:i}) {\n\t$0\n}', 'for loop'),
  ],
  csharp: [
    snippet('cw', 'Console.WriteLine($0);', 'Console.WriteLine'),
    snippet('cwf', 'Console.Write($0);', 'Console.Write'),
    snippet('main', 'static void Main(string[] args)\n{\n\t$0\n}', 'Main method'),
    snippet('prop', 'public ${1:string} ${2:Name} { get; set; }$0', 'auto property'),
    snippet('fori', 'for (int ${1:i} = 0; ${1:i} < ${2:length}; ${1:i}++)\n{\n\t$0\n}', 'for loop'),
  ],
  go: [
    snippet('main', 'package main\n\nimport "fmt"\n\nfunc main() {\n\t$0\n}', 'main program'),
    snippet('fn', 'func ${1:name}(${2}) ${3} {\n\t$0\n}', 'function'),
    snippet('ife', 'if err != nil {\n\t$0\n}', 'if err != nil'),
    snippet('forr', 'for _, ${1:item} := range ${2:items} {\n\t$0\n}', 'for range'),
    snippet('pln', 'fmt.Println($0)', 'fmt.Println'),
  ],
  rust: [
    snippet('main', 'fn main() {\n\t$0\n}', 'main function'),
    snippet('fn', 'fn ${1:name}(${2}) ${3:-> ()} {\n\t$0\n}', 'function'),
    snippet('pr', 'println!($0);', 'println!'),
    snippet('epr', 'eprintln!($0);', 'eprintln!'),
    snippet('fori', 'for ${1:item} in ${2:items} {\n\t$0\n}', 'for loop'),
    snippet('impl', 'impl ${1:Type} {\n\t$0\n}', 'impl block'),
  ],
  javascript: javascriptLikeAliases,
  typescript: [
    ...javascriptLikeAliases,
    snippet('iface', 'interface ${1:Name} {\n\t$0\n}', 'interface'),
    snippet('type', 'type ${1:Name} = ${2:string};$0', 'type alias'),
    snippet('enum', 'enum ${1:Name} {\n\t$0\n}', 'enum'),
  ],
  html: htmlAliases,
  css: cssAliases,
  scss: cssAliases,
  sql: [
    snippet('sel', 'SELECT ${1:*}\nFROM ${2:table}\nWHERE ${3:condition};', 'select query'),
    snippet('ins', 'INSERT INTO ${1:table} (${2:columns})\nVALUES (${3:values});', 'insert query'),
    snippet('upd', 'UPDATE ${1:table}\nSET ${2:column = value}\nWHERE ${3:condition};', 'update query'),
    snippet('del', 'DELETE FROM ${1:table}\nWHERE ${2:condition};', 'delete query'),
    snippet('cte', 'WITH ${1:name} AS (\n\t$2\n)\nSELECT *\nFROM ${1:name};$0', 'common table expression'),
  ],
  shell: [
    snippet('shebang', '#!/usr/bin/env bash\n$0', 'bash shebang'),
    snippet('if', 'if [ ${1:condition} ]; then\n\t$0\nfi', 'if statement'),
    snippet('forin', 'for ${1:item} in ${2:list}; do\n\t$0\ndone', 'for in loop'),
    snippet('func', '${1:name}() {\n\t$0\n}', 'function'),
  ],
  powershell: [
    snippet('wrh', 'Write-Host $0', 'Write-Host'),
    snippet('foreach', 'foreach ($${1:item} in ${2:items}) {\n\t$0\n}', 'foreach loop'),
    snippet('if', 'if (${1:condition}) {\n\t$0\n}', 'if statement'),
    snippet('func', 'function ${1:Name} {\n\tparam(${2})\n\t$0\n}', 'function'),
  ],
  php: [
    snippet('php', '<?php\n$0\n?>', 'php tag'),
    snippet('echo', 'echo ${1:$value};$0', 'echo'),
    snippet('fn', 'function ${1:name}(${2}) {\n\t$0\n}', 'function'),
    snippet('foreach', 'foreach (${1:$items} as ${2:$item}) {\n\t$0\n}', 'foreach loop'),
  ],
  ruby: [
    snippet('def', 'def ${1:name}\n\t$0\nend', 'method'),
    snippet('puts', 'puts ${1:value}$0', 'puts'),
    snippet('class', 'class ${1:Name}\n\tdef initialize(${2})\n\t\t$0\n\tend\nend', 'class'),
    snippet('each', '${1:items}.each do |${2:item}|\n\t$0\nend', 'each loop'),
  ],
  kotlin: [
    snippet('main', 'fun main() {\n\t$0\n}', 'main function'),
    snippet('fn', 'fun ${1:name}(${2}): ${3:Unit} {\n\t$0\n}', 'function'),
    snippet('pln', 'println($0)', 'println'),
    snippet('data', 'data class ${1:Name}(${2:val name: String})', 'data class'),
  ],
  swift: [
    snippet('main', '@main\nstruct ${1:App} {\n\tstatic func main() {\n\t\t$0\n\t}\n}', 'main entry'),
    snippet('fn', 'func ${1:name}(${2}) {\n\t$0\n}', 'function'),
    snippet('pr', 'print($0)', 'print'),
    snippet('struct', 'struct ${1:Name} {\n\t$0\n}', 'struct'),
  ],
  dart: [
    snippet('main', 'void main() {\n\t$0\n}', 'main function'),
    snippet('pr', 'print($0);', 'print'),
    snippet('fn', '${1:void} ${2:name}(${3}) {\n\t$0\n}', 'function'),
    snippet('stless', 'class ${1:Name} extends StatelessWidget {\n\tconst ${1:Name}({super.key});\n\n\t@override\n\tWidget build(BuildContext context) {\n\t\treturn $0;\n\t}\n}', 'Flutter stateless widget'),
  ],
  lua: [
    snippet('fn', 'function ${1:name}(${2})\n\t$0\nend', 'function'),
    snippet('pr', 'print($0)', 'print'),
    snippet('fori', 'for ${1:i} = 1, ${2:n} do\n\t$0\nend', 'for loop'),
    snippet('tbl', 'local ${1:name} = {\n\t$0\n}', 'table'),
  ],
  perl: [
    snippet('sub', 'sub ${1:name} {\n\t$0\n}', 'subroutine'),
    snippet('say', 'say ${1:$value};$0', 'say'),
    snippet('foreach', 'foreach my $${1:item} (@${2:items}) {\n\t$0\n}', 'foreach'),
  ],
  scala: [
    snippet('main', '@main def ${1:name}(): Unit =\n\t$0', 'main method'),
    snippet('fn', 'def ${1:name}(${2}): ${3:Unit} = {\n\t$0\n}', 'function'),
    snippet('pr', 'println($0)', 'println'),
    snippet('casecls', 'case class ${1:Name}(${2:value: String})', 'case class'),
  ],
  r: [
    snippet('fn', '${1:name} <- function(${2}) {\n\t$0\n}', 'function'),
    snippet('pr', 'print($0)', 'print'),
    snippet('lib', 'library(${1:package})$0', 'library'),
    snippet('fori', 'for (${1:i} in seq_len(${2:n})) {\n\t$0\n}', 'for loop'),
  ],
  fortran: [
    snippet('prog', 'program ${1:name}\n\timplicit none\n\t$0\nend program ${1:name}', 'program'),
    snippet('subr', 'subroutine ${1:name}(${2})\n\timplicit none\n\t$0\nend subroutine ${1:name}', 'subroutine'),
    snippet('func', 'function ${1:name}(${2}) result(${3:res})\n\timplicit none\n\t$0\nend function ${1:name}', 'function'),
    snippet('do', 'do ${1:i} = ${2:1}, ${3:n}\n\t$0\nend do', 'do loop'),
  ],
  mips: [
    snippet('main', '.text\n.globl main\nmain:\n\t$0\n\tli $v0, 10\n\tsyscall', 'main label'),
    snippet('printi', 'li $v0, 1\nmove $a0, ${1:$t0}\nsyscall$0', 'print integer syscall'),
    snippet('prints', 'li $v0, 4\nla $a0, ${1:message}\nsyscall$0', 'print string syscall'),
  ],
};

function getSnippetRange(model, position, label) {
  const lineContent = model.getLineContent(position.lineNumber);
  const linePrefix = lineContent.slice(0, Math.max(0, position.column - 1));
  const word = model.getWordUntilPosition(position);
  const exactIndex = linePrefix.lastIndexOf(label);
  const hasPunctuation = /[^A-Za-z0-9_]/.test(label);

  if (hasPunctuation && exactIndex !== -1 && exactIndex + label.length === linePrefix.length) {
    return {
      startLineNumber: position.lineNumber,
      endLineNumber: position.lineNumber,
      startColumn: exactIndex + 1,
      endColumn: position.column,
    };
  }

  if (word.word) {
    return {
      startLineNumber: position.lineNumber,
      endLineNumber: position.lineNumber,
      startColumn: word.startColumn,
      endColumn: word.endColumn,
    };
  }

  const tokenMatch = linePrefix.match(/[^\s"'`<>()\[\]{}]+$/);
  if (tokenMatch?.[0]) {
    return {
      startLineNumber: position.lineNumber,
      endLineNumber: position.lineNumber,
      startColumn: position.column - tokenMatch[0].length,
      endColumn: position.column,
    };
  }

  return {
    startLineNumber: position.lineNumber,
    endLineNumber: position.lineNumber,
    startColumn: position.column,
    endColumn: position.column,
  };
}

function toCompletionItem(entry, monaco, model, position) {
  return {
    label: entry.label,
    kind: monaco.languages.CompletionItemKind[entry.kind] ?? monaco.languages.CompletionItemKind.Snippet,
    insertText: entry.insertText ?? entry.label,
    insertTextRules: entry.insertText
      ? monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      : monaco.languages.CompletionItemInsertTextRule.None,
    detail: entry.detail,
    documentation: entry.documentation,
    sortText: entry.sortText || 'ab',
    filterText: entry.label,
    range: getSnippetRange(model, position, entry.label),
  };
}

function registerEmmetProviders(monaco) {
  if (emmetRegistered) {
    return;
  }

  emmetHTML(monaco, ['html'], { tokenizer: 'standard' });
  emmetCSS(monaco, ['css', 'scss'], { tokenizer: 'standard' });
  emmetJSX(monaco, ['javascript', 'typescript'], { tokenizer: 'standard' });
  emmetRegistered = true;
}

export function registerSnippetProviders(monaco) {
  if (providersRegistered) {
    return;
  }

  const allLanguageIds = new Set([
    ...Object.keys(friendlySnippetBundle.snippets),
    ...Object.keys(languageCompletionsBundle.completions),
  ]);

  allLanguageIds.forEach((languageId) => {
    const snippets = friendlySnippetBundle.snippets[languageId] || [];
    const completions = languageCompletionsBundle.completions[languageId] || [];
    const customEntries = customCompletions[languageId] || [];

    monaco.languages.registerCompletionItemProvider(languageId, {
      triggerCharacters: ['!', ':', '.', '_', '-', '*', '#'],
      provideCompletionItems(model, position) {
        return {
          suggestions: [...customEntries, ...snippets, ...completions].map((entry) => toCompletionItem(entry, monaco, model, position)),
        };
      },
    });
  });

  registerEmmetProviders(monaco);
  providersRegistered = true;
}
