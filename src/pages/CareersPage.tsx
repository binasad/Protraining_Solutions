import React from 'react';
import './CareersPage.css';

const CareersPage: React.FC = () => {
  return (
    <div className="careers-page">
      {/* Hero Section */}
      <section className="careers-hero">
        <div className="container">
          <h1>Join Our Team</h1>
          <p>Build your career with a leading UK training provider committed to excellence, diversity, and professional development.</p>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="why-choose-section">
        <div className="container">
          <h2>Why Choose ProTraining Solutions?</h2>
          <div className="benefits-grid">
            <div className="benefit-card">
              <div className="benefit-icon career-growth">🏆</div>
              <h3>Career Growth</h3>
              <p>Clear progression pathways with ongoing professional development, training opportunities, and support for professional qualifications.</p>
            </div>
            
            <div className="benefit-card">
              <div className="benefit-icon inclusive-culture">👥</div>
              <h3>Inclusive Culture</h3>
              <p>Diverse, welcoming workplace that values different perspectives and promotes equality of opportunity for all employees.</p>
            </div>
            
            <div className="benefit-card">
              <div className="benefit-icon work-life-balance">💙</div>
              <h3>Work-Life Balance</h3>
              <p>Flexible working arrangements, competitive benefits package, and support for maintaining healthy work-life integration.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Current Opportunities */}
      <section className="opportunities-section">
        <div className="container">
          <h2>Current Opportunities</h2>
          <div className="jobs-grid">
            <div className="job-card">
              <h3>Training Coordinator</h3>
              <p className="job-location">London, UK</p>
              <p className="job-type">Full-time, Permanent</p>
              <p className="job-description">
                Join our training delivery team to coordinate and support the delivery of Food Safety and Health & Safety training programs.
              </p>
              <div className="job-requirements">
                <h4>Requirements:</h4>
                <ul>
                  <li>Experience in training coordination</li>
                  <li>Knowledge of Food Safety or Health & Safety</li>
                  <li>Excellent organizational skills</li>
                  <li>Strong communication abilities</li>
                </ul>
              </div>
              <div className="job-card-actions">
                <button className="btn btn-primary">Apply Now</button>
              </div>
            </div>
            
            <div className="job-card">
              <h3>Health & Safety Trainer</h3>
              <p className="job-location">London, UK</p>
              <p className="job-type">Full-time, Permanent</p>
              <p className="job-description">
                Deliver high-quality Health & Safety training programs to corporate clients across the UK.
              </p>
              <div className="job-requirements">
                <h4>Requirements:</h4>
                <ul>
                  <li>NEBOSH qualification</li>
                  <li>Training delivery experience</li>
                  <li>Industry knowledge</li>
                  <li>Travel flexibility</li>
                </ul>
              </div>
              <div className="job-card-actions">
                <button className="btn btn-primary">Apply Now</button>
              </div>
            </div>
            
            <div className="job-card">
              <h3>Food Safety Consultant</h3>
              <p className="job-location">London, UK</p>
              <p className="job-type">Full-time, Permanent</p>
              <p className="job-description">
                Provide expert consultancy services to food businesses, helping them achieve and maintain food safety compliance.
              </p>
              <div className="job-requirements">
                <h4>Requirements:</h4>
                <ul>
                  <li>HACCP qualification</li>
                  <li>Food industry experience</li>
                  <li>Consultancy skills</li>
                  <li>Regulatory knowledge</li>
                </ul>
              </div>
              <div className="job-card-actions">
                <button className="btn btn-primary">Apply Now</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Application Process */}
      <section className="application-process">
        <div className="container">
          <h2>Application Process</h2>
          <div className="process-steps">
            <div className="step">
              <div className="step-number">1</div>
              <h3>Submit Application</h3>
              <p>Complete our online application form with your CV and cover letter</p>
            </div>
            
            <div className="step">
              <div className="step-number">2</div>
              <h3>Initial Review</h3>
              <p>Our HR team will review your application within 5 working days</p>
            </div>
            
            <div className="step">
              <div className="step-number">3</div>
              <h3>Interview Process</h3>
              <p>Successful candidates will be invited for an interview and assessment</p>
            </div>
            
            <div className="step">
              <div className="step-number">4</div>
              <h3>Offer & Onboarding</h3>
              <p>Successful candidates will receive an offer and begin our onboarding process</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact HR */}
      <section className="contact-hr">
        <div className="container">
          <h2>Questions About Working With Us?</h2>
          <p>Our HR team is here to help with any questions about careers at ProTraining Solutions</p>
          <div className="hr-contact-info">
            <div className="contact-item">
              <strong>Email:</strong> info@synergysafetysolutions.co.uk
            </div>
            <div className="contact-item">
              <strong>Phone:</strong> 0203 488 2333 ext. 2
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CareersPage;
