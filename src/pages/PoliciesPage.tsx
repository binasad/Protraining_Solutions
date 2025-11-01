import React from 'react';
import './PoliciesPage.css';

const PoliciesPage: React.FC = () => {
  return (
    <div className="policies-page">
      {/* Header Section */}
      <section className="policies-header">
        <div className="container">
          <h1>Company Policies</h1>
          <p>Our commitment to transparency, compliance, and best practices in all aspects of our business operations.</p>
        </div>
      </section>

      {/* Policies Grid */}
      <section className="policies-section">
        <div className="container">
          <div className="policies-grid">
            <div className="policy-card">
              <div className="policy-icon privacy">🔒</div>
              <h2>Privacy Policy</h2>
              <p>How we collect, use, and protect your personal information in compliance with GDPR and UK data protection laws.</p>
              <div className="policy-details">
                <h3>Key Points:</h3>
                <ul>
                  <li>Data collection and processing purposes</li>
                  <li>Your rights under GDPR</li>
                  <li>Data retention policies</li>
                  <li>Contact information for data queries</li>
                </ul>
              </div>
              <button className="btn btn-secondary">View Full Policy</button>
            </div>
            
            <div className="policy-card">
              <div className="policy-icon equality">🤝</div>
              <h2>Equality & Diversity</h2>
              <p>Our commitment to creating an inclusive workplace that values diversity and promotes equal opportunities for all.</p>
              <div className="policy-details">
                <h3>Key Points:</h3>
                <ul>
                  <li>Equal opportunity employment</li>
                  <li>Anti-discrimination measures</li>
                  <li>Diversity and inclusion initiatives</li>
                  <li>Complaint procedures</li>
                </ul>
              </div>
              <button className="btn btn-secondary">View Full Policy</button>
            </div>
            
            <div className="policy-card">
              <div className="policy-icon modern-slavery">🚫</div>
              <h2>Modern Slavery Statement</h2>
              <p>Our commitment to preventing modern slavery and human trafficking in our business operations and supply chain.</p>
              <div className="policy-details">
                <h3>Key Points:</h3>
                <ul>
                  <li>Risk assessment procedures</li>
                  <li>Supplier due diligence</li>
                  <li>Training and awareness</li>
                  <li>Reporting mechanisms</li>
                </ul>
              </div>
              <button className="btn btn-secondary">View Full Policy</button>
            </div>
            
            <div className="policy-card">
              <div className="policy-icon accessibility">♿</div>
              <h2>Accessibility Statement</h2>
              <p>Our commitment to making our services accessible to all users, including those with disabilities.</p>
              <div className="policy-details">
                <h3>Key Points:</h3>
                <ul>
                  <li>Website accessibility features</li>
                  <li>Training venue accessibility</li>
                  <li>Communication accessibility</li>
                  <li>Feedback and improvement process</li>
                </ul>
              </div>
              <button className="btn btn-secondary">View Full Policy</button>
            </div>
            
            <div className="policy-card">
              <div className="policy-icon health-safety">🛡️</div>
              <h2>Health & Safety Policy</h2>
              <p>Our commitment to maintaining the highest standards of health and safety for our employees and clients.</p>
              <div className="policy-details">
                <h3>Key Points:</h3>
                <ul>
                  <li>Risk assessment procedures</li>
                  <li>Training and supervision</li>
                  <li>Incident reporting</li>
                  <li>Emergency procedures</li>
                </ul>
              </div>
              <button className="btn btn-secondary">View Full Policy</button>
            </div>
            
            <div className="policy-card">
              <div className="policy-icon quality">✅</div>
              <h2>Quality Management</h2>
              <p>Our commitment to delivering high-quality training and consultancy services that meet industry standards.</p>
              <div className="policy-details">
                <h3>Key Points:</h3>
                <ul>
                  <li>Quality standards and procedures</li>
                  <li>Continuous improvement processes</li>
                  <li>Customer feedback systems</li>
                  <li>Performance monitoring</li>
                </ul>
              </div>
              <button className="btn btn-secondary">View Full Policy</button>
            </div>
          </div>
        </div>
      </section>

      {/* Policy Updates */}
      <section className="policy-updates">
        <div className="container">
          <h2>Policy Updates</h2>
          <p>Our policies are regularly reviewed and updated to ensure compliance with current legislation and best practices.</p>
          
          <div className="update-info">
            <div className="update-item">
              <h3>Last Review Date</h3>
              <p>January 2025</p>
            </div>
            
            <div className="update-item">
              <h3>Next Review Date</h3>
              <p>January 2026</p>
            </div>
            
            <div className="update-item">
              <h3>Policy Owner</h3>
              <p>HR & Compliance Team</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact for Policies */}
      <section className="policy-contact">
        <div className="container">
          <h2>Questions About Our Policies?</h2>
          <p>If you have any questions about our policies or need clarification on any points, please contact our compliance team.</p>
          
          <div className="contact-methods">
            <div className="contact-method">
              <h3>Email</h3>
              <p>info@synergysafetysolutions.co.uk</p>
            </div>
            
            <div className="contact-method">
              <h3>Phone</h3>
              <p>0203 488 2333 ext. 3</p>
            </div>
            
            <div className="contact-method">
              <h3>Post</h3>
              <p>Office No 32 Quantum Offices, 2nd Floor, High Steet, Ilford, England, IG1 1QB</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PoliciesPage;
