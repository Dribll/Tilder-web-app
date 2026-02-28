import React, { useRef, useEffect } from "react";
import { Editor } from "@monaco-editor/react";

export default function MonacoEditor({ settings, language, code, MonacoEditorDisplay, monacoEditorStyle }) {
    // ⭐ SAFETY CHECK
    if (!settings) return null;
    return (

        <div id="editor-wrapper" style={monacoEditorStyle} className={`d-${MonacoEditorDisplay}`}>

            <Editor

                theme='vs-dark'

                defaultLanguage={language || "python"}

                path='fileName'

                language={language}

                value={code}

                options={settings}


            />

        </div>

    );

}