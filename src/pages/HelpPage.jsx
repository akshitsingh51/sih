import React from 'react';
import Header from '../components/Header';
import { useData } from '../context/DataContext';

function HelpPage() {
  const { recommendations } = useData();

  const emergencyServices = [
    {
      name: 'Tele-MANAS',
      number: '14416',
      description: 'Government 24/7 mental health support and counseling helpline.',
      availability: '24 × 7 Free & Confidential',
    },
    {
      name: 'KIRAN (National Helpline)',
      number: '1800-599-0019',
      description: '24/7 mental health rehabilitation and emotional support helpline.',
      availability: '24 × 7 Toll Free',
    },
    {
      name: 'NIMHANS Helpline',
      number: '080-46110007',
      description: 'Psychological first aid and specialized mental health support.',
      availability: '24 × 7 Professional',
    },
    {
      name: 'iCALL (TISS)',
      number: '9152987821',
      description: 'Free psychosocial counseling by trained professionals.',
      availability: 'Mon - Sat (10am - 8pm)',
    },
    {
      name: 'Vandrevala Foundation',
      number: '9999666555',
      description: 'Crisis counseling and psychological emotional support.',
      availability: '24 × 7 Available',
    },
  ];

  return (
    <div className="help-page" style={{ minHeight: '100vh', background: 'var(--sand)', display: 'flex', flexDirection: 'column' }}>
      <Header />

      <main className="page-container">
        {/* Header Hero */}
        <section className="page-header">
          <div className="page-header-text">
            <span className="intro-eyebrow" style={{ color: 'var(--warm-clay)' }}>Support & Crisis Resources</span>
            <h1>24/7 Helplines & Care Directory</h1>
            <p>
              Free, confidential mental health resources and 24/7 professional helplines whenever you need assistance.
            </p>
          </div>
        </section>

        {/* Emergency Alert Banner */}
        <section style={{
          background: 'var(--danger-bg)',
          border: '1px solid var(--danger-border)',
          borderRadius: 'var(--radius-md)',
          padding: '20px 22px',
          display: 'flex',
          alignItems: 'center',
          gap: '16px'
        }}>
          <div>
            <h3 style={{ fontSize: '0.98rem', fontWeight: 700, color: 'var(--danger)', marginBottom: '4px' }}>
              Immediate Safety First
            </h3>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-primary)', lineHeight: 1.5 }}>
              If you or someone around you is in immediate danger or experiencing severe thoughts of harm, please dial <strong>112</strong> or call the <strong>Tele-MANAS (14416)</strong> helpline immediately.
            </p>
          </div>
        </section>

        {/* Helplines Directory */}
        <section className="wellness-card">
          <div className="wellness-card-header">
            <div>
              <h3>Verified Support Helplines</h3>
              <p className="card-description">Trained professionals and psychologists</p>
            </div>
            <span className="card-subnote">Free & Confidential</span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
            {emergencyServices.map((service) => (
              <div
                key={service.name}
                style={{
                  background: 'var(--surface-subtle)',
                  border: '1px solid var(--border)',
                  borderRadius: 'var(--radius-sm)',
                  padding: '18px 20px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  gap: '14px',
                  transition: 'var(--transition-fast)'
                }}
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px', gap: '8px', flexWrap: 'wrap' }}>
                    <h4 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)' }}>{service.name}</h4>
                    <span className="tag tag-steady">
                      {service.availability}
                    </span>
                  </div>
                  <p style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', lineHeight: 1.45 }}>{service.description}</p>
                </div>

                <a
                  href={`tel:${service.number.replace(/-/g, '')}`}
                  className="btn btn-primary"
                  style={{ width: '100%', height: '42px', fontSize: '0.88rem' }}
                >
                  📞 Call {service.number}
                </a>
              </div>
            ))}
          </div>
        </section>

        {/* Personalized Coping Suggestions */}
        {recommendations && recommendations.categories && (
          <section className="wellness-card">
            <div className="wellness-card-header">
              <div>
                <h3>Personalized Wellbeing Guidance</h3>
                <p className="card-description">Helpful suggestions tailored to your recent check-in patterns</p>
              </div>
              <span className="card-subnote">Gentle Advice</span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
              {recommendations.categories.selfCare && recommendations.categories.selfCare.length > 0 && (
                <div style={{ background: 'var(--surface-subtle)', padding: '18px 20px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)' }}>
                  <h4 style={{ fontSize: '0.92rem', fontWeight: 700, color: 'var(--deep-sage)', marginBottom: '10px' }}>Self-Care Strategies</h4>
                  <ul style={{ listStyle: 'none', fontSize: '0.86rem', color: 'var(--text-body)', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {recommendations.categories.selfCare.map((c, i) => (
                      <li key={i} style={{ lineHeight: 1.45 }}>• {c}</li>
                    ))}
                  </ul>
                </div>
              )}

              {recommendations.categories.counseling && recommendations.categories.counseling.length > 0 && (
                <div style={{ background: 'var(--surface-subtle)', padding: '18px 20px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)' }}>
                  <h4 style={{ fontSize: '0.92rem', fontWeight: 700, color: 'var(--warm-clay)', marginBottom: '10px' }}>Support & Counseling</h4>
                  <ul style={{ listStyle: 'none', fontSize: '0.86rem', color: 'var(--text-body)', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {recommendations.categories.counseling.map((c, i) => (
                      <li key={i} style={{ lineHeight: 1.45 }}>• {c}</li>
                    ))}
                  </ul>
                </div>
              )}

              {recommendations.specificRecommendations && recommendations.specificRecommendations.length > 0 && (
                <div style={{ background: 'var(--surface-subtle)', padding: '18px 20px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)' }}>
                  <h4 style={{ fontSize: '0.92rem', fontWeight: 700, color: 'var(--sage)', marginBottom: '10px' }}>Targeted Interventions</h4>
                  <ul style={{ listStyle: 'none', fontSize: '0.86rem', color: 'var(--text-body)', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {recommendations.specificRecommendations.map((c, i) => (
                      <li key={i} style={{ lineHeight: 1.45 }}>• {c}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}

export default HelpPage;