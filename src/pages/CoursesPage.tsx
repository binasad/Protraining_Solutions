import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './CoursesPage.css';

interface Course {
  id: number;
  title: string;
  shortDescription: string;
  price: number;
  duration: string;
  level: string;
  category: string;
  isOnline: boolean;
  image: string;
  badge: string;
}

const CoursesPage = () => {
  const location = useLocation();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const { addToCart } = useCart();

  // Parse URL query parameters on component mount and when location changes
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const categoryParam = searchParams.get('category');
    const typeParam = searchParams.get('type');
    
    if (categoryParam) {
      // Map URL parameters to filter IDs
      if (categoryParam === 'construction') {
        setSelectedCategory('construction');
      } else if (categoryParam === 'health') {
        setSelectedCategory('health');
      } else if (categoryParam === 'food') {
        setSelectedCategory('food');
      } else if (categoryParam === 'online') {
        setSelectedCategory('online');
      }
    } else {
      setSelectedCategory('all');
    }
  }, [location.search]);

  const categories = [
    { id: 'all', name: 'All Courses', icon: '📚' },
    { id: 'construction', name: 'Construction Safety', icon: '🏗️' },
    { id: 'health', name: 'Health & Safety', icon: '🛡️' },
    { id: 'food', name: 'Food Safety', icon: '🍽️' },
    { id: 'online', name: 'Online Courses', icon: '💻' },
    { id: 'management', name: 'Management', icon: '👥' }
  ];

  const allCourses: Course[] = [
    // CITB Courses
    {
      id: 1,
      title: "CITB Health & Safety Awareness Course",
      shortDescription: "Essential health and safety training for construction professionals",
      price: 99,
      duration: "1 Day",
      level: "Beginner",
      category: "construction",
      isOnline: false,
      image: "/images/citb-logo.png",
      badge: "Popular"
    },
    {
      id: 2,
      title: "CITB Site Supervisor Safety Training Scheme",
      shortDescription: "Advanced safety training for construction supervisors and managers",
      price: 399,
      duration: "2 Days",
      level: "Intermediate",
      category: "construction",
      isOnline: false,
      image: "/images/citb-smsts-training.png",
      badge: "Advanced"
    },
    {
      id: 3,
      title: "CITB Site Management Safety Training Scheme",
      shortDescription: "Comprehensive safety management training for senior construction staff",
      price: 499,
      duration: "5 Days",
      level: "Advanced",
      category: "construction",
      isOnline: false,
      image: "/images/citb-smsts-training.png",
      badge: "Management"
    },
    {
      id: 4,
      title: "CITB Site Management Safety Training Scheme (SMSTS) Refresher",
      shortDescription: "Refresher course for existing SMSTS certificate holders",
      price: 299,
      duration: "2 Days",
      level: "Advanced",
      category: "construction",
      isOnline: false,
      image: "/images/citb-smsts-refresher.png",
      badge: "Refresher"
    },

    // IOSH Courses
    {
      id: 5,
      title: "IOSH Managing Safely",
      shortDescription: "Professional health and safety management training",
      price: 449,
      duration: "3 Days",
      level: "Intermediate",
      category: "health",
      isOnline: false,
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      badge: "Professional"
    },
    {
      id: 6,
      title: "IOSH Working Safely",
      shortDescription: "Essential health and safety awareness for all employees",
      price: 299,
      duration: "1 Day",
      level: "Beginner",
      category: "health",
      isOnline: false,
      image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      badge: "Essential"
    },

    // First Aid Courses
    {
      id: 7,
      title: "Level 3 Emergency First Aid",
      shortDescription: "Comprehensive emergency first aid training for workplace safety",
      price: 199,
      duration: "1 Day",
      level: "Beginner",
      category: "health",
      isOnline: false,
      image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      badge: "Certified"
    },
    {
      id: 8,
      title: "First Aid at Work",
      shortDescription: "Full first aid training for workplace emergencies and incidents",
      price: 299,
      duration: "3 Days",
      level: "Intermediate",
      category: "health",
      isOnline: false,
      image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      badge: "Comprehensive"
    },

    // Fire Safety Courses
    {
      id: 9,
      title: "Level 2 Fire Marshall / Warden",
      shortDescription: "Professional fire safety training for designated fire marshals",
      price: 249,
      duration: "1 Day",
      level: "Beginner",
      category: "health",
      isOnline: false,
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      badge: "Required"
    },

    // Traffic Marshall / Banksman
    {
      id: 10,
      title: "Traffic Marshall / Banksman",
      shortDescription: "Essential traffic management and banksman training for construction sites",
      price: 199,
      duration: "1 Day",
      level: "Beginner",
      category: "construction",
      isOnline: false,
      image: "/images/traffic-marshel.png",
      badge: "Essential"
    },

    // CSCS Green Card
    {
      id: 11,
      title: "CSCS Green Card Level 1 H&S in Construction Environment",
      shortDescription: "Construction Skills Certification Scheme green card training",
      price: 179,
      duration: "1 Day",
      level: "Beginner",
      category: "construction",
      isOnline: false,
      image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      badge: "Required"
    },

    // Health and Safety Courses
    {
      id: 12,
      title: "Asbestos Awareness",
      shortDescription: "Essential asbestos awareness training for construction workers",
      price: 149,
      duration: "1 Day",
      level: "Beginner",
      category: "health",
      isOnline: false,
      image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      badge: "Essential"
    },
    {
      id: 13,
      title: "COSHH Awareness",
      shortDescription: "Control of Substances Hazardous to Health awareness training",
      price: 149,
      duration: "1 Day",
      level: "Beginner",
      category: "health",
      isOnline: false,
      image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      badge: "Required"
    },
    {
      id: 14,
      title: "Manual Handling",
      shortDescription: "Safe manual handling techniques and best practices training",
      price: 179,
      duration: "1 Day",
      level: "Beginner",
      category: "health",
      isOnline: false,
      image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      badge: "Essential"
    },
    {
      id: 15,
      title: "Working at Heights",
      shortDescription: "Safety training for working at elevated positions and heights",
      price: 249,
      duration: "1 Day",
      level: "Beginner",
      category: "construction",
      isOnline: false,
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      badge: "Required"
    },
    {
      id: 16,
      title: "Abrasive Wheels",
      shortDescription: "Safety training for working with abrasive wheels and cutting tools",
      price: 199,
      duration: "1 Day",
      level: "Beginner",
      category: "construction",
      isOnline: false,
      image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      badge: "Specialized"
    },

    // Online Courses
    {
      id: 17,
      title: "Online CITB SSP",
      shortDescription: "Complete CITB Site Safety Plus course online at your own pace",
      price: 199,
      duration: "Self-paced",
      level: "Beginner",
      category: "online",
      isOnline: true,
      image: "/images/citb-logo.png",
      badge: "Online"
    },
    {
      id: 18,
      title: "Online Traffic Marshall",
      shortDescription: "Complete traffic marshall training online with flexible learning",
      price: 149,
      duration: "Self-paced",
      level: "Beginner",
      category: "online",
      isOnline: true,
      image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      badge: "Online"
    },
    {
      id: 19,
      title: "Online Fire Marshall",
      shortDescription: "Complete fire marshall training online with comprehensive modules",
      price: 179,
      duration: "Self-paced",
      level: "Beginner",
      category: "online",
      isOnline: true,
      image: "/images/fire-marshel-online.png",
      badge: "Online"
    },

    // Management Courses
    {
      id: 20,
      title: "Safety Management Systems",
      shortDescription: "Implementing effective safety management systems for organizations",
      price: 599,
      duration: "3 Days",
      level: "Advanced",
      category: "management",
      isOnline: false,
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      badge: "Management"
    },
    {
      id: 21,
      title: "Leadership in Safety",
      shortDescription: "Developing safety leadership skills for managers and supervisors",
      price: 499,
      duration: "2 Days",
      level: "Advanced",
      category: "management",
      isOnline: false,
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      badge: "Leadership"
    }
  ];

  const filteredCourses = allCourses.filter(course => {
    const matchesCategory = selectedCategory === 'all' || course.category === selectedCategory;
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         course.shortDescription.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategory(categoryId);
    // Update URL without page reload
    const newUrl = categoryId === 'all' ? '/courses' : `/courses?category=${categoryId}`;
    window.history.pushState({}, '', newUrl);
  };

  const handleAddToCart = (course: Course) => {
    addToCart(course);
    // You could add a toast notification here
    console.log('Added to cart:', course.title);
  };

  return (
    <div className="courses-page">
      {/* Search and Filters */}
      <section className="search-section">
        <div className="container">
          <div className="search-container">
            <div className="search-box">
              <input
                type="text"
                placeholder="Search courses..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <span className="search-icon">🔍</span>
            </div>
          </div>
          
          <div className="category-filters">
            {categories.map((category) => (
              <button
                key={category.id}
                className={`filter-btn ${selectedCategory === category.id ? 'active' : ''}`}
                onClick={() => handleCategoryChange(category.id)}
              >
                <span className="filter-icon">{category.icon}</span>
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Courses Grid */}
      <section className="courses-section">
        <div className="container">
          <div className="courses-header">
            <h2>Available Courses</h2>
            <p>{filteredCourses.length} courses found</p>
          </div>
          
          <div className="courses-grid">
            {filteredCourses.map((course) => (
              <div key={course.id} className="course-card">
                <div className="course-image">
                  <img src={course.image} alt={course.title} />
                  {course.badge && <span className="course-badge">{course.badge}</span>}
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
                    <button className="btn btn-primary" onClick={() => handleAddToCart(course)}>
                      Add to Cart
                    </button>
                    <Link to={`/courses/citb-ssp`} className="btn btn-secondary">
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="why-choose-section">
        <div className="container">
          <h2>Why Choose Synergy Safety Solutions?</h2>
          <div className="features-grid">
            <div className="feature-item">
              <div className="feature-icon">🎓</div>
              <h3>Accredited Training</h3>
              <p>All our courses are accredited by recognized safety organizations and meet industry standards.</p>
            </div>
            <div className="feature-item">
              <div className="feature-icon">👨‍🏫</div>
              <h3>Expert Instructors</h3>
              <p>Learn from industry professionals with years of experience in safety training and compliance.</p>
            </div>
            <div className="feature-item">
              <div className="feature-icon">📱</div>
              <h3>Flexible Learning</h3>
              <p>Choose between classroom-based training or online courses to fit your schedule and preferences.</p>
            </div>
            <div className="feature-item">
              <div className="feature-icon">🏆</div>
              <h3>Proven Results</h3>
              <p>Thousands of professionals have successfully completed our courses and improved their safety practices.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <h2>Ready to Enhance Your Team's Safety Standards?</h2>
          <p>Join hundreds of companies who trust Synergy Safety Solutions for their training and compliance needs.</p>
          <Link to="/contact" className="btn btn-primary btn-large">
            Get Started Today
          </Link>
        </div>
      </section>
    </div>
  );
};

export default CoursesPage;
