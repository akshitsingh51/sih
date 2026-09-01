import React from 'react';

function LimitationsPage() {
  const limitations = [
    {
      title: 'AI Cannot Fully Understand Human Emotions',
      description: 'Human emotions are complex, contextual, and influenced by many factors that current AI systems cannot fully capture. Our system provides estimates, not definitive assessments.'
    },
    {
      title: 'Voice Stress Analysis Is Experimental',
      description: 'Voice-based emotion and stress detection is an emerging technology with significant limitations. It should not be treated as reliable evidence of psychological state.'
    },
    {
      title: 'Sentiment Is Not a Mental Health Diagnosis',
      description: 'Text sentiment analysis measures linguistic patterns, not clinical emotional states. A negative sentiment score does not indicate depression or any specific condition.'
    },
    {
      title: 'Questionnaire Responses May Be Subjective',
      description: 'Self-reported data depends on how individuals interpret and respond to questions. Cultural, linguistic, and personal factors can influence responses.'
    },
    {
      title: 'Predictions May Contain False Positives',
      description: 'The system may occasionally flag cases as high-risk when no actual crisis exists. This is why human review is essential for all flagged cases.'
    },
    {
      title: 'Predictions May Contain False Negatives',
      description: 'The system may occasionally miss cases that do require attention. This is why regular check-ins and professional judgment remain important.'
    },
    {
      title: 'Cultural and Linguistic Differences',
      description: 'AI models may perform differently across cultures and languages. Ongoing calibration and diverse training data are needed to improve accuracy.'
    },
    {
      title: 'Technology Access Limitations',
      description: 'Not all victims have equal access to technology. The system should supplement, not replace, traditional support services.'
    },
    {
      title: 'Missing Data Affects Predictions',
      description: 'Incomplete check-ins or irregular usage can reduce prediction accuracy. Consistent engagement improves reliability.'
    },
    {
      title: 'AI Should Not Replace Professionals',
      description: 'This system is designed to support, not replace, psychologists, counselors, and other mental health professionals. High-risk cases always require human review.'
    }
  ];

  return (
    <div className="limitations-page">
      <div className="limitations-container">
        <div className="limitations-header">
          <h1>Limitations</h1>
          <p>
            Transparency is essential for ethical AI systems. This page honestly 
            describes what our system can and cannot do.
          </p>
        </div>

        <div className="limitations-grid">
          {limitations.map((limitation, index) => (
            <div key={index} className="limitation-card">
              <h3>{limitation.title}</h3>
              <p>{limitation.description}</p>
            </div>
          ))}
        </div>

        <div className="limitations-footer">
          <h2>Our Commitment</h2>
          <p>
            We are committed to developing this system responsibly. We acknowledge 
            these limitations openly and continuously work to improve the system's 
            accuracy, fairness, and reliability while maintaining transparency about 
            what AI can and cannot achieve in mental health monitoring.
          </p>
        </div>
      </div>
    </div>
  );
}

export default LimitationsPage;