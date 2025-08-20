import React from "react";
import { User, Calendar, Droplets } from "lucide-react";
import "./PersonalInfoSection.css";

const PersonalInfoSection = ({ formData, onChange }) => {
  const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

  const handleChange = (field, value) => {
    onChange('personal', field, value);
  };

  return (
    <div className="form-section fade-in">
      <div className="section-title">
        <User size={24} className="title-icon" />
        Personal Information
      </div>
      <p className="section-subtitle">
        Tell us about yourself so we can personalize your pregnancy journey
      </p>

      <div className="row">
        <div className="col-md-8 mb-4">
          <label className="form-label required">
            <User size={16} className="label-icon" />
            Full Name
          </label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter your full name"
            value={formData.motherName}
            onChange={(e) => handleChange('motherName', e.target.value)}
            required
          />
          <div className="form-text">
            This will be used for your personalized pregnancy journey
          </div>
        </div>

        <div className="col-md-4 mb-4">
          <label className="form-label required">
            <Calendar size={16} className="label-icon" />
            Age
          </label>
          <input
            type="number"
            className="form-control"
            placeholder="Your age"
            min="18"
            max="50"
            value={formData.age}
            onChange={(e) => handleChange('age', e.target.value)}
            required
          />
        </div>
      </div>

      <div className="row">
        <div className="col-md-6 mb-4">
          <label className="form-label required">
            <Droplets size={16} className="label-icon" />
            Blood Group
          </label>
          <select
            className="form-select"
            value={formData.bloodGroup}
            onChange={(e) => handleChange('bloodGroup', e.target.value)}
            required
          >
            <option value="">Select your blood group</option>
            {bloodGroups.map(group => (
              <option key={group} value={group}>{group}</option>
            ))}
          </select>
          <div className="form-text">
            Important for medical emergencies and compatibility
          </div>
        </div>

        <div className="col-md-6 mb-4">
          <label className="form-label">
            Height (optional)
          </label>
          <div className="input-group">
            <input
              type="number"
              className="form-control"
              placeholder="160"
              min="100"
              max="250"
              value={formData.height || ''}
              onChange={(e) => handleChange('height', e.target.value)}
            />
            <span className="input-group-text">cm</span>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-md-6 mb-4">
          <label className="form-label">
            Weight (optional)
          </label>
          <div className="input-group">
            <input
              type="number"
              className="form-control"
              placeholder="55"
              min="30"
              max="200"
              value={formData.weight || ''}
              onChange={(e) => handleChange('weight', e.target.value)}
            />
            <span className="input-group-text">kg</span>
          </div>
          <div className="form-text">
            Helps us track healthy weight gain during pregnancy
          </div>
        </div>

        <div className="col-md-6 mb-4">
          <label className="form-label">
            Occupation (optional)
          </label>
          <input
            type="text"
            className="form-control"
            placeholder="e.g., Teacher, Engineer, Homemaker"
            value={formData.occupation || ''}
            onChange={(e) => handleChange('occupation', e.target.value)}
          />
        </div>
      </div>

      <div className="info-card">
        <div className="info-card-header">
          <span className="info-icon">💡</span>
          <strong>Why we need this information:</strong>
        </div>
        <ul className="info-list">
          <li>Personalize your pregnancy experience</li>
          <li>Provide accurate health recommendations</li>
          <li>Emergency medical information</li>
          <li>Track healthy pregnancy progression</li>
        </ul>
      </div>
    </div>
  );
};

export default PersonalInfoSection;