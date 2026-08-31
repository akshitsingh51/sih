import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function LoginPage() {
  const [isNewUser, setIsNewUser] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    district: '',
    role: 'user'
  });
  const { login, enterDemoMode } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const userData = {
      ...formData,
      consentSigned: false,
      baselineComplete: false
    };
    
    login(userData);
    
    // New users go to consent, existing users to dashboard
    if (isNewUser) {
      navigate('/consent');
    } else {
      navigate('/dashboard');
    }
  };

  const handleDemo = () => {
    enterDemoMode();
    navigate('/dashboard');
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-header">
          <span className="login-icon">🛡️</span>
          <h1>Mental Health Monitor</h1>
          <p>Access your well-being dashboard</p>
        </div>

        <div className="login-tabs">
          <button 
            className={`tab ${isNewUser ? 'active' : ''}`}
            onClick={() => setIsNewUser(true)}
          >
            New User
          </button>
          <button 
            className={`tab ${!isNewUser ? 'active' : ''}`}
            onClick={() => setIsNewUser(false)}
          >
            Returning User
          </button>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          {isNewUser && (
            <div className="form-group">
              <label htmlFor="name">Your Name</label>
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Enter your name"
                required
              />
            </div>
          )}

          {!isNewUser && (
            <div className="form-group">
              <label htmlFor="userId">User ID</label>
              <input
                type="text"
                id="userId"
                placeholder="e.g., VCT-123456"
                required
              />
            </div>
          )}

          <div className="form-group">
            <label htmlFor="district">District</label>
            <input
              type="text"
              id="district"
              value={formData.district}
              onChange={(e) => setFormData({ ...formData, district: e.target.value })}
              placeholder="Enter your district"
            />
          </div>

          <button type="submit" className="btn-primary btn-full">
            {isNewUser ? 'Create Profile' : 'Login'}
          </button>
        </form>

        <div className="login-divider">
          <span>or</span>
        </div>

        <button onClick={handleDemo} className="btn-demo btn-full">
          🎮 Try Demo Mode
        </button>

        <p className="login-note">
          Demo mode uses fictional data. No real victim information is used.
        </p>
      </div>
    </div>
  );
}

export default LoginPage;