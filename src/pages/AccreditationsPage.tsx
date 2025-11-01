import React from 'react';
import './AccreditationsPage.css';

const AccreditationsPage: React.FC = () => {
  return (
    <div className="accreditations-page">
      {/* Header Section */}
      <section className="accreditations-header">
        <div className="container">
          <div className="header-content">
            <div className="header-text">
              <h1>Accreditations & Memberships</h1>
              <p>Our professional certifications and industry memberships demonstrate our commitment to maintaining the highest standards in training delivery.</p>
            </div>
            <div className="header-image">
              <img 
                src="https://images.unsplash.com/photo-1559136555-9303baea8ebd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80" 
                alt="Professional training facility"
                className="accreditations-hero-img"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Approved Training Provider */}
      <section className="accreditations-section">
        <div className="container">
          <h2>Approved Training Provider</h2>
          <div className="accreditations-grid">
            <div className="accreditation-card">
              <div className="accreditation-logo">NEBOSH</div>
              <h3>NEBOSH Approved</h3>
              <p>Approved training provider for NEBOSH qualifications including the National General Certificate and Diploma programs.</p>
              <div className="accreditation-details">
                <span className="status approved">✓ Approved</span>
                <span className="validity">Valid until: 2026</span>
              </div>
            </div>
            
            <div className="accreditation-card">
              <div className="accreditation-logo">IOSH</div>
              <h3>IOSH Approved</h3>
              <p>Authorized training provider for IOSH courses including Managing Safely and Working Safely programs.</p>
              <div className="accreditation-details">
                <span className="status approved">✓ Approved</span>
                <span className="validity">Valid until: 2026</span>
              </div>
            </div>
            
            <div className="accreditation-card">
              <div className="accreditation-logo">CIEH</div>
              <h3>CIEH Approved</h3>
              <p>Certified training provider for CIEH qualifications in Food Safety and Health & Safety at all levels.</p>
              <div className="accreditation-details">
                <span className="status approved">✓ Approved</span>
                <span className="validity">Valid until: 2026</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Additional Certifications */}
      <section className="certifications-section">
        <div className="container">
          <h2>Additional Certifications</h2>
          <div className="certifications-grid">
            <div className="certification-item">
              <div className="certification-icon">🏆</div>
              <h3>HACCP Certification</h3>
              <p>Hazard Analysis and Critical Control Point certification for food safety management systems.</p>
            </div>
            
            <div className="certification-item">
              <div className="certification-icon">📋</div>
              <h3>ISO 9001:2015</h3>
              <p>Quality Management System certification demonstrating our commitment to continuous improvement.</p>
            </div>
            
            <div className="certification-item">
              <div className="certification-icon">🛡️</div>
              <h3>OHSAS 18001</h3>
              <p>Occupational Health and Safety Management System certification for workplace safety standards.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Industry Memberships */}
      <section className="memberships-section">
        <div className="container">
          <h2>Industry Memberships</h2>
          <div className="memberships-grid">
            <div className="membership-item">
              <div className="membership-logo">🏢</div>
              <h3>British Safety Council</h3>
              <p>Full corporate membership with access to industry resources and networking opportunities.</p>
            </div>
            
            <div className="membership-item">
              <div className="membership-logo">🍽️</div>
              <h3>Food Standards Agency</h3>
              <p>Registered training provider with the Food Standards Agency for food safety training programs.</p>
            </div>
            
            <div className="membership-item">
              <div className="membership-logo">🏭</div>
              <h3>Institution of Occupational Safety and Health</h3>
              <p>Corporate membership providing access to the latest health and safety research and best practices.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Quality Assurance */}
      <section className="quality-assurance">
        <div className="container">
          <h2>Quality Assurance</h2>
          <div className="quality-features">
            <div className="quality-feature">
              <div className="feature-icon">📊</div>
              <h3>Regular Audits</h3>
              <p>Annual audits by awarding bodies ensure our training standards remain at the highest level.</p>
            </div>
            
            <div className="quality-feature">
              <div className="feature-icon">👨‍🏫</div>
              <h3>Qualified Trainers</h3>
              <p>All our trainers hold relevant qualifications and undergo continuous professional development.</p>
            </div>
            
            <div className="quality-feature">
              <div className="feature-icon">📈</div>
              <h3>Continuous Improvement</h3>
              <p>Regular review and update of training materials to reflect current regulations and best practices.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AccreditationsPage;
