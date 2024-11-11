// src/components/ShowDetail.js

import React from 'react';
import { useParams, Link } from 'react-router-dom';
import shows from '../data/shows';
import './ShowDetail.css';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';

const ShowDetail = () => {
  const { id } = useParams(); // Extract the show ID from the URL
  const show = shows.find((s) => s.id === parseInt(id));

  // State for Lightbox
  const [isOpen, setIsOpen] = React.useState(false);
  const [currentImage, setCurrentImage] = React.useState(0);

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

      {/* Director's Note */}
      <section className="show-section">
        <h3>Director's Note</h3>
        <p>{show.directorNote}</p>
      </section>

      {/* Cast Section */}
      <section className="show-section">
        <h3>Cast</h3>
        <div className="profiles-grid">
          {show.cast.map((member, index) => (
            <div key={index} className="profile-card">
              <img
                src={member.photo}
                alt={`${member.actor} as ${member.role}`}
                className="profile-photo"
              />
              <h4>{member.actor}</h4>
              <p className="role">{member.role}</p>
              <p className="bio">{member.bio}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Crew Section */}
      <section className="show-section">
        <h3>Crew</h3>
        <div className="profiles-grid">
          {show.crew.map((member, index) => (
            <div key={index} className="profile-card">
              <img
                src={member.photo}
                alt={`${member.name} - ${member.role}`}
                className="profile-photo"
              />
              <h4>{member.name}</h4>
              <p className="role">{member.role}</p>
              <p className="bio">{member.bio}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Post-Show Media Gallery */}
      <section className="show-section">
        <h3>Media Gallery</h3>
        <div className="media-gallery">
          {show.mediaGallery.map((media, index) => (
            <img
              key={index}
              src={media}
              alt={`${show.title} Media ${index + 1}`}
              className="media-photo"
              onClick={() => {
                setCurrentImage(index);
                setIsOpen(true);
              }}
            />
          ))}
        </div>
        {isOpen && (
          <Lightbox
            open={isOpen}
            close={() => setIsOpen(false)}
            slides={show.mediaGallery.map((image) => ({ src: image }))}
            index={currentImage}
            onClose={() => setIsOpen(false)}
            onMovePrev={() =>
              setCurrentImage(
                (currentImage + show.mediaGallery.length - 1) %
                  show.mediaGallery.length
              )
            }
            onMoveNext={() =>
              setCurrentImage((currentImage + 1) % show.mediaGallery.length)
            }
          />
        )}
      </section>
    </div>
  );
};

export default ShowDetail;