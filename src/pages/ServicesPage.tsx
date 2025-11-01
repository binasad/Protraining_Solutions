import React from 'react';
import { Link } from 'react-router-dom';
import './ServicesPage.css';

const ServicesPage: React.FC = () => {
  return (
    <div className="services-page">
      {/* Header Section */}
      <section className="services-header">
        <div className="container">
          <h1>Our Training & Consultancy Services</h1>
          <p>Comprehensive training solutions designed to meet UK regulatory requirements and industry best practices.</p>
        </div>
      </section>

      {/* Food Safety Training */}
      <section className="service-detail-section">
        <div className="container">
          <div className="service-content">
            <div className="service-text">
              <h2>Food Safety Training</h2>
              <p>Our food safety training programs are designed to meet the highest standards and regulatory requirements. We offer comprehensive courses that cover all aspects of food safety management.</p>
              
              <div className="service-features">
                <h3>Course Offerings:</h3>
                <ul>
                  <li>Level 1, 2 & 3 Food Safety & Hygiene</li>
                  <li>HACCP Implementation & Management</li>
                  <li>Food Allergen Awareness Training</li>
                  <li>Food Safety Management Systems</li>
                  <li>Supervisor Food Safety Training</li>
                </ul>
              </div>
              
              <div className="service-benefits">
                <h3>Key Benefits:</h3>
                <ul>
                  <li>Accredited by leading awarding bodies</li>
                  <li>Compliant with UK food safety regulations</li>
                  <li>Practical, hands-on learning approach</li>
                  <li>Certification valid for 3 years</li>
                </ul>
              </div>
            </div>
            <div className="service-image">
              <img 
                src="https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80" 
                alt="Food Safety Training"
                className="service-detail-img"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Health & Safety Training */}
      <section className="service-detail-section alt-bg">
        <div className="container">
          <div className="service-content reverse">
            <div className="service-image">
              <img 
                src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80" 
                alt="Health & Safety Training"
                className="service-detail-img"
              />
            </div>
            <div className="service-text">
              <h2>Health & Safety Training</h2>
              <p>Our health and safety training programs are accredited by NEBOSH, IOSH, and CIEH, providing comprehensive coverage of workplace safety management and compliance.</p>
              
              <div className="service-features">
                <h3>Course Offerings:</h3>
                <ul>
                  <li>NEBOSH National General Certificate</li>
                  <li>IOSH Managing Safely</li>
                  <li>CIEH Level 2 & 3 Health & Safety</li>
                  <li>Risk Assessment Training</li>
                  <li>Manual Handling & Ergonomics</li>
                </ul>
              </div>
              
              <div className="service-benefits">
                <h3>Key Benefits:</h3>
                <ul>
                  <li>Internationally recognized qualifications</li>
                  <li>Compliant with UK HSE requirements</li>
                  <li>Flexible learning options available</li>
                  <li>Ongoing support and guidance</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Consultancy Services */}
      <section className="service-detail-section">
        <div className="container">
          <div className="service-content">
            <div className="service-text">
              <h2>Consultancy Services</h2>
              <p>Our expert consultancy services help organizations develop and implement effective safety management systems, ensuring compliance and continuous improvement.</p>
              
              <div className="service-features">
                <h3>Service Offerings:</h3>
                <ul>
                  <li>Safety Management System Development</li>
                  <li>Compliance Audits & Gap Analysis</li>
                  <li>Policy & Procedure Development</li>
                  <li>Incident Investigation & Reporting</li>
                  <li>Regulatory Compliance Guidance</li>
                </ul>
              </div>
              
              <div className="service-benefits">
                <h3>Key Benefits:</h3>
                <ul>
                  <li>Tailored solutions for your business</li>
                  <li>Expert guidance from qualified consultants</li>
                  <li>Proven track record of success</li>
                  <li>Ongoing support and maintenance</li>
                </ul>
              </div>
            </div>
            <div className="service-image">
              <img 
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80" 
                alt="Consultancy Services"
                className="service-detail-img"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="services-cta">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Get Started?</h2>
            <p>Contact us today to discuss your training and consultancy needs. Our team of experts is ready to help you achieve your safety and compliance goals.</p>
            <div className="cta-buttons">
              <Link to="/contact" className="btn btn-primary">Get a Quote</Link>
              <Link to="/accreditations" className="btn btn-secondary">View Accreditations</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServicesPage;
