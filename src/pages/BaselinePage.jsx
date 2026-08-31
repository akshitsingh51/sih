import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';
import { baselineQuestions } from '../src/data/questions';

function BaselinePage() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [responses, setResponses] = useState({});
  const { updateProfile } = useAuth();
  const { saveBaseline } = useData();
  const navigate = useNavigate();

  const question = baselineQuestions[currentQuestion];
  const progress = ((currentQuestion + 1) / baselineQuestions.length) * 100;

  const handleResponse = (value) => {
    const newResponses = { ...responses, [question.id]: value };
    setResponses(newResponses);

    if (currentQuestion < baselineQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Complete baseline
      finishBaseline(newResponses);
    }
  };

  const finishBaseline = (finalResponses) => {
    const baseline = {
      responses: finalResponses,
      completedAt: new Date().toISOString(),
      questionCount: baselineQuestions.length
    };
    
    saveBaseline(baseline);
    updateProfile({ baselineComplete: true });
    navigate('/dashboard');
  };

  const handleBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  return (
    <div className="baseline-page">
      <div className="baseline-container">
        <div className="baseline-header">
          <h1>Initial Well-being Assessment</h1>
          <p>This helps establish your personal baseline for future comparisons.</p>
        </div>

        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${progress}%` }}></div>
          <span className="progress-text">
            Question {currentQuestion + 1} of {baselineQuestions.length}
          </span>
        </div>

        <div className="question-card">
          <div className="question-domain">{question.domain}</div>
          <h2 className="question-text">{question.question}</h2>
          
          {question.source && (
            <div className="question-source">
              <small>Based on: {question.source}</small>
            </div>
          )}

          <div className="response-options">
            {question.options.map((option, index) => (
              <button
                key={index}
                className={`response-btn ${responses[question.id] === question.scores[index] ? 'selected' : ''}`}
                onClick={() => handleResponse(question.scores[index])}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        <div className="baseline-footer">
          <button 
            onClick={handleBack} 
            className="btn-secondary"
            disabled={currentQuestion === 0}
          >
            ← Back
          </button>
          <button 
            onClick={() => handleResponse(null)} 
            className="btn-text"
          >
            Prefer not to answer
          </button>
        </div>
      </div>
    </div>
  );
}

export default BaselinePage;