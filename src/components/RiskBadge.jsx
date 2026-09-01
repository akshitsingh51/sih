import React from 'react';
import { getRiskColor, getRiskBgColor } from '../utils/scoringUtils';

function RiskBadge({ level, score, size = 'medium' }) {
  const color = getRiskColor(level);
  const bgColor = getRiskBgColor(level);

  const sizeClasses = {
    small: 'badge-small',
    medium: 'badge-medium',
    large: 'badge-large'
  };

  return (
    <span 
      className={`risk-badge ${sizeClasses[size]}`}
      style={{ backgroundColor: bgColor, color: color, border: `2px solid ${color}` }}
    >
      {score !== undefined && <span className="badge-score">{score}</span>}
      <span className="badge-level">{level}</span>
    </span>
  );
}

export default RiskBadge;
