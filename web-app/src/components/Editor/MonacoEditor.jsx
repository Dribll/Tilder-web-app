import React from 'react';
import { Editor } from '@monaco-editor/react';
import { registerSnippetProviders } from './snippetProviders.js';

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

export default function MonacoEditor({ settings, tab, onChange, onMount, MonacoEditorDisplay, monacoEditorStyle, onOpenCommandPalette }) {
  if (!settings || !tab) {
    return null;
  }

  function handleMount(editor, monaco) {
    registerSnippetProviders(monaco);
    registerHtmlLinkedTagProvider(monaco);

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

    editor.addCommand(
      monaco.KeyCode.Enter,
      () => editor.trigger('keyboard', 'acceptSelectedSuggestion', {}),
      'suggestWidgetVisible'
    );

    onMount?.(editor, monaco);
  }

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
          snippetSuggestions: 'top',
          acceptSuggestionOnEnter: 'on',
          acceptSuggestionOnCommitCharacter: true,
          tabCompletion: 'on',
          linkedEditing: true,
          autoClosingBrackets: 'always',
          autoClosingQuotes: 'always',
          autoClosingDelete: 'always',
          autoClosingComments: 'always',
          autoSurround: 'languageDefined',
          wordBasedSuggestions: 'allDocuments',
        }}
      />
    </div>
  );
}
