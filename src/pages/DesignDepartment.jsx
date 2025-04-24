import React, { useState, useEffect } from 'react';
import './DepartmentPage.css';

// Varsayılan veriler
const defaultData = {
  title: "Design Department",
  subtitle: "Creating beautiful and functional designs for your brand",
  services: [
    { title: 'UI/UX Design', description: 'User-friendly interface designs' },
    { title: 'Brand Identity', description: 'Logo, colors, and visual identity' },
    { title: 'Graphic Design', description: 'Visual communication materials' },
    { title: 'Web Design', description: 'Responsive and modern web designs' },
    { title: 'Mobile App Design', description: 'User-centered mobile interfaces' }
  ]
};

const DesignDepartment = () => {
  const [departmentData, setDepartmentData] = useState(defaultData);

  // Admin panelinde kaydedilen verileri localStorage'dan almaya çalış
  useEffect(() => {
    try {
      const savedContent = localStorage.getItem('contentData');
      if (savedContent) {
        const parsedContent = JSON.parse(savedContent);
        if (parsedContent.design) {
          setDepartmentData(parsedContent.design);
        }
      }
    } catch (error) {
      console.error('Tasarım departmanı verilerini yüklerken hata oluştu:', error);
    }
  }, []);

  return (
    <div className="department-page">
      <div className="department-header">
        <h1>{departmentData.title}</h1>
        <p>{departmentData.subtitle}</p>
      </div>
      <div className="department-content">
        <div className="department-section">
          <h2>Hizmetlerimiz</h2>
          <ul className="services-list">
            {departmentData.services && departmentData.services.map((service, index) => (
              <li key={index}>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DesignDepartment; 