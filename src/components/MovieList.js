import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import './MovieList.css';

const API_URL = process.env.REACT_APP_API_URL;
// Debug: log the API URL at runtime
// eslint-disable-next-line no-console
console.log('API_URL:', API_URL);
if (!API_URL) {
  // Warn in development and fail gracefully in production
  // eslint-disable-next-line no-console
  console.error('REACT_APP_API_URL is not set. Please check your .env file. API calls will fail.');
}
const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState('');
  const [genreFilter, setGenreFilter] = useState('');

  const search = searchParams.get('search') || '';
  const page = parseInt(searchParams.get('page')) || 1;

  useEffect(() => {
    setSearchQuery(search);
    setCurrentPage(page);
    fetchMovies();
  }, [search, page]);

  const fetchMovies = async () => {
    try {
      setLoading(true);
      if (!API_URL) {
        throw new Error('API_URL is not set. Please set REACT_APP_API_URL in your .env file.');
      }
      let url = `${API_URL}/api/movies?page=${currentPage}&per_page=12`;

      if (search) {
        url += `&search=${encodeURIComponent(search)}`;
      }

      if (genreFilter) {
        url += `&genre=${encodeURIComponent(genreFilter)}`;
      }

      const response = await fetch(url);
      const data = await response.json();

      setMovies(data.data || []);
      setTotalPages(Math.ceil((data.total || 0) / 12));
    } catch (error) {
      console.error('Error fetching movies:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setSearchParams({ search: searchQuery.trim(), page: 1 });
    }
  };

  const handleGenreFilter = (genre) => {
    setGenreFilter(genre);
    setSearchParams({ 
      search: search || '', 
      genre: genre || '', 
      page: 1 
    });
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    setSearchParams({ 
      search: search || '', 
      genre: genreFilter || '', 
      page: newPage 
    });
  };

  const clearFilters = () => {
    setSearchQuery('');
    setGenreFilter('');
    setSearchParams({ page: 1 });
  };

  const handleDeleteMovie = async (movieId) => {
    if (window.confirm('Are you sure you want to delete this movie? This action cannot be undone.')) {
      if (!API_URL) {
        alert('API_URL is not set. Please set REACT_APP_API_URL in your .env file.');
        return;
      }
      try {
        const response = await fetch(`${API_URL}/api/movies/${movieId}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          alert('Movie deleted successfully!');
          // Refresh the movie list
          fetchMovies();
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

  const genres = ['Action', 'Comedy', 'Drama', 'Horror', 'Sci-Fi', 'Romance', 'Thriller', 'Documentary'];

  return (
    <div className="movie-list">
      <div className="container">
        <div className="page-header">
          <h1>All Movies</h1>
          <p>Discover and explore our collection of amazing movies</p>
          <Link to="/movie/add" className="add-movie-button">
            + Add New Movie
          </Link>
        </div>

        {/* Search and Filters */}
        <div className="filters-section">
          <form onSubmit={handleSearch} className="search-form">
            <input
              type="text"
              placeholder="Search movies by title, description, genre, or director..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
            <button type="submit" className="search-button">Search</button>
          </form>

          <div className="filter-controls">
            <div className="genre-filters">
              <span className="filter-label">Filter by Genre:</span>
              <div className="genre-buttons">
                {genres.map((genre) => (
                  <button
                    key={genre}
                    onClick={() => handleGenreFilter(genre)}
                    className={`genre-button ${genreFilter === genre ? 'active' : ''}`}
                  >
                    {genre}
                  </button>
                ))}
              </div>
            </div>
            
            {(search || genreFilter) && (
              <button onClick={clearFilters} className="clear-filters">
                Clear Filters
              </button>
            )}
          </div>
        </div>

        {/* Results Summary */}
        {(search || genreFilter) && (
          <div className="results-summary">
            <p>
              Showing results for: 
              {search && <span className="filter-tag">"{search}"</span>}
              {genreFilter && <span className="filter-tag">{genreFilter}</span>}
            </p>
          </div>
        )}

        {/* Movies Grid */}
        {loading ? (
          <div className="loading">Loading movies...</div>
        ) : movies.length > 0 ? (
          <>
            <div className="movies-grid">
              {movies.map((movie) => (
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
                    <p className="movie-description">{movie.description}</p>
                    <p className="movie-genre">{movie.genre}</p>
                    <p className="movie-year">{movie.release_year}</p>
                    <div className="movie-rating">
                      <span className="rating-star">★</span>
                      <span>{movie.rating}</span>
                    </div>
                    <p className="movie-director">Director: {movie.director}</p>
                    <div className="movie-actions">
                      <Link to={`/movie/${movie.id}`} className="view-details">
                        View Details
                      </Link>
                      <Link to={`/movie/edit/${movie.id}`} className="edit-movie">
                        Edit
                      </Link>
                      <button onClick={() => handleDeleteMovie(movie.id)} className="delete-movie">
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="pagination">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="page-button"
                >
                  Previous
                </button>
                
                <div className="page-numbers">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                    <button
                      key={pageNum}
                      onClick={() => handlePageChange(pageNum)}
                      className={`page-number ${currentPage === pageNum ? 'active' : ''}`}
                    >
                      {pageNum}
                    </button>
                  ))}
                </div>
                
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="page-button"
                >
                  Next
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="no-results">
            <h3>No movies found</h3>
            <p>Try adjusting your search criteria or filters.</p>
            <button onClick={clearFilters} className="clear-filters">
              Clear All Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MovieList;
