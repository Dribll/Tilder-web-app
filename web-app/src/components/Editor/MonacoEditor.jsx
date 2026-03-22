import React from 'react';
import { Editor } from '@monaco-editor/react';

export default function MonacoEditor({ settings, tab, onChange, onMount, MonacoEditorDisplay, monacoEditorStyle }) {
  if (!settings || !tab) {
    return null;
  }

  return (
    <div id="editor-wrapper" style={monacoEditorStyle} className={`d-${MonacoEditorDisplay}`}>
      <Editor
        height="100%"
        theme="vs-dark"
        language={tab.language}
        value={tab.content}
        onChange={onChange}
        onMount={onMount}
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
