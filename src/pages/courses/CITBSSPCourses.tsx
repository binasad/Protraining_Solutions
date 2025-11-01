import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import './CITBSSPCourses.css';

interface Course {
  id: number;
  title: string;
  shortDescription: string;
  description: string;
  price: number;
  duration: string;
  level: string;
  category: string;
  isOnline: boolean;
  image: string;
  syllabus: string[];
  learningOutcomes: string[];
  prerequisites: string;
  assessment: string;
  certificate: string;
  validity: string;
  maxStudents: number | string;
  startDates: string[];
  location: string;
  instructor: string;
  reviews: Review[];
}

interface Review {
  id: number;
  name: string;
  rating: number;
  comment: string;
}

const CITBSSPCourses = () => {
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const { addToCart } = useCart();

  const courses: Course[] = [
    {
      id: 1,
      title: "CITB Site Safety Plus (SSP)",
      shortDescription: "Essential safety training for construction professionals",
      description: "The CITB Site Safety Plus (SSP) course is designed to provide construction workers with essential health and safety knowledge. This course covers all the fundamental safety principles required to work safely on construction sites.",
      price: 299,
      duration: "1 Day",
      level: "Beginner",
      category: "construction",
      isOnline: false,
      image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      syllabus: [
        "Health and safety legislation",
        "Risk assessment and control measures",
        "Working at height safety",
        "Manual handling techniques",
        "Fire safety and emergency procedures",
        "Personal protective equipment (PPE)",
        "Site welfare facilities",
        "Accident reporting and investigation"
      ],
      learningOutcomes: [
        "Understand health and safety responsibilities",
        "Identify common hazards on construction sites",
        "Apply safe working practices",
        "Use appropriate PPE correctly",
        "Respond to emergency situations",
        "Report incidents and near misses"
      ],
      prerequisites: "No formal qualifications required. Suitable for all construction workers.",
      assessment: "Multiple choice assessment at the end of the course. Minimum 70% pass rate required.",
      certificate: "CITB Site Safety Plus (SSP) certificate",
      validity: "5 years",
      maxStudents: 20,
      startDates: ["15th January 2024", "12th February 2024", "11th March 2024"],
      location: "London Training Centre",
      instructor: "John Smith - CITB Approved Trainer",
      reviews: [
        {
          id: 1,
          name: "Mike Johnson",
          rating: 5,
          comment: "Excellent course with practical examples. Trainer was very knowledgeable."
        },
        {
          id: 2,
          name: "Sarah Williams",
          rating: 5,
          comment: "Great content and well-structured. Highly recommend for construction workers."
        }
      ]
    },
    {
      id: 2,
      title: "CITB Site Supervisor Safety Training Scheme (SSSTS)",
      shortDescription: "Advanced safety training for site supervisors",
      description: "The SSSTS course is designed for those who have, or are about to acquire, supervisory responsibilities. It provides supervisors with an understanding of health, safety, welfare and environmental issues.",
      price: 395,
      duration: "2 Days",
      level: "Intermediate",
      category: "construction",
      isOnline: false,
      image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      syllabus: [
        "Health and safety law",
        "Risk assessment and method statements",
        "Site safety management",
        "Supervision and leadership",
        "Environmental awareness",
        "Accident investigation",
        "Safety monitoring and auditing",
        "Communication and consultation"
      ],
      learningOutcomes: [
        "Understand supervisor responsibilities",
        "Implement safety management systems",
        "Conduct effective risk assessments",
        "Lead safety initiatives on site",
        "Investigate incidents and near misses",
        "Promote safety culture among workers"
      ],
      prerequisites: "Previous construction experience recommended. Suitable for supervisors and team leaders.",
      assessment: "Written assessment and practical exercises. Minimum 80% pass rate required.",
      certificate: "CITB SSSTS certificate",
      validity: "5 years",
      maxStudents: 16,
      startDates: ["22nd January 2024", "19th February 2024", "18th March 2024"],
      location: "Manchester Training Centre",
      instructor: "David Brown - CITB Approved Trainer",
      reviews: [
        {
          id: 3,
          name: "Tom Davis",
          rating: 5,
          comment: "Comprehensive course that really helped me understand my responsibilities as a supervisor."
        }
      ]
    }
  ];

  const handleCourseSelect = (course: Course) => {
    setSelectedCourse(course);
  };

  const handleAddToCart = (course: Course) => {
    addToCart(course);
    console.log('Added to cart:', course.title);
  };

  const closeModal = () => {
    setSelectedCourse(null);
  };

  return (
    <div className="citb-courses-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1>Safety Plus (SSP) Courses</h1>
          <p>Professional safety training solutions for construction professionals</p>
        </div>
      </section>

      {/* Courses Container */}
      <section className="courses-container">
        <div className="courses-grid">
          {courses.map((course) => (
            <div key={course.id} className="course-card">
              <div className="course-image">
                <img src={course.image} alt={course.title} />
                <div className="course-badge">
                  {course.isOnline ? 'Online' : 'Classroom'}
                </div>
              </div>
              
              <div className="course-content">
                <h3>{course.title}</h3>
                <p className="course-description">{course.shortDescription}</p>
                
                <div className="course-details">
                  <div className="detail-item">
                    <span className="detail-label">Duration:</span>
                    <span className="detail-value">{course.duration}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Level:</span>
                    <span className="detail-value">{course.level}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Price:</span>
                    <span className="detail-value">£{course.price}</span>
                  </div>
                </div>
                
                <div className="course-actions">
                  <button 
                    className="btn btn-primary"
                    onClick={() => handleAddToCart(course)}
                  >
                    Add to Cart
                  </button>
                  <button 
                    className="btn btn-secondary"
                    onClick={() => handleCourseSelect(course)}
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Course Modal */}
      {selectedCourse && (
        <div className="course-modal-overlay" onClick={closeModal}>
          <div className="course-modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal}>×</button>
            
            <div className="modal-content">
              <div className="modal-header">
                <img src={selectedCourse.image} alt={selectedCourse.title} />
                <div className="modal-title">
                  <h2>{selectedCourse.title}</h2>
                  <p className="course-subtitle">{selectedCourse.shortDescription}</p>
                </div>
              </div>
              
              <div className="modal-body">
                <div className="course-info-grid">
                  <div className="info-section">
                    <h3>Course Overview</h3>
                    <p>{selectedCourse.description}</p>
                  </div>
                  
                  <div className="info-section">
                    <h3>Learning Outcomes</h3>
                    <ul className="learning-outcomes">
                      {selectedCourse.learningOutcomes.map((outcome: string, index: number) => (
                        <li key={index}>{outcome}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="info-section">
                    <h3>Course Syllabus</h3>
                    <ul className="syllabus-list">
                      {selectedCourse.syllabus.map((topic: string, index: number) => (
                        <li key={index}>{topic}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="info-section">
                    <h3>Assessment & Certification</h3>
                    <div className="assessment-info">
                      <p><strong>Assessment:</strong> {selectedCourse.assessment}</p>
                      <p><strong>Certificate:</strong> {selectedCourse.certificate}</p>
                      <p><strong>Validity:</strong> {selectedCourse.validity}</p>
                    </div>
                  </div>
                  
                  <div className="info-section">
                    <h3>Course Details</h3>
                    <div className="detail-grid">
                      <div className="detail-item">
                        <span className="detail-label">Prerequisites:</span>
                        <span className="detail-value">{selectedCourse.prerequisites}</span>
                      </div>
                      <div className="detail-item">
                        <span className="detail-label">Max Students:</span>
                        <span className="detail-value">{selectedCourse.maxStudents}</span>
                      </div>
                      <div className="detail-item">
                        <span className="detail-label">Location:</span>
                        <span className="detail-value">{selectedCourse.location}</span>
                      </div>
                      <div className="detail-item">
                        <span className="detail-label">Instructor:</span>
                        <span className="detail-value">{selectedCourse.instructor}</span>
                      </div>
                    </div>
                  </div>
                  
                  {selectedCourse.reviews.length > 0 && (
                    <div className="info-section">
                      <h3>Student Reviews</h3>
                      <div className="reviews-container">
                        {selectedCourse.reviews.map((review: Review) => (
                          <div key={review.id} className="review-item">
                            <div className="review-header">
                              <span className="reviewer-name">{review.name}</span>
                              <div className="review-rating">
                                {[1, 2, 3, 4, 5].map((star) => (
                                  <span 
                                    key={star} 
                                    className={`star ${star <= review.rating ? 'filled' : ''}`}
                                  >
                                    ★
                                  </span>
                                ))}
                              </div>
                            </div>
                            <p className="review-comment">{review.comment}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="modal-actions">
                  <div className="price-section">
                    <span className="price">£{selectedCourse.price}</span>
                    <span className="price-note">per person</span>
                  </div>
                  
                  <button 
                    className="btn btn-primary btn-large"
                    onClick={() => handleAddToCart(selectedCourse)}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Why Choose Section */}
      <section className="why-choose-section">
        <div className="container">
          <h2>Why Choose Synergy Safety Solutions?</h2>
          <div className="features-grid">
            <div className="feature-item">
              <div className="feature-icon">🎓</div>
              <h3>CITB Approved</h3>
              <p>All our courses are officially approved by CITB and meet industry standards.</p>
            </div>
            <div className="feature-item">
              <div className="feature-icon">👨‍🏫</div>
              <h3>Expert Trainers</h3>
              <p>Learn from CITB approved trainers with years of construction safety experience.</p>
            </div>
            <div className="feature-item">
              <div className="feature-icon">📱</div>
              <h3>Flexible Learning</h3>
              <p>Choose between classroom-based training or online courses to fit your schedule.</p>
            </div>
            <div className="feature-item">
              <div className="feature-icon">🏆</div>
              <h3>Proven Results</h3>
              <p>High pass rates and thousands of successful graduates across the UK.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <h2>Ready to Enhance Your Safety Knowledge?</h2>
          <p>Join thousands of construction professionals who trust Synergy Safety Solutions for their training needs.</p>
          <Link to="/contact" className="btn btn-primary btn-large">
            Get Started Today
          </Link>
        </div>
      </section>
    </div>
  );
};

export default CITBSSPCourses;
