import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useData } from '../context/DataContext';
import { dailyCheckInQuestions } from '../data/assessmentQuestions';
import { calculateDistressScore } from '../services/distressScoreService';
import { analyzeSentiment } from '../services/sentimentService';
import CrisisPanel from '../components/CrisisPanel';
import ExplainableAI from '../components/ExplainableAI';

function CheckInPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [responses, setResponses] = useState({});
  const [additionalText, setAdditionalText] = useState('');
  const [isComplete, setIsComplete] = useState(false);
  const [result, setResult] = useState(null);
  const [showCrisis, setShowCrisis] = useState(false);
  const { baseline, addCheckIn, updateDistress } = useData();
  const navigate = useNavigate();

  const question = dailyCheckInQuestions[currentQuestion];
  const progress = ((currentQuestion + 1) / dailyCheckInQuestions.length) * 100;

  const handleResponse = (value) => {
    const newResponses = { ...responses, [question.id]: value };
    setResponses(newResponses);

    if (currentQuestion < dailyCheckInQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      finishCheckIn(newResponses);
    }
  };

  const finishCheckIn = async (finalResponses) => {
    // Analyze text if provided
    let textAnalysis = null;
    if (additionalText) {
      textAnalysis = analyzeSentiment(additionalText);
      if (textAnalysis.isCrisis) {
        setShowCrisis(true);
      }
    }

    // Calculate distress score
    const distress = calculateDistressScore(
      finalResponses,
      baseline?.responses || {},
      [], // Previous check-ins would go here
      textAnalysis
    );

    // Save check-in
    addCheckIn({
      responses: finalResponses,
      additionalText,
      textAnalysis,
      distressScore: distress.score,
      riskLevel: distress.riskLevel
    });

    updateDistress(distress);
    setResult(distress);
    setIsComplete(true);
  };

  const handleSkip = () => {
    handleResponse(null);
  };

  if (isComplete && result) {
    return (
      <div className="checkin-complete">
        <CrisisPanel visible={showCrisis} onClose={() => setShowCrisis(false)} />
        
        <div className="result-container">
          <h1>Check-in Complete</h1>
          
          <div className="result-summary">
            <div className="result-score">
              <span className="score-value">{result.score}</span>
              <span className="score-max">/100</span>
            </div>
            <span className={`risk-badge risk-${result.riskLevel.toLowerCase()}`}>
              {result.riskLevel} RISK
            </span>
          </div>

          <ExplainableAI distressData={result} />

          <div className="result-disclaimer">
            <p>
              ⚠️ This is a prototype estimate. All thresholds are demonstration values, 
              NOT clinically validated cut-offs. If you are experiencing difficulties, 
              please reach out to a qualified professional.
            </p>
          </div>

          <div className="result-actions">
            <button onClick={() => navigate('/dashboard')} className="btn-primary">
              Back to Dashboard
            </button>
            <button onClick={() => navigate('/help')} className="btn-secondary">
              Get Help
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="checkin-page">
      <CrisisPanel visible={showCrisis} onClose={() => setShowCrisis(false)} />
      
      <div className="checkin-container">
        <div className="checkin-header">
          <h1>Daily Check-in</h1>
          <p>5 quick questions about how you're feeling</p>
        </div>

        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${progress}%` }}></div>
          <span className="progress-text">
            Question {currentQuestion + 1} of {dailyCheckInQuestions.length}
          </span>
        </div>

        <div className="question-card">
          <div className="question-domain">{question.domain}</div>
          <h2 className="question-text">{question.question}</h2>

          {question.type === 'emoji' && (
            <div className="emoji-options">
              {question.options.map((option, index) => (
                <button
                  key={index}
                  className={`emoji-btn ${responses[question.id] === option.score ? 'selected' : ''}`}
                  onClick={() => handleResponse(option.score)}
                  title={option.label}
                >
                  <span className="emoji">{option.emoji}</span>
                  <span className="emoji-label">{option.label}</span>
                </button>
              ))}
            </div>
          )}

          {question.type === 'slider' && (
            <div className="slider-container">
              <input
                type="range"
                min={question.min}
                max={question.max}
                value={responses[question.id] || 5}
                onChange={(e) => setResponses({ ...responses, [question.id]: parseInt(e.target.value) })}
                className="slider"
              />
              <div className="slider-labels">
                <span>{question.labels[0]}</span>
                <span>{responses[question.id] || 5}</span>
                <span>{question.labels[1]}</span>
              </div>
              <button
                className="btn-primary"
                onClick={() => handleResponse(responses[question.id] || 5)}
              >
                Next
              </button>
            </div>
          )}

          {/* Additional text input for last question */}
          {currentQuestion === dailyCheckInQuestions.length - 1 && (
            <div className="additional-text">
              <label>Anything else you'd like to share? (Optional)</label>
              <textarea
                value={additionalText}
                onChange={(e) => setAdditionalText(e.target.value)}
                placeholder="Share any thoughts, feelings, or concerns..."
                rows={4}
              />
            </div>
          )}
        </div>

        <div className="checkin-footer">
          <button onClick={handleSkip} className="btn-text">
            Prefer not to answer
          </button>
        </div>
      </div>
    </div>
  );
}

export default CheckInPage;
