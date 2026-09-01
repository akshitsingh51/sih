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

const QUICK_PROMPTS = [
  "I'm feeling overwhelmed and stressed today.",
  "Can you guide me through a calming breathing exercise?",
  "I'm having trouble sleeping because of racing thoughts.",
  "I feel like I have too much work and don't know where to start."
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
  const { addCheckIn } = useData();

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

    try {
      // 4. Build conversation history for memory
      const conversationHistory = messages.map(msg => ({
        role: msg.role || (msg.type === 'user' ? 'user' : 'assistant'),
        content: msg.content || msg.text || ''
      }));

      // 5. Send message to backend and await Gemini response
      const data = await sendChatMessage({
        message: messageContent,
        history: conversationHistory,
        sentiment,
        emotions
      });

      // 6. Display Gemini's actual response
      const assistantMessage = {
        id: Date.now() + 1,
        role: 'assistant',
        type: 'bot',
        content: data.reply,
        text: data.reply,
        timestamp: new Date().toISOString()
      };

      setMessages(prev => [...prev, assistantMessage]);

      // 7. Save check-in into context
      addCheckIn({
        type: 'chat',
        text: messageContent,
        sentiment,
        emotions
      });

    } catch (err) {
      console.error('Chat request failed:', err);
      const errorMessage = {
        id: Date.now() + 1,
        role: 'assistant',
        type: 'bot',
        content: "Sorry, I'm having trouble connecting right now. Please try again.",
        text: "Sorry, I'm having trouble connecting right now. Please try again.",
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

  return (
    <div className="chat-page">
      <Header />
      <CrisisPanel visible={showCrisis} onClose={() => setShowCrisis(false)} />

      <main className="chat-main-wrapper">
        {/* Main Chat Container */}
        <section className="chat-container">
          {/* Header Bar */}
          <div className="chat-header-bar">
            <div className="chat-title-group">
              <div className="chat-avatar-badge">🌿</div>
              <div>
                <h2>Supportive AI Companion</h2>
                <p>Empathetic, confidential listening & coping guidance</p>
              </div>
            </div>
          </div>

          {/* Quick topic suggestion chips */}
          <div className="chat-quick-prompts">
            {QUICK_PROMPTS.map((prompt, idx) => (
              <button
                key={idx}
                className="quick-chip"
                onClick={() => handleSend(prompt)}
                disabled={isAnalyzing}
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Messages Thread */}
          <div className="messages-container">
            {messages.map((message) => (
              <div key={message.id} className={`message-row ${message.type || (message.role === 'user' ? 'user' : 'bot')}`}>
                <div className="msg-avatar">
                  {(message.type === 'bot' || message.role === 'assistant') ? '🌿' : '👤'}
                </div>
                <div>
                  <div className="msg-bubble">
                    {message.content || message.text}
                  </div>
                  <div className="msg-meta">
                    <span>{new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                  </div>
                </div>
              </div>
            ))}

            {isAnalyzing && (
              <div className="message-row bot">
                <div className="msg-avatar">🌿</div>
                <div className="msg-bubble">
                  <div className="typing-indicator">
                    <span></span><span></span><span></span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="chat-input-wrapper">
            <div className="chat-input-row">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Share how you're feeling, or ask for a calming exercise..."
                rows={2}
                disabled={isAnalyzing}
              />
              <button
                onClick={() => handleSend()}
                className="chat-send-btn"
                disabled={isAnalyzing || !input.trim()}
              >
                <span>Send</span>
                <span>➤</span>
              </button>
            </div>
            <p className="chat-disclaimer-note">
              This AI companion provides emotional support and stress management, not clinical therapy or medical diagnosis.
            </p>
          </div>
        </section>

        {/* Sidebar with Real-Time Emotion Insights & Emergency Helplines */}
        <aside className="chat-sidebar-wrapper">
          <div className="sidebar-card">
            <h3>📊 Live Emotional Signals</h3>
            {analysisResult ? (
              <div className="insight-metric-list">
                <div className="insight-metric-item">
                  <span className="insight-label">Sentiment</span>
                  <span className={`insight-value sentiment-badge-${(analysisResult.sentiment?.label || 'neutral').toLowerCase()}`}>
                    {analysisResult.sentiment?.label || 'Neutral'}
                  </span>
                </div>
                <div className="insight-metric-item">
                  <span className="insight-label">Primary Emotion</span>
                  <span className="insight-value">
                    {analysisResult.emotions?.dominantEmotion ? analysisResult.emotions.dominantEmotion.toUpperCase() : 'Calm / Neutral'}
                  </span>
                </div>
              </div>
            ) : (
              <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                Send a message to see real-time emotional signal tracking.
              </p>
            )}
          </div>

          <div className="sidebar-card">
            <h3>🚨 24/7 Immediate Help</h3>
            <div className="helpline-quick-list">
              {helplines.slice(0, 3).map((h) => (
                <a
                  key={h.id}
                  href={`tel:${h.tollFree || h.number}`}
                  className="helpline-chip"
                >
                  <span>{h.name}</span>
                  <span>📞 {h.tollFree || h.number}</span>
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