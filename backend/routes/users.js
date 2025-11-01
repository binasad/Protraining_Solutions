const express = require('express');
const router = express.Router();

// GET /api/users - Get user profile (placeholder for future authentication)
router.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'User management endpoints coming soon',
    data: {
      features: [
        'User registration and login',
        'Profile management',
        'Course history',
        'Certificate management',
        'Booking preferences'
      ]
    }
  });
});

module.exports = router;
