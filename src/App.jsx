import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { DataProvider } from './context/DataContext';
import Header from './components/Header';

// Pages
import WelcomePage from './pages/WelcomePage';
import LoginPage from './pages/LoginPage';
import ConsentPage from './pages/ConsentPage';
import BaselinePage from './pages/BaseLinePage';
import DashboardPage from './pages/DashboardPage';
import CheckInPage from './pages/CheckInPage';
import ChatPage from './pages/ChatPage';
import TrendsPage from './pages/TrendsPage';
import HelpPage from './pages/HelpPage';
import ResearchPage from './pages/ResearchPage';
import PrivacyPage from './pages/PrivacyPage';
import LimitationsPage from './pages/LimitationsPage';
import DemoPage from './pages/DemoPage';

import './App.css';

// Protected Route wrapper
function ProtectedRoute({ children, requireConsent = false, requireBaseline = false }) {
  const { user } = useAuth();
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  if (requireConsent && !user.consentSigned) {
    return <Navigate to="/consent" replace />;
  }
  
  if (requireBaseline && !user.baselineComplete) {
    return <Navigate to="/baseline" replace />;
  }
  
  return children;
}

function AppRoutes() {
  return (
    <>
      <Header />
      <main className="main-content">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<WelcomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/help" element={<HelpPage />} />
          <Route path="/research" element={<ResearchPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/limitations" element={<LimitationsPage />} />
          <Route path="/demo" element={<DemoPage />} />
          
          {/* Protected Routes */}
          <Route path="/consent" element={
            <ProtectedRoute>
              <ConsentPage />
            </ProtectedRoute>
          } />
          
          <Route path="/baseline" element={
            <ProtectedRoute requireConsent>
              <BaselinePage />
            </ProtectedRoute>
          } />
          
          <Route path="/dashboard" element={
            <ProtectedRoute requireConsent requireBaseline>
              <DashboardPage />
            </ProtectedRoute>
          } />
          
          <Route path="/checkin" element={
            <ProtectedRoute requireConsent requireBaseline>
              <CheckInPage />
            </ProtectedRoute>
          } />
          
          <Route path="/chat" element={
            <ProtectedRoute requireConsent requireBaseline>
              <ChatPage />
            </ProtectedRoute>
          } />
          
          <Route path="/trends" element={
            <ProtectedRoute requireConsent requireBaseline>
              <TrendsPage />
            </ProtectedRoute>
          } />
        </Routes>
      </main>
    </>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <DataProvider>
          <div className="app">
            <AppRoutes />
          </div>
        </DataProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;