import React from "react";
import { Heart, CheckCircle, Mail, Calendar, Baby } from "lucide-react";
import "./SuccessModal.css";

const SuccessModal = ({ show, onClose, motherName }) => {
  if (!show) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="success-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="success-icon-container">
            <CheckCircle size={48} className="success-icon" />
            <div className="celebration-particles">
              {Array.from({ length: 8 }).map((_, i) => (
                <div
                  key={i}
                  className="celebration-particle"
                  style={{
                    '--angle': `${i * 45}deg`,
                    '--delay': `${i * 0.1}s`
                  }}
                >
                  ✨
                </div>
              ))}
            </div>
          </div>
          <h2 className="success-title">
            Welcome to Your Journey, {motherName}! 🎉
          </h2>
          <p className="success-subtitle">
            Your account has been created successfully!
          </p>
        </div>

        <div className="modal-body">
          <div className="welcome-message">
            <Heart size={20} className="welcome-icon" />
            <p>
              Congratulations on taking this important step in your pregnancy journey. 
              We're honored to be part of this special time in your life!
            </p>
          </div>

          <div className="next-steps">
            <h4 className="steps-title">What's Next?</h4>
            <div className="steps-list">
              <div className="step-item">
                <div className="step-icon">
                  <Mail size={20} />
                </div>
                <div className="step-content">
                  <strong>Check Your Email</strong>
                  <p>We've sent a verification link to confirm your account</p>
                </div>
              </div>
              
              <div className="step-item">
                <div className="step-icon">
                  <Calendar size={20} />
                </div>
                <div className="step-content">
                  <strong>Set Up Your Dashboard</strong>
                  <p>Customize your pregnancy tracking preferences</p>
                </div>
              </div>
              
              <div className="step-item">
                <div className="step-icon">
                  <Baby size={20} />
                </div>
                <div className="step-content">
                  <strong>Explore Your Week-by-Week Guide</strong>
                  <p>Discover what's happening with your baby right now</p>
                </div>
              </div>
            </div>
          </div>

          <div className="feature-highlights">
            <h4 className="highlights-title">You Now Have Access To:</h4>
            <div className="highlights-grid">
              <div className="highlight-item">
                <span className="highlight-emoji">📱</span>
                <span>Personalized Dashboard</span>
              </div>
              <div className="highlight-item">
                <span className="highlight-emoji">👩‍⚕️</span>
                <span>Expert Medical Guidance</span>
              </div>
              <div className="highlight-item">
                <span className="highlight-emoji">📊</span>
                <span>Progress Tracking</span>
              </div>
              <div className="highlight-item">
                <span className="highlight-emoji">🍎</span>
                <span>Nutrition Planning</span>
              </div>
              <div className="highlight-item">
                <span className="highlight-emoji">🧘‍♀️</span>
                <span>Wellness Resources</span>
              </div>
              <div className="highlight-item">
                <span className="highlight-emoji">👶</span>
                <span>Baby Development</span>
              </div>
            </div>
          </div>
        </div>

        <div className="modal-footer">
          <button className="continue-button" onClick={onClose}>
            <span>Continue to Dashboard</span>
            <span className="button-arrow">→</span>
          </button>
          
          <p className="support-text">
            Need help? Contact our support team at{" "}
            <a href="mailto:support@pregnancycompanion.com" className="support-link">
              support@pregnancycompanion.com
            </a>
          </p>
        </div>

        <button className="modal-close" onClick={onClose} aria-label="Close">
          ×
        </button>
      </div>
    </div>
  );
};

export default SuccessModal;