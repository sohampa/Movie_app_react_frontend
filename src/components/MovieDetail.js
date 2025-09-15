
import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import './MovieDetail.css';

const API_URL = process.env.REACT_APP_API_URL;

const MovieDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchMovie();
  }, [id]);

  const fetchMovie = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(`${API_URL}/api/movies/${id}`);
      
      if (!response.ok) {
        throw new Error('Movie not found');
      }
      
      const data = await response.json();
      setMovie(data);
    } catch (error) {
      console.error('Error fetching movie:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteMovie = async (movieId) => {
    if (window.confirm('Are you sure you want to delete this movie? This action cannot be undone.')) {
      try {
        const response = await fetch(`${API_URL}/api/movies/${movieId}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          alert('Movie deleted successfully!');
          navigate('/movies');
        } else {
          const errorData = await response.json();
          alert(`Error: ${errorData.message || 'Failed to delete movie'}`);
        }
      } catch (error) {
        console.error('Error deleting movie:', error);
        alert('Error deleting movie. Please try again.');
      }
    }
  };

  if (loading) {
    return (
      <div className="movie-detail">
        <div className="container">
          <div className="loading">Loading movie details...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="movie-detail">
        <div className="container">
          <div className="error">
            <h2>Error</h2>
            <p>{error}</p>
            <button onClick={() => navigate('/movies')} className="back-button">
              Back to Movies
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="movie-detail">
        <div className="container">
          <div className="error">
            <h2>Movie not found</h2>
            <p>The movie you're looking for doesn't exist.</p>
            <button onClick={() => navigate('/movies')} className="back-button">
              Back to Movies
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="movie-detail">
      <div className="container">
        {/* Back Navigation */}
        <div className="back-navigation">
          <button onClick={() => navigate('/movies')} className="back-button">
            ← Back to Movies
          </button>
        </div>

        {/* Movie Header */}
        <div className="movie-header">
          <div className="movie-poster-section">
            {movie.poster_url ? (
              <img src={movie.poster_url} alt={movie.title} className="movie-poster" />
            ) : (
              <div className="no-poster-large">
                <span>No Poster Available</span>
              </div>
            )}
          </div>
          
          <div className="movie-info-section">
            <h1 className="movie-title">{movie.title}</h1>
            
            <div className="movie-meta">
              <div className="meta-item">
                <span className="meta-label">Genre:</span>
                <span className="meta-value">{movie.genre}</span>
              </div>
              
              <div className="meta-item">
                <span className="meta-label">Release Year:</span>
                <span className="meta-value">{movie.release_year}</span>
              </div>
              
              <div className="meta-item">
                <span className="meta-label">Director:</span>
                <span className="meta-value">{movie.director}</span>
              </div>
              
              <div className="meta-item">
                <span className="meta-label">Rating:</span>
                <div className="rating-display">
                  <span className="rating-star">★</span>
                  <span className="rating-value">{movie.rating}</span>
                  <span className="rating-max">/10</span>
                </div>
              </div>
            </div>

            <div className="movie-actions">
              <Link to="/movies" className="browse-more">
                Browse More Movies
              </Link>
              <Link to={`/movie/edit/${movie.id}`} className="edit-movie">
                Edit Movie
              </Link>
              <button onClick={() => handleDeleteMovie(movie.id)} className="delete-movie">
                Delete Movie
              </button>
            </div>
          </div>
        </div>

        {/* Movie Description */}
        <div className="movie-description-section">
          <h2>Synopsis</h2>
          <p className="movie-description">{movie.description}</p>
        </div>

        {/* Additional Details */}
        <div className="movie-details-section">
          <div className="details-grid">
            <div className="detail-card">
              <h3>Movie Information</h3>
              <div className="detail-list">
                <div className="detail-item">
                  <span className="detail-label">Title:</span>
                  <span className="detail-value">{movie.title}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Genre:</span>
                  <span className="detail-value">{movie.genre}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Release Year:</span>
                  <span className="detail-value">{movie.release_year}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Director:</span>
                  <span className="detail-value">{movie.director}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Rating:</span>
                  <span className="detail-value">{movie.rating}/10</span>
                </div>
              </div>
            </div>

            <div className="detail-card">
              <h3>Quick Stats</h3>
              <div className="stats-list">
                <div className="stat-item">
                  <span className="stat-number">{movie.release_year}</span>
                  <span className="stat-label">Release Year</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">{movie.rating}</span>
                  <span className="stat-label">Rating</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">{movie.genre}</span>
                  <span className="stat-label">Genre</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Actions */}
        <div className="related-actions">
          <Link to="/movies" className="action-button primary">
            Browse All Movies
          </Link>
          <Link to="/" className="action-button secondary">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
