import React, { useEffect } from "react";
import { Heart } from "lucide-react";
import "./SuccessNotification.css";

const SuccessNotification = ({ show, onClose }) => {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(onClose, 3000);
      return () => clearTimeout(timer);
    }
  }, [show, onClose]);

  return (
    <div className={`notification-container ${show ? 'show' : 'hide'}`}>
      <div className="notification-card">
        <div className="notification-content">
          <div className="notification-icon">
            <Heart className="heart-icon" />
          </div>
          <div className="notification-text">
            <p className="notification-message">Welcome back, Mama! 💕</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuccessNotification;