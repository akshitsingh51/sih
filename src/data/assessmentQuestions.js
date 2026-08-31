/**
 * Assessment Questions
 * Based on public domain instruments: PHQ-9, GAD-7, and custom constructs
 * PHQ-9 and GAD-7 are public domain (released by Pfizer, 2010)
 */

// Baseline assessment - comprehensive initial evaluation
export const baselineQuestions = [
    // Perceived Stress (based on Cohen's PSS concepts)
    {
      id: 'stress_1',
      domain: 'Perceived Stress',
      question: 'How often have you felt unable to control the important things in your life?',
      options: ['Never', 'Rarely', 'Sometimes', 'Often', 'Very Often'],
      scores: [0, 1, 2, 3, 4],
      source: 'Adapted from Cohen et al. (1983) Perceived Stress Scale concepts'
    },
    {
      id: 'stress_2',
      domain: 'Perceived Stress',
      question: 'How often have you felt nervous and stressed?',
      options: ['Never', 'Rarely', 'Sometimes', 'Often', 'Very Often'],
      scores: [0, 1, 2, 3, 4]
    },
    // Anxiety symptoms (GAD-7 inspired, public domain)
    {
      id: 'anxiety_1',
      domain: 'Anxiety',
      question: 'Over the last two weeks, how often have you felt nervous, anxious, or on edge?',
      options: ['Not at all', 'Several days', 'More than half the days', 'Nearly every day'],
      scores: [0, 1, 2, 3],
      source: 'Based on GAD-7 (Spitzer, Kroenke, Williams, Löwe) - Public Domain'
    },
    {
      id: 'anxiety_2',
      domain: 'Anxiety',
      question: 'Over the last two weeks, how often have you not been able to stop or control worrying?',
      options: ['Not at all', 'Several days', 'More than half the days', 'Nearly every day'],
      scores: [0, 1, 2, 3]
    },
    // Depressive symptoms (PHQ-9 inspired, public domain)
    {
      id: 'mood_1',
      domain: 'Mood',
      question: 'Over the last two weeks, how often have you had little interest or pleasure in doing things?',
      options: ['Not at all', 'Several days', 'More than half the days', 'Nearly every day'],
      scores: [0, 1, 2, 3],
      source: 'Based on PHQ-9 Item 1 (Spitzer, Kroenke, Williams) - Public Domain'
    },
    {
      id: 'mood_2',
      domain: 'Mood',
      question: 'Over the last two weeks, how often have you felt down, depressed, or hopeless?',
      options: ['Not at all', 'Several days', 'More than half the days', 'Nearly every day'],
      scores: [0, 1, 2, 3]
    },
    // Trauma-related distress
    {
      id: 'trauma_1',
      domain: 'Trauma',
      question: 'How much distress do you experience from unwanted memories or thoughts about what happened?',
      options: ['None', 'Mild', 'Moderate', 'Severe', 'Extreme'],
      scores: [0, 1, 2, 3, 4],
      source: 'Based on PTSD assessment concepts'
    },
    // Sleep disturbance
    {
      id: 'sleep_1',
      domain: 'Sleep',
      question: 'Over the last two weeks, how often have you had trouble falling or staying asleep?',
      options: ['Not at all', 'Several days', 'More than half the days', 'Nearly every day'],
      scores: [0, 1, 2, 3],
      source: 'Based on PHQ-9 Item 3'
    },
    // Social support
    {
      id: 'support_1',
      domain: 'Social Support',
      question: 'How much support do you feel you have from people around you?',
      options: ['None', 'Little', 'Moderate', 'Good', 'Very Good'],
      scores: [0, 1, 2, 3, 4]
    },
    // Perceived safety
    {
      id: 'safety_1',
      domain: 'Safety',
      question: 'How safe do you currently feel in your daily life?',
      options: ['Very Unsafe', 'Unsafe', 'Neutral', 'Safe', 'Very Safe'],
      scores: [0, 1, 2, 3, 4]
    },
    // Functioning
    {
      id: 'function_1',
      domain: 'Functioning',
      question: 'How well have you been able to carry out your daily activities?',
      options: ['Unable', 'Rarely able', 'Sometimes able', 'Mostly able', 'Fully able'],
      scores: [0, 1, 2, 3, 4],
      source: 'Based on WHODAS 2.0 concepts (WHO)'
    }
  ];
  
  // Daily check-in - 5 quick questions
  export const dailyCheckInQuestions = [
    {
      id: 'daily_mood',
      domain: 'Mood',
      question: 'How would you describe your mood today?',
      type: 'emoji',
      options: [
        { label: 'Very Low', emoji: '😞', score: 1 },
        { label: 'Low', emoji: '😔', score: 2 },
        { label: 'Neutral', emoji: '😐', score: 3 },
        { label: 'Good', emoji: '🙂', score: 4 },
        { label: 'Very Good', emoji: '😊', score: 5 }
      ]
    },
    {
      id: 'daily_anxiety',
      domain: 'Anxiety',
      question: 'How anxious or worried have you felt recently?',
      type: 'slider',
      min: 0,
      max: 10,
      labels: ['Not at all', 'Extremely']
    },
    {
      id: 'daily_safety',
      domain: 'Safety',
      question: 'How safe do you currently feel?',
      type: 'emoji',
      options: [
        { label: 'Very Unsafe', emoji: '😰', score: 1 },
        { label: 'Unsafe', emoji: '😟', score: 2 },
        { label: 'Neutral', emoji: '😐', score: 3 },
        { label: 'Safe', emoji: '🙂', score: 4 },
        { label: 'Very Safe', emoji: '😌', score: 5 }
      ]
    },
    {
      id: 'daily_sleep',
      domain: 'Sleep',
      question: 'How well have you been sleeping?',
      type: 'emoji',
      options: [
        { label: 'Very Poorly', emoji: '😫', score: 1 },
        { label: 'Poorly', emoji: '😔', score: 2 },
        { label: 'Okay', emoji: '😐', score: 3 },
        { label: 'Well', emoji: '😴', score: 4 },
        { label: 'Very Well', emoji: '😴', score: 5 }
      ]
    },
    {
      id: 'daily_support',
      domain: 'Social Support',
      question: 'How supported do you currently feel?',
      type: 'emoji',
      options: [
        { label: 'Not Supported', emoji: '😔', score: 1 },
        { label: 'Slightly', emoji: '😐', score: 2 },
        { label: 'Moderately', emoji: '🙂', score: 3 },
        { label: 'Well Supported', emoji: '😊', score: 4 },
        { label: 'Very Supported', emoji: '🤗', score: 5 }
      ]
    }
  ];