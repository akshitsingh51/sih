import React, { useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';
import { calculateDistressScore } from '../services/distressScoreService';
import RiskBadge from '../components/RiskBadge';
import ExplainableAI from '../components/ExplainableAI';
import { DistressTrendChart } from '../components/charts';
import './DashboardPage.css';

const METRICS = [
  { key: 'daily_mood', label: 'Mood', kind: 'emoji' },
  { key: 'daily_anxiety', label: 'Anxiety', kind: 'scale' },
  { key: 'daily_sleep', label: 'Sleep', kind: 'emoji' },
  { key: 'daily_safety', label: 'Feeling safe', kind: 'emoji' },
  { key: 'daily_support', label: 'Support', kind: 'emoji' },
];

const RISK_COPY = {
  LOW: "Things look steady. Keep doing what's working.",
  MODERATE: "A few signs worth paying attention to today.",
  HIGH: "It looks like today has been a lot to carry.",
};

function DashboardPage() {
  const { user } = useAuth();
  const { baseline, checkIns, currentDistress, updateDistress } = useData();

  useEffect(() => {
    if (baseline) {
      const latestCheckIn = checkIns.length > 0 ? checkIns[checkIns.length - 1] : null;
      const distress = calculateDistressScore(
        latestCheckIn?.responses || {},
        baseline.responses || {},
        checkIns.map((c) => ({ date: c.date, distressScore: c.distressScore }))
      );
      updateDistress(distress);
    }
  }, [checkIns, baseline]);

  const getTimeGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  const latest = checkIns.length > 0 ? checkIns[checkIns.length - 1] : null;
  const riskLevel = currentDistress?.riskLevel || 'LOW';

  return (
    <div className="app-shell">
      <header className="app-nav">
        <Link to="/dashboard" className="app-nav__brand">
          <span className="app-nav__mark" aria-hidden="true" />
          Wayfinder
        </Link>

        <nav className="app-nav__links" aria-label="Primary">
          <NavLink to="/dashboard" className="app-nav__link" end>
            Dashboard
          </NavLink>
          <NavLink to="/checkin" className="app-nav__link">
            Check-in
          </NavLink>
          <NavLink to="/chat" className="app-nav__link">
            Talk
          </NavLink>
          <NavLink to="/history" className="app-nav__link">
            History
          </NavLink>
        </nav>

        <div className="app-nav__actions">
          <Link to="/help" className="app-nav__help">
            Get human help
          </Link>
          <Link to="/profile" className="app-nav__avatar" aria-label="Your profile">
            {(user?.name || 'U').charAt(0).toUpperCase()}
          </Link>
        </div>
      </header>

      <main className="dashboard">
        <section className="dashboard__greeting">
          <h1>
            {getTimeGreeting()}, {user?.name || 'there'}
          </h1>
          <p>Here's how the last few days have looked for you.</p>
        </section>

        {!baseline ? (
          <section className="empty-state">
            <h2>Let's set a starting point</h2>
            <p>
              A short baseline assessment helps us tell the difference between an
              ordinary rough day and a pattern worth noticing. It takes about five
              minutes, and you can update it any time.
            </p>
            <Link to="/baseline" className="btn-primary">
              Start the assessment
            </Link>
          </section>
        ) : (
          <>
            <section className="hero-row">
              <div className="score-panel">
                <div className="score-panel__top">
                  <span className="score-panel__label">Distress score</span>
                  <RiskBadge level={riskLevel} size="large" />
                </div>
                <div className="score-panel__value">{currentDistress?.score ?? '—'}</div>
                <p className="score-panel__copy">{RISK_COPY[riskLevel] || RISK_COPY.LOW}</p>
              </div>

              <ul className="metric-strip">
                {METRICS.map((metric) => (
                  <li className="metric-strip__item" key={metric.key}>
                    <span className="metric-strip__label">{metric.label}</span>
                    <span className="metric-strip__value">
                      {formatMetric(latest?.responses?.[metric.key], metric.kind)}
                    </span>
                  </li>
                ))}
              </ul>
            </section>

            {currentDistress && (
              <section className="panel panel--insight">
                <h2>What's behind this score</h2>
                <ExplainableAI distressData={currentDistress} />
              </section>
            )}

            <section className="panel">
              <h2>Your recent trend</h2>
              {checkIns.length > 0 ? (
                <DistressTrendChart data={checkIns} />
              ) : (
                <p className="panel__empty">
                  Once you've logged a couple of check-ins, your trend will show up
                  here.
                </p>
              )}
            </section>

            <section className="next-steps">
              <h2>What would help right now</h2>
              <div className="next-steps__grid">
                <Link to="/checkin" className="step-card">
                  <span className="step-card__title">Log today's check-in</span>
                  <span className="step-card__copy">Takes under a minute.</span>
                </Link>
                <Link to="/chat" className="step-card">
                  <span className="step-card__title">Talk it through</span>
                  <span className="step-card__copy">Your AI support is ready when you are.</span>
                </Link>
                <Link to="/help" className="step-card step-card--urgent">
                  <span className="step-card__title">Reach a person</span>
                  <span className="step-card__copy">Connect with real support, any time.</span>
                </Link>
              </div>
            </section>
          </>
        )}
      </main>
    </div>
  );
}

function formatMetric(score, kind) {
  if (!score) return '—';
  if (kind === 'scale') return `${score}/10`;
  const emojis = ['😞', '😔', '😐', '🙂', '😊'];
  return emojis[Math.min(4, Math.max(0, score - 1))] || '—';
}

export default DashboardPage;