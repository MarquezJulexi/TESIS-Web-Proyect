import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage.js';
import AdminPage from './pages/AdminPage';
import Header from './components/Header';
function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/admin" element={<AdminPage />} />
    </Routes>
  );
}

export default App;
