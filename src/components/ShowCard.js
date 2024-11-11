// src/components/ShowCard.js

import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
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
      </div>
    </Link>
  );
};

ShowCard.propTypes = {
  show: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    poster: PropTypes.string.isRequired,
  }).isRequired,
};

export default ShowCard;