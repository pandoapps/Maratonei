
import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Landing from './pages/Landing';
import Auth from './pages/Auth';
import Home from './pages/Home';
import VideoDetails from './pages/VideoDetails';
import Admin from './pages/Admin';
import { User } from './types';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('maratonei_user');
    return saved ? JSON.parse(saved) : null;
  });

  const login = (userData: User) => {
    setUser(userData);
    localStorage.setItem('maratonei_user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('maratonei_user');
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/auth" element={user ? <Navigate to="/home" /> : <Auth onLogin={login} />} />
        <Route path="/home" element={user ? <Home user={user} onLogout={logout} /> : <Navigate to="/auth" />} />
        <Route path="/video/:id" element={user ? <VideoDetails user={user} onLogout={logout} /> : <Navigate to="/auth" />} />
        <Route path="/admin" element={user?.role === 'admin' ? <Admin user={user} onLogout={logout} /> : <Navigate to="/home" />} />
      </Routes>
    </Router>
  );
};

export default App;
