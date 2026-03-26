import { emmetCSS, emmetHTML, emmetJSX } from 'emmet-monaco-es';
import friendlySnippetBundle from './friendlySnippets.generated.json';
import languageCompletionsBundle from './languageCompletions.generated.json';

let providersRegistered = false;
let emmetRegistered = false;

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

    monaco.languages.registerCompletionItemProvider(languageId, {
      triggerCharacters: ['!', ':', '.', '_', '-', '*', '#'],
      provideCompletionItems(model, position) {
        return {
          suggestions: [...snippets, ...completions].map((entry) => toCompletionItem(entry, monaco, model, position)),
        };
      },
    });
  });

  registerEmmetProviders(monaco);
  providersRegistered = true;
}
