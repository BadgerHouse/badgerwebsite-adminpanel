import React, { useState, useEffect } from 'react';
import './DepartmentPage.css';

// Varsayılan veriler
const defaultData = {
  title: "Development Department",
  subtitle: "Building robust and scalable solutions for your business",
  services: [
    { title: 'Web Development', description: 'Full-stack web applications' },
    { title: 'Mobile App Development', description: 'iOS and Android applications' },
    { title: 'Custom Software Solutions', description: 'Tailored software for your needs' },
    { title: 'E-commerce Platforms', description: 'Online shopping solutions' },
    { title: 'API Development', description: 'Robust and secure APIs' }
  ]
};

const DevelopmentDepartment = () => {
  const [departmentData, setDepartmentData] = useState(defaultData);

  // Admin panelinde kaydedilen verileri localStorage'dan almaya çalış
  useEffect(() => {
    try {
      const savedContent = localStorage.getItem('contentData');
      if (savedContent) {
        const parsedContent = JSON.parse(savedContent);
        if (parsedContent.development) {
          setDepartmentData(parsedContent.development);
        }
      }
    } catch (error) {
      console.error('Geliştirme departmanı verilerini yüklerken hata oluştu:', error);
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

export default DevelopmentDepartment; 