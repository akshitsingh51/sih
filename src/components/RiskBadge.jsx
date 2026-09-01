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
        background: '#F0F5EF',
        color: '#718A6A',
        border: '1px solid #D5E3D3'
      };
    }
    if (normalizedLevel === 'MODERATE') {
      return {
        background: '#FBF4EA',
        color: '#C4935A',
        border: '1px solid #F0DFC8'
      };
    }
    return {
      background: '#FAF0EF',
      color: '#B96A62',
      border: '1px solid #EBCBC8'
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
