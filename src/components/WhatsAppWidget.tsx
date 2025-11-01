import React, { useState } from 'react';
import './WhatsAppWidget.css';

const WhatsAppWidget: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleWhatsAppClick = () => {
    // Your actual WhatsApp number
    const phoneNumber = '442034882333'; // 0203 488 2333 (without + symbol)
    const message = 'Hi! I\'m interested in your safety training courses. Can you help me?';
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="whatsapp-widget">
      {isExpanded && (
        <div className="whatsapp-popup">
          <div className="popup-header">
            <h3>Chat with us on WhatsApp</h3>
            <button 
              className="close-btn"
              onClick={toggleExpanded}
              aria-label="Close WhatsApp popup"
            >
              ×
            </button>
          </div>
          <div className="popup-content">
            <p>Get instant support and answers to your questions about our safety training courses.</p>
            <div className="contact-info">
              <p><strong>Available:</strong> Mon-Fri 9:00 AM - 6:00 PM</p>
              <p><strong>Response time:</strong> Usually within 5 minutes</p>
              <p><strong>WhatsApp:</strong> 0203 488 2333</p>
            </div>
            <button 
              className="whatsapp-chat-btn"
              onClick={handleWhatsAppClick}
            >
              <span className="whatsapp-icon">💬</span>
              Start Chat Now
            </button>
          </div>
        </div>
      )}
      
      <button 
        className="whatsapp-button"
        onClick={toggleExpanded}
        aria-label="Open WhatsApp chat"
      >
        <div className="whatsapp-icon">📱</div>
        <div className="whatsapp-text">
          <span className="whatsapp-label">WhatsApp</span>
          <span className="chat-now">Chat with us now!</span>
        </div>
      </button>
    </div>
  );
};

export default WhatsAppWidget;
