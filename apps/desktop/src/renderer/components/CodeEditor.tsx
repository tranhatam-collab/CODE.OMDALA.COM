import Prism from 'prismjs';
import type React from 'react';
import { useEffect } from 'react';
import Editor from 'react-simple-code-editor';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-json';
import 'prismjs/themes/prism-tomorrow.css';

interface EditorProps {
  value: string;
  onChange?: (value: string) => void;
  language?: string;
  readOnly?: boolean;
}

export const CodeEditor: React.FC<EditorProps> = ({
  value,
  onChange,
  language = 'javascript',
  readOnly = false,
}) => {
  useEffect(() => {
    Prism.highlightAll();
  }, [value, language]);

  return (
    <div
      className="code-editor-container"
      style={{
        fontSize: '14px',
        fontFamily: 'monospace',
        background: '#1e1e3a',
        borderRadius: '8px',
        overflow: 'hidden',
      }}
    >
      <Editor
        value={value}
        onValueChange={onChange || (() => {})}
        highlight={(code) =>
          Prism.highlight(code, Prism.languages[language] || Prism.languages.javascript, language)
        }
        padding={16}
        disabled={readOnly}
        textareaId="codeArea"
        style={{ fontFamily: '"Fira Code", monospace' }}
      />
    </div>
  );
};
