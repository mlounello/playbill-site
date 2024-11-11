// src/components/ShowCard.js

import React from 'react';
import './ShowCard.css'; // Ensure this CSS file exists

const ShowCard = ({ show }) => {
  const handleClick = () => {
    // For now, we'll use an alert. We'll implement routing in a later step.
    alert(`Clicked on ${show.title}`);
  };

  return (
    <div className="show-card" onClick={handleClick}>
      <img src={show.poster} alt={`${show.title} Poster`} className="show-poster" />
      <h3 className="show-title">{show.title}</h3>
    </div>
  );
};

export default ShowCard;