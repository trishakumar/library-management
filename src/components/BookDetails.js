import React, { useState, useEffect } from 'react';
import { db } from '../firebase'; // Firebase setup
import { doc, getDoc, setDoc } from 'firebase/firestore'; // Firebase v9+ imports
import { useParams } from 'react-router-dom';  // Hook to get URL parameters
import '../App.css';  // Import the CSS


const BookDetails = () => {
  const [book, setBook] = useState(null);
  const [borrowDuration, setBorrowDuration] = useState('');
  const [orderType, setOrderType] = useState('');
  const [error, setError] = useState('');
  const { bookId } = useParams(); // Get bookId from URL

  useEffect(() => {
    const fetchBookDetails = async () => {
      const docRef = doc(db, 'books', bookId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setBook({ id: docSnap.id, ...docSnap.data() });
      } else {
        setError('No such book found!');
      }
    };

    fetchBookDetails();
  }, [bookId]);

  const handleOrder = async () => {
    if (!orderType) {
      setError('Please select an order type (Borrow or Purchase).');
      return;
    }

    if (orderType === 'borrow' && !borrowDuration) {
      setError('Please select a borrow duration.');
      return;
    }

    // Create order details
    const orderDetails = {
      bookId: book.id,
      title: book.title,
      author: book.author,
      orderType,
      borrowDuration: orderType === 'borrow' ? borrowDuration : null,
      orderDate: new Date().toISOString(),
    };

    try {
      // Save order details in Firebase (in an "orders" collection)
      await setDoc(doc(db, 'orders', `${book.id}-${new Date().getTime()}`), orderDetails);
      alert('Order successfully placed!');
    } catch (error) {
      setError('Error placing order: ' + error.message);
    }
  };

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="container">
      {book ? (
        <div className="book-details">
          <h1>{book.title}</h1>
          <h2>by {book.author}</h2>
          {/* Ensure that image exists, else show a placeholder */}
          <div className="book-image">
  <img src={book.imageUrl || 'https://via.placeholder.com/150x200?text=No+Image'} alt={book.title} />
</div>

          <p>{book.details}</p>

          <div className="order-options">
            <h3>Order Type</h3>
            <label>
              <input
                type="radio"
                name="orderType"
                value="borrow"
                onChange={() => setOrderType('borrow')}
              />
              Borrow
            </label>
            <label>
              <input
                type="radio"
                name="orderType"
                value="purchase"
                onChange={() => setOrderType('purchase')}
              />
              Purchase
            </label>

            {orderType === 'borrow' && (
              <div>
                <h3>Borrow Duration</h3>
                <select onChange={(e) => setBorrowDuration(e.target.value)} value={borrowDuration}>
                  <option value="">Select Duration</option>
                  <option value="1 week">1 Week</option>
                  <option value="2 weeks">2 Weeks</option>
                  <option value="1 month">1 Month</option>
                </select>
              </div>
            )}

            <button onClick={handleOrder} className="order-btn">
              Place Order
            </button>
          </div>
        </div>
      ) : (
        <p>Loading book details...</p>
      )}
    </div>
  );
};

export default BookDetails;
