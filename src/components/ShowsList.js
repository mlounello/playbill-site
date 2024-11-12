// src/components/ShowsList.js

import React, { useEffect, useState, useCallback } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { Link } from 'react-router-dom';
import './ShowsList.css';

const ShowsList = () => {
  const [shows, setShows] = useState([]);
  const [error, setError] = useState('');

  const showsCollectionRef = collection(db, 'shows');

  const fetchShows = useCallback(async () => {
    try {
      const data = await getDocs(showsCollectionRef);
      setShows(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      console.log('Fetched shows:', data.docs.map((doc) => doc.data()));
    } catch (error) {
      console.error('Error fetching shows:', error);
      setError('Failed to load shows.');
    }
  }, [showsCollectionRef]);

  useEffect(() => {
    fetchShows();
  }, [fetchShows]);

  return (
    <div className="shows-list">
      <h2>Available Shows</h2>
      {error && <p className="error-message">{error}</p>}
      {shows.length === 0 ? (
        <p>No shows available.</p>
      ) : (
        <div className="shows-grid">
          {shows.map((show) => (
            <Link to={`/shows/${show.id}`} key={show.id} className="show-card">
              {show.poster && (
                <img src={show.poster} alt={`${show.title} Poster`} className="show-poster" />
              )}
              <div className="show-info">
                <h3 className="show-title">{show.title}</h3>
                <div className="show-description">
                  <p dangerouslySetInnerHTML={{ __html: show.description }}></p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default ShowsList;