import React from 'react';
import { Heart, Calendar, Baby, Sparkles } from 'lucide-react';

const WelcomeBanner = ({ name = "User", week = 28, dueDate = new Date('2025-12-15') }) => {
  const formatDate = (date) => {
    if (!date || !(date instanceof Date)) {
      return "December 15, 2024"; // fallback
    }
    return date.toLocaleDateString('en-US', { 
      month: 'long', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  const getDaysRemaining = () => {
    try {
      const today = new Date();
      const targetDate = dueDate instanceof Date ? dueDate : new Date(dueDate);
      const diffTime = targetDate.getTime() - today.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return Math.max(0, diffDays);
    } catch (error) {
      console.error("Error calculating days remaining:", error);
      return 0;
    }
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  return (
    <div style={{
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      borderRadius: '20px',
      padding: '30px',
      color: 'white',
      margin: '20px 0',
      boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <div>
          <h2 style={{ fontSize: '28px', fontWeight: 'bold', margin: '0 0 10px 0' }}>
            {getGreeting()}, {name}! 👋
          </h2>
          <p style={{ display: 'flex', alignItems: 'center', gap: '8px', margin: 0, opacity: 0.9 }}>
            <Sparkles size={20} />
            How are you feeling today?
          </p>
        </div>
        <div style={{ 
          animation: 'pulse 2s infinite',
        }}>
          <Heart size={40} fill="white" />
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '30px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <div style={{ 
            backgroundColor: 'rgba(255,255,255,0.2)', 
            borderRadius: '12px', 
            padding: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Baby size={24} />
          </div>
          <div>
            <span style={{ display: 'block', fontSize: '14px', opacity: 0.8 }}>You're in week</span>
            <span style={{ 
              fontSize: '24px', 
              fontWeight: 'bold',
              background: 'linear-gradient(45deg, #fff, #f0f8ff)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              {week}
            </span>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <div style={{ 
            backgroundColor: 'rgba(255,255,255,0.2)', 
            borderRadius: '12px', 
            padding: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Calendar size={24} />
          </div>
          <div>
            <span style={{ display: 'block', fontSize: '14px', opacity: 0.8 }}>Due date</span>
            <span style={{ fontSize: '18px', fontWeight: '600' }}>{formatDate(dueDate)}</span>
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '30px', marginBottom: '20px' }}>
        <div style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center',
          backgroundColor: 'rgba(255,255,255,0.15)',
          borderRadius: '50%',
          width: '120px',
          height: '120px',
          justifyContent: 'center'
        }}>
          <div style={{ fontSize: '36px', fontWeight: 'bold' }}>{getDaysRemaining()}</div>
          <div style={{ fontSize: '14px', opacity: 0.9 }}>days to go</div>
        </div>
        <div>
          <p style={{ fontSize: '18px', margin: 0 }}>Your little miracle is getting closer! 💕</p>
        </div>
      </div>

      <div style={{ 
        textAlign: 'center',
        backgroundColor: 'rgba(255,255,255,0.1)',
        borderRadius: '15px',
        padding: '20px'
      }}>
        <p style={{ fontSize: '16px', fontStyle: 'italic', margin: 0 }}>
          "Every day you're growing stronger, and so is your beautiful baby." 🌸
        </p>
      </div>
    </div>
  );
};

export default WelcomeBanner;