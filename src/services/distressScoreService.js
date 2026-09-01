/**
 * Dynamic Distress Score Calculation
 * PROTOTYPE - Not clinically validated
 * 
 * Combines multiple factors to estimate distress level.
 * All thresholds are prototype values, NOT clinical cut-offs.
 */

/**
 * Calculate dynamic distress score from 0-100
 * @param {Object} currentData - Current check-in data
 * @param {Object} baselineData - Baseline assessment data
 * @param {Array} history - Historical check-in data
 * @param {Object} textAnalysis - Text sentiment/emotion analysis results
 * @returns {Object} Distress score with explanation
 */
export function calculateDistressScore(currentData, baselineData, history = [], textAnalysis = {}) {
    let totalScore = 0;
    const factors = [];
  
    // 1. Current questionnaire responses (40% weight)
    const questionnaireScore = calculateQuestionnaireScore(currentData);
    totalScore += questionnaireScore.score * 0.4;
    factors.push({
      name: 'Current Assessment Responses',
      contribution: questionnaireScore.score,
      weight: '40%',
      details: questionnaireScore.details
    });
  
    // 2. Change from baseline (20% weight)
    const baselineComparison = calculateBaselineComparison(currentData, baselineData);
    totalScore += baselineComparison.score * 0.2;
    factors.push({
      name: 'Comparison with Personal Baseline',
      contribution: baselineComparison.score,
      weight: '20%',
      details: baselineComparison.details
    });
  
    // 3. Recent trend (20% weight)
    const trendScore = calculateTrendScore(history);
    totalScore += trendScore.score * 0.2;
    factors.push({
      name: 'Recent Distress Trend',
      contribution: trendScore.score,
      weight: '20%',
      details: trendScore.details
    });
  
    // 4. Text sentiment (10% weight)
    const textScore = calculateTextScore(textAnalysis);
    totalScore += textScore.score * 0.1;
    factors.push({
      name: 'Text Sentiment Analysis',
      contribution: textScore.score,
      weight: '10%',
      details: textScore.details
    });
  
    // 5. Engagement patterns (10% weight)
    const engagementScore = calculateEngagementScore(history);
    totalScore += engagementScore.score * 0.1;
    factors.push({
      name: 'Engagement Patterns',
      contribution: engagementScore.score,
      weight: '10%',
      details: engagementScore.details
    });
  
    // Normalize to 0-100
    const finalScore = Math.round(Math.min(100, Math.max(0, totalScore)));
  
    // Determine risk level
    const riskLevel = getRiskLevel(finalScore);
  
    // Generate explanation
    const explanation = generateExplanation(factors, riskLevel);
  
    return {
      score: finalScore,
      riskLevel,
      factors,
      explanation,
      timestamp: new Date().toISOString(),
      disclaimer: 'This is a prototype estimate. All thresholds are demonstration values, NOT clinically validated cut-offs.'
    };
  }
  
  function calculateQuestionnaireScore(data) {
    if (!data || Object.keys(data).length === 0) {
      return { score: 50, details: 'No data available' };
    }
  
    // Map responses to 0-100 scale
    const values = Object.values(data).map(v => {
      if (typeof v === 'number') return Math.min(100, v * 10);
      if (typeof v === 'string') {
        const num = parseInt(v);
        return isNaN(num) ? 50 : Math.min(100, num * 10);
      }
      return 50;
    });
  
    const avg = values.reduce((a, b) => a + b, 0) / values.length;
    
    // Invert for distress (lower wellbeing = higher distress)
    const distressScore = 100 - avg;
  
    return {
      score: distressScore,
      details: `Average wellbeing: ${Math.round(avg)}/100`
    };
  }
  
  function calculateBaselineComparison(currentData, baselineData) {
    if (!baselineData) {
      return { score: 50, details: 'No baseline available for comparison' };
    }
  
    const currentAvg = calculateAverageScore(currentData);
    const baselineAvg = calculateAverageScore(baselineData);
  
    // Higher current score (more distress) compared to baseline = higher contribution
    const diff = currentAvg - baselineAvg;
    const normalizedDiff = Math.min(100, Math.max(0, 50 + diff * 5));
  
    return {
      score: normalizedDiff,
      details: `Current: ${Math.round(currentAvg)}, Baseline: ${Math.round(baselineAvg)}`
    };
  }
  
  function calculateTrendScore(history) {
    if (!history || history.length < 2) {
      return { score: 50, details: 'Insufficient history for trend analysis' };
    }
  
    const recentScores = history.slice(-5).map(h => h.distressScore || 50);
    const olderScores = history.slice(0, Math.max(1, history.length - 5)).map(h => h.distressScore || 50);
  
    const recentAvg = recentScores.reduce((a, b) => a + b, 0) / recentScores.length;
    const olderAvg = olderScores.reduce((a, b) => a + b, 0) / olderScores.length;
  
    const trend = recentAvg - olderAvg;
    
    return {
      score: Math.min(100, Math.max(0, recentAvg + trend)),
      details: trend > 5 ? 'Increasing trend' : trend < -5 ? 'Decreasing trend' : 'Stable'
    };
  }
  
  function calculateTextScore(textAnalysis) {
    if (!textAnalysis || !textAnalysis.sentiment) {
      return { score: 50, details: 'No text analysis available' };
    }
  
    const sentimentScore = textAnalysis.sentiment.score || 0;
    // Convert sentiment (-1 to 1) to distress (0-100)
    const distressFromText = 50 - (sentimentScore * 25);
  
    return {
      score: Math.min(100, Math.max(0, distressFromText)),
      details: `Sentiment: ${textAnalysis.sentiment.label}`
    };
  }
  
  function calculateEngagementScore(history) {
    if (!history || history.length === 0) {
      return { score: 50, details: 'No engagement history' };
    }
  
    // Check recency of last check-in
    const lastCheckIn = history[history.length - 1];
    const daysSinceLast = lastCheckIn ? 
      (Date.now() - new Date(lastCheckIn.date).getTime()) / (1000 * 60 * 60 * 24) : 7;
  
    // Missing check-ins or disengagement can be concerning
    let engagementDistress = 50;
    if (daysSinceLast > 7) engagementDistress = 65;
    if (daysSinceLast > 14) engagementDistress = 75;
  
    return {
      score: engagementDistress,
      details: `Days since last check-in: ${Math.round(daysSinceLast)}`
    };
  }
  
  function calculateAverageScore(data) {
    if (!data) return 50;
    const values = Object.values(data).filter(v => typeof v === 'number' || !isNaN(parseInt(v)));
    if (values.length === 0) return 50;
    const numericValues = values.map(v => typeof v === 'number' ? v : parseInt(v));
    return numericValues.reduce((a, b) => a + b, 0) / numericValues.length;
  }
  
  function getRiskLevel(score) {
    if (score < 25) return 'LOW';
    if (score < 50) return 'MODERATE';
    if (score < 75) return 'HIGH';
    return 'URGENT';
  }
  
  function generateExplanation(factors, riskLevel) {
    const topFactors = [...factors]
      .sort((a, b) => b.contribution - a.contribution)
      .slice(0, 4);
  
    let explanation = `The distress score is ${riskLevel}. `;
  
    if (riskLevel === 'LOW') {
      explanation += 'Current responses indicate relatively stable well-being. ';
    } else if (riskLevel === 'MODERATE') {
      explanation += 'Some indicators suggest elevated distress that may benefit from monitoring. ';
    } else if (riskLevel === 'HIGH') {
      explanation += 'Multiple factors indicate significant distress. Professional review is recommended. ';
    } else {
      explanation += 'Indicators suggest urgent need for professional support and review. ';
    }
  
    explanation += '\n\nPrimary contributing factors:\n';
    for (const factor of topFactors) {
      explanation += `• ${factor.name} (contributes ${Math.round(factor.contribution)} points)\n`;
    }
  
    return explanation;
  }