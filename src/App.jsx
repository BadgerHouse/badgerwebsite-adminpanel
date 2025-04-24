import React, { useRef } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation
} from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { LanguageProvider } from './contexts/LanguageContext';

import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import DesignDepartment from './pages/DesignDepartment';
import DevelopmentDepartment from './pages/DevelopmentDepartment';
import PRDepartment from './pages/PRDepartment';
import PortfolioPage from './pages/PortfolioPage';
import Contact from './pages/Contact';
import AdminPanel from './pages/AdminPanel';
import './App.css';
import './components/Transitions.css';

const AnimatedRoutes = () => {
  const location = useLocation();
  const nodeRef = useRef(null); // HATAYI ÇÖZEN SATIR
  
  // Admin panel sayfasında header ve footer'ı gösterme
  const isAdminRoute = location.pathname.startsWith('/admin');

  if (isAdminRoute) {
    return (
      <Routes location={location}>
        <Route path="/admin/*" element={<AdminPanel />} />
      </Routes>
    );
  }

  return (
    <div className="App">
      <Header />
      <TransitionGroup component={null}>
        <CSSTransition
          key={location.pathname}
          timeout={300}
          classNames="fade"
          nodeRef={nodeRef} // findDOMNode hatasını engeller
          unmountOnExit
        >
          <div ref={nodeRef} className="page-transition-wrapper">
            <Routes location={location}>
              <Route path="/" element={<Home />} />
              <Route path="/design" element={<DesignDepartment />} />
              <Route path="/development" element={<DevelopmentDepartment />} />
              <Route path="/pr" element={<PRDepartment />} />
              <Route path="/portfolio" element={<PortfolioPage />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </div>
        </CSSTransition>
      </TransitionGroup>
      <Footer />
    </div>
  );
};

function App() {
  return (
    <LanguageProvider>
    <Router>
      <AnimatedRoutes />
    </Router>
    </LanguageProvider>
  );
}

export default App;
