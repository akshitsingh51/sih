import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isDemo, setIsDemo] = useState(false);

  // Check for stored session on mount
  useEffect(() => {
    const stored = localStorage.getItem('mhUser');
    if (stored) {
      try {
        setUser(JSON.parse(stored));
      } catch (e) {
        localStorage.removeItem('mhUser');
      }
    }
  }, []);

  const login = (userData) => {
    const newUser = {
      id: userData.id || `VCT-${Date.now().toString().slice(-6)}`,
      name: userData.name || 'User',
      role: userData.role || 'user',
      district: userData.district || 'Demo District',
      consentSigned: userData.consentSigned || false,
      consentVersion: userData.consentVersion || '1.0',
      baselineComplete: userData.baselineComplete || false,
      createdAt: userData.createdAt || new Date().toISOString()
    };
    setUser(newUser);
    localStorage.setItem('mhUser', JSON.stringify(newUser));
    return newUser;
  };

  const logout = () => {
    setUser(null);
    setIsDemo(false);
    localStorage.removeItem('mhUser');
  };

  const updateProfile = (updates) => {
    const updated = { ...user, ...updates };
    setUser(updated);
    localStorage.setItem('mhUser', JSON.stringify(updated));
  };

  const enterDemoMode = () => {
    const demoUser = {
      id: 'VCT-DEMO-001',
      name: 'Demo User',
      role: 'user',
      district: 'Demo District',
      consentSigned: true,
      consentVersion: '1.0',
      baselineComplete: true,
      isDemo: true
    };
    setUser(demoUser);
    setIsDemo(true);
    localStorage.setItem('mhUser', JSON.stringify(demoUser));
  };

  return (
    <AuthContext.Provider value={{ user, isDemo, login, logout, updateProfile, enterDemoMode }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}