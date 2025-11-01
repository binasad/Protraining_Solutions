import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './BlogPage.css';

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
}

const BlogPage: React.FC = () => {
  const navigate = useNavigate();

  const blogPosts: BlogPost[] = [
    {
      id: 1,
      title: "How Emergency First Aid Training Helps in Workplace Emergencies",
      excerpt: "Learn how emergency first aid training can be crucial in handling workplace emergencies and saving lives.",
      content: "Emergency first aid training is essential for workplace safety. This comprehensive guide covers how proper training can help employees respond effectively to medical emergencies, reduce response times, and potentially save lives in critical situations.",
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
      author: "HAT",
      date: "March 20, 2025",
      category: ["First Aid", "First Aid At Work Course", "Level 3 First Aid At Work Course"],
      image: "/images/blog/first-aid-work.jpg",
      readTime: "4 min read"
    },
    {
      id: 3,
      title: "How Long is the SSSTS Course and is it Hard to Pass?",
      excerpt: "Everything you need to know about the SSSTS course duration and difficulty level.",
      content: "The SSSTS (Site Supervisor Safety Training Scheme) course is a vital qualification for construction site supervisors. Learn about the course length, difficulty, and tips for successful completion.",
      author: "HAT",
      date: "March 19, 2025",
      category: ["CITB SSSTS Course", "SSSTS Course", "SSSTS Course Online"],
      image: "/images/blog/sssts-course.jpg",
      readTime: "6 min read"
    },
    {
      id: 4,
      title: "How to Get a CSCS Green Card in 24 Hours",
      excerpt: "Fast-track your CSCS Green Card application with our comprehensive guide.",
      content: "The CSCS Green Card is essential for construction workers. This guide shows you how to obtain your card quickly, including the application process, requirements, and tips for same-day results.",
      author: "HAT",
      date: "March 18, 2025",
      category: ["CSCS Green Card", "CSCS Green Card same day results", "Level 1 Award in Health & Safety in a Construction Environment", "Level 1 Health and Safety course"],
      image: "/images/blog/cscs-green-card.jpg",
      readTime: "7 min read"
    },
    {
      id: 5,
      title: "Can You Do SSSTS Course Online?",
      excerpt: "Exploring the possibilities of completing your SSSTS course through online learning.",
      content: "Online learning has become increasingly popular, but can you complete your SSSTS qualification online? Discover the options available and what to consider when choosing your training method.",
      author: "HAT",
      date: "March 17, 2025",
      category: ["SSSTS Course"],
      image: "/images/blog/sssts-online.jpg",
      readTime: "4 min read"
    }
  ];



  const filteredPosts = blogPosts;

  const handleReadMoreClick = (postId: number) => {
    navigate(`/blog/${postId}`);
  };

  return (
    <div className="blog-page">
      {/* Hero Section */}
      <section className="blog-hero">
        <div className="container">
          <h1>Blogs</h1>
          <p>Explore top health and safety and construction related courses, training tips, updates, and inspiration at Synergy Safety Solutions Blogs.</p>
        </div>
      </section>

      

      {/* Blog Posts Section */}
      <section className="blog-posts">
        <div className="container">

            <div className="posts-grid">
              {filteredPosts.map((post) => (
                <div className="blog-post" key={post.id} onClick={() => handleReadMoreClick(post.id)}>
                              <div className="post-image">
              <div className="placeholder-image">
                <span className="placeholder-text">{post.category[0]}</span>
              </div>
              <div className="post-category">
                {post.category[0]}
              </div>
            </div>
            
            <div className="post-content">
              <div className="post-meta">
                <span className="post-date">{post.date}</span>
                <span className="post-read-time">{post.readTime}</span>
              </div>
              
              <h2 className="post-title">{post.title}</h2>
              <p className="post-excerpt">{post.excerpt}</p>
              
              <div className="post-footer">
                <span className="post-author">By {post.author}</span>
                <button 
                  className="read-more-btn" 
                  onClick={() => handleReadMoreClick(post.id)}
                >
                  Read More
                </button>
              </div>
            </div>
                </div>
              ))}
            </div>
        </div>
      </section>

      {/* Latest Posts Section */}
      <section className="latest-posts">
        <div className="container">
          <h2>Latest Posts</h2>
          <div className="latest-posts-grid">
            {blogPosts.slice(0, 3).map(post => (
              <div key={post.id} className="latest-post" onClick={() => handleReadMoreClick(post.id)}>
                                <div className="latest-post-image">
                  <div className="placeholder-image-small">
                    <span className="placeholder-text-small">{post.category[0]}</span>
                  </div>
                </div>
                <div className="latest-post-content">
                  <h3>{post.title}</h3>
                  <p>{post.excerpt}</p>
                  <span className="latest-post-date">{post.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default BlogPage;
