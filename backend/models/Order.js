const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  orderNumber: {
    type: String,
    required: true,
    unique: true
  },
  customer: {
    firstName: {
      type: String,
      required: [true, 'First name is required'],
      trim: true
    },
    lastName: {
      type: String,
      required: [true, 'Last name is required'],
      trim: true
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      lowercase: true
    },
    phone: {
      type: String,
      required: [true, 'Phone number is required']
    },
    company: {
      type: String,
      trim: true
    },
    address: {
      street: String,
      city: String,
      state: String,
      postalCode: String,
      country: {
        type: String,
        default: 'United Kingdom'
      }
    }
  },
  courses: [{
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Course',
      required: true
    },
    title: String,
    price: Number,
    quantity: {
      type: Number,
      default: 1,
      min: 1
    },
    startDate: Date,
    location: String
  }],
  orderSummary: {
    subtotal: {
      type: Number,
      required: true
    },
    vat: {
      type: Number,
      required: true
    },
    total: {
      type: Number,
      required: true
    },
    currency: {
      type: String,
      default: 'GBP'
    }
  },
  payment: {
    method: {
      type: String,
      required: [true, 'Payment method is required'],
      enum: ['Stripe', 'PayPal', 'Bank Transfer', 'Invoice']
    },
    status: {
      type: String,
      required: true,
      enum: ['Pending', 'Processing', 'Completed', 'Failed', 'Refunded'],
      default: 'Pending'
    },
    transactionId: String,
    paymentDate: Date,
    gateway: String
  },
  status: {
    type: String,
    required: true,
    enum: ['Pending', 'Confirmed', 'In Progress', 'Completed', 'Cancelled'],
    default: 'Pending'
  },
  bookingDetails: {
    preferredDates: [Date],
    specialRequirements: String,
    dietaryRestrictions: String,
    accessibilityNeeds: String
  },
  notes: {
    customer: String,
    internal: String
  },
  documents: [{
    name: String,
    url: String,
    type: String,
    uploadedAt: {
      type: Date,
      default: Date.now
    }
  }],
  communication: [{
    type: {
      type: String,
      enum: ['Email', 'SMS', 'Phone', 'System']
    },
    subject: String,
    message: String,
    sentAt: {
      type: Date,
      default: Date.now
    },
    status: {
      type: String,
      enum: ['Sent', 'Delivered', 'Failed'],
      default: 'Sent'
    }
  }]
}, {
  timestamps: true
});

// Generate order number
orderSchema.pre('save', function(next) {
  if (!this.isModified('orderNumber')) return next();
  
  if (!this.orderNumber) {
    const date = new Date();
    const year = date.getFullYear().toString().slice(-2);
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    this.orderNumber = `SSS${year}${month}${day}${random}`;
  }
  next();
});

// Calculate totals
orderSchema.methods.calculateTotals = function() {
  const subtotal = this.courses.reduce((sum, course) => sum + (course.price * course.quantity), 0);
  const vat = subtotal * 0.2; // 20% VAT
  const total = subtotal + vat;
  
  this.orderSummary = {
    subtotal: Math.round(subtotal * 100) / 100,
    vat: Math.round(vat * 100) / 100,
    total: Math.round(total * 100) / 100,
    currency: 'GBP'
  };
  
  return this.save();
};

// Get order status
orderSchema.methods.getStatus = function() {
  return this.status;
};

// Update order status
orderSchema.methods.updateStatus = function(newStatus) {
  this.status = newStatus;
  return this.save();
};

module.exports = mongoose.model('Order', orderSchema);
