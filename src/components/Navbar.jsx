import React from 'react';
import { colors, shadows, borderRadius } from '../theme';

const Navbar = () => {
  return (
    <nav 
      style={{
        background: colors.primary.gradient,
        padding: '1.25rem 2rem',
        boxShadow: shadows.md,
        position: 'sticky',
        top: 0,
        zIndex: 1000,
      }}
    >
      <div 
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div 
            style={{
              width: '36px',
              height: '36px',
              background: 'rgba(255, 255, 255, 0.2)',
              borderRadius: borderRadius.md,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.25rem',
            }}
          >
            ✓
          </div>
          <h1 
            style={{
              color: colors.text.inverse,
              fontSize: '1.5rem',
              fontWeight: '700',
              margin: 0,
              letterSpacing: '-0.025em',
            }}
          >
            Task Manager
          </h1>
        </div>
        <div 
          style={{
            color: 'rgba(255, 255, 255, 0.9)',
            fontSize: '0.875rem',
            fontWeight: '500',
          }}
        >
          Organize • Track • Succeed
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
