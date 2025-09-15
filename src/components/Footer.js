import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>MovieApp</h3>
            <p>Discover and explore amazing movies from around the world. Your ultimate destination for movie information and discovery.</p>
          </div>
          
          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/movies">Movies</Link></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h4>Features</h4>
            <ul>
              <li>Movie Search</li>
              <li>Genre Filtering</li>
              <li>Detailed Information</li>
              <li>Responsive Design</li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h4>Contact</h4>
            <p>Built with React & Laravel</p>
            <p>API: Laravel Backend</p>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; 2024 MovieApp. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
