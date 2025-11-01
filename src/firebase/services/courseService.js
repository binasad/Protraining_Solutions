import { 
  collection, 
  doc, 
  getDocs, 
  getDoc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  where, 
  orderBy, 
  limit, 
  startAfter,
  Timestamp 
} from 'firebase/firestore';
import { db } from '../config';

const COURSES_COLLECTION = 'courses';

// Get all courses with pagination and filtering
export const getCourses = async (filters = {}, page = 1, limitCount = 12) => {
  try {
    let q = collection(db, COURSES_COLLECTION);
    
    // Apply filters
    if (filters.category) {
      q = query(q, where('category', '==', filters.category));
    }
    if (filters.level) {
      q = query(q, where('level', '==', filters.level));
    }
    if (filters.isOnline !== undefined) {
      q = query(q, where('isOnline', '==', filters.isOnline));
    }
    if (filters.minPrice || filters.maxPrice) {
      if (filters.minPrice) {
        q = query(q, where('price', '>=', filters.minPrice));
      }
      if (filters.maxPrice) {
        q = query(q, where('price', '<=', filters.maxPrice));
      }
    }
    
    // Apply sorting
    q = query(q, orderBy('title', 'asc'));
    
    // Apply pagination
    const offset = (page - 1) * limitCount;
    q = query(q, limit(limitCount));
    
    const snapshot = await getDocs(q);
    const courses = [];
    
    snapshot.forEach((doc) => {
      courses.push({
        id: doc.id,
        ...doc.data()
      });
    });
    
    return {
      success: true,
      data: courses,
      pagination: {
        currentPage: page,
        totalItems: courses.length,
        itemsPerPage: limitCount
      }
    };
  } catch (error) {
    console.error('Error fetching courses:', error);
    return {
      success: false,
      message: 'Error fetching courses',
      error: error.message
    };
  }
};

// Get course by ID
export const getCourseById = async (courseId) => {
  try {
    const docRef = doc(db, COURSES_COLLECTION, courseId);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return {
        success: true,
        data: {
          id: docSnap.id,
          ...docSnap.data()
        }
      };
    } else {
      return {
        success: false,
        message: 'Course not found'
      };
    }
  } catch (error) {
    console.error('Error fetching course:', error);
    return {
      success: false,
      message: 'Error fetching course',
      error: error.message
    };
  }
};

// Get course by slug
export const getCourseBySlug = async (slug) => {
  try {
    const q = query(
      collection(db, COURSES_COLLECTION),
      where('slug', '==', slug),
      where('isActive', '==', true)
    );
    
    const snapshot = await getDocs(q);
    
    if (!snapshot.empty) {
      const doc = snapshot.docs[0];
      return {
        success: true,
        data: {
          id: doc.id,
          ...doc.data()
        }
      };
    } else {
      return {
        success: false,
        message: 'Course not found'
      };
    }
  } catch (error) {
    console.error('Error fetching course by slug:', error);
    return {
      success: false,
      message: 'Error fetching course',
      error: error.message
    };
  }
};

// Search courses
export const searchCourses = async (searchQuery) => {
  try {
    // Note: Firestore doesn't support full-text search natively
    // For production, consider using Algolia or similar service
    const q = query(
      collection(db, COURSES_COLLECTION),
      where('isActive', '==', true)
    );
    
    const snapshot = await getDocs(q);
    const courses = [];
    
    snapshot.forEach((doc) => {
      const courseData = doc.data();
      const searchableText = `${courseData.title} ${courseData.description} ${courseData.shortDescription} ${courseData.category}`.toLowerCase();
      
      if (searchableText.includes(searchQuery.toLowerCase())) {
        courses.push({
          id: doc.id,
          ...courseData
        });
      }
    });
    
    return {
      success: true,
      data: courses,
      searchQuery
    };
  } catch (error) {
    console.error('Error searching courses:', error);
    return {
      success: false,
      message: 'Error searching courses',
      error: error.message
    };
  }
};

// Get courses by category
export const getCoursesByCategory = async (category) => {
  try {
    const q = query(
      collection(db, COURSES_COLLECTION),
      where('category', '==', category),
      where('isActive', '==', true)
    );
    
    const snapshot = await getDocs(q);
    const courses = [];
    
    snapshot.forEach((doc) => {
      courses.push({
        id: doc.id,
        ...doc.data()
      });
    });
    
    return {
      success: true,
      data: courses
    };
  } catch (error) {
    console.error('Error fetching courses by category:', error);
    return {
      success: false,
      message: 'Error fetching courses by category',
      error: error.message
    };
  }
};

// Add course review
export const addCourseReview = async (courseId, reviewData) => {
  try {
    const courseRef = doc(db, COURSES_COLLECTION, courseId);
    const courseSnap = await getDoc(courseRef);
    
    if (!courseSnap.exists()) {
      return {
        success: false,
        message: 'Course not found'
      };
    }
    
    const courseData = courseSnap.data();
    const reviews = courseData.reviews || [];
    
    // Add new review
    const newReview = {
      ...reviewData,
      date: Timestamp.now(),
      id: Date.now().toString() // Simple ID generation
    };
    
    reviews.push(newReview);
    
    // Calculate new average rating
    const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
    const averageRating = totalRating / reviews.length;
    
    // Update course with new review and rating
    await updateDoc(courseRef, {
      reviews: reviews,
      averageRating: averageRating,
      totalReviews: reviews.length
    });
    
    return {
      success: true,
      message: 'Review added successfully',
      data: {
        id: courseId,
        reviews: reviews,
        averageRating: averageRating,
        totalReviews: reviews.length
      }
    };
  } catch (error) {
    console.error('Error adding review:', error);
    return {
      success: false,
      message: 'Error adding review',
      error: error.message
    };
  }
};

// Create new course (Admin only)
export const createCourse = async (courseData) => {
  try {
    const docRef = await addDoc(collection(db, COURSES_COLLECTION), {
      ...courseData,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
      isActive: true,
      averageRating: 0,
      totalReviews: 0
    });
    
    return {
      success: true,
      message: 'Course created successfully',
      data: {
        id: docRef.id,
        ...courseData
      }
    };
  } catch (error) {
    console.error('Error creating course:', error);
    return {
      success: false,
      message: 'Error creating course',
      error: error.message
    };
  }
};

// Update course (Admin only)
export const updateCourse = async (courseId, updateData) => {
  try {
    const courseRef = doc(db, COURSES_COLLECTION, courseId);
    await updateDoc(courseRef, {
      ...updateData,
      updatedAt: Timestamp.now()
    });
    
    return {
      success: true,
      message: 'Course updated successfully'
    };
  } catch (error) {
    console.error('Error updating course:', error);
    return {
      success: false,
      message: 'Error updating course',
      error: error.message
    };
  }
};

// Delete course (Admin only)
export const deleteCourse = async (courseId) => {
  try {
    await deleteDoc(doc(db, COURSES_COLLECTION, courseId));
    
    return {
      success: true,
      message: 'Course deleted successfully'
    };
  } catch (error) {
    console.error('Error deleting course:', error);
    return {
      success: false,
      message: 'Error deleting course',
      error: error.message
    };
  }
};
