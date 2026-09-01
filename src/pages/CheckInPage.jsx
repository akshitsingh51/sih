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

        <main style={{ width: 'min(720px, calc(100% - 32px))', margin: '36px auto 56px auto' }}>
          <div className="wellness-card" style={{ padding: '36px 32px' }}>
            <div style={{ textAlign: 'center', marginBottom: '24px' }}>
              <span style={{ fontSize: '0.76rem', fontWeight: 700, color: 'var(--success)', textTransform: 'uppercase', letterSpacing: '0.06em', background: 'var(--success-bg)', padding: '4px 10px', borderRadius: '12px', border: '1px solid var(--success-border)' }}>
                Check-in Completed
              </span>
              <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-primary)', marginTop: '8px' }}>
                Your Reflection Has Been Recorded
              </h1>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', maxWidth: '480px', margin: '6px auto 0 auto', lineHeight: 1.5 }}>
                Your distress score and personalized recommendations have been updated.
              </p>
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '24px', padding: '16px 20px', background: 'var(--surface-subtle)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)', marginBottom: '24px', maxWidth: '380px', margin: '0 auto 24px auto' }}>
              <div>
                <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)', display: 'block', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em' }}>Distress Score</span>
                <span style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--primary)', lineHeight: 1 }}>{result.score}</span>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem', fontWeight: 600 }}>/100</span>
              </div>
              <div style={{ height: '32px', width: '1px', background: 'var(--border)' }} />
              <div>
                <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)', display: 'block', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em' }}>Status Level</span>
                <span style={{ fontWeight: 700, fontSize: '0.95rem', color: result.riskLevel === 'LOW' ? 'var(--success)' : result.riskLevel === 'MODERATE' ? 'var(--warning)' : 'var(--danger)' }}>
                  {result.riskLevel === 'LOW' ? 'Steady' : result.riskLevel === 'MODERATE' ? 'Moderate' : 'Elevated'}
                </span>
              </div>
            </div>

            <div style={{ background: 'var(--surface)', padding: '16px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)', marginBottom: '24px' }}>
              <ExplainableAI distressData={result} />
            </div>

            <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap' }}>
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
                Talk with AI Assistant
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

      <main style={{ width: 'min(640px, calc(100% - 32px))', margin: '36px auto 56px auto' }}>
        <div className="wellness-card" style={{ padding: '32px 28px' }}>
          
          <div style={{ marginBottom: '20px' }}>
            <span style={{ fontSize: '0.74rem', fontWeight: 700, color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '0.06em', background: 'var(--primary-subtle)', padding: '3px 8px', borderRadius: '10px' }}>
              Daily Reflection
            </span>
            <h1 style={{ fontSize: '1.45rem', fontWeight: 800, color: 'var(--text-primary)', marginTop: '6px' }}>
              Daily Wellbeing Check-in
            </h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', marginTop: '2px' }}>
              5 quick questions about how you are feeling right now.
            </p>
          </div>

          {/* Progress bar */}
          <div style={{ background: 'var(--surface-subtle)', borderRadius: 'var(--radius-xs)', padding: '8px 12px', marginBottom: '20px', border: '1px solid var(--border)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.76rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '4px' }}>
              <span>Question {currentQuestion + 1} of {dailyCheckInQuestions.length}</span>
              <span>{Math.round(progress)}% Complete</span>
            </div>
            <div style={{ width: '100%', height: '4px', background: 'var(--border)', borderRadius: '2px', overflow: 'hidden' }}>
              <div style={{ width: `${progress}%`, height: '100%', background: 'var(--primary)', transition: 'width 0.25s ease' }} />
            </div>
          </div>

          {/* Question Card */}
          <div style={{ minHeight: '200px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <span style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                {question.domain}
              </span>
              <h2 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--text-primary)', margin: '4px 0 16px 0', lineHeight: 1.35 }}>
                {question.question}
              </h2>

              {question.type === 'emoji' && (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(75px, 1fr))', gap: '8px', marginBottom: '16px' }}>
                  {question.options.map((option, index) => (
                    <button
                      key={index}
                      type="button"
                      style={{
                        padding: '12px 6px',
                        background: responses[question.id] === option.score ? 'var(--primary-subtle)' : 'var(--surface)',
                        border: responses[question.id] === option.score ? '2px solid var(--primary)' : '1px solid var(--border)',
                        borderRadius: 'var(--radius-sm)',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '4px',
                        cursor: 'pointer',
                        transition: 'var(--transition)'
                      }}
                      onClick={() => handleResponse(option.score)}
                    >
                      <span style={{ fontSize: '24px' }}>{option.emoji}</span>
                      <span style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--text-primary)' }}>{option.label}</span>
                    </button>
                  ))}
                </div>
              )}

              {question.type === 'slider' && (
                <div style={{ marginBottom: '20px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', color: 'var(--text-secondary)', marginBottom: '8px' }}>
                    <span>{question.labels[0]} (1)</span>
                    <span style={{ fontWeight: 800, fontSize: '1.05rem', color: 'var(--primary)' }}>{responses[question.id] || 5}/10</span>
                    <span>{question.labels[1]} (10)</span>
                  </div>
                  <input
                    type="range"
                    min={question.min}
                    max={question.max}
                    value={responses[question.id] || 5}
                    onChange={(e) => setResponses({ ...responses, [question.id]: parseInt(e.target.value) })}
                    style={{ width: '100%', accentColor: 'var(--primary)', height: '6px', cursor: 'pointer', marginBottom: '14px' }}
                  />
                  <button
                    className="btn btn-primary"
                    onClick={() => handleResponse(responses[question.id] || 5)}
                  >
                    Confirm & Continue →
                  </button>
                </div>
              )}

              {/* Free-text reflection on the last question */}
              {currentQuestion === dailyCheckInQuestions.length - 1 && (
                <div style={{ marginTop: '14px' }}>
                  <label style={{ display: 'block', fontSize: '0.84rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '4px' }}>
                    Anything else on your mind today? (Optional)
                  </label>
                  <textarea
                    value={additionalText}
                    onChange={(e) => setAdditionalText(e.target.value)}
                    placeholder="Share any thoughts, feelings, or challenges..."
                    rows={3}
                    style={{ width: '100%', padding: '10px 12px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)', background: 'var(--surface)', outline: 'none', fontSize: '0.88rem', color: 'var(--text-primary)' }}
                  />
                </div>
              )}
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '20px', paddingTop: '12px', borderTop: '1px solid var(--border-subtle)' }}>
              {currentQuestion > 0 ? (
                <button
                  type="button"
                  onClick={() => setCurrentQuestion(prev => prev - 1)}
                  style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', fontSize: '0.82rem', fontWeight: 600 }}
                >
                  ← Previous
                </button>
              ) : <div />}

              <button
                type="button"
                onClick={handleSkip}
                style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontSize: '0.8rem' }}
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
