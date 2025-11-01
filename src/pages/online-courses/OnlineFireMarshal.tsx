import React from 'react';
import { Link } from 'react-router-dom';
import './OnlineFireMarshal.css';

const OnlineFireMarshal: React.FC = () => {
  return (
    <div className="online-fire-marshal-page">
      <div className="container">
        <div className="courses-header">
          <h1>Online Fire Marshal</h1>
          <p>Flexible online fire safety training</p>
        </div>
        
        <div className="courses-content">
          <p>Online Fire Marshal courses coming soon!</p>
          <Link to="/courses/fire-safety" className="btn btn-primary">
            View In-Person Courses
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OnlineFireMarshal;
