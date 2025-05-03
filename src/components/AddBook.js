import React, { useState } from 'react';
import { db } from '../firebase'; // Firebase setup
import { collection, addDoc } from 'firebase/firestore'; // Firebase v9+ imports
import '../App.css';  // Import CSS

const AddBook = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [details, setDetails] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (title && author && details && imageUrl) {
      try {
        const booksCollectionRef = collection(db, 'books');
        await addDoc(booksCollectionRef, { title, author, details, imageUrl });
        setTitle('');
        setAuthor('');
        setDetails('');
        setImageUrl('');
        alert("Book added successfully!");
      } catch (error) {
        console.error('Error adding book: ', error);
      }
    } else {
      alert("Please fill in all fields.");
    }
  };

  return (
    <div className="container">
      <h1>Add a New Book</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Book Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
        <textarea
          placeholder="Details"
          value={details}
          onChange={(e) => setDetails(e.target.value)}
        />
        <input
          type="text"
          placeholder="Image URL"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
        />
        <button type="submit">Add Book</button>
      </form>
    </div>
  );
};

export default AddBook;
