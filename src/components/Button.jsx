import React from 'react';
import { colors, shadows, borderRadius } from '../theme';

const Button = ({ 
  children, 
  onClick, 
  variant = 'primary', 
  size = 'medium',
  fullWidth = false,
  disabled = false,
  style = {},
}) => {
  const variants = {
    primary: {
      background: colors.primary.gradientAlt,
      color: colors.text.inverse,
      border: 'none',
      hoverBackground: colors.primary[700],
    },
    success: {
      background: colors.success[500],
      color: colors.text.inverse,
      border: 'none',
      hoverBackground: colors.success[600],
    },
    warning: {
      background: colors.warning[500],
      color: colors.text.inverse,
      border: 'none',
      hoverBackground: colors.warning[600],
    },
    danger: {
      background: colors.error[500],
      color: colors.text.inverse,
      border: 'none',
      hoverBackground: colors.error[600],
    },
    outline: {
      background: 'transparent',
      color: colors.primary[600],
      border: `2px solid ${colors.primary[600]}`,
      hoverBackground: colors.primary[50],
    },
  };

  const sizes = {
    small: {
      padding: '0.5rem 1rem',
      fontSize: '0.875rem',
    },
    medium: {
      padding: '0.75rem 1.5rem',
      fontSize: '1rem',
    },
    large: {
      padding: '1rem 2rem',
      fontSize: '1.125rem',
    },
  };

  const currentVariant = variants[variant];
  const currentSize = sizes[size];

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        background: currentVariant.background,
        color: currentVariant.color,
        border: currentVariant.border,
        padding: currentSize.padding,
        fontSize: currentSize.fontSize,
        fontWeight: '600',
        borderRadius: borderRadius.md,
        cursor: disabled ? 'not-allowed' : 'pointer',
        boxShadow: shadows.sm,
        transition: 'all 0.2s ease',
        width: fullWidth ? '100%' : 'auto',
        opacity: disabled ? 0.6 : 1,
        ...style,
      }}
      onMouseEnter={(e) => {
        if (!disabled) {
          e.target.style.transform = 'translateY(-1px)';
          e.target.style.boxShadow = shadows.md;
        }
      }}
      onMouseLeave={(e) => {
        e.target.style.transform = 'translateY(0)';
        e.target.style.boxShadow = shadows.sm;
      }}
    >
      {children}
    </button>
  );
};

export default Button;
