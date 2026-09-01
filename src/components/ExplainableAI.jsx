import React from 'react';

/**
 * ExplainableAI Component
 * Shows why the system generated a particular score
 */
function ExplainableAI({ distressData }) {
  if (!distressData) return null;

  const { score, riskLevel, factors, explanation } = distressData;

  return (
    <div className="explainable-ai-card">
      <h3 className="explainable-title">
        Why did the system generate this score?
      </h3>
      
      <div className="explainable-score">
        <span className="score-number">{score}</span>
        <span className="score-label">/100</span>
        <span className={`risk-level-badge risk-${riskLevel.toLowerCase()}`}>
          {riskLevel}
        </span>
      </div>

      <div className="explainable-explanation">
        <p>{explanation}</p>
      </div>

      <div className="factors-list">
        <h4>Contributing Factors</h4>
        {factors && factors.map((factor, index) => (
          <div key={index} className="factor-item">
            <div className="factor-header">
              <span className="factor-name">{factor.name}</span>
              <span className="factor-weight">Weight: {factor.weight}</span>
            </div>
            <div className="factor-bar-container">
              <div 
                className="factor-bar" 
                style={{ width: `${Math.min(100, factor.contribution)}%` }}
              />
            </div>
            <div className="factor-contribution">
              Contributes {Math.round(factor.contribution)} points
            </div>
            {factor.details && (
              <div className="factor-details">{factor.details}</div>
            )}
          </div>
        ))}
      </div>

      <div className="psychological-basis">
        <h4>Psychological Basis</h4>
        <p>
          These variables are commonly studied as indicators associated with 
          psychological distress. However, they do not independently establish 
          a clinical diagnosis. The system uses these factors to estimate 
          relative risk levels for monitoring purposes.
        </p>
      </div>

      <div className="limitations-note">
        <h4>Important Limitations</h4>
        <ul>
          <li>This is a prototype estimate, not a clinical assessment</li>
          <li>Self-reported data may not capture the full picture</li>
          <li>Cultural factors can influence responses</li>
          <li>Professional review is recommended for high-risk cases</li>
        </ul>
      </div>
    </div>
  );
}

export default ExplainableAI;