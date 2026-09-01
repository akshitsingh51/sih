import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('mentalHealthUser');

    return savedUser
      ? JSON.parse(savedUser)
      : null;
  });

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem(
      'mentalHealthUser',
      JSON.stringify(userData)
    );
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('mentalHealthUser');
  };

  const updateProfile = (profileData) => {
    const updatedUser = {
      ...user,
      ...profileData
    };

    setUser(updatedUser);

    localStorage.setItem(
      'mentalHealthUser',
      JSON.stringify(updatedUser)
    );
  };

  const value = {
    user,
    login,
    logout,
    updateProfile,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used inside an AuthProvider');
  }

  return context;
}