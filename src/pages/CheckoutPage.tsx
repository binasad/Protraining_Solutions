import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './CheckoutPage.css';

const CheckoutPage: React.FC = () => {
  const [paymentMethod, setPaymentMethod] = useState<'stripe' | 'paypal'>('stripe');
  const [billingInfo, setBillingInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    address: '',
    city: '',
    postcode: '',
    country: 'United Kingdom'
  });

  const [orderItems] = useState([
    {
      id: 'sssts',
      title: 'CITB Site Supervisor Safety Training Scheme (SSSTS)',
      price: 295,
      duration: '2 Days'
    }
  ]);

  const subtotal = orderItems.reduce((sum, item) => sum + item.price, 0);
  const vat = subtotal * 0.2; // 20% VAT
  const total = subtotal + vat;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setBillingInfo(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement payment processing
    console.log('Payment submitted:', { paymentMethod, billingInfo, total });
  };

  return (
    <div className="checkout-page">
      <div className="container">
        <div className="checkout-header">
          <h1>Checkout</h1>
          <p>Complete your order and choose your payment method</p>
        </div>

        <div className="checkout-content">
          <div className="checkout-form-section">
            <h2>Billing Information</h2>
            <form className="billing-form">
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="firstName">First Name *</label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={billingInfo.firstName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="lastName">Last Name *</label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={billingInfo.lastName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="email">Email Address *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={billingInfo.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="phone">Phone Number *</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={billingInfo.phone}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="company">Company Name</label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={billingInfo.company}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="address">Address *</label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={billingInfo.address}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="city">City *</label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={billingInfo.city}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="postcode">Postcode *</label>
                  <input
                    type="text"
                    id="postcode"
                    name="postcode"
                    value={billingInfo.postcode}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="country">Country *</label>
                <select
                  id="country"
                  name="country"
                  value={billingInfo.country}
                  onChange={handleInputChange}
                  required
                >
                  <option value="United Kingdom">United Kingdom</option>
                  <option value="Ireland">Ireland</option>
                  <option value="Scotland">Scotland</option>
                  <option value="Wales">Wales</option>
                </select>
              </div>
            </form>

            <div className="payment-methods">
              <h2>Payment Method</h2>
              <div className="payment-options">
                <label className={`payment-option ${paymentMethod === 'stripe' ? 'selected' : ''}`}>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="stripe"
                    checked={paymentMethod === 'stripe'}
                    onChange={() => setPaymentMethod('stripe')}
                  />
                  <div className="payment-option-content">
                    <div className="payment-icon">💳</div>
                    <div className="payment-details">
                      <h3>Credit/Debit Card</h3>
                      <p>Secure payment via Stripe</p>
                    </div>
                  </div>
                </label>

                <label className={`payment-option ${paymentMethod === 'paypal' ? 'selected' : ''}`}>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="paypal"
                    checked={paymentMethod === 'paypal'}
                    onChange={() => setPaymentMethod('paypal')}
                  />
                  <div className="payment-option-content">
                    <div className="payment-icon">📱</div>
                    <div className="payment-details">
                      <h3>PayPal</h3>
                      <p>Pay with your PayPal account</p>
                    </div>
                  </div>
                </label>
              </div>

              {paymentMethod === 'stripe' && (
                <div className="stripe-payment-form">
                  <div className="card-element">
                    <div className="card-input">
                      <input type="text" placeholder="Card Number" />
                      <input type="text" placeholder="MM/YY" />
                      <input type="text" placeholder="CVC" />
                    </div>
                  </div>
                </div>
              )}

              {paymentMethod === 'paypal' && (
                <div className="paypal-payment-form">
                  <div className="paypal-button">
                    <button className="btn btn-paypal">
                      <span className="paypal-icon">📱</span>
                      Continue with PayPal
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="checkout-summary">
            <div className="summary-card">
              <h3>Order Summary</h3>
              
              <div className="order-items">
                {orderItems.map((item) => (
                  <div key={item.id} className="order-item">
                    <div className="item-info">
                      <h4>{item.title}</h4>
                      <p className="item-duration">{item.duration}</p>
                    </div>
                    <div className="item-price">£{item.price}</div>
                  </div>
                ))}
              </div>

              <div className="summary-totals">
                <div className="summary-row">
                  <span>Subtotal:</span>
                  <span>£{subtotal}</span>
                </div>
                <div className="summary-row">
                  <span>VAT (20%):</span>
                  <span>£{vat}</span>
                </div>
                <div className="summary-row total">
                  <span>Total:</span>
                  <span>£{total}</span>
                </div>
              </div>

              <div className="summary-actions">
                <button 
                  className="btn btn-primary checkout-btn"
                  onClick={handlePaymentSubmit}
                >
                  Complete Payment
                </button>
                
                <Link to="/cart" className="btn btn-outline">
                  Back to Cart
                </Link>
              </div>

              <div className="security-info">
                <div className="security-icon">🔒</div>
                <p>Your payment information is secure and encrypted</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
