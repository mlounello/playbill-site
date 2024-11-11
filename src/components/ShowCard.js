// src/components/ShowCard.js

import React from 'react';
import { Link } from 'react-router-dom';
import './ShowCard.css';

const ShowCard = ({ show }) => {
  return (
    <Link to={`/shows/${show.id}`} className="show-card-link">
      <div className="show-card">
        <img
          src={show.poster}
          alt={`${show.title} Poster`}
          className="show-poster"
        />
        <h3 className="show-title">{show.title}</h3>
        {/* Optional: Add a "Learn More" Button */}
        {/* <button className="learn-more-button">Learn More</button> */}
      </div>
    </Link>
  );
};

export default ShowCard;