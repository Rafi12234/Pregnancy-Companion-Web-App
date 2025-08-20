import React from "react";
import { Heart, Hospital, Pill, AlertTriangle, Stethoscope } from "lucide-react";
import "./MedicalInfoSection.css";

const MedicalInfoSection = ({ formData, onChange, onArrayChange }) => {
  const handleChange = (field, value) => {
    onChange('medical', field, value);
  };

  const preExistingConditions = [
    'Diabetes', 'High Blood Pressure', 'Thyroid Disorders', 'Heart Disease',
    'Kidney Disease', 'Liver Disease', 'Asthma', 'Depression/Anxiety',
    'Blood Disorders', 'Autoimmune Disorders', 'Epilepsy', 'None'
  ];

  const handleConditionChange = (condition, isChecked) => {
    const currentConditions = formData.preExistingConditions || [];
    let newConditions;

    if (condition === 'None') {
      newConditions = isChecked ? ['None'] : [];
    } else {
      if (isChecked) {
        newConditions = [...currentConditions.filter(c => c !== 'None'), condition];
      } else {
        newConditions = currentConditions.filter(c => c !== condition);
      }
    }
    
    onArrayChange('preExistingConditions', newConditions);
  };

  return (
    <div className="form-section fade-in">
      <div className="section-title">
        <Stethoscope size={24} className="title-icon" />
        Medical Information
      </div>
      <p className="section-subtitle">
        This information helps us provide you with safe, personalized care
      </p>

      <div className="medical-conditions">
        <h6 className="conditions-title">
          <Heart size={16} className="conditions-icon" />
          Pre-existing Medical Conditions
        </h6>
        <p className="conditions-subtitle">Select all that apply:</p>
        <div className="conditions-grid">
          {preExistingConditions.map(condition => (
            <div key={condition} className="form-check condition-item">
              <input
                className="form-check-input"
                type="checkbox"
                id={`condition-${condition.replace(/\s+/g, '-').toLowerCase()}`}
                checked={formData.preExistingConditions?.includes(condition) || false}
                onChange={(e) => handleConditionChange(condition, e.target.checked)}
              />
              <label 
                className="form-check-label" 
                htmlFor={`condition-${condition.replace(/\s+/g, '-').toLowerCase()}`}
              >
                {condition}
              </label>
            </div>
          ))}
        </div>
      </div>

      <div className="row">
        <div className="col-md-6 mb-4">
          <label className="form-label">
            <AlertTriangle size={16} className="label-icon" />
            Known Allergies
          </label>
          <textarea
            className="form-control"
            rows="3"
            placeholder="List any known allergies (medications, food, environmental)..."
            value={formData.allergies}
            onChange={(e) => handleChange('allergies', e.target.value)}
          ></textarea>
          <div className="form-text">
            Include drug allergies, food allergies, and environmental allergies
          </div>
        </div>

        <div className="col-md-6 mb-4">
          <label className="form-label">
            <Pill size={16} className="label-icon" />
            Current Medications
          </label>
          <textarea
            className="form-control"
            rows="3"
            placeholder="List all current medications, vitamins, and supplements..."
            value={formData.currentMedications}
            onChange={(e) => handleChange('currentMedications', e.target.value)}
          ></textarea>
          <div className="form-text">
            Include prescription drugs, vitamins, and herbal supplements
          </div>
        </div>
      </div>

      <div className="healthcare-providers">
        <h6 className="providers-title">
          <Hospital size={16} className="providers-icon" />
          Healthcare Providers
        </h6>
        <div className="row">
          <div className="col-md-6 mb-4">
            <label className="form-label required">
              Primary Doctor/Gynecologist Name
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Dr. [Name]"
              value={formData.doctorName}
              onChange={(e) => handleChange('doctorName', e.target.value)}
              required
            />
          </div>

          <div className="col-md-6 mb-4">
            <label className="form-label">
              Doctor's Phone Number
            </label>
            <div className="input-group">
              <span className="input-group-text">🇧🇩 +880</span>
              <input
                type="tel"
                className="form-control"
                placeholder="1712345678"
                maxLength="10"
                value={formData.doctorPhone || ''}
                onChange={(e) => handleChange('doctorPhone', e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-6 mb-4">
            <label className="form-label">
              Hospital/Clinic Name
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Hospital or Clinic Name"
              value={formData.hospitalName}
              onChange={(e) => handleChange('hospitalName', e.target.value)}
            />
          </div>

          <div className="col-md-6 mb-4">
            <label className="form-label">
              Hospital/Clinic Address
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Hospital address"
              value={formData.hospitalAddress || ''}
              onChange={(e) => handleChange('hospitalAddress', e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="prenatal-care">
        <h6 className="prenatal-title">
          <span className="prenatal-icon">🤱</span>
          Prenatal Care Information
        </h6>
        <div className="row">
          <div className="col-md-6 mb-4">
            <label className="form-label">
              First Prenatal Visit Date
            </label>
            <input
              type="date"
              className="form-control"
              value={formData.firstPrenatalVisit || ''}
              onChange={(e) => handleChange('firstPrenatalVisit', e.target.value)}
              max={new Date().toISOString().split('T')[0]}
            />
          </div>

          <div className="col-md-6 mb-4">
            <label className="form-label">
              Next Appointment Date
            </label>
            <input
              type="date"
              className="form-control"
              value={formData.nextAppointment || ''}
              onChange={(e) => handleChange('nextAppointment', e.target.value)}
              min={new Date().toISOString().split('T')[0]}
            />
          </div>
        </div>

        <div className="row">
          <div className="col-md-6 mb-4">
            <label className="form-label">
              Taking Prenatal Vitamins?
            </label>
            <select
              className="form-select"
              value={formData.prenatalVitamins || ''}
              onChange={(e) => handleChange('prenatalVitamins', e.target.value)}
            >
              <option value="">Select an option</option>
              <option value="yes">Yes, regularly</option>
              <option value="sometimes">Sometimes</option>
              <option value="no">No, not yet</option>
              <option value="prescribed">Only prescribed ones</option>
            </select>
          </div>

          <div className="col-md-6 mb-4">
            <label className="form-label">
              Any Current Pregnancy Complications?
            </label>
            <select
              className="form-select"
              value={formData.currentComplications || 'none'}
              onChange={(e) => handleChange('currentComplications', e.target.value)}
            >
              <option value="none">None</option>
              <option value="nausea">Morning Sickness/Nausea</option>
              <option value="bleeding">Bleeding</option>
              <option value="hypertension">High Blood Pressure</option>
              <option value="diabetes">Gestational Diabetes</option>
              <option value="other">Other (specify below)</option>
            </select>
          </div>
        </div>

        {formData.currentComplications === 'other' && (
          <div className="col-12 mb-4">
            <label className="form-label">
              Please specify current complications:
            </label>
            <textarea
              className="form-control"
              rows="3"
              placeholder="Describe any current pregnancy complications..."
              value={formData.complicationDetails || ''}
              onChange={(e) => handleChange('complicationDetails', e.target.value)}
            ></textarea>
          </div>
        )}
      </div>

      <div className="lifestyle-factors">
        <h6 className="lifestyle-title">
          <span className="lifestyle-icon">🏃‍♀️</span>
          Lifestyle & Health Factors
        </h6>
        <div className="row">
          <div className="col-md-4 mb-3">
            <label className="form-label">
              Smoking Status
            </label>
            <select
              className="form-select"
              value={formData.smokingStatus || 'never'}
              onChange={(e) => handleChange('smokingStatus', e.target.value)}
            >
              <option value="never">Never smoked</option>
              <option value="quit">Quit before pregnancy</option>
              <option value="quit_during">Quit during pregnancy</option>
              <option value="current">Currently smoking</option>
            </select>
          </div>

          <div className="col-md-4 mb-3">
            <label className="form-label">
              Alcohol Consumption
            </label>
            <select
              className="form-select"
              value={formData.alcoholStatus || 'never'}
              onChange={(e) => handleChange('alcoholStatus', e.target.value)}
            >
              <option value="never">Never drink</option>
              <option value="stopped">Stopped before pregnancy</option>
              <option value="occasional">Very occasional</option>
              <option value="social">Social drinking</option>
            </select>
          </div>

          <div className="col-md-4 mb-3">
            <label className="form-label">
              Exercise Level
            </label>
            <select
              className="form-select"
              value={formData.exerciseLevel || 'light'}
              onChange={(e) => handleChange('exerciseLevel', e.target.value)}
            >
              <option value="none">No exercise</option>
              <option value="light">Light exercise</option>
              <option value="moderate">Moderate exercise</option>
              <option value="active">Very active</option>
            </select>
          </div>
        </div>
      </div>

      <div className="medical-consent">
        <div className="consent-header">
          <span className="consent-icon">🔒</span>
          <strong>Medical Information Privacy</strong>
        </div>
        <p className="consent-text">
          All medical information is encrypted and stored securely. This information will be used 
          solely for providing you with personalized pregnancy care and will be shared only with 
          your designated healthcare providers when necessary for your safety and care.
        </p>
        <div className="form-check mt-3">
          <input
            className="form-check-input"
            type="checkbox"
            id="medicalConsent"
            checked={formData.medicalConsent || false}
            onChange={(e) => handleChange('medicalConsent', e.target.checked)}
          />
          <label className="form-check-label" htmlFor="medicalConsent">
            I consent to the secure storage and use of my medical information for pregnancy care
          </label>
        </div>
      </div>
    </div>
  );
};

export default MedicalInfoSection;