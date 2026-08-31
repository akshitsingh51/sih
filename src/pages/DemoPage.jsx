import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { demoDisclaimer, demoCases, demoDistrictData } from '../data/demoData';
import RiskBadge from '../components/RiskBadge';

function DemoPage() {
  const { enterDemoMode } = useAuth();

  return (
    <div className="demo-page">
      <div className="demo-container">
        <div className="demo-banner">
          <span className="demo-icon">🎮</span>
          <h1>Demo Mode</h1>
          <p className="demo-warning">{demoDisclaimer}</p>
        </div>

        <div className="demo-intro">
          <h2>About Demo Mode</h2>
          <p>
            Demo mode allows you to explore the system using fictional data. 
            No real victim information is used. All cases shown are completely 
            made up for demonstration purposes.
          </p>
          <button onClick={enterDemoMode} className="btn-primary btn-large">
            Enter Demo Mode
          </button>
        </div>

        <div className="demo-cases">
          <h2>Sample Cases</h2>
          <div className="cases-table">
            <table>
              <thead>
                <tr>
                  <th>Case ID</th>
                  <th>Type</th>
                  <th>Risk</th>
                  <th>Score</th>
                  <th>Trend</th>
                  <th>Last Check-in</th>
                </tr>
              </thead>
              <tbody>
                {demoCases.map(caseItem => (
                  <tr key={caseItem.caseId}>
                    <td><strong>{caseItem.caseId}</strong></td>
                    <td>{caseItem.caseType}</td>
                    <td>
                      <RiskBadge level={caseItem.riskLevel} size="small" />
                    </td>
                    <td>{caseItem.latestDistressScore}</td>
                    <td className={`trend-${caseItem.trend.toLowerCase().replace(' ', '-')}`}>
                      {caseItem.trend}
                    </td>
                    <td>{caseItem.lastCheckIn}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="demo-district">
          <h2>District Overview (Demo)</h2>
          <div className="district-stats">
            <div className="stat-card">
              <span className="stat-value">{demoDistrictData.totalCases}</span>
              <span className="stat-label">Total Cases</span>
            </div>
            <div className="stat-card high">
              <span className="stat-value">{demoDistrictData.highRiskCases}</span>
              <span className="stat-label">High Risk</span>
            </div>
            <div className="stat-card urgent">
              <span className="stat-value">{demoDistrictData.urgentCases}</span>
              <span className="stat-label">Urgent</span>
            </div>
            <div className="stat-card">
              <span className="stat-value">{demoDistrictData.averageDistress}</span>
              <span className="stat-label">Avg. Distress</span>
            </div>
          </div>
        </div>

        <div className="demo-note">
          <p>
            <strong>Note:</strong> In a real deployment, this data would come from 
            actual monitored cases with full privacy protections. Demo data helps 
            demonstrate system capabilities without exposing any real information.
          </p>
        </div>
      </div>
    </div>
  );
}

export default DemoPage;