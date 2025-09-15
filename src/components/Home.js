import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const [featuredMovies, setFeaturedMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFeaturedMovies();
  }, []);

  const fetchFeaturedMovies = async () => {
    try {
      const API_URL = process.env.REACT_APP_API_URL;
      const response = await fetch(`${API_URL}/api/movies?per_page=6`);
      const data = await response.json();
      setFeaturedMovies(data.data || []);
    } catch (error) {
      console.error('Error fetching featured movies:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>Discover Amazing Movies</h1>
          <p>Explore thousands of movies, from classics to the latest releases</p>
          <Link to="/movies" className="cta-button">
            Browse Movies
          </Link>
        </div>
      </section>

      {/* Featured Movies Section */}
      <section className="featured-section">
        <div className="container">
          <h2>Featured Movies</h2>
          {loading ? (
            <div className="loading">Loading featured movies...</div>
          ) : (
            <div className="movies-grid">
              {featuredMovies.map((movie) => (
                <div key={movie.id} className="movie-card">
                  <div className="movie-poster">
                    {movie.poster_url ? (
                      <img src={movie.poster_url} alt={movie.title} />
                    ) : (
                      <div className="no-poster">
                        <span>No Poster</span>
                      </div>
                    )}
                  </div>
                  <div className="movie-info">
                    <h3>{movie.title}</h3>
                    <p className="movie-genre">{movie.genre}</p>
                    <p className="movie-year">{movie.release_year}</p>
                    <div className="movie-rating">
                      <span className="rating-star">★</span>
                      <span>{movie.rating}</span>
                    </div>
                    <Link to={`/movie/${movie.id}`} className="view-details">
                      View Details
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
          <div className="view-all-container">
            <Link to="/movies" className="view-all-button">
              View All Movies
            </Link>
            <Link to="/movie/add" className="add-new-button">
              + Add New Movie
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="container">
          <div className="stats-grid">
            <div className="stat-item">
              <h3>1000+</h3>
              <p>Movies</p>
            </div>
            <div className="stat-item">
              <h3>50+</h3>
              <p>Genres</p>
            </div>
            <div className="stat-item">
              <h3>24/7</h3>
              <p>Available</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
