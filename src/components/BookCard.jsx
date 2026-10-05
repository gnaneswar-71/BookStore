import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import Toast from "./Toast";

function BookCard({ book }) {
  const { addToCart } = useCart();

  const [showToast, setShowToast] = useState(false);

  const handleAddToCart = (event) => {
    event.preventDefault();
    event.stopPropagation();

    addToCart(book);
    setShowToast(true);

    setTimeout(() => {
      setShowToast(false);
    }, 2000);
  };

  return (
    <>
      <div className="book-card">
        <Link
          to={`/books/${book.id}`}
          className="book-card-link"
        >
          <div className="book-image-container">
            <img
              src={book.image}
              alt={book.title}
              className="book-image"
              onError={(event) => {
                event.currentTarget.src =
                  "https://via.placeholder.com/300x400?text=Book";
              }}
            />
          </div>

          <div className="book-info">
            <span className="book-category">
              {book.category}
            </span>

            <h3 className="book-title">
              {book.title}
            </h3>

            <p className="book-author">
              by {book.author}
            </p>

            <div className="book-rating">
              ⭐ {book.rating}
            </div>

            <div className="book-bottom">
              <span className="book-price">
                ₹{book.price}
              </span>

              <button
                className="add-cart-button"
                onClick={handleAddToCart}
              >
                🛒 Add to Cart
              </button>
            </div>
          </div>
        </Link>
      </div>

      {showToast && (
        <Toast
          message={`${book.title} added to cart`}
          onClose={() => setShowToast(false)}
        />
      )}
    </>
  );
}

export default BookCard;