import React, { useState, useEffect } from 'react';
import './DepartmentPage.css';

// Varsayılan veriler
const defaultData = {
  title: "PR Department",
  subtitle: "Elevating your brand's visibility and reputation",
  services: [
    { title: 'Media Relations', description: 'Building relationships with key media outlets' },
    { title: 'Press Releases', description: 'Creating and distributing compelling news' },
    { title: 'Social Media Management', description: 'Strategic content across platforms' },
    { title: 'Crisis Communication', description: 'Protecting your brand during challenges' },
    { title: 'Brand Storytelling', description: 'Crafting your unique narrative' }
  ]
};

const PRDepartment = () => {
  const [departmentData, setDepartmentData] = useState(defaultData);

  // Admin panelinde kaydedilen verileri localStorage'dan almaya çalış
  useEffect(() => {
    try {
      const savedContent = localStorage.getItem('contentData');
      if (savedContent) {
        const parsedContent = JSON.parse(savedContent);
        if (parsedContent.pr) {
          setDepartmentData(parsedContent.pr);
        }
      }
    } catch (error) {
      console.error('PR departmanı verilerini yüklerken hata oluştu:', error);
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

export default PRDepartment; 