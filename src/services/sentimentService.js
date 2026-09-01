/**
 * Sentiment Analysis Service
 * PROTOTYPE/MOCK - Uses simple lexicon-based approach
 * 
 * Limitations:
 * - Cannot understand context, sarcasm, or nuance
 * - May misinterpret domain-specific language
 * - Should not be treated as clinical assessment
 */

// Simple sentiment lexicon (AFINN-inspired subset)
const sentimentLexicon = {
    // Negative words
    'sad': -2, 'depressed': -3, 'anxious': -2, 'worried': -2, 'fearful': -3,
    'scared': -3, 'terrified': -4, 'hopeless': -4, 'helpless': -3, 'alone': -2,
    'lonely': -2, 'pain': -3, 'suffering': -3, 'hurt': -3, 'angry': -2,
    'frustrated': -2, 'confused': -1, 'lost': -2, 'broken': -3, 'crying': -2,
    'tears': -2, 'nightmare': -3, 'insomnia': -2, 'trouble': -1, 'difficult': -1,
    'hard': -1, 'struggling': -2, 'overwhelmed': -3, 'exhausted': -2, 'tired': -1,
    'unsafe': -3, 'threatened': -3, 'intimidated': -3, 'violated': -4,
    // Positive words
    'good': 2, 'better': 2, 'hopeful': 2, 'safe': 2, 'supported': 2,
    'helpful': 2, 'caring': 2, 'positive': 2, 'calm': 2, 'peaceful': 2,
    'recovered': 2, 'healing': 2, 'improving': 2, 'strong': 2, 'resilient': 2,
    'grateful': 2, 'relief': 2, 'comfortable': 1, 'relaxed': 2, 'confident': 2,
    // Negation handling
    'not': 0, 'no': 0, 'never': 0, 'neither': 0, 'nobody': 0, 'nothing': 0
  };
  
  // Crisis keywords that need immediate attention
  const crisisKeywords = [
    'suicide', 'kill myself', 'end my life', 'want to die', 'self harm',
    'harm myself', 'no reason to live', 'better off dead', 'ending it',
    'immediate danger', 'being attacked', 'trapped', 'cant escape'
  ];
  
  /**
   * Analyze text sentiment
   * @param {string} text - User input text
   * @returns {Object} Sentiment analysis result
   */
  export function analyzeSentiment(text) {
    if (!text || typeof text !== 'string') {
      return { score: 0, label: 'Neutral', confidence: 0 };
    }
  
    const words = text.toLowerCase().split(/\s+/);
    let totalScore = 0;
    let wordCount = 0;
    let hasNegation = false;
  
    for (let i = 0; i < words.length; i++) {
      const word = words[i].replace(/[^a-z]/g, '');
      
      // Check for negation
      if (sentimentLexicon[word] === 0) {
        hasNegation = true;
        continue;
      }
  
      if (sentimentLexicon[word] !== undefined) {
        let score = sentimentLexicon[word];
        if (hasNegation) {
          score = -score; // Flip sentiment after negation
          hasNegation = false;
        }
        totalScore += score;
        wordCount++;
      }
    }
  
    // Normalize score
    const normalizedScore = wordCount > 0 ? totalScore / wordCount : 0;
    
    // Determine label
    let label, confidence;
    if (normalizedScore < -1.5) {
      label = 'Negative';
      confidence = Math.min(0.9, 0.5 + Math.abs(normalizedScore) * 0.1);
    } else if (normalizedScore > 1.5) {
      label = 'Positive';
      confidence = Math.min(0.9, 0.5 + normalizedScore * 0.1);
    } else {
      label = 'Neutral';
      confidence = 0.5;
    }
  
    // Check for crisis indicators
    const isCrisis = crisisKeywords.some(keyword => 
      text.toLowerCase().includes(keyword)
    );
  
    return {
      score: normalizedScore,
      label,
      confidence: Math.round(confidence * 100) / 100,
      isCrisis,
      disclaimer: 'This is a simplified estimate. Sentiment analysis cannot determine clinical emotional states.'
    };
  }
  
  /**
   * Extract emotion signals from text
   * @param {string} text - User input text
   * @returns {Object} Detected emotion signals
   */
  export function extractEmotionSignals(text) {
    if (!text) return { emotions: [], disclaimer: 'No text provided' };
  
    const lowerText = text.toLowerCase();
    const emotions = [];
  
    // Simple keyword-based emotion detection
    const emotionPatterns = [
      { emotion: 'anxiety', keywords: ['worried', 'anxious', 'nervous', 'panic', 'afraid', 'scared', 'fear'] },
      { emotion: 'sadness', keywords: ['sad', 'depressed', 'crying', 'tears', 'hopeless', 'down'] },
      { emotion: 'anger', keywords: ['angry', 'furious', 'frustrated', 'rage', 'annoyed'] },
      { emotion: 'fear', keywords: ['terrified', 'scared', 'fearful', 'frightened', 'afraid'] },
      { emotion: 'hopelessness', keywords: ['hopeless', 'pointless', 'no way', 'give up', 'cant go on'] },
      { emotion: 'calm', keywords: ['calm', 'peaceful', 'relaxed', 'okay', 'fine'] },
      { emotion: 'relief', keywords: ['relief', 'better', 'improving', 'recovering'] }
    ];
  
    for (const pattern of emotionPatterns) {
      const matches = pattern.keywords.filter(kw => lowerText.includes(kw));
      if (matches.length > 0) {
        emotions.push({
          emotion: pattern.emotion,
          confidence: Math.min(0.9, 0.4 + matches.length * 0.15),
          evidence: matches
        });
      }
    }
  
    return {
      emotions,
      disclaimer: 'Emotion detection from text is an estimate, not a clinical assessment of emotional state.'
    };
  }