import React from 'react';
import { Link } from 'react-router-dom';
import './TrafficMarshalCourses.css';

const TrafficMarshalCourses: React.FC = () => {
  return (
    <div className="traffic-marshal-courses-page">
      <div className="container">
        <div className="courses-header">
          <h1>Traffic Marshal / Banksman Courses</h1>
          <p>Professional traffic management and vehicle safety training</p>
        </div>
        
        <div className="courses-content">
          <p>Traffic Marshal courses coming soon!</p>
          <Link to="/courses/citb-ssp" className="btn btn-primary">
            View CITB Courses
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TrafficMarshalCourses;
