import React from 'react';
import { FiFileText, FiImage, FiUsers, FiActivity } from 'react-icons/fi';
import './Dashboard.css';

const Dashboard = () => {
  // Örnek veriler
  const stats = [
    { id: 1, icon: <FiFileText />, title: 'Toplam İçerik', count: 27, color: '#3498db' },
    { id: 2, icon: <FiImage />, title: 'Medya Dosyaları', count: 54, color: '#2ecc71' },
    { id: 3, icon: <FiUsers />, title: 'Kullanıcılar', count: 3, color: '#9b59b6' },
    { id: 4, icon: <FiActivity />, title: 'Ziyaretçiler', count: '1.2K', color: '#e74c3c' }
  ];

  // Örnek son aktiviteler
  const activities = [
    { id: 1, user: 'Admin', action: 'Anasayfa içeriği güncellendi', time: '10 dk önce' },
    { id: 2, user: 'Editor', action: 'Yeni bir proje eklendi', time: '2 saat önce' },
    { id: 3, user: 'Admin', action: 'Medya galerisi güncellendi', time: '5 saat önce' },
    { id: 4, user: 'Editor', action: 'İletişim bilgileri değiştirildi', time: '1 gün önce' }
  ];

  return (
    <div className="dashboard">
      <h2 className="section-title">Gösterge Paneli</h2>
      
      <div className="stats-container">
        {stats.map(stat => (
          <div key={stat.id} className="stat-card" style={{ borderTop: `3px solid ${stat.color}` }}>
            <div className="stat-icon" style={{ color: stat.color }}>
              {stat.icon}
            </div>
            <div className="stat-info">
              <h3>{stat.count}</h3>
              <p>{stat.title}</p>
            </div>
          </div>
        ))}
      </div>
      
      <div className="dashboard-grid">
        <div className="dashboard-card">
          <h3>Son Aktiviteler</h3>
          <ul className="activity-list">
            {activities.map(activity => (
              <li key={activity.id} className="activity-item">
                <div className="activity-content">
                  <strong>{activity.user}</strong> {activity.action}
                  <span className="activity-time">{activity.time}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
        
        <div className="dashboard-card">
          <h3>Hızlı Eylemler</h3>
          <div className="quick-actions">
            <button className="quick-action-btn">İçerik Ekle</button>
            <button className="quick-action-btn">Medya Yükle</button>
            <button className="quick-action-btn">Kullanıcı Ekle</button>
            <button className="quick-action-btn">Ayarları Güncelle</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 