import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import { AuthProvider } from './context/AuthContext';
import { DataProvider } from './context/DataContext';

import WelcomePage from './pages/WelcomePage';
import ConsentPage from './pages/ConsentPage';
import LoginPage from './pages/LoginPage';
import BaselinePage from './pages/BaselinePage';
import DashboardPage from './pages/DashboardPage';
import CheckInPage from './pages/CheckInPage';
import ChatPage from './pages/ChatPage';
import TrendsPage from './pages/TrendsPage';
import HelpPage from './pages/HelpPage';
import DemoPage from './pages/DemoPage';
import PrivacyPage from './pages/PrivacyPage';
import ResearchPage from './pages/ResearchPage';
import LimitationsPage from './pages/LimitationsPage';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <DataProvider>

          <Routes>

            {/* Landing Page */}
            <Route path="/" element={<WelcomePage />} />

            {/* Consent */}
            <Route path="/consent" element={<ConsentPage />} />

            {/* Login / Registration */}
            <Route path="/login" element={<LoginPage />} />

            {/* Baseline Assessment */}
            <Route path="/baseline" element={<BaselinePage />} />

            {/* Main Dashboard */}
            <Route path="/dashboard" element={<DashboardPage />} />

            {/* Daily Check-In */}
            <Route path="/check-in" element={<CheckInPage />} />

            {/* Chat */}
            <Route path="/chat" element={<ChatPage />} />

            {/* Trends */}
            <Route path="/trends" element={<TrendsPage />} />

            {/* Help & Emergency Support */}
            <Route path="/help" element={<HelpPage />} />

            {/* Demo */}
            <Route path="/demo" element={<DemoPage />} />

            {/* Privacy */}
            <Route path="/privacy" element={<PrivacyPage />} />

            {/* Research */}
            <Route path="/research" element={<ResearchPage />} />

            {/* Limitations */}
            <Route path="/limitations" element={<LimitationsPage />} />

            {/* Unknown URL → Welcome */}
            <Route
              path="*"
              element={<Navigate to="/" replace />}
            />

          </Routes>

        </DataProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;