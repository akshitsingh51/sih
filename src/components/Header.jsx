import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useData } from "../context/DataContext";

function Header() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { currentDistress } = useData();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const handleLogout = () => {
    if (typeof logout === "function") {
      logout();
    }
    navigate("/");
  };

  const navClass = ({ isActive }) =>
    `nav-link ${isActive ? "active" : ""}`;

  const distressScore = currentDistress?.score ?? null;
  const riskLevel = currentDistress?.riskLevel || 'LOW';

  const getStatusLabel = () => {
    if (distressScore === null) return 'No data';
    if (riskLevel === 'LOW') return 'Steady';
    if (riskLevel === 'MODERATE') return 'Moderate';
    return 'Elevated';
  };

  return (
    <header className="site-header">
      <div className="header-inner">

        {/* BRAND */}
        <NavLink to="/dashboard" className="brand">
          <span className="brand-mark" aria-hidden="true">🌿</span>
          <span>Haven</span>
        </NavLink>

        {/* MOBILE TOGGLE BUTTON */}
        <button
          type="button"
          className="mobile-nav-toggle"
          onClick={() => setMobileNavOpen(prev => !prev)}
          aria-label="Toggle navigation menu"
        >
          {mobileNavOpen ? '✕' : '☰'}
        </button>

        {/* MAIN NAVIGATION */}
        <nav className={`main-nav ${mobileNavOpen ? 'open' : ''}`} aria-label="Main Navigation">

          <NavLink
            to="/dashboard"
            className={navClass}
            onClick={() => setMobileNavOpen(false)}
          >
            Dashboard
          </NavLink>

          <NavLink
            to="/check-in"
            className={navClass}
            onClick={() => setMobileNavOpen(false)}
          >
            Check-in
          </NavLink>

          <NavLink
            to="/chat"
            className={navClass}
            onClick={() => setMobileNavOpen(false)}
          >
            Talk with AI
          </NavLink>

          <NavLink
            to="/trends"
            className={navClass}
            onClick={() => setMobileNavOpen(false)}
          >
            Trends
          </NavLink>

          <NavLink
            to="/help"
            className={navClass}
            onClick={() => setMobileNavOpen(false)}
          >
            Support & Care
          </NavLink>

        </nav>

        {/* RIGHT ACTIONS */}
        <div className="header-right">

          {distressScore !== null && (
            <div className="distress-indicator" title={`Calculated Distress Score: ${distressScore}/100 (${riskLevel})`}>
              <span className={`distress-dot distress-${riskLevel.toLowerCase()}`} />
              <span>{getStatusLabel()}</span>
              <span className={`distress-value distress-${riskLevel.toLowerCase()}`}>
                {distressScore}
              </span>
            </div>
          )}

          <div className="user-profile-pill" title={`Signed in as ${user?.name || 'User'}`}>
            <span className="user-avatar-circle">
              {(user?.name || 'U').charAt(0).toUpperCase()}
            </span>
            <span className="user-display-name">
              {user?.name ? user.name.split(' ')[0] : 'You'}
            </span>
          </div>

          <button
            type="button"
            className="logout-button"
            onClick={handleLogout}
            title="Sign out of your session"
          >
            Sign out
          </button>

        </div>

      </div>
    </header>
  );
}

export default Header;