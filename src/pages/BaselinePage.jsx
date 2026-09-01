import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useData } from "../context/DataContext";

const questions = [
  {
    id: 1,
    question: "Over the last two weeks, how often have you felt nervous, anxious, or on edge?",
    options: [
      "Not at all",
      "Several days",
      "More than half the days",
      "Nearly every day",
    ],
  },
  {
    id: 2,
    question: "Over the last two weeks, how often have you felt down, depressed, or hopeless?",
    options: [
      "Not at all",
      "Several days",
      "More than half the days",
      "Nearly every day",
    ],
  },
  {
    id: 3,
    question: "Over the last two weeks, how often have you had difficulty sleeping or staying asleep?",
    options: [
      "Not at all",
      "Several days",
      "More than half the days",
      "Nearly every day",
    ],
  },
  {
    id: 4,
    question: "Over the last two weeks, how often have you felt worried about your safety or future?",
    options: [
      "Not at all",
      "Several days",
      "More than half the days",
      "Nearly every day",
    ],
  },
  {
    id: 5,
    question: "Over the last two weeks, how often have you felt tired or had little energy?",
    options: [
      "Not at all",
      "Several days",
      "More than half the days",
      "Nearly every day",
    ],
  },
  {
    id: 6,
    question: "Over the last two weeks, how often have you found it difficult to concentrate?",
    options: [
      "Not at all",
      "Several days",
      "More than half the days",
      "Nearly every day",
    ],
  },
  {
    id: 7,
    question: "Over the last two weeks, how often have you felt overwhelmed by your situation?",
    options: [
      "Not at all",
      "Several days",
      "More than half the days",
      "Nearly every day",
    ],
  },
  {
    id: 8,
    question: "Over the last two weeks, how often have you felt that you had someone you could rely on for support?",
    options: [
      "Never",
      "Sometimes",
      "Often",
      "Almost always",
    ],
  },
];

function BaselinePage() {
  const navigate = useNavigate();
  const { saveBaseline } = useData();

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [error, setError] = useState("");

  const question = questions[currentQuestion];

  const handleAnswer = (answer) => {
    setAnswers((previous) => ({
      ...previous,
      [question.id]: answer,
    }));

    setError("");
  };

  const handleNext = () => {
    if (!answers[question.id]) {
      setError("Please select an option before continuing.");
      return;
    }

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((previous) => previous + 1);
      setError("");
    } else {
      completeBaseline();
    }
  };

  const handleBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((previous) => previous - 1);
      setError("");
    } else {
      navigate("/consent");
    }
  };

  const completeBaseline = () => {
    if (typeof saveBaseline === "function") {
      saveBaseline(answers);
    }
    navigate("/dashboard", { replace: true });
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <div className="baseline-page" style={{ minHeight: '100vh', background: 'var(--bg-app)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px 20px' }}>
      
      <main style={{ width: 'min(760px, 100%)', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '20px' }}>

        {/* Header */}
        <section style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto' }}>
          <span className="intro-eyebrow" style={{ color: 'var(--terracotta)' }}>
            Initial Assessment
          </span>
          <h1 style={{ fontSize: '1.9rem', fontWeight: 800, color: 'var(--text-main)', marginTop: '4px', marginBottom: '8px' }}>
            Let's understand how you're feeling
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: 1.55 }}>
            These questions help create a personalized starting point for your wellbeing journey. There are no right or wrong answers.
          </p>
        </section>

        {/* Progress */}
        <section style={{ background: 'var(--surface-subtle)', borderRadius: 'var(--radius-sm)', padding: '10px 14px', border: '1px solid var(--border-subtle)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', fontWeight: 650, color: 'var(--text-secondary)', marginBottom: '6px' }}>
            <span>Question {currentQuestion + 1} of {questions.length}</span>
            <span>{Math.round(progress)}% Complete</span>
          </div>
          <div style={{ width: '100%', height: '5px', background: 'var(--border)', borderRadius: '3px', overflow: 'hidden' }}>
            <div style={{ width: `${progress}%`, height: '100%', background: 'var(--primary-sage)', transition: 'width 0.25s ease' }} />
          </div>
        </section>

        {/* Question Card */}
        <section className="wellness-card" style={{ padding: '34px 30px' }}>
          <div style={{
            width: '38px',
            height: '38px',
            borderRadius: 'var(--radius-sm)',
            background: 'var(--primary-subtle)',
            color: 'var(--deep-sage)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '0.88rem',
            fontWeight: 750,
            marginBottom: '16px'
          }}>
            0{currentQuestion + 1}
          </div>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 750, color: 'var(--text-main)', marginBottom: '22px', lineHeight: 1.4 }}>
            {question.question}
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {question.options.map((option, index) => {
              const selected = answers[question.id] === option;
              return (
                <button
                  key={option}
                  type="button"
                  onClick={() => handleAnswer(option)}
                  style={{
                    width: '100%',
                    minHeight: '54px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '14px',
                    padding: '12px 16px',
                    borderRadius: 'var(--radius-sm)',
                    border: selected ? '2px solid var(--primary-sage)' : '1px solid var(--border)',
                    background: selected ? 'var(--primary-subtle)' : 'var(--surface)',
                    cursor: 'pointer',
                    textAlign: 'left',
                    transition: 'var(--transition-fast)'
                  }}
                >
                  <span style={{
                    width: '28px',
                    height: '28px',
                    borderRadius: '6px',
                    background: selected ? 'var(--primary-sage)' : 'var(--surface-muted)',
                    color: selected ? '#FFFFFF' : 'var(--text-secondary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '0.78rem',
                    fontWeight: 750,
                    flexShrink: 0
                  }}>
                    {String.fromCharCode(65 + index)}
                  </span>

                  <span style={{ flex: 1, fontSize: '0.9rem', fontWeight: selected ? 650 : 500, color: selected ? 'var(--deep-sage)' : 'var(--text-main)' }}>
                    {option}
                  </span>

                  <span style={{ color: 'var(--deep-sage)', fontWeight: 800, fontSize: '14px' }}>
                    {selected ? '✓' : ''}
                  </span>
                </button>
              );
            })}
          </div>

          {error && (
            <div className="consent-error" style={{ marginTop: '16px' }}>
              <span>!</span>
              <p>{error}</p>
            </div>
          )}

          {/* Navigation */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '14px',
            marginTop: '28px',
            paddingTop: '20px',
            borderTop: '1px solid var(--border-subtle)'
          }}>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={handleBack}
            >
              ← Back
            </button>

            <button
              type="button"
              className="btn btn-primary"
              onClick={handleNext}
            >
              {currentQuestion === questions.length - 1 ? 'Complete Assessment' : 'Continue →'}
            </button>
          </div>
        </section>

        {/* Safe Space note */}
        <section className="welcome-support" style={{ margin: '0 auto', width: '100%', maxWidth: '760px' }}>
          <div className="support-icon">♡</div>
          <div>
            <strong style={{ fontSize: '0.86rem', color: 'var(--text-main)' }}>You are in a safe, confidential space.</strong>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
              Your responses are encrypted and used only to calibrate your personal baseline and provide supportive guidance.
            </p>
          </div>
        </section>

      </main>
    </div>
  );
}

export default BaselinePage;