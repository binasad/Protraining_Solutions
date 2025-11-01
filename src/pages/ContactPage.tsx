import React, { useState, useEffect } from 'react';
import './ContactPage.css';

// Google Maps types
declare global {
  interface Window {
    google: any;
  }
}

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    message: ''
  });

  useEffect(() => {
    // Load Google Maps API with better error handling
    const loadMap = () => {
      try {
        // Check if Google Maps is already loaded
        if (window.google && window.google.maps) {
          console.log('Google Maps already loaded');
          initMap();
          return;
        }

        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyCKRrsypueM8dOQP1K52yI07yRJwYKDL4A`;
        script.async = true;
        script.defer = true;
        
        script.onload = () => {
          console.log('Google Maps API loaded successfully');
          // Wait a bit for the API to fully initialize
          setTimeout(() => {
            initMap();
          }, 1000);
        };
        
        script.onerror = () => {
          console.error('Failed to load Google Maps API');
          showMapError();
        };
        
        document.head.appendChild(script);
      } catch (error) {
        console.error('Error loading Google Maps:', error);
        showMapError();
      }
    };

    // Load map after a short delay
    const timer = setTimeout(loadMap, 500);
    
    return () => {
      clearTimeout(timer);
    };
  }, []);

  const showMapError = () => {
    const mapElement = document.getElementById('map');
    if (mapElement) {
      mapElement.innerHTML = `
        <div class="map-error">
          <h3>Map Loading Error</h3>
          <p>We're unable to load the map at the moment.</p>
          <p>Please contact us directly for directions:</p>
          <p><strong>Office No 32 Quantum Offices, 2nd Floor, High Steet, Ilford, England, IG1 1QB</strong></p>
          <p>Phone: 0203 488 2333</p>
        </div>
      `;
    }
  };

  const initMap = () => {
    console.log('Initializing map...');
    
    try {
      if (typeof window.google === 'undefined' || !window.google.maps) {
        console.error('Google Maps API not fully loaded');
        showMapError();
        return;
      }

      const mapElement = document.getElementById('map');
      if (!mapElement) {
        console.error('Map element not found');
        return;
      }

      console.log('Creating map...');
      const officeLocation = { lat: 51.5588, lng: 0.0710 }; // Ilford, London coordinates - Updated for new office
      
      const map = new window.google.maps.Map(mapElement, {
        zoom: 15,
        center: officeLocation,
        mapTypeId: window.google.maps.MapTypeId.ROADMAP,
        disableDefaultUI: false,
        zoomControl: true,
        streetViewControl: false,
        fullscreenControl: false
      });

      console.log('Map created successfully');

      new window.google.maps.Marker({
        position: officeLocation,
        map: map,
        title: 'Synergy Safety Solutions',
        label: {
          text: 'Synergy Safety Solutions',
          className: 'map-marker-label'
        }
      });

      console.log('Marker added successfully');
    } catch (error) {
      console.error('Error creating map:', error);
      showMapError();
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
  };

  return (
    <div className="contact-page">
      {/* Header Section */}
      <section className="contact-header">
        <div className="container">
          <h1>Contact Us</h1>
          <p>Get in touch with our team for training enquiries, consultancy services, or general business matters.</p>
        </div>
      </section>

      {/* Contact Information & Form Section */}
      <section className="contact-main-section">
        <div className="container">
          <div className="contact-grid">
            {/* Contact Information */}
            <div className="contact-info">
              <h2>Get In Touch</h2>
              
              <div className="contact-details">
                <div className="contact-item">
                  <div className="contact-icon">📍</div>
                  <div className="contact-content">
                    <h4>Office Address</h4>
                    <p>Office No 32 Quantum Offices, 2nd Floor, High Steet, Ilford, England, IG1 1QB</p>
                  </div>
                </div>
                
                <div className="contact-item">
                  <div className="contact-icon">🕐</div>
                  <div className="contact-content">
                    <h4>Office Hours</h4>
                    <p>09:00 to 17:00</p>
                  </div>
                </div>
                
                <div className="contact-item">
                  <div className="contact-icon">📞</div>
                  <div className="contact-content">
                    <h4>Phone</h4>
                    <p>0203 488 2333</p>
                  </div>
                </div>
                
                <div className="contact-item">
                  <div className="contact-icon">✉️</div>
                  <div className="contact-content">
                    <h4>Email</h4>
                    <p>info@synergysafetysolutions.co.uk</p>
                  </div>
                </div>
              </div>
              
              <div className="company-details">
                <h4>Company Details</h4>
                <div className="details-list">
                  <p><strong>Company Name:</strong> Synergy Safety Solutions Ltd</p>
                  <p><strong>Registration Number:</strong> 12344336</p>

                </div>
              </div>
            </div>
            
            {/* Contact Form */}
            <div className="contact-form">
              <h2>Send us a Message</h2>
              <form onSubmit={handleSubmit}>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="firstName">First Name *</label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      placeholder="Enter your first name"
                      required
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="lastName">Last Name *</label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      placeholder="Enter your last name"
                      required
                    />
                  </div>
                </div>
                
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="email">Email Address *</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Enter your email address"
                      required
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="phone">Phone Number</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Enter your phone number"
                    />
                  </div>
                </div>
                
                <div className="form-group">
                  <label htmlFor="company">Company Name</label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    placeholder="Enter your company name"
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="message">Message *</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us about your enquiry..."
                    rows={6}
                    required
                  ></textarea>
                </div>
                
                <div className="form-group">
                  <button type="submit" className="btn btn-primary">
                    Send Message
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Additional Information Section */}
      <section className="contact-additional">
        <div className="container">
          <div className="additional-grid">
            <div className="additional-item">
              <h3>Training Enquiries</h3>
              <p>Interested in our safety training courses? Get in touch to discuss your requirements and get a personalized quote.</p>
            </div>
            
            <div className="additional-item">
              <h3>Consultancy Services</h3>
              <p>Need expert safety consultancy for your business? Our team can help with compliance, risk assessment, and more.</p>
            </div>
            
            <div className="additional-item">
              <h3>General Support</h3>
              <p>Have questions about our services or need assistance? We're here to help with any queries you may have.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Google Maps Section */}
      <section className="map-section">
        <div className="container">
          <h2>Find Us</h2>
          <p>Visit our office at Office No 32 Quantum Offices, 2nd Floor, High Steet, Ilford, England, IG1 1QB</p>
          <div id="map" className="google-map">
            <div className="map-loading">
              <p>Loading map...</p>
              <p>If the map doesn't load, please refresh the page.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
