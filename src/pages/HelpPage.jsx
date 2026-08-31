import React from 'react';
import helplines from '../data/helplines';

function HelpPage() {
  const categories = {
    emergency: { name: 'Emergency Services', icon: '🚨' },
    'mental-health': { name: 'Mental Health Support', icon: '🧠' },
    women: { name: "Women's Safety", icon: '👩' },
    child: { name: 'Child Protection', icon: '👶' },
    'sc-st': { name: 'SC/ST Support', icon: '⚖️' },
    legal: { name: 'Legal Aid', icon: '📋' }
  };

  return (
    <div className="help-page">
      <div className="help-container">
        <div className="help-header">
          <h1>Get Help Now</h1>
          <p>Verified government helplines and support services</p>
        </div>

        <div className="emergency-banner">
          <h2>🆘 In Immediate Danger?</h2>
          <p>Call emergency services immediately:</p>
          <div className="emergency-buttons">
            <a href="tel:112" className="emergency-btn-large">
              📞 112 (Emergency)
            </a>
            <a href="tel:100" className="emergency-btn-large police">
              🚔 100 (Police)
            </a>
          </div>
        </div>

        {Object.entries(categories).map(([category, info]) => {
          const categoryHelplines = helplines.filter(h => h.category === category);
          if (categoryHelplines.length === 0) return null;

          return (
            <div key={category} className="help-category">
              <h2 className="category-title">
                <span className="category-icon">{info.icon}</span>
                {info.name}
              </h2>
              <div className="helplines-grid">
                {categoryHelplines.map(helpline => (
                  <div key={helpline.id} className="helpline-card">
                    <div className="helpline-header">
                      <h3>{helpline.name}</h3>
                      <span className="availability">{helpline.availability}</span>
                    </div>
                    <p className="helpline-purpose">{helpline.purpose}</p>
                    <div className="helpline-numbers">
                      {helpline.tollFree && (
                        <span className="toll-free">Toll-free: {helpline.tollFree}</span>
                      )}
                      <span className="main-number">📞 {helpline.number}</span>
                    </div>
                    <p className="helpline-source">Source: {helpline.source}</p>
                    <a 
                      href={`tel:${helpline.tollFree || helpline.number}`}
                      className="call-btn"
                    >
                      Call Now
                    </a>
                  </div>
                ))}
              </div>
            </div>
          );
        })}

        <div className="help-footer">
          <p>
            <strong>Note:</strong> These are verified government helplines. 
            If you are in danger, please call 112 immediately.
          </p>
          <p>
            Information sourced from official government websites including Ministry of 
            Health and Family Welfare, Ministry of Women and Child Development, and 
            Emergency Response Support System (ERSS).
          </p>
        </div>
      </div>
    </div>
  );
}

export default HelpPage;