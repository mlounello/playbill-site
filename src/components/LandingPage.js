// src/components/LandingPage.js

import React from 'react';
import shows from '../data/shows';
import ShowCard from './ShowCard';
import './LandingPage.css'; // Ensure this CSS file exists

const LandingPage = () => {
  return (
    <div className="landing-page">
      <header className="landing-header">
        {/* Centered Logo */}
        <img
          src="/images/DOMEMARK_RGB_YellowDomeGreenText.png"
          alt="Siena College Logo"
          className="siena-logo"
        />
        <h1>Siena College Performing Arts</h1>
        <p>Please select a Playbill below:</p>
      </header>
      <div className="shows-grid">
        {shows.map((show) => (
          <ShowCard key={show.id} show={show} />
        ))}
      </div>
    </div>
  );
};

export default LandingPage;