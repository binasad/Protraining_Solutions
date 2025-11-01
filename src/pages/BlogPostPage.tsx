import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './BlogPostPage.css';

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  category: string[];
  image: string;
  readTime: string;
  fullContent: string;
}

const BlogPostPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const blogPosts: BlogPost[] = [
    {
      id: 1,
      title: "How Emergency First Aid Training Helps in Workplace Emergencies",
      excerpt: "Learn how emergency first aid training can be crucial in handling workplace emergencies and saving lives.",
      content: "Emergency first aid training is essential for workplace safety. This comprehensive guide covers how proper training can help employees respond effectively to medical emergencies, reduce response times, and potentially save lives in critical situations.",
      fullContent: `
        <h2>Introduction</h2>
        <p>Emergency first aid training is a critical component of workplace safety that can make the difference between life and death in critical situations. In today's fast-paced work environments, accidents and medical emergencies can happen at any moment, making it essential for employees to be equipped with the knowledge and skills to respond effectively.</p>
        
        <h2>Why Emergency First Aid Training Matters</h2>
        <p>When a medical emergency occurs in the workplace, every second counts. Proper first aid training ensures that employees can:</p>
        <ul>
          <li>Assess the situation quickly and accurately</li>
          <li>Provide immediate care to stabilize the victim</li>
          <li>Reduce the severity of injuries</li>
          <li>Improve recovery outcomes</li>
          <li>Prevent further harm</li>
        </ul>
        
        <h2>Key Benefits of Workplace First Aid Training</h2>
        <h3>1. Immediate Response</h3>
        <p>Trained employees can provide immediate assistance while waiting for professional medical help to arrive. This rapid response can significantly improve outcomes for victims of accidents, heart attacks, or other medical emergencies.</p>
        
        <h3>2. Reduced Response Time</h3>
        <p>With trained first aiders on site, the time between an incident occurring and help being provided is minimized. This is crucial for conditions like cardiac arrest, where every minute without intervention reduces survival chances by 7-10%.</p>
        
        <h3>3. Life-Saving Skills</h3>
        <p>First aid training covers essential life-saving techniques including:</p>
        <ul>
          <li>Cardiopulmonary resuscitation (CPR)</li>
          <li>Automated external defibrillator (AED) use</li>
          <li>Bleeding control and wound management</li>
          <li>Choking relief</li>
          <li>Burn treatment</li>
        </ul>
        
        <h2>Training Requirements and Standards</h2>
        <p>Emergency first aid training should meet recognized standards and be regularly updated. The training typically covers:</p>
        <ul>
          <li>Basic life support techniques</li>
          <li>Emergency response procedures</li>
          <li>Communication with emergency services</li>
          <li>Documentation and reporting</li>
          <li>Legal considerations and responsibilities</li>
        </ul>
        
        <h2>Conclusion</h2>
        <p>Investing in emergency first aid training is not just a legal requirement in many jurisdictions—it's a moral obligation to protect the health and safety of employees. The skills learned in these courses can save lives and create a safer, more prepared workplace environment.</p>
      `,
      author: "HAT",
      date: "March 21, 2025",
      category: ["Emergency First Aid at Work", "Level 3 Emergency First Aid at Work"],
      image: "/images/blog/emergency-first-aid.jpg",
      readTime: "5 min read"
    },
    {
      id: 2,
      title: "How Long Does a Level 3 First Aid At Work Course Take to Complete?",
      excerpt: "Understanding the duration and requirements for completing a Level 3 First Aid At Work course.",
      content: "The Level 3 First Aid At Work course is a comprehensive training program designed to equip participants with essential first aid skills. This article explains the course duration, structure, and what participants can expect to learn.",
      fullContent: `
        <h2>Course Overview</h2>
        <p>The Level 3 First Aid At Work course is a comprehensive qualification designed for individuals who need to be first aiders in their workplace. This course provides the knowledge and skills required to handle a wide range of first aid situations.</p>
        
        <h2>Course Duration</h2>
        <p>The standard Level 3 First Aid At Work course typically takes <strong>3 days (18 hours)</strong> to complete. This includes both theoretical learning and practical hands-on training to ensure participants are confident in their abilities.</p>
        
        <h2>Course Structure</h2>
        <h3>Day 1: Foundation Skills</h3>
        <ul>
          <li>Understanding the role of a first aider</li>
          <li>Health and safety regulations</li>
          <li>Basic life support and CPR</li>
          <li>Managing unconscious casualties</li>
        </ul>
        
        <h3>Day 2: Emergency Response</h3>
        <ul>
          <li>Wound management and bleeding control</li>
          <li>Fractures and sprains</li>
          <li>Medical conditions (diabetes, epilepsy, asthma)</li>
          <li>Practical scenarios and assessments</li>
        </ul>
        
        <h3>Day 3: Advanced Techniques</h3>
        <ul>
          <li>Head and spinal injuries</li>
          <li>Burns and scalds</li>
          <li>Poisoning and eye injuries</li>
          <li>Final assessments and certification</li>
        </ul>
        
        <h2>Assessment and Certification</h2>
        <p>Participants are continuously assessed throughout the course and must pass practical assessments to receive their certificate. The qualification is valid for 3 years, after which a 2-day requalification course is required.</p>
        
        <h2>Who Should Attend?</h2>
        <p>This course is ideal for:</p>
        <ul>
          <li>Workplace first aiders</li>
          <li>Health and safety officers</li>
          <li>Team leaders and supervisors</li>
          <li>Anyone responsible for workplace safety</li>
        </ul>
      `,
      author: "HAT",
      date: "March 20, 2025",
      category: ["First Aid", "First Aid At Work Course", "Level 3 First Aid At Work Course"],
      image: "/images/blog/how-long.png",
      readTime: "4 min read"
    },
    {
      id: 3,
      title: "How Long is the SSSTS Course and is it Hard to Pass?",
      excerpt: "Everything you need to know about the SSSTS course duration and difficulty level.",
      content: "The SSSTS (Site Supervisor Safety Training Scheme) course is a vital qualification for construction site supervisors. Learn about the course length, difficulty, and tips for successful completion.",
      fullContent: `
        <h2>What is the SSSTS Course?</h2>
        <p>The SSSTS (Site Supervisor Safety Training Scheme) is a CITB-accredited qualification designed for construction site supervisors, foremen, and managers. This course provides essential knowledge about health and safety responsibilities in construction environments.</p>
        
        <h2>Course Duration</h2>
        <p>The SSSTS course is a <strong>2-day intensive program</strong> that typically runs from 8:00 AM to 4:30 PM each day. The total contact time is approximately 16 hours, making it a comprehensive but manageable commitment for busy professionals.</p>
        
        <h2>Course Content and Structure</h2>
        <h3>Day 1: Foundation Knowledge</h3>
        <ul>
          <li>Health and safety law and regulations</li>
          <li>Risk assessment and method statements</li>
          <li>Site safety management</li>
          <li>Accident prevention and investigation</li>
          <li>Environmental awareness</li>
        </ul>
        
        <h3>Day 2: Practical Application</h3>
        <ul>
          <li>Supervision and communication</li>
          <li>Toolbox talks and safety briefings</li>
          <li>Working at height and excavations</li>
          <li>Fire prevention and emergency procedures</li>
          <li>Assessment and certification</li>
        </ul>
        
        <h2>Is the SSSTS Course Hard to Pass?</h2>
        <p>The SSSTS course is designed to be challenging but achievable for construction professionals. Here's what to expect:</p>
        
        <h3>Difficulty Level: Moderate</h3>
        <p>While the course covers complex topics, it's structured to build knowledge progressively. The pass rate is typically high (around 85-90%) for participants who:</p>
        <ul>
          <li>Have some construction experience</li>
          <li>Attend all sessions actively</li>
          <li>Complete the required reading</li>
          <li>Participate in discussions and activities</li>
        </ul>
        
        <h2>Assessment Methods</h2>
        <p>The course uses multiple assessment methods:</p>
        <ul>
          <li><strong>Continuous Assessment:</strong> Active participation and engagement throughout the course</li>
          <li><strong>Written Assessment:</strong> Multiple-choice questions testing knowledge retention</li>
          <li><strong>Practical Assessment:</strong> Demonstrating understanding through scenarios</li>
        </ul>
        
        <h2>Tips for Success</h2>
        <h3>Before the Course</h3>
        <ul>
          <li>Review basic health and safety concepts</li>
          <li>Familiarize yourself with construction terminology</li>
          <li>Ensure you have the required experience (minimum 6 months)</li>
        </ul>
        
        <h3>During the Course</h3>
        <ul>
          <li>Participate actively in discussions</li>
          <li>Take detailed notes</li>
          <li>Ask questions when concepts are unclear</li>
          <li>Practice with the provided materials</li>
        </ul>
        
        <h2>Prerequisites and Requirements</h2>
        <p>To enroll in the SSSTS course, you typically need:</p>
        <ul>
          <li>At least 6 months of construction experience</li>
          <li>Basic understanding of English</li>
          <li>No previous health and safety qualifications required</li>
        </ul>
        
        <h2>What Happens After Completion?</h2>
        <p>Upon successful completion, you'll receive:</p>
        <ul>
          <li>A CITB SSSTS certificate (valid for 5 years)</li>
          <li>Access to the Construction Skills Register</li>
          <li>Recognition across the construction industry</li>
          <li>Foundation for advanced health and safety qualifications</li>
        </ul>
        
        <h2>Conclusion</h2>
        <p>The SSSTS course is a valuable investment in your construction career. While it requires commitment and active participation, the qualification opens doors to supervisory roles and demonstrates your commitment to workplace safety. With proper preparation and engagement, most participants find the course challenging but rewarding.</p>
        
        <p><strong>Ready to advance your career?</strong> Contact us to learn more about upcoming SSSTS course dates and enrollment options.</p>
      `,
      author: "HAT",
      date: "March 19, 2025",
      category: ["CITB SSSTS Course", "SSSTS Course", "SSSTS Course Online"],
      image: "/images/blog/blog-ssst.png",
      readTime: "6 min read"
    },
    {
      id: 4,
      title: "How to Get a CSCS Green Card in 24 Hours",
      excerpt: "Fast-track your CSCS Green Card application with our comprehensive guide.",
      content: "The CSCS Green Card is essential for construction workers. This guide shows you how to obtain your card quickly, including the application process, requirements, and tips for same-day results.",
      fullContent: `
        <h2>Understanding the CSCS Green Card</h2>
        <p>The CSCS (Construction Skills Certification Scheme) Green Card is a fundamental qualification that demonstrates your competence in health and safety within the construction industry. This card is often a requirement for accessing construction sites and securing employment.</p>
        
        <h2>What is the CSCS Green Card?</h2>
        <p>The Green Card is awarded upon successful completion of the Level 1 Award in Health and Safety in a Construction Environment. It's designed for workers who need to demonstrate basic health and safety awareness on construction sites.</p>
        
        <h2>Course Requirements and Duration</h2>
        <h3>Course Length</h3>
        <p>The Level 1 course typically takes <strong>1 day (6-8 hours)</strong> to complete, making it possible to obtain your Green Card within 24 hours of starting the process.</p>
        
        <h3>Assessment Method</h3>
        <ul>
          <li>Multiple-choice examination</li>
          <li>45 questions to be completed in 45 minutes</li>
          <li>Pass mark: 36 out of 45 (80%)</li>
          <li>Immediate results available</li>
        </ul>
        
        <h2>Step-by-Step Process</h2>
        <h3>Step 1: Choose Your Training Provider</h3>
        <p>Select an accredited training center that offers:</p>
        <ul>
          <li>CITB-accredited courses</li>
          <li>Same-day assessment</li>
          <li>Immediate certificate issuance</li>
          <li>Online application support</li>
        </ul>
        
        <h3>Step 2: Complete the Course</h3>
        <p>Attend the one-day training session covering:</p>
        <ul>
          <li>Health and safety legislation</li>
          <li>Risk assessment and control</li>
          <li>Hazard identification</li>
          <li>Personal protective equipment</li>
          <li>Emergency procedures</li>
        </ul>
        
        <h3>Step 3: Take the Assessment</h3>
        <p>Complete the online or paper-based assessment immediately after training. Results are typically available within minutes.</p>
        
        <h3>Step 4: Apply for Your Card</h3>
        <p>Once you pass the assessment:</p>
        <ul>
          <li>Receive your certificate</li>
          <li>Apply online for your CSCS card</li>
          <li>Pay the application fee (£36)</li>
          <li>Receive your card within 5-10 working days</li>
        </ul>
        
        <h2>Prerequisites</h2>
        <p>To enroll in the course, you need:</p>
        <ul>
          <li>Basic understanding of English</li>
          <li>No previous construction experience required</li>
          <li>Valid identification documents</li>
        </ul>
        
        <h2>Benefits of the Green Card</h2>
        <ul>
          <li>Access to construction sites</li>
          <li>Improved employment opportunities</li>
          <li>Demonstration of safety awareness</li>
          <li>Foundation for advanced qualifications</li>
          <li>Industry recognition and credibility</li>
        </ul>
        
        <h2>Tips for Success</h2>
        <h3>Before the Course</h3>
        <ul>
          <li>Get a good night's sleep</li>
          <li>Review basic health and safety concepts</li>
          <li>Bring required identification</li>
        </ul>
        
        <h3>During the Course</h3>
        <ul>
          <li>Pay attention to key concepts</li>
          <li>Take notes on important points</li>
          <li>Ask questions if anything is unclear</li>
          <li>Stay focused during the assessment</li>
        </ul>
        
        <h2>What Happens After?</h2>
        <p>Your Green Card is valid for 5 years. To maintain your qualification, you'll need to:</p>
        <ul>
          <li>Complete a refresher course before expiry</li>
          <li>Or progress to higher-level qualifications</li>
          <li>Keep your contact details updated</li>
        </ul>
        
        <h2>Conclusion</h2>
        <p>Getting your CSCS Green Card in 24 hours is achievable with the right preparation and training provider. This qualification opens doors to construction opportunities and demonstrates your commitment to workplace safety.</p>
      `,
      author: "HAT",
      date: "March 18, 2025",
      category: ["CSCS Green Card", "CSCS Green Card same day results", "Level 1 Award in Health & Safety in a Construction Environment", "Level 1 Health and Safety course"],
      image: "/images/blog/cscs-green-card.png",
      readTime: "7 min read"
    },
    {
      id: 5,
      title: "Can You Do SSSTS Course Online?",
      excerpt: "Exploring the possibilities of completing your SSSTS course through online learning.",
      content: "Online learning has become increasingly popular, but can you complete your SSSTS qualification online? Discover the options available and what to consider when choosing your training method.",
      fullContent: `
        <h2>Online SSSTS Course Options</h2>
        <p>The SSSTS (Site Supervisor Safety Training Scheme) course is traditionally delivered in-person, but recent developments have introduced online alternatives. However, it's important to understand the limitations and requirements of online delivery.</p>
        
        <h2>Current Online Availability</h2>
        <p>As of 2025, the SSSTS course has limited online availability due to:</p>
        <ul>
          <li>CITB requirements for practical assessment</li>
          <li>Need for hands-on training in safety procedures</li>
          <li>Industry standards requiring face-to-face interaction</li>
        </ul>
        
        <h2>What's Available Online</h2>
        <h3>1. Blended Learning Approach</h3>
        <p>Some providers offer a hybrid model:</p>
        <ul>
          <li>Online theory modules (self-paced)</li>
          <li>Virtual classroom sessions</li>
          <li>In-person practical assessment (1 day)</li>
          <li>Reduced classroom time</li>
        </ul>
        
        <h3>2. Pre-Course Learning</h3>
        <p>Online resources to prepare for the in-person course:</p>
        <ul>
          <li>Study materials and guides</li>
          <li>Practice assessments</li>
          <li>Video tutorials</li>
          <li>Interactive learning modules</li>
        </ul>
        
        <h2>Traditional vs. Online Considerations</h2>
        <h3>Traditional In-Person Course</h3>
        <p><strong>Advantages:</strong></p>
        <ul>
          <li>Full CITB accreditation</li>
          <li>Immediate practical application</li>
          <li>Direct instructor interaction</li>
          <li>Hands-on safety demonstrations</li>
          <li>Industry-recognized qualification</li>
        </ul>
        
        <p><strong>Disadvantages:</strong></p>
        <ul>
          <li>Requires travel and time off work</li>
          <li>Fixed schedule</li>
          <li>Higher cost due to venue and materials</li>
        </ul>
        
        <h3>Online/Blended Learning</h3>
        <p><strong>Advantages:</strong></p>
        <ul>
          <li>Flexible scheduling</li>
          <li>Reduced travel time</li>
          <li>Self-paced learning</li>
          <li>Cost-effective</li>
        </ul>
        
        <p><strong>Disadvantages:</strong></p>
        <ul>
          <li>Limited practical experience</li>
          <li>May not meet all CITB requirements</li>
          <li>Reduced interaction with instructors</li>
          <li>Potential industry recognition issues</li>
        </ul>
        
        <h2>Industry Recognition</h2>
        <p>When choosing your SSSTS course, consider:</p>
        <ul>
          <li><strong>CITB Accreditation:</strong> Ensures industry recognition</li>
          <li><strong>Employer Requirements:</strong> Some companies prefer traditional courses</li>
          <li><strong>Career Progression:</strong> Full qualification opens more opportunities</li>
          <li><strong>Site Access:</strong> Some sites require traditional certification</li>
        </ul>
        
        <h2>Making the Right Choice</h2>
        <h3>Choose Traditional If:</h3>
        <ul>
          <li>You need full CITB accreditation</li>
          <li>Your employer requires traditional certification</li>
          <li>You prefer hands-on learning</li>
          <li>You want maximum industry recognition</li>
        </ul>
        
        <h3>Consider Blended If:</h3>
        <ul>
          <li>You have limited time for classroom attendance</li>
          <li>You're comfortable with online learning</li>
          <li>You can attend the required practical assessment</li>
          <li>Cost is a significant factor</li>
        </ul>
        
        <h2>Future of Online SSSTS</h2>
        <p>The construction industry is gradually embracing digital learning, but safety training requires careful consideration of practical elements. We expect to see:</p>
        <ul>
          <li>More blended learning options</li>
          <li>Enhanced virtual reality simulations</li>
          <li>Improved online assessment methods</li>
          <li>Greater acceptance of hybrid approaches</li>
        </ul>
        
        <h2>Conclusion</h2>
        <p>While fully online SSSTS courses are limited, blended learning options provide flexibility while maintaining the quality and recognition of traditional training. The choice depends on your specific needs, employer requirements, and career goals.</p>
        
        <p><strong>Recommendation:</strong> For maximum career opportunities and industry recognition, consider the traditional in-person SSSTS course. If flexibility is crucial, explore accredited blended learning options that include practical assessment.</p>
      `,
      author: "HAT",
      date: "March 17, 2025",
      category: ["SSSTS Course"],
      image: "/images/blog/sssts-online.png",
      readTime: "4 min read"
    }
  ];

  const post = blogPosts.find(p => p.id === parseInt(id || '0'));

  if (!post) {
    return (
      <div className="blog-post-page">
        <div className="container">
          <div className="post-not-found">
            <h1>Blog Post Not Found</h1>
            <p>The blog post you're looking for doesn't exist.</p>
            <button onClick={() => navigate('/blog')} className="back-btn">
              Back to Blog
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="blog-post-page">
      {/* Hero Section */}
      <section className="post-hero">
        <div className="container">
          <div className="post-hero-content">
            <div className="post-hero-text">
              <div className="post-meta">
                <span className="post-category">{post.category[0]}</span>
                <span className="post-date">{post.date}</span>
                <span className="post-read-time">{post.readTime}</span>
              </div>
              <h1>{post.title}</h1>
              <p className="post-excerpt">{post.excerpt}</p>
              <div className="post-author">
                <span>By {post.author}</span>
              </div>
            </div>
            <div className="post-hero-image">
              <img src={post.image} alt={post.title} />
            </div>
          </div>
        </div>
      </section>

      {/* Post Content */}
      <section className="post-content-section">
        <div className="container">
          <div className="post-content-wrapper">
            <article className="post-content">
              <div dangerouslySetInnerHTML={{ __html: post.fullContent }} />
            </article>
            
            <aside className="post-sidebar">
              <div className="sidebar-widget">
                <h3>Categories</h3>
                <ul className="category-list">
                  {post.category.map((cat, index) => (
                    <li key={index}>{cat}</li>
                  ))}
                </ul>
              </div>
              
              <div className="sidebar-widget">
                <h3>Share This Post</h3>
                <div className="social-share">
                  <button className="share-btn facebook">Facebook</button>
                  <button className="share-btn twitter">Twitter</button>
                  <button className="share-btn linkedin">LinkedIn</button>
                </div>
              </div>
              
              <div className="sidebar-widget">
                <h3>Related Posts</h3>
                <div className="related-posts">
                  {blogPosts
                    .filter(p => p.id !== post.id && p.category.some(cat => post.category.includes(cat)))
                    .slice(0, 3)
                    .map(relatedPost => (
                      <div key={relatedPost.id} className="related-post" onClick={() => navigate(`/blog/${relatedPost.id}`)}>
                        <div className="related-post-image">
                          <img src={relatedPost.image} alt={relatedPost.title} />
                        </div>
                        <div className="related-post-content">
                          <h4>{relatedPost.title}</h4>
                          <span className="related-post-date">{relatedPost.date}</span>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* Navigation */}
      <section className="post-navigation">
        <div className="container">
          <div className="nav-buttons">
            <button onClick={() => navigate('/blog')} className="back-btn">
              ← Back to Blog
            </button>
            <button onClick={() => window.scrollTo(0, 0)} className="top-btn">
              Back to Top ↑
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BlogPostPage;
