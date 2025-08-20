import React from "react";
import { Heart, Loader } from "lucide-react";
import "./SubmitButton.css";

const SubmitButton = ({ isSubmitting, onClick, disabled }) => {
  return (
    <button
      type="button"
      className={`submit-button ${isSubmitting ? 'submitting' : ''} ${disabled ? 'disabled' : ''}`}
      disabled={disabled || isSubmitting}
    >
      <div className="button-background"></div>
      <div className="button-content">
        {isSubmitting ? (
          <>
            <Loader size={20} className="spinner" />
            <span>Creating Your Account...</span>
          </>
        ) : (
          <>
            <Heart size={20} className="heart-icon" />
            <span>Complete Registration</span>
            <span className="celebration">🎉</span>
          </>
        )}
      </div>
      
      {!isSubmitting && !disabled && (
        <div className="success-particles">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="particle" style={{
              '--delay': `${i * 0.1}s`,
              '--angle': `${i * 60}deg`
            }}></div>
          ))}
        </div>
      )}
    </button>
  );
};

export default SubmitButton;