import React from 'react';
import { Editor } from '@monaco-editor/react';
import { emmetCSS, emmetHTML, emmetJSX } from 'emmet-monaco-es';
import { getExtensionCompletions } from '../../core/extensionsRuntime.js';

const VOID_HTML_TAGS = new Set([
  'area',
  'base',
  'br',
  'col',
  'embed',
  'hr',
  'img',
  'input',
  'link',
  'meta',
  'param',
  'source',
  'track',
  'wbr',
]);

let linkedHtmlTagProviderRegistered = false;
let emmetRegistered = false;
let embeddedCssProviderRegistered = false;
let embeddedJavaScriptProviderRegistered = false;
let embeddedCssPropertiesCache = null;
const lspCompletionRegistrations = new Map();
const extensionCompletionRegistrations = new Map();
const FALLBACK_LANGUAGE_COMPLETIONS = {
  c: [
    { label: 'main', kind: 'snippet', insertText: 'int main(void) {\n\t$0\n\treturn 0;\n}', detail: 'Main function' },
    { label: '#include', kind: 'keyword', insertText: '#include <$0>', detail: 'Include header' },
    { label: 'printf', kind: 'function', insertText: 'printf("${1:text}\\n"${2});', detail: 'Print formatted output' },
    { label: 'for', kind: 'snippet', insertText: 'for (int ${1:i} = 0; ${1:i} < ${2:n}; ${1:i}++) {\n\t$0\n}', detail: 'For loop' },
    { label: 'if', kind: 'snippet', insertText: 'if (${1:condition}) {\n\t$0\n}', detail: 'If statement' },
    { label: 'while', kind: 'snippet', insertText: 'while (${1:condition}) {\n\t$0\n}', detail: 'While loop' },
    { label: 'struct', kind: 'snippet', insertText: 'struct ${1:Name} {\n\t$0\n};', detail: 'Struct declaration' },
  ],
  cpp: [
    { label: 'main', kind: 'snippet', insertText: 'int main() {\n\t$0\n\treturn 0;\n}', detail: 'Main function' },
    { label: '#include', kind: 'keyword', insertText: '#include <$0>', detail: 'Include header' },
    { label: 'cout', kind: 'snippet', insertText: 'std::cout << ${1:value} << std::endl;$0', detail: 'Standard output' },
    { label: 'cin', kind: 'snippet', insertText: 'std::cin >> ${1:value};$0', detail: 'Standard input' },
    { label: 'for', kind: 'snippet', insertText: 'for (int ${1:i} = 0; ${1:i} < ${2:n}; ${1:i}++) {\n\t$0\n}', detail: 'For loop' },
    { label: 'if', kind: 'snippet', insertText: 'if (${1:condition}) {\n\t$0\n}', detail: 'If statement' },
    { label: 'class', kind: 'snippet', insertText: 'class ${1:Name} {\npublic:\n\t${1:Name}();\n\t$0\n};', detail: 'Class declaration' },
    { label: 'struct', kind: 'snippet', insertText: 'struct ${1:Name} {\n\t$0\n};', detail: 'Struct declaration' },
    { label: 'namespace', kind: 'snippet', insertText: 'namespace ${1:name} {\n\t$0\n}', detail: 'Namespace declaration' },
  ],
  python: [
    { label: 'def', kind: 'snippet', insertText: 'def ${1:name}(${2:args}):\n\t$0', detail: 'Function definition' },
    { label: 'class', kind: 'snippet', insertText: 'class ${1:Name}:\n\tdef __init__(self${2:, args}):\n\t\t$0', detail: 'Class definition' },
    { label: 'ifmain', kind: 'snippet', insertText: 'if __name__ == "__main__":\n\t$0', detail: 'Entry point guard' },
    { label: 'for', kind: 'snippet', insertText: 'for ${1:item} in ${2:items}:\n\t$0', detail: 'For loop' },
  ],
  javascript: [
    { label: 'const', kind: 'keyword', insertText: 'const ${1:name} = ${2:value};$0', detail: 'Const declaration' },
    { label: 'let', kind: 'keyword', insertText: 'let ${1:name} = ${2:value};$0', detail: 'Let declaration' },
    { label: 'function', kind: 'snippet', insertText: 'function ${1:name}(${2:args}) {\n\t$0\n}', detail: 'Function declaration' },
    { label: 'if', kind: 'snippet', insertText: 'if (${1:condition}) {\n\t$0\n}', detail: 'If statement' },
    { label: 'for', kind: 'snippet', insertText: 'for (let ${1:i} = 0; ${1:i} < ${2:length}; ${1:i}++) {\n\t$0\n}', detail: 'For loop' },
    { label: 'console.log', kind: 'function', insertText: 'console.log(${1:value});$0', detail: 'Console log' },
    { label: 'document.querySelector', kind: 'function', insertText: "document.querySelector('${1:selector}')$0", detail: 'Select first DOM node' },
    { label: 'addEventListener', kind: 'function', insertText: "addEventListener('${1:event}', (${2:event}) => {\n\t$0\n});", detail: 'Event listener' },
    { label: 'return', kind: 'keyword', insertText: 'return ${1:value};$0', detail: 'Return statement' },
    { label: 'async', kind: 'snippet', insertText: 'async function ${1:name}(${2:args}) {\n\t$0\n}', detail: 'Async function' },
    { label: 'await', kind: 'keyword', insertText: 'await ${1:expression}$0', detail: 'Await expression' },
  ],
  typescript: [
    { label: 'const', kind: 'keyword', insertText: 'const ${1:name}: ${2:type} = ${3:value};$0', detail: 'Typed const declaration' },
    { label: 'interface', kind: 'snippet', insertText: 'interface ${1:Name} {\n\t$0\n}', detail: 'Interface declaration' },
    { label: 'type', kind: 'snippet', insertText: 'type ${1:Name} = ${2:Value};$0', detail: 'Type alias' },
    { label: 'function', kind: 'snippet', insertText: 'function ${1:name}(${2:args}): ${3:void} {\n\t$0\n}', detail: 'Function declaration' },
    { label: 'console.log', kind: 'function', insertText: 'console.log(${1:value});$0', detail: 'Console log' },
  ],
  java: [
    { label: 'main', kind: 'snippet', insertText: 'public static void main(String[] args) {\n\t$0\n}', detail: 'Main method' },
    { label: 'sout', kind: 'snippet', insertText: 'System.out.println(${1});$0', detail: 'Print line' },
    { label: 'class', kind: 'snippet', insertText: 'public class ${1:Main} {\n\t$0\n}', detail: 'Class declaration' },
  ],
  go: [
    { label: 'main', kind: 'snippet', insertText: 'func main() {\n\t$0\n}', detail: 'Main function' },
    { label: 'func', kind: 'snippet', insertText: 'func ${1:name}(${2:args}) ${3:error} {\n\t$0\n}', detail: 'Function declaration' },
    { label: 'iferr', kind: 'snippet', insertText: 'if err != nil {\n\t$0\n}', detail: 'Error guard' },
  ],
  rust: [
    { label: 'main', kind: 'snippet', insertText: 'fn main() {\n\t$0\n}', detail: 'Main function' },
    { label: 'println', kind: 'snippet', insertText: 'println!(\"${1}\");$0', detail: 'Print line' },
    { label: 'impl', kind: 'snippet', insertText: 'impl ${1:Type} {\n\t$0\n}', detail: 'Impl block' },
  ],
  csharp: [
    { label: 'main', kind: 'snippet', insertText: 'static void Main(string[] args)\n{\n\t$0\n}', detail: 'Main method' },
    { label: 'class', kind: 'snippet', insertText: 'class ${1:Program}\n{\n\t$0\n}', detail: 'Class declaration' },
  ],
  php: [
    { label: 'echo', kind: 'snippet', insertText: 'echo ${1:$value};$0', detail: 'Output expression' },
    { label: 'function', kind: 'snippet', insertText: 'function ${1:name}(${2:$args}) {\n\t$0\n}', detail: 'Function declaration' },
  ],
  shell: [
    { label: '#!/usr/bin/env bash', kind: 'snippet', insertText: '#!/usr/bin/env bash\n\n$0', detail: 'Bash shebang' },
    { label: 'if', kind: 'snippet', insertText: 'if [[ ${1:condition} ]]; then\n\t$0\nfi', detail: 'If statement' },
    { label: 'for', kind: 'snippet', insertText: 'for ${1:item} in ${2:list}; do\n\t$0\ndone', detail: 'For loop' },
    { label: 'case', kind: 'snippet', insertText: 'case "${1:value}" in\n\t${2:pattern})\n\t\t$0\n\t\t;;\nesac', detail: 'Case statement' },
    { label: 'echo', kind: 'snippet', insertText: 'echo "${1:text}"$0', detail: 'Print text' },
    { label: 'function', kind: 'snippet', insertText: '${1:name}() {\n\t$0\n}', detail: 'Shell function' },
  ],
  yaml: [
    { label: 'key', kind: 'snippet', insertText: '${1:key}: ${2:value}$0', detail: 'Key-value pair' },
    { label: 'list', kind: 'snippet', insertText: '${1:key}:\n  - ${2:item}$0', detail: 'YAML list' },
    { label: 'map', kind: 'snippet', insertText: '${1:key}:\n  ${2:child}: ${3:value}$0', detail: 'Nested mapping' },
    { label: 'true', kind: 'keyword', insertText: 'true', detail: 'Boolean true' },
    { label: 'false', kind: 'keyword', insertText: 'false', detail: 'Boolean false' },
    { label: 'null', kind: 'keyword', insertText: 'null', detail: 'Null value' },
  ],
  dockerfile: [
    { label: 'FROM', kind: 'keyword', insertText: 'FROM ${1:image}:${2:tag}$0', detail: 'Base image' },
    { label: 'RUN', kind: 'keyword', insertText: 'RUN ${1:command}$0', detail: 'Run shell command' },
    { label: 'COPY', kind: 'keyword', insertText: 'COPY ${1:source} ${2:destination}$0', detail: 'Copy files' },
    { label: 'WORKDIR', kind: 'keyword', insertText: 'WORKDIR ${1:/app}$0', detail: 'Working directory' },
    { label: 'CMD', kind: 'snippet', insertText: 'CMD ["${1:executable}", "${2:arg}"]$0', detail: 'Container command' },
    { label: 'ENTRYPOINT', kind: 'snippet', insertText: 'ENTRYPOINT ["${1:executable}"]$0', detail: 'Container entrypoint' },
    { label: 'ENV', kind: 'keyword', insertText: 'ENV ${1:NAME}=${2:value}$0', detail: 'Environment variable' },
    { label: 'EXPOSE', kind: 'keyword', insertText: 'EXPOSE ${1:3000}$0', detail: 'Expose port' },
  ],
};

