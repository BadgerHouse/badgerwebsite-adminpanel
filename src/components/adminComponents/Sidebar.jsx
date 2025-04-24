import React from 'react';
import { FiHome, FiEdit, FiImage, FiUsers, FiSettings } from 'react-icons/fi';
import './Sidebar.css';

const Sidebar = ({ activeSection, setActiveSection }) => {
  const menuItems = [
    { id: 'dashboard', icon: <FiHome />, label: 'Ana Sayfa' },
    { id: 'content', icon: <FiEdit />, label: 'İçerik Yönetimi' },
    { id: 'media', icon: <FiImage />, label: 'Medya' },
    { id: 'users', icon: <FiUsers />, label: 'Kullanıcılar' },
    { id: 'settings', icon: <FiSettings />, label: 'Ayarlar' }
  ];

  return (
    <div className="admin-sidebar">
      <div className="sidebar-header">
        <h2>Badger Admin</h2>
      </div>
      <nav className="sidebar-nav">
        <ul>
          {menuItems.map(item => (
            <li 
              key={item.id}
              className={activeSection === item.id ? 'active' : ''}
              onClick={() => setActiveSection(item.id)}
            >
              <span className="icon">{item.icon}</span>
              <span className="label">{item.label}</span>
            </li>
          ))}
        </ul>
      </nav>
      <div className="sidebar-footer">
        <p>Badger Admin v1.0</p>
      </div>
    </div>
  );
};

export default Sidebar; 