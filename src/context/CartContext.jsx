import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  // Load cart from localStorage when the app starts
  const [cart, setCart] = useState(() => {
    try {
      const savedCart = localStorage.getItem("bookstoreCart");

      return savedCart ? JSON.parse(savedCart) : [];
    } catch (error) {
      console.error("Failed to load cart:", error);
      return [];
    }
  });

  // Save cart whenever it changes
  useEffect(() => {
    try {
      if (cart.length > 0) {
        localStorage.setItem(
          "bookstoreCart",
          JSON.stringify(cart)
        );
      } else {
        localStorage.removeItem("bookstoreCart");
      }
    } catch (error) {
      console.error("Failed to save cart:", error);
    }
  }, [cart]);

  // Add book to cart
  const addToCart = (book) => {
    setCart((prevCart) => {
      const existingBook = prevCart.find(
        (item) => item.id === book.id
      );

      if (existingBook) {
        // Maximum quantity is 10
        if (existingBook.quantity >= 10) {
          return prevCart;
        }

        return prevCart.map((item) =>
          item.id === book.id
            ? {
                ...item,
                quantity: item.quantity + 1,
              }
            : item
        );
      }

      return [
        ...prevCart,
        {
          ...book,
          quantity: 1,
        },
      ];
    });
  };

  // Remove book completely
  const removeFromCart = (id) => {
    setCart((prevCart) =>
      prevCart.filter((item) => item.id !== id)
    );
  };

  // Increase quantity
  const increaseQuantity = (id) => {
  setCart((prevCart) =>
    prevCart.map((item) =>
      item.id === id && item.quantity < 10
        ? {
            ...item,
            quantity: item.quantity + 1,
          }
        : item
    )
  );
  };

  // Decrease quantity
  const decreaseQuantity = (id) => {
    setCart((prevCart) =>
      prevCart
        .map((item) =>
          item.id === id
            ? {
                ...item,
                quantity: item.quantity - 1,
              }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  // Clear entire cart
  const clearCart = () => {
    setCart([]);
  };

  // Total number of books
  const cartCount = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  // Total price
  const cartTotal = cart.reduce(
    (total, item) =>
      total + item.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        clearCart,
        cartCount,
        cartTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  return useContext(CartContext);
};