function toMonacoCompletionKind(monaco, lspKind) {
  const completionKind = monaco.languages.CompletionItemKind;
  const kindMap = {
    1: completionKind.Text,
    2: completionKind.Method,
    3: completionKind.Function,
    4: completionKind.Constructor,
    5: completionKind.Field,
    6: completionKind.Variable,
    7: completionKind.Class,
    8: completionKind.Interface,
    9: completionKind.Module,
    10: completionKind.Property,
    11: completionKind.Unit,
    12: completionKind.Value,
    13: completionKind.Enum,
    14: completionKind.Keyword,
    15: completionKind.Snippet,
    16: completionKind.Color,
    17: completionKind.File,
    18: completionKind.Reference,
    19: completionKind.Folder,
    20: completionKind.EnumMember,
    21: completionKind.Constant,
    22: completionKind.Struct,
    23: completionKind.Event,
    24: completionKind.Operator,
    25: completionKind.TypeParameter,
  };

  return kindMap[lspKind] || completionKind.Text;
}

function toMonacoCompletionItems(monaco, response, range) {
  const rawItems = Array.isArray(response) ? response : Array.isArray(response?.items) ? response.items : [];

  return rawItems
    .map((item, index) => {
      const label =
        typeof item.label === 'string' ? item.label : item.label?.label || item.insertText || '';
      const textEditRange =
        item.textEdit?.range && item.textEdit?.newText
          ? {
              startLineNumber: Number(item.textEdit.range.start?.line || 0) + 1,
              startColumn: Number(item.textEdit.range.start?.character || 0) + 1,
              endLineNumber: Number(item.textEdit.range.end?.line || 0) + 1,
              endColumn: Number(item.textEdit.range.end?.character || 0) + 1,
            }
          : null;

      return {
        label,
        kind: toMonacoCompletionKind(monaco, item.kind),
        insertText: item.textEdit?.newText || item.insertText || label,
        insertTextRules:
          item.insertTextFormat === 2
            ? monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
            : monaco.languages.CompletionItemInsertTextRule.None,
        detail: item.detail || '',
        documentation:
          typeof item.documentation === 'string'
            ? item.documentation
            : item.documentation?.value || item.documentation?.kind || '',
        sortText: item.sortText || `z-${String(index).padStart(4, '0')}`,
        filterText: item.filterText || label,
        range: textEditRange || range,
        preselect: Boolean(item.preselect),
        commitCharacters: Array.isArray(item.commitCharacters) ? item.commitCharacters : undefined,
      };
    })
    .filter((item) => item.label);
}

