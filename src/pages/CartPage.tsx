import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './CartPage.css';

const CartPage: React.FC = () => {
  const { cartItems, removeFromCart, updateQuantity, getSubtotal, getVAT, getTotalPrice } = useCart();

  if (cartItems.length === 0) {
    return (
      <div className="cart-page">
        <div className="container">
          <div className="empty-cart">
            <h1>Your Cart is Empty</h1>
            <p>Looks like you haven't added any courses to your cart yet.</p>
            <Link to="/courses" className="btn btn-primary btn-large">
              Browse Courses
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="container">
        <div className="cart-header">
          <h1>Shopping Cart</h1>
          <p>Review your selected courses and proceed to checkout</p>
        </div>

        <div className="cart-content">
          <div className="cart-items">
            <h2>Selected Courses ({cartItems.length})</h2>
            
            {cartItems.map((item) => (
              <div key={item.id} className="cart-item">
                <div className="item-image">
                  <img src={item.image} alt={item.title} />
                </div>
                
                <div className="item-details">
                  <h3>{item.title}</h3>
                  <p className="item-duration">Duration: {item.duration}</p>
                  <p className="item-price">£{item.price}</p>
                </div>
                
                <div className="item-quantity">
                  <label htmlFor={`quantity-${item.id}`}>Qty:</label>
                  <select
                    id={`quantity-${item.id}`}
                    value={item.quantity}
                    onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                  >
                    {[1, 2, 3, 4, 5].map(num => (
                      <option key={num} value={num}>{num}</option>
                    ))}
                  </select>
                </div>
                
                <div className="item-total">
                  <span className="total-amount">£{item.price * item.quantity}</span>
                </div>
                
                <button
                  className="remove-btn"
                  onClick={() => removeFromCart(item.id)}
                  aria-label={`Remove ${item.title} from cart`}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          <div className="order-summary">
            <h2>Order Summary</h2>
            
            <div className="summary-row">
              <span>Subtotal:</span>
              <span>£{getSubtotal()}</span>
            </div>
            
            <div className="summary-row">
              <span>VAT (20%):</span>
              <span>£{getVAT()}</span>
            </div>
            
            <div className="summary-row total">
              <span>Total:</span>
              <span>£{getTotalPrice() + getVAT()}</span>
            </div>
            
            <Link to="/checkout" className="btn btn-primary btn-large checkout-btn">
              Proceed to Checkout
            </Link>
            
            <div className="cart-actions">
              <Link to="/courses" className="btn btn-secondary">
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
