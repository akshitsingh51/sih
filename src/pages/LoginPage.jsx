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

    localStorage.setItem("userProfile", JSON.stringify(profile));

    if (typeof login === "function") {
      login(profile);
    }

    if (typeof updateProfile === "function") {
      updateProfile(profile);
    }

    navigate("/consent");
  };

  return (
    <div className="login-page">
      <main className="login-container">

        {/* Left / Introduction section */}
        <section className="login-intro">
          <div className="brand-mark">
            <span>🌿</span>
          </div>

          <p className="eyebrow">MENTAL HEALTH MONITOR</p>

          <h1>
            A safe space to
            <br />
            <span>check in with yourself.</span>
          </h1>

          <p className="intro-text">
            Your well-being comes first. Take a quiet moment to share a few details so we can personalize your monitoring companion.
          </p>

          <div className="support-note">
            <div className="support-icon">♡</div>
            <div>
              <strong>You are in a safe, confidential space.</strong>
              <p>
                Your information is encrypted and stored locally in this private demonstration session.
              </p>
            </div>
          </div>
        </section>

        {/* Login card */}
        <section className="login-card">
          <div className="card-header">
            <span className="step-label">STEP 01 OF 03</span>
            <h2>Welcome</h2>
            <p>
              Enter your details to begin your personalized mental wellness journey.
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            {/* Full Name */}
            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <input
                id="name"
                name="name"
                type="text"
                placeholder="e.g. Akshit Singh"
                value={formData.name}
                onChange={handleChange}
                autoComplete="name"
              />
            </div>

            {/* Email */}
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
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
              <label htmlFor="district">District / City</label>
              <input
                id="district"
                name="district"
                type="text"
                placeholder="e.g. Mumbai, Delhi, Bengaluru"
                value={formData.district}
                onChange={handleChange}
              />
            </div>

            {/* Mobile */}
            <div className="form-group">
              <label htmlFor="mobile">10-Digit Mobile Number</label>
              <input
                id="mobile"
                name="mobile"
                type="tel"
                placeholder="9876543210"
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
              className="btn btn-primary btn-large"
              style={{ width: '100%', marginTop: '4px' }}
            >
              Continue to Consent →
            </button>
          </form>

          <div className="privacy-note">
            <span>🔒</span>
            <p>
              Private & locally encrypted session.
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