import React from 'react';
import { Link } from 'react-router-dom';
import './OnlineCITBSSP.css';

const OnlineCITBSSP: React.FC = () => {
  return (
    <div className="online-citb-ssp-page">
      <div className="container">
        <div className="courses-header">
          <h1>Online CITB SSP Courses</h1>
          <p>Flexible online training for construction safety</p>
        </div>
        
        <div className="courses-content">
          <p>Online CITB SSP courses coming soon!</p>
          <Link to="/courses/citb-ssp" className="btn btn-primary">
            View In-Person Courses
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OnlineCITBSSP;
