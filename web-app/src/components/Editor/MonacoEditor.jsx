import React from 'react';
import { Editor } from '@monaco-editor/react';
import { emmetCSS, emmetHTML, emmetJSX } from 'emmet-monaco-es';

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
let embeddedCssPropertiesCache = null;
const lspCompletionRegistrations = new Map();

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

  return rawItems.map((item, index) => ({
    label: typeof item.label === 'string' ? item.label : item.label?.label || '',
    kind: toMonacoCompletionKind(monaco, item.kind),
    insertText: item.insertText || (typeof item.label === 'string' ? item.label : item.label?.label || ''),
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
    filterText: item.filterText || undefined,
    range,
  }));
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

function isInsideHtmlStyleBlock(model, position) {
  const textBeforeCursor = model.getValueInRange({
    startLineNumber: 1,
    startColumn: 1,
    endLineNumber: position.lineNumber,
    endColumn: position.column,
  }).toLowerCase();

  const lastOpenStyle = textBeforeCursor.lastIndexOf('<style');
  const lastCloseStyle = textBeforeCursor.lastIndexOf('</style');

  return lastOpenStyle !== -1 && lastOpenStyle > lastCloseStyle;
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
    triggerCharacters: ['.', ':', '>', '"', "'", '/', '#'],
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
        });

        const word = model.getWordUntilPosition(position);
        const range = {
          startLineNumber: position.lineNumber,
          startColumn: word.startColumn,
          endLineNumber: position.lineNumber,
          endColumn: word.endColumn,
        };

        return {
          suggestions: toMonacoCompletionItems(monaco, response, range),
        };
      } catch {
        return { suggestions: [] };
      }
    },
  });

  lspCompletionRegistrations.set(languageId, disposable);
}

export default function MonacoEditor({
  settings,
  tab,
  onChange,
  onMount,
  MonacoEditorDisplay,
  monacoEditorStyle,
  onOpenCommandPalette,
  onGoToLine,
  intelliSense,
  lspBridge,
}) {
  const activeLspContextRef = React.useRef(null);

  if (!settings || !tab) {
    return null;
  }

  function handleMount(editor, monaco) {
    registerEmmetProviders(monaco);
    registerHtmlLinkedTagProvider(monaco);
    registerEmbeddedCssProvider(monaco);
    registerLspCompletionProvider(monaco, tab.language, () => activeLspContextRef.current);

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

    onMount?.(editor, monaco);
  }

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
    <div id="editor-wrapper" style={monacoEditorStyle} className={`d-${MonacoEditorDisplay}`}>
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
          },
          suggestSelection: 'first',
          snippetSuggestions: 'inline',
          acceptSuggestionOnEnter: 'on',
          acceptSuggestionOnCommitCharacter: true,
          tabCompletion: 'on',
          linkedEditing: true,
          autoClosingBrackets: 'languageDefined',
          autoClosingQuotes: 'always',
          autoClosingDelete: 'always',
          autoClosingComments: 'always',
          autoSurround: 'languageDefined',
          wordBasedSuggestions,
        }}
      />
    </div>
  );
}
