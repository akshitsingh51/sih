import React, { useState } from 'react';

/**
 * ExplainableAI Component — Dark Blue-Teal Theme
 */
function ExplainableAI({ distressData }) {
  const [expanded, setExpanded] = useState(false);

  if (!distressData) return null;

  const { score, riskLevel, factors, explanation } = distressData;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '12px 16px', background: 'var(--surface-subtle)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)' }}>
        <div>
          <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
            Current State
          </span>
          <div style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-main)', marginTop: '2px' }}>
            {riskLevel === 'LOW' ? 'Steady & Manageable' : riskLevel === 'MODERATE' ? 'Mild Stress Present' : 'Support Recommended'}
          </div>
        </div>
        <div style={{ marginLeft: 'auto', textAlign: 'right' }}>
          <span style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-main)' }}>{score}</span>
          <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)', fontWeight: 600 }}>/100</span>
        </div>
      </div>

      <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.55 }}>
        {explanation}
      </p>

      {/* Contributing Factors */}
      {factors && factors.length > 0 && (
        <div>
          <h4 style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-main)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '10px' }}>
            Key Factors Analyzed
          </h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {factors.slice(0, 3).map((factor, index) => (
              <div key={index} style={{ padding: '10px 14px', background: 'var(--surface-subtle)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', marginBottom: '4px' }}>
                  <span style={{ fontWeight: 600, color: 'var(--text-main)' }}>{factor.name}</span>
                  <span style={{ color: 'var(--text-muted)' }}>{factor.weight} weight</span>
                </div>
                <div style={{ width: '100%', height: '5px', background: 'var(--surface-muted)', borderRadius: '3px', overflow: 'hidden' }}>
                  <div style={{ width: `${Math.min(100, factor.contribution)}%`, height: '100%', background: 'var(--primary)', borderRadius: '3px' }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Expandable Disclaimer */}
      <div>
        <button
          type="button"
          onClick={() => setExpanded(prev => !prev)}
          style={{ fontSize: '0.78rem', color: 'var(--primary-hover)', fontWeight: 600, background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
        >
          {expanded ? 'Hide clinical note ▴' : 'View clinical note & limitations ▾'}
        </button>

        {expanded && (
          <div style={{ marginTop: '10px', padding: '12px 14px', background: 'var(--surface-subtle)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)', fontSize: '0.78rem', color: 'var(--text-secondary)', lineHeight: 1.45 }}>
            <p style={{ marginBottom: '4px' }}>
              <strong style={{ color: 'var(--text-main)' }}>Notice:</strong> This score is a dynamic estimate based on your self-reported check-in responses and is intended for personal wellbeing monitoring, not a formal psychiatric diagnosis.
            </p>
            <p>
              If you are experiencing severe distress or thoughts of harm, please connect with 24/7 crisis resources or a healthcare professional.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default ExplainableAI;