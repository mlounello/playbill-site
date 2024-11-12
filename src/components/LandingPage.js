// src/components/LandingPage.js

import React from 'react';
import ShowsList from './ShowsList';
import './LandingPage.css';

const LandingPage = () => {
  return (
    <div className="landing-page">
      <header className="landing-header">
        <h1>Welcome to Our Show Collection</h1>
        <p>Explore our latest productions and their details below.</p>
      </header>
      <ShowsList />
    </div>
  );
};

export default LandingPage;