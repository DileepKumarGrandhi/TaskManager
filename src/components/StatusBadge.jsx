import React from 'react';
import { colors, borderRadius } from '../theme';

const StatusBadge = ({ status }) => {
  const statusConfig = {
    pending: {
      bg: colors.warning[100],
      color: colors.warning[800],
      text: 'Pending',
      icon: '⏳',
    },
    'in-progress': {
      bg: colors.primary[100],
      color: colors.primary[800],
      text: 'In Progress',
      icon: '🔄',
    },
    completed: {
      bg: colors.success[100],
      color: colors.success[800],
      text: 'Completed',
      icon: '✓',
    },
  };

  const config = statusConfig[status] || statusConfig.pending;

  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.375rem',
        padding: '0.375rem 0.75rem',
        background: config.bg,
        color: config.color,
        borderRadius: borderRadius.full,
        fontSize: '0.75rem',
        fontWeight: '600',
        letterSpacing: '0.025em',
        textTransform: 'uppercase',
      }}
    >
      <span>{config.icon}</span>
      {config.text}
    </span>
  );
};

export default StatusBadge;
