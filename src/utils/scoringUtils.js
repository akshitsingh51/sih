/**
 * Scoring Utilities
 * Helper functions for assessment scoring
 */

/**
 * Calculate total score from responses
 * @param {Object} responses - Question ID to score mapping
 * @returns {number} Total score
 */
export function calculateTotalScore(responses) {
    return Object.values(responses).reduce((sum, score) => sum + (Number(score) || 0), 0);
  }
  
  /**
   * Calculate domain scores
   * @param {Object} responses - Responses object
   * @param {Array} questions - Questions array with domain info
   * @returns {Object} Domain scores
   */
  export function calculateDomainScores(responses, questions) {
    const domains = {};
    
    for (const question of questions) {
      const domain = question.domain;
      if (!domains[domain]) {
        domains[domain] = { total: 0, count: 0, maxPossible: 0 };
      }
      const score = responses[question.id];
      if (score !== undefined) {
        domains[domain].total += Number(score);
        domains[domain].count++;
      }
      domains[domain].maxPossible += question.scores ? Math.max(...question.scores) : 4;
    }
  
    // Calculate percentage for each domain
    for (const domain of Object.keys(domains)) {
      const d = domains[domain];
      d.percentage = d.maxPossible > 0 ? Math.round((d.total / d.maxPossible) * 100) : 0;
    }
  
    return domains;
  }
  
  /**
   * Get risk color based on level
   * @param {string} level - Risk level
   * @returns {string} CSS color class
   */
  export function getRiskColor(level) {
    const colors = {
      'LOW': '#22c55e',
      'MODERATE': '#f59e0b',
      'HIGH': '#f97316',
      'URGENT': '#ef4444'
    };
    return colors[level] || '#6b7280';
  }
  
  /**
   * Get risk background color
   * @param {string} level - Risk level
   * @returns {string} Background color
   */
  export function getRiskBgColor(level) {
    const colors = {
      'LOW': '#dcfce7',
      'MODERATE': '#fef3c7',
      'HIGH': '#ffedd5',
      'URGENT': '#fee2e2'
    };
    return colors[level] || '#f3f4f6';
  }