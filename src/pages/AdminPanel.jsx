import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import './AdminPanel.css';
import ContentManager from '../components/adminComponents/ContentManager';
import Sidebar from '../components/adminComponents/Sidebar';
import Dashboard from '../components/adminComponents/Dashboard';
import LoginForm from '../components/adminComponents/LoginForm';

const AdminPanel = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem('adminAuthenticated') === 'true'
  );
  const [activeSection, setActiveSection] = useState('dashboard');

  const handleLogin = (username, password) => {
    // Basit kimlik doğrulama - gerçek uygulamada güvenli API ile yapılmalıdır
    if (username === 'admin' && password === 'admin123') {
      setIsAuthenticated(true);
      localStorage.setItem('adminAuthenticated', 'true');
    } else {
      alert('Kullanıcı adı veya şifre hatalı!');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('adminAuthenticated');
  };

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'dashboard':
        return <Dashboard />;
      case 'content':
        return <ContentManager />;
      default:
        return <Dashboard />;
    }
  };

  if (!isAuthenticated) {
    return <LoginForm onLogin={handleLogin} />;
  }

  return (
    <div className="admin-panel">
      <Sidebar 
        activeSection={activeSection} 
        setActiveSection={setActiveSection} 
        onLogout={handleLogout} 
      />
      <div className="admin-content">
        <div className="admin-header">
          <h1>Badger Admin Panel</h1>
          <button className="logout-btn" onClick={handleLogout}>Çıkış Yap</button>
        </div>
        <div className="admin-main">
          {renderActiveSection()}
        </div>
      </div>
    </div>
  );
};

export default AdminPanel; 