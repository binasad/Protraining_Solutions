import React from 'react';
import { Link } from 'react-router-dom';
import './FireSafetyCourses.css';

const FireSafetyCourses: React.FC = () => {
  return (
    <div className="fire-safety-courses-page">
      <div className="container">
        <div className="courses-header">
          <h1>Fire Safety Courses</h1>
          <p>Essential fire safety and prevention training</p>
        </div>
        
        <div className="courses-content">
          <p>Fire Safety courses coming soon!</p>
          <Link to="/courses/citb-ssp" className="btn btn-primary">
            View CITB Courses
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FireSafetyCourses;
