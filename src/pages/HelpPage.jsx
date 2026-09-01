import React from 'react';
import helplines from '../data/helplines';

function HelpPage() {
  const emergencyServices = [
    {
      name: 'Tele-MANAS',
      number: '14416',
      description: 'Government mental health support and counselling service.',
      availability: '24 × 7',
      icon: '🧠',
    },
    {
      name: 'KIRAN',
      number: '1800-599-0019',
      description: 'Mental health rehabilitation and support helpline.',
      availability: '24 × 7',
      icon: '💚',
    },
    {
      name: 'NIMHANS',
      number: '080-46110007',
      description: 'Mental health support and psychological assistance.',
      availability: '24 × 7',
      icon: '🏥',
    },
    {
      name: 'iCALL (TISS)',
      number: '9152987821',
      description: 'Professional counselling and emotional support.',
      availability: 'Counselling Support',
      icon: '💬',
    },
    {
      name: 'Vandrevala Foundation',
      number: '9999666555',
      description: 'Mental health counselling and crisis support.',
      availability: '24 × 7',
      icon: '🤝',
    },
  ];

  return (
    <div className="help-page">
      <div className="help-container">

        {/* =========================
            PAGE HEADER
        ========================== */}
        <section className="help-header">
          <div className="help-header-icon">🤍</div>

          <h1>Help & Support</h1>

          <p>
            You do not have to go through difficult moments alone.
            Reach out to a trained professional whenever you need support.
          </p>
        </section>

        {/* =========================
            EMERGENCY BANNER
        ========================== */}
        <section className="emergency-banner">
          <div className="emergency-banner-content">

            <div className="emergency-icon">
              🆘
            </div>

            <div>
              <h2>Need Immediate Help?</h2>

              <p>
                If you or someone around you is in immediate danger,
                please contact emergency services or a trusted person.
              </p>
            </div>

          </div>
        </section>

        {/* =========================
            EMERGENCY NUMBERS
        ========================== */}
        <section className="help-category">

          <div className="category-heading">
            <span className="category-icon">📞</span>

            <div>
              <h2>Mental Health Helplines</h2>

              <p>
                Confidential support is available through the following
                mental health services.
              </p>
            </div>
          </div>

          <div className="helplines-grid">

            {emergencyServices.map((service) => (
              <div
                className="helpline-card"
                key={service.name}
              >

                {/* Card top */}
                <div className="helpline-card-top">

                  <div className="helpline-icon">
                    {service.icon}
                  </div>

                  <span className="availability">
                    {service.availability}
                  </span>

                </div>

                {/* Service name */}
                <h3>{service.name}</h3>

                {/* Description */}
                <p className="helpline-purpose">
                  {service.description}
                </p>

                {/* Number */}
                <div className="helpline-number-box">

                  <span className="number-label">
                    Helpline Number
                  </span>

                  <a
                    href={`tel:${service.number.replace(/-/g, '')}`}
                    className="helpline-number"
                  >
                    {service.number}
                  </a>

                </div>

                {/* Call button */}
                <a
                  href={`tel:${service.number.replace(/-/g, '')}`}
                  className="call-button"
                >
                  <span>📞</span>
                  Call Now
                </a>

              </div>
            ))}

          </div>
        </section>

        {/* =========================
            SAFETY MESSAGE
        ========================== */}
        <section className="support-message">

          <div className="support-message-icon">
            🌿
          </div>

          <div>
            <h2>You deserve support</h2>

            <p>
              Asking for help is a sign of strength. If you are feeling
              overwhelmed, distressed, unsafe, or unable to cope,
              consider reaching out to a trained professional.
            </p>

            <p>
              This platform is designed to support monitoring and
              early identification of distress. It does not replace
              professional medical or psychological care.
            </p>
          </div>

        </section>

        {/* =========================
            IMPORTANT NOTE
        ========================== */}
        <section className="help-note">

          <h3>Important</h3>

          <p>
            If there is an immediate risk to life or physical safety,
            contact your local emergency services or go to the nearest
            hospital instead of relying only on this platform.
          </p>

        </section>

      </div>
    </div>
  );
}

export default HelpPage;