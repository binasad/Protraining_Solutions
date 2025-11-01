import React from 'react';
import { Link } from 'react-router-dom';
import './DealsBundles.css';

const DealsBundles: React.FC = () => {
  return (
    <div className="deals-bundles-page">
      <div className="container">
        <div className="courses-header">
          <h1>Deals & Bundles</h1>
          <p>Special package deals for multiple courses</p>
        </div>
        
        <div className="courses-content">
          <p>Course bundles coming soon!</p>
          <Link to="/courses/citb-ssp" className="btn btn-primary">
            View CITB Courses
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DealsBundles;
