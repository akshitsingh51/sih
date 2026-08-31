import React from 'react';
import { useData } from '../context/DataContext';
import { DistressTrendChart, WellbeingRadarChart } from '../components/charts';
import RiskBadge from '../components/RiskBadge';

function TrendsPage() {
  const { checkIns, baseline } = useData();

  // Calculate trend analysis
  const getTrendAnalysis = () => {
    if (checkIns.length < 2) {
      return {
        summary: 'Complete more check-ins to see your trends.',
        trend: 'insufficient'
      };
    }

    const recentScores = checkIns.slice(-3).map(c => c.distressScore || 50);
    const olderScores = checkIns.slice(0, Math.max(1, checkIns.length - 3)).map(c => c.distressScore || 50);

    const recentAvg = recentScores.reduce((a, b) => a + b, 0) / recentScores.length;
    const olderAvg = olderScores.reduce((a, b) => a + b, 0) / olderScores.length;

    const change = recentAvg - olderAvg;

    if (change > 10) {
      return {
        summary: 'Distress has increased over recent check-ins. Consider reaching out for support.',
        trend: 'increasing',
        change: Math.round(change)
      };
    } else if (change < -10) {
      return {
        summary: 'Your recent responses indicate improvement compared with your baseline.',
        trend: 'decreasing',
        change: Math.round(change)
      };
    } else {
      return {
        summary: 'Your distress level has been relatively stable.',
        trend: 'stable',
        change: Math.round(change)
      };
    }
  };

  const trendAnalysis = getTrendAnalysis();

  // Prepare wellbeing data for radar chart
  const wellbeingData = {
    mood: checkIns.length > 0 ? checkIns[checkIns.length - 1]?.responses?.daily_mood : 3,
    sleep: checkIns.length > 0 ? checkIns[checkIns.length - 1]?.responses?.daily_sleep : 3,
    safety: checkIns.length > 0 ? checkIns[checkIns.length - 1]?.responses?.daily_safety : 3,
    support: checkIns.length > 0 ? checkIns[checkIns.length - 1]?.responses?.daily_support : 3,
    calm: 3,
    baselineMood: baseline?.responses?.mood_1 || 3,
    baselineSleep: baseline?.responses?.sleep_1 || 3,
    baselineSafety: baseline?.responses?.safety_1 || 3,
    baselineSupport: baseline?.responses?.support_1 || 3,
    baselineCalm: 3
  };

  return (
    <div className="trends-page">
      <div className="trends-container">
        <h1>My Trends</h1>
        <p>Track your well-being over time</p>

        {checkIns.length === 0 ? (
          <div className="no-data-message">
            <p>Complete your first check-in to start seeing trends.</p>
          </div>
        ) : (
          <>
            {/* Trend Summary */}
            <div className={`trend-summary trend-${trendAnalysis.trend}`}>
              <h3>Trend Analysis</h3>
              <p className="trend-text">{trendAnalysis.summary}</p>
              {trendAnalysis.change !== undefined && (
                <p className="trend-change">
                  Change: <strong>{trendAnalysis.change > 0 ? '+' : ''}{trendAnalysis.change}</strong> points
                </p>
              )}
            </div>

            {/* Distress Trend Chart */}
            <div className="chart-section">
              <h2>Distress Score Over Time</h2>
              <DistressTrendChart data={checkIns} />
            </div>

            {/* Wellbeing Radar */}
            <div className="chart-section">
              <h2>Wellbeing Dimensions</h2>
              <WellbeingRadarChart data={wellbeingData} />
              <p className="chart-note">
                Current values vs. baseline. Higher is better.
              </p>
            </div>

            {/* Check-in History */}
            <div className="history-section">
              <h2>Check-in History</h2>
              <div className="history-list">
                {checkIns.slice().reverse().map((checkIn, index) => (
                  <div key={checkIn.id || index} className="history-item">
                    <div className="history-date">
                      {new Date(checkIn.date).toLocaleDateString('en-IN', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric'
                      })}
                    </div>
                    <div className="history-score">
                      <span className="score-label">Distress:</span>
                      <span className="score-value">{checkIn.distressScore || '—'}</span>
                    </div>
                    <RiskBadge level={checkIn.riskLevel || 'LOW'} size="small" />
                  </div>
                ))}
              </div>
            </div>

            {/* Interpretation */}
            <div className="interpretation-section">
              <h2>Understanding Your Trends</h2>
              <p>
                Your trends are based on periodic assessments and help identify patterns 
                in your well-being. This information is designed to support you and your 
                care team, not to provide a diagnosis.
              </p>
              <div className="interpretation-cards">
                <div className="interp-card">
                  <h4>📈 Increasing Trend</h4>
                  <p>May indicate worsening symptoms. Consider reaching out for support.</p>
                </div>
                <div className="interp-card">
                  <h4>📊 Stable Trend</h4>
                  <p>Your current state is consistent. Continue monitoring.</p>
                </div>
                <div className="interp-card">
                  <h4>📉 Decreasing Trend</h4>
                  <p>May indicate improvement. Maintain healthy routines.</p>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default TrendsPage;