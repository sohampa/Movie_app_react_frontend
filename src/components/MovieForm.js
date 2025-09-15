
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './MovieForm.css';

const API_URL = process.env.REACT_APP_API_URL;

const MovieForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    genre: '',
    release_year: '',
    rating: '',
    director: '',
    poster_url: ''
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (id) {
      setIsEdit(true);
      fetchMovie();
    }
  }, [id]);

  const fetchMovie = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/api/movies/${id}`);
      if (response.ok) {
        const movie = await response.json();
        setFormData({
          title: movie.title || '',
          description: movie.description || '',
          genre: movie.genre || '',
          release_year: movie.release_year || '',
          rating: movie.rating || '',
          director: movie.director || '',
          poster_url: movie.poster_url || ''
        });
      }
    } catch (error) {
      console.error('Error fetching movie:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }
    
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }
    
    if (!formData.genre.trim()) {
      newErrors.genre = 'Genre is required';
    }
    
    if (!formData.release_year) {
      newErrors.release_year = 'Release year is required';
    } else if (formData.release_year < 1900 || formData.release_year > new Date().getFullYear() + 1) {
      newErrors.release_year = 'Release year must be between 1900 and next year';
    }
    
    if (!formData.rating) {
      newErrors.rating = 'Rating is required';
    } else if (formData.rating < 0 || formData.rating > 10) {
      newErrors.rating = 'Rating must be between 0 and 10';
    }
    
    if (!formData.director.trim()) {
      newErrors.director = 'Director is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    try {
      setLoading(true);
      
      const url = isEdit 
        ? `${API_URL}/api/movies/${id}`
        : `${API_URL}/api/movies`;
      
      const method = isEdit ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        const result = await response.json();
        alert(isEdit ? 'Movie updated successfully!' : 'Movie created successfully!');
        navigate('/movies');
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.message || 'Something went wrong'}`);
      }
    } catch (error) {
      console.error('Error saving movie:', error);
      alert('Error saving movie. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate('/movies');
  };

  if (loading && isEdit) {
    return (
      <div className="movie-form">
        <div className="container">
          <div className="loading">Loading movie data...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="movie-form">
      <div className="container">
        <div className="form-header">
          <h1>{isEdit ? 'Edit Movie' : 'Add New Movie'}</h1>
          <p>{isEdit ? 'Update the movie information below' : 'Fill in the details to add a new movie'}</p>
        </div>

        <form onSubmit={handleSubmit} className="movie-form-container">
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="title">Movie Title *</label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className={errors.title ? 'error' : ''}
                placeholder="Enter movie title"
              />
              {errors.title && <span className="error-message">{errors.title}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="genre">Genre *</label>
              <select
                id="genre"
                name="genre"
                value={formData.genre}
                onChange={handleInputChange}
                className={errors.genre ? 'error' : ''}
              >
                <option value="">Select Genre</option>
                <option value="Action">Action</option>
                <option value="Comedy">Comedy</option>
                <option value="Drama">Drama</option>
                <option value="Horror">Horror</option>
                <option value="Sci-Fi">Sci-Fi</option>
                <option value="Romance">Romance</option>
                <option value="Thriller">Thriller</option>
                <option value="Documentary">Documentary</option>
                <option value="Animation">Animation</option>
                <option value="Adventure">Adventure</option>
              </select>
              {errors.genre && <span className="error-message">{errors.genre}</span>}
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="release_year">Release Year *</label>
              <input
                type="number"
                id="release_year"
                name="release_year"
                value={formData.release_year}
                onChange={handleInputChange}
                className={errors.release_year ? 'error' : ''}
                placeholder="e.g., 2024"
                min="1900"
                max={new Date().getFullYear() + 1}
              />
              {errors.release_year && <span className="error-message">{errors.release_year}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="rating">Rating (0-10) *</label>
              <input
                type="number"
                id="rating"
                name="rating"
                value={formData.rating}
                onChange={handleInputChange}
                className={errors.rating ? 'error' : ''}
                placeholder="e.g., 8.5"
                min="0"
                max="10"
                step="0.1"
              />
              {errors.rating && <span className="error-message">{errors.rating}</span>}
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="director">Director *</label>
            <input
              type="text"
              id="director"
              name="director"
              value={formData.director}
              onChange={handleInputChange}
              className={errors.director ? 'error' : ''}
              placeholder="Enter director name"
            />
            {errors.director && <span className="error-message">{errors.director}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="poster_url">Poster URL</label>
            <input
              type="url"
              id="poster_url"
              name="poster_url"
              value={formData.poster_url}
              onChange={handleInputChange}
              placeholder="https://example.com/poster.jpg"
            />
            <small>Optional: Enter a URL for the movie poster image</small>
          </div>

          <div className="form-group">
            <label htmlFor="description">Description *</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              className={errors.description ? 'error' : ''}
              placeholder="Enter movie description/synopsis"
              rows="5"
            />
            {errors.description && <span className="error-message">{errors.description}</span>}
          </div>

          <div className="form-actions">
            <button type="button" onClick={handleCancel} className="btn btn-secondary">
              Cancel
            </button>
            <button type="submit" disabled={loading} className="btn btn-primary">
              {loading ? 'Saving...' : (isEdit ? 'Update Movie' : 'Create Movie')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MovieForm;
