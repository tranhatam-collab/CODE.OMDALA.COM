import type React from 'react';
import { tokens } from '../tokens';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
}

export const Button: React.FC<ButtonProps> = ({ variant = 'primary', ...props }) => {
  const styles: React.CSSProperties = {
    padding: '8px 16px',
    borderRadius: tokens.radius.md,
    cursor: 'pointer',
    background:
      variant === 'primary'
        ? tokens.colors.accent.primary
        : variant === 'danger'
          ? tokens.colors.error
          : 'transparent',
    color: variant === 'primary' ? '#fff' : tokens.colors.fg.primary,
    border: variant === 'secondary' ? `1px solid ${tokens.colors.border.default}` : 'none',
  };
  return <button style={styles} {...props} />;
};
