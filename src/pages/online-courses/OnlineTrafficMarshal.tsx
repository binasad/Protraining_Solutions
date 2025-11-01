import React from 'react';
import { Link } from 'react-router-dom';
import './OnlineTrafficMarshal.css';

const OnlineTrafficMarshal: React.FC = () => {
  return (
    <div className="online-traffic-marshal-page">
      <div className="container">
        <div className="courses-header">
          <h1>Online Traffic Marshal</h1>
          <p>Flexible online traffic management training</p>
        </div>
        
        <div className="courses-content">
          <p>Online Traffic Marshal courses coming soon!</p>
          <Link to="/courses/traffic-marshal" className="btn btn-primary">
            View In-Person Courses
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OnlineTrafficMarshal;
