const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Course title is required'],
    trim: true,
    maxlength: [200, 'Course title cannot exceed 200 characters']
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  description: {
    type: String,
    required: [true, 'Course description is required']
  },
  shortDescription: {
    type: String,
    maxlength: [300, 'Short description cannot exceed 300 characters']
  },
  price: {
    type: Number,
    required: [true, 'Course price is required'],
    min: [0, 'Price cannot be negative']
  },
  duration: {
    type: String,
    required: [true, 'Course duration is required']
  },
  category: {
    type: String,
    required: [true, 'Course category is required'],
    enum: ['CITB', 'IOSH', 'NEBOSH', 'First Aid', 'Fire Safety', 'Traffic Marshal', 'CSCS', 'Online']
  },
  level: {
    type: String,
    required: [true, 'Course level is required'],
    enum: ['Beginner', 'Intermediate', 'Advanced', 'Professional']
  },
  accreditation: {
    type: String,
    required: [true, 'Course accreditation is required']
  },
  image: {
    type: String,
    required: [true, 'Course image is required']
  },
  gallery: [{
    type: String
  }],
  syllabus: [{
    title: String,
    description: String,
    duration: String
  }],
  learningOutcomes: [{
    type: String
  }],
  prerequisites: [{
    type: String
  }],
  assessment: {
    type: String,
    required: [true, 'Assessment method is required']
  },
  certificate: {
    type: String,
    required: [true, 'Certificate type is required']
  },
  validity: {
    type: String,
    required: [true, 'Certificate validity is required']
  },
  isOnline: {
    type: Boolean,
    default: false
  },
  isActive: {
    type: Boolean,
    default: true
  },
  maxStudents: {
    type: Number,
    default: 20
  },
  startDates: [{
    type: Date
  }],
  location: {
    type: String,
    default: 'London, UK'
  },
  instructor: {
    name: String,
    bio: String,
    image: String
  },
  reviews: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    rating: {
      type: Number,
      min: 1,
      max: 5
    },
    comment: String,
    date: {
      type: Date,
      default: Date.now
    }
  }],
  averageRating: {
    type: Number,
    default: 0
  },
  totalReviews: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

// Create slug from title
courseSchema.pre('save', function(next) {
  if (!this.isModified('title')) return next();
  this.slug = this.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  next();
});

// Calculate average rating
courseSchema.methods.calculateAverageRating = function() {
  if (this.reviews.length === 0) {
    this.averageRating = 0;
    this.totalReviews = 0;
  } else {
    const totalRating = this.reviews.reduce((sum, review) => sum + review.rating, 0);
    this.averageRating = totalRating / this.reviews.length;
    this.totalReviews = this.reviews.length;
  }
  return this.save();
};

module.exports = mongoose.model('Course', courseSchema);
