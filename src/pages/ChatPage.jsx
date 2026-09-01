import React, { useState, useRef, useEffect } from 'react';
import { useData } from '../context/DataContext';
import { analyzeSentiment, extractEmotionSignals } from '../services/sentimentService';
import { analyzeEmotions } from '../services/emotionService';
import CrisisPanel from '../components/CrisisPanel';
import helplines from '../data/helplines';

// Crisis keywords for detection
const crisisKeywords = [
  'suicide', 'kill myself', 'end my life', 'want to die', 'self harm',
  'harm myself', 'no reason to live', 'better off dead'
];

function ChatPage() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      text: "Hello. I'm here to provide emotional support. How are you feeling today?",
      timestamp: new Date().toISOString()
    }
  ]);
  const [input, setIsInput] = useState('');
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
  }, [messages]);

  const generateBotResponse = (userText, sentiment, emotions) => {
    const lowerText = userText.toLowerCase();
    
    // Check for crisis
    if (crisisKeywords.some(kw => lowerText.includes(kw))) {
      setShowCrisis(true);
      return "Your message suggests that you may need immediate support. You are not alone, and help is available. Please see the emergency resources that have appeared on your screen.";
    }

    // Generate response based on sentiment and emotions
    if (sentiment.label === 'Negative' || sentiment.score < -0.5) {
      if (emotions.dominantEmotion === 'anxiety' || emotions.dominantEmotion === 'fear') {
        return "It sounds like you're experiencing anxiety or worry. That's a very human response to difficult situations. Would you like to tell me more about what's causing these feelings?";
      }
      if (emotions.dominantEmotion === 'sadness') {
        return "I hear that you're feeling down. Your feelings are valid, and it's okay to feel this way. Would you like to talk about what's been difficult?";
      }
      if (emotions.dominantEmotion === 'hopelessness') {
        return "I'm concerned about what you've shared. These feelings can be overwhelming, but support is available. Would you like to know about some resources that might help?";
      }
      return "Thank you for sharing how you're feeling. It sounds like things are difficult right now. Would you like to tell me more, or would you prefer information about support services?";
    }

    if (sentiment.label === 'Positive' || sentiment.score > 0.5) {
      return "I'm glad to hear you're feeling better. It's important to acknowledge these positive moments. Is there anything specific that's helping you feel this way?";
    }

    // Neutral response
    if (lowerText.includes('court') || lowerText.includes('trial') || lowerText.includes('legal')) {
      return "It sounds like legal proceedings are on your mind. It's completely normal to feel anxious about court or trial. Would you like to talk about what feels most difficult about this?";
    }

    if (lowerText.includes('help') || lowerText.includes('support') || lowerText.includes('resource')) {
      return "I can help you find support resources. There are several options available including counseling, legal aid, and emergency services. What type of support are you looking for?";
    }

    return "Thank you for sharing. I'm here to listen and support you. Would you like to continue talking, or would you prefer information about available resources?";
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      text: input,
      timestamp: new Date().toISOString()
    };

    setMessages(prev => [...prev, userMessage]);
    setIsInput('');
    setIsAnalyzing(true);

    // Analyze sentiment and emotions
    const sentiment = analyzeSentiment(input);
    const emotions = analyzeEmotions(input);

    // Store analysis result
    setAnalysisResult({
      sentiment,
      emotions,
      timestamp: new Date().toISOString()
    });

    // Generate bot response
    const botResponse = generateBotResponse(input, sentiment, emotions);

    setTimeout(() => {
      const botMessage = {
        id: Date.now() + 1,
        type: 'bot',
        text: botResponse,
        timestamp: new Date().toISOString()
      };
      setMessages(prev => [...prev, botMessage]);
      setIsAnalyzing(false);

      // Save as check-in data
      addCheckIn({
        type: 'chat',
        text: input,
        sentiment,
        emotions
      });
    }, 1000);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="chat-page">
      <CrisisPanel visible={showCrisis} onClose={() => setShowCrisis(false)} />
      
      <div className="chat-container">
        <div className="chat-header">
          <h1>AI Support</h1>
          <p>Supportive conversation and emotional check-in</p>
          <div className="chat-disclaimer">
            This AI provides supportive conversation, not therapy or diagnosis.
          </div>
        </div>

        <div className="messages-container">
          {messages.map(message => (
            <div key={message.id} className={`message ${message.type}`}>
              <div className="message-avatar">
                {message.type === 'bot' ? '🤖' : '👤'}
              </div>
              <div className="message-content">
                <div className="message-text">{message.text}</div>
                <div className="message-time">
                  {new Date(message.timestamp).toLocaleTimeString()}
                </div>
              </div>
            </div>
          ))}
          {isAnalyzing && (
            <div className="message bot">
              <div className="message-avatar">🤖</div>
              <div className="message-content">
                <div className="typing-indicator">
                  <span></span><span></span><span></span>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {analysisResult && (
          <div className="analysis-sidebar">
            <h4>Analysis Results</h4>
            <div className="analysis-item">
              <span className="analysis-label">Sentiment:</span>
              <span className={`analysis-value sentiment-${analysisResult.sentiment.label.toLowerCase()}`}>
                {analysisResult.sentiment.label}
              </span>
            </div>
            <div className="analysis-item">
              <span className="analysis-label">Dominant Signal:</span>
              <span className="analysis-value">
                {analysisResult.emotions.dominantEmotion}
              </span>
            </div>
            <p className="analysis-disclaimer">
              These are estimates, not clinical assessments.
            </p>
          </div>
        )}

        <div className="chat-input-container">
          <textarea
            value={input}
            onChange={(e) => setIsInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message..."
            rows={3}
            disabled={isAnalyzing}
          />
          <button 
            onClick={handleSend} 
            className="btn-primary"
            disabled={isAnalyzing || !input.trim()}
          >
            Send
          </button>
        </div>

        <div className="chat-help-links">
          <p>Need immediate help?</p>
          <div className="help-links">
            {helplines.slice(0, 3).map(h => (
              <a key={h.id} href={`tel:${h.tollFree || h.number}`} className="help-link">
                📞 {h.name}: {h.tollFree || h.number}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatPage;