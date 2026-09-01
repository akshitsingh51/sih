import React from 'react';
import Header from '../components/Header';

function LimitationsPage() {
  const limitations = [
    {
      title: 'AI Cannot Replace Human Clinicians',
      description: 'Human emotions and psychological distress are deeply nuanced. Our system calculates supportive trends and estimates, not formal psychiatric diagnoses.'
    },
    {
      title: 'Experimental Sentiment Signals',
      description: 'Text and conversational sentiment analysis captures linguistic markers, which should always be interpreted as indicative rather than clinical facts.'
    },
    {
      title: 'Subjectivity in Self-Reporting',
      description: 'Daily check-in scores depend on individual self-awareness, perception, and cultural interpretation of scale numbers.'
    },
    {
      title: 'Potential for False Indicators',
      description: 'Algorithms may occasionally estimate higher distress than what is felt, which is why human autonomy and professional care always take precedence.'
    },
    {
      title: 'Data Sparsity Sensitivity',
      description: 'Infrequent or skipped check-ins reduce the reliability of longitudinal trend detection. Consistent reflection improves pattern recognition.'
    },
    {
      title: 'Complementary Care Only',
      description: 'This platform is engineered to support early reflection and resource discovery, not to substitute clinical therapy or immediate emergency response.'
    }
  ];

  return (
    <div className="limitations-page" style={{ minHeight: '100vh', background: 'var(--bg-app)', display: 'flex', flexDirection: 'column' }}>
      <Header />

      <main className="page-container" style={{ maxWidth: '960px' }}>
        <section className="page-header">
          <div className="page-header-text">
            <span className="intro-eyebrow">Ethical AI Transparency</span>
            <h1>System Scope & Limitations</h1>
            <p>
              Responsible AI requires total transparency about capabilities, boundaries, and ethical safeguards.
            </p>
          </div>
        </section>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
          {limitations.map((limitation, index) => (
            <div key={index} className="wellness-card" style={{ padding: '20px 22px' }}>
              <div style={{
                width: '32px',
                height: '32px',
                borderRadius: 'var(--radius-xs)',
                background: 'var(--accent-subtle)',
                color: 'var(--accent)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '0.8rem',
                fontWeight: 750,
                marginBottom: '12px'
              }}>
                0{index + 1}
              </div>
              <h3 style={{ fontSize: '1rem', fontWeight: 750, color: 'var(--text-main)', marginBottom: '6px' }}>
                {limitation.title}
              </h3>
              <p style={{ fontSize: '0.86rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                {limitation.description}
              </p>
            </div>
          ))}
        </div>

        <section className="wellness-card" style={{ background: 'var(--surface-subtle)', border: '1px solid var(--border)' }}>
          <h3 style={{ fontSize: '1.05rem', fontWeight: 750, color: 'var(--text-main)', marginBottom: '6px' }}>
            Our Ethical Commitment
          </h3>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.55 }}>
            We continuously audit algorithm fairness, minimize false alarms, and partner with mental health professionals to ensure that users are treated with dignity, compassion, and agency.
          </p>
        </section>
      </main>
    </div>
  );
}

export default LimitationsPage;