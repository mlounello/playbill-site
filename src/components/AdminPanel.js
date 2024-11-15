// src/components/AdminPanel.js

import React, { useEffect, useState, useCallback } from 'react';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { db, storage } from '../firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import './AdminPanel.css';
import Button from './Button';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import Quill styles for the editor

const AdminPanel = () => {
  const [shows, setShows] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    poster: null,
    directorNote: '',
    songs: '',
    acknowledgements: '',
    cast: [],
    crew: [],
    creative: [],
  });
  const [editingShowId, setEditingShowId] = useState(null);
  const [mediaFiles, setMediaFiles] = useState([]);
  const [error, setError] = useState('');

  const showsCollectionRef = collection(db, 'shows');

  // Fetch shows from Firestore using useCallback
  const fetchShows = useCallback(async () => {
    try {
      const data = await getDocs(showsCollectionRef);
      setShows(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      console.log("Fetched shows:", data.docs.map((doc) => doc.data())); // Debugging log
    } catch (error) {
      console.error("Error fetching shows:", error);
      setError('Failed to load shows.');
    }
  }, [showsCollectionRef]);

  useEffect(() => {
    fetchShows();
  }, [fetchShows]);

  // Handle general form input changes
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'poster') {
      setFormData({ ...formData, poster: files[0] });
    } else if (name === 'mediaGallery') {
      setMediaFiles(Array.from(files));
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // Handle rich text changes from React Quill editor
  const handleQuillChange = (value, name) => {
    setFormData({ ...formData, [name]: value });
  };

  // Handle changes for member fields within cast, crew, and creative
  const handleMemberQuillChange = (value, section, index, field) => {
    const updatedSection = [...formData[section]];
    updatedSection[index][field] = value;
    setFormData({ ...formData, [section]: updatedSection });
  };

  // Function to handle file input changes for photo fields within cast, crew, and creative
  const handleMemberChange = (section, index, field, file) => {
    const updatedSection = [...formData[section]];
    updatedSection[index][field] = file;
    setFormData({ ...formData, [section]: updatedSection });
  };

  // Helper functions for adding and removing members
  const addMember = (section) => {
    setFormData({
      ...formData,
      [section]: [...formData[section], { name: '', role: '', bio: '', photo: null }],
    });
  };

  const removeMember = (section, index) => {
    setFormData({
      ...formData,
      [section]: formData[section].filter((_, i) => i !== index),
    });
  };

  // Function to handle editing a show
  const handleEdit = (show) => {
    setEditingShowId(show.id);
    setFormData({
      title: show.title,
      description: show.description,
      poster: null,
      directorNote: show.directorNote,
      songs: show.songs.join(', '),
      acknowledgements: show.acknowledgements.join(', '),
      cast: show.cast || [],
      crew: show.crew || [],
      creative: show.creative || [],
    });
    setMediaFiles([]);
  };

  // Function to handle deleting a show
  const handleDelete = async (id) => {
    try {
      const showDoc = doc(db, 'shows', id);
      await deleteDoc(showDoc);
      fetchShows();
    } catch (error) {
      console.error("Error deleting show:", error);
      setError('Failed to delete the show. Please try again.');
    }
  };

  // Handle form submission to add or update a show
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      let posterURL = '';
      if (formData.poster) {
        const posterRef = ref(storage, `posters/${formData.poster.name}`);
        await uploadBytes(posterRef, formData.poster);
        posterURL = await getDownloadURL(posterRef);
      }

      let mediaGalleryURLs = [];
      if (mediaFiles.length > 0) {
        const uploadPromises = mediaFiles.map(async (file) => {
          const mediaRef = ref(storage, `media/${file.name}`);
          await uploadBytes(mediaRef, file);
          return await getDownloadURL(mediaRef);
        });
        mediaGalleryURLs = await Promise.all(uploadPromises);
      }

      const uploadMemberPhotos = async (members, section) => {
        const membersWithPhotos = await Promise.all(
          members.map(async (member) => {
            if (member.photo) {
              const photoRef = ref(storage, `${section}/${member.photo.name}`);
              await uploadBytes(photoRef, member.photo);
              const photoURL = await getDownloadURL(photoRef);
              return { ...member, photo: photoURL };
            }
            return member;
          })
        );
        return membersWithPhotos;
      };

      const castWithPhotos = await uploadMemberPhotos(formData.cast, 'cast');
      const crewWithPhotos = await uploadMemberPhotos(formData.crew, 'crew');
      const creativeWithPhotos = await uploadMemberPhotos(formData.creative, 'creative');

      const newShow = {
        title: formData.title,
        description: formData.description,
        poster: posterURL,
        directorNote: formData.directorNote,
        songs: formData.songs.split(',').map((song) => song.trim()),
        acknowledgements: formData.acknowledgements.split(',').map((ack) => ack.trim()),
        mediaGallery: mediaGalleryURLs,
        cast: castWithPhotos,
        crew: crewWithPhotos,
        creative: creativeWithPhotos,
      };

      if (editingShowId) {
        const showDoc = doc(db, 'shows', editingShowId);
        await updateDoc(showDoc, newShow);
        setEditingShowId(null);
      } else {
        await addDoc(showsCollectionRef, newShow);
      }

      setFormData({
        title: '',
        description: '',
        poster: null,
        directorNote: '',
        songs: '',
        acknowledgements: '',
        cast: [],
        crew: [],
        creative: [],
      });
      setMediaFiles([]);
      fetchShows();
    } catch (error) {
      console.error("Error saving show:", error);
      setError('Failed to save the show. Please try again.');
    }
  };

  return (
    <div className="admin-panel">
      <header className="admin-panel-header">
        <h2>Admin Panel</h2>
      </header>

      {error && <p className="error-message">{error}</p>}

      <form onSubmit={handleSubmit} className="show-form">
        <h3>{editingShowId ? 'Edit Show' : 'Add New Show'}</h3>

        <input type="text" name="title" value={formData.title} onChange={handleChange} required placeholder="Title" />

        <ReactQuill 
          value={formData.description} 
          onChange={(value) => handleQuillChange(value, 'description')} 
          placeholder="Description" 
        />

        <ReactQuill 
          value={formData.directorNote} 
          onChange={(value) => handleQuillChange(value, 'directorNote')} 
          placeholder="Director's Note" 
        />

        {['cast', 'crew', 'creative'].map((section) => (
          <section key={section}>
            <h3>{section.charAt(0).toUpperCase() + section.slice(1)} Members</h3>
            {formData[section].map((member, index) => (
              <div key={index}>
                <ReactQuill 
                  value={member.name} 
                  onChange={(value) => handleMemberQuillChange(value, section, index, 'name')} 
                  placeholder="Name" 
                />
                <ReactQuill 
                  value={member.role} 
                  onChange={(value) => handleMemberQuillChange(value, section, index, 'role')} 
                  placeholder="Role" 
                />
                <ReactQuill 
                  value={member.bio} 
                  onChange={(value) => handleMemberQuillChange(value, section, index, 'bio')} 
                  placeholder="Bio" 
                />
                <input type="file" onChange={(e) => handleMemberChange(section, index, 'photo', e.target.files[0])} />
                <button type="button" onClick={() => removeMember(section, index)}>Remove</button>
              </div>
            ))}
            <button type="button" onClick={() => addMember(section)}>Add {section.charAt(0).toUpperCase() + section.slice(1)} Member</button>
          </section>
        ))}

        <button type="submit">{editingShowId ? 'Update Show' : 'Add Show'}</button>
      </form>

      <div className="shows-list">
        <h3>Existing Shows</h3>
        {shows.length === 0 ? (
          <p>No shows available.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Title</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {shows.map((show) => (
                <tr key={show.id}>
                  <td>{show.title}</td>
                  <td>
                    <Button text="Edit" type="secondary" onClick={() => handleEdit(show)} />
                    <Button text="Delete" type="primary" onClick={() => handleDelete(show.id)} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;