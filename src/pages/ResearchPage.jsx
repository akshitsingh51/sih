import React, { useState } from 'react';
import Header from '../components/Header';
import researchReferences from '../data/researchReferences';

function ResearchPage() {
  const [expandedId, setExpandedId] = useState(null);

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="research-page" style={{ minHeight: '100vh', background: 'var(--sand)', display: 'flex', flexDirection: 'column' }}>
      <Header />

      <main className="page-container" style={{ maxWidth: '960px' }}>
        <section className="page-header">
          <div className="page-header-text">
            <span className="intro-eyebrow" style={{ color: 'var(--warm-clay)' }}>Evidence & Methodology</span>
            <h1>Research & Psychological Frameworks</h1>
            <p>
              This system is grounded in validated psychological constructs and literature on stress monitoring, sleep quality, and active coping.
            </p>
          </div>
        </section>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {researchReferences.map((ref) => {
            const isExpanded = expandedId === ref.id;
            return (
              <div
                key={ref.id}
                className="wellness-card"
                style={{ padding: '20px 24px', transition: 'var(--transition-fast)' }}
              >
                <div
                  onClick={() => toggleExpand(ref.id)}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    cursor: 'pointer',
                    userSelect: 'none'
                  }}
                >
                  <div>
                    <span style={{ fontSize: '0.74rem', fontWeight: 700, color: 'var(--warm-clay)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                      {ref.construct}
                    </span>
                    <h2 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--text-primary)', marginTop: '2px' }}>
                      {ref.title}
                    </h2>
                  </div>

                  <span style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    background: isExpanded ? 'var(--deep-sage)' : 'var(--surface-subtle)',
                    color: isExpanded ? '#FFFFFF' : 'var(--deep-sage)',
                    border: isExpanded ? 'none' : '1px solid var(--border)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '16px',
                    fontWeight: 700,
                    flexShrink: 0
                  }}>
                    {isExpanded ? '−' : '+'}
                  </span>
                </div>

                {isExpanded && (
                  <div style={{ marginTop: '18px', paddingTop: '16px', borderTop: '1px solid var(--border-subtle)', display: 'flex', flexDirection: 'column', gap: '14px' }}>
                    <div>
                      <h4 style={{ fontSize: '0.84rem', fontWeight: 700, color: 'var(--deep-sage)', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '4px' }}>
                        Why It Matters
                      </h4>
                      <p style={{ fontSize: '0.88rem', color: 'var(--text-body)', lineHeight: 1.5 }}>
                        {ref.whyItMatters}
                      </p>
                    </div>

                    <div>
                      <h4 style={{ fontSize: '0.84rem', fontWeight: 700, color: 'var(--deep-sage)', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '4px' }}>
                        How the System Uses It
                      </h4>
                      <p style={{ fontSize: '0.88rem', color: 'var(--text-body)', lineHeight: 1.5 }}>
                        {ref.howSystemUsesIt}
                      </p>
                    </div>

                    <div style={{ padding: '12px 14px', background: 'var(--surface-subtle)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)' }}>
                      <h4 style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--warm-clay)', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '4px' }}>
                        Construct Limitations
                      </h4>
                      <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.45 }}>
                        {ref.limitations}
                      </p>
                    </div>

                    <div>
                      <h4 style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '6px' }}>
                        Key Academic References
                      </h4>
                      <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '4px', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                        {ref.references.map((citation, i) => (
                          <li key={i}>• {citation}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}

export default ResearchPage;