import { Link, useParams } from "react-router-dom";
import books from "../data/books.js";
import { useCart } from "../context/CartContext";

function BookDetails() {
  const { id } = useParams();
  const { addToCart } = useCart();

  const book = books.find(
    (item) => item.id === Number(id)
  );

  // Handle invalid book ID
  if (!book) {
    return (
      <main className="page">
        <div className="not-found">
          <h1>Book Not Found</h1>
          <p>
            Sorry, we couldn't find the book you're looking for.
          </p>

          <Link to="/books" className="back-button">
            ← Back to Books
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="details-page">

      <Link to="/books" className="back-link">
        ← Back to Books
      </Link>

      <div className="details-container">

        {/* Book Image */}

        <div className="details-image-container">
          <img
            src={book.image}
            alt={book.title}
            className="details-image"
          />
        </div>

        {/* Book Information */}

        <div className="details-info">

          <span className="book-category">
            {book.category}
          </span>

          <h1>{book.title}</h1>

          <p className="details-author">
            by <strong>{book.author}</strong>
          </p>

          <div className="details-rating">
            ⭐ {book.rating}
          </div>

          <div className="details-price">
            ₹{book.price}
          </div>

          <div className="details-description">
            <h3>Description</h3>

            <p>{book.description}</p>
          </div>

          <button
            className="details-cart-button"
            onClick={() => addToCart(book)}
          >
            🛒 Add to Cart
          </button>

        </div>

      </div>

    </main>
  );
}

export default BookDetails;