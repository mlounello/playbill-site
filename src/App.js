// src/App.js

import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import ErrorBoundary from './components/ErrorBoundary';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import './App.css';

const LandingPage = lazy(() => import('./components/LandingPage'));
const ShowDetail = lazy(() => import('./components/ShowDetail'));
const AdminPanel = lazy(() => import('./components/AdminPanel'));
const Login = lazy(() => import('./components/Login'));

function App() {
  return (
    <Router>
      <ThemeProvider>
        <AuthProvider>
          <div className="App">
            <NavBar />
            <ErrorBoundary>
              <Suspense fallback={<div>Loading...</div>}>
                <Routes>
                  <Route path="/" element={<LandingPage />} />
                  <Route path="/shows/:id" element={<ShowDetail />} />
                  <Route
                    path="/admin"
                    element={
                      <ProtectedRoute>
                        <AdminPanel />
                      </ProtectedRoute>
                    }
                  />
                  <Route path="/login" element={<Login />} />
                </Routes>
              </Suspense>
            </ErrorBoundary>
          </div>
        </AuthProvider>
      </ThemeProvider>
    </Router>
  );
}

export default App;