import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

function Checkout() {
  const { cart, cartTotal, clearCart } = useCart();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    payment: "cod",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Prevent checkout with an empty cart
  if (cart.length === 0) {
    return (
      <main className="checkout-page">
        <div className="checkout-empty">
          <div className="empty-icon">🛒</div>

          <h1>Your Cart is Empty</h1>

          <p>
            Add some books before proceeding to checkout.
          </p>

          <Link to="/books" className="shop-button">
            Browse Books
          </Link>
        </div>
      </main>
    );
  }

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    // Remove error when user starts correcting the field
    if (errors[name]) {
      setErrors((previous) => ({
        ...previous,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required.";
    } else if (formData.name.trim().length < 3) {
      newErrors.name = "Name must contain at least 3 characters.";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
        formData.email
      )
    ) {
      newErrors.email = "Enter a valid email address.";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required.";
    } else if (!/^[6-9]\d{9}$/.test(formData.phone)) {
      newErrors.phone =
        "Enter a valid 10-digit Indian phone number.";
    }

    if (!formData.address.trim()) {
      newErrors.address = "Address is required.";
    }

    if (!formData.city.trim()) {
      newErrors.city = "City is required.";
    }

    if (!formData.state.trim()) {
      newErrors.state = "State is required.";
    }

    if (!formData.pincode.trim()) {
      newErrors.pincode = "Pincode is required.";
    } else if (!/^\d{6}$/.test(formData.pincode)) {
      newErrors.pincode =
        "Pincode must contain exactly 6 digits.";
    }

    return newErrors;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (isSubmitting) {
      return;
    }

    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);

    const orderId = `BK${Date.now()
      .toString()
      .slice(-6)}`;

    const order = {
      orderId,
      customer: formData,
      items: cart,
      total: cartTotal,
      createdAt: new Date().toISOString(),
    };

    localStorage.setItem(
      "bookstoreOrder",
      JSON.stringify(order)
    );

    clearCart();

    navigate("/order-success");
  };

  return (
    <main className="checkout-page">
      <div className="checkout-container">
        <div className="checkout-header">
          <Link to="/cart" className="back-link">
            ← Back to Cart
          </Link>

          <h1>Checkout</h1>

          <p>
            Enter your details to complete your order.
          </p>
        </div>

        <form
          className="checkout-form"
          onSubmit={handleSubmit}
          noValidate
        >
          <div className="checkout-details">
            {/* Customer Information */}
            <section className="checkout-section">
              <h2>Customer Information</h2>

              <div className="form-group">
                <label htmlFor="name">
                  Full Name *
                </label>

                <input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  className={errors.name ? "input-error" : ""}
                />

                {errors.name && (
                  <span className="error-message">
                    {errors.name}
                  </span>
                )}
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="email">
                    Email *
                  </label>

                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    className={
                      errors.email ? "input-error" : ""
                    }
                  />

                  {errors.email && (
                    <span className="error-message">
                      {errors.email}
                    </span>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="phone">
                    Phone *
                  </label>

                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    maxLength="10"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="10-digit number"
                    className={
                      errors.phone ? "input-error" : ""
                    }
                  />

                  {errors.phone && (
                    <span className="error-message">
                      {errors.phone}
                    </span>
                  )}
                </div>
              </div>
            </section>

            {/* Delivery Address */}
            <section className="checkout-section">
              <h2>Delivery Address</h2>

              <div className="form-group">
                <label htmlFor="address">
                  Address *
                </label>

                <textarea
                  id="address"
                  name="address"
                  rows="3"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="House number, street, area..."
                  className={
                    errors.address ? "input-error" : ""
                  }
                />

                {errors.address && (
                  <span className="error-message">
                    {errors.address}
                  </span>
                )}
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="city">
                    City *
                  </label>

                  <input
                    id="city"
                    name="city"
                    type="text"
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="City"
                    className={
                      errors.city ? "input-error" : ""
                    }
                  />

                  {errors.city && (
                    <span className="error-message">
                      {errors.city}
                    </span>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="state">
                    State *
                  </label>

                  <input
                    id="state"
                    name="state"
                    type="text"
                    value={formData.state}
                    onChange={handleChange}
                    placeholder="State"
                    className={
                      errors.state ? "input-error" : ""
                    }
                  />

                  {errors.state && (
                    <span className="error-message">
                      {errors.state}
                    </span>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="pincode">
                    Pincode *
                  </label>

                  <input
                    id="pincode"
                    name="pincode"
                    type="text"
                    inputMode="numeric"
                    maxLength="6"
                    value={formData.pincode}
                    onChange={handleChange}
                    placeholder="6-digit pincode"
                    className={
                      errors.pincode ? "input-error" : ""
                    }
                  />

                  {errors.pincode && (
                    <span className="error-message">
                      {errors.pincode}
                    </span>
                  )}
                </div>
              </div>
            </section>

            {/* Payment */}
            <section className="checkout-section">
              <h2>Payment Method</h2>

              <label className="payment-option">
                <input
                  type="radio"
                  name="payment"
                  value="cod"
                  checked={formData.payment === "cod"}
                  onChange={handleChange}
                />

                <div>
                  <strong>
                    Cash on Delivery
                  </strong>

                  <span>
                    Pay when your order arrives.
                  </span>
                </div>
              </label>

              <label className="payment-option">
                <input
                  type="radio"
                  name="payment"
                  value="card"
                  checked={formData.payment === "card"}
                  onChange={handleChange}
                />

                <div>
                  <strong>
                    Credit / Debit Card
                  </strong>

                  <span>
                    Demo payment — no real transaction.
                  </span>
                </div>
              </label>
            </section>
          </div>

          {/* Order Summary */}
          <aside className="checkout-summary">
            <h2>Order Summary</h2>

            <div className="checkout-items">
              {cart.map((item) => (
                <div
                  className="checkout-item"
                  key={item.id}
                >
                  <div>
                    <strong>{item.title}</strong>

                    <span>
                      ₹{item.price} × {item.quantity}
                    </span>
                  </div>

                  <strong>
                    ₹{item.price * item.quantity}
                  </strong>
                </div>
              ))}
            </div>

            <div className="checkout-total">
              <span>Total</span>
              <strong>₹{cartTotal}</strong>
            </div>

            <button
              type="submit"
              className="place-order-button"
              disabled={isSubmitting}
            >
              {isSubmitting
                ? "Placing Order..."
                : "Place Order"}
            </button>

            <p className="secure-note">
              🔒 Your information is secure.
            </p>
          </aside>
        </form>
      </div>
    </main>
  );
}

export default Checkout;