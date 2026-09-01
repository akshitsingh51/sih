import React, { useState, useRef, useEffect } from 'react';
import Header from '../components/Header';
import { useData } from '../context/DataContext';
import { analyzeSentiment } from '../services/sentimentService';
import { analyzeEmotions } from '../services/emotionService';
import { sendChatMessage } from '../services/chatService';
import CrisisPanel from '../components/CrisisPanel';
import helplines from '../data/helplines';
import './ChatPage.css';

// Crisis keywords for instantaneous safety intervention
const crisisKeywords = [
  'suicide', 'kill myself', 'end my life', 'want to die', 'self harm',
  'harm myself', 'no reason to live', 'better off dead', 'ending it',
  'hurt myself', 'hang myself', 'take my life', 'cut myself'
];

const STARTER_PROMPTS = [
  "Help me understand how I'm feeling today.",
  "I'm feeling stressed and overwhelmed.",
  "Give me a 3-minute calming breathing exercise.",
  "Help me reflect on what went well today."
];

function ChatPage() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      role: 'assistant',
      type: 'bot',
      content: "Hello. I'm your supportive AI companion. I'm here to listen, help you reflect, and explore healthy coping strategies. How are you feeling today?",
      text: "Hello. I'm your supportive AI companion. I'm here to listen, help you reflect, and explore healthy coping strategies. How are you feeling today?",
      timestamp: new Date().toISOString()
    }
  ]);
  const [input, setInput] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showCrisis, setShowCrisis] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);

  const messagesEndRef = useRef(null);
  const { addChatInsight, getSummaryStats } = useData();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isAnalyzing]);

  const handleSend = async (textToSend) => {
    const messageContent = (textToSend || input).trim();
    if (!messageContent || isAnalyzing) return;

    const userMessage = {
      id: Date.now(),
      role: 'user',
      type: 'user',
      content: messageContent,
      text: messageContent,
      timestamp: new Date().toISOString()
    };

    // 1. Append user message immediately & clear input
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsAnalyzing(true);

    const lowerText = messageContent.toLowerCase();

    // 2. Authoritative Crisis Keyword Check
    const hasCrisisKeyword = crisisKeywords.some(kw => lowerText.includes(kw));
    if (hasCrisisKeyword) {
      setShowCrisis(true);
      setTimeout(() => {
        const crisisAlertBotMessage = {
          id: Date.now() + 1,
          role: 'assistant',
          type: 'bot',
          content: "Your message suggests that you may be in intense distress or experiencing thoughts of harm. You are not alone, and immediate support is available. Please connect with the emergency resources and 24/7 helplines displayed on your screen right now.",
          text: "Your message suggests that you may be in intense distress or experiencing thoughts of harm. You are not alone, and immediate support is available. Please connect with the emergency resources and 24/7 helplines displayed on your screen right now.",
          timestamp: new Date().toISOString()
        };
        setMessages(prev => [...prev, crisisAlertBotMessage]);
        setIsAnalyzing(false);
      }, 400);
      return;
    }

    // 3. Sentiment & emotion analysis for insights & context
    const sentiment = analyzeSentiment(messageContent);
    const emotions = analyzeEmotions(messageContent);

    setAnalysisResult({
      sentiment,
      emotions,
      timestamp: new Date().toISOString()
    });

    // Record conversational insight into central DataContext
    if (addChatInsight) {
      addChatInsight({
        sentiment,
        emotions,
        text: messageContent
      });
    }

    try {
      // 4. Build conversation history for memory
      const conversationHistory = messages.map(msg => ({
        role: msg.role || (msg.type === 'user' ? 'user' : 'assistant'),
        content: msg.content || msg.text || ''
      }));

      // 5. Retrieve current wellbeing context from central state
      const summary = getSummaryStats ? getSummaryStats() : null;
      const context = summary ? {
        latestMood: summary.mood ? `${summary.mood}/5` : null,
        latestStress: summary.anxiety ? `${summary.anxiety}/10` : null,
        dominantEmotion: summary.dominantEmotion,
        recentNote: summary.recentNote,
        distressLevel: summary.riskLevel
      } : null;

      // 6. Send message to backend and await Gemini response
      const data = await sendChatMessage({
        message: messageContent,
        history: conversationHistory,
        context,
        sentiment,
        emotions
      });

      // 7. Display Gemini's actual response
      const assistantMessage = {
        id: Date.now() + 1,
        role: 'assistant',
        type: 'bot',
        content: data.reply,
        text: data.reply,
        timestamp: new Date().toISOString()
      };

      setMessages(prev => [...prev, assistantMessage]);

    } catch (err) {
      console.error('Chat request failed:', err);
      const errorMessage = {
        id: Date.now() + 1,
        role: 'assistant',
        type: 'bot',
        content: "Sorry, I'm having trouble connecting right now. Please try again in a moment.",
        text: "Sorry, I'm having trouble connecting right now. Please try again in a moment.",
        timestamp: new Date().toISOString()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const hasOnlyGreeting = messages.length === 1 && messages[0].role === 'assistant';

  return (
    <div className="chat-page">
      <Header />
      <CrisisPanel visible={showCrisis} onClose={() => setShowCrisis(false)} />

      <main className="chat-layout-wrapper">
        {/* Main Conversation Card */}
        <section className="chat-main-card">
          {/* Header Bar */}
          <div className="chat-card-header">
            <div className="chat-header-identity">
              <div className="chat-ai-icon">✦</div>
              <div>
                <h2>Your Wellbeing Assistant</h2>
                <p>A private, judgment-free space to reflect and unwind</p>
              </div>
            </div>
            <div className="chat-presence-badge">
              <span className="presence-dot" />
              <span>Active</span>
            </div>
          </div>

          {/* Messages Feed */}
          <div className="chat-feed-container">
            {hasOnlyGreeting && (
              /* Welcoming Empty State with Starters */
              <div className="chat-welcome-state">
                <div className="welcome-symbol">🌿</div>
                <h3>A space to talk & reflect</h3>
                <p>
                  Share what's on your mind. You can ask for a calming exercise,
                  talk through stressful feelings, or reflect on your day.
                </p>
                <div className="starter-prompts-grid">
                  {STARTER_PROMPTS.map((prompt, idx) => (
                    <button
                      key={idx}
                      className="starter-prompt-pill"
                      onClick={() => handleSend(prompt)}
                      disabled={isAnalyzing}
                    >
                      <span className="pill-star">✦</span> {prompt}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {messages.map((message) => {
              const isUser = message.type === 'user' || message.role === 'user';
              return (
                <div key={message.id} className={`chat-message-row ${isUser ? 'user-row' : 'ai-row'}`}>
                  <div className="msg-avatar-icon">
                    {isUser ? '👤' : '✦'}
                  </div>
                  <div className="msg-body-wrapper">
                    <div className="msg-bubble-card">
                      {message.content || message.text}
                    </div>
                    <span className="msg-timestamp">
                      {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                </div>
              );
            })}

            {isAnalyzing && (
              <div className="chat-message-row ai-row">
                <div className="msg-avatar-icon">✦</div>
                <div className="msg-body-wrapper">
                  <div className="msg-bubble-card typing-bubble">
                    <div className="typing-dots">
                      <span /><span /><span />
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Bar */}
          <div className="chat-input-bar">
            <div className="chat-input-box">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Write something to reflect... (Press Enter to send, Shift+Enter for new line)"
                rows={1}
                disabled={isAnalyzing}
              />
              <button
                onClick={() => handleSend()}
                className="chat-submit-btn"
                disabled={isAnalyzing || !input.trim()}
                title="Send message"
                aria-label="Send message"
              >
                <span>➤</span>
              </button>
            </div>
            <p className="chat-safety-disclaimer">
              This AI companion provides supportive conversation and stress relief, not clinical therapy or medical diagnosis.
            </p>
          </div>
        </section>

        {/* Sidebar for Real-Time Emotional Signals & Emergency Help */}
        <aside className="chat-side-panel">
          <div className="wellness-card">
            <div className="wellness-card-header">
              <h3>Emotional Signals</h3>
              <span className="card-subnote">Real-time</span>
            </div>
            {analysisResult ? (
              <div className="emotion-signal-list">
                <div className="signal-item">
                  <span className="signal-label">Sentiment</span>
                  <span className={`tag tag-${(analysisResult.sentiment?.label || 'neutral').toLowerCase()}`}>
                    {analysisResult.sentiment?.label || 'Neutral'}
                  </span>
                </div>
                <div className="signal-item">
                  <span className="signal-label">Dominant Tone</span>
                  <span className="signal-value">
                    {analysisResult.emotions?.dominantEmotion ? analysisResult.emotions.dominantEmotion.toUpperCase() : 'Calm / Balanced'}
                  </span>
                </div>
              </div>
            ) : (
              <p className="empty-signals-text">
                Your conversational emotional signals will appear here as you chat.
              </p>
            )}
          </div>

          <div className="wellness-card support-card-subtle">
            <div className="wellness-card-header">
              <h3>24/7 Human Helplines</h3>
              <span className="card-subnote">Confidential</span>
            </div>
            <div className="helpline-compact-list">
              {helplines.slice(0, 3).map((h) => (
                <a
                  key={h.id}
                  href={`tel:${h.tollFree || h.number}`}
                  className="helpline-compact-chip"
                >
                  <span className="helpline-chip-name">{h.name}</span>
                  <span className="helpline-chip-num">📞 {h.tollFree || h.number}</span>
                </a>
              ))}
            </div>
          </div>
        </aside>
      </main>
    </div>
  );
}

export default ChatPage;