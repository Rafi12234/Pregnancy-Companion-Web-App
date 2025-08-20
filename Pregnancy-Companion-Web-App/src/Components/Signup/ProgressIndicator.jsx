import React from "react";
import { Check } from "lucide-react";
import "./ProgressIndicator.css";

const ProgressIndicator = ({ currentStep, totalSteps }) => {
  const steps = [
    { number: 1, label: "Personal", icon: "👤" },
    { number: 2, label: "Contact", icon: "📞" },
    { number: 3, label: "Partner", icon: "💑" },
    { number: 4, label: "Pregnancy", icon: "🤱" },
    { number: 5, label: "Medical", icon: "🏥" },
    { number: 6, label: "Account", icon: "🔐" }
  ];

  const getStepStatus = (stepNumber) => {
    if (stepNumber < currentStep) return 'completed';
    if (stepNumber === currentStep) return 'active';
    return 'pending';
  };

  return (
    <div className="progress-indicator">
      <div className="progress-bar-container">
        <div 
          className="progress-bar-fill"
          style={{ width: `${((currentStep - 1) / (totalSteps - 1)) * 100}%` }}
        ></div>
      </div>
      
      <div className="steps-container">
        {steps.map((step, index) => (
          <div key={step.number} className="step-item">
            <div className={`step-circle ${getStepStatus(step.number)}`}>
              {getStepStatus(step.number) === 'completed' ? (
                <Check size={16} className="check-icon" />
              ) : getStepStatus(step.number) === 'active' ? (
                <span className="step-emoji">{step.icon}</span>
              ) : (
                <span className="step-number">{step.number}</span>
              )}
            </div>
            <div className="step-label">
              <span className={`label-text ${getStepStatus(step.number)}`}>
                {step.label}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProgressIndicator;