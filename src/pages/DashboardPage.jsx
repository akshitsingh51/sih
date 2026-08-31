import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';
import { calculateDistressScore } from '../services/distressService';
import RiskBadge from '../components/RiskBadge';
import ExplainableAI from '../components/ExplainableAI';
import { DistressTrendChart } from '../components/charts';

function DashboardPage() {
  const { user } = useAuth();
  const { baseline, checkIns, currentDistress, updateDistress } = useData();

  // Calculate current distress score
  useEffect(() => {
    if (baseline) {
      const latestCheckIn = checkIns.length > 0 ? checkIns[checkIns.length - 1] : null;
      const distress = calculateDistressScore(
        latestCheckIn?.responses || {},
        baseline.responses || {},
        checkIns.map(c => ({ date: c.date, distressScore: c.distressScore }))
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

  return (
    <div className="dashboard-page">
      <div className="dashboard-container">
        <div className="dashboard-greeting">
          <h1>{getTimeGreeting()}, {user?.name || 'User'}</h1>
          <p>Your well-being snapshot</p>
        </div>

        {!baseline ? (
          <div className="dashboard-prompt">
            <div className="prompt-card">
              <h2>Complete Your Baseline Assessment</h2>
              <p>To get started, please complete the initial well-being assessment.</p>
              <Link to="/baseline" className="btn-primary">
                Start Assessment
              </Link>
            </div>
          </div>
        ) : (
          <>
            {/* Current Status Cards */}
            <div className="status-grid">
              <div className="status-card distress-card">
                <h3>Distress Score</h3>
                <div className="big-score">
                  {currentDistress?.score || '--'}
                </div>
                <RiskBadge level={currentDistress?.riskLevel || 'LOW'} size="large" />
              </div>

              <div className="status-card">
                <h3>Mood</h3>
                <div className="metric-value">
                  {checkIns.length > 0 ? 
                    getEmojiForScore(checkIns[checkIns.length - 1]?.responses?.daily_mood) : 
                    '—'}
                </div>
                <span className="metric-label">Current</span>
              </div>

              <div className="status-card">
                <h3>Anxiety</h3>
                <div className="metric-value">
                  {checkIns.length > 0 ? 
                    `${checkIns[checkIns.length - 1]?.responses?.daily_anxiety || '—'}/10` : 
                    '—'}
                </div>
                <span className="metric-label">Level</span>
              </div>

              <div className="status-card">
                <h3>Sleep</h3>
                <div className="metric-value">
                  {checkIns.length > 0 ? 
                    getEmojiForScore(checkIns[checkIns.length - 1]?.responses?.daily_sleep) : 
                    '—'}
                </div>
                <span className="metric-label">Quality</span>
              </div>

              <div className="status-card">
                <h3>Safety</h3>
                <div className="metric-value">
                  {checkIns.length > 0 ? 
                    getEmojiForScore(checkIns[checkIns.length - 1]?.responses?.daily_safety) : 
                    '—'}
                </div>
                <span className="metric-label">Feeling</span>
              </div>

              <div className="status-card">
                <h3>Support</h3>
                <div className="metric-value">
                  {checkIns.length > 0 ? 
                    getEmojiForScore(checkIns[checkIns.length - 1]?.responses?.daily_support) : 
                    '—'}
                </div>
                <span className="metric-label">Level</span>
              </div>
            </div>

            {/* Explainable AI Section */}
            {currentDistress && (
              <ExplainableAI distressData={currentDistress} />
            )}

            {/* Trend Preview */}
            <div className="trend-preview">
              <h2>Your Recent Trend</h2>
              {checkIns.length > 0 ? (
                <DistressTrendChart data={checkIns} />
              ) : (
                <p>Complete your first check-in to see your trend.</p>
              )}
            </div>

            {/* Quick Actions */}
            <div className="quick-actions">
              <h2>Recommended Next Steps</h2>
              <div className="actions-grid">
                <Link to="/checkin" className="action-card">
                  <span className="action-icon">📝</span>
                  <span className="action-text">Daily Check-in</span>
                </Link>
                <Link to="/chat" className="action-card">
                  <span className="action-icon">💬</span>
                  <span className="action-text">Talk to AI Support</span>
                </Link>
                <Link to="/help" className="action-card emergency">
                  <span className="action-icon">🆘</span>
                  <span className="action-text">Get Human Help</span>
                </Link>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function getEmojiForScore(score) {
  if (!score) return '—';
  const emojis = ['😞', '😔', '😐', '🙂', '😊'];
  return emojis[Math.min(4, Math.max(0, score - 1))] || '—';
}

export default DashboardPage;