// src/components/ShowDetail.js

import React from 'react';
import { useParams, Link } from 'react-router-dom';
import shows from '../data/shows';
import './ShowDetail.css';

const ShowDetail = () => {
  const { id } = useParams(); // Extract the show ID from the URL
  const show = shows.find((s) => s.id === parseInt(id));

  if (!show) {
    return (
      <div className="show-detail">
        <h2>Show Not Found</h2>
        <Link to="/" className="back-link">
          Back to Landing Page
        </Link>
      </div>
    );
  }

  return (
    <div className="show-detail">
      <Link to="/" className="back-link">
        &larr; Back to Landing Page
      </Link>
      <h2 className="show-detail-title">{show.title}</h2>
      <img
        src={show.poster}
        alt={`${show.title} Poster`}
        className="show-detail-poster"
      />
      <p className="show-detail-description">{show.description}</p>

      {/* Cast Section */}
      <section className="show-section">
        <h3>Cast</h3>
        <ul>
          {show.cast.map((member, index) => (
            <li key={index}>
              <strong>{member.role}:</strong> {member.actor}
            </li>
          ))}
        </ul>
      </section>

      {/* Crew Section */}
      <section className="show-section">
        <h3>Crew</h3>
        <ul>
          {show.crew.map((member, index) => (
            <li key={index}>
              <strong>{member.role}:</strong> {member.name}
            </li>
          ))}
        </ul>
      </section>

      {/* Songs Section */}
      <section className="show-section">
        <h3>Songs</h3>
        <ol>
          {show.songs.map((song, index) => (
            <li key={index}>{song}</li>
          ))}
        </ol>
      </section>

      {/* Acknowledgements Section */}
      <section className="show-section">
        <h3>Acknowledgements</h3>
        <ul>
          {show.acknowledgements.map((ack, index) => (
            <li key={index}>{ack}</li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default ShowDetail;