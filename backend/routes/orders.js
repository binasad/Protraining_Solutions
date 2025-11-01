const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const { body, validationResult } = require('express-validator');

// GET /api/orders - Get all orders (with pagination)
router.get('/', async (req, res) => {
  try {
    const { 
      status, 
      customerEmail, 
      page = 1, 
      limit = 20,
      sortBy = 'createdAt',
      sortOrder = 'desc'
    } = req.query;

    // Build filter object
    const filter = {};
    if (status) filter.status = status;
    if (customerEmail) filter['customer.email'] = customerEmail;

    // Build sort object
    const sort = {};
    sort[sortBy] = sortOrder === 'desc' ? -1 : 1;

    // Calculate pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);
    
    // Execute query
    const orders = await Order.find(filter)
      .sort(sort)
      .skip(skip)
      .limit(parseInt(limit))
      .populate('courses.course', 'title image');

    // Get total count for pagination
    const total = await Order.countDocuments(filter);

    res.json({
      success: true,
      data: orders,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(total / parseInt(limit)),
        totalItems: total,
        itemsPerPage: parseInt(limit)
      }
    });
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error fetching orders',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
});

// GET /api/orders/:orderNumber - Get order by order number
router.get('/:orderNumber', async (req, res) => {
  try {
    const order = await Order.findOne({ 
      orderNumber: req.params.orderNumber 
    }).populate('courses.course', 'title image description');

    if (!order) {
      return res.status(404).json({ 
        success: false, 
        message: 'Order not found' 
      });
    }

    res.json({
      success: true,
      data: order
    });
  } catch (error) {
    console.error('Error fetching order:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error fetching order',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
});

// POST /api/orders - Create new order
router.post('/', [
  body('customer.firstName').notEmpty().withMessage('First name is required'),
  body('customer.lastName').notEmpty().withMessage('Last name is required'),
  body('customer.email').isEmail().withMessage('Valid email is required'),
  body('customer.phone').notEmpty().withMessage('Phone number is required'),
  body('courses').isArray({ min: 1 }).withMessage('At least one course is required'),
  body('courses.*.course').notEmpty().withMessage('Course ID is required'),
  body('courses.*.price').isNumeric().withMessage('Valid price is required'),
  body('payment.method').isIn(['Stripe', 'PayPal', 'Bank Transfer', 'Invoice']).withMessage('Valid payment method is required')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        success: false, 
        errors: errors.array() 
      });
    }

    // Create new order
    const order = new Order(req.body);
    
    // Calculate totals
    await order.calculateTotals();
    
    // Save order
    await order.save();

    res.status(201).json({
      success: true,
      message: 'Order created successfully',
      data: order
    });
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error creating order',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
});

// PUT /api/orders/:orderNumber/status - Update order status
router.put('/:orderNumber/status', [
  body('status').isIn(['Pending', 'Confirmed', 'In Progress', 'Completed', 'Cancelled']).withMessage('Valid status is required')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        success: false, 
        errors: errors.array() 
      });
    }

    const order = await Order.findOne({ orderNumber: req.params.orderNumber });
    if (!order) {
      return res.status(404).json({ 
        success: false, 
        message: 'Order not found' 
      });
    }

    order.status = req.body.status;
    await order.save();

    res.json({
      success: true,
      message: 'Order status updated successfully',
      data: order
    });
  } catch (error) {
    console.error('Error updating order status:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error updating order status',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
});

// PUT /api/orders/:orderNumber/payment - Update payment status
router.put('/:orderNumber/payment', [
  body('paymentStatus').isIn(['Pending', 'Processing', 'Completed', 'Failed', 'Refunded']).withMessage('Valid payment status is required'),
  body('transactionId').optional().isString().withMessage('Transaction ID must be a string')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        success: false, 
        errors: errors.array() 
      });
    }

    const order = await Order.findOne({ orderNumber: req.params.orderNumber });
    if (!order) {
      return res.status(404).json({ 
        success: false, 
        message: 'Order not found' 
      });
    }

    order.payment.status = req.body.paymentStatus;
    if (req.body.transactionId) {
      order.payment.transactionId = req.body.transactionId;
    }
    if (req.body.paymentStatus === 'Completed') {
      order.payment.paymentDate = new Date();
    }

    await order.save();

    res.json({
      success: true,
      message: 'Payment status updated successfully',
      data: order
    });
  } catch (error) {
    console.error('Error updating payment status:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error updating payment status',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
});

// DELETE /api/orders/:orderNumber - Cancel order
router.delete('/:orderNumber', async (req, res) => {
  try {
    const order = await Order.findOne({ orderNumber: req.params.orderNumber });
    if (!order) {
      return res.status(404).json({ 
        success: false, 
        message: 'Order not found' 
      });
    }

    // Only allow cancellation of pending or confirmed orders
    if (!['Pending', 'Confirmed'].includes(order.status)) {
      return res.status(400).json({ 
        success: false, 
        message: 'Cannot cancel order in current status' 
      });
    }

    order.status = 'Cancelled';
    await order.save();

    res.json({
      success: true,
      message: 'Order cancelled successfully',
      data: order
    });
  } catch (error) {
    console.error('Error cancelling order:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error cancelling order',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
});

module.exports = router;
