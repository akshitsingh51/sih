import React, { useState } from 'react';
import researchReferences from '../data/researchReferences';

function ResearchPage() {
  const [expandedId, setExpandedId] = useState(null);

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="research-page">
      <div className="research-container">
        <div className="research-header">
          <h1>Research & Evidence</h1>
          <p>
            This system is built on established psychological research and validated 
            assessment methodologies. Every feature is connected to established 
            psychological constructs.
          </p>
        </div>

        <div className="evidence-cards">
          {researchReferences.map(ref => (
            <div 
              key={ref.id} 
              className={`evidence-card ${expandedId === ref.id ? 'expanded' : ''}`}
            >
              <div 
                className="card-header"
                onClick={() => toggleExpand(ref.id)}
              >
                <h2>{ref.title}</h2>
                <span className="expand-icon">
                  {expandedId === ref.id ? '−' : '+'}
                </span>
              </div>

              {expandedId === ref.id && (
                <div className="card-content">
                  <div className="card-section">
                    <h3>Construct</h3>
                    <p>{ref.construct}</p>
                  </div>

                  <div className="card-section">
                    <h3>Why It Matters</h3>
                    <p>{ref.whyItMatters}</p>
                  </div>

                  <div className="card-section">
                    <h3>How the System Uses It</h3>
                    <p>{ref.howSystemUsesIt}</p>
                  </div>

                  <div className="card-section limitations">
                    <h3>Limitations</h3>
                    <p>{ref.limitations}</p>
                  </div>

                  <div className="card-section references">
                    <h3>References</h3>
                    <ul>
                      {ref.references.map((refText, i) => (
                        <li key={i}>{refText}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="research-footer">
          <h2>Important Note</h2>
          <p>
            The research references listed are real publications from credible sources. 
            However, the application of these concepts in an AI monitoring system is 
            for research and prototype purposes. No claims of clinical validation are 
            made for this prototype system.
          </p>
        </div>
      </div>
    </div>
  );
}

export default ResearchPage;