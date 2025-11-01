import React from 'react';
import { Link } from 'react-router-dom';
import './IOSHCourses.css';

const IOSHCourses: React.FC = () => {
  return (
    <div className="iosh-courses-page">
      <div className="container">
        <div className="courses-header">
          <h1>IOSH Courses</h1>
          <p>Professional health and safety training courses</p>
        </div>
        
        <div className="courses-content">
          <p>IOSH courses coming soon!</p>
          <Link to="/courses/citb-ssp" className="btn btn-primary">
            View CITB Courses
          </Link>
        </div>
      </div>
    </div>
  );
};

export default IOSHCourses;
