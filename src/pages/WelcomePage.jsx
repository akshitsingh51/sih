import React from "react";
import { useNavigate } from "react-router-dom";

function WelcomePage() {
  const navigate = useNavigate();

  return (
    <main className="welcome-page">
      <div className="welcome-container">

        {/* LEFT CONTENT */}
        <section className="welcome-content">
          <div className="welcome-eyebrow">
            A Safe Space for You
          </div>

          <h1>
            Your well-being
            <br />
            <span>matters.</span>
          </h1>

          <p className="welcome-description">
            Mental Health Monitor gives you a calm, private, and judgment-free space
            to check in with yourself, understand changes in your well-being over time,
            and connect with compassionate support whenever you need it.
          </p>

          <div className="welcome-actions">
            <button
              className="btn btn-primary btn-large"
              onClick={() => navigate("/login")}
            >
              Get started →
            </button>

            <button
              className="btn btn-secondary btn-large"
              onClick={() => navigate("/help")}
            >
              Find 24/7 support
            </button>
          </div>

          <div className="welcome-support">
            <div className="support-icon">♡</div>
            <p>
              You are in control of your journey. Your reflections help you
              notice patterns and explore healthy coping strategies — not to replace professional medical diagnosis.
            </p>
          </div>
        </section>

        {/* RIGHT VISUAL */}
        <section className="welcome-visual">
          <div className="welcome-card">
            <div className="welcome-card-label">
              Your Companion
            </div>

            <h2>
              A moment to pause.
            </h2>

            <p>
              Taking 1 minute for a daily check-in helps cultivate emotional clarity and self-awareness.
            </p>

            <div className="welcome-card-divider" />

            <div className="welcome-card-row">
              <div className="card-dot">01</div>
              <div>
                <strong>Check in</strong>
                <span>Reflect on your mood, stress, and sleep.</span>
              </div>
            </div>

            <div className="welcome-card-row">
              <div className="card-dot">02</div>
              <div>
                <strong>Understand</strong>
                <span>Notice trends and emotional patterns over time.</span>
              </div>
            </div>

            <div className="welcome-card-row">
              <div className="card-dot">03</div>
              <div>
                <strong>Find Support</strong>
                <span>Access AI reflection or 24/7 human helplines.</span>
              </div>
            </div>
          </div>
        </section>

      </div>
    </main>
  );
}

export default WelcomePage;