# 📚 BookStore - Interactive Bookstore

A modern and responsive bookstore web application built with React.js.

Users can browse books, search and filter the collection, view book details, manage their shopping cart, and place orders through a checkout flow.

## 🚀 Live Demo

Coming soon...

## ✨ Features

- 📚 Browse books
- 🔍 Search books by title or author
- 🏷️ Filter books by category
- 💰 Filter books by maximum price
- ↕️ Sort books by price, rating, and name
- 📖 View detailed book information
- 🛒 Add books to cart
- ➕ Increase book quantity
- ➖ Decrease book quantity
- 🔢 Maximum quantity limit of 10 per book
- 🗑️ Remove books from cart
- 💾 Cart persistence using LocalStorage
- 💳 Checkout form with validation
- 📦 Order placement
- 🧾 Order confirmation page
- 🔔 Add-to-cart notifications
- ❌ Custom 404 page
- 📱 Responsive design

## 🛠️ Tech Stack

- React.js
- Vite
- React Router
- Context API
- JavaScript
- HTML5
- CSS3
- LocalStorage

## 📂 Project Structure

```text
src/
├── components/
│   ├── BookCard.jsx
│   ├── Navbar.jsx
│   └── Toast.jsx
│
├── context/
│   └── CartContext.jsx
│
├── data/
│   └── books.js
│
├── pages/
│   ├── Home.jsx
│   ├── Books.jsx
│   ├── BookDetails.jsx
│   ├── Cart.jsx
│   ├── Checkout.jsx
│   ├── OrderSuccess.jsx
│   └── NotFound.jsx
│
├── App.jsx
├── main.jsx
└── index.css