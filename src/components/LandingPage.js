// src/components/LandingPage.js

import React from 'react';
import ShowsList from './ShowsList';
import './LandingPage.css'; // Create this CSS file for additional styling if needed

const LandingPage = () => {
  return (
    <div className="landing-page">
      <header className="landing-header">
        <h1>Welcome to Our Shows</h1>
        {/* Remove or update any "Home" buttons here if present */}
      </header>
      <ShowsList />
    </div>
  );
};

export default LandingPage;