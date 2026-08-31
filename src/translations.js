/**
 * Translations for multilingual support
 * Currently supports: English, Hindi
 * Designed for easy addition of more languages
 */

const translations = {
    en: {
      // Navigation
      home: 'Home',
      wellbeing: 'My Well-being',
      checkin: 'Daily Check-in',
      support: 'AI Support',
      trends: 'My Trends',
      case: 'My Case',
      help: 'Get Help',
      research: 'Research & Evidence',
      privacy: 'Privacy & Consent',
      limitations: 'Limitations',
      demo: 'Demo Mode',
      
      // Common
      login: 'Login',
      logout: 'Logout',
      submit: 'Submit',
      cancel: 'Cancel',
      save: 'Save',
      back: 'Back',
      next: 'Next',
      skip: 'Skip',
      loading: 'Loading...',
      
      // Welcome
      welcomeTitle: 'AI-Powered Dynamic Mental Health Monitoring',
      welcomeSubtitle: 'Continuous support, early distress detection, and evidence-informed intervention for victims and witnesses.',
      startMonitoring: 'Start Monitoring',
      
      // Risk Levels
      lowRisk: 'Low Risk',
      moderateRisk: 'Moderate Risk',
      highRisk: 'High Risk',
      urgentRisk: 'Urgent Risk',
      
      // Emergency
      emergencyHelp: 'Emergency Help',
      needImmediateHelp: 'Need Immediate Help?',
      callEmergency: 'Call Emergency Services',
      
      // Check-in
      dailyCheckIn: 'Daily Check-in',
      howAreYou: 'How are you feeling today?',
      preferNotToAnswer: 'Prefer not to answer',
      
      // Distress Score
      yourDistressScore: 'Your Distress Score',
      riskLevel: 'Risk Level',
      whyThisScore: 'Why did the system generate this score?',
      contributingFactors: 'Contributing Factors',
      
      // Consent
      informedConsent: 'Informed Consent',
      iUnderstand: 'I understand',
      iConsent: 'I consent',
      
      // Voice
      voiceAnalysis: 'Voice Analysis',
      voiceDisclaimer: 'Voice analysis is experimental and may be inaccurate.',
      recordVoice: 'Record Voice',
      
      // Demo
      demoMode: 'Demo Mode',
      demoDisclaimer: 'DEMO DATA — All data shown is fictional and not based on real victims.'
    },
    hi: {
      // Navigation
      home: 'होम',
      wellbeing: 'मेरी भलाई',
      checkin: 'दैनिक जाँच',
      support: 'AI सहायता',
      trends: 'मेरे रुझान',
      case: 'मेरा मामला',
      help: 'सहायता प्राप्त करें',
      research: 'अनुसंधान और प्रमाण',
      privacy: 'गोपनीयता और सहमति',
      limitations: 'सीमाएँ',
      demo: 'डेमो मोड',
      
      // Common
      login: 'लॉग इन',
      logout: 'लॉग आउट',
      submit: 'जमा करें',
      cancel: 'रद्द करें',
      save: 'सहेजें',
      back: 'वापस',
      next: 'अगला',
      skip: 'छोड़ें',
      loading: 'लोड हो रहा है...',
      
      // Welcome
      welcomeTitle: 'AI-संचालित गतिशील मानसिक स्वास्थ्य निगरानी',
      welcomeSubtitle: 'पीड़ितों और गवाहों के लिए निरंतर सहायता, प्रारंभिक संकट पहचान, और प्रमाण-आधारित हस्तक्षेप।',
      startMonitoring: 'निगरानी शुरू करें',
      
      // Risk Levels
      lowRisk: 'कम जोखिम',
      moderateRisk: 'मध्यम जोखिम',
      highRisk: 'उच्च जोखिम',
      urgentRisk: 'अत्यावश्यक जोखिम',
      
      // Emergency
      emergencyHelp: 'आपातकालीन सहायता',
      needImmediateHelp: 'तत्काल सहायता चाहिए?',
      callEmergency: 'आपातकालीन सेवाएँ कॉल करें',
      
      // Check-in
      dailyCheckIn: 'दैनिक जाँच',
      howAreYou: 'आज आप कैसा महसूस कर रहे हैं?',
      preferNotToAnswer: 'उत्तर देने से इनकार',
      
      // Distress Score
      yourDistressScore: 'आपका संकट स्कोर',
      riskLevel: 'जोखिम स्तर',
      whyThisScore: 'सिस्टम ने यह स्कोर क्यों दिया?',
      contributingFactors: 'योगदान कारक',
      
      // Consent
      informedConsent: 'सूचित सहमति',
      iUnderstand: 'मैं समझता/समझती हूँ',
      iConsent: 'मैं सहमत हूँ',
      
      // Voice
      voiceAnalysis: 'आवाज विश्लेषण',
      voiceDisclaimer: 'आवाज विश्लेषण प्रायोगिक है और गलत हो सकता है।',
      recordVoice: 'आवाज रिकॉर्ड करें',
      
      // Demo
      demoMode: 'डेमो मोड',
      demoDisclaimer: 'डेमो डेटा — सभी डेटा काल्पनिक है और वास्तविक पीड़ितों पर आधारित नहीं है।'
    }
  };
  
  /**
   * Get translation for a key
   * @param {string} key - Translation key
   * @param {string} lang - Language code (en, hi)
   * @returns {string} Translated text
   */
  export function t(key, lang = 'en') {
    return translations[lang]?.[key] || translations.en[key] || key;
  }
  
  export default translations;