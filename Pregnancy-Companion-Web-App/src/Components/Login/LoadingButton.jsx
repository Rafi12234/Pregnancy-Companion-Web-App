import React from "react";
import "./LoadingButton.css";

const LoadingButton = ({ isLoading, children, onClick, ...props }) => {
  return (
    <button
      {...props}
      className={`loading-button ${isLoading ? 'loading' : ''}`}
      onClick={onClick}
      disabled={isLoading}
    >
      <div className="button-overlay"></div>
      <span className="button-content">
        {isLoading ? (
          <>
            <div className="spinner"></div>
            Logging in...
          </>
        ) : (
          children
        )}
      </span>
    </button>
  );
};

export default LoadingButton;