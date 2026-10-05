import { Link } from "react-router-dom";
import books from "../data/books.js";
import BookCard from "../components/BookCard";

function Home() {
  const featuredBooks = books.slice(0, 4);

  const categories = [
    {
      name: "Programming",
      icon: "💻",
      description: "Books for developers",
    },
    {
      name: "Fiction",
      icon: "📖",
      description: "Stories that inspire",
    },
    {
      name: "Self Help",
      icon: "🌱",
      description: "Improve yourself",
    },
    {
      name: "Finance",
      icon: "💰",
      description: "Build financial knowledge",
    },
  ];

  return (
    <main>
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <span className="hero-label">
            📚 Welcome to BookStore
          </span>

          <h1>
            Discover Your Next
            <span> Great Read</span>
          </h1>

          <p>
            Explore our collection of books across
            programming, fiction, self-help, finance,
            and more.
          </p>

          <div className="hero-buttons">
            <Link to="/books" className="hero-primary-button">
              Browse Books
            </Link>

            <a href="#featured" className="hero-secondary-button">
              Featured Books
            </a>
          </div>
        </div>

        <div className="hero-visual">
          <div className="book-stack">
            <div className="floating-book book-one">
              📘
            </div>

            <div className="floating-book book-two">
              📕
            </div>

            <div className="floating-book book-three">
              📗
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="categories-section">
        <div className="section-heading">
          <span>Explore</span>
          <h2>Browse by Category</h2>
          <p>
            Find books based on your interests.
          </p>
        </div>

        <div className="categories-grid">
          {categories.map((category) => (
            <Link
              key={category.name}
              to={`/books?category=${encodeURIComponent(
                category.name
              )}`}
              className="category-card"
            >
              <div className="category-icon">
                {category.icon}
              </div>

              <h3>{category.name}</h3>

              <p>{category.description}</p>

              <span>Explore →</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Books */}
      <section
        id="featured"
        className="featured-section"
      >
        <div className="section-heading featured-heading">
          <div>
            <span>Our Collection</span>
            <h2>Featured Books</h2>
            <p>
              Some of our most popular books.
            </p>
          </div>

          <Link to="/books" className="view-all-button">
            View All Books →
          </Link>
        </div>

        <div className="featured-grid">
          {featuredBooks.map((book) => (
            <BookCard
              key={book.id}
              book={book}
            />
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="home-cta">
        <div>
          <h2>Ready to find your next book?</h2>

          <p>
            Browse our complete collection and
            start reading today.
          </p>
        </div>

        <Link to="/books" className="cta-button">
          Explore Books
        </Link>
      </section>
    </main>
  );
}

export default Home;