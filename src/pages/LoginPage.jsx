import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function LoginPage() {
  const navigate = useNavigate();
  const { login, updateProfile } = useAuth();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    district: "",
    mobile: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { name, email, district, mobile } = formData;

    if (!name || !email || !district || !mobile) {
      setError("Please complete all fields before continuing.");
      return;
    }

    if (!email.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!/^[0-9]{10}$/.test(mobile)) {
      setError("Please enter a valid 10-digit mobile number.");
      return;
    }

    const profile = {
      name: name.trim(),
      email: email.trim(),
      district: district.trim(),
      mobile: mobile.trim(),
    };

    /*
      Save the user's profile locally for this demonstration.
      This does not send the information to an external server.
    */
    localStorage.setItem("userProfile", JSON.stringify(profile));

    /*
      Use your existing authentication function if available.
    */
    if (typeof login === "function") {
      login(profile);
    }

    /*
      Update profile if your AuthContext provides updateProfile.
    */
    if (typeof updateProfile === "function") {
      updateProfile(profile);
    }

    navigate("/consent");
  };

  return (
    <div className="login-page">

      {/* Decorative background elements */}
      <div className="login-sun"></div>
      <div className="login-horizon horizon-one"></div>
      <div className="login-horizon horizon-two"></div>

      <main className="login-container">

        {/* Left / Introduction section */}
        <section className="login-intro">

          <div className="brand-mark">
            <span>🌿</span>
          </div>

          <p className="eyebrow">MENTAL HEALTH MONITOR</p>

          <h1>
            A space to
            <br />
            <span>check in with yourself.</span>
          </h1>

          <p className="intro-text">
            Your well-being matters. Take a quiet moment to share a few
            details so we can personalize your experience.
          </p>

          <div className="support-note">
            <div className="support-icon">♡</div>

            <div>
              <strong>You are in a safe space.</strong>
              <p>
                Your information is used only for this demonstration
                and monitoring experience.
              </p>
            </div>
          </div>

        </section>

        {/* Login card */}
        <section className="login-card">

          <div className="card-header">
            <span className="step-label">GET STARTED</span>

            <h2>Welcome</h2>

            <p>
              Tell us a little about yourself to begin your
              mental well-being journey.
            </p>
          </div>

          <form onSubmit={handleSubmit}>

            {/* Full Name */}
            <div className="form-group">
              <label htmlFor="name">
                Full name
              </label>

              <input
                id="name"
                name="name"
                type="text"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={handleChange}
                autoComplete="name"
              />
            </div>

            {/* Email */}
            <div className="form-group">
              <label htmlFor="email">
                Email address
              </label>

              <input
                id="email"
                name="email"
                type="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleChange}
                autoComplete="email"
              />
            </div>

            {/* District */}
            <div className="form-group">
              <label htmlFor="district">
                District
              </label>

              <input
                id="district"
                name="district"
                type="text"
                placeholder="Enter your district"
                value={formData.district}
                onChange={handleChange}
              />
            </div>

            {/* Mobile */}
            <div className="form-group">
              <label htmlFor="mobile">
                Mobile number
              </label>

              <input
                id="mobile"
                name="mobile"
                type="tel"
                placeholder="10-digit mobile number"
                value={formData.mobile}
                onChange={handleChange}
                maxLength="10"
                inputMode="numeric"
                autoComplete="tel"
              />
            </div>

            {error && (
              <div className="login-error">
                <span>!</span>
                {error}
              </div>
            )}

            <button
              type="submit"
              className="login-button"
            >
              Continue
              <span>→</span>
            </button>

          </form>

          <div className="privacy-note">
            <span>🔒</span>
            <p>
              Your details remain within this demonstration
              environment.
            </p>
          </div>

        </section>

      </main>

      {/* Bottom reassurance */}
      <footer className="login-footer">
        <span>MENTAL HEALTH MONITOR</span>
        <span>•</span>
        <span>Your well-being comes first</span>
      </footer>

    </div>
  );
}

export default LoginPage;