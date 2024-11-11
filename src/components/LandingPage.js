// src/components/LandingPage.js

import React from 'react';
import shows from '../data/shows';
import ShowCard from './ShowCard';
import './LandingPage.css';

const LandingPage = () => {
  return (
    <div className="landing-page">
      <header className="landing-header">
        <h1>Siena College Productions</h1>
        <p>Welcome to our Digital Playbill</p>
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