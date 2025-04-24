import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import logo from '../assets/logo.png';
import { useLanguage } from '../contexts/LanguageContext';
import LanguageSwitcher from './LanguageSwitcher';

const Header = () => {
  const [hideHeader, setHideHeader] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const { language } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setHideHeader(currentScrollY > lastScrollY && currentScrollY > 80);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <header className={`header ${hideHeader ? 'scroll-hide' : ''}`}>
      <div className="header-container">
        <div className="logo">
          <img src={logo} alt="Logo" />
        </div>

        {/* Hamburger Button */}
        <button
          className="hamburger"
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label="Toggle menu"
        >
          ☰
        </button>

        {/* Desktop Menu */}
        <nav className="nav-menu desktop-menu">
          <ul>
            <li><Link to="/">Home</Link></li>
            <li className="dropdown-container">
              <span className="dropdown-toggle">
                {'Services'.split('').map((char, i) => <span key={i}>{char}</span>)}
              </span>
              <ul className="dropdown-menu">
                <li><Link to="/design">Digital Marketing</Link></li>
                <li><Link to="/development">Software/Game Development</Link></li>
                <li><Link to="/pr">Visual Production</Link></li>
              </ul>
            </li>
            <li><Link to="/portfolio">Portfolio</Link></li>
            <li><LanguageSwitcher /></li>
          </ul>
        </nav>

        {/* Mobile Menu */}
        {menuOpen && (
          <nav className={`mobile-menu ${menuOpen ? 'open' : ''}`}>
            <ul>
              <li><Link to="/" onClick={() => setMenuOpen(false)}>Home</Link></li>
              <li><Link to="/design" onClick={() => setMenuOpen(false)}>Digital Marketing</Link></li>
              <li><Link to="/development" onClick={() => setMenuOpen(false)}>Software/Game Development</Link></li>
              <li><Link to="/pr" onClick={() => setMenuOpen(false)}>Visual Production</Link></li>
              <li><Link to="/portfolio" onClick={() => setMenuOpen(false)}>Portfolio</Link></li>
              <li><LanguageSwitcher /></li>
              <li>
                <Link to="/contact" onClick={() => setMenuOpen(false)}>
                  <button className="get-offer-btn">Contact Us!</button>
                </Link>
              </li>
            </ul>
          </nav>
        )}

        {/* Desktop CTA */}
        <div className="desktop-cta">
          <Link to="/contact">
            <button className="get-offer-btn scroll-sticky">Contact Us!</button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
