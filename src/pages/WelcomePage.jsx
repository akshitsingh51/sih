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
            A space for you
          </div>

          <h1>
            Your well-being
            <br />
            <span>matters.</span>
          </h1>

          <p className="welcome-description">
            Mental Health Monitor gives you a calm and private space
            to check in with yourself, understand changes in your
            well-being, and connect with support when you need it.
          </p>

          <div className="welcome-actions">

            <button
              className="btn btn-primary"
              onClick={() => navigate("/login")}
            >
              Get started
            </button>

            <button
              className="btn btn-secondary"
              onClick={() => navigate("/help")}
            >
              Find support
            </button>

          </div>


          <div className="welcome-support">

            <div className="support-icon">
              ♥
            </div>

            <p>
              You are in control of your journey.
              Your check-ins are designed to help you
              notice patterns and seek appropriate support —
              not to replace professional care.
            </p>

          </div>

        </section>


        {/* RIGHT VISUAL */}
        <section className="welcome-visual">

          <div className="welcome-card">

            <div className="welcome-card-label">
              Your space
            </div>

            <h2>
              A moment to pause.
            </h2>

            <p>
              Sometimes a small check-in can help you
              understand how you're doing today.
            </p>

            <div className="welcome-card-divider" />


            <div className="welcome-card-row">

              <div className="card-dot">
                01
              </div>

              <div>
                <strong>
                  Check in
                </strong>

                <span>
                  Tell us how you're feeling.
                </span>
              </div>

            </div>


            <div className="welcome-card-row">

              <div className="card-dot">
                02
              </div>

              <div>
                <strong>
                  Understand
                </strong>

                <span>
                  Notice changes over time.
                </span>
              </div>

            </div>


            <div className="welcome-card-row">

              <div className="card-dot">
                03
              </div>

              <div>
                <strong>
                  Find support
                </strong>

                <span>
                  Access help when you need it.
                </span>
              </div>

            </div>

          </div>

        </section>

      </div>

    </main>
  );
}

export default WelcomePage;