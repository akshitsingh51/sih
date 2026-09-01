import React from 'react';
import Header from '../components/Header';

function PrivacyPage() {
  return (
    <div className="privacy-page" style={{ minHeight: '100vh', background: 'var(--bg-app)', display: 'flex', flexDirection: 'column' }}>
      <Header />

      <main className="page-container" style={{ maxWidth: '960px' }}>
        <section className="page-header">
          <div className="page-header-text">
            <span className="intro-eyebrow">Security & Confidentiality</span>
            <h1>Privacy & Data Protection</h1>
            <p>
              Your privacy is fundamental. We enforce rigorous data minimization, encryption, and voluntary consent standards.
            </p>
          </div>
        </section>

        {/* Data Protection Principles */}
        <section className="wellness-card">
          <div className="wellness-card-header">
            <div>
              <h3>Data Protection Principles</h3>
              <p className="card-description">Core commitments to safeguarding your information</p>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
            <div style={{ padding: '16px', background: 'var(--surface-subtle)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)' }}>
              <h4 style={{ fontSize: '0.95rem', fontWeight: 750, color: 'var(--text-main)', marginBottom: '6px' }}>🔒 Data Minimization</h4>
              <p style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', lineHeight: 1.45 }}>We collect only the essential responses required for distress monitoring. No extraneous tracking occurs.</p>
            </div>

            <div style={{ padding: '16px', background: 'var(--surface-subtle)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)' }}>
              <h4 style={{ fontSize: '0.95rem', fontWeight: 750, color: 'var(--text-main)', marginBottom: '6px' }}>✓ Informed Consent</h4>
              <p style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', lineHeight: 1.45 }}>Participation is completely voluntary. You maintain the right to withdraw or skip questions at any time.</p>
            </div>

            <div style={{ padding: '16px', background: 'var(--surface-subtle)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)' }}>
              <h4 style={{ fontSize: '0.95rem', fontWeight: 750, color: 'var(--text-main)', marginBottom: '6px' }}>🔐 Modern Encryption</h4>
              <p style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', lineHeight: 1.45 }}>All data in transit and at rest is secured using industry-standard TLS encryption protocols.</p>
            </div>

            <div style={{ padding: '16px', background: 'var(--surface-subtle)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)' }}>
              <h4 style={{ fontSize: '0.95rem', fontWeight: 750, color: 'var(--text-main)', marginBottom: '6px' }}>👤 Role-Based Access</h4>
              <p style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', lineHeight: 1.45 }}>Strict access boundaries ensure only you and authorized care facilitators can view sensitive logs.</p>
            </div>
          </div>
        </section>

        {/* How Data is Used & Rights */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
          <section className="wellness-card">
            <div className="wellness-card-header">
              <h3>How Data Is Used</h3>
            </div>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
              <li style={{ lineHeight: 1.45 }}>• To calculate your personalized distress index and track changes</li>
              <li style={{ lineHeight: 1.45 }}>• To provide tailored coping and mindfulness suggestions</li>
              <li style={{ lineHeight: 1.45 }}>• To present emergency 24/7 crisis helplines during high distress</li>
              <li style={{ lineHeight: 1.45 }}>• To support anonymized research improving AI wellness tools</li>
            </ul>
          </section>

          <section className="wellness-card">
            <div className="wellness-card-header">
              <h3>Your Guaranteed Rights</h3>
            </div>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
              <li style={{ lineHeight: 1.45, color: 'var(--deep-sage)', fontWeight: 600 }}>✓ Right to withdraw consent anytime</li>
              <li style={{ lineHeight: 1.45, color: 'var(--deep-sage)', fontWeight: 600 }}>✓ Right to purge your check-in records</li>
              <li style={{ lineHeight: 1.45, color: 'var(--deep-sage)', fontWeight: 600 }}>✓ Right to decline specific survey questions</li>
              <li style={{ lineHeight: 1.45, color: 'var(--deep-sage)', fontWeight: 600 }}>✓ Right to understand how AI scores are derived</li>
            </ul>
          </section>
        </div>
      </main>
    </div>
  );
}

export default PrivacyPage;