const express = require('express');
const router = express.Router();
const Course = require('../models/Course');
const { body, validationResult } = require('express-validator');

// GET /api/courses - Get all courses
router.get('/', async (req, res) => {
  try {
    const { 
      category, 
      level, 
      isOnline, 
      search, 
      minPrice, 
      maxPrice,
      page = 1,
      limit = 12,
      sortBy = 'title',
      sortOrder = 'asc'
    } = req.query;

    // Build filter object
    const filter = { isActive: true };
    
    if (category) filter.category = category;
    if (level) filter.level = level;
    if (isOnline !== undefined) filter.isOnline = isOnline === 'true';
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = parseFloat(minPrice);
      if (maxPrice) filter.price.$lte = parseFloat(maxPrice);
    }
    
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { shortDescription: { $regex: search, $options: 'i' } }
      ];
    }

    // Build sort object
    const sort = {};
    sort[sortBy] = sortOrder === 'desc' ? -1 : 1;

    // Calculate pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);
    
    // Execute query
    const courses = await Course.find(filter)
      .sort(sort)
      .skip(skip)
      .limit(parseInt(limit))
      .select('-reviews -syllabus -learningOutcomes -prerequisites');

    // Get total count for pagination
    const total = await Course.countDocuments(filter);

    res.json({
      success: true,
      data: courses,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(total / parseInt(limit)),
        totalItems: total,
        itemsPerPage: parseInt(limit)
      }
    });
  } catch (error) {
    console.error('Error fetching courses:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error fetching courses',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
});

// GET /api/courses/:slug - Get course by slug
router.get('/:slug', async (req, res) => {
  try {
    const course = await Course.findOne({ 
      slug: req.params.slug, 
      isActive: true 
    }).populate('reviews.user', 'firstName lastName');

    if (!course) {
      return res.status(404).json({ 
        success: false, 
        message: 'Course not found' 
      });
    }

    res.json({
      success: true,
      data: course
    });
  } catch (error) {
    console.error('Error fetching course:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error fetching course',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
});

// GET /api/courses/category/:category - Get courses by category
router.get('/category/:category', async (req, res) => {
  try {
    const courses = await Course.find({ 
      category: req.params.category, 
      isActive: true 
    }).select('-reviews -syllabus -learningOutcomes -prerequisites');

    res.json({
      success: true,
      data: courses
    });
  } catch (error) {
    console.error('Error fetching courses by category:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error fetching courses by category',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
});

// GET /api/courses/search/:query - Search courses
router.get('/search/:query', async (req, res) => {
  try {
    const searchQuery = req.params.query;
    const courses = await Course.find({
      $or: [
        { title: { $regex: searchQuery, $options: 'i' } },
        { description: { $regex: searchQuery, $options: 'i' } },
        { shortDescription: { $regex: searchQuery, $options: 'i' } },
        { category: { $regex: searchQuery, $options: 'i' } }
      ],
      isActive: true
    }).select('-reviews -syllabus -learningOutcomes -prerequisites');

    res.json({
      success: true,
      data: courses,
      searchQuery
    });
  } catch (error) {
    console.error('Error searching courses:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error searching courses',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
});

// POST /api/courses/:id/review - Add course review
router.post('/:id/review', [
  body('rating').isInt({ min: 1, max: 5 }).withMessage('Rating must be between 1 and 5'),
  body('comment').isLength({ min: 10, max: 500 }).withMessage('Comment must be between 10 and 500 characters')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        success: false, 
        errors: errors.array() 
      });
    }

    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ 
        success: false, 
        message: 'Course not found' 
      });
    }

    // In a real app, you'd get the user ID from authentication
    const review = {
      user: req.body.userId || 'anonymous', // Replace with actual user ID
      rating: req.body.rating,
      comment: req.body.comment
    };

    course.reviews.push(review);
    await course.calculateAverageRating();

    res.json({
      success: true,
      message: 'Review added successfully',
      data: course
    });
  } catch (error) {
    console.error('Error adding review:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error adding review',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
});

module.exports = router;