function toFallbackCompletionKind(monaco, kind) {
  switch (kind) {
    case 'function':
      return monaco.languages.CompletionItemKind.Function;
    case 'keyword':
      return monaco.languages.CompletionItemKind.Keyword;
    case 'snippet':
    default:
      return monaco.languages.CompletionItemKind.Snippet;
  }
}

function buildFallbackCompletionItems(monaco, languageId, range) {
  const items = FALLBACK_LANGUAGE_COMPLETIONS[languageId] || [];
  return items.map((item, index) => ({
    label: item.label,
    kind: toFallbackCompletionKind(monaco, item.kind),
    insertText: item.insertText,
    insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    detail: item.detail || '',
    filterText: item.label,
    sortText: `zz-${String(index).padStart(4, '0')}`,
    range,
  }));
}

function buildExtensionCompletionItems(monaco, languageId, range) {
  return getExtensionCompletions(languageId).map((item, index) => ({
    label: item.label,
    kind: toFallbackCompletionKind(monaco, item.kind),
    insertText: item.insertText,
    insertTextRules:
      item.kind === 'snippet'
        ? monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
        : monaco.languages.CompletionItemInsertTextRule.None,
    detail: item.detail || '',
    documentation: item.documentation || '',
    filterText: item.filterText || item.label,
    sortText: item.sortText || `zy-ext-${String(index).padStart(4, '0')}`,
    range,
  }));
}

