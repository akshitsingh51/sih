import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

const DataContext = createContext(null);

export function DataProvider({ children }) {
  const { user } = useAuth();
  const [baseline, setBaseline] = useState(null);
  const [checkIns, setCheckIns] = useState([]);
  const [currentDistress, setCurrentDistress] = useState(null);
  const [alerts, setAlerts] = useState([]);

  // Load data from localStorage on user change
  useEffect(() => {
    if (user) {
      const storedBaseline = localStorage.getItem(`mh_baseline_${user.id}`);
      const storedCheckIns = localStorage.getItem(`mh_checkins_${user.id}`);
      
      if (storedBaseline) setBaseline(JSON.parse(storedBaseline));
      if (storedCheckIns) setCheckIns(JSON.parse(storedCheckIns));
    } else {
      setBaseline(null);
      setCheckIns([]);
      setCurrentDistress(null);
    }
  }, [user?.id]);

  const saveBaseline = (data) => {
    setBaseline(data);
    if (user) {
      localStorage.setItem(`mh_baseline_${user.id}`, JSON.stringify(data));
    }
  };

  const addCheckIn = (checkInData) => {
    const newCheckIn = {
      ...checkInData,
      id: Date.now(),
      date: new Date().toISOString(),
      userId: user?.id
    };
    const updated = [...checkIns, newCheckIn];
    setCheckIns(updated);
    if (user) {
      localStorage.setItem(`mh_checkins_${user.id}`, JSON.stringify(updated));
    }
    return newCheckIn;
  };

  const updateDistress = (distressData) => {
    setCurrentDistress(distressData);
  };

  const addAlert = (alert) => {
    const newAlert = {
      ...alert,
      id: Date.now(),
      timestamp: new Date().toISOString(),
      status: 'New'
    };
    setAlerts(prev => [newAlert, ...prev]);
  };

  const updateAlertStatus = (alertId, status) => {
    setAlerts(prev => prev.map(a => 
      a.id === alertId ? { ...a, status } : a
    ));
  };

  return (
    <DataContext.Provider value={{
      baseline,
      checkIns,
      currentDistress,
      alerts,
      saveBaseline,
      addCheckIn,
      updateDistress,
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