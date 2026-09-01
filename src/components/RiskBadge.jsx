import React from 'react';

function RiskBadge({ level = 'LOW', score, size = 'medium' }) {
  const normalizedLevel = (level || 'LOW').toUpperCase();

  const getLabel = () => {
    if (normalizedLevel === 'LOW') return 'Steady';
    if (normalizedLevel === 'MODERATE') return 'Moderate';
    return 'Elevated';
  };

  const getStyle = () => {
    if (normalizedLevel === 'LOW') {
      return {
        background: 'var(--success-bg)',
        color: 'var(--success)',
        border: '1px solid var(--success-border)'
      };
    }
    if (normalizedLevel === 'MODERATE') {
      return {
        background: 'var(--warning-bg)',
        color: 'var(--warning)',
        border: '1px solid var(--warning-border)'
      };
    }
    return {
      background: 'var(--danger-bg)',
      color: 'var(--danger)',
      border: '1px solid var(--danger-border)'
    };
  };

  const isLarge = size === 'large';

  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '5px',
        padding: isLarge ? '5px 12px' : '3px 8px',
        borderRadius: '16px',
        fontSize: isLarge ? '0.8rem' : '0.72rem',
        fontWeight: 700,
        textTransform: 'uppercase',
        letterSpacing: '0.04em',
        ...getStyle()
      }}
    >
      <span style={{ fontSize: isLarge ? '8px' : '6px' }}>●</span>
      {score !== undefined && <span>{score} - </span>}
      <span>{getLabel()}</span>
    </span>
  );
}

export default RiskBadge;
