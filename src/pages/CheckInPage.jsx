import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
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

  const { baseline, checkIns, addCheckIn } = useData();
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

  const finishCheckIn = (finalResponses) => {
    let textAnalysis = null;
    if (additionalText && additionalText.trim()) {
      textAnalysis = analyzeSentiment(additionalText.trim());
      if (textAnalysis.isCrisis) {
        setShowCrisis(true);
      }
    }

    const baselineResponses = baseline?.responses || baseline || {};
    const historyData = checkIns.map(c => ({ date: c.date, distressScore: c.distressScore || 50 }));

    const distress = calculateDistressScore(
      finalResponses,
      baselineResponses,
      historyData,
      textAnalysis || {}
    );

    // Save into central DataContext
    addCheckIn({
      responses: finalResponses,
      additionalText: additionalText.trim(),
      textAnalysis,
      distressScore: distress.score,
      riskLevel: distress.riskLevel
    });

    setResult(distress);
    setIsComplete(true);
  };

  const handleSkip = () => {
    handleResponse(null);
  };

  if (isComplete && result) {
    return (
      <div className="checkin-page" style={{ minHeight: '100vh', background: 'var(--bg-app)', display: 'flex', flexDirection: 'column' }}>
        <Header />
        <CrisisPanel visible={showCrisis} onClose={() => setShowCrisis(false)} />

        <main style={{ width: 'min(700px, calc(100% - 40px))', margin: '36px auto 60px auto' }}>
          <div className="wellness-card" style={{ padding: '36px 32px' }}>
            <div style={{ textAlign: 'center', marginBottom: '24px' }}>
              <span className="tag tag-steady" style={{ marginBottom: '10px' }}>
                ✓ Reflection Logged
              </span>
              <h1 style={{ fontSize: '1.65rem', fontWeight: 800, color: 'var(--text-main)', marginTop: '8px' }}>
                Your Check-in Has Been Recorded
              </h1>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', maxWidth: '480px', margin: '6px auto 0 auto', lineHeight: 1.55 }}>
                Your distress score and personalized recommendations have been safely updated.
              </p>
            </div>

            {/* Score Pill Display */}
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '28px',
              padding: '18px 24px',
              background: 'var(--surface-subtle)',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border)',
              margin: '0 auto 24px auto',
              maxWidth: '420px'
            }}>
              <div>
                <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)', display: 'block', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                  Distress Score
                </span>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '3px' }}>
                  <span style={{ fontSize: '2.2rem', fontWeight: 800, color: 'var(--deep-sage)', lineHeight: 1 }}>{result.score}</span>
                  <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem', fontWeight: 600 }}>/100</span>
                </div>
              </div>

              <div style={{ height: '36px', width: '1px', background: 'var(--border)' }} />

              <div>
                <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)', display: 'block', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                  Wellbeing State
                </span>
                <span className={`tag tag-${result.riskLevel.toLowerCase()}`} style={{ marginTop: '4px' }}>
                  ● {result.riskLevel === 'LOW' ? 'Steady' : result.riskLevel === 'MODERATE' ? 'Moderate' : 'Elevated'}
                </span>
              </div>
            </div>

            <div style={{ background: 'var(--surface)', padding: '20px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)', marginBottom: '24px' }}>
              <ExplainableAI distressData={result} />
            </div>

            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button
                onClick={() => navigate('/dashboard')}
                className="btn btn-primary"
              >
                Back to Dashboard
              </button>
              <button
                onClick={() => navigate('/chat')}
                className="btn btn-secondary"
              >
                ✦ Talk with AI Assistant
              </button>
              <button
                onClick={() => navigate('/trends')}
                className="btn btn-secondary"
              >
                View Trends
              </button>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="checkin-page" style={{ minHeight: '100vh', background: 'var(--bg-app)', display: 'flex', flexDirection: 'column' }}>
      <Header />
      <CrisisPanel visible={showCrisis} onClose={() => setShowCrisis(false)} />

      <main style={{ width: 'min(660px, calc(100% - 40px))', margin: '36px auto 60px auto' }}>
        <div className="wellness-card" style={{ padding: '34px 30px' }}>
          
          <div style={{ marginBottom: '20px' }}>
            <span className="intro-eyebrow" style={{ color: 'var(--deep-sage)' }}>
              Daily Reflection
            </span>
            <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-main)', marginTop: '4px' }}>
              Daily Wellbeing Check-in
            </h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '4px' }}>
              5 gentle questions about how you are feeling right now. Take your time.
            </p>
          </div>

          {/* Progress bar */}
          <div style={{ background: 'var(--surface-subtle)', borderRadius: 'var(--radius-sm)', padding: '10px 14px', marginBottom: '24px', border: '1px solid var(--border-subtle)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', fontWeight: 650, color: 'var(--text-secondary)', marginBottom: '6px' }}>
              <span>Question {currentQuestion + 1} of {dailyCheckInQuestions.length}</span>
              <span>{Math.round(progress)}% Complete</span>
            </div>
            <div style={{ width: '100%', height: '5px', background: 'var(--border)', borderRadius: '3px', overflow: 'hidden' }}>
              <div style={{ width: `${progress}%`, height: '100%', background: 'var(--primary-sage)', transition: 'width 0.25s ease' }} />
            </div>
          </div>

          {/* Question Card */}
          <div style={{ minHeight: '220px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <span style={{ fontSize: '0.74rem', fontWeight: 750, color: 'var(--terracotta)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                {question.domain}
              </span>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 750, color: 'var(--text-main)', margin: '6px 0 20px 0', lineHeight: 1.35 }}>
                {question.question}
              </h2>

              {question.type === 'emoji' && (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(90px, 1fr))', gap: '10px', marginBottom: '18px' }}>
                  {question.options.map((option, index) => {
                    const isSelected = responses[question.id] === option.score;
                    return (
                      <button
                        key={index}
                        type="button"
                        style={{
                          padding: '14px 8px',
                          background: isSelected ? 'var(--primary-subtle)' : 'var(--surface)',
                          border: isSelected ? '2px solid var(--primary-sage)' : '1px solid var(--border)',
                          borderRadius: 'var(--radius-sm)',
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          gap: '6px',
                          cursor: 'pointer',
                          transition: 'var(--transition-fast)'
                        }}
                        onClick={() => handleResponse(option.score)}
                      >
                        <span style={{ fontSize: '26px' }}>{option.emoji}</span>
                        <span style={{ fontSize: '0.8rem', fontWeight: 650, color: isSelected ? 'var(--deep-sage)' : 'var(--text-main)' }}>
                          {option.label}
                        </span>
                      </button>
                    );
                  })}
                </div>
              )}

              {question.type === 'slider' && (
                <div style={{ marginBottom: '22px', padding: '16px', background: 'var(--surface-subtle)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.84rem', color: 'var(--text-secondary)', marginBottom: '12px' }}>
                    <span>{question.labels[0]} (1)</span>
                    <span style={{ fontWeight: 800, fontSize: '1.15rem', color: 'var(--deep-sage)', background: 'var(--surface)', padding: '2px 10px', borderRadius: '12px', border: '1px solid var(--border)' }}>
                      {responses[question.id] || 5}/10
                    </span>
                    <span>{question.labels[1]} (10)</span>
                  </div>
                  <input
                    type="range"
                    min={question.min}
                    max={question.max}
                    value={responses[question.id] || 5}
                    onChange={(e) => setResponses({ ...responses, [question.id]: parseInt(e.target.value) })}
                    style={{ width: '100%', accentColor: 'var(--primary-sage)', height: '6px', cursor: 'pointer', marginBottom: '16px' }}
                  />
                  <button
                    className="btn btn-primary"
                    style={{ width: '100%' }}
                    onClick={() => handleResponse(responses[question.id] || 5)}
                  >
                    Confirm & Continue →
                  </button>
                </div>
              )}

              {/* Free-text reflection on the last question */}
              {currentQuestion === dailyCheckInQuestions.length - 1 && (
                <div style={{ marginTop: '16px' }}>
                  <label style={{ display: 'block', fontSize: '0.84rem', fontWeight: 650, color: 'var(--text-main)', marginBottom: '6px' }}>
                    Anything else on your mind today? (Optional)
                  </label>
                  <textarea
                    value={additionalText}
                    onChange={(e) => setAdditionalText(e.target.value)}
                    placeholder="Share any thoughts, feelings, or recent situations..."
                    rows={3}
                  />
                </div>
              )}
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '24px', paddingTop: '16px', borderTop: '1px solid var(--border-subtle)' }}>
              {currentQuestion > 0 ? (
                <button
                  type="button"
                  onClick={() => setCurrentQuestion(prev => prev - 1)}
                  className="btn-text"
                >
                  ← Previous
                </button>
              ) : <div />}

              <button
                type="button"
                onClick={handleSkip}
                style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontSize: '0.82rem', fontWeight: 600 }}
              >
                Prefer not to answer (Skip)
              </button>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}

export default CheckInPage;
