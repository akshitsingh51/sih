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
        'Please agree to all required items before continuing.'
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
    navigate('/welcome');
  };

  const requiredItems = [
    {
      id: 'purpose',
      text:
        'I understand that this system is designed to monitor psychological well-being and identify distress patterns for victims and witnesses involved in legal proceedings.',
    },
    {
      id: 'voluntary',
      text:
        'I understand that participation is completely voluntary.',
    },
    {
      id: 'withdraw',
      text:
        'I understand that I can stop using the system at any time without any consequences.',
    },
    {
      id: 'noDiagnosis',
      text:
        'I understand that this system does not provide medical diagnoses. All outputs are AI-generated risk indicators that require professional review.',
    },
    {
      id: 'privacy',
      text:
        'I understand how my information will be stored, protected, and used as described in the Privacy Policy.',
    },
    {
      id: 'escalation',
      text:
        'I understand that if the system detects high-risk situations, my case may be escalated to qualified professionals or authorities according to safety procedures.',
    },
  ];

  const optionalItems = [
    {
      id: 'questionnaire',
      text:
        'I consent to the analysis of my questionnaire responses for well-being monitoring purposes.',
    },
    {
      id: 'textAnalysis',
      text:
        'I consent to the analysis of text I provide in chat interactions for sentiment and emotion signal detection.',
    },
    {
      id: 'voiceAnalysis',
      text:
        'I consent to optional voice analysis. I understand this is experimental technology.',
    },
    {
      id: 'research',
      text:
        'I consent to my anonymized data being used for research purposes to improve this system.',
    },
  ];

  return (
    <div className="consent-page">

      {/* Decorative background */}
      <div className="consent-decoration consent-decoration-one"></div>
      <div className="consent-decoration consent-decoration-two"></div>

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

          <h1>Your choice matters.</h1>

          <p>
            Please take a moment to understand how Mental Health
            Monitor works and how your information may be used.
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
              <h2>Informed Consent</h2>

              <p>
                Please read each statement carefully.
                Items marked with <strong>*</strong> are required.
              </p>
            </div>

          </div>

          <div className="consent-divider"></div>

          {/* Document information */}
          <div className="consent-meta">
            <div>
              <span>DOCUMENT VERSION</span>
              <strong>1.0</strong>
            </div>

            <div>
              <span>DATE</span>
              <strong>31 August 2026</strong>
            </div>
          </div>

          {/* Required section */}
          <div className="consent-section">

            <div className="consent-section-heading">

              <div className="section-number">
                01
              </div>

              <div>
                <h3>Required for participation</h3>
                <p>
                  These items are necessary to use the
                  monitoring system.
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
          <div className="consent-section optional-section">

            <div className="consent-section-heading">

              <div className="section-number">
                02
              </div>

              <div>
                <h3>Optional preferences</h3>
                <p>
                  You may choose which additional features
                  you are comfortable using.
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

            <div className="support-icon">
              ♡
            </div>

            <div>
              <strong>You are in control.</strong>

              <p>
                You can review your choices and change your
                preferences later. Your well-being and privacy
                remain important throughout the process.
              </p>
            </div>

          </div>

          {/* Footer */}
          <div className="consent-footer">

            <p className="consent-note">
              Your consent will be stored together with the
              consent document version and date.
            </p>

            <div className="consent-actions">

              <button
                type="button"
                className="btn-secondary"
                onClick={handleBack}
              >
                Back
              </button>

              <button
                type="button"
                className="btn-primary"
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
            Your information is handled with care and used only
            for the purposes explained above.
          </p>
        </div>

      </main>

    </div>
  );
}

export default ConsentPage;