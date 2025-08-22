import React, { useState } from 'react';
import { MessageCircle, Heart, Share2, Users, TrendingUp, Clock, MoreHorizontal } from 'lucide-react';
import './CommunityPost.css';

const CommunityPost = () => {
  const [likedPosts, setLikedPosts] = useState(new Set());

  const posts = [
    {
      id: 1,
      author: 'Emma Johnson',
      avatar: 'EJ',
      timeAgo: '2 hours ago',
      week: 30,
      content: 'Just felt the strongest kicks today! Baby seems to be doing somersaults in there. Anyone else experiencing this at 30 weeks? 😊',
      likes: 24,
      comments: 8,
      shares: 3,
      trending: true
    },
    {
      id: 2,
      author: 'Sarah Mitchell',
      avatar: 'SM',
      timeAgo: '4 hours ago',
      week: 25,
      content: 'Finally set up the nursery! It took weeks but seeing it all come together is so emotional. The anticipation is real! 🎀',
      likes: 31,
      comments: 12,
      shares: 5,
      trending: false
    },
    {
      id: 3,
      author: 'Lisa Chen',
      avatar: 'LC',
      timeAgo: '6 hours ago',
      week: 28,
      content: 'Third trimester insomnia is real! Any tips for better sleep? I\'ve tried everything from pregnancy pillows to meditation.',
      likes: 18,
      comments: 15,
      shares: 2,
      trending: false
    }
  ];

  const toggleLike = (postId) => {
    setLikedPosts(prev => {
      const newLiked = new Set(prev);
      if (newLiked.has(postId)) {
        newLiked.delete(postId);
      } else {
        newLiked.add(postId);
      }
      return newLiked;
    });
  };

  return (
    <div className="community-card">
      <div className="card-header">
        <div className="header-left">
          <Users className="header-icon" size={24} />
          <div>
            <h3>Community Feed</h3>
            <p>Connect with other expecting mothers</p>
          </div>
        </div>
        <div className="community-stats">
          <div className="stat-item">
            <TrendingUp size={16} />
            <span>124 active today</span>
          </div>
        </div>
      </div>

      <div className="posts-container">
        {posts.map((post, index) => (
          <div 
            key={post.id} 
            className={`post-item ${post.trending ? 'trending' : ''}`}
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            {post.trending && (
              <div className="trending-badge">
                <TrendingUp size={12} />
                <span>Trending</span>
              </div>
            )}
            
            <div className="post-header">
              <div className="author-info">
                <div className="author-avatar">
                  <span>{post.avatar}</span>
                </div>
                <div className="author-details">
                  <h4>{post.author}</h4>
                  <div className="post-meta">
                    <Clock size={12} />
                    <span>{post.timeAgo}</span>
                    <span className="week-badge">{post.week}w</span>
                  </div>
                </div>
              </div>
              <button className="post-options">
                <MoreHorizontal size={16} />
              </button>
            </div>

            <div className="post-content">
              <p>{post.content}</p>
            </div>

            <div className="post-actions">
              <button 
                className={`action-btn ${likedPosts.has(post.id) ? 'liked' : ''}`}
                onClick={() => toggleLike(post.id)}
              >
                <Heart size={16} />
                <span>{post.likes + (likedPosts.has(post.id) ? 1 : 0)}</span>
              </button>
              
              <button className="action-btn">
                <MessageCircle size={16} />
                <span>{post.comments}</span>
              </button>
              
              <button className="action-btn">
                <Share2 size={16} />
                <span>{post.shares}</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="community-footer">
        <div className="quick-post">
          <div className="user-avatar">
            <span>S</span>
          </div>
          <input 
            type="text" 
            placeholder="Share your pregnancy journey..."
            className="quick-post-input"
          />
          <button className="post-btn">Post</button>
        </div>
        
        <div className="community-actions">
          <button className="community-btn">
            <MessageCircle size={16} />
            <span>Join Discussion</span>
          </button>
          <button className="community-btn">
            <Users size={16} />
            <span>Find Groups</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CommunityPost;