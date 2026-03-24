import React from 'react';
import { Editor } from '@monaco-editor/react';

export default function MonacoEditor({ settings, tab, onChange, onMount, MonacoEditorDisplay, monacoEditorStyle, onOpenCommandPalette }) {
  if (!settings || !tab) {
    return null;
  }

  function handleMount(editor, monaco) {
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
          suggestOnTriggerCharacters: true,
          quickSuggestions: true,
          tabCompletion: 'on',
          wordBasedSuggestions: 'currentDocument',
        }}
      />
    </div>
  );
}