function getTriggerCharacter(model, position) {
  const offset = model.getOffsetAt(position);
  const text = model.getValue();
  const previousCharacter = text[Math.max(0, offset - 1)] || '';
  return /[.:>#"'/]/.test(previousCharacter) ? previousCharacter : undefined;
}

function shouldUseManualSuggestTrigger(providerType) {
  return providerType === 'lsp' || providerType === 'basic';
}

function isUserTypingSuggestTrigger(text) {
  if (typeof text !== 'string' || text.length !== 1) {
    return false;
  }

  return /[A-Za-z0-9_:#./"'(-]/.test(text);
}

function offsetToRange(model, startOffset, endOffset) {
  const start = model.getPositionAt(startOffset);
  const end = model.getPositionAt(endOffset);
  return {
    startLineNumber: start.lineNumber,
    startColumn: start.column,
    endLineNumber: end.lineNumber,
    endColumn: end.column,
  };
}

function buildHtmlTagPairs(text) {
  const tagPattern = /<\/?([A-Za-z][\w:-]*)?[^>]*?>/g;
  const stack = [];
  const pairs = [];
  let match;

  while ((match = tagPattern.exec(text))) {
    const [tagText, rawName = ''] = match;
    const name = rawName.toLowerCase();
    const isClosing = tagText.startsWith('</');
    const isSelfClosing = /\/\s*>$/.test(tagText);
    const nameStartOffset = match.index + (isClosing ? 2 : 1);
    const nameEndOffset = nameStartOffset + rawName.length;

    if (!isClosing && !isSelfClosing && !VOID_HTML_TAGS.has(name)) {
      stack.push({
        name,
        range: { startOffset: nameStartOffset, endOffset: nameEndOffset },
      });
      continue;
    }

    if (isClosing) {
      for (let index = stack.length - 1; index >= 0; index -= 1) {
        const canLink =
          stack[index].name === name ||
          stack[index].name.length === 0 ||
          name.length === 0;

        if (!canLink) {
          continue;
        }

        const [openTag] = stack.splice(index, 1);
        pairs.push({
          openRange: openTag.range,
          closeRange: { startOffset: nameStartOffset, endOffset: nameEndOffset },
        });
        break;
      }
    }
  }

  return pairs;
}

function registerHtmlLinkedTagProvider(monaco) {
  if (linkedHtmlTagProviderRegistered) {
    return;
  }

  monaco.languages.registerLinkedEditingRangeProvider('html', {
    provideLinkedEditingRanges(model, position) {
      const text = model.getValue();
      const offset = model.getOffsetAt(position);
      const pairs = buildHtmlTagPairs(text);

      for (const pair of pairs) {
        const isInsideOpen =
          offset >= pair.openRange.startOffset && offset <= pair.openRange.endOffset;
        const isInsideClose =
          offset >= pair.closeRange.startOffset && offset <= pair.closeRange.endOffset;

        if (!isInsideOpen && !isInsideClose) {
          continue;
        }

        return {
          ranges: [
            offsetToRange(model, pair.openRange.startOffset, pair.openRange.endOffset),
            offsetToRange(model, pair.closeRange.startOffset, pair.closeRange.endOffset),
          ],
          wordPattern: /[\w:-]*/,
        };
      }

      return null;
    },
  });

  linkedHtmlTagProviderRegistered = true;
}

function getIndentUnit(tab, settings) {
  const insertSpaces = tab?.insertSpaces ?? settings?.insertSpaces;
  const tabSize = Number(tab?.tabSize ?? settings?.tabSize) || 2;
  return insertSpaces ? ' '.repeat(tabSize) : '\t';
}

function getHtmlTextBeforePosition(model, position) {
  return model.getValueInRange({
    startLineNumber: 1,
    startColumn: 1,
    endLineNumber: position.lineNumber,
    endColumn: position.column,
  });
}

function isInsideHtmlTagBlock(model, position, tagName) {
  const textBeforeCursor = getHtmlTextBeforePosition(model, position).toLowerCase();
  const openTagPattern = `<${tagName}`;
  const closeTagPattern = `</${tagName}`;
  const lastOpen = textBeforeCursor.lastIndexOf(openTagPattern);
  const lastClose = textBeforeCursor.lastIndexOf(closeTagPattern);
  return lastOpen !== -1 && lastOpen > lastClose;
}

function isInsideHtmlStyleBlock(model, position) {
  return isInsideHtmlTagBlock(model, position, 'style');
}

function isInsideHtmlScriptBlock(model, position) {
  return isInsideHtmlTagBlock(model, position, 'script');
}

function isInsideHtmlEmbeddedText(model, position, tagName) {
  if (!isInsideHtmlTagBlock(model, position, tagName)) {
    return false;
  }

  const textBeforeCursor = model.getValueInRange({
    startLineNumber: 1,
    startColumn: 1,
    endLineNumber: position.lineNumber,
    endColumn: position.column,
  });
  const lastOpenBracket = textBeforeCursor.lastIndexOf('>');
  const lastTagStart = textBeforeCursor.lastIndexOf(`<${tagName}`);
  return lastTagStart !== -1 && lastOpenBracket > lastTagStart;
}

function handleHtmlStyleBlockEnter(editor, monaco, tab, settings) {
  if (tab?.language !== 'html') {
    return false;
  }

  const model = editor.getModel?.();
  const position = editor.getPosition?.();
  if (!model || !position || !isInsideHtmlStyleBlock(model, position)) {
    return false;
  }

  const lineContent = model.getLineContent(position.lineNumber);
  const beforeCursor = lineContent.slice(0, Math.max(0, position.column - 1));
  const afterCursor = lineContent.slice(Math.max(0, position.column - 1));
  const trimmedBefore = beforeCursor.trimEnd();
  const trimmedAfter = afterCursor.trimStart();

  if (!trimmedBefore.endsWith('{') || !trimmedAfter.startsWith('}')) {
    return false;
  }

  const baseIndent = beforeCursor.match(/^\s*/)?.[0] || '';
  const indentUnit = getIndentUnit(tab, settings);
  const insertText = `\n${baseIndent}${indentUnit}\n${baseIndent}`;

  editor.executeEdits('tilder-html-style-enter', [
    {
      range: new monaco.Range(
        position.lineNumber,
        position.column,
        position.lineNumber,
        position.column
      ),
      text: insertText,
      forceMoveMarkers: true,
    },
  ]);

  editor.setPosition({
    lineNumber: position.lineNumber + 1,
    column: baseIndent.length + indentUnit.length + 1,
  });
  editor.revealPositionInCenterIfOutsideViewport({
    lineNumber: position.lineNumber + 1,
    column: baseIndent.length + indentUnit.length + 1,
  });
  return true;
}

function toKebabCase(value) {
  return String(value || '')
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replace(/^ms-/, '-ms-')
    .toLowerCase();
}

function getEmbeddedCssProperties() {
  if (embeddedCssPropertiesCache) {
    return embeddedCssPropertiesCache;
  }

  const seededProperties = new Set([
    'align-items',
    'background',
    'background-color',
    'border',
    'border-radius',
    'bottom',
    'box-shadow',
    'color',
    'display',
    'flex',
    'flex-direction',
    'font-family',
    'font-size',
    'font-weight',
    'gap',
    'grid-template-columns',
    'height',
    'justify-content',
    'left',
    'letter-spacing',
    'line-height',
    'list-style',
    'margin',
    'margin-top',
    'opacity',
    'padding',
    'position',
    'right',
    'text-align',
    'top',
    'transform',
    'transition',
    'width',
    'z-index',
  ]);

  if (typeof window !== 'undefined' && window.CSSStyleDeclaration) {
    const prototypeNames = Object.getOwnPropertyNames(window.CSSStyleDeclaration.prototype);
    prototypeNames
      .filter((name) => /^[A-Za-z]/.test(name) && !name.startsWith('webkit') && !name.startsWith('constructor'))
      .map(toKebabCase)
      .filter((name) => name && !name.includes('('))
      .forEach((name) => seededProperties.add(name));
  }

  embeddedCssPropertiesCache = [...seededProperties].sort((left, right) => left.localeCompare(right));
  return embeddedCssPropertiesCache;
}

function isInsideHtmlCssDeclarationBlock(model, position) {
  if (!isInsideHtmlStyleBlock(model, position)) {
    return false;
  }

  const textBeforeCursor = model.getValueInRange({
    startLineNumber: 1,
    startColumn: 1,
    endLineNumber: position.lineNumber,
    endColumn: position.column,
  });

  const lastOpenBrace = textBeforeCursor.lastIndexOf('{');
  const lastCloseBrace = textBeforeCursor.lastIndexOf('}');
  return lastOpenBrace !== -1 && lastOpenBrace > lastCloseBrace;
}

function registerEmbeddedCssProvider(monaco) {
  if (embeddedCssProviderRegistered) {
    return;
  }

  monaco.languages.registerCompletionItemProvider('html', {
    triggerCharacters: ['-', ':'],
    provideCompletionItems(model, position) {
      if (!isInsideHtmlCssDeclarationBlock(model, position)) {
        return { suggestions: [] };
      }

      const linePrefix = model.getLineContent(position.lineNumber).slice(0, Math.max(0, position.column - 1));
      const trimmedLinePrefix = linePrefix.trim();
      if (!trimmedLinePrefix || trimmedLinePrefix.endsWith('{')) {
        return { suggestions: [] };
      }

      const lastColonIndex = linePrefix.lastIndexOf(':');
      const lastSemicolonIndex = linePrefix.lastIndexOf(';');
      if (lastColonIndex > lastSemicolonIndex) {
        return { suggestions: [] };
      }

      const word = model.getWordUntilPosition(position);
      const range = {
        startLineNumber: position.lineNumber,
        startColumn: word.startColumn,
        endLineNumber: position.lineNumber,
        endColumn: word.endColumn,
      };

      const suggestions = getEmbeddedCssProperties().map((propertyName) => ({
        label: propertyName,
        kind: monaco.languages.CompletionItemKind.Property,
        insertText: `${propertyName}: \${1};`,
        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
        documentation: `CSS property: ${propertyName}`,
        filterText: propertyName,
        sortText: `a-${propertyName}`,
        range,
      }));

      return { suggestions };
    },
  });

  embeddedCssProviderRegistered = true;
}

function registerEmbeddedJavaScriptProvider(monaco) {
  if (embeddedJavaScriptProviderRegistered) {
    return;
  }

  monaco.languages.registerCompletionItemProvider('html', {
    triggerCharacters: ['.', '(', '"', "'", '['],
    provideCompletionItems(model, position) {
      if (!isInsideHtmlEmbeddedText(model, position, 'script')) {
        return { suggestions: [] };
      }

      const word = model.getWordUntilPosition(position);
      const range = {
        startLineNumber: position.lineNumber,
        startColumn: word.startColumn,
        endLineNumber: position.lineNumber,
        endColumn: word.endColumn,
      };

      return {
        suggestions: buildFallbackCompletionItems(monaco, 'javascript', range).map((item, index) => ({
          ...item,
          sortText: `aj-${String(index).padStart(4, '0')}`,
        })),
      };
    },
  });

  embeddedJavaScriptProviderRegistered = true;
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

function registerLspCompletionProvider(monaco, languageId, getLspContext) {
  if (!languageId || lspCompletionRegistrations.has(languageId)) {
    return;
  }

  const disposable = monaco.languages.registerCompletionItemProvider(languageId, {
    triggerCharacters: ['.', ':', '>', '"', "'", '/', '#', '(', '<', ' '],
    async provideCompletionItems(model, position) {
      const context = getLspContext();
      if (!context || context.languageId !== languageId || !context.bridge) {
        return { suggestions: [] };
      }

      try {
        const response = await context.bridge.requestCompletion({
          relativePath: context.relativePath,
          fileName: context.fileName,
          text: model.getValue(),
          position,
          triggerCharacter: getTriggerCharacter(model, position),
        });

        const word = model.getWordUntilPosition(position);
        const range = {
          startLineNumber: position.lineNumber,
          startColumn: word.startColumn,
          endLineNumber: position.lineNumber,
          endColumn: word.endColumn,
        };

        const suggestions = toMonacoCompletionItems(monaco, response, range);
        const extensionSuggestions = buildExtensionCompletionItems(monaco, languageId, range);
        return {
          suggestions: suggestions.length
            ? [...suggestions, ...extensionSuggestions, ...buildFallbackCompletionItems(monaco, languageId, range)]
            : [...extensionSuggestions, ...buildFallbackCompletionItems(monaco, languageId, range)],
        };
      } catch {
        return {
          suggestions: [
            ...buildExtensionCompletionItems(monaco, languageId, range),
            ...buildFallbackCompletionItems(monaco, languageId, range),
          ],
        };
      }
    },
  });

  lspCompletionRegistrations.set(languageId, disposable);
}

function registerExtensionCompletionProvider(monaco, languageId) {
  if (!languageId || extensionCompletionRegistrations.has(languageId)) {
    return;
  }

  const disposable = monaco.languages.registerCompletionItemProvider(languageId, {
    triggerCharacters: ['.', ':', '>', '"', "'", '/', '#', '(', '<', ' '],
    provideCompletionItems(model, position) {
      const word = model.getWordUntilPosition(position);
      const range = {
        startLineNumber: position.lineNumber,
        startColumn: word.startColumn,
        endLineNumber: position.lineNumber,
        endColumn: word.endColumn,
      };

      return {
        suggestions: buildExtensionCompletionItems(monaco, languageId, range),
      };
    },
  });

  extensionCompletionRegistrations.set(languageId, disposable);
}

function classifyBinaryTab(tab) {
  if (!tab?.isBinary) {
    return 'text';
  }
  const mimeType = String(tab.mimeType || '').toLowerCase();
  if (mimeType.startsWith('image/')) {
    return 'image';
  }
  if (mimeType.startsWith('audio/')) {
    return 'audio';
  }
  if (mimeType.startsWith('video/')) {
    return 'video';
  }
  if (mimeType === 'application/pdf') {
    return 'pdf';
  }
  return 'binary';
}

export default function MonacoEditor({
  settings,
  tab,
  onChange,
  onMount,
  onFocusEditor,
  MonacoEditorDisplay,
  monacoEditorStyle,
  onOpenCommandPalette,
  onGoToLine,
  intelliSense,
  lspBridge,
}) {
  const activeLspContextRef = React.useRef(null);
  const activeIntelliSenseRef = React.useRef(intelliSense);
  const [binaryViewMode, setBinaryViewMode] = React.useState('preview');

  if (!settings || !tab) {
    return null;
  }

  const binaryKind = classifyBinaryTab(tab);
  const isBinaryTab = binaryKind !== 'text';
  const canPreviewBinary = binaryKind === 'image' || binaryKind === 'pdf' || binaryKind === 'audio' || binaryKind === 'video';
  const binaryPreviewUrl = React.useMemo(() => {
    if (!isBinaryTab || !canPreviewBinary || !tab.content) {
      return '';
    }
    return `data:${tab.mimeType || 'application/octet-stream'};base64,${tab.content}`;
  }, [canPreviewBinary, isBinaryTab, tab.content, tab.mimeType]);

  React.useEffect(() => {
    setBinaryViewMode(canPreviewBinary ? 'preview' : 'raw');
  }, [tab.id, canPreviewBinary]);

  function handleMount(editor, monaco) {
    registerEmmetProviders(monaco);
    registerHtmlLinkedTagProvider(monaco);
    registerEmbeddedCssProvider(monaco);
    registerEmbeddedJavaScriptProvider(monaco);
    registerLspCompletionProvider(monaco, tab.language, () => activeLspContextRef.current);
    registerExtensionCompletionProvider(monaco, tab.language);

    monaco.editor.defineTheme('tilder-night', {
      base: 'vs-dark',
      inherit: true,
      rules: [
        { token: 'comment', foreground: '6f7c99' },
        { token: 'keyword', foreground: 'c7a3ff' },
        { token: 'string', foreground: '8fe388' },
        { token: 'number', foreground: 'ffd27a' },
        { token: 'type.identifier', foreground: '7dcfff' },
        { token: 'identifier', foreground: 'e8edff' },
      ],
      colors: {
        'editor.background': '#0a0d16',
        'editor.foreground': '#edf1ff',
        'editorCursor.foreground': '#a79dff',
        'editor.lineHighlightBackground': '#151a2a',
        'editorLineNumber.foreground': '#5b6685',
        'editorLineNumber.activeForeground': '#cdd7ff',
        'editor.selectionBackground': '#2d3560',
        'editor.inactiveSelectionBackground': '#232941',
        'editorIndentGuide.background1': '#1c2236',
        'editorIndentGuide.activeBackground1': '#414b73',
        'editorWidget.background': '#121726',
        'editorWidget.border': '#2f3760',
        'editorSuggestWidget.background': '#121726',
        'editorSuggestWidget.border': '#2f3760',
        'editorSuggestWidget.selectedBackground': '#242d4a',
        'editorHoverWidget.background': '#121726',
        'editorHoverWidget.border': '#2f3760',
        'scrollbarSlider.background': '#3a4470aa',
        'scrollbarSlider.hoverBackground': '#4b578faa',
        'scrollbarSlider.activeBackground': '#6270b8aa',
      },
    });

    monaco.editor.setTheme('tilder-night');

    if (onOpenCommandPalette) {
      editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyMod.Shift | monaco.KeyCode.KeyP, () => onOpenCommandPalette());
      editor.addCommand(monaco.KeyCode.F1, () => onOpenCommandPalette());
    }

    if (onGoToLine) {
      editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyG, () => onGoToLine());
    }

    editor.addCommand(
      monaco.KeyCode.Enter,
      () => editor.trigger('keyboard', 'acceptSelectedSuggestion', {}),
      'suggestWidgetVisible'
    );

    editor.addCommand(
      monaco.KeyCode.Enter,
      () => {
        if (handleHtmlStyleBlockEnter(editor, monaco, tab, settings)) {
          return;
        }

        editor.trigger('keyboard', 'type', { text: '\n' });
      },
      '!suggestWidgetVisible'
    );

    editor.onDidChangeModelContent((event) => {
      const nextIntelliSense = activeIntelliSenseRef.current;
      if (!nextIntelliSense?.providerType) {
        return;
      }

      if (!shouldUseManualSuggestTrigger(nextIntelliSense.providerType)) {
        return;
      }

      const shouldTriggerSuggest = event.changes.some((change) => {
        return isUserTypingSuggestTrigger(change.text);
      });

      if (!shouldTriggerSuggest) {
        return;
      }

      window.setTimeout(() => {
        editor.trigger('keyboard', 'editor.action.triggerSuggest', {});
      }, 0);
    });

    editor.onDidFocusEditorText(() => {
      onFocusEditor?.(editor, monaco, tab);
    });

    onMount?.(editor, monaco);
  }

  React.useEffect(() => {
    activeIntelliSenseRef.current = intelliSense;
  }, [intelliSense]);

  React.useEffect(() => {
    activeLspContextRef.current =
      intelliSense?.providerType === 'lsp' && lspBridge
        ? {
            bridge: lspBridge,
            languageId: tab.language,
            relativePath: tab.path === 'root' ? tab.name : tab.path,
            fileName: tab.name,
          }
        : null;
  }, [intelliSense?.providerType, lspBridge, tab.language, tab.name, tab.path]);

  const wordBasedSuggestions =
    intelliSense?.providerType === 'native'
      ? 'matchingDocuments'
      : intelliSense?.providerType === 'basic'
        ? 'currentDocument'
      : intelliSense?.providerType === 'lsp' && intelliSense?.available
        ? 'currentDocument'
        : false;

  return (
    <div className={`editor-wrapper d-${MonacoEditorDisplay}`} style={monacoEditorStyle}>
      {isBinaryTab ? (
        <div className="binary-editor-surface">
          <div className="binary-editor-toolbar">
            <span className="binary-editor-label">Binary file</span>
            <button
              type="button"
              className={`binary-editor-tab ${binaryViewMode === 'preview' ? 'active' : ''}`}
              disabled={!canPreviewBinary}
              onClick={() => setBinaryViewMode('preview')}
            >
              Preview
            </button>
            <button
              type="button"
              className={`binary-editor-tab ${binaryViewMode === 'raw' ? 'active' : ''}`}
              onClick={() => setBinaryViewMode('raw')}
            >
              Raw binary (base64)
            </button>
          </div>
          {binaryViewMode === 'preview' && canPreviewBinary ? (
            <div className="binary-preview-container">
              {binaryKind === 'image' ? (
                <img src={binaryPreviewUrl} alt={tab.name || 'image preview'} className="binary-preview-image" />
              ) : binaryKind === 'audio' ? (
                <audio controls src={binaryPreviewUrl} className="binary-preview-audio" />
              ) : binaryKind === 'video' ? (
                <video controls src={binaryPreviewUrl} className="binary-preview-video" />
              ) : (
                <iframe title={tab.name || 'PDF preview'} src={binaryPreviewUrl} className="binary-preview-pdf" />
              )}
            </div>
          ) : (
            <Editor
              height="100%"
              theme="tilder-night"
              language="plaintext"
              value={tab.content}
              onChange={onChange}
              onMount={handleMount}
              options={{
                ...settings,
                automaticLayout: true,
                glyphMargin: false,
                wordWrap: 'on',
                minimap: { enabled: false },
              }}
            />
          )}
        </div>
      ) : (
        <Editor
          height="100%"
          theme="tilder-night"
          language={tab.language}
          value={tab.content}
          onChange={onChange}
          onMount={handleMount}
          options={{
            ...settings,
            tabSize: tab.tabSize ?? settings.tabSize,
            insertSpaces: tab.insertSpaces ?? settings.insertSpaces,
            automaticLayout: true,
            glyphMargin: true,
            autoIndent: 'full',
            suggestOnTriggerCharacters: true,
            quickSuggestionsDelay: 0,
            quickSuggestions: {
              other: true,
              comments: false,
              strings: true,
            },
            suggest: {
              selectionMode: 'always',
              snippetsPreventQuickSuggestions: false,
              showWords: true,
              showSnippets: true,
              localityBonus: true,
            },
            suggestSelection: 'first',
            snippetSuggestions: 'bottom',
            acceptSuggestionOnEnter: 'smart',
            acceptSuggestionOnCommitCharacter: true,
            tabCompletion: 'on',
            parameterHints: {
              enabled: true,
            },
            linkedEditing: true,
            autoClosingBrackets: 'languageDefined',
            autoClosingQuotes: 'always',
            autoClosingDelete: 'always',
            autoClosingComments: 'always',
            autoSurround: 'languageDefined',
            wordBasedSuggestions,
          }}
        />
      )}
    </div>
  );
}
