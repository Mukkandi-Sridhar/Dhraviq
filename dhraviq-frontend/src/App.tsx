import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from './contexts/AppContext';
import { AuthProvider } from './contexts/AuthProvider';

import Layout from './components/Layout';
import RequireAuth from './components/RequireAuth';
import ChatWidget from './components/ChatWidget';

import Home from './pages/Home';
import Auth from './pages/Auth';
import Dashboard from './pages/Dashboard';
import Chat from './pages/Chat';
import Learn from './pages/Learn';
import Contact from './pages/Contact';
import Settings from './pages/Settings';
import Profile from './pages/Profile';

function App() {
  return (
    <AppProvider>
      <AuthProvider>
        <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/auth" element={<Auth />} />

              {/* ✅ Protected Routes */}
              <Route path="/dashboard" element={
                <RequireAuth><Dashboard /></RequireAuth>
              } />
              <Route path="/chat" element={
                <RequireAuth><Chat /></RequireAuth>
              } />
              <Route path="/chat/:sessionId" element={
                <RequireAuth><Chat /></RequireAuth>
              } />
              <Route path="/profile" element={
                <RequireAuth><Profile /></RequireAuth>
              } />
              <Route path="/settings" element={
                <RequireAuth><Settings /></RequireAuth>
              } />

              {/* ✅ Public Routes */}
              <Route path="/learn" element={<Learn />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </Layout>
          <ChatWidget />
        </Router>
      </AuthProvider>
    </AppProvider>
  );
}

export default App;
