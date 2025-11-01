import React from 'react';
import { Link } from 'react-router-dom';
import './HealthSafetyCourses.css';

const HealthSafetyCourses: React.FC = () => {
  return (
    <div className="health-safety-courses-page">
      <div className="container">
        <div className="courses-header">
          <h1>Health & Safety Courses</h1>
          <p>Comprehensive workplace health and safety training</p>
        </div>
        
        <div className="courses-content">
          <p>Health & Safety courses coming soon!</p>
          <Link to="/courses/citb-ssp" className="btn btn-primary">
            View CITB Courses
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HealthSafetyCourses;
