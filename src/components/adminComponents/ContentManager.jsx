import React, { useState, useEffect } from 'react';
import { FiEdit, FiTrash2, FiPlusCircle, FiSave } from 'react-icons/fi';
import './ContentManager.css';

const ContentManager = () => {
  // Section seçimi için state
  const [activeSection, setActiveSection] = useState('home');
  
  // Form ve düzenleme modu için state
  const [isEditing, setIsEditing] = useState(false);
  const [currentContent, setCurrentContent] = useState({});
  
  // Tüm içerik verileri için gerçek site verileri
  const [contentData, setContentData] = useState({
    home: {
      heroTitle: "Badger'a Hoş Geldiniz",
      heroSubtitle: "Dijital dünyada güvenilir çözüm ortağınız",
      animatedTexts: ["Yazılım.", "Görsel.", "Reklam.", "Sosyal."],
      aboutTitle: "Hakkımızda",
      aboutText: "Biz, dijital dünyada yenilikçi çözümler sunan bir ekibiz. Müşterilerimizin ihtiyaçlarını anlamak ve onlara en iyi hizmeti sunmak için buradayız. Deneyimli ekibimizle, projelerinizi hayata geçiriyoruz.",
      slogan: "Badger Dünyasına hoş geldiniz",
      sloganSubtitle: "Sizi yeriz",
      serviceTitle: "Hizmetlerimiz",
      services: [
        { 
          title: 'Güvenli', 
          description: 'En son güvenlik teknolojileri ile verileriniz güvende',
          icon: '/icons/shield.svg',
          backTitle: 'Güvenlik Hizmetleri',
          backItems: ['Veri Şifreleme', 'Güvenlik Duvarı', 'DDoS Koruması', 'SSL Sertifikası']
        },
        { 
          title: 'Hızlı', 
          description: 'Yüksek performanslı altyapımız ile hızlı çözümler',
          icon: '/icons/speed.svg',
          backTitle: 'Performans Hizmetleri',
          backItems: ['CDN Desteği', 'Önbellek Optimizasyonu', 'Yük Dengeleme', 'Hız Optimizasyonu']
        },
        { 
          title: 'Kullanıcı Dostu', 
          description: 'Kolay kullanılabilir arayüz ile maksimum verimlilik',
          icon: '/icons/user-friendly.svg',
          backTitle: 'UX Hizmetleri',
          backItems: ['UI/UX Tasarım', 'Mobil Uyumluluk', 'Erişilebilirlik', 'Kullanıcı Testleri']
        }
      ]
    },
    design: {
      title: "Tasarım Departmanı",
      subtitle: "Görsel kimliğinizi öne çıkaran çözümler",
      services: [
        { title: 'Kurumsal Kimlik', description: 'Logo, kartvizit, antetli kağıt tasarımları' },
        { title: 'Web Tasarım', description: 'Modern ve responsive web tasarımları' },
        { title: 'Mobil Uygulama Tasarımı', description: 'Kullanıcı dostu mobil uygulama arayüzleri' }
      ]
    },
    development: {
      title: "Geliştirme Departmanı",
      subtitle: "Güçlü yazılım çözümleri",
      services: [
        { title: 'Web Geliştirme', description: 'Frontend ve backend web uygulamaları' },
        { title: 'Mobil Uygulama Geliştirme', description: 'iOS ve Android uygulamaları' },
        { title: 'E-ticaret Çözümleri', description: 'Online satış platformları' }
      ]
    },
    pr: {
      title: "PR Departmanı",
      subtitle: "Markanızı öne çıkaran stratejiler",
      services: [
        { title: 'Sosyal Medya Yönetimi', description: 'Tüm platformlarda profesyonel içerik yönetimi' },
        { title: 'İçerik Üretimi', description: 'Blog yazıları, videolar ve görsel içerikler' },
        { title: 'SEO Çalışmaları', description: 'Arama motoru optimizasyonu ile üst sıralarda yer alın' }
      ]
    },
    portfolio: {
      title: "Portfolio",
      subtitle: "Çalışmalarımız",
      categories: ['All', 'Design', 'Development', 'PR'],
      projects: [
        {
          id: 1,
          title: 'Website Redesign',
          category: 'Design',
          description: 'A complete redesign of a corporate website.',
          images: ['/projects/brio-portfolio.png', '/projects/haufen-portfolio.png']
        },
        {
          id: 2,
          title: 'E-commerce App',
          category: 'Development',
          description: 'Full-stack e-commerce application.',
          images: ['/projects/brio-portfolio.png', '/projects/haufen-portfolio.png']
        },
        {
          id: 3,
          title: 'Brand Video Campaign',
          category: 'PR',
          description: 'Promotional video for product launch.',
          images: ['/projects/brio-portfolio.png', '/projects/haufen-portfolio.png'],
          video: '/images/moon.mp4'
        }
      ]
    },
    contact: {
      title: "İletişim",
      description: "Bize ulaşın, projeleriniz hakkında konuşalım",
      address: "Maslak Mah. Büyükdere Cad. No:123, İstanbul",
      email: "info@badger.com",
      phone: "+90 212 345 67 89",
      formTitle: "Mesaj Gönderin",
      formFields: [
        { label: "Adınız", type: "text", placeholder: "Adınızı giriniz" },
        { label: "E-posta", type: "email", placeholder: "E-posta adresinizi giriniz" },
        { label: "Konu", type: "text", placeholder: "Mesaj konusu" },
        { label: "Mesajınız", type: "textarea", placeholder: "Mesajınızı giriniz" }
      ]
    }
  });
  
  // Aktif sekmeye göre içerik yükleme
  useEffect(() => {
    setCurrentContent(contentData[activeSection] || {});
    setIsEditing(false);
  }, [activeSection, contentData]);
  
  // İçerik kaydetme işlemi
  const handleSaveContent = () => {
    setContentData(prev => {
      const updatedData = {
        ...prev,
        [activeSection]: currentContent
      };
      
      // Verileri localStorage'a kaydet
      try {
        localStorage.setItem('contentData', JSON.stringify(updatedData));
      } catch (error) {
        console.error('İçerik kaydedilirken hata oluştu:', error);
      }
      
      return updatedData;
    });
    
    setIsEditing(false);
    alert('İçerik başarıyla kaydedildi!');
    
    // Burada gerçek bir uygulamada API'ye kaydetme işlemi yapılır
    // saveToApi(activeSection, currentContent);
  };
  
  // Sayfa yüklendiğinde localStorage'dan verileri al
  useEffect(() => {
    try {
      const savedContent = localStorage.getItem('contentData');
      if (savedContent) {
        setContentData(JSON.parse(savedContent));
      }
    } catch (error) {
      console.error('Kayıtlı içerik yüklenirken hata oluştu:', error);
    }
  }, []);
  
  // İçeriği düzenleme moduna geçme
  const handleEdit = () => {
    setIsEditing(true);
  };
  
  // Form verilerini güncelleme
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentContent(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  // Alt nesne değişikliklerini yönetme (örneğin hizmetler dizisi)
  const handleNestedChange = (index, field, value, arrayName) => {
    setCurrentContent(prev => {
      const updatedArray = [...prev[arrayName]];
      updatedArray[index] = {
        ...updatedArray[index],
        [field]: value
      };
      
      return {
        ...prev,
        [arrayName]: updatedArray
      };
    });
  };

  // Nested array içindeki öğelerin değişikliklerini yönetme (örn. backItems)
  const handleNestedArrayChange = (serviceIndex, itemIndex, value, parentArray, childArray) => {
    setCurrentContent(prev => {
      const updatedParentArray = [...prev[parentArray]];
      const updatedChildArray = [...updatedParentArray[serviceIndex][childArray]];
      updatedChildArray[itemIndex] = value;
      
      updatedParentArray[serviceIndex] = {
        ...updatedParentArray[serviceIndex],
        [childArray]: updatedChildArray
      };
      
      return {
        ...prev,
        [parentArray]: updatedParentArray
      };
    });
  };
  
  // İçeriğe yeni bir öğe ekleme (örneğin yeni bir hizmet)
  const handleAddItem = (arrayName, template) => {
    setCurrentContent(prev => ({
      ...prev,
      [arrayName]: [...(prev[arrayName] || []), template]
    }));
  };

  // Nested array içine yeni öğe ekleme
  const handleAddNestedItem = (serviceIndex, arrayName, childArrayName, defaultValue) => {
    setCurrentContent(prev => {
      const updatedArray = [...prev[arrayName]];
      const childArray = [...updatedArray[serviceIndex][childArrayName], defaultValue];
      
      updatedArray[serviceIndex] = {
        ...updatedArray[serviceIndex],
        [childArrayName]: childArray
      };
      
      return {
        ...prev,
        [arrayName]: updatedArray
      };
    });
  };
  
  // Bir öğeyi silme
  const handleDeleteItem = (arrayName, index) => {
    setCurrentContent(prev => {
      const updatedArray = [...prev[arrayName]];
      updatedArray.splice(index, 1);
      
      return {
        ...prev,
        [arrayName]: updatedArray
      };
    });
  };

  // Nested array içinden öğe silme
  const handleDeleteNestedItem = (serviceIndex, arrayName, childArrayName, itemIndex) => {
    setCurrentContent(prev => {
      const updatedArray = [...prev[arrayName]];
      const childArray = [...updatedArray[serviceIndex][childArrayName]];
      childArray.splice(itemIndex, 1);
      
      updatedArray[serviceIndex] = {
        ...updatedArray[serviceIndex],
        [childArrayName]: childArray
      };
      
      return {
        ...prev,
        [arrayName]: updatedArray
      };
    });
  };
  
  // İçerik kaydetme işlemi
  const renderContentForm = () => {
    switch (activeSection) {
      case 'home':
        return (
          <div className="content-form">
            <div className="form-group">
              <label>Hero Başlık</label>
              <input 
                type="text" 
                name="heroTitle" 
                value={currentContent.heroTitle || ''} 
                onChange={handleInputChange}
              />
            </div>
            
            <div className="form-group">
              <label>Hero Alt Başlık</label>
              <input 
                type="text" 
                name="heroSubtitle" 
                value={currentContent.heroSubtitle || ''} 
                onChange={handleInputChange}
              />
            </div>
            
            <div className="form-group">
              <label>Animasyonlu Metinler</label>
              <textarea 
                name="animatedTexts" 
                value={Array.isArray(currentContent.animatedTexts) ? currentContent.animatedTexts.join('\n') : ''} 
                onChange={(e) => {
                  const lines = e.target.value.split('\n').filter(line => line.trim() !== '');
                  setCurrentContent(prev => ({
                    ...prev,
                    animatedTexts: lines
                  }));
                }}
                placeholder="Her satıra bir metin yazın"
              />
            </div>
            
            <div className="form-group">
              <label>Hakkımızda Başlık</label>
              <input 
                type="text" 
                name="aboutTitle" 
                value={currentContent.aboutTitle || ''} 
                onChange={handleInputChange}
              />
            </div>
            
            <div className="form-group">
              <label>Hakkımızda Metni</label>
              <textarea 
                name="aboutText" 
                value={currentContent.aboutText || ''} 
                onChange={handleInputChange}
              />
            </div>
            
            <div className="form-group">
              <label>Slogan</label>
              <input 
                type="text" 
                name="slogan" 
                value={currentContent.slogan || ''} 
                onChange={handleInputChange}
              />
            </div>
            
            <div className="form-group">
              <label>Slogan Alt Yazı</label>
              <input 
                type="text" 
                name="sloganSubtitle" 
                value={currentContent.sloganSubtitle || ''} 
                onChange={handleInputChange}
              />
            </div>
            
            <div className="form-group">
              <label>Hizmetler Başlık</label>
              <input 
                type="text" 
                name="serviceTitle" 
                value={currentContent.serviceTitle || ''} 
                onChange={handleInputChange}
              />
            </div>
            
            <div className="form-group">
              <label>Hizmetler</label>
              <div className="nested-items">
                {currentContent.services && currentContent.services.map((service, index) => (
                  <div key={index} className="nested-item service-editor">
                    <h4>Hizmet {index + 1}</h4>
                    <div className="form-row">
                      <div className="form-group">
                        <label>Başlık</label>
                        <input 
                          type="text" 
                          value={service.title} 
                          onChange={(e) => handleNestedChange(index, 'title', e.target.value, 'services')}
                        />
                      </div>
                      
                      <div className="form-group">
                        <label>Açıklama</label>
                        <input 
                          type="text" 
                          value={service.description} 
                          onChange={(e) => handleNestedChange(index, 'description', e.target.value, 'services')}
                        />
                      </div>
                    </div>
                    
                    <div className="form-row">
                      <div className="form-group">
                        <label>İkon Yolu</label>
                        <input 
                          type="text" 
                          value={service.icon} 
                          onChange={(e) => handleNestedChange(index, 'icon', e.target.value, 'services')}
                        />
                      </div>
                      
                      <div className="form-group">
                        <label>Arka Yüz Başlık</label>
                        <input 
                          type="text" 
                          value={service.backTitle} 
                          onChange={(e) => handleNestedChange(index, 'backTitle', e.target.value, 'services')}
                        />
                      </div>
                    </div>
                    
                    <div className="form-group">
                      <label>Arka Yüz Maddeleri</label>
                      <div className="nested-items nested-level-2">
                        {service.backItems && service.backItems.map((item, itemIndex) => (
                          <div key={itemIndex} className="nested-item-row">
                            <input 
                              type="text" 
                              value={item} 
                              onChange={(e) => handleNestedArrayChange(index, itemIndex, e.target.value, 'services', 'backItems')}
                            />
                            <button 
                              className="delete-btn small" 
                              onClick={() => handleDeleteNestedItem(index, 'services', 'backItems', itemIndex)}
                            >
                              <FiTrash2 />
                            </button>
                          </div>
                        ))}
                        
                        <button 
                          className="add-item-btn small" 
                          onClick={() => handleAddNestedItem(index, 'services', 'backItems', 'Yeni Özellik')}
                        >
                          <FiPlusCircle /> Yeni Madde Ekle
                        </button>
                      </div>
                    </div>
                    
                    <button 
                      className="delete-btn delete-service" 
                      onClick={() => handleDeleteItem('services', index)}
                    >
                      <FiTrash2 /> Hizmeti Sil
                    </button>
                  </div>
                ))}
                
                <button 
                  className="add-item-btn" 
                  onClick={() => handleAddItem('services', { 
                    title: 'Yeni Hizmet', 
                    description: 'Hizmet açıklaması',
                    icon: '/icons/new-icon.svg',
                    backTitle: 'Hizmet Detayları',
                    backItems: ['Özellik 1', 'Özellik 2']
                  })}
                >
                  <FiPlusCircle /> Yeni Hizmet Ekle
                </button>
              </div>
            </div>
          </div>
        );
        
      case 'design':
      case 'development':
      case 'pr':
        return (
          <div className="content-form">
            <div className="form-group">
              <label>Başlık</label>
              <input 
                type="text" 
                name="title" 
                value={currentContent.title || ''} 
                onChange={handleInputChange}
              />
            </div>
            
            <div className="form-group">
              <label>Alt Başlık</label>
              <input 
                type="text" 
                name="subtitle" 
                value={currentContent.subtitle || ''} 
                onChange={handleInputChange}
              />
            </div>
            
            <div className="form-group">
              <label>Hizmetler</label>
              <div className="nested-items">
                {currentContent.services && currentContent.services.map((service, index) => (
                  <div key={index} className="nested-item">
                    <div className="form-row">
                      <input 
                        type="text" 
                        placeholder="Hizmet Başlığı" 
                        value={service.title} 
                        onChange={(e) => handleNestedChange(index, 'title', e.target.value, 'services')}
                      />
                      <input 
                        type="text" 
                        placeholder="Hizmet Açıklaması" 
                        value={service.description} 
                        onChange={(e) => handleNestedChange(index, 'description', e.target.value, 'services')}
                      />
                      <button 
                        className="delete-btn" 
                        onClick={() => handleDeleteItem('services', index)}
                      >
                        <FiTrash2 />
                      </button>
                    </div>
                  </div>
                ))}
                
                <button 
                  className="add-item-btn" 
                  onClick={() => handleAddItem('services', { title: 'Yeni Hizmet', description: 'Hizmet açıklaması' })}
                >
                  <FiPlusCircle /> Yeni Hizmet Ekle
                </button>
              </div>
            </div>
          </div>
        );
      
      case 'portfolio':
        return (
          <div className="content-form">
            <div className="form-group">
              <label>Başlık</label>
              <input 
                type="text" 
                name="title" 
                value={currentContent.title || ''} 
                onChange={handleInputChange}
              />
            </div>
            
            <div className="form-group">
              <label>Alt Başlık</label>
              <input 
                type="text" 
                name="subtitle" 
                value={currentContent.subtitle || ''} 
                onChange={handleInputChange}
              />
            </div>
            
            <div className="form-group">
              <label>Kategoriler</label>
              <textarea 
                name="categories" 
                value={Array.isArray(currentContent.categories) ? currentContent.categories.join('\n') : ''} 
                onChange={(e) => {
                  const lines = e.target.value.split('\n').filter(line => line.trim() !== '');
                  setCurrentContent(prev => ({
                    ...prev,
                    categories: lines
                  }));
                }}
                placeholder="Her satıra bir kategori yazın"
              />
            </div>
            
            <div className="form-group">
              <label>Projeler</label>
              <div className="nested-items">
                {currentContent.projects && currentContent.projects.map((project, index) => (
                  <div key={index} className="nested-item service-editor">
                    <h4>Proje {index + 1}</h4>
                    <div className="form-row">
                      <div className="form-group">
                        <label>Başlık</label>
                        <input 
                          type="text" 
                          value={project.title} 
                          onChange={(e) => handleNestedChange(index, 'title', e.target.value, 'projects')}
                        />
                      </div>
                      
                      <div className="form-group">
                        <label>Kategori</label>
                        <select
                          value={project.category}
                          onChange={(e) => handleNestedChange(index, 'category', e.target.value, 'projects')}
                        >
                          {currentContent.categories && currentContent.categories.map((cat, i) => (
                            cat !== 'All' && <option key={i} value={cat}>{cat}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                    
                    <div className="form-group">
                      <label>Açıklama</label>
                      <textarea 
                        value={project.description} 
                        onChange={(e) => handleNestedChange(index, 'description', e.target.value, 'projects')}
                      />
                    </div>
                    
                    <div className="form-group">
                      <label>Video URL (opsiyonel)</label>
                      <input 
                        type="text" 
                        value={project.video || ''} 
                        onChange={(e) => handleNestedChange(index, 'video', e.target.value, 'projects')}
                        placeholder="/videos/ornek.mp4"
                      />
                    </div>
                    
                    <div className="form-group">
                      <label>Görseller</label>
                      <div className="nested-items nested-level-2">
                        {project.images && project.images.map((img, imgIndex) => (
                          <div key={imgIndex} className="nested-item-row">
                            <input 
                              type="text" 
                              value={img} 
                              onChange={(e) => handleNestedArrayChange(index, imgIndex, e.target.value, 'projects', 'images')}
                            />
                            <button 
                              className="delete-btn small" 
                              onClick={() => handleDeleteNestedItem(index, 'projects', 'images', imgIndex)}
                            >
                              <FiTrash2 />
                            </button>
                          </div>
                        ))}
                        
                        <button 
                          className="add-item-btn small" 
                          onClick={() => handleAddNestedItem(index, 'projects', 'images', '/projects/ornek.jpg')}
                        >
                          <FiPlusCircle /> Yeni Görsel Ekle
                        </button>
                      </div>
                    </div>
                    
                    <button 
                      className="delete-btn delete-service" 
                      onClick={() => handleDeleteItem('projects', index)}
                    >
                      <FiTrash2 /> Projeyi Sil
                    </button>
                  </div>
                ))}
                
                <button 
                  className="add-item-btn" 
                  onClick={() => handleAddItem('projects', { 
                    id: Date.now(),
                    title: 'Yeni Proje', 
                    category: currentContent.categories?.[1] || 'Design',
                    description: 'Proje açıklaması',
                    images: ['/projects/ornek.jpg']
                  })}
                >
                  <FiPlusCircle /> Yeni Proje Ekle
                </button>
              </div>
            </div>
          </div>
        );
        
      case 'contact':
        return (
          <div className="content-form">
            <div className="form-group">
              <label>Başlık</label>
              <input 
                type="text" 
                name="title" 
                value={currentContent.title || ''} 
                onChange={handleInputChange}
              />
            </div>
            
            <div className="form-group">
              <label>Açıklama</label>
              <input 
                type="text" 
                name="description" 
                value={currentContent.description || ''} 
                onChange={handleInputChange}
              />
            </div>
            
            <div className="form-group">
              <label>Adres</label>
              <input 
                type="text" 
                name="address" 
                value={currentContent.address || ''} 
                onChange={handleInputChange}
              />
            </div>
            
            <div className="form-group">
              <label>E-posta</label>
              <input 
                type="email" 
                name="email" 
                value={currentContent.email || ''} 
                onChange={handleInputChange}
              />
            </div>
            
            <div className="form-group">
              <label>Telefon</label>
              <input 
                type="text" 
                name="phone" 
                value={currentContent.phone || ''} 
                onChange={handleInputChange}
              />
            </div>
            
            <div className="form-group">
              <label>Form Başlığı</label>
              <input 
                type="text" 
                name="formTitle" 
                value={currentContent.formTitle || ''} 
                onChange={handleInputChange}
              />
            </div>
            
            <div className="form-group">
              <label>Form Alanları</label>
              <div className="nested-items">
                {currentContent.formFields && currentContent.formFields.map((field, index) => (
                  <div key={index} className="nested-item">
                    <div className="form-row">
                      <input 
                        type="text" 
                        placeholder="Etiket" 
                        value={field.label} 
                        onChange={(e) => handleNestedChange(index, 'label', e.target.value, 'formFields')}
                      />
                      <select
                        value={field.type}
                        onChange={(e) => handleNestedChange(index, 'type', e.target.value, 'formFields')}
                      >
                        <option value="text">Metin</option>
                        <option value="email">E-posta</option>
                        <option value="textarea">Metin Alanı</option>
                        <option value="tel">Telefon</option>
                      </select>
                      <input 
                        type="text" 
                        placeholder="Placeholder" 
                        value={field.placeholder} 
                        onChange={(e) => handleNestedChange(index, 'placeholder', e.target.value, 'formFields')}
                      />
                      <button 
                        className="delete-btn" 
                        onClick={() => handleDeleteItem('formFields', index)}
                      >
                        <FiTrash2 />
                      </button>
                    </div>
                  </div>
                ))}
                
                <button 
                  className="add-item-btn" 
                  onClick={() => handleAddItem('formFields', { 
                    label: 'Yeni Alan', 
                    type: 'text',
                    placeholder: 'Placeholder metni' 
                  })}
                >
                  <FiPlusCircle /> Yeni Form Alanı Ekle
                </button>
              </div>
            </div>
          </div>
        );
        
      default:
        return <p>Lütfen düzenlemek istediğiniz bölümü seçin.</p>;
    }
  };
  
  // İçeriği oku-modunda render etme
  const renderContentView = () => {
    switch (activeSection) {
      case 'home':
        return (
          <div className="content-view">
            <div className="content-section">
              <h3>Hero Bölümü</h3>
              <p><strong>Başlık:</strong> {currentContent.heroTitle}</p>
              <p><strong>Alt Başlık:</strong> {currentContent.heroSubtitle}</p>
              <p><strong>Animasyonlu Metinler:</strong></p>
              <ul>
                {currentContent.animatedTexts && currentContent.animatedTexts.map((text, index) => (
                  <li key={index}>{text}</li>
                ))}
              </ul>
            </div>
            
            <div className="content-section">
              <h3>Hakkımızda Bölümü</h3>
              <p><strong>Başlık:</strong> {currentContent.aboutTitle}</p>
              <p><strong>Metin:</strong> {currentContent.aboutText}</p>
              <p><strong>Slogan:</strong> {currentContent.slogan}</p>
              <p><strong>Slogan Alt Yazı:</strong> {currentContent.sloganSubtitle}</p>
            </div>
            
            <div className="content-section">
              <h3>Hizmetler Bölümü</h3>
              <p><strong>Başlık:</strong> {currentContent.serviceTitle}</p>
              {currentContent.services && currentContent.services.map((service, index) => (
                <div key={index} className="service-item-preview">
                  <h4>{index + 1}. {service.title}</h4>
                  <p><strong>Açıklama:</strong> {service.description}</p>
                  <p><strong>İkon:</strong> {service.icon}</p>
                  <p><strong>Arka Yüz Başlık:</strong> {service.backTitle}</p>
                  <p><strong>Arka Yüz Maddeleri:</strong></p>
                  <ul>
                    {service.backItems && service.backItems.map((item, itemIndex) => (
                      <li key={itemIndex}>{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        );
        
      case 'design':
      case 'development':
      case 'pr':
        return (
          <div className="content-view">
            <div className="content-section">
              <h3>Sayfa Genel Bilgiler</h3>
              <p><strong>Başlık:</strong> {currentContent.title}</p>
              <p><strong>Alt Başlık:</strong> {currentContent.subtitle}</p>
            </div>
            
            <div className="content-section">
              <h3>Hizmetler</h3>
              <ul>
                {currentContent.services && currentContent.services.map((service, index) => (
                  <li key={index}>
                    <strong>{service.title}</strong> - {service.description}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        );

      case 'portfolio':
        return (
          <div className="content-view">
            <div className="content-section">
              <h3>Sayfa Genel Bilgiler</h3>
              <p><strong>Başlık:</strong> {currentContent.title}</p>
              <p><strong>Alt Başlık:</strong> {currentContent.subtitle}</p>
            </div>
            
            <div className="content-section">
              <h3>Kategoriler</h3>
              <ul>
                {currentContent.categories && currentContent.categories.map((category, index) => (
                  <li key={index}>{category}</li>
                ))}
              </ul>
            </div>
            
            <div className="content-section">
              <h3>Projeler</h3>
              {currentContent.projects && currentContent.projects.map((project, index) => (
                <div key={index} className="service-item-preview">
                  <h4>{index + 1}. {project.title}</h4>
                  <p><strong>ID:</strong> {project.id}</p>
                  <p><strong>Kategori:</strong> {project.category}</p>
                  <p><strong>Açıklama:</strong> {project.description}</p>
                  {project.video && <p><strong>Video:</strong> {project.video}</p>}
                  <p><strong>Görseller:</strong></p>
                  <ul>
                    {project.images && project.images.map((img, imgIndex) => (
                      <li key={imgIndex}>{img}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        );
        
      case 'contact':
        return (
          <div className="content-view">
            <div className="content-section">
              <h3>İletişim Bilgileri</h3>
              <p><strong>Başlık:</strong> {currentContent.title}</p>
              <p><strong>Açıklama:</strong> {currentContent.description}</p>
              <p><strong>Adres:</strong> {currentContent.address}</p>
              <p><strong>E-posta:</strong> {currentContent.email}</p>
              <p><strong>Telefon:</strong> {currentContent.phone}</p>
            </div>
            
            <div className="content-section">
              <h3>İletişim Formu</h3>
              <p><strong>Form Başlığı:</strong> {currentContent.formTitle}</p>
              <p><strong>Form Alanları:</strong></p>
              <ul>
                {currentContent.formFields && currentContent.formFields.map((field, index) => (
                  <li key={index}>
                    <strong>{field.label}</strong> - Tip: {field.type}, Placeholder: "{field.placeholder}"
                  </li>
                ))}
              </ul>
            </div>
          </div>
        );
        
      default:
        return <p>Lütfen görüntülemek istediğiniz bölümü seçin.</p>;
    }
  };

  return (
    <div className="content-manager">
      <h2 className="section-title">İçerik Yönetimi</h2>
      
      <div className="content-tabs">
        <button 
          className={activeSection === 'home' ? 'active' : ''} 
          onClick={() => setActiveSection('home')}
        >
          Ana Sayfa
        </button>
        <button 
          className={activeSection === 'design' ? 'active' : ''} 
          onClick={() => setActiveSection('design')}
        >
          Tasarım
        </button>
        <button 
          className={activeSection === 'development' ? 'active' : ''} 
          onClick={() => setActiveSection('development')}
        >
          Geliştirme
        </button>
        <button 
          className={activeSection === 'pr' ? 'active' : ''} 
          onClick={() => setActiveSection('pr')}
        >
          PR
        </button>
        <button 
          className={activeSection === 'portfolio' ? 'active' : ''} 
          onClick={() => setActiveSection('portfolio')}
        >
          Portfolio
        </button>
        <button 
          className={activeSection === 'contact' ? 'active' : ''} 
          onClick={() => setActiveSection('contact')}
        >
          İletişim
        </button>
      </div>
      
      <div className="content-actions">
        {!isEditing ? (
          <button className="edit-btn" onClick={handleEdit}>
            <FiEdit /> Düzenle
          </button>
        ) : (
          <button className="save-btn" onClick={handleSaveContent}>
            <FiSave /> Kaydet
          </button>
        )}
      </div>
      
      <div className="content-container">
        {isEditing ? renderContentForm() : renderContentView()}
      </div>
    </div>
  );
};

export default ContentManager; 