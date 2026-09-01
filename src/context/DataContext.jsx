import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';
import { useAuth } from './AuthContext';
import { calculateDistressScore } from '../services/distressScoreService';
import { getRecommendations } from '../services/interventionService';

const DataContext = createContext(null);

const STORAGE_KEYS = {
  BASELINE: 'mh_baseline_data',
  CHECKINS: 'mh_checkins_data',
  CHAT_INSIGHTS: 'mh_chat_insights_data',
};

export function DataProvider({ children }) {
  const { user } = useAuth();
  const userId = user?.id || user?.email || 'default_user';

  const [baseline, setBaseline] = useState(() => {
    try {
      const stored = localStorage.getItem(`${STORAGE_KEYS.BASELINE}_${userId}`) || localStorage.getItem('baselineAnswers');
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  const [checkIns, setCheckIns] = useState(() => {
    try {
      const stored = localStorage.getItem(`${STORAGE_KEYS.CHECKINS}_${userId}`);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const [chatInsights, setChatInsights] = useState(() => {
    try {
      const stored = localStorage.getItem(`${STORAGE_KEYS.CHAT_INSIGHTS}_${userId}`);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const [alerts, setAlerts] = useState([]);

  // Reload user data whenever userId changes
  useEffect(() => {
    try {
      const storedBaseline = localStorage.getItem(`${STORAGE_KEYS.BASELINE}_${userId}`) || localStorage.getItem('baselineAnswers');
      const storedCheckIns = localStorage.getItem(`${STORAGE_KEYS.CHECKINS}_${userId}`);
      const storedInsights = localStorage.getItem(`${STORAGE_KEYS.CHAT_INSIGHTS}_${userId}`);

      if (storedBaseline) setBaseline(JSON.parse(storedBaseline));
      if (storedCheckIns) setCheckIns(JSON.parse(storedCheckIns));
      if (storedInsights) setChatInsights(JSON.parse(storedInsights));
    } catch (e) {
      console.warn('Failed to load user data from storage:', e);
    }
  }, [userId]);

  // Recalculate distress score dynamically whenever checkIns or baseline change
  const currentDistress = useMemo(() => {
    const latestCheckIn = checkIns.length > 0 ? checkIns[checkIns.length - 1] : null;
    const latestResponses = latestCheckIn?.responses || {};
    const baselineResponses = baseline?.responses || baseline || {};
    const textAnalysis = latestCheckIn?.textAnalysis || {};

    const historyForDistress = checkIns.map(c => ({
      date: c.date,
      distressScore: c.distressScore || 50
    }));

    return calculateDistressScore(
      latestResponses,
      baselineResponses,
      historyForDistress,
      textAnalysis
    );
  }, [checkIns, baseline]);

  // Calculate dynamic recommendations based on latest distress and factors
  const recommendations = useMemo(() => {
    const riskLevel = currentDistress?.riskLevel || 'LOW';
    const factors = currentDistress?.factors?.map(f => f.name) || [];
    return getRecommendations(riskLevel, factors);
  }, [currentDistress]);

  // Save baseline assessment
  const saveBaseline = useCallback((data) => {
    setBaseline(data);
    try {
      localStorage.setItem(`${STORAGE_KEYS.BASELINE}_${userId}`, JSON.stringify(data));
      localStorage.setItem('baselineAnswers', JSON.stringify(data));
      localStorage.setItem('baselineCompleted', 'true');
    } catch (e) {
      console.error('Failed to save baseline:', e);
    }
  }, [userId]);

  // Add daily check-in
  const addCheckIn = useCallback((checkInData) => {
    const newCheckIn = {
      ...checkInData,
      id: Date.now(),
      date: new Date().toISOString(),
      userId
    };

    setCheckIns(prev => {
      const updated = [...prev, newCheckIn];
      try {
        localStorage.setItem(`${STORAGE_KEYS.CHECKINS}_${userId}`, JSON.stringify(updated));
      } catch (e) {
        console.error('Failed to persist check-in:', e);
      }
      return updated;
    });

    return newCheckIn;
  }, [userId]);

  // Add conversational sentiment insight from chat without overriding formal check-ins
  const addChatInsight = useCallback((insight) => {
    const newInsight = {
      id: Date.now(),
      date: new Date().toISOString(),
      sentiment: insight.sentiment,
      emotions: insight.emotions,
      snippet: insight.text ? insight.text.slice(0, 80) : ''
    };

    setChatInsights(prev => {
      const updated = [...prev.slice(-49), newInsight];
      try {
        localStorage.setItem(`${STORAGE_KEYS.CHAT_INSIGHTS}_${userId}`, JSON.stringify(updated));
      } catch (e) {
        console.error('Failed to persist chat insight:', e);
      }
      return updated;
    });
  }, [userId]);

  // Helper: Get latest check-in
  const getLatestCheckIn = useCallback(() => {
    return checkIns.length > 0 ? checkIns[checkIns.length - 1] : null;
  }, [checkIns]);

  // Helper: Get formatted summary statistics for dashboard and chat context
  const getSummaryStats = useCallback(() => {
    const latest = checkIns.length > 0 ? checkIns[checkIns.length - 1] : null;
    const responses = latest?.responses || {};

    return {
      totalCheckIns: checkIns.length,
      hasData: checkIns.length > 0,
      lastCheckInDate: latest ? new Date(latest.date).toLocaleDateString([], { month: 'short', day: 'numeric' }) : null,
      lastCheckInTime: latest ? new Date(latest.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : null,
      mood: responses.daily_mood || responses.mood_1 || null,
      anxiety: responses.daily_anxiety || responses.anxiety_1 || null,
      sleep: responses.daily_sleep || responses.sleep_1 || null,
      safety: responses.daily_safety || responses.safety_1 || null,
      support: responses.daily_support || responses.support_1 || null,
      recentNote: latest?.additionalText || null,
      dominantEmotion: latest?.textAnalysis?.emotions?.[0]?.emotion || (chatInsights.length > 0 ? chatInsights[chatInsights.length - 1]?.emotions?.dominantEmotion : 'Calm'),
      distressScore: currentDistress?.score ?? 50,
      riskLevel: currentDistress?.riskLevel || 'LOW',
      explanation: currentDistress?.explanation || ''
    };
  }, [checkIns, chatInsights, currentDistress]);

  const addAlert = useCallback((alert) => {
    const newAlert = {
      ...alert,
      id: Date.now(),
      timestamp: new Date().toISOString(),
      status: 'New'
    };
    setAlerts(prev => [newAlert, ...prev]);
  }, []);

  const updateAlertStatus = useCallback((alertId, status) => {
    setAlerts(prev => prev.map(a => 
      a.id === alertId ? { ...a, status } : a
    ));
  }, []);

  return (
    <DataContext.Provider value={{
      baseline,
      checkIns,
      currentDistress,
      chatInsights,
      recommendations,
      alerts,
      saveBaseline,
      addCheckIn,
      addChatInsight,
      getLatestCheckIn,
      getSummaryStats,
      addAlert,
      updateAlertStatus
    }}>
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
}