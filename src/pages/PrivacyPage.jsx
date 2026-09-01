import React from 'react';

function PrivacyPage() {
  return (
    <div className="privacy-page">
      <div className="privacy-container">
        <h1>Privacy & Security</h1>
        
        <section className="privacy-section">
          <h2>Data Protection Principles</h2>
          <div className="principles-grid">
            <div className="principle-card">
              <h3>🔒 Data Minimization</h3>
              <p>We collect only the data necessary for well-being monitoring. No unnecessary personal information is gathered.</p>
            </div>
            <div className="principle-card">
              <h3>✅ Consent</h3>
              <p>Your participation is voluntary. You provide explicit consent before any data collection begins.</p>
            </div>
            <div className="principle-card">
              <h3>🔐 Encryption</h3>
              <p>All data is encrypted in transit and at rest using industry-standard encryption.</p>
            </div>
            <div className="principle-card">
              <h3>👤 Access Control</h3>
              <p>Strict role-based access ensures only authorized personnel can view case information.</p>
            </div>
          </div>
        </section>

        <section className="privacy-section">
          <h2>How Your Data Is Used</h2>
          <ul className="privacy-list">
            <li>To calculate your distress score and identify trends</li>
            <li>To provide personalized recommendations for support</li>
            <li>To alert counselors when professional review may be needed</li>
            <li>To improve the system through anonymized research</li>
          </ul>
        </section>

        <section className="privacy-section">
          <h2>Access Levels</h2>
          <div className="roles-table">
            <table>
              <thead>
                <tr>
                  <th>Role</th>
                  <th>Can Access</th>
                  <th>Cannot Access</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>User</td>
                  <td>Own data only</td>
                  <td>Other users' data</td>
                </tr>
                <tr>
                  <td>Counselor</td>
                  <td>Assigned cases</td>
                  <td>Unassigned cases, other districts</td>
                </tr>
                <tr>
                  <td>District Admin</td>
                  <td>District-level aggregates</td>
                  <td>Individual case details (unless assigned)</td>
                </tr>
                <tr>
                  <td>State Admin</td>
                  <td>State aggregates</td>
                  <td>Individual case details</td>
                </tr>
                <tr>
                  <td>National Admin</td>
                  <td>National aggregates</td>
                  <td>Individual case details</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section className="privacy-section">
          <h2>Your Rights</h2>
          <ul className="rights-list">
            <li>✓ Right to withdraw consent at any time</li>
            <li>✓ Right to delete your data</li>
            <li>✓ Right to decline individual questions</li>
            <li>✓ Right to understand how your data is used</li>
            <li>✓ Right to access your own data</li>
          </ul>
        </section>

        <section className="privacy-section">
          <h2>Data Retention</h2>
          <p>
            Your data is retained as long as you maintain an active account. 
            Upon account deletion, all personal data is permanently removed 
            within 30 days, except where required for legal obligations.
          </p>
        </section>
      </div>
    </div>
  );
}

export default PrivacyPage;