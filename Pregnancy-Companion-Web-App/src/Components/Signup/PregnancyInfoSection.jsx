import React from "react";
import { Baby, Calendar, Heart, Activity } from "lucide-react";
import "./PregnancyInfoSection.css";

const PregnancyInfoSection = ({ formData, onChange }) => {
  const handleChange = (field, value) => {
    onChange('pregnancy', field, value);
  };

  const pregnancyNumbers = [
    { value: '1', label: 'First Pregnancy (Primigravida)' },
    { value: '2', label: 'Second Pregnancy' },
    { value: '3', label: 'Third Pregnancy' },
    { value: '4', label: 'Fourth Pregnancy' },
    { value: '5+', label: 'Fifth or More Pregnancies' }
  ];

  const deliveryTypes = [
    'Natural/Vaginal Delivery',
    'Cesarean Section (C-Section)',
    'Assisted Delivery (Forceps/Vacuum)',
    'No Previous Delivery'
  ];

  const calculateDueDate = (lmpDate) => {
    if (!lmpDate) return '';
    const lmp = new Date(lmpDate);
    const dueDate = new Date(lmp);
    dueDate.setDate(dueDate.getDate() + 280); // 40 weeks
    return dueDate.toISOString().split('T')[0];
  };

  const calculateCurrentWeek = (lmpDate) => {
    if (!lmpDate) return '';
    const lmp = new Date(lmpDate);
    const today = new Date();
    const diffTime = Math.abs(today - lmp);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const weeks = Math.floor(diffDays / 7);
    return Math.min(weeks, 42); // Max 42 weeks
  };

  const handleLMPChange = (value) => {
    handleChange('lastMenstrualPeriod', value);
    if (value) {
      const calculatedDueDate = calculateDueDate(value);
      const calculatedWeek = calculateCurrentWeek(value);
      handleChange('dueDate', calculatedDueDate);
      handleChange('currentWeek', calculatedWeek.toString());
    }
  };

  return (
    <div className="form-section fade-in">
      <div className="section-title">
        <Baby size={24} className="title-icon" />
        Pregnancy Information
      </div>
      <p className="section-subtitle">
        Help us understand where you are in your pregnancy journey
      </p>

      <div className="row">
        <div className="col-md-6 mb-4">
          <label className="form-label required">
            <Calendar size={16} className="label-icon" />
            Last Menstrual Period (LMP)
          </label>
          <input
            type="date"
            className="form-control"
            value={formData.lastMenstrualPeriod}
            onChange={(e) => handleLMPChange(e.target.value)}
            max={new Date().toISOString().split('T')[0]}
            required
          />
          <div className="form-text">
            First day of your last period - we'll calculate your due date automatically
          </div>
        </div>

        <div className="col-md-6 mb-4">
          <label className="form-label">
            <Activity size={16} className="label-icon" />
            Current Week of Pregnancy
          </label>
          <div className="week-display">
            <input
              type="number"
              className="form-control"
              placeholder="0"
              min="0"
              max="42"
              value={formData.currentWeek}
              onChange={(e) => handleChange('currentWeek', e.target.value)}
              readOnly={formData.lastMenstrualPeriod}
            />
            <span className="week-label">weeks</span>
          </div>
          <div className="form-text">
            {formData.lastMenstrualPeriod ? 'Calculated automatically' : 'Enter manually if known'}
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-md-6 mb-4">
          <label className="form-label">
            Expected Due Date
          </label>
          <input
            type="date"
            className="form-control"
            value={formData.dueDate}
            onChange={(e) => handleChange('dueDate', e.target.value)}
            min={new Date().toISOString().split('T')[0]}
            readOnly={formData.lastMenstrualPeriod}
          />
          <div className="form-text">
            {formData.lastMenstrualPeriod ? 'Calculated from LMP' : 'Enter your expected due date'}
          </div>
        </div>

        <div className="col-md-6 mb-4">
          <label className="form-label required">
            <Heart size={16} className="label-icon" />
            Pregnancy Number
          </label>
          <select
            className="form-select"
            value={formData.pregnancyNumber}
            onChange={(e) => handleChange('pregnancyNumber', e.target.value)}
            required
          >
            <option value="">Select pregnancy number</option>
            {pregnancyNumbers.map(pregnancy => (
              <option key={pregnancy.value} value={pregnancy.value}>
                {pregnancy.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {formData.pregnancyNumber && formData.pregnancyNumber !== '1' && (
        <div className="previous-pregnancy-section">
          <h6 className="previous-title">
            <span className="previous-icon">👶</span>
            Previous Pregnancy History
          </h6>
          <div className="row">
            <div className="col-md-6 mb-3">
              <label className="form-label">
                Number of Live Births
              </label>
              <input
                type="number"
                className="form-control"
                min="0"
                max="10"
                value={formData.liveBirths || ''}
                onChange={(e) => handleChange('liveBirths', e.target.value)}
              />
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label">
                Previous Delivery Type
              </label>
              <select
                className="form-select"
                value={formData.previousDeliveryType || ''}
                onChange={(e) => handleChange('previousDeliveryType', e.target.value)}
              >
                <option value="">Select delivery type</option>
                {deliveryTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="row">
            <div className="col-md-6 mb-3">
              <label className="form-label">
                Any Pregnancy Complications?
              </label>
              <select
                className="form-select"
                value={formData.hadComplications || 'no'}
                onChange={(e) => handleChange('hadComplications', e.target.value)}
              >
                <option value="no">No Complications</option>
                <option value="yes">Yes, Had Complications</option>
                <option value="minor">Minor Issues Only</option>
              </select>
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label">
                Gap Since Last Pregnancy
              </label>
              <select
                className="form-select"
                value={formData.pregnancyGap || ''}
                onChange={(e) => handleChange('pregnancyGap', e.target.value)}
              >
                <option value="">Select time gap</option>
                <option value="<1year">Less than 1 year</option>
                <option value="1-2years">1-2 years</option>
                <option value="2-3years">2-3 years</option>
                <option value="3-5years">3-5 years</option>
                <option value=">5years">More than 5 years</option>
              </select>
            </div>
          </div>

          {formData.hadComplications === 'yes' && (
            <div className="col-12 mb-3">
              <label className="form-label">
                Details of Previous Complications
              </label>
              <textarea
                className="form-control"
                rows="3"
                placeholder="Please describe any complications in previous pregnancies..."
                value={formData.complicationDetails || ''}
                onChange={(e) => handleChange('complicationDetails', e.target.value)}
              ></textarea>
            </div>
          )}
        </div>
      )}

      <div className="conception-info">
        <h6 className="conception-title">
          <span className="conception-icon">💕</span>
          Conception Information (Optional)
        </h6>
        <div className="row">
          <div className="col-md-6 mb-3">
            <label className="form-label">
              Conception Method
            </label>
            <select
              className="form-select"
              value={formData.conceptionMethod || 'natural'}
              onChange={(e) => handleChange('conceptionMethod', e.target.value)}
            >
              <option value="natural">Natural Conception</option>
              <option value="ivf">IVF Treatment</option>
              <option value="iui">IUI Treatment</option>
              <option value="fertility_drugs">With Fertility Medications</option>
              <option value="other">Other Assisted Method</option>
            </select>
          </div>
          <div className="col-md-6 mb-3">
            <label className="form-label">
              Multiple Pregnancy?
            </label>
            <select
              className="form-select"
              value={formData.multiplePregnancy || 'single'}
              onChange={(e) => handleChange('multiplePregnancy', e.target.value)}
            >
              <option value="single">Single Baby</option>
              <option value="twins">Twins</option>
              <option value="triplets">Triplets</option>
              <option value="more">More than Three</option>
            </select>
          </div>
        </div>
      </div>

      <div className="pregnancy-journey-info">
        <div className="journey-header">
          <span className="journey-icon">🌟</span>
          <strong>Your Pregnancy Journey</strong>
        </div>
        <p className="journey-text">
          Every pregnancy is unique and beautiful. We'll provide personalized guidance, 
          track your progress, and celebrate each milestone with you. Our app adapts to 
          your specific needs based on your pregnancy history and current status.
        </p>
      </div>
    </div>
  );
};

export default PregnancyInfoSection;