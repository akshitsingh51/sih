import React from 'react';
import Header from '../components/Header';
import { useAuth } from '../context/AuthContext';
import { demoDisclaimer, demoCases, demoDistrictData } from '../data/demoData';
import RiskBadge from '../components/RiskBadge';

function DemoPage() {
  const { enterDemoMode } = useAuth();

  return (
    <div className="demo-page" style={{ minHeight: '100vh', background: 'var(--bg-app)', display: 'flex', flexDirection: 'column' }}>
      <Header />

      <main className="page-container">
        <section className="page-header">
          <div className="page-header-text">
            <span className="intro-eyebrow">Simulation Environment</span>
            <h1>Interactive Demo Mode</h1>
            <p>
              Explore sample synthetic data and administrative overview without touching real user accounts.
            </p>
          </div>

          <div className="page-header-actions">
            {typeof enterDemoMode === 'function' && (
              <button onClick={enterDemoMode} className="btn btn-primary">
                Load Demo Profile
              </button>
            )}
          </div>
        </section>

        {/* Demo Warning Banner */}
        <section style={{
          background: 'var(--warning-bg)',
          border: '1px solid var(--warning-border)',
          borderRadius: 'var(--radius-md)',
          padding: '16px 20px',
          display: 'flex',
          alignItems: 'center',
          gap: '12px'
        }}>
          <span style={{ fontSize: '20px' }}>⚠️</span>
          <div>
            <strong style={{ fontSize: '0.9rem', color: 'var(--warning)', display: 'block' }}>Synthetic Demonstration Data</strong>
            <p style={{ fontSize: '0.84rem', color: '#66471E', lineHeight: 1.45 }}>{demoDisclaimer}</p>
          </div>
        </section>

        {/* District Overview Stats */}
        <section className="wellness-card">
          <div className="wellness-card-header">
            <div>
              <h3>District Aggregate Overview</h3>
              <p className="card-description">High-level sample metrics</p>
            </div>
            <span className="card-subnote">Simulated Cohort</span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '14px' }}>
            <div style={{ padding: '16px 20px', background: 'var(--surface-subtle)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)' }}>
              <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 650, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                Total Sample Cases
              </span>
              <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--text-main)', marginTop: '4px' }}>
                {demoDistrictData.totalCases}
              </div>
            </div>

            <div style={{ padding: '16px 20px', background: 'var(--warning-bg)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--warning-border)' }}>
              <span style={{ fontSize: '0.78rem', color: 'var(--warning)', fontWeight: 650, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                Moderate / High
              </span>
              <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--warning)', marginTop: '4px' }}>
                {demoDistrictData.highRiskCases}
              </div>
            </div>

            <div style={{ padding: '16px 20px', background: 'var(--danger-bg)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--danger-border)' }}>
              <span style={{ fontSize: '0.78rem', color: 'var(--danger)', fontWeight: 650, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                Urgent Attention
              </span>
              <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--danger)', marginTop: '4px' }}>
                {demoDistrictData.urgentCases}
              </div>
            </div>

            <div style={{ padding: '16px 20px', background: 'var(--surface-subtle)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)' }}>
              <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 650, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                Avg Distress Index
              </span>
              <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--deep-sage)', marginTop: '4px' }}>
                {demoDistrictData.averageDistress}
              </div>
            </div>
          </div>
        </section>

        {/* Sample Cases Table */}
        <section className="wellness-card">
          <div className="wellness-card-header">
            <div>
              <h3>Sample Monitored Cases</h3>
              <p className="card-description">Fictional case examples for judicial and wellness evaluation</p>
            </div>
            <span className="card-subnote">Synthetic Profiles</span>
          </div>

          <div className="table-responsive">
            <table>
              <thead>
                <tr>
                  <th>Case ID</th>
                  <th>Category</th>
                  <th>Risk Level</th>
                  <th>Score</th>
                  <th>Trend</th>
                  <th>Last Check-in</th>
                </tr>
              </thead>
              <tbody>
                {demoCases.map((caseItem) => (
                  <tr key={caseItem.caseId}>
                    <td style={{ fontWeight: 750, color: 'var(--text-main)' }}>{caseItem.caseId}</td>
                    <td style={{ color: 'var(--text-secondary)' }}>{caseItem.caseType}</td>
                    <td>
                      <RiskBadge level={caseItem.riskLevel} size="small" />
                    </td>
                    <td style={{ fontWeight: 700, color: 'var(--deep-sage)' }}>{caseItem.latestDistressScore}/100</td>
                    <td style={{ color: 'var(--text-secondary)', fontWeight: 600 }}>{caseItem.trend}</td>
                    <td style={{ color: 'var(--text-muted)' }}>{caseItem.lastCheckIn}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
}

export default DemoPage;