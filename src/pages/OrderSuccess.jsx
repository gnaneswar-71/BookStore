import { Link } from "react-router-dom";

function OrderSuccess() {
  const savedOrder = localStorage.getItem("bookstoreOrder");

  if (!savedOrder) {
    return (
      <main className="success-page">
        <div className="success-card">
          <h1>No Order Found</h1>

          <p>
            We couldn't find any recent order.
          </p>

          <Link to="/books" className="shop-button">
            Browse Books
          </Link>
        </div>
      </main>
    );
  }

  const order = JSON.parse(savedOrder);

  return (
    <main className="success-page">

      <div className="success-card">

        {/* Success Icon */}

        <div className="success-icon">
          ✓
        </div>

        <h1>Order Placed Successfully!</h1>

        <p className="success-message">
          Thank you for shopping with our bookstore.
          Your order has been placed successfully.
        </p>

        {/* Order ID */}

        <div className="order-id">
          <span>Order ID</span>

          <strong>
            {order.orderId}
          </strong>
        </div>

        {/* Customer Information */}

        <div className="success-section">

          <h2>Delivery Information</h2>

          <div className="customer-info">

            <p>
              <strong>Name:</strong>{" "}
              {order.customer.name}
            </p>

            <p>
              <strong>Email:</strong>{" "}
              {order.customer.email}
            </p>

            <p>
              <strong>Phone:</strong>{" "}
              {order.customer.phone}
            </p>

            <p>
              <strong>Address:</strong>{" "}
              {order.customer.address},{" "}
              {order.customer.city},{" "}
              {order.customer.state} -{" "}
              {order.customer.pincode}
            </p>

          </div>

        </div>

        {/* Ordered Books */}

        <div className="success-section">

          <h2>Order Details</h2>

          <div className="success-items">

            {order.items.map((item) => (
              <div
                className="success-item"
                key={item.id}
              >

                <img
                  src={item.image}
                  alt={item.title}
                />

                <div className="success-item-info">

                  <strong>
                    {item.title}
                  </strong>

                  <span>
                    {item.author}
                  </span>

                  <span>
                    Quantity: {item.quantity}
                  </span>

                </div>

                <strong>
                  ₹{item.price * item.quantity}
                </strong>

              </div>
            ))}

          </div>

        </div>

        {/* Total */}

        <div className="success-total">

          <span>Total Amount</span>

          <strong>
            ₹{order.total}
          </strong>

        </div>

        <div className="payment-info">
          Payment Method:{" "}
          <strong>
            {order.customer.payment === "cod"
              ? "Cash on Delivery"
              : "Credit / Debit Card"}
          </strong>
        </div>

        {/* Continue Shopping */}

        <Link
          to="/books"
          className="shop-button success-button"
        >
          Continue Shopping
        </Link>

      </div>

    </main>
  );
}

export default OrderSuccess;