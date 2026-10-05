import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import books from "../data/books.js";
import BookCard from "../components/BookCard";

function Books() {
  const [searchParams, setSearchParams] = useSearchParams();

  const categoryFromUrl =
    searchParams.get("category") || "";

  const [search, setSearch] = useState("");
  const [category, setCategory] =
    useState(categoryFromUrl);
  const [maxPrice, setMaxPrice] = useState("");
  const [sortBy, setSortBy] = useState("");

  useEffect(() => {
    setCategory(categoryFromUrl);
  }, [categoryFromUrl]);

  const categories = [
    ...new Set(books.map((book) => book.category)),
  ];

  const filteredBooks = books
    .filter((book) => {
      const matchesSearch =
        book.title
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        book.author
          .toLowerCase()
          .includes(search.toLowerCase());

      const matchesCategory =
        category === "" ||
        book.category === category;

      const matchesPrice =
        maxPrice === "" ||
        book.price <= Number(maxPrice);

      return (
        matchesSearch &&
        matchesCategory &&
        matchesPrice
      );
    })
    .sort((a, b) => {
      if (sortBy === "price-low") {
        return a.price - b.price;
      }

      if (sortBy === "price-high") {
        return b.price - a.price;
      }

      if (sortBy === "rating") {
        return b.rating - a.rating;
      }

      if (sortBy === "name") {
        return a.title.localeCompare(b.title);
      }

      return 0;
    });

  const handleCategoryChange = (event) => {
    const value = event.target.value;

    setCategory(value);

    if (value) {
      setSearchParams({
        category: value,
      });
    } else {
      setSearchParams({});
    }
  };

  const clearFilters = () => {
    setSearch("");
    setCategory("");
    setMaxPrice("");
    setSortBy("");
    setSearchParams({});
  };

  return (
    <main className="books-page">
      <div className="books-header">
        <div>
          <span className="books-label">
            Our Collection
          </span>

          <h1>Browse Books</h1>

          <p>
            Discover your next favorite book.
          </p>
        </div>
      </div>

      <div className="filters">
        {/* Search */}
        <div className="filter-group search-group">
          <label htmlFor="search">
            Search
          </label>

          <input
            id="search"
            type="text"
            placeholder="Search by title or author..."
            value={search}
            onChange={(event) =>
              setSearch(event.target.value)
            }
          />
        </div>

        {/* Category */}
        <div className="filter-group">
          <label htmlFor="category">
            Category
          </label>

          <select
            id="category"
            value={category}
            onChange={handleCategoryChange}
          >
            <option value="">
              All Categories
            </option>

            {categories.map((item) => (
              <option
                key={item}
                value={item}
              >
                {item}
              </option>
            ))}
          </select>
        </div>

        {/* Price */}
        <div className="filter-group">
          <label htmlFor="maxPrice">
            Max Price
          </label>

          <input
            id="maxPrice"
            type="number"
            placeholder="₹ Maximum"
            value={maxPrice}
            onChange={(event) =>
              setMaxPrice(event.target.value)
            }
          />
        </div>

        {/* Sort */}
        <div className="filter-group">
          <label htmlFor="sort">
            Sort By
          </label>

          <select
            id="sort"
            value={sortBy}
            onChange={(event) =>
              setSortBy(event.target.value)
            }
          >
            <option value="">
              Default
            </option>

            <option value="price-low">
              Price: Low to High
            </option>

            <option value="price-high">
              Price: High to Low
            </option>

            <option value="rating">
              Rating: High to Low
            </option>

            <option value="name">
              Name: A-Z
            </option>
          </select>
        </div>

        <button
          className="clear-filter-button"
          onClick={clearFilters}
        >
          Clear Filters
        </button>
      </div>

      <div className="books-result-header">
        <p>
          Showing{" "}
          <strong>{filteredBooks.length}</strong>{" "}
          {filteredBooks.length === 1
            ? "book"
            : "books"}
        </p>

        {category && (
          <span className="active-filter">
            Category: {category}
          </span>
        )}
      </div>

      {filteredBooks.length > 0 ? (
        <div className="books-grid">
          {filteredBooks.map((book) => (
            <BookCard
              key={book.id}
              book={book}
            />
          ))}
        </div>
      ) : (
        <div className="no-books">
          <div className="no-books-icon">
            📚
          </div>

          <h2>No Books Found</h2>

          <p>
            Try changing your search or filters.
          </p>

          <button
            onClick={clearFilters}
            className="clear-filter-button"
          >
            Clear Filters
          </button>
        </div>
      )}
    </main>
  );
}

export default Books;