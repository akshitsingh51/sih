import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';

function Header() {
  const { user, isDemo, logout, enterDemoMode } = useAuth();
  const { currentDistress } = useData();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="app-header">
      <div className="header-container">
        <Link to="/" className="logo">
          <span className="logo-icon">🛡️</span>
          <span className="logo-text">Mental Health Monitor</span>
        </Link>

        <nav className="main-nav">
          {user ? (
            <>
              <Link to="/dashboard" className="nav-link">Dashboard</Link>
              <Link to="/checkin" className="nav-link">Check-in</Link>
              <Link to="/chat" className="nav-link">Support</Link>
              <Link to="/trends" className="nav-link">Trends</Link>
              <Link to="/help" className="nav-link help-link">Get Help</Link>
              {user.role === 'admin' && (
                <Link to="/admin" className="nav-link">Admin</Link>
              )}
            </>
          ) : (
            <>
              <Link to="/about" className="nav-link">About</Link>
              <Link to="/help" className="nav-link help-link">Get Help</Link>
            </>
          )}
        </nav>

        <div className="header-actions">
          {isDemo && (
            <span className="demo-badge">DEMO MODE</span>
          )}
          
          {user && currentDistress && (
            <Link to="/dashboard" className="distress-indicator" title="Your distress score">
              <span className="distress-label">Distress:</span>
              <span className={`distress-value level-${currentDistress.riskLevel?.toLowerCase()}`}>
                {currentDistress.score}
              </span>
            </Link>
          )}

          {user ? (
            <div className="user-menu">
              <span className="user-name">{user.name}</span>
              <button onClick={handleLogout} className="btn-logout">Logout</button>
            </div>
          ) : (
            <div className="auth-buttons">
              {!isDemo && (
                <button onClick={enterDemoMode} className="btn-demo">Demo</button>
              )}
              <Link to="/login" className="btn-login">Login</Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;