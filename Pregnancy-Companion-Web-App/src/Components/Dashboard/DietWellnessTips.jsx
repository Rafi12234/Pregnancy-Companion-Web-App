import React, { useState } from 'react';
import { Apple, Droplets, Moon, Activity, ChevronRight, Star, Fish, Utensils, Zap, Sunrise, Heart, Shield, Plus, Eye, Sparkles } from 'lucide-react';
import './DietWellnessTips.css';

const DietWellnessTips = () => {
  const [activeCategory, setActiveCategory] = useState('nutrition');
  const [tips, setTips] = useState({
    nutrition: [
      {
        icon: Apple,
        title: 'Folic Acid Rich Foods',
        description: 'Include leafy greens, citrus fruits, and fortified cereals',
        priority: 'high',
        completed: false
      },
      {
        icon: Droplets,
        title: 'Stay Hydrated',
        description: 'Drink 8-10 glasses of water daily for optimal health',
        priority: 'medium',
        completed: true
      },
      {
        icon: Star,
        title: 'Calcium Sources',
        description: 'Add dairy, almonds, and broccoli to your diet',
        priority: 'high',
        completed: false
      },
      {
        icon: Fish,
        title: 'Omega-3 Fatty Acids',
        description: 'Eat salmon, walnuts, and chia seeds for brain development',
        priority: 'high',
        completed: false
      },
      {
        icon: Utensils,
        title: 'Small Frequent Meals',
        description: 'Eat 5-6 small meals to help with nausea and energy',
        priority: 'medium',
        completed: true
      }
    ],
    wellness: [
      {
        icon: Moon,
        title: 'Quality Sleep',
        description: 'Aim for 7-9 hours of sleep with proper pillow support',
        priority: 'high',
        completed: true
      },
      {
        icon: Activity,
        title: 'Gentle Exercise',
        description: 'Try prenatal yoga or swimming for 30 minutes daily',
        priority: 'medium',
        completed: false
      },
      {
        icon: Heart,
        title: 'Stress Management',
        description: 'Practice deep breathing and meditation techniques',
        priority: 'medium',
        completed: false
      },
      {
        icon: Sunrise,
        title: 'Morning Routine',
        description: 'Start your day with light stretching and positive affirmations',
        priority: 'low',
        completed: false
      },
      {
        icon: Shield,
        title: 'Prenatal Vitamins',
        description: 'Take your prenatal vitamins consistently with food',
        priority: 'high',
        completed: true
      }
    ]
  });

  const categories = [
    { id: 'nutrition', label: 'Nutrition', icon: Apple, gradient: 'nutrition-gradient' },
    { id: 'wellness', label: 'Wellness', icon: Activity, gradient: 'wellness-gradient' }
  ];

  const getPriorityConfig = (priority) => {
    switch (priority) {
      case 'high': 
        return { 
          className: 'priority-high', 
          label: 'High Priority',
          dotClass: 'priority-dot-high'
        };
      case 'medium': 
        return { 
          className: 'priority-medium', 
          label: 'Medium Priority',
          dotClass: 'priority-dot-medium'
        };
      case 'low': 
        return { 
          className: 'priority-low', 
          label: 'Low Priority',
          dotClass: 'priority-dot-low'
        };
      default: 
        return { 
          className: 'priority-normal', 
          label: 'Normal',
          dotClass: 'priority-dot-normal'
        };
    }
  };

  const toggleTipCompletion = (category, index) => {
    setTips(prevTips => ({
      ...prevTips,
      [category]: prevTips[category].map((tip, i) => 
        i === index ? { ...tip, completed: !tip.completed } : tip
      )
    }));
  };

  const addCustomTip = () => {
    const customTip = {
      icon: Star,
      title: 'Custom Tip',
      description: 'Add your own wellness reminder here',
      priority: 'medium',
      completed: false
    };
    
    setTips(prevTips => ({
      ...prevTips,
      [activeCategory]: [...prevTips[activeCategory], customTip]
    }));
  };

  const completedCount = tips[activeCategory].filter(tip => tip.completed).length;
  const totalCount = tips[activeCategory].length;
  const completionPercentage = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;

  const dailyQuotes = {
    nutrition: "Nourishing your body is the first act of self-love during pregnancy.",
    wellness: "Taking care of yourself is not selfish—it's essential for you and your baby."
  };

  const currentCategory = categories.find(cat => cat.id === activeCategory);

  return (
    <div className="wellness-container">
      <div className="wellness-wrapper">
        {/* Header Card */}
        <div className="header-card">
          <div className="header-content">
            <div className="header-left">
              <div className={`header-icon ${currentCategory.gradient}`}>
                <Apple className="icon-lg" />
              </div>
              <div className="header-text">
                <h1 className="main-title">Daily Wellness</h1>
                <p className="main-subtitle">Your personalized health guide</p>
              </div>
            </div>
            <div className="header-right">
              <div className={`completion-badge ${currentCategory.gradient}`}>
                {completedCount}/{totalCount}
              </div>
              <div className="percentage-display">
                <div className="percentage-number">{Math.round(completionPercentage)}%</div>
                <div className="percentage-label">Complete</div>
              </div>
            </div>
          </div>

          {/* Category Tabs */}
          <div className="category-tabs">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`category-tab ${activeCategory === category.id ? 'active' : ''} ${category.gradient}`}
              >
                <category.icon className="tab-icon" />
                <span>{category.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Progress Card */}
        <div className="progress-card">
          <div className="progress-header">
            <div className="progress-info">
              <h3 className="progress-title">Today's Progress</h3>
              <p className="progress-subtitle">{completedCount} of {totalCount} tasks completed</p>
            </div>
            <Sparkles className="sparkles-icon" />
          </div>
          
          <div className="progress-bar-wrapper">
            <div className="progress-bar-bg">
              <div 
                className={`progress-bar-fill ${currentCategory.gradient}`}
                style={{ width: `${completionPercentage}%` }}
              />
            </div>
            <div className="progress-bar-overlay" />
          </div>
        </div>

        {/* Tips List */}
        <div className="tips-list">
          {tips[activeCategory].map((tip, index) => {
            const IconComponent = tip.icon;
            const priorityConfig = getPriorityConfig(tip.priority);
            
            return (
              <div
                key={index}
                className={`tip-card ${tip.completed ? 'completed' : ''}`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="tip-content">
                  {/* Checkbox */}
                  <div
                    onClick={() => toggleTipCompletion(activeCategory, index)}
                    className={`tip-checkbox ${tip.completed ? 'checked' : ''}`}
                  >
                    {tip.completed && <span className="checkbox-mark">✓</span>}
                  </div>

                  {/* Icon */}
                  <div className={`tip-icon-wrapper ${tip.completed ? 'completed-icon' : 'default-icon'}`}>
                    <IconComponent className="tip-icon" />
                  </div>

                  {/* Content */}
                  <div className="tip-details">
                    <div className="tip-header">
                      <h4 className={`tip-title ${tip.completed ? 'completed-text' : ''}`}>
                        {tip.title}
                      </h4>
                      <div className={`priority-dot ${priorityConfig.dotClass}`} />
                    </div>
                    
                    <p className={`tip-description ${tip.completed ? 'completed-text' : ''}`}>
                      {tip.description}
                    </p>
                    
                    <div className="tip-meta">
                      <span className={`priority-badge ${priorityConfig.className}`}>
                        {priorityConfig.label}
                      </span>
                      {tip.completed && (
                        <span className="completed-badge">
                          Completed today ✨
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <ChevronRight className="chevron-icon" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Action Buttons */}
        <div className="action-card">
          <div className="action-buttons">
            <button
              onClick={addCustomTip}
              className={`action-btn primary ${currentCategory.gradient}`}
            >
              <Plus className="btn-icon" />
              <span>Add Custom Tip</span>
            </button>
            
            <button className="action-btn secondary">
              <Eye className="btn-icon" />
              <span>View All Tips</span>
            </button>
          </div>
        </div>

        {/* Daily Quote */}
        <div className="quote-card">
          <div className="quote-content">
            <div className="quote-emoji">💝</div>
            <div className="quote-text">
              <h4 className="quote-title">Daily Inspiration</h4>
              <p className="quote-message">
                "{dailyQuotes[activeCategory]}"
              </p>
            </div>
          </div>
        </div>

        {/* Celebration Banner */}
        {completionPercentage === 100 && (
          <div className="celebration-card">
            <div className="celebration-content">
              <div className="celebration-emoji">🎉</div>
              <div className="celebration-text">
                <h4 className="celebration-title">Amazing work today!</h4>
                <p className="celebration-message">
                  You've completed all your {activeCategory} goals. Keep up the fantastic work!
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DietWellnessTips;