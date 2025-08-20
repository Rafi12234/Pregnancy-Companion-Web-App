import React from "react";
import { Heart, Baby } from "lucide-react";
import "./SignupHeader.css";

const SignupHeader = ({ currentStep, totalSteps }) => {
  const getStepTitle = () => {
    switch (currentStep) {
      case 1: return "Personal Information";
      case 2: return "Contact Details";
      case 3: return "Partner Information";
      case 4: return "Pregnancy Journey";
      case 5: return "Medical Information";
      case 6: return "Account Setup";
      default: return "Welcome";
    }
  };

  const getStepDescription = () => {
    switch (currentStep) {
      case 1: return "Let's start with your basic information";
      case 2: return "How can we reach you?";
      case 3: return "Tell us about your partner";
      case 4: return "Share your pregnancy details";
      case 5: return "Important medical information";
      case 6: return "Create your secure account";
      default: return "Join our pregnancy journey";
    }
  };

  return (
    <div className="signup-header">
      <div className="header-icon">
        <div className="icon-container">
          {currentStep <= 3 ? (
            <Heart className="main-icon" />
          ) : (
            <Baby className="main-icon" />
          )}
        </div>
      </div>
      
      <div className="header-content">
        <h1 className="main-title">
          Welcome to Your Pregnancy Journey! 🤰
        </h1>
        
        <div className="step-info">
          <h2 className="step-title">{getStepTitle()}</h2>
          <p className="step-description">{getStepDescription()}</p>
        </div>
        
        <div className="step-counter">
          <span className="current-step">Step {currentStep}</span>
          <span className="step-separator"> of </span>
          <span className="total-steps">{totalSteps}</span>
        </div>
      </div>
    </div>
  );
};

export default SignupHeader;