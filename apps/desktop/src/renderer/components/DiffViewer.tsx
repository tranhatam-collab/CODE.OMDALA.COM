import * as diff from 'diff';
import type React from 'react';

interface DiffProps {
  oldValue: string;
  newValue: string;
}

export const DiffViewer: React.FC<DiffProps> = ({ oldValue, newValue }) => {
  const patches = diff.diffLines(oldValue, newValue);

  return (
    <pre
      style={{
        fontFamily: 'monospace',
        fontSize: '13px',
        whiteSpace: 'pre-wrap',
        padding: '16px',
        borderRadius: '8px',
        background: '#1e1e3a',
      }}
    >
      {patches.map((part, index) => {
        const color = part.added ? '#22c55e' : part.removed ? '#ef4444' : '#8b8ba7';
        return (
          <span key={index} style={{ color }}>
            {part.added ? '+ ' : part.removed ? '- ' : '  '}
            {part.value}
          </span>
        );
      })}
    </pre>
  );
};
