import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'; // Corrected import for Routes
import BookList from './components/BookList';
import AddBook from './components/AddBook';
import Login from './components/Login';
import BookDetails from './components/BookDetails'; // Add BookDetails import
import './App.css';  // Import the CSS file

const App = () => {
  return (
    <Router basename="/library-management"r>
      <div>
        {/* Navigation Bar */}
        <nav className="navbar">
          <ul>
            <li><Link to="/" className="navbar-link">Home</Link></li>
            <li><Link to="/add" className="navbar-link">Add Book</Link></li>
            <li><Link to="/login" className="navbar-link">Login</Link></li>
          </ul>
        </nav>

        {/* Homepage Content */}
        <div className="homepage">
          <header className="hero">
            <h1 className="hero-title">Welcome to the Library</h1>
            <p className="hero-description">Explore a wide variety of books and add your own.</p>
          </header>
        </div>

        {/* Routes */}
        <Routes>
          <Route path="/" element={<BookList />} />
          <Route path="/add" element={<AddBook />} />
          <Route path="/login" element={<Login />} />
          <Route path="/book/:bookId" element={<BookDetails />} /> {/* Add the route for BookDetails */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
