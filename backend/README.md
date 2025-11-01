# 🚀 Synergy Safety Solutions Backend API

A robust Node.js + Express.js backend for the Synergy Safety Solutions training website, featuring course management, order processing, payment integration, and automated email notifications.

## ✨ Features

- **Course Management**: CRUD operations for safety training courses
- **Order Processing**: Complete order lifecycle management
- **Payment Integration**: Stripe and PayPal payment processing
- **Email Automation**: Contact forms and quote requests
- **Security**: Rate limiting, CORS, and input validation
- **Database**: MongoDB with Mongoose ODM
- **API Documentation**: RESTful endpoints with validation

## 🛠️ Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB + Mongoose
- **Authentication**: JWT (future implementation)
- **Payments**: Stripe + PayPal
- **Email**: Nodemailer
- **Validation**: Express-validator
- **Security**: Helmet, CORS, Rate Limiting

## 📋 Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or cloud)
- npm or yarn
- Email service credentials (Gmail recommended)
- Stripe account (for payments)
- PayPal account (for payments)

## 🚀 Quick Start

### 1. Install Dependencies

```bash
cd backend
npm install
```

### 2. Environment Configuration

Copy the environment template and configure your settings:

```bash
cp env.example .env
```

Edit `.env` with your actual credentials:

```env
# Server Configuration
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:3000

# Database Configuration
MONGODB_URI=mongodb://localhost:27017/synergy_safety_db

# Email Configuration
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=info@synergysafetysolutions.co.uk
EMAIL_PASS=your-app-password-here

# Stripe Configuration
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key_here
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret_here

# PayPal Configuration
PAYPAL_CLIENT_ID=your_paypal_client_id_here
PAYPAL_CLIENT_SECRET=your_paypal_client_secret_here
```

### 3. Start the Server

```bash
# Development mode with auto-reload
npm run dev

# Production mode
npm start
```

The API will be available at `http://localhost:5000`

## 📚 API Endpoints

### Health Check
- `GET /api/health` - API status and database connection

### Courses
- `GET /api/courses` - List all courses with filtering and pagination
- `GET /api/courses/:slug` - Get course by slug
- `GET /api/courses/category/:category` - Get courses by category
- `GET /api/courses/search/:query` - Search courses
- `POST /api/courses/:id/review` - Add course review

### Orders
- `GET /api/orders` - List all orders with pagination
- `GET /api/orders/:orderNumber` - Get order by order number
- `POST /api/orders` - Create new order
- `PUT /api/orders/:orderNumber/status` - Update order status
- `PUT /api/orders/:orderNumber/payment` - Update payment status
- `DELETE /api/orders/:orderNumber` - Cancel order

### Contact
- `POST /api/contact` - Submit contact form
- `POST /api/contact/quote` - Request training quote

### Payments
- `POST /api/payments/create-payment-intent` - Create Stripe payment intent
- `POST /api/payments/confirm-payment` - Confirm Stripe payment
- `POST /api/payments/paypal-create-order` - Create PayPal order
- `POST /api/payments/paypal-capture` - Capture PayPal payment
- `GET /api/payments/methods` - Get available payment methods

### Users (Future)
- `GET /api/users` - User management endpoints (coming soon)

## 🗄️ Database Models

### Course
- Title, description, price, duration
- Category, level, accreditation
- Syllabus, learning outcomes, prerequisites
- Reviews and ratings
- Online/offline availability

### Order
- Customer information and billing
- Course selections and quantities
- Payment status and tracking
- Booking details and special requirements
- Communication history

## 🔐 Security Features

- **Input Validation**: All inputs validated using express-validator
- **Rate Limiting**: 100 requests per 15 minutes per IP
- **CORS Protection**: Configurable cross-origin resource sharing
- **Helmet**: Security headers and protection
- **Data Sanitization**: Input cleaning and normalization

## 📧 Email Features

- **Contact Forms**: Automated customer inquiry handling
- **Quote Requests**: Professional quote generation
- **Order Confirmations**: Booking confirmations and updates
- **Customizable Templates**: HTML email templates with branding

## 💳 Payment Integration

### Stripe
- Payment intent creation
- Webhook handling
- Multiple currency support
- Automatic payment methods

### PayPal
- Order creation and capture
- Multiple currency support
- Webhook integration (future)

## 🚀 Deployment

### Local Development
```bash
npm run dev
```

### Production
```bash
npm start
```

### Environment Variables
Ensure all required environment variables are set in production:
- Database connection strings
- Payment gateway credentials
- Email service credentials
- Security keys and secrets

## 📁 Project Structure

```
backend/
├── config/
│   └── database.js          # MongoDB connection
├── models/
│   ├── Course.js            # Course data model
│   └── Order.js             # Order data model
├── routes/
│   ├── courses.js           # Course API endpoints
│   ├── orders.js            # Order API endpoints
│   ├── contact.js           # Contact form endpoints
│   ├── payments.js          # Payment processing
│   └── users.js             # User management (future)
├── server.js                # Main server file
├── package.json             # Dependencies and scripts
├── env.example              # Environment template
└── README.md                # This file
```

## 🔧 Development

### Adding New Routes
1. Create route file in `routes/` directory
2. Add validation using express-validator
3. Include in `server.js`
4. Update this README

### Adding New Models
1. Create model file in `models/` directory
2. Define schema with validation
3. Add methods as needed
4. Update related routes

### Testing
```bash
# Test API endpoints
curl http://localhost:5000/api/health

# Test course listing
curl http://localhost:5000/api/courses

# Test contact form
curl -X POST http://localhost:5000/api/contact \
  -H "Content-Type: application/json" \
  -d '{"firstName":"John","lastName":"Doe","email":"john@example.com","phone":"1234567890","message":"Test message"}'
```

## 🤝 Contributing

1. Follow the existing code structure
2. Add proper validation and error handling
3. Update documentation
4. Test thoroughly before submitting

## 📞 Support

For technical support or questions:
- **Email**: info@synergysafetysolutions.co.uk
- **Phone**: 0203 488 2333

## 📄 License

This project is licensed under the MIT License.

---

**Built with ❤️ for Synergy Safety Solutions**
