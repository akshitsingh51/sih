const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });
const { GoogleGenAI } = require('@google/genai');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const apiKey = process.env.GEMINI_API_KEY || process.env.REACT_APP_GEMINI_API_KEY;

if (!apiKey) {
  console.warn('⚠️ WARNING: GEMINI_API_KEY is not set in your .env file!');
} else {
  console.log('✅ GEMINI_API_KEY loaded successfully from server environment.');
}

const ai = new GoogleGenAI({ apiKey });

// Candidate models in order of preference
const CANDIDATE_MODELS = [
  'gemini-3.6-flash',
  'gemini-3.5-flash-lite',
  'gemini-3.7-flash'
];

const SYSTEM_INSTRUCTION = `You are a supportive mental-health wellbeing assistant inside a mental-health monitoring application.

Be empathetic, calm, respectful and concise.

Your role is to:
- listen to the user
- help them reflect on their feelings
- provide general wellbeing information
- suggest healthy coping strategies
- encourage appropriate professional support when useful
- respond naturally to normal conversation

You are NOT a doctor, psychiatrist, psychologist, or therapist.

Do not diagnose mental-health conditions.
Do not prescribe medication.
Do not recommend changing medication.
Do not claim certainty about a user's medical or psychological condition.
Do not pretend to replace professional care.

Keep responses reasonably concise and conversational.
Ask a gentle follow-up question when appropriate.

If the user is having a normal conversation, respond naturally and do not turn every response into a mental-health lecture.

If the user indicates immediate danger or intent to harm themselves or someone else, prioritize immediate safety and encourage contacting emergency services, crisis resources, or a trusted person.`;

/**
 * POST /api/chat
 * Body: { message: string, history: Array<{ role: 'user'|'assistant', content: string }>, sentiment?: object, emotions?: object }
 * Returns: { reply: string }
 */
app.post('/api/chat', async (req, res) => {
  try {
    const { message, history = [], sentiment = null, emotions = null } = req.body;

    if (!message || typeof message !== 'string' || !message.trim()) {
      return res.status(400).json({ error: 'Message is required.' });
    }

    if (!apiKey) {
      console.error('Server error: GEMINI_API_KEY is missing on backend.');
      return res.status(500).json({
        error: "Sorry, I'm having trouble connecting right now. Please try again."
      });
    }

    // Format conversation history for Gemini SDK
    // Gemini SDK expects contents: [{ role: 'user' | 'model', parts: [{ text: '...' }] }]
    const contents = [];

    if (Array.isArray(history)) {
      // Keep recent 12 turns for conversation memory
      const recentHistory = history.slice(-12);
      for (const item of recentHistory) {
        if (!item || !item.content) continue;
        const role = item.role === 'assistant' || item.role === 'model' || item.role === 'bot' ? 'model' : 'user';
        contents.push({
          role,
          parts: [{ text: item.content }]
        });
      }
    }

    // Build user message with optional emotional signal context
    let userPromptText = message.trim();
    if (sentiment || emotions) {
      const contextSignals = [];
      if (sentiment?.label) contextSignals.push(`Detected sentiment: ${sentiment.label}`);
      if (emotions?.dominantEmotion) contextSignals.push(`Dominant emotion: ${emotions.dominantEmotion}`);
      if (contextSignals.length > 0) {
        userPromptText = `${userPromptText}\n\n[Context: ${contextSignals.join(', ')}]`;
      }
    }

    contents.push({
      role: 'user',
      parts: [{ text: userPromptText }]
    });

    let generatedText = null;
    let successfulModel = null;
    let lastError = null;

    // Try candidate models in order of priority
    for (const model of CANDIDATE_MODELS) {
      try {
        const response = await ai.models.generateContent({
          model: model,
          contents: contents,
          config: {
            systemInstruction: SYSTEM_INSTRUCTION,
            temperature: 0.7,
            topP: 0.95,
            maxOutputTokens: 1000
          }
        });

        if (response && response.text) {
          generatedText = response.text;
          successfulModel = model;
          break;
        }
      } catch (err) {
        console.error(`Gemini call error with model ${model}:`, err.message || err);
        lastError = err;
      }
    }

    if (generatedText) {
      return res.json({
        reply: generatedText,
        model: successfulModel
      });
    }

    console.error('All Gemini model attempts failed:', lastError?.message || lastError);
    return res.status(500).json({
      error: "Sorry, I'm having trouble connecting right now. Please try again."
    });

  } catch (error) {
    console.error('Unhandled server error in /api/chat:', error.message || error);
    return res.status(500).json({
      error: "Sorry, I'm having trouble connecting right now. Please try again."
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', geminiKeyConfigured: Boolean(apiKey) });
});

app.listen(PORT, () => {
  console.log(`🚀 Backend server running on http://localhost:${PORT}`);
});
