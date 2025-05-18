import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Login from './pages/auth/login';

function App() {
  const isAuthenticated = localStorage.getItem('accessToken');

  return (
    <Router>
      <Routes>
        <Route path="/login" element={!isAuthenticated ? <Login /> : <Navigate to="/dashboard" replace />} />
        <Route
          path="/*"
          element={isAuthenticated ? <Layout /> : <Navigate to="/login" replace />}
        />
      </Routes>
    </Router>
  );
}

export default App;