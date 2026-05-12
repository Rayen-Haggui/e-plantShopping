import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { removeItem, updateQuantity } from '../store/CartSlice';

function Navbar() {
  const items = useSelector(state => state.cart.items);
  const totalCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">🌿 Paradise Nursery</Link>
      <div className="navbar-links">
        <Link to="/">Home</Link>
        <Link to="/plants">Plants</Link>
        <Link to="/cart" className="cart-icon-link">
          🛒
          {totalCount > 0 && <span className="cart-count">{totalCount}</span>}
        </Link>
      </div>
    </nav>
  );
}

function CartItem() {
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.items);

  const totalCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalCost = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleIncrease = (item) => {
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
  };

  const handleDecrease = (item) => {
    if (item.quantity === 1) {
      dispatch(removeItem(item.name));
    } else {
      dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
    }
  };

  const handleDelete = (name) => {
    dispatch(removeItem(name));
  };

  const handleCheckout = () => {
    alert('Coming Soon! Thank you for shopping at Paradise Nursery 🌿');
  };

  return (
    <div className="cart-page">
      <Navbar />
      <div className="cart-container">
        <h2>Your Cart</h2>

        {cartItems.length === 0 ? (
          <div className="cart-empty">
            <p>Your cart is empty.</p>
            <Link to="/plants" className="continue-btn" style={{ marginTop: '24px', display: 'inline-block' }}>
              Browse Plants
            </Link>
          </div>
        ) : (
          <>
            <div className="cart-summary-bar">
              <span>Total Plants: <strong>{totalCount}</strong></span>
              <span>Total Cost: <strong>${totalCost.toFixed(2)}</strong></span>
            </div>

            <div className="cart-items-list">
              {cartItems.map(item => (
                <div key={item.name} className="cart-item-card">
                  <img src={item.image} alt={item.name} />
                  <div className="cart-item-details">
                    <h3>{item.name}</h3>
                    <p className="unit-price">Unit Price: ${item.price.toFixed(2)}</p>
                    <p className="item-total">Subtotal: ${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                  <div className="qty-controls">
                    <button className="qty-btn" onClick={() => handleDecrease(item)}>−</button>
                    <span className="qty-value">{item.quantity}</span>
                    <button className="qty-btn" onClick={() => handleIncrease(item)}>+</button>
                  </div>
                  <button className="delete-btn" onClick={() => handleDelete(item.name)}>
                    Delete
                  </button>
                </div>
              ))}
            </div>

            <div className="cart-actions">
              <Link to="/plants" className="continue-btn">Continue Shopping</Link>
              <button className="checkout-btn" onClick={handleCheckout}>Checkout</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default CartItem;
