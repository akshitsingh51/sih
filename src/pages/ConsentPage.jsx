import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const consentItems = [
  {
    id: 'purpose',
    text: 'I understand the purpose of this system is to monitor psychological well-being and identify distress patterns for victims and witnesses involved in legal proceedings.',
    required: true
  },
  {
    id: 'voluntary',
    text: 'I understand that participation is completely voluntary.',
    required: true
  },
  {
    id: 'withdraw',
    text: 'I understand that I can stop using the system at any time without any consequences.',
    required: true
  },
  {
    id: 'no-diagnosis',
    text: 'I understand that this system does not provide medical diagnoses. All outputs are AI-generated risk indicators that require professional review.',
    required: true
  },
  {
    id: 'questionnaire',
    text: 'I consent to the analysis of my questionnaire responses for well-being monitoring purposes.',
    required: true
  },
  {
    id: 'text-analysis',
    text: 'I consent to the analysis of text I provide in chat interactions for sentiment and emotion signal detection.',
    required: false
  },
  {
    id: 'voice-analysis',
    text: 'I consent to optional voice analysis. I understand this is experimental technology.',
    required: false
  },
  {
    id: 'data-storage',
    text: 'I understand how my information will be stored, protected, and used as described in the Privacy Policy.',
    required: true
  },
  {
    id: 'escalation',
    text: 'I understand that if the system detects high-risk situations, my case may be escalated to qualified professionals or authorities according to safety procedures.',
    required: true
  },
  {
    id: 'research',
    text: 'I consent to my anonymized data being used for research purposes to improve this system.',
    required: false
  }
];

function ConsentPage() {
  const [agreements, setAgreements] = useState({});
  const [errors, setErrors] = useState([]);
  const { updateProfile } = useAuth();
  const navigate = useNavigate();

  const handleCheckbox = (id, checked) => {
    setAgreements({ ...agreements, [id]: checked });
    setErrors([]);
  };

  const handleSubmit = () => {
    // Check required items
    const missing = consentItems
      .filter(item => item.required && !agreements[item.id])
      .map(item => item.id);
    
    if (missing.length > 0) {
      setErrors(['Please agree to all required items to continue.']);
      return;
    }

    // Save consent
    updateProfile({
      consentSigned: true,
      consentVersion: '1.0',
      consentDate: new Date().toISOString(),
      consentAgreements: agreements
    });

    navigate('/baseline');
  };

  return (
    <div className="consent-page">
      <div className="consent-container">
        <h1>Informed Consent</h1>
        <p className="consent-intro">
          Please read each item carefully. Required items are marked with *. 
          You must agree to all required items before proceeding.
        </p>

        <div className="consent-version">
          Consent Document Version: 1.0 | Date: {new Date().toLocaleDateString()}
        </div>

        <div className="consent-items">
          {consentItems.map(item => (
            <div key={item.id} className={`consent-item ${item.required ? 'required' : ''}`}>
              <label className="consent-checkbox">
                <input
                  type="checkbox"
                  checked={agreements[item.id] || false}
                  onChange={(e) => handleCheckbox(item.id, e.target.checked)}
                />
                <span className="checkmark"></span>
                <span className="consent-text">
                  {item.text}
                  {item.required && <span className="required-mark">*</span>}
                </span>
              </label>
            </div>
          ))}
        </div>

        {errors.length > 0 && (
          <div className="consent-errors">
            {errors.map((error, i) => (
              <p key={i} className="error-message">{error}</p>
            ))}
          </div>
        )}

        <div className="consent-footer">
          <p className="consent-stored">
            Your consent is stored with the date and version of this consent document.
          </p>
          
          <div className="consent-actions">
            <button onClick={() => navigate(-1)} className="btn-secondary">
              Back
            </button>
            <button onClick={handleSubmit} className="btn-primary">
              I Agree and Continue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ConsentPage;