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

      <main style={{ width: 'min(1140px, calc(100% - 32px))', margin: '32px auto 56px auto', display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {/* Page Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <h1 style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>
              Wellbeing Trends & Analytics
            </h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '2px' }}>
              Track patterns and understand how your mental wellness evolves over time.
            </p>
          </div>

          <Link to="/check-in" className="btn btn-primary">
            + New Check-in
          </Link>
        </div>

        {checkIns.length === 0 ? (
          <section className="wellness-card" style={{ padding: '48px 32px', textAlign: 'center' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '8px' }}>No trend data recorded yet</h2>
            <p style={{ color: 'var(--text-secondary)', maxWidth: '460px', margin: '0 auto 18px auto', fontSize: '0.9rem', lineHeight: 1.5 }}>
              Your trends and patterns will appear here automatically once you log daily check-ins.
            </p>
            <Link to="/check-in" className="btn btn-primary">
              Start First Check-in
            </Link>
          </section>
        ) : (
          <>
            {/* Trend Summary Box */}
            <section className="wellness-card" style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
              <div style={{ flex: 1 }}>
                <span style={{ fontSize: '0.74rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Insight Observation
                </span>
                <p style={{ fontSize: '0.94rem', color: 'var(--text-primary)', fontWeight: 600, marginTop: '4px', lineHeight: 1.45 }}>
                  {trendAnalysis.summary}
                </p>
              </div>
              {trendAnalysis.change !== 0 && (
                <div style={{ background: 'var(--surface-subtle)', padding: '8px 14px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)', fontSize: '0.82rem' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Score Shift: </span>
                  <strong style={{ color: trendAnalysis.change > 0 ? 'var(--danger)' : 'var(--primary)' }}>
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
                  <h3>Distress Score Timeline</h3>
                  <span className="card-subnote">Daily History</span>
                </div>
                <div style={{ height: '260px' }}>
                  <DistressTrendChart data={checkIns} />
                </div>
                <p style={{ fontSize: '0.76rem', color: 'var(--text-muted)', marginTop: '10px', textAlign: 'center' }}>
                  Lower scores reflect calmer, more manageable wellbeing.
                </p>
              </section>

              {/* Radar Chart */}
              <section className="wellness-card">
                <div className="wellness-card-header">
                  <h3>Wellbeing Dimensions</h3>
                  <span className="card-subnote">Baseline vs Current</span>
                </div>
                <div style={{ height: '260px' }}>
                  <WellbeingRadarChart data={wellbeingData} />
                </div>
                <p style={{ fontSize: '0.76rem', color: 'var(--text-muted)', marginTop: '10px', textAlign: 'center' }}>
                  Compares latest reflection against your onboarding baseline.
                </p>
              </section>
            </div>

            {/* Check-in History Table */}
            <section className="wellness-card">
              <div className="wellness-card-header">
                <h3>Check-in History Log</h3>
                <span className="card-subnote">{checkIns.length} recorded</span>
              </div>
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.86rem' }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid var(--border)', color: 'var(--text-muted)', fontSize: '0.76rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                      <th style={{ padding: '10px' }}>Date</th>
                      <th style={{ padding: '10px' }}>Distress Score</th>
                      <th style={{ padding: '10px' }}>Status</th>
                      <th style={{ padding: '10px' }}>Notes</th>
                    </tr>
                  </thead>
                  <tbody>
                    {checkIns.slice().reverse().map((entry, idx) => (
                      <tr key={entry.id || idx} style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                        <td style={{ padding: '10px', fontWeight: 600, color: 'var(--text-primary)' }}>
                          {new Date(entry.date).toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' })}
                        </td>
                        <td style={{ padding: '10px', color: 'var(--primary)', fontWeight: 700 }}>
                          {entry.distressScore ?? '—'}/100
                        </td>
                        <td style={{ padding: '10px' }}>
                          <RiskBadge level={entry.riskLevel || 'LOW'} size="small" />
                        </td>
                        <td style={{ padding: '10px', color: 'var(--text-secondary)', maxWidth: '300px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
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