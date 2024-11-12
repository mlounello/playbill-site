// src/components/ShowsList.js

import React, { useEffect, useState, useCallback } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import './ShowsList.css'; // Create this CSS file for styling

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
            <div key={show.id} className="show-card">
              {show.poster && <img src={show.poster} alt={`${show.title} Poster`} className="show-poster" />}
              <h3>{show.title}</h3>
              <div
                className="show-description"
                dangerouslySetInnerHTML={{ __html: show.description }}
              ></div>
              {/* Add more show details as needed */}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ShowsList;