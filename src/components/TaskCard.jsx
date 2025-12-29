import React from 'react';
import { colors, shadows, borderRadius } from '../theme';
import StatusBadge from './StatusBadge';
import Button from './Button';

const TaskCard = ({ task, onEdit, onDelete, onToggleStatus }) => {
  const priorityColors = {
    low: colors.success[500],
    medium: colors.warning[500],
    high: colors.error[500],
  };

  return (
    <div
      style={{
        background: colors.background.secondary,
        borderRadius: borderRadius.lg,
        padding: '1.5rem',
        boxShadow: shadows.base,
        border: `1px solid ${colors.neutral[200]}`,
        transition: 'all 0.2s ease',
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = shadows.md;
        e.currentTarget.style.transform = 'translateY(-2px)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = shadows.base;
        e.currentTarget.style.transform = 'translateY(0)';
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
        <div style={{ flex: 1 }}>
          <h3
            style={{
              margin: '0 0 0.5rem 0',
              color: colors.text.primary,
              fontSize: '1.25rem',
              fontWeight: '600',
              textDecoration: task.status === 'completed' ? 'line-through' : 'none',
              opacity: task.status === 'completed' ? 0.7 : 1,
            }}
          >
            {task.title}
          </h3>
          <p
            style={{
              margin: '0',
              color: colors.text.secondary,
              fontSize: '0.9375rem',
              lineHeight: '1.5',
            }}
          >
            {task.description}
          </p>
        </div>
        <div
          style={{
            width: '4px',
            height: '60px',
            background: priorityColors[task.priority],
            borderRadius: borderRadius.full,
            marginLeft: '1rem',
          }}
        />
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
        <StatusBadge status={task.status} />
        <span
          style={{
            padding: '0.375rem 0.75rem',
            background: colors.neutral[100],
            color: colors.text.secondary,
            borderRadius: borderRadius.full,
            fontSize: '0.75rem',
            fontWeight: '600',
            textTransform: 'capitalize',
          }}
        >
          {task.priority} Priority
        </span>
      </div>

      <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.5rem' }}>
        <Button
          variant={task.status === 'completed' ? 'outline' : 'success'}
          size="small"
          onClick={() => onToggleStatus(task.id)}
        >
          {task.status === 'completed' ? 'Reopen' : 'Complete'}
        </Button>
        <Button variant="outline" size="small" onClick={() => onEdit(task)}>
          Edit
        </Button>
        <Button variant="danger" size="small" onClick={() => onDelete(task.id)}>
          Delete
        </Button>
      </div>
    </div>
  );
};

export default TaskCard;
