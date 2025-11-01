import React from 'react';
import { Link } from 'react-router-dom';
import './CSCSCourses.css';

const CSCSCourses: React.FC = () => {
  return (
    <div className="cscs-courses-page">
      <div className="container">
        <div className="courses-header">
          <h1>CSCS Labourers Green Card</h1>
          <p>Construction Skills Certification Scheme training</p>
        </div>
        
        <div className="courses-content">
          <p>CSCS courses coming soon!</p>
          <Link to="/courses/citb-ssp" className="btn btn-primary">
            View CITB Courses
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CSCSCourses;
