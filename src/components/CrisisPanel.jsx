import React from 'react';
import helplines from '../data/helplines';

/**
 * CrisisPanel Component
 * Shows emergency resources when crisis is detected
 */
function CrisisPanel({ visible, onClose }) {
  if (!visible) return null;

  const emergencyHelplines = helplines.filter(h => 
    h.category === 'emergency' || h.category === 'mental-health'
  );

  return (
    <div className="crisis-panel-overlay">
      <div className="crisis-panel">
        <div className="crisis-header">
          <span className="crisis-icon">🆘</span>
          <h2>Your safety matters</h2>
        </div>
        
        <div className="crisis-message">
          <p>
            Your message suggests that you may need immediate support. 
            You are not alone, and help is available.
          </p>
        </div>

        <div className="crisis-resources">
          <h3>Immediate Support Available</h3>
          {emergencyHelplines.map(helpline => (
            <div key={helpline.id} className="crisis-helpline">
              <div className="helpline-info">
                <strong>{helpline.name}</strong>
                <p>{helpline.purpose}</p>
              </div>
              <a 
                href={`tel:${helpline.tollFree || helpline.number}`} 
                className="call-button"
              >
                📞 Call {helpline.tollFree || helpline.number}
              </a>
            </div>
          ))}
        </div>

        <div className="crisis-actions">
          <p><strong>If you are in immediate danger, please call 112 (Emergency) or 100 (Police)</strong></p>
          <button onClick={onClose} className="btn-secondary">
            I'm okay, continue
          </button>
        </div>
      </div>
    </div>
  );
}

export default CrisisPanel;