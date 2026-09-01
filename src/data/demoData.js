/**
 * Demo Data for Project Demonstration
 * All data is fictional and not based on real victims
 */

export const demoDisclaimer = '⚠️ DEMO DATA — All data shown is fictional and not based on real victims. This is for demonstration purposes only.';

export const demoCases = [
  {
    caseId: 'VCT-DEMO-001',
    name: 'Case Alpha',
    district: 'Demo District',
    age: 34,
    gender: 'Female',
    caseType: 'Witness Support',
    registrationDate: '2024-01-15',
    currentLegalStage: 'Trial',
    riskLevel: 'MODERATE',
    latestDistressScore: 52,
    trend: 'Stable',
    lastCheckIn: '2024-10-20',
    assignedCounselor: 'Dr. Sharma',
    interventionStatus: 'Counseling in progress'
  },
  {
    caseId: 'VCT-DEMO-002',
    name: 'Case Beta',
    district: 'Demo District',
    age: 28,
    gender: 'Male',
    caseType: 'Victim',
    registrationDate: '2024-02-20',
    currentLegalStage: 'Investigation',
    riskLevel: 'HIGH',
    latestDistressScore: 71,
    trend: 'Increasing',
    lastCheckIn: '2024-10-21',
    assignedCounselor: 'Dr. Patel',
    interventionStatus: 'Priority review needed'
  },
  {
    caseId: 'VCT-DEMO-003',
    name: 'Case Gamma',
    district: 'Demo District',
    age: 45,
    gender: 'Female',
    caseType: 'Family Member',
    registrationDate: '2024-03-10',
    currentLegalStage: 'Rehabilitation',
    riskLevel: 'URGENT',
    latestDistressScore: 84,
    trend: 'Increasing rapidly',
    lastCheckIn: '2024-10-22',
    assignedCounselor: 'Pending',
    interventionStatus: 'Immediate review required'
  },
  {
    caseId: 'VCT-DEMO-004',
    name: 'Case Delta',
    district: 'Demo District',
    age: 52,
    gender: 'Male',
    caseType: 'Witness',
    registrationDate: '2024-04-05',
    currentLegalStage: 'Trial',
    riskLevel: 'LOW',
    latestDistressScore: 28,
    trend: 'Improving',
    lastCheckIn: '2024-10-19',
    assignedCounselor: 'Dr. Kumar',
    interventionStatus: 'Regular monitoring'
  },
  {
    caseId: 'VCT-DEMO-005',
    name: 'Case Epsilon',
    district: 'Demo District',
    age: 31,
    gender: 'Female',
    caseType: 'Victim',
    registrationDate: '2024-05-12',
    currentLegalStage: 'Compensation',
    riskLevel: 'MODERATE',
    latestDistressScore: 48,
    trend: 'Stable',
    lastCheckIn: '2024-10-18',
    assignedCounselor: 'Dr. Reddy',
    interventionStatus: 'Follow-up scheduled'
  }
];

// Simulated longitudinal data for trend demonstration
export const demoTrendData = [
  { date: '2024-09-01', distressScore: 35, mood: 3, anxiety: 4, sleep: 3, safety: 4, support: 4 },
  { date: '2024-09-08', distressScore: 38, mood: 3, anxiety: 5, sleep: 3, safety: 3, support: 4 },
  { date: '2024-09-15', distressScore: 42, mood: 2, anxiety: 5, sleep: 2, safety: 3, support: 3 },
  { date: '2024-09-22', distressScore: 47, mood: 2, anxiety: 6, sleep: 2, safety: 3, support: 3 },
  { date: '2024-09-29', distressScore: 51, mood: 2, anxiety: 6, sleep: 2, safety: 2, support: 3 },
  { date: '2024-10-06', distressScore: 56, mood: 2, anxiety: 7, sleep: 2, safety: 2, support: 2 },
  { date: '2024-10-13', distressScore: 62, mood: 1, anxiety: 7, sleep: 1, safety: 2, support: 2 },
  { date: '2024-10-20', distressScore: 68, mood: 1, anxiety: 8, sleep: 1, safety: 1, support: 2 }
];

// Demo chatbot responses
export const demoChatResponses = {
  greeting: "Hello. I'm here to provide support. How are you feeling today?",
  anxious: "It sounds like you're experiencing anxiety. That's a common response when facing difficult situations. Would you like to tell me more about what's causing these feelings?",
  sad: "I hear that you're feeling down. Your feelings are valid, and it's okay to feel this way. Would you like to talk about what's been difficult?",
  safe: "I'm glad to hear you're feeling safe right now. Maintaining connections with supportive people can help. Is there anything else on your mind?",
  crisis: "Your message suggests you may need immediate support. Please reach out to the helpline numbers provided. You're not alone, and help is available."
};

// District data for dashboards
export const demoDistrictData = {
  totalCases: 156,
  highRiskCases: 23,
  urgentCases: 5,
  averageDistress: 42,
  interventionsThisMonth: 34,
  resolvedCases: 12,
  casesByLevel: {
    LOW: 78,
    MODERATE: 50,
    HIGH: 23,
    URGENT: 5
  },
  weeklyTrend: [
    { week: 'Week 1', avgDistress: 38 },
    { week: 'Week 2', avgDistress: 41 },
    { week: 'Week 3', avgDistress: 44 },
    { week: 'Week 4', avgDistress: 42 }
  ]
};