const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const mongoose = require('mongoose');
const path = require('path');
const connectDB = require('./config/database');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Security Middleware
app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));

// Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// Body Parser Middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Serve static files from the React app build
const backendPublic = path.join(__dirname, 'public');
const rootBuild = path.join(__dirname, '..', 'build');
const fs = require('fs');

if (fs.existsSync(backendPublic)) {
  app.use(express.static(backendPublic));
} else if (fs.existsSync(rootBuild)) {
  app.use(express.static(rootBuild));
}

// Auth routes
app.use('/api/auth', require('./routes/auth'));

// Routes
app.use('/api/courses', require('./routes/courses'));
app.use('/api/orders', require('./routes/orders'));
app.use('/api/users', require('./routes/users'));
app.use('/api/contact', require('./routes/contact'));
app.use('/api/payments', require('./routes/payments'));

// Health Check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Synergy Safety Solutions API is running',
    timestamp: new Date().toISOString(),
    database: mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected'
  });
});

// Catch all handler: send back React's index.html file for any non-API routes
app.get('*', (req, res) => {
  if (fs.existsSync(path.join(backendPublic, 'index.html'))) {
    return res.sendFile(path.join(backendPublic, 'index.html'));
  }
  if (fs.existsSync(path.join(rootBuild, 'index.html'))) {
    return res.sendFile(path.join(rootBuild, 'index.html'));
  }
  return res.status(404).json({ message: 'Frontend build not found' });
});

// Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error'
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Synergy Safety Solutions Backend running on port ${PORT}`);
  console.log(`📱 API Health Check: http://localhost:${PORT}/api/health`);
  console.log(`🌐 Frontend URL: ${process.env.FRONTEND_URL || 'http://localhost:3000'}`);
  console.log(`🔒 Environment: ${process.env.NODE_ENV || 'development'}`);
});
