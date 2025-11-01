import React from 'react';
import { Link } from 'react-router-dom';
import './FirstAidCourses.css';

const FirstAidCourses: React.FC = () => {
  return (
    <div className="first-aid-courses-page">
      <div className="container">
        <div className="courses-header">
          <h1>First Aid Courses</h1>
          <p>Essential first aid training for workplace safety</p>
        </div>
        
        <div className="courses-content">
          <p>First Aid courses coming soon!</p>
          <Link to="/courses/citb-ssp" className="btn btn-primary">
            View CITB Courses
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FirstAidCourses;
