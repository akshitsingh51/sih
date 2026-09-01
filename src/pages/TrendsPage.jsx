import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { useData } from '../context/DataContext';
import { DistressTrendChart, WellbeingRadarChart } from '../components/charts';
import RiskBadge from '../components/RiskBadge';

function TrendsPage() {
  const { checkIns, baseline } = useData();

  // Calculate trend analysis
  const getTrendAnalysis = () => {
    if (!checkIns || checkIns.length < 2) {
      return {
        summary: 'Log at least two daily check-ins to track changes in your wellbeing over time.',
        trend: 'insufficient',
        change: 0
      };
    }

    const recentScores = checkIns.slice(-3).map(c => c.distressScore || 50);
    const olderScores = checkIns.slice(0, Math.max(1, checkIns.length - 3)).map(c => c.distressScore || 50);

    const recentAvg = recentScores.reduce((a, b) => a + b, 0) / recentScores.length;
    const olderAvg = olderScores.reduce((a, b) => a + b, 0) / olderScores.length;

    const change = recentAvg - olderAvg;

    if (change > 8) {
      return {
        summary: 'Your distress has trended higher recently. Consider taking regular pauses and trying calming routines.',
        trend: 'increasing',
        change: Math.round(change)
      };
    } else if (change < -8) {
      return {
        summary: 'Your recent check-ins indicate positive improvements in your overall wellbeing.',
        trend: 'decreasing',
        change: Math.round(change)
      };
    } else {
      return {
        summary: 'Your emotional state and distress levels have been relatively steady and consistent.',
        trend: 'stable',
        change: Math.round(change)
      };
    }
  };

  const trendAnalysis = getTrendAnalysis();
  const latestCheckIn = checkIns.length > 0 ? checkIns[checkIns.length - 1] : null;

  // Prepare radar chart values
  const wellbeingData = {
    mood: latestCheckIn?.responses?.daily_mood || 3,
    sleep: latestCheckIn?.responses?.daily_sleep || 3,
    safety: latestCheckIn?.responses?.daily_safety || 3,
    support: latestCheckIn?.responses?.daily_support || 3,
    calm: latestCheckIn?.responses?.daily_anxiety ? Math.max(1, 10 - latestCheckIn.responses.daily_anxiety) / 2 : 3,
    baselineMood: baseline?.responses?.mood_1 || 3,
    baselineSleep: baseline?.responses?.sleep_1 || 3,
    baselineSafety: baseline?.responses?.safety_1 || 3,
    baselineSupport: baseline?.responses?.support_1 || 3,
    baselineCalm: 3
  };

  return (
    <div className="trends-page" style={{ minHeight: '100vh', background: 'var(--bg-app)', display: 'flex', flexDirection: 'column' }}>
      <Header />

      <main className="page-container">
        {/* Page Header */}
        <section className="page-header">
          <div className="page-header-text">
            <span className="intro-eyebrow">History & Longitudinal Tracking</span>
            <h1>Wellbeing Trends & Analytics</h1>
            <p>
              Track patterns and understand how your mental wellness evolves over time.
            </p>
          </div>

          <div className="page-header-actions">
            <Link to="/check-in" className="btn btn-primary">
              <span className="btn-icon">+</span>
              <span>New Check-in</span>
            </Link>
          </div>
        </section>

        {checkIns.length === 0 ? (
          <section className="wellness-card empty-dashboard-card">
            <div className="empty-symbol">📈</div>
            <h2>No trend data recorded yet</h2>
            <p>
              Your trends and patterns will appear here automatically once you start logging daily check-ins.
            </p>
            <div className="empty-actions">
              <Link to="/check-in" className="btn btn-primary">
                + Start First Check-in
              </Link>
            </div>
          </section>
        ) : (
          <>
            {/* Trend Summary Box */}
            <section className="wellness-card" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px', flexWrap: 'wrap' }}>
              <div style={{ flex: 1, minWidth: '260px' }}>
                <span className="section-eyebrow">Insight Observation</span>
                <p style={{ fontSize: '0.95rem', color: 'var(--text-main)', fontWeight: 600, marginTop: '4px', lineHeight: 1.5 }}>
                  {trendAnalysis.summary}
                </p>
              </div>
              {trendAnalysis.change !== 0 && (
                <div style={{ background: 'var(--surface-subtle)', padding: '10px 16px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)', fontSize: '0.84rem' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Score Shift: </span>
                  <strong style={{ color: trendAnalysis.change > 0 ? 'var(--danger)' : 'var(--success)' }}>
                    {trendAnalysis.change > 0 ? `+${trendAnalysis.change}` : trendAnalysis.change} pts
                  </strong>
                </div>
              )}
            </section>

            {/* Charts Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '20px' }}>
              {/* Line Chart */}
              <section className="wellness-card">
                <div className="wellness-card-header">
                  <div>
                    <h3>Distress Score Timeline</h3>
                    <p className="card-description">Daily scores over time</p>
                  </div>
                  <span className="card-subnote">Daily History</span>
                </div>
                <div style={{ height: '260px' }}>
                  <DistressTrendChart data={checkIns} />
                </div>
                <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '12px', textAlign: 'center' }}>
                  Lower scores reflect calmer, more manageable wellbeing.
                </p>
              </section>

              {/* Radar Chart */}
              <section className="wellness-card">
                <div className="wellness-card-header">
                  <div>
                    <h3>Wellbeing Dimensions</h3>
                    <p className="card-description">Comparing key indicators</p>
                  </div>
                  <span className="card-subnote">Baseline vs Current</span>
                </div>
                <div style={{ height: '260px' }}>
                  <WellbeingRadarChart data={wellbeingData} />
                </div>
                <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '12px', textAlign: 'center' }}>
                  Compares latest reflection against your onboarding baseline.
                </p>
              </section>
            </div>

            {/* Check-in History Table */}
            <section className="wellness-card">
              <div className="wellness-card-header">
                <div>
                  <h3>Check-in History Log</h3>
                  <p className="card-description">Complete log of all your recorded reflections</p>
                </div>
                <span className="card-subnote">{checkIns.length} recorded</span>
              </div>
              <div className="table-responsive">
                <table>
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Distress Score</th>
                      <th>Status</th>
                      <th>Notes & Reflections</th>
                    </tr>
                  </thead>
                  <tbody>
                    {checkIns.slice().reverse().map((entry, idx) => (
                      <tr key={entry.id || idx}>
                        <td style={{ fontWeight: 650, color: 'var(--text-main)' }}>
                          {new Date(entry.date).toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' })}
                        </td>
                        <td style={{ color: 'var(--deep-sage)', fontWeight: 750 }}>
                          {entry.distressScore ?? '—'}/100
                        </td>
                        <td>
                          <RiskBadge level={entry.riskLevel || 'LOW'} size="small" />
                        </td>
                        <td style={{ color: 'var(--text-secondary)', maxWidth: '340px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                          {entry.additionalText || '—'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          </>
        )}
      </main>
    </div>
  );
}

export default TrendsPage;