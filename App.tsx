
import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Landing from './pages/Landing';
import Auth from './pages/Auth';
import Home from './pages/Home';
import VideoDetails from './pages/VideoDetails';
import Explore from './pages/Explore';
import Admin from './pages/Admin';
import { User } from './types';
import { VIDEOS } from './constants';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('maratonei_user');
    return saved ? JSON.parse(saved) : null;
  });

  useEffect(() => {
    if (user) {
      // Seed random history if it doesn't exist
      const history = JSON.parse(localStorage.getItem('maratonei_history') || '[]');
      let userHistory = history.find((h: any) => h.userId === user.id);
      
      if (!userHistory) {
        // Pick 2 random videos from the default set to show as "watched"
        const randomIds = [...VIDEOS]
          .sort(() => 0.5 - Math.random())
          .slice(0, 2)
          .map(v => v.id);
          
        userHistory = { userId: user.id, videoIds: randomIds };
        history.push(userHistory);
        localStorage.setItem('maratonei_history', JSON.stringify(history));
      }
    }
  }, [user]);

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
        <Route path="/explore/:type/:id" element={user ? <Explore user={user} onLogout={logout} /> : <Navigate to="/auth" />} />
        <Route path="/video/:id" element={user ? <VideoDetails user={user} onLogout={logout} /> : <Navigate to="/auth" />} />
        <Route path="/admin" element={user?.role === 'admin' ? <Admin user={user} onLogout={logout} /> : <Navigate to="/home" />} />
      </Routes>
    </Router>
  );
};

export default App;
