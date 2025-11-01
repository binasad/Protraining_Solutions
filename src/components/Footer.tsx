import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>Synergy Safety Solutions</h3>
            <p>Leading provider of professional safety training and consultancy services across the UK.</p>
          </div>
          
          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/courses/citb-ssp">Our Courses</Link></li>
              <li><Link to="/contact">Contact</Link></li>
              <li><Link to="/policies">Policies</Link></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h4>Contact Info</h4>
            <p>Phone: 0203 488 2333</p>
            <p>Email: info@synergysafetysolutions.co.uk</p>
            <p>Address: Office No 32 Quantum Offices, 2nd Floor, High Steet, Ilford, England, IG1 1QB</p>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; 2025 Synergy Safety Solutions. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
