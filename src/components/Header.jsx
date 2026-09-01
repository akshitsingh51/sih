import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  const navClass = ({ isActive }) =>
    `nav-link ${isActive ? "active" : ""}`;

  return (
    <header className="site-header">
      <div className="header-inner">

        {/* BRAND */}
        <NavLink to="/dashboard" className="brand">
          <span className="brand-mark">♥</span>
          <span>Mental Health Monitor</span>
        </NavLink>


        {/* MAIN NAVIGATION */}
        <nav className="main-nav">

          <NavLink
            to="/dashboard"
            className={navClass}
          >
            Dashboard
          </NavLink>

          <NavLink
            to="/check-in"
            className={navClass}
          >
            Check-in
          </NavLink>

          <NavLink
            to="/help"
            className={navClass}
          >
            Support
          </NavLink>

          <NavLink
            to="/trends"
            className={navClass}
          >
            Trends
          </NavLink>

          <NavLink
            to="/help"
            className={({ isActive }) =>
              `nav-link ${isActive ? "active" : ""}`
            }
          >
            Get Help
          </NavLink>

        </nav>


        {/* RIGHT SIDE */}
        <div className="header-right">

          <div className="distress-indicator">
            <span>Distress</span>
            <span className="distress-value">—</span>
          </div>

          <span className="user-name">
            User
          </span>

          <button
            className="logout-button"
            onClick={handleLogout}
          >
            Logout
          </button>

        </div>

      </div>
    </header>
  );
}

export default Header;