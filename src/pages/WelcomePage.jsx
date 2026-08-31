import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function WelcomePage() {
  const { user, enterDemoMode } = useAuth();

  return (
    <div className="welcome-page">
      <section className="hero-section">
        <div className="hero-content">
          <span className="hero-icon">🛡️</span>
          <h1>AI-Powered Dynamic Mental Health Monitoring</h1>
          <p className="hero-subtitle">
            Continuous support, early distress detection, and evidence-informed 
            intervention for victims and witnesses.
          </p>
          
          <div className="hero-actions">
            {user ? (
              <Link to="/dashboard" className="btn-primary btn-large">
                Go to Dashboard
              </Link>
            ) : (
              <>
                <Link to="/login" className="btn-primary btn-large">
                  Start Monitoring
                </Link>
                <Link to="/login" className="btn-secondary btn-large">
                  Login
                </Link>
                <button onClick={enterDemoMode} className="btn-outline btn-large">
                  Try Demo
                </button>
              </>
            )}
          </div>
        </div>
      </section>

      <section className="features-section">
        <h2>How It Works</h2>
        <div className="features-grid">
          <div className="feature-card">
            <span className="feature-icon">📊</span>
            <h3>Continuous Monitoring</h3>
            <p>Track your well-being over time with regular, brief check-ins.</p>
          </div>
          <div className="feature-card">
            <span className="feature-icon">🤖</span>
            <h3>AI-Powered Analysis</h3>
            <p>Advanced algorithms help identify patterns and changes in distress levels.</p>
          </div>
          <div className="feature-card">
            <span className="feature-icon">📈</span>
            <h3>Explainable Results</h3>
            <p>Understand why the system generates specific scores and recommendations.</p>
          </div>
          <div className="feature-card">
            <span className="feature-icon">🔔</span>
            <h3>Early Alerts</h3>
            <p>Get notified when professional support may be beneficial.</p>
          </div>
          <div className="feature-card">
            <span className="feature-icon">🤝</span>
            <h3>Human Support</h3>
            <p>Connect with counselors and authorities when needed.</p>
          </div>
          <div className="feature-card">
            <span className="feature-icon">🔒</span>
            <h3>Privacy First</h3>
            <p>Your data is protected with encryption and strict access controls.</p>
          </div>
        </div>
      </section>

      <section className="privacy-section">
        <h2>Privacy & Safety</h2>
        <div className="privacy-content">
          <ul>
            <li>Your participation is completely voluntary</li>
            <li>You can stop using the system at any time</li>
            <li>Your data is encrypted and securely stored</li>
            <li>Only authorized personnel can access case information</li>
            <li>This system does not provide medical diagnoses</li>
            <li>Professional review is available for all assessments</li>
          </ul>
        </div>
      </section>

      <section className="research-section">
        <h2>Research & Evidence</h2>
        <p>
          This system is built on established psychological research and validated 
          assessment methodologies. All AI outputs are clearly explained with their 
          psychological basis and limitations.
        </p>
        <Link to="/research" className="btn-secondary">
          Learn More About Our Approach
        </Link>
      </section>

      <section className="emergency-section">
        <div className="emergency-card">
          <h2>🆘 Emergency Help</h2>
          <p>If you or someone you know needs immediate assistance:</p>
          <div className="emergency-numbers">
            <a href="tel:112" className="emergency-btn">🚨 Emergency: 112</a>
            <a href="tel:100" className="emergency-btn">🚔 Police: 100</a>
            <a href="tel:181" className="emergency-btn">👩 Women: 181</a>
            <a href="tel:14416" className="emergency-btn">🧠 Mental Health: 14416</a>
          </div>
        </div>
      </section>
    </div>
  );
}

export default WelcomePage;