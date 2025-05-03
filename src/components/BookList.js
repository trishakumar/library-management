import React, { useState, useEffect } from 'react';
import { db } from '../firebase'; // Firebase setup
import { collection, getDocs } from 'firebase/firestore'; // Firebase v9+ imports
import { Link } from 'react-router-dom'; // Add Link for navigation
import '../App.css'; // Go up one directory to access the App.css file

const BookList = () => {
  const [books, setBooks] = useState([]);

  // Fetch books from Firebase on component mount
  useEffect(() => {
    const fetchBooks = async () => {
      const booksCollection = await getDocs(collection(db, 'books'));
      setBooks(booksCollection.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };

    fetchBooks();
  }, []);

  return (
    <div className="container">
      <h1>Library Books</h1>
      <ul className="book-list">
        {books.map((book) => (
          <li key={book.id} className="book-item">
            <div className="book-image">
              {/* Display image if available, otherwise show placeholder */}
              <img src={book.imageUrl || 'https://via.placeholder.com/150x200?text=No+Image'} alt={book.title} />
            </div>
            <div className="book-info">
              <h3>{book.title}</h3>
              <p>{book.author}</p>
              <p>{book.details}</p>
              {/* Button to navigate to BookDetails page with the book ID */}
              <Link to={`/book/${book.id}`}>
                <button className="get-book-btn">Get Book</button>
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BookList;
