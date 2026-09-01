import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';
import Header from '../components/Header';
import ExplainableAI from '../components/ExplainableAI';
import { DistressTrendChart } from '../components/charts';
import './DashboardPage.css';

const KEY_METRICS = [
  { key: 'daily_mood', altKey: 'mood_1', label: 'Mood', kind: 'emoji' },
  { key: 'daily_anxiety', altKey: 'anxiety_1', label: 'Stress Level', kind: 'scale' },
  { key: 'daily_sleep', altKey: 'sleep_1', label: 'Sleep Quality', kind: 'emoji' },
  { key: 'daily_safety', altKey: 'safety_1', label: 'Feeling Safe', kind: 'emoji' },
  { key: 'daily_support', altKey: 'support_1', label: 'Social Support', kind: 'emoji' },
];

function DashboardPage() {
  const { user } = useAuth();
  const { checkIns, currentDistress, recommendations, getLatestCheckIn } = useData();

  const getTimeGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  const latest = getLatestCheckIn();
  const riskLevel = currentDistress?.riskLevel || 'LOW';
  const hasCheckIns = checkIns && checkIns.length > 0;

  const getStatusSummary = () => {
    if (!hasCheckIns) return 'No check-in recorded yet today.';
    if (riskLevel === 'LOW') return 'Your wellbeing indicators suggest you are in a steady, manageable space.';
    if (riskLevel === 'MODERATE') return 'A few responses indicate mild fatigue or pressure. Remember to take short pauses.';
    return 'Your recent check-in reflects elevated distress. Consider reaching out to your support system.';
  };

  return (
    <div className="dashboard-page">
      <Header />

      <main className="dashboard-main">
        {/* Top Greeting & Header Bar */}
        <section className="dashboard-intro">
          <div>
            <h1>
              {getTimeGreeting()}, {user?.name ? user.name.split(' ')[0] : 'there'}
            </h1>
            <p className="intro-subtext">
              Here is a clear look at your mental wellbeing and suggested next steps.
            </p>
          </div>

          <div className="dashboard-top-actions">
            <Link to="/check-in" className="btn btn-primary">
              Log Today's Check-in
            </Link>
            <Link to="/chat" className="btn btn-secondary">
              Talk with AI Assistant
            </Link>
          </div>
        </section>

        {!hasCheckIns ? (
          /* Clean Empty State */
          <section className="wellness-card empty-dashboard-card">
            <h2>Welcome to your wellbeing monitor</h2>
            <p>
              Take 1 minute to complete your first daily check-in. This establishes your daily baseline
              and helps identify emotional trends over time.
            </p>
            <div className="empty-actions">
              <Link to="/check-in" className="btn btn-primary">
                Complete First Check-in
              </Link>
              <Link to="/chat" className="btn btn-secondary">
                Have a Quick Chat
              </Link>
            </div>
          </section>
        ) : (
          <>
            {/* Primary Overview: Status Card & Metric Tiles */}
            <section className="dashboard-grid-top">
              {/* Primary Wellbeing Status */}
              <div className="wellness-card status-overview-card">
                <div className="card-top-row">
                  <span className="section-eyebrow">Current Wellbeing State</span>
                  <span className={`status-tag status-${riskLevel.toLowerCase()}`}>
                    {riskLevel === 'LOW' ? '● Steady' : riskLevel === 'MODERATE' ? '● Moderate' : '● Elevated'}
                  </span>
                </div>

                <div className="status-score-block">
                  <div className="score-number-display">
                    <span className="score-val">{currentDistress?.score ?? 50}</span>
                    <span className="score-denom">/100</span>
                  </div>
                  <span className="score-desc-title">Distress Index</span>
                </div>

                <p className="status-narrative">
                  {getStatusSummary()}
                </p>

                {latest && (
                  <div className="status-meta-row">
                    <span>Last check-in:</span>
                    <strong>
                      {new Date(latest.date).toLocaleDateString([], { month: 'short', day: 'numeric' })} at{' '}
                      {new Date(latest.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </strong>
                  </div>
                )}
              </div>

              {/* Today's Key Metrics Grid */}
              <div className="wellness-card metrics-card">
                <div className="wellness-card-header">
                  <h3>Today's Key Signals</h3>
                  <span className="card-subnote">Daily Check-in</span>
                </div>

                <div className="metrics-grid">
                  {KEY_METRICS.map((metric) => {
                    const val = latest?.responses?.[metric.key] ?? latest?.responses?.[metric.altKey];
                    return (
                      <div className="metric-cell" key={metric.key}>
                        <span className="metric-label">{metric.label}</span>
                        <span className="metric-value">{formatMetric(val, metric.kind)}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </section>

            {/* Middle Section: Trend Chart & Explainable AI */}
            <section className="dashboard-grid-middle">
              {/* 7-Day Trend Chart */}
              <div className="wellness-card">
                <div className="wellness-card-header">
                  <div>
                    <h3>Distress & Mood Trend</h3>
                    <p className="card-description">Scores from your recent daily check-ins</p>
                  </div>
                  <Link to="/trends" className="btn-text">
                    View full analytics →
                  </Link>
                </div>

                <div className="chart-container-box">
                  <DistressTrendChart data={checkIns} />
                </div>
              </div>

              {/* Explainable AI Breakdown & Recommendations */}
              <div className="wellness-card">
                <div className="wellness-card-header">
                  <h3>Score Analysis & Guidance</h3>
                  <span className="card-subnote">AI Assessment</span>
                </div>

                <ExplainableAI distressData={currentDistress} />

                {recommendations?.categories?.selfCare && recommendations.categories.selfCare.length > 0 && (
                  <div className="quick-recommendation-box">
                    <span className="rec-header-label">Suggested Next Step</span>
                    <p className="rec-text">{recommendations.categories.selfCare[0]}</p>
                    <Link to="/help" className="btn-text">
                      View all support recommendations →
                    </Link>
                  </div>
                )}
              </div>
            </section>

            {/* Quick Navigation Cards */}
            <section className="dashboard-actions-row">
              <Link to="/check-in" className="nav-shortcut-card">
                <div>
                  <h4>Daily Check-in</h4>
                  <p>Log today's 1-minute reflection</p>
                </div>
                <span className="arrow-icon">→</span>
              </Link>

              <Link to="/chat" className="nav-shortcut-card">
                <div>
                  <h4>AI Assistant Chat</h4>
                  <p>Private, supportive conversation</p>
                </div>
                <span className="arrow-icon">→</span>
              </Link>

              <Link to="/trends" className="nav-shortcut-card">
                <div>
                  <h4>Trends & Insights</h4>
                  <p>Review patterns and history</p>
                </div>
                <span className="arrow-icon">→</span>
              </Link>

              <Link to="/help" className="nav-shortcut-card support-shortcut">
                <div>
                  <h4>Helplines & Resources</h4>
                  <p>24/7 free, confidential care</p>
                </div>
                <span className="arrow-icon">→</span>
              </Link>
            </section>
          </>
        )}
      </main>
    </div>
  );
}

function formatMetric(score, kind) {
  if (score === null || score === undefined) return '—';
  if (kind === 'scale') {
    if (score <= 3) return 'Low';
    if (score <= 6) return 'Moderate';
    return 'Elevated';
  }
  const labels = ['Low', 'Mild', 'Fair', 'Good', 'Peaceful'];
  const idx = typeof score === 'number' ? Math.min(4, Math.max(0, score - 1)) : 2;
  return labels[idx] || `${score}`;
}

export default DashboardPage;