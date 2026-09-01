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
    <div className="help-page" style={{ minHeight: '100vh', background: 'var(--bg-app)', display: 'flex', flexDirection: 'column' }}>
      <Header />

      <main style={{ width: 'min(1140px, calc(100% - 32px))', margin: '32px auto 56px auto', display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {/* Header Hero */}
        <div>
          <h1 style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>
            Support & Crisis Directory
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', maxWidth: '720px', lineHeight: 1.5, marginTop: '2px' }}>
            Free, confidential mental health resources and 24/7 helplines whenever you need assistance.
          </p>
        </div>

        {/* Emergency Alert Banner */}
        <section style={{ background: 'var(--danger-bg)', border: '1px solid var(--danger-border)', borderRadius: 'var(--radius-sm)', padding: '18px 20px', display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div>
            <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--danger)', marginBottom: '2px' }}>Immediate Safety First</h3>
            <p style={{ fontSize: '0.86rem', color: '#6A3121', lineHeight: 1.45 }}>
              If you or someone around you is in immediate danger or experiencing severe thoughts of harm, please dial <strong>112</strong> or call the <strong>Tele-MANAS (14416)</strong> helpline immediately.
            </p>
          </div>
        </section>

        {/* Helplines Directory */}
        <section className="wellness-card">
          <div className="wellness-card-header">
            <h3>Verified Support Helplines</h3>
            <span className="card-subnote">Free & Confidential</span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '14px' }}>
            {emergencyServices.map((service) => (
              <div
                key={service.name}
                style={{
                  background: 'var(--surface-subtle)',
                  border: '1px solid var(--border)',
                  borderRadius: 'var(--radius-sm)',
                  padding: '16px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  gap: '12px'
                }}
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                    <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-primary)' }}>{service.name}</h4>
                    <span style={{ fontSize: '0.72rem', fontWeight: 600, background: 'var(--primary-subtle)', color: 'var(--primary)', padding: '2px 6px', borderRadius: '4px' }}>
                      {service.availability}
                    </span>
                  </div>
                  <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.4 }}>{service.description}</p>
                </div>

                <a
                  href={`tel:${service.number.replace(/-/g, '')}`}
                  className="btn btn-primary"
                  style={{ width: '100%', fontSize: '0.84rem', padding: '8px 12px' }}
                >
                  Call {service.number}
                </a>
              </div>
            ))}
          </div>
        </section>

        {/* Personalized Coping Suggestions */}
        {recommendations && recommendations.categories && (
          <section className="wellness-card">
            <div className="wellness-card-header">
              <h3>Personalized Wellbeing Guidance</h3>
              <span className="card-subnote">Based on your recent state</span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '14px' }}>
              {recommendations.categories.selfCare && (
                <div style={{ background: 'var(--surface-subtle)', padding: '16px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)' }}>
                  <h4 style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--primary)', marginBottom: '8px' }}>Self-Care Strategies</h4>
                  <ul style={{ listStyle: 'none', fontSize: '0.82rem', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    {recommendations.categories.selfCare.map((c, i) => (
                      <li key={i}>• {c}</li>
                    ))}
                  </ul>
                </div>
              )}

              {recommendations.categories.counseling && (
                <div style={{ background: 'var(--surface-subtle)', padding: '16px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)' }}>
                  <h4 style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--primary)', marginBottom: '8px' }}>Support & Counseling</h4>
                  <ul style={{ listStyle: 'none', fontSize: '0.82rem', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    {recommendations.categories.counseling.map((c, i) => (
                      <li key={i}>• {c}</li>
                    ))}
                  </ul>
                </div>
              )}

              {recommendations.specificRecommendations && recommendations.specificRecommendations.length > 0 && (
                <div style={{ background: 'var(--surface-subtle)', padding: '16px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)' }}>
                  <h4 style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--primary)', marginBottom: '8px' }}>Specific Interventions</h4>
                  <ul style={{ listStyle: 'none', fontSize: '0.82rem', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    {recommendations.specificRecommendations.map((c, i) => (
                      <li key={i}>• {c}</li>
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