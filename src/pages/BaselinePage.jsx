import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

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
      setError("Please select an answer before continuing.");
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
    /*
      Save baseline completion so the application knows
      that the user has completed onboarding.
    */
    localStorage.setItem("baselineCompleted", "true");
    localStorage.setItem(
      "baselineAnswers",
      JSON.stringify(answers)
    );

    /*
      Go directly to the dashboard after completing
      the baseline assessment.
    */
    navigate("/dashboard", { replace: true });
  };

  const progress =
    ((currentQuestion + 1) / questions.length) * 100;

  return (
    <div className="baseline-page">

      {/* Decorative background */}
      <div className="baseline-sun-glow"></div>
      <div className="baseline-horizon horizon-one"></div>
      <div className="baseline-horizon horizon-two"></div>

      <main className="baseline-container">

        {/* Header */}
        <section className="baseline-header">

          <div className="baseline-eyebrow">
            YOUR WELLBEING
          </div>

          <h1>Let's understand how you're feeling.</h1>

          <p>
            These questions help us create a starting point for
            understanding your wellbeing. There are no right or
            wrong answers.
          </p>

        </section>

        {/* Progress */}
        <section className="baseline-progress-section">

          <div className="baseline-progress-info">
            <span>
              Question {currentQuestion + 1} of {questions.length}
            </span>

            <span>
              {Math.round(progress)}%
            </span>
          </div>

          <div className="baseline-progress-track">
            <div
              className="baseline-progress-fill"
              style={{ width: `${progress}%` }}
            ></div>
          </div>

        </section>

        {/* Question Card */}
        <section className="baseline-card">

          <div className="question-number">
            0{currentQuestion + 1}
          </div>

          <h2>{question.question}</h2>

          <div className="baseline-options">

            {question.options.map((option, index) => {

              const selected =
                answers[question.id] === option;

              return (
                <button
                  key={option}
                  type="button"
                  className={`baseline-option ${
                    selected ? "selected" : ""
                  }`}
                  onClick={() => handleAnswer(option)}
                >

                  <span className="option-letter">
                    {String.fromCharCode(65 + index)}
                  </span>

                  <span className="option-text">
                    {option}
                  </span>

                  <span className="option-check">
                    {selected ? "✓" : ""}
                  </span>

                </button>
              );
            })}

          </div>

          {error && (
            <div className="baseline-error">
              {error}
            </div>
          )}

          {/* Navigation */}
          <div className="baseline-navigation">

            <button
              type="button"
              className="baseline-back-button"
              onClick={handleBack}
            >
              ← Back
            </button>

            <button
              type="button"
              className="baseline-next-button"
              onClick={handleNext}
            >
              {currentQuestion === questions.length - 1
                ? "Complete"
                : "Continue →"}
            </button>

          </div>

        </section>

        {/* Support message */}
        <section className="baseline-support">

          <div className="support-icon">
            ♡
          </div>

          <div>
            <strong>You are in a safe space.</strong>

            <p>
              Your responses are used to understand your wellbeing
              and provide appropriate support. You can take your
              time with every question.
            </p>
          </div>

        </section>

      </main>

      {/* Page styling */}
      <style>{`

        .baseline-page {
          min-height: 100vh;
          background: #E6DFD3;
          color: #4A5D4E;
          position: relative;
          overflow: hidden;
          font-family:
            -apple-system,
            BlinkMacSystemFont,
            "SF Pro Text",
            "Segoe UI",
            Roboto,
            sans-serif;
        }

        .baseline-sun-glow {
          position: absolute;
          width: 420px;
          height: 420px;
          border-radius: 50%;
          background: rgba(255,255,255,0.28);
          top: -250px;
          right: -100px;
          pointer-events: none;
        }

        .baseline-horizon {
          position: absolute;
          left: -5%;
          width: 110%;
          height: 1px;
          background: rgba(74,93,78,0.12);
          pointer-events: none;
        }

        .horizon-one {
          top: 24%;
        }

        .horizon-two {
          top: 78%;
        }

        .baseline-container {
          width: min(900px, calc(100% - 40px));
          margin: 0 auto;
          padding: 70px 0 60px;
          position: relative;
          z-index: 2;
        }

        .baseline-header {
          max-width: 720px;
          margin-bottom: 42px;
        }

        .baseline-eyebrow {
          display: inline-block;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 2px;
          color: #C87D65;
          margin-bottom: 14px;
        }

        .baseline-header h1 {
          margin: 0 0 16px;
          font-size: clamp(30px, 5vw, 42px);
          line-height: 1.12;
          font-weight: 700;
          letter-spacing: -1px;
          color: #4A5D4E;
        }

        .baseline-header p {
          margin: 0;
          max-width: 650px;
          font-size: 16px;
          line-height: 1.7;
          color: rgba(74,93,78,0.78);
        }

        .baseline-progress-section {
          margin-bottom: 20px;
        }

        .baseline-progress-info {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 10px;
          font-size: 13px;
          font-weight: 600;
          color: rgba(74,93,78,0.7);
        }

        .baseline-progress-track {
          width: 100%;
          height: 7px;
          background: rgba(74,93,78,0.12);
          border-radius: 20px;
          overflow: hidden;
        }

        .baseline-progress-fill {
          height: 100%;
          background: #8A9A86;
          border-radius: 20px;
          transition: width 400ms ease-in-out;
        }

        .baseline-card {
          background: #FFFFFF;
          border-radius: 24px;
          padding: 42px;
          box-shadow:
            0 18px 50px rgba(74,93,78,0.10),
            0 3px 12px rgba(74,93,78,0.06);
          border: 1px solid rgba(74,93,78,0.07);
        }

        .question-number {
          width: 48px;
          height: 48px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 15px;
          background: #E6DFD3;
          color: #4A5D4E;
          font-size: 14px;
          font-weight: 700;
          margin-bottom: 24px;
        }

        .baseline-card h2 {
          margin: 0 0 30px;
          max-width: 720px;
          font-size: 22px;
          line-height: 1.45;
          font-weight: 650;
          color: #4A5D4E;
        }

        .baseline-options {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .baseline-option {
          width: 100%;
          min-height: 62px;
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 12px 16px;
          border: 1px solid rgba(74,93,78,0.15);
          border-radius: 15px;
          background: #FFFFFF;
          color: #4A5D4E;
          cursor: pointer;
          text-align: left;
          font-family: inherit;
          transition:
            background 350ms ease-in-out,
            border-color 350ms ease-in-out,
            box-shadow 350ms ease-in-out,
            transform 350ms ease-in-out;
        }

        .baseline-option:hover {
          background: #F8F6F2;
          border-color: #8A9A86;
          transform: translateY(-1px);
        }

        .baseline-option.selected {
          background: rgba(138,154,134,0.13);
          border-color: #8A9A86;
          box-shadow:
            0 6px 18px rgba(74,93,78,0.08);
        }

        .option-letter {
          width: 34px;
          height: 34px;
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 10px;
          background: #E6DFD3;
          font-size: 13px;
          font-weight: 700;
          color: #4A5D4E;
        }

        .selected .option-letter {
          background: #8A9A86;
          color: #FFFFFF;
        }

        .option-text {
          flex: 1;
          font-size: 15px;
          line-height: 1.4;
          font-weight: 500;
        }

        .option-check {
          width: 24px;
          height: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #4A5D4E;
          font-weight: 700;
        }

        .baseline-error {
          margin-top: 18px;
          padding: 12px 15px;
          border-radius: 12px;
          background: rgba(200,125,101,0.12);
          color: #9A5542;
          font-size: 13px;
          font-weight: 600;
        }

        .baseline-navigation {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 16px;
          margin-top: 34px;
          padding-top: 26px;
          border-top: 1px solid rgba(74,93,78,0.09);
        }

        .baseline-back-button,
        .baseline-next-button {
          min-height: 48px;
          padding: 0 24px;
          border-radius: 13px;
          font-family: inherit;
          font-size: 15px;
          font-weight: 650;
          cursor: pointer;
          transition:
            background 350ms ease-in-out,
            border-color 350ms ease-in-out,
            box-shadow 350ms ease-in-out,
            transform 350ms ease-in-out;
        }

        .baseline-back-button {
          background: transparent;
          color: #4A5D4E;
          border: 1px solid rgba(74,93,78,0.16);
        }

        .baseline-back-button:hover {
          background: #F7F5F0;
        }

        .baseline-next-button {
          border: none;
          background: #4A5D4E;
          color: #FFFFFF;
          box-shadow: 0 7px 20px rgba(74,93,78,0.16);
        }

        .baseline-next-button:hover {
          background: #8A9A86;
          transform: translateY(-1px);
          box-shadow: 0 9px 24px rgba(74,93,78,0.18);
        }

        .baseline-support {
          display: flex;
          align-items: flex-start;
          gap: 15px;
          max-width: 680px;
          margin: 28px auto 0;
          padding: 20px 22px;
          border-radius: 18px;
          background: rgba(255,255,255,0.46);
          border: 1px solid rgba(255,255,255,0.55);
        }

        .support-icon {
          width: 36px;
          height: 36px;
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          background: #C87D65;
          color: #FFFFFF;
          font-size: 18px;
        }

        .baseline-support strong {
          display: block;
          margin-bottom: 5px;
          color: #4A5D4E;
          font-size: 14px;
        }

        .baseline-support p {
          margin: 0;
          font-size: 13px;
          line-height: 1.6;
          color: rgba(74,93,78,0.72);
        }

        @media (max-width: 700px) {

          .baseline-container {
            width: min(100% - 24px, 900px);
            padding: 40px 0;
          }

          .baseline-header {
            margin-bottom: 30px;
          }

          .baseline-header h1 {
            font-size: 31px;
          }

          .baseline-card {
            padding: 26px 20px;
            border-radius: 20px;
          }

          .baseline-card h2 {
            font-size: 19px;
          }

          .baseline-option {
            min-height: 58px;
            padding: 10px 12px;
          }

          .baseline-navigation {
            flex-direction: column-reverse;
            align-items: stretch;
          }

          .baseline-back-button,
          .baseline-next-button {
            width: 100%;
          }

          .baseline-support {
            padding: 17px;
          }
        }

      `}</style>
    </div>
  );
}

export default BaselinePage;