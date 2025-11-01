const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// POST /api/payments/create-payment-intent - Create Stripe payment intent
router.post('/create-payment-intent', [
  body('amount').isNumeric().withMessage('Valid amount is required'),
  body('currency').optional().isIn(['gbp', 'usd', 'eur']).withMessage('Valid currency is required'),
  body('orderId').notEmpty().withMessage('Order ID is required'),
  body('customerEmail').isEmail().withMessage('Valid customer email is required')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        success: false, 
        errors: errors.array() 
      });
    }

    const { amount, currency = 'gbp', orderId, customerEmail, description } = req.body;

    // Create payment intent with Stripe
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Convert to cents
      currency: currency,
      metadata: {
        orderId: orderId,
        customerEmail: customerEmail
      },
      description: description || `Payment for order ${orderId}`,
      automatic_payment_methods: {
        enabled: true,
      },
    });

    res.json({
      success: true,
      data: {
        clientSecret: paymentIntent.client_secret,
        paymentIntentId: paymentIntent.id
      }
    });

  } catch (error) {
    console.error('Error creating payment intent:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error creating payment intent',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
});

// POST /api/payments/confirm-payment - Confirm Stripe payment
router.post('/confirm-payment', [
  body('paymentIntentId').notEmpty().withMessage('Payment intent ID is required'),
  body('orderId').notEmpty().withMessage('Order ID is required')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        success: false, 
        errors: errors.array() 
      });
    }

    const { paymentIntentId, orderId } = req.body;

    // Retrieve payment intent from Stripe
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

    if (paymentIntent.status === 'succeeded') {
      // Payment successful - update order status
      // In a real app, you'd update the order in your database here
      
      res.json({
        success: true,
        message: 'Payment confirmed successfully',
        data: {
          paymentStatus: 'completed',
          transactionId: paymentIntent.id,
          amount: paymentIntent.amount / 100,
          currency: paymentIntent.currency
        }
      });
    } else {
      res.status(400).json({
        success: false,
        message: 'Payment not completed',
        data: {
          paymentStatus: paymentIntent.status
        }
      });
    }

  } catch (error) {
    console.error('Error confirming payment:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error confirming payment',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
});

// POST /api/payments/paypal-create-order - Create PayPal order
router.post('/paypal-create-order', [
  body('amount').isNumeric().withMessage('Valid amount is required'),
  body('currency').optional().isIn(['GBP', 'USD', 'EUR']).withMessage('Valid currency is required'),
  body('orderId').notEmpty().withMessage('Order ID is required'),
  body('customerEmail').isEmail().withMessage('Valid customer email is required')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        success: false, 
        errors: errors.array() 
      });
    }

    const { amount, currency = 'GBP', orderId, customerEmail, description } = req.body;

    // In a real app, you'd integrate with PayPal API here
    // For now, we'll return a mock response
    
    const paypalOrderId = `PAYPAL_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    res.json({
      success: true,
      message: 'PayPal order created successfully',
      data: {
        paypalOrderId: paypalOrderId,
        orderId: orderId,
        amount: amount,
        currency: currency,
        status: 'created'
      }
    });

  } catch (error) {
    console.error('Error creating PayPal order:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error creating PayPal order',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
});

// POST /api/payments/paypal-capture - Capture PayPal payment
router.post('/paypal-capture', [
  body('paypalOrderId').notEmpty().withMessage('PayPal order ID is required'),
  body('orderId').notEmpty().withMessage('Order ID is required')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        success: false, 
        errors: errors.array() 
      });
    }

    const { paypalOrderId, orderId } = req.body;

    // In a real app, you'd capture the payment with PayPal API here
    // For now, we'll return a mock response

    res.json({
      success: true,
      message: 'PayPal payment captured successfully',
      data: {
        paypalOrderId: paypalOrderId,
        orderId: orderId,
        paymentStatus: 'completed',
        transactionId: `PAYPAL_TXN_${Date.now()}`,
        capturedAt: new Date().toISOString()
      }
    });

  } catch (error) {
    console.error('Error capturing PayPal payment:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error capturing PayPal payment',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
});

// POST /api/payments/webhook/stripe - Stripe webhook handler
router.post('/webhook/stripe', express.raw({ type: 'application/json' }), async (req, res) => {
  const sig = req.headers['stripe-signature'];
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle the event
  switch (event.type) {
    case 'payment_intent.succeeded':
      const paymentIntent = event.data.object;
      console.log('Payment succeeded:', paymentIntent.id);
      
      // Update order status in your database
      // await updateOrderPaymentStatus(paymentIntent.metadata.orderId, 'completed');
      
      break;
      
    case 'payment_intent.payment_failed':
      const failedPayment = event.data.object;
      console.log('Payment failed:', failedPayment.id);
      
      // Update order status in your database
      // await updateOrderPaymentStatus(failedPayment.metadata.orderId, 'failed');
      
      break;
      
    default:
      console.log(`Unhandled event type: ${event.type}`);
  }

  res.json({ received: true });
});

// GET /api/payments/methods - Get available payment methods
router.get('/methods', (req, res) => {
  res.json({
    success: true,
    data: {
      stripe: {
        enabled: true,
        currencies: ['GBP', 'USD', 'EUR'],
        methods: ['card', 'sepa_debit', 'sofort']
      },
      paypal: {
        enabled: true,
        currencies: ['GBP', 'USD', 'EUR'],
        methods: ['paypal', 'paypal_credit']
      },
      bankTransfer: {
        enabled: true,
        currencies: ['GBP'],
        methods: ['bacs', 'chaps']
      },
      invoice: {
        enabled: true,
        currencies: ['GBP'],
        methods: ['net30', 'net60']
      }
    }
  });
});

module.exports = router;
