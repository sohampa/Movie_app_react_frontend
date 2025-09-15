# MovieApp React Frontend

A modern, responsive React frontend for the MovieApp that integrates with your Laravel backend API.

## Features

- **Modern UI/UX**: Clean, responsive design with smooth animations
- **Movie Discovery**: Browse and search through movie collections
- **Advanced Search**: Search by title, description, genre, or director
- **Genre Filtering**: Filter movies by specific genres
- **Pagination**: Navigate through large movie collections
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Real-time API Integration**: Connects to your Laravel backend

## Tech Stack

- **React 19**: Latest React version with modern hooks
- **React Router**: Client-side routing for SPA experience
- **CSS3**: Modern CSS with Flexbox, Grid, and animations
- **Fetch API**: Native browser API for HTTP requests
- **Responsive Design**: Mobile-first approach

## Project Structure

```
src/
├── components/          # React components
│   ├── Header.js       # Navigation header with search
│   ├── Header.css      # Header styles
│   ├── Home.js         # Landing page component
│   ├── Home.css        # Home page styles
│   ├── MovieList.js    # Movie listing with filters
│   ├── MovieList.css   # Movie list styles
│   ├── MovieDetail.js  # Individual movie details
│   ├── MovieDetail.css # Movie detail styles
│   ├── Footer.js       # Footer component
│   └── Footer.css      # Footer styles
├── App.js              # Main app component with routing
├── App.css             # Global styles and utilities
└── index.js            # App entry point
```

## API Integration

The frontend integrates with your Laravel backend at `http://127.0.0.1:8000/api`:

- **GET /api/movies** - Fetch all movies with pagination and search
- **GET /api/movies/{id}** - Get specific movie details
- **Search Parameters**: `search`, `genre`, `page`, `per_page`

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Your Laravel backend running on `http://127.0.0.1:8000`

### Installation

1. **Clone or navigate to the project directory**:
   ```bash
   cd movie-react-laravel
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm start
   ```

4. **Open your browser** and navigate to `https://myapp-docker-image-1022695486160.europe-west1.run.app`

### Build for Production

```bash
npm run build
```

This creates an optimized production build in the `build/` folder.

## Available Scripts

- `npm start` - Start development server
- `npm run build` - Build for production
- `npm test` - Run tests
- `npm run eject` - Eject from Create React App (not recommended)

## Features in Detail

### 1. Home Page (`/`)
- Hero section with call-to-action
- Featured movies section (fetches from API)
- Statistics and information
- Responsive design for all devices

### 2. Movie List (`/movies`)
- Grid layout of all movies
- Advanced search functionality
- Genre filtering with toggle buttons
- Pagination for large collections
- Loading states and error handling

### 3. Movie Detail (`/movie/:id`)
- Detailed movie information
- Large poster display
- Complete movie metadata
- Navigation back to movie list
- Responsive layout

### 4. Header Navigation
- Logo and branding
- Navigation menu
- Global search functionality
- Sticky positioning

### 5. Footer
- Quick links to main pages
- Feature highlights
- Technology information
- Responsive grid layout

## Styling and Design

- **Color Scheme**: Modern blue-purple gradient theme
- **Typography**: Clean, readable fonts
- **Animations**: Smooth hover effects and transitions
- **Responsive**: Mobile-first design approach
- **Accessibility**: Proper contrast and focus states

## API Configuration

The frontend is configured to connect to your Laravel backend. If you need to change the API URL, update the fetch calls in:

- `Home.js` - Featured movies
- `MovieList.js` - Movie listing and search
- `MovieDetail.js` - Individual movie details

## Customization

### Adding New Routes
1. Add the route in `App.js`
2. Create the component in `src/components/`
3. Add corresponding CSS file
4. Update navigation if needed

### Styling Changes
- Modify component-specific CSS files
- Update global styles in `App.css`
- Use CSS custom properties for consistent theming

### Adding New Features
- Create new components in the `components/` directory
- Follow the existing component structure
- Use the established styling patterns

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance Features

- Lazy loading of components
- Optimized images and assets
- Efficient state management
- Minimal bundle size
- Fast page transitions

## Troubleshooting

### Common Issues

1. **API Connection Error**:
   - Ensure your Laravel backend is running
   - Check the API URL in component files
   - Verify CORS settings in Laravel

2. **Build Errors**:
   - Clear `node_modules` and reinstall
   - Check for syntax errors in components
   - Verify all imports are correct

3. **Styling Issues**:
   - Check CSS file imports
   - Verify class names match
   - Check for CSS conflicts

### Development Tips

- Use browser developer tools for debugging
- Check console for API errors
- Test responsive design on different screen sizes
- Validate component props and state

## Contributing

1. Follow the existing code structure
2. Use consistent naming conventions
3. Add proper error handling
4. Test on multiple devices
5. Update documentation as needed

## License

This project is part of the MovieApp ecosystem.

## Support

For issues or questions:
1. Check the troubleshooting section
2. Review the API documentation
3. Check browser console for errors
4. Verify Laravel backend status

---

**Happy coding! 🎬✨**
