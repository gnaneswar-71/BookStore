import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

function Navbar() {
  const { cartCount } = useCart();

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="logo">
          📚 BookStore
        </Link>

        <div className="nav-links">
          <Link to="/">Home</Link>

          <Link to="/books">Books</Link>

          <Link to="/cart" className="cart-link">
            🛒 Cart
            {cartCount > 0 && (
              <span className="cart-badge">
                {cartCount}
              </span>
            )}
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;