import type React from 'react';
import { tokens } from '../tokens';

interface CardProps {
  children: React.ReactNode;
  style?: React.CSSProperties;
}

export const Card: React.FC<CardProps> = ({ children, style }) => {
  return (
    <div
      style={{
        padding: '20px',
        borderRadius: tokens.radius.lg,
        border: `1px solid ${tokens.colors.border.default}`,
        background: '#1e1e3a',
        ...style,
      }}
    >
      {children}
    </div>
  );
};
