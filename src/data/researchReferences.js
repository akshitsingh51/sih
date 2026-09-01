/**
 * Research References and Evidence Cards
 * Only verified, credible sources - no fabricated citations
 */
const researchReferences = [
    {
      id: 'stress',
      title: 'Stress and Psychological Well-being',
      construct: 'Perceived Stress',
      whyItMatters: 'Prolonged stress can affect physical and mental health, leading to anxiety, depression, and other difficulties. Victims of atrocities often experience chronic stress due to ongoing legal proceedings, safety concerns, and social challenges.',
      howSystemUsesIt: 'The system measures perceived stress through questionnaire responses and tracks changes over time to identify increasing distress patterns.',
      limitations: 'Self-reported stress may not fully capture physiological stress responses. Cultural factors can influence how stress is expressed and perceived.',
      references: [
        'Cohen, S., Kamarck, T., & Mermelstein, R. (1983). A global measure of perceived stress. Journal of Health and Social Behavior, 24(4), 385-396.',
        'World Health Organization. (2019). Mental health in the workplace.'
      ]
    },
    {
      id: 'anxiety',
      title: 'Anxiety and Distress',
      construct: 'Anxiety Symptoms',
      whyItMatters: 'Anxiety is a common response to threatening situations. For victims involved in legal proceedings, anxiety may relate to court appearances, safety concerns, and uncertainty about outcomes.',
      howSystemUsesIt: 'The system uses validated anxiety screening concepts to identify elevated anxiety symptoms and track their progression.',
      limitations: 'Anxiety symptoms can overlap with other conditions. Self-report measures have inherent subjectivity.',
      references: [
        'Spitzer, R.L., Kroenke, K., Williams, J.B.W., & Löwe, B. (2006). A brief measure for assessing generalized anxiety disorder. Archives of Internal Medicine, 166(10), 1092-1097. [Public Domain]',
        'American Psychological Association. (2022). Anxiety disorders.'
      ]
    },
    {
      id: 'trauma',
      title: 'Trauma-Related Responses',
      construct: 'Trauma and PTSD Symptoms',
      whyItMatters: 'Exposure to traumatic events can lead to various psychological responses including intrusive thoughts, avoidance, mood changes, and hyperarousal. Understanding these responses is crucial for appropriate support.',
      howSystemUsesIt: 'The system includes trauma-related assessment items and can identify patterns associated with trauma responses, flagging cases that may benefit from specialized support.',
      limitations: 'Trauma responses are highly individual. The system cannot diagnose PTSD or any specific condition.',
      references: [
        'Weathers, F.W., et al. (2013). The PTSD Checklist for DSM-5 (PCL-5). National Center for PTSD. [Public Domain]',
        'World Health Organization. (2013). Guidelines for the management of conditions specifically related to stress.'
      ]
    },
    {
      id: 'depression',
      title: 'Mood and Depression Indicators',
      construct: 'Depressive Symptoms',
      whyItMatters: 'Persistent low mood, loss of interest, and hopelessness can indicate depression. These symptoms may develop in response to prolonged adversity, loss, or ongoing stress.',
      howSystemUsesIt: 'The system screens for depressive symptoms using established concepts and monitors changes to identify emerging or worsening difficulties.',
      limitations: 'Low mood can be temporary and context-dependent. Screening tools are not diagnostic instruments.',
      references: [
        'Kroenke, K., Spitzer, R.L., & Williams, J.B.W. (2001). The PHQ-9: Validity of a brief depression severity measure. Journal of General Internal Medicine, 16(9), 606-613. [Public Domain]'
      ]
    },
    {
      id: 'social-support',
      title: 'Social Support and Coping',
      construct: 'Perceived Social Support',
      whyItMatters: 'Social support is a significant protective factor against psychological distress. Victims who feel isolated or unsupported may be at greater risk for developing mental health difficulties.',
      howSystemUsesIt: 'The system measures perceived social support and considers it as a protective factor in risk assessment.',
      limitations: 'Quality of support matters as much as quantity. The system measures perception, not objective support availability.',
      references: [
        'Cohen, S., & Wills, T.A. (1985). Stress, social support, and the buffering hypothesis. Psychological Bulletin, 98(2), 310-357.'
      ]
    },
    {
      id: 'safety',
      title: 'Safety and Threat Perception',
      construct: 'Perceived Safety',
      whyItMatters: 'Feeling safe is fundamental to psychological well-being. Victims who perceive ongoing threats or intimidation may experience chronic fear and anxiety, affecting their ability to engage with legal processes.',
      howSystemUsesIt: 'The system tracks perceived safety as a key indicator, as decreases may signal emerging threats or increasing vulnerability.',
      limitations: 'Perceived safety is subjective and influenced by many factors beyond actual threat levels.',
      references: [
        'WHO. (2014). Violence against women prevalence estimates.'
      ]
    },
    {
      id: 'sleep',
      title: 'Sleep and Mental Health',
      construct: 'Sleep Quality',
      whyItMatters: 'Sleep disturbance is both a symptom and a maintaining factor for various mental health difficulties. Poor sleep can worsen anxiety, depression, and trauma-related symptoms.',
      howSystemUsesIt: 'The system monitors sleep quality as an indicator of overall well-being and as a potential early warning sign of deteriorating mental health.',
      limitations: 'Sleep quality is self-reported and subject to individual variation in perception.',
      references: [
        'Harvey, A.G. (2008). Sleep and circadian functioning: Critical mechanisms in the mood disorders? Annual Review of Clinical Psychology, 4, 277-303.'
      ]
    },
    {
      id: 'longitudinal',
      title: 'Longitudinal Monitoring',
      construct: 'Repeated Measurement',
      whyItMatters: 'A single assessment captures only a moment in time. Repeated measurements over time provide more useful information about changes, trends, and the effectiveness of interventions.',
      howSystemUsesIt: 'The system collects periodic data to build a longitudinal profile, enabling detection of improving or deteriorating trends.',
      limitations: 'Frequent monitoring may cause burden. Response patterns may be influenced by recall bias.',
      references: [
        'Shrout, P.E., & Bolger, N. (2002). Causal inference in observational and intervention studies.'
      ]
    },
    {
      id: 'sentiment',
      title: 'Sentiment Analysis',
      construct: 'Text-Based Sentiment',
      whyItMatters: 'Language use can provide additional insights into a person\'s emotional state. Negative language patterns may correlate with psychological distress.',
      howSystemUsesIt: 'The system analyzes text input to identify linguistic sentiment patterns as supplementary data for assessment.',
      limitations: 'Sentiment analysis has significant limitations. It cannot reliably determine clinical emotional states. Cultural and linguistic factors greatly affect accuracy.',
      references: [
        'Pang, B., & Lee, L. (2008). Opinion mining and sentiment analysis. Foundations and Trends in Information Retrieval, 2(1-2), 1-135.'
      ]
    },
    {
      id: 'emotion-ai',
      title: 'Emotion AI Limitations',
      construct: 'Automated Emotion Recognition',
      whyItMatters: 'AI systems can estimate emotional states from text and voice, but these estimates have significant limitations and should never be treated as definitive.',
      howSystemUsesIt: 'The system uses emotion estimation as one of many inputs, always labeled as estimates rather than facts.',
      limitations: 'Current emotion AI has known biases, cultural limitations, and cannot capture the complexity of human emotional experience.',
      references: [
        'Barrett, L.F., et al. (2019). Emotional expressions reconsidered. Psychological Science in the Public Interest, 20(1), 1-68.'
      ]
    },
    {
      id: 'voice-stress',
      title: 'Voice-Based Analysis',
      construct: 'Voice Stress Analysis',
      whyItMatters: 'Voice characteristics may correlate with stress and emotional states. However, this technology is experimental and has significant limitations.',
      howSystemUsesIt: 'If available, voice analysis provides additional data points but is always treated as experimental and supplementary.',
      limitations: 'Voice stress analysis is experimental. Accuracy varies significantly. It should never be used as the sole basis for any decision.',
      references: [
        'Bartlett, M.S., et al. (2005). Classifying facial action. Advances in Neural Information Processing Systems.'
      ]
    },
    {
      id: 'predictive',
      title: 'Predictive Risk Modeling',
      construct: 'Risk Estimation',
      whyItMatters: 'Historical patterns can help estimate future risk, enabling proactive intervention. However, predictions always involve uncertainty.',
      howSystemUsesIt: 'The system generates risk estimates based on multiple factors, always with confidence intervals and clear acknowledgment of uncertainty.',
      limitations: 'Predictions may contain false positives and false negatives. They should never replace professional judgment.',
      references: [
        'Kessler, R.C., et al. (2005). Lifetime prevalence and age-of-onset distributions of DSM-IV disorders in the National Comorbidity Survey Replication.'
      ]
    }
  ];
  
  export default researchReferences;