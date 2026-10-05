import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

function Cart() {
  const {
    cart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    cartTotal,
  } = useCart();

  if (cart.length === 0) {
    return (
      <main className="cart-page">
        <div className="empty-cart">
          <div className="empty-cart-icon">🛒</div>

          <h1>Your Cart is Empty</h1>

          <p>
            You haven't added any books to your cart yet.
          </p>

          <Link to="/books" className="shop-button">
            Browse Books
          </Link>
        </div>
      </main>
    );
  }

  const totalItems = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <main className="cart-page">
      <div className="cart-container">
        <div className="cart-header">
          <div>
            <span className="cart-label">
              Shopping Cart
            </span>

            <h1>Your Cart</h1>

            <p>
              {totalItems}{" "}
              {totalItems === 1 ? "item" : "items"} in your
              cart.
            </p>
          </div>

          <Link
            to="/books"
            className="continue-shopping"
          >
            ← Continue Shopping
          </Link>
        </div>

        <div className="cart-layout">
          {/* Cart Items */}
          <div className="cart-items">
            {cart.map((item) => (
              <div className="cart-item" key={item.id}>
                <img
                  src={item.image}
                  alt={item.title}
                  className="cart-item-image"
                  onError={(event) => {
                    event.currentTarget.src =
                      "https://via.placeholder.com/120x160?text=Book";
                  }}
                />

                <div className="cart-item-details">
                  <span className="book-category">
                    {item.category}
                  </span>

                  <Link
                    to={`/books/${item.id}`}
                    className="cart-item-title"
                  >
                    {item.title}
                  </Link>

                  <p className="cart-item-author">
                    by {item.author}
                  </p>

                  <p className="cart-item-price">
                    ₹{item.price}
                  </p>

                  <div className="quantity-controls">
                    <button
                      onClick={() =>
                        decreaseQuantity(item.id)
                      }
                      aria-label={`Decrease quantity of ${item.title}`}
                    >
                      −
                    </button>

                    <span>{item.quantity}</span>

                    <button
                      onClick={() =>
                        increaseQuantity(item.id)
                      }
                      disabled={item.quantity >= 10}
                      aria-label={`Increase quantity of ${item.title}`}
                    >
                      +
                    </button>
                  </div>

                  {item.quantity >= 10 && (
                    <small className="quantity-limit">
                      Maximum quantity reached
                    </small>
                  )}
                </div>

                <div className="cart-item-right">
                  <strong>
                    ₹{item.price * item.quantity}
                  </strong>

                  <button
                    className="remove-button"
                    onClick={() =>
                      removeFromCart(item.id)
                    }
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <aside className="cart-summary">
            <h2>Order Summary</h2>

            <div className="summary-row">
              <span>Items</span>
              <span>{totalItems}</span>
            </div>

            <div className="summary-row">
              <span>Subtotal</span>
              <span>₹{cartTotal}</span>
            </div>

            <div className="summary-row">
              <span>Delivery</span>
              <span className="free-delivery">
                FREE
              </span>
            </div>

            <hr />

            <div className="summary-total">
              <span>Total</span>
              <strong>₹{cartTotal}</strong>
            </div>

            <Link
              to="/checkout"
              className="checkout-button"
            >
              Proceed to Checkout →
            </Link>
          </aside>
        </div>
      </div>
    </main>
  );
}

export default Cart;