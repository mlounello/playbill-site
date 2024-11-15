// src/components/ShowDetail.js

import React, { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import './ShowDetail.css';

const ShowDetail = () => {
  const { id } = useParams(); // Extract the show ID from the URL
  const [show, setShow] = useState(null); // State to hold show details
  const [error, setError] = useState(''); // State to handle errors

  /**
   * fetchShow: Fetches show details from Firestore based on the show ID.
   * Wrapped in useCallback to memoize the function and manage dependencies.
   */
  const fetchShow = useCallback(async () => {
    try {
      const showDoc = doc(db, 'shows', id); // Reference to the specific show document
      const showSnap = await getDoc(showDoc); // Fetch the document snapshot
      if (showSnap.exists()) {
        setShow(showSnap.data()); // Update state with show data
      } else {
        setError('Show not found.'); // Handle case where show doesn't exist
      }
    } catch (error) {
      console.error('Error fetching show:', error);
      setError('Failed to load show details.'); // Handle fetch errors
    }
  }, [id]); // Removed 'db' from dependencies

  /**
   * useEffect: Calls fetchShow when the component mounts or when fetchShow changes.
   */
  useEffect(() => {
    fetchShow();
  }, [fetchShow]); // Dependency: fetchShow

  // Render error message if there's an error
  if (error) {
    return <div className="show-detail-error">{error}</div>;
  }

  // Render loading state while fetching data
  if (!show) {
    return <div className="show-detail-loading">Loading...</div>;
  }

  // Render show details once data is fetched
  return (
    <div className="show-detail">
      <header className="show-detail-header">
        {show.poster && (
          <img src={show.poster} alt={`${show.title}`} className="show-detail-poster" />
        )}
        <h1 className="show-detail-title">{show.title}</h1>
      </header>

      <section className="show-detail-section">
        <h2>Description</h2>
        <div
          className="show-detail-description"
          dangerouslySetInnerHTML={{ __html: show.description }}
        ></div>
      </section>

      {show.directorNote && (
        <section className="show-detail-section">
          <h2>Director's Note</h2>
          <div
            className="show-detail-director-note"
            dangerouslySetInnerHTML={{ __html: show.directorNote }}
          ></div>
        </section>
      )}

      {show.cast && show.cast.length > 0 && (
        <section className="show-detail-section">
          <h2>Cast</h2>
          <div className="members-grid">
            {show.cast.map((member, index) => (
              <div key={index} className="member-card">
                {member.photo && (
                  <img src={member.photo} alt={`${member.name}`} className="member-photo" />
                )}
                <h3 className="member-name">{member.name}</h3>
                <p className="member-role">{member.role}</p>
                <div
                  className="member-bio"
                  dangerouslySetInnerHTML={{ __html: member.bio }}
                ></div>
              </div>
            ))}
          </div>
        </section>
      )}

      {show.crew && show.crew.length > 0 && (
        <section className="show-detail-section">
          <h2>Crew</h2>
          <div className="members-grid">
            {show.crew.map((member, index) => (
              <div key={index} className="member-card">
                {member.photo && (
                  <img src={member.photo} alt={`${member.name}`} className="member-photo" />
                )}
                <h3 className="member-name">{member.name}</h3>
                <p className="member-role">{member.role}</p>
                <div
                  className="member-bio"
                  dangerouslySetInnerHTML={{ __html: member.bio }}
                ></div>
              </div>
            ))}
          </div>
        </section>
      )}

      {show.creative && show.creative.length > 0 && (
        <section className="show-detail-section">
          <h2>Creative Team</h2>
          <div className="members-grid">
            {show.creative.map((member, index) => (
              <div key={index} className="member-card">
                {member.photo && (
                  <img src={member.photo} alt={`${member.name}`} className="member-photo" />
                )}
                <h3 className="member-name">{member.name}</h3>
                <p className="member-role">{member.role}</p>
                <div
                  className="member-bio"
                  dangerouslySetInnerHTML={{ __html: member.bio }}
                ></div>
              </div>
            ))}
          </div>
        </section>
      )}

      {show.mediaGallery && show.mediaGallery.length > 0 && (
        <section className="show-detail-section">
          <h2>Media Gallery</h2>
          <div className="media-gallery">
            {show.mediaGallery.map((mediaUrl, index) => (
              <img key={index} src={mediaUrl} alt={`Media ${index + 1}`} className="media-item" />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default ShowDetail;