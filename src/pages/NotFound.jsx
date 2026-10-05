import { Link } from "react-router-dom";

function NotFound() {
  return (
    <main className="not-found-page">
      <div className="not-found-card">
        <div className="not-found-number">404</div>

        <h1>Page Not Found</h1>

        <p>
          Sorry, the page you are looking for doesn't exist.
        </p>

        <div className="not-found-actions">
          <Link to="/" className="home-button">
            Go Home
          </Link>

          <Link to="/books" className="books-button">
            Browse Books
          </Link>
        </div>
      </div>
    </main>
  );
}

export default NotFound;