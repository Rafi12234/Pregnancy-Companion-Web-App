import React, { useState, useEffect } from "react";
import { Heart } from "lucide-react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Signup.css";
import SignupHeader from "./SignupHeader";
import PersonalInfoSection from "./PersonalInfoSection";
import ContactInfoSection from "./ContactInfoSection";
import PartnerInfoSection from "./PartnerInfoSection";
import PregnancyInfoSection from "./PregnancyInfoSection";
import MedicalInfoSection from "./MedicalInfoSection";
import AccountInfoSection from "./AccountInfoSection";
import SubmitButton from "./SubmitButton";
import SuccessModal from "./SuccessModal";
import ProgressIndicator from "./ProgressIndicator";
import AnimatedBackground from "../Login/AnimatedBackground";
import { Link } from "react-router-dom";

const Signup = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [mounted, setMounted] = useState(false);

  const [formData, setFormData] = useState({
    // Personal Information
    motherName: "",
    age: "",
    bloodGroup: "",
    
    // Contact Information
    motherPhone: "",
    motherEmail: "",
    address: "",
    
    // Partner Information
    husbandName: "",
    husbandPhone: "",
    
    // Pregnancy Information
    currentWeek: "",
    dueDate: "",
    pregnancyNumber: "",
    lastMenstrualPeriod: "",
    expectedDeliveryDate: "",
    
    // Medical Information
    preExistingConditions: [],
    allergies: "",
    currentMedications: "",
    previousComplications: "",
    doctorName: "",
    hospitalName: "",
    
    // Account Information
    password: "",
    confirmPassword: "",
    
    // Preferences
    notifications: {
      dailyTips: true,
      appointments: true,
      milestones: true,
      emergencyAlerts: true
    }
  });

  const totalSteps = 6;

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleInputChange = (section, field, value) => {
    if (section === 'notifications') {
      setFormData(prev => ({
        ...prev,
        notifications: {
          ...prev.notifications,
          [field]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [field]: value
      }));
    }
  };

  const handleArrayChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const validateStep = (step) => {
    switch (step) {
      case 1:
        return formData.motherName && formData.age && formData.bloodGroup;
      case 2:
        return formData.motherPhone && formData.motherEmail && formData.address;
      case 3:
        return formData.husbandName && formData.husbandPhone;
      case 4:
        return formData.currentWeek && formData.dueDate && formData.pregnancyNumber;
      case 5:
        return formData.doctorName;
      case 6:
        return formData.password && formData.confirmPassword && 
               formData.password === formData.confirmPassword;
      default:
        return true;
    }
  };

  const nextStep = () => {
    if (validateStep(currentStep) && currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    if (!validateStep(currentStep)) return;
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setShowSuccess(true);
    }, 2000);
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <PersonalInfoSection
            formData={formData}
            onChange={handleInputChange}
          />
        );
      case 2:
        return (
          <ContactInfoSection
            formData={formData}
            onChange={handleInputChange}
          />
        );
      case 3:
        return (
          <PartnerInfoSection
            formData={formData}
            onChange={handleInputChange}
          />
        );
      case 4:
        return (
          <PregnancyInfoSection
            formData={formData}
            onChange={handleInputChange}
          />
        );
      case 5:
        return (
          <MedicalInfoSection
            formData={formData}
            onChange={handleInputChange}
            onArrayChange={handleArrayChange}
          />
        );
      case 6:
        return (
          <AccountInfoSection
            formData={formData}
            onChange={handleInputChange}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="signup-container">
      <AnimatedBackground />
      
      <div className="container">
        <div className={`signup-wrapper ${mounted ? 'mounted' : ''}`}>
          <div className="row justify-content-center">
            <div className="col-lg-8 col-md-10">
              <div className="signup-card">
                <SignupHeader currentStep={currentStep} totalSteps={totalSteps} />
                
                <ProgressIndicator currentStep={currentStep} totalSteps={totalSteps} />
                
                <div className="signup-form-container">
                  {renderCurrentStep()}
                  
                  <div className="navigation-buttons">
                    {currentStep > 1 && (
                      <button
                        className="btn btn-outline-primary btn-lg me-3"
                        onClick={prevStep}
                      >
                        <i className="fas fa-arrow-left me-2"></i>
                        Previous
                      </button>
                    )}
                    
                    {currentStep < totalSteps ? (
                      <button
                        className="btn btn-primary btn-lg"
                        onClick={nextStep}
                        disabled={!validateStep(currentStep)}
                      >
                        Next
                        <i className="fas fa-arrow-right ms-2"></i>
                      </button>
                    ) : (
                      <SubmitButton
                        isSubmitting={isSubmitting}
                        onClick={handleSubmit}
                        disabled={!validateStep(currentStep)}
                      />
                    )}
                  </div>
                </div>
              </div>
              
              <div className="signup-footer">
                <p className="text-center text-muted">
                  <Heart size={16} className="text-pink me-1" />
                  Already have an account?{" "}
                  <Link to="/login" className="text-primary fw-bold">
                    Sign In
                  </Link>
                  <Heart size={16} className="text-pink ms-1" />
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <SuccessModal 
        show={showSuccess}
        onClose={() => setShowSuccess(false)}
        motherName={formData.motherName}
      />
    </div>
  );
};

export default Signup;