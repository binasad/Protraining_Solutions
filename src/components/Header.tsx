import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './Header.css';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCoursesDropdownOpen, setIsCoursesDropdownOpen] = useState(false);
  const [isOnlineCoursesDropdownOpen, setIsOnlineCoursesDropdownOpen] = useState(false);
  const location = useLocation();
  const { cartCount } = useCart();

  const isActive = (path: string): boolean => {
    return location.pathname === path;
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleCoursesDropdown = () => {
    setIsCoursesDropdownOpen(!isCoursesDropdownOpen);
    if (!isCoursesDropdownOpen) {
      setIsOnlineCoursesDropdownOpen(false);
    }
  };

  const toggleOnlineCoursesDropdown = () => {
    setIsOnlineCoursesDropdownOpen(!isOnlineCoursesDropdownOpen);
    if (!isOnlineCoursesDropdownOpen) {
      setIsCoursesDropdownOpen(false);
    }
  };

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsCoursesDropdownOpen(false);
    setIsOnlineCoursesDropdownOpen(false);
  }, [location]);

  return (
    <>
      {/* Black Space Above Navigation */}
      <div className="black-space"></div>
      
      {/* Top Information Bar - Elementor Style */}
      <section className="elementor-section elementor-top-section">
        <div className="elementor-container elementor-column-gap-default">
          <div className="elementor-row">
            {/* Column 1: Contact Information */}
            <div className="elementor-column elementor-col-33 elementor-top-column">
              <div className="elementor-column-wrap elementor-element-populated">
                <div className="elementor-widget-wrap">
                  <div className="elementor-widget elementor-widget-icon-list">
                    <div className="elementor-widget-container">
                      <ul className="elementor-icon-list-items elementor-inline-items">
                        <li className="elementor-icon-list-item">
                          <span className="elementor-icon-list-icon">
                            <i className="fas fa-phone"></i>
                          </span>
                          <span className="elementor-icon-list-text">0203 488 2333</span>
                        </li>
                        <li className="elementor-icon-list-item">
                          <span className="elementor-icon-list-icon">
                            <i className="far fa-envelope"></i>
                          </span>
                          <span className="elementor-icon-list-text">info@synergysafetysolutions.co.uk</span>
                        </li>
                        <li className="elementor-icon-list-item">
                          <span className="elementor-icon-list-icon">
                            <i className="far fa-clock"></i>
                          </span>
                          <span className="elementor-icon-list-text">09:00 to 17:00</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Column 2: Social Icons */}
            <div className="elementor-column elementor-col-33 elementor-top-column">
              <div className="elementor-column-wrap elementor-element-populated">
                <div className="elementor-widget-wrap">
                  <div className="elementor-widget elementor-widget-social-icons">
                    <div className="elementor-widget-container">
                      <div className="elementor-social-icons-wrapper">
                        <a className="elementor-icon elementor-social-icon elementor-social-icon-facebook-f elementor-repeater-item-5646027" href="https://facebook.com/" target="_blank">
                          <i className="fab fa-facebook-f"></i>
                        </a>
                        <a className="elementor-icon elementor-social-icon elementor-social-icon-twitter elementor-repeater-item-72bc942" target="_blank">
                          <i className="fab fa-twitter"></i>
                        </a>
                        <a className="elementor-icon elementor-social-icon elementor-social-icon-instagram elementor-repeater-item-1e89cd1" target="_blank">
                          <i className="fab fa-instagram"></i>
                        </a>
                        <a className="elementor-icon elementor-social-icon elementor-social-icon-youtube elementor-repeater-item-1ead2e1" target="_blank">
                          <i className="fab fa-youtube"></i>
                        </a>
                        <a className="elementor-icon elementor-social-icon elementor-social-icon-linkedin elementor-repeater-item-d0a6143" target="_blank">
                          <i className="fab fa-linkedin"></i>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>


          </div>
        </div>
      </section>
      
      <header className="header">
        <div className="header-container">
          <div className="logo">
            <Link to="/">
              <img src="/images/main-logo.png" alt="Synergy Safety Solutions" className="main-logo" />
            </Link>
          </div>

          <nav className={`nav ${isMobileMenuOpen ? 'nav-open' : ''}`}>
            <ul className="nav-list">
              <li><Link to="/" className={isActive('/') ? 'active' : ''}>Home</Link></li>
              <li><Link to="/about" className={isActive('/about') ? 'active' : ''}>About Us</Link></li>
              
              <li className="dropdown">
                <button 
                  className={`dropdown-toggle ${isCoursesDropdownOpen ? 'open' : ''}`}
                  onClick={toggleCoursesDropdown}
                >
                  Courses
                  <span className="dropdown-arrow">▼</span>
                </button>
                <ul className={`dropdown-menu ${isCoursesDropdownOpen ? 'open' : ''}`}>
                  <li><Link to="/courses">All Courses</Link></li>
                  <li><Link to="/courses/citb-ssp">CITB Site Safety Plus</Link></li>
                  <li><Link to="/courses?category=construction">Construction Safety</Link></li>
                  <li><Link to="/courses?category=health">Health & Safety</Link></li>
                  <li><Link to="/courses?category=food">Food Safety</Link></li>
                </ul>
              </li>

              <li className="dropdown">
                <button 
                  className={`dropdown-toggle ${isOnlineCoursesDropdownOpen ? 'open' : ''}`}
                  onClick={toggleOnlineCoursesDropdown}
                >
                  Online Courses
                  <span className="dropdown-arrow">▼</span>
                </button>
                <ul className={`dropdown-menu ${isOnlineCoursesDropdownOpen ? 'open' : ''}`}>
                  <li><Link to="/courses?category=online">Online CITB SSP</Link></li>
                  <li><Link to="/courses?category=online&type=food">Online Food Safety</Link></li>
                  <li><Link to="/courses?category=online&type=health">Online Health & Safety</Link></li>
                </ul>
              </li>

              <li className="nav-item">
                <Link to="/careers" className="nav-link">Careers</Link>
              </li>
              <li className="nav-item">
                <Link to="/blog" className="nav-link">Blog</Link>
              </li>
              <li><Link to="/contact" className={isActive('/contact') ? 'active' : ''}>Contact</Link></li>
            </ul>
          </nav>

          <div className="header-actions">
            <div className="cart-icon">
              <Link to="/cart">
                🛒
                <span className="cart-count">{cartCount}</span>
              </Link>
            </div>
            
            <button 
              className={`mobile-menu-toggle ${isMobileMenuOpen ? 'open' : ''}`}
              onClick={toggleMobileMenu}
              aria-label="Toggle mobile menu"
            >
              <span className="hamburger-line"></span>
              <span className="hamburger-line"></span>
              <span className="hamburger-line"></span>
            </button>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
