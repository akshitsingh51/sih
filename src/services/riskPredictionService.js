/**
 * Predictive Risk Model Service
 * PROTOTYPE/MOCK - Not a validated clinical model
 * 
 * Uses simple weighted scoring to estimate risk category.
 * Real implementation would use trained ML models.
 */

/**
 * Predict risk category based on current and historical data
 * @param {Object} distressData - Current distress score and factors
 * @param {Array} history - Historical data
 * @param {Object} profile - User profile
 * @returns {Object} Risk prediction with confidence
 */
export function predictRisk(distressData, history = [], profile = {}) {
    const features = extractFeatures(distressData, history, profile);
    const prediction = calculateRiskPrediction(features);
  
    return {
      riskCategory: prediction.category,
      confidence: prediction.confidence,
      probability: prediction.probability,
      factors: prediction.factors,
      recommendations: generateRecommendations(prediction.category, prediction.factors),
      disclaimer: 'This is a prototype estimate. It has not been validated clinically and should not replace professional judgment.'
    };
  }
  
  function extractFeatures(distressData, history, profile) {
    return {
      currentDistress: distressData?.score || 50,
      distressTrend: calculateTrend(history),
      baselineDistance: calculateBaselineDistance(distressData, profile),
      recentVolatility: calculateVolatility(history),
      engagementPattern: analyzeEngagementPattern(history),
      highRiskCount: countHighRiskResponses(history)
    };
  }
  
  function calculateTrend(history) {
    if (!history || history.length < 2) return 0;
    const scores = history.slice(-5).map(h => h.distressScore || 50);
    const recent = scores.slice(-2).reduce((a, b) => a + b, 0) / 2;
    const older = scores.slice(0, 2).reduce((a, b) => a + b, 0) / 2;
    return recent - older;
  }
  
  function calculateBaselineDistance(distressData, profile) {
    const baseline = profile.baselineScore || 30;
    return (distressData?.score || 50) - baseline;
  }
  
  function calculateVolatility(history) {
    if (!history || history.length < 3) return 0;
    const scores = history.slice(-5).map(h => h.distressScore || 50);
    const mean = scores.reduce((a, b) => a + b, 0) / scores.length;
    const variance = scores.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / scores.length;
    return Math.sqrt(variance);
  }
  
  function analyzeEngagementPattern(history) {
    if (!history || history.length === 0) return 'unknown';
    const recent = history.slice(-3);
    const gaps = [];
    for (let i = 1; i < recent.length; i++) {
      const gap = (new Date(recent[i].date) - new Date(recent[i-1].date)) / (1000 * 60 * 60 * 24);
      gaps.push(gap);
    }
    const avgGap = gaps.length > 0 ? gaps.reduce((a, b) => a + b, 0) / gaps.length : 7;
    if (avgGap > 10) return 'decreasing';
    if (avgGap < 3) return 'increasing';
    return 'stable';
  }
  
  function countHighRiskResponses(history) {
    return history.filter(h => (h.distressScore || 50) >= 65).length;
  }
  
  function calculateRiskPrediction(features) {
    let riskScore = 0;
    const factors = [];
  
    // Current distress contribution
    if (features.currentDistress >= 75) {
      riskScore += 30;
      factors.push('Very high current distress');
    } else if (features.currentDistress >= 50) {
      riskScore += 20;
      factors.push('Elevated current distress');
    } else if (features.currentDistress >= 25) {
      riskScore += 10;
      factors.push('Mild current distress');
    }
  
    // Trend contribution
    if (features.distressTrend > 15) {
      riskScore += 25;
      factors.push('Rapidly increasing distress trend');
    } else if (features.distressTrend > 5) {
      riskScore += 15;
      factors.push('Increasing distress trend');
    }
  
    // Baseline distance
    if (features.baselineDistance > 30) {
      riskScore += 20;
      factors.push('Significant increase from baseline');
    } else if (features.baselineDistance > 15) {
      riskScore += 10;
      factors.push('Moderate increase from baseline');
    }
  
    // Engagement
    if (features.engagementPattern === 'decreasing') {
      riskScore += 10;
      factors.push('Decreasing engagement');
    }
  
    // Repeated high risk
    if (features.highRiskCount >= 3) {
      riskScore += 15;
      factors.push('Multiple high-risk responses');
    }
  
    // Determine category
    let category, confidence;
    if (riskScore >= 70) {
      category = 'URGENT';
      confidence = 0.6 + Math.min(0.3, riskScore * 0.003);
    } else if (riskScore >= 45) {
      category = 'HIGH';
      confidence = 0.55 + Math.min(0.25, riskScore * 0.003);
    } else if (riskScore >= 20) {
      category = 'MODERATE';
      confidence = 0.5 + Math.min(0.2, riskScore * 0.002);
    } else {
      category = 'LOW';
      confidence = 0.6 + Math.min(0.2, (100 - riskScore) * 0.002);
    }
  
    return {
      category,
      confidence: Math.round(confidence * 100) / 100,
      probability: riskScore / 100,
      factors
    };
  }
  
  function generateRecommendations(category, factors) {
    const base = {
      LOW: [
        'Continue regular self-monitoring',
        'Maintain healthy routines',
        'Reach out to support network if needed'
      ],
      MODERATE: [
        'Schedule follow-up assessment',
        'Consider counseling support',
        'Monitor for changes in symptoms',
        'Review coping strategies'
      ],
      HIGH: [
        'Priority counseling referral recommended',
        'Mental health professional review',
        'Legal aid consultation if related to case',
        'Safety planning if needed',
        'Increased monitoring frequency'
      ],
      URGENT: [
        'Immediate human review required',
        'Emergency mental health support',
        'Crisis intervention services',
        'Safety assessment',
        'Protection services review'
      ]
    };
  
    return base[category] || base.MODERATE;
  }