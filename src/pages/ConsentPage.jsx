import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function ConsentPage() {
  const navigate = useNavigate();

  const [consent, setConsent] = useState({
    purpose: false,
    voluntary: false,
    withdraw: false,
    noDiagnosis: false,
    questionnaire: false,
    textAnalysis: false,
    voiceAnalysis: false,
    privacy: false,
    escalation: false,
    research: false,
  });

  const [error, setError] = useState('');

  const requiredFields = [
    'purpose',
    'voluntary',
    'withdraw',
    'noDiagnosis',
    'privacy',
    'escalation',
  ];

  const handleChange = (field) => {
    setConsent((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));

    setError('');
  };

  const handleContinue = () => {
    const missingRequired = requiredFields.some(
      (field) => !consent[field]
    );

    if (missingRequired) {
      setError(
        'Please agree to all required statements before continuing.'
      );
      return;
    }

    // Save consent status
    localStorage.setItem(
      'mentalHealthConsent',
      JSON.stringify({
        ...consent,
        accepted: true,
        acceptedAt: new Date().toISOString(),
        version: '1.0',
      })
    );

    // Move to baseline assessment
    navigate('/baseline');
  };

  const handleBack = () => {
    navigate('/login');
  };

  const requiredItems = [
    {
      id: 'purpose',
      text:
        'I understand that this system is designed to monitor psychological well-being and identify distress patterns for personal supportive care.',
    },
    {
      id: 'voluntary',
      text:
        'I understand that my participation is completely voluntary.',
    },
    {
      id: 'withdraw',
      text:
        'I understand that I can stop using the system at any time without any consequences.',
    },
    {
      id: 'noDiagnosis',
      text:
        'I understand that this system does not provide medical diagnoses. All outputs are supportive wellbeing indicators.',
    },
    {
      id: 'privacy',
      text:
        'I understand how my information will be protected and stored as described in the Privacy Policy.',
    },
    {
      id: 'escalation',
      text:
        'I understand that if high-risk distress is detected, emergency helpline recommendations and professional care resources will be shown.',
    },
  ];

  const optionalItems = [
    {
      id: 'questionnaire',
      text:
        'I consent to the analysis of my daily check-in responses for longitudinal well-being monitoring.',
    },
    {
      id: 'textAnalysis',
      text:
        'I consent to the analysis of text I provide in chat interactions for real-time sentiment and tone signal detection.',
    },
    {
      id: 'voiceAnalysis',
      text:
        'I consent to optional voice reflection analysis if used in experimental demonstrations.',
    },
    {
      id: 'research',
      text:
        'I consent to my anonymized data being used for research purposes to improve this mental health monitoring system.',
    },
  ];

  return (
    <div className="consent-page">
      <main className="consent-wrapper">

        {/* Progress */}
        <div className="consent-progress">
          <div className="progress-step active">
            <span>01</span>
            <small>Consent</small>
          </div>

          <div className="progress-line"></div>

          <div className="progress-step">
            <span>02</span>
            <small>Assessment</small>
          </div>

          <div className="progress-line"></div>

          <div className="progress-step">
            <span>03</span>
            <small>Dashboard</small>
          </div>
        </div>

        {/* Intro */}
        <section className="consent-introduction">
          <div className="consent-eyebrow">
            BEFORE YOU BEGIN
          </div>

          <h1>Informed Consent & Privacy</h1>

          <p>
            Please take a moment to understand how Mental Health Monitor works and how your reflections are protected.
            You are always in control of what you choose to share.
          </p>
        </section>

        {/* Main card */}
        <section className="consent-card">

          <div className="consent-card-header">
            <div className="consent-icon">
              ♡
            </div>
            <div>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 750, color: 'var(--text-main)' }}>Consent Declaration</h2>
              <p style={{ fontSize: '0.84rem', color: 'var(--text-secondary)' }}>
                Please review each item carefully. Items marked with <strong style={{ color: 'var(--accent)' }}>*</strong> are required.
              </p>
            </div>
          </div>

          {/* Document information */}
          <div className="consent-meta">
            <div>
              <span>DOCUMENT VERSION</span>
              <strong>1.0 (Clinical Protocol)</strong>
            </div>

            <div>
              <span>LAST UPDATED</span>
              <strong>September 2026</strong>
            </div>
          </div>

          {/* Required section */}
          <div className="consent-section">
            <div className="consent-section-heading">
              <div className="section-number">
                01
              </div>
              <div>
                <h3>Required for Participation</h3>
                <p>
                  These statements ensure a safe, informed monitoring environment.
                </p>
              </div>
            </div>

            <div className="consent-items">
              {requiredItems.map((item) => (
                <label
                  className={`consent-option ${
                    consent[item.id] ? 'checked' : ''
                  }`}
                  key={item.id}
                >
                  <input
                    type="checkbox"
                    checked={consent[item.id]}
                    onChange={() => handleChange(item.id)}
                  />

                  <span className="custom-checkbox">
                    {consent[item.id] && '✓'}
                  </span>

                  <span className="consent-option-text">
                    {item.text}
                    <span className="required-label">
                      REQUIRED *
                    </span>
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Optional section */}
          <div className="consent-section">
            <div className="consent-section-heading">
              <div className="section-number">
                02
              </div>
              <div>
                <h3>Optional Feature Preferences</h3>
                <p>
                  You may choose which additional analytics you feel comfortable enabling.
                </p>
              </div>
            </div>

            <div className="consent-items">
              {optionalItems.map((item) => (
                <label
                  className={`consent-option ${
                    consent[item.id] ? 'checked' : ''
                  }`}
                  key={item.id}
                >
                  <input
                    type="checkbox"
                    checked={consent[item.id]}
                    onChange={() => handleChange(item.id)}
                  />

                  <span className="custom-checkbox">
                    {consent[item.id] && '✓'}
                  </span>

                  <span className="consent-option-text">
                    {item.text}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Error */}
          {error && (
            <div className="consent-error">
              <span>!</span>
              <p>{error}</p>
            </div>
          )}

          {/* Support message */}
          <div className="consent-support">
            <div className="support-icon">♡</div>
            <div>
              <strong>You are in control at all times.</strong>
              <p>
                You can review your choices, download your data, or withdraw consent whenever you wish.
              </p>
            </div>
          </div>

          {/* Footer */}
          <div className="consent-footer">
            <p className="consent-note">
              Your consent timestamp will be safely stored in your local session.
            </p>

            <div className="consent-actions">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={handleBack}
              >
                Back
              </button>

              <button
                type="button"
                className="btn btn-primary"
                onClick={handleContinue}
              >
                Agree & Continue →
              </button>
            </div>
          </div>

        </section>

        {/* Bottom reassurance */}
        <div className="consent-bottom-message">
          <span>🔒</span>
          <p>
            Your information is handled with care and confidential safety standards.
          </p>
        </div>

      </main>
    </div>
  );
}

export default ConsentPage;