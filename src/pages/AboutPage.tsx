import React from 'react';
import './AboutPage.css';

const AboutPage: React.FC = () => {
  return (
    <div className="about-page">
      {/* Hero Banner with Background Image */}
      <section className="about-hero">
        <div className="hero-background">
          <img 
            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80" 
            alt="Professional team collaboration"
            className="hero-bg-image"
          />
          <div className="hero-overlay"></div>
        </div>
        <div className="hero-text-overlay">
          <h1>ABOUT US</h1>
          <h2>Synergy Safety Solutions</h2>
          <div className="about-description">
            <p>At Synergy Safety Solutions we are a team of highly qualified and highly enthusiastic practitioners with several years of teaching experience and learning delivery.</p>
            <p>Fitted with the excellent knowledge and skills required to deliver their jobs around the country and beyond in a secure and successful manner.</p>
            <p>Our mission is to provide high-quality training that helps individuals to advance and develop outstanding career skills across a wide range of industry sectors such as health and safety, construction, defense, and hospitality.</p>
            <p>We feel comfortable and pride in providing first class instruction using a variety of teaching methods to fit various learner styles.</p>
          </div>
        </div>
      </section>

      {/* Leadership Team */}
      <section className="leadership-section">
        <div className="container">
          <h2>Our Leadership</h2>
          <div className="team-grid">
            <div className="team-member">
              <h3>Muhammad Waseem Iqbal</h3>
              <p className="position">Managing Director</p>
              <p className="experience">Professional trainer and Assessor from 10 years</p>
              <p className="bio">With over years of experience in health and safety, Muhammad leads our organization with a focus on innovation and excellence in training delivery.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
