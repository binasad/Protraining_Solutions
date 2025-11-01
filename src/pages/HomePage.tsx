import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';

const HomePage: React.FC = () => {
  const [videoError, setVideoError] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [statsVisible, setStatsVisible] = useState(false);
  const statsRef = useRef<HTMLDivElement>(null);

  const handleVideoError = () => {
    setVideoError(true);
  };

  useEffect(() => {
    // Trigger hero animations after component mounts
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);

    // Intersection Observer for stats section
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStatsVisible(true);
        }
      },
      {
        threshold: 0.3,
        rootMargin: '0px 0px -100px 0px'
      }
    );

    const currentStatsRef = statsRef.current;
    if (currentStatsRef) {
      observer.observe(currentStatsRef);
    }

    return () => {
      clearTimeout(timer);
      if (currentStatsRef) {
        observer.unobserve(currentStatsRef);
      }
    };
  }, []);

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero">
        {/* Background Video */}
        {!videoError && (
          <div className="hero-video-background">
            <video 
              autoPlay 
              muted 
              loop 
              playsInline
              className="hero-video"
              onError={handleVideoError}
            >
              <source src="/peopleOffice.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <div className="hero-video-overlay"></div>
            
            {/* Animated Background Elements */}
            <div className="floating-elements">
              <div className="floating-element element-1"></div>
              <div className="floating-element element-2"></div>
              <div className="floating-element element-3"></div>
              <div className="floating-element element-4"></div>
            </div>
          </div>
        )}
        
        {/* Fallback Background (shows if video fails to load) */}
        {videoError && (
          <div className="hero-fallback-background">
            <div className="hero-fallback-pattern"></div>
            <div className="hero-video-overlay"></div>
            
            {/* Animated Background Elements */}
            <div className="floating-elements">
              <div className="floating-element element-1"></div>
              <div className="floating-element element-2"></div>
              <div className="floating-element element-3"></div>
              <div className="floating-element element-4"></div>
            </div>
          </div>
        )}
        
        <div className="hero-content">
          <div className={`hero-text ${isVisible ? 'animate-in' : ''}`}>
            <h1 className="hero-title-animate">
              <span className="hero-title-line-1">Award winning</span>
              <span className="hero-title-line-2">Training Provider for</span>
              <span className="hero-title-line-3">An alternative to</span>
              <span className="hero-title-line-4">college</span>
            </h1>
            <p className="hero-description-animate">Leading UK provider of Health & Safety training and safety consultancy with over 15 years of industry expertise.</p>
            <div className="hero-buttons">
              <Link to="/services" className="btn btn-primary btn-animate">Our Services</Link>
              <Link to="/contact" className="btn btn-secondary btn-animate">Get Quote</Link>
            </div>
          </div>
        </div>
        
        {/* Animated Stats Preview */}
        <div className="hero-stats-preview">
          <div className="stat-preview-item">
            <span className="stat-preview-number">15+</span>
            <span className="stat-preview-label">Years</span>
          </div>
          <div className="stat-preview-item">
            <span className="stat-preview-number">5000+</span>
            <span className="stat-preview-label">Trained</span>
          </div>
          <div className="stat-preview-item">
            <span className="stat-preview-number">98%</span>
            <span className="stat-preview-label">Success</span>
          </div>
        </div>
        
        <div className="hero-bottom">
          <p className="hero-bottom-text">Established UK Training Provider</p>
        </div>
      </section>

      {/* Company Stats Section */}
      <section className="stats-section" ref={statsRef}>
        <div className="container">
          <div className="stats-grid">
            <div className={`stat-item ${statsVisible ? 'animate-in' : ''}`} style={{ animationDelay: '0.1s' }}>
              <div className="stat-number">15+</div>
              <div className="stat-label">Years Experience</div>
            </div>
            <div className={`stat-item ${statsVisible ? 'animate-in' : ''}`} style={{ animationDelay: '0.2s' }}>
              <div className="stat-number">5000+</div>
              <div className="stat-label">Trained Professionals</div>
            </div>
            <div className={`stat-item ${statsVisible ? 'animate-in' : ''}`} style={{ animationDelay: '0.3s' }}>
              <div className="stat-number">98%</div>
              <div className="stat-label">Success Rate</div>
            </div>
            <div className={`stat-item ${statsVisible ? 'animate-in' : ''}`} style={{ animationDelay: '0.4s' }}>
              <div className="stat-number">200+</div>
              <div className="stat-label">Corporate Clients</div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="services-overview">
        <div className="container">
          <h2>Our Core Services</h2>
          <div className="services-grid">
            <div className="service-card">
              <img 
                src="https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80" 
                alt="Food Safety Training"
                className="service-img"
              />
              <h3>Food Safety Training</h3>
              <p>Comprehensive food safety courses including HACCP, Level 2 & 3 Food Safety, and allergen management.</p>
              <Link to="/services" className="btn btn-outline">View Courses</Link>
            </div>
            <div className="service-card">
              <img 
                src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80" 
                alt="Health & Safety Training"
                className="service-img"
              />
              <h3>Health & Safety Training</h3>
              <p>NEBOSH, IOSH, and CIEH accredited health and safety training programs for all industry levels.</p>
              <Link to="/contact" className="btn btn-outline">Get Certified</Link>
            </div>
            <div className="service-card">
              <img 
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80" 
                alt="Consultancy Services"
                className="service-img"
              />
              <h3>Consultancy Services</h3>
              <p>Expert consultancy for compliance, risk assessment, and implementation of safety management systems.</p>
              <Link to="/services" className="btn btn-outline">Book Consultation</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Careers Section */}
      <section className="careers-section">
        <div className="container">
          <h2>Join Our Team</h2>
          <p>Be part of a company that's making workplaces safer across the UK</p>
          <div className="careers-content">
            <div className="careers-text">
              <h3>Why Work With Us?</h3>
              <ul>
                <li>Industry-leading training and development</li>
                <li>Flexible working arrangements</li>
                <li>Competitive salary and benefits</li>
                <li>Make a real impact on workplace safety</li>
              </ul>
            </div>
            <div className="careers-cta">
              <Link to="/careers" className="btn btn-primary">View Open Positions</Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Enhance Your Team's Safety Standards?</h2>
            <p>Join hundreds of companies who trust Synergy Safety Solutions for their training and compliance needs.</p>
            <div className="cta-buttons">
              <Link to="/contact" className="btn btn-primary">Get Started Today</Link>
              <Link to="/about" className="btn btn-secondary">Learn About Us</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;

