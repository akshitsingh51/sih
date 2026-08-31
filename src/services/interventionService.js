/**
 * Intervention Recommendation Service
 * Provides suggestions based on risk level and identified factors
 */

const interventionDatabase = {
    LOW: {
      selfCare: [
        'Maintain regular sleep schedule',
        'Light physical activity',
        'Connect with supportive people',
        'Practice relaxation techniques'
      ],
      resources: [
        'Self-help materials',
        'Community support groups',
        'Wellness apps and tools'
      ],
      monitoring: [
        'Continue regular check-ins',
        'Track mood patterns'
      ]
    },
    MODERATE: {
      counseling: [
        'Schedule counseling session',
        'Phone-based support',
        'Peer support programs'
      ],
      support: [
        'Social support enhancement',
        'Family involvement if appropriate',
        'Community resource connection'
      ],
      monitoring: [
        'Increase check-in frequency',
        'Monitor specific symptoms'
      ]
    },
    HIGH: {
      professional: [
        'Priority mental health professional referral',
        'Comprehensive psychological assessment',
        'Trauma-focused intervention consideration'
      ],
      protection: [
        'Safety assessment',
        'Protection services review',
        'Witness protection consideration'
      ],
      legal: [
        'Legal aid consultation',
        'Court preparation support',
        'Advocacy services'
      ],
      rehabilitation: [
        'Rehabilitation services assessment',
        'Financial assistance review',
        'Relocation support if needed'
      ]
    },
    URGENT: {
      immediate: [
        'Immediate human review',
        'Emergency contact attempt',
        'Crisis intervention'
      ],
      emergency: [
        'Emergency mental health services',
        'Emergency protection services',
        'Police assistance if safety concern'
      ],
      escalation: [
        'Authority notification',
        'Priority case review',
        'Multi-agency coordination'
      ]
    }
  };
  
  /**
   * Get intervention recommendations based on risk level and factors
   * @param {string} riskLevel - LOW, MODERATE, HIGH, or URGENT
   * @param {Array} factors - Contributing risk factors
   * @returns {Object} Intervention recommendations
   */
  export function getRecommendations(riskLevel, factors = []) {
    const recommendations = interventionDatabase[riskLevel] || interventionDatabase.MODERATE;
    
    // Add factor-specific recommendations
    const specificRecommendations = [];
    
    const factorText = factors.join(' ').toLowerCase();
    
    if (factorText.includes('sleep')) {
      specificRecommendations.push('Sleep hygiene assessment and support');
    }
    if (factorText.includes('safety')) {
      specificRecommendations.push('Safety planning and protection services');
    }
    if (factorText.includes('support')) {
      specificRecommendations.push('Social support enhancement programs');
    }
    if (factorText.includes('anxiety') || factorText.includes('fear')) {
      specificRecommendations.push('Anxiety management techniques');
    }
  
    return {
      riskLevel,
      categories: recommendations,
      specificRecommendations,
      disclaimer: 'These are suggestions for possible support. Actual interventions should be determined by qualified professionals.'
    };
  }