import React from "react";
import { Heart, Phone, User, Briefcase } from "lucide-react";
import "./PartnerInfoSection.css";

const PartnerInfoSection = ({ formData, onChange }) => {
  const handleChange = (field, value) => {
    onChange('partner', field, value);
  };

  const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

  return (
    <div className="form-section fade-in">
      <div className="section-title">
        <Heart size={24} className="title-icon" />
        Partner Information
      </div>
      <p className="section-subtitle">
        Tell us about your partner so we can include them in your journey
      </p>

      <div className="row">
        <div className="col-md-8 mb-4">
          <label className="form-label required">
            <User size={16} className="label-icon" />
            Partner's Full Name
          </label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter your partner's full name"
            value={formData.husbandName}
            onChange={(e) => handleChange('husbandName', e.target.value)}
            required
          />
          <div className="form-text">
            We'll include them in important updates and notifications
          </div>
        </div>

        <div className="col-md-4 mb-4">
          <label className="form-label">
            Partner's Age (optional)
          </label>
          <input
            type="number"
            className="form-control"
            placeholder="Age"
            min="18"
            max="80"
            value={formData.husbandAge || ''}
            onChange={(e) => handleChange('husbandAge', e.target.value)}
          />
        </div>
      </div>

      <div className="row">
        <div className="col-md-6 mb-4">
          <label className="form-label required">
            <Phone size={16} className="label-icon" />
            Partner's Phone Number
          </label>
          <div className="input-group">
            <span className="input-group-text">🇧🇩 +880</span>
            <input
              type="tel"
              className="form-control"
              placeholder="1712345678"
              maxLength="10"
              pattern="[0-9]{10}"
              value={formData.husbandPhone}
              onChange={(e) => handleChange('husbandPhone', e.target.value)}
              required
            />
          </div>
          <div className="form-text">
            For emergency situations and appointment reminders
          </div>
        </div>

        <div className="col-md-6 mb-4">
          <label className="form-label">
            Partner's Blood Group (optional)
          </label>
          <select
            className="form-select"
            value={formData.husbandBloodGroup || ''}
            onChange={(e) => handleChange('husbandBloodGroup', e.target.value)}
          >
            <option value="">Select blood group</option>
            {bloodGroups.map(group => (
              <option key={group} value={group}>{group}</option>
            ))}
          </select>
          <div className="form-text">
            Helpful for genetic counseling and emergency situations
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-md-6 mb-4">
          <label className="form-label">
            <Briefcase size={16} className="label-icon" />
            Partner's Occupation (optional)
          </label>
          <input
            type="text"
            className="form-control"
            placeholder="e.g., Doctor, Engineer, Business"
            value={formData.husbandOccupation || ''}
            onChange={(e) => handleChange('husbandOccupation', e.target.value)}
          />
        </div>

        <div className="col-md-6 mb-4">
          <label className="form-label">
            Partner's Email (optional)
          </label>
          <input
            type="email"
            className="form-control"
            placeholder="partner.email@example.com"
            value={formData.husbandEmail || ''}
            onChange={(e) => handleChange('husbandEmail', e.target.value)}
          />
          <div className="form-text">
            To receive pregnancy updates and tips for fathers
          </div>
        </div>
      </div>

      <div className="partner-involvement">
        <h6 className="involvement-title">
          <span className="involvement-icon">🤝</span>
          Partner Involvement Preferences
        </h6>
        <div className="row">
          <div className="col-md-6">
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                id="appointmentUpdates"
                checked={formData.partnerNotifications?.appointments || false}
                onChange={(e) => handleChange('partnerNotifications', 'appointments', e.target.checked)}
              />
              <label className="form-check-label" htmlFor="appointmentUpdates">
                Include in appointment updates
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                id="weeklyReports"
                checked={formData.partnerNotifications?.weeklyReports || false}
                onChange={(e) => handleChange('partnerNotifications', 'weeklyReports', e.target.checked)}
              />
              <label className="form-check-label" htmlFor="weeklyReports">
                Send weekly pregnancy reports
              </label>
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                id="milestoneAlerts"
                checked={formData.partnerNotifications?.milestones || false}
                onChange={(e) => handleChange('partnerNotifications', 'milestones', e.target.checked)}
              />
              <label className="form-check-label" htmlFor="milestoneAlerts">
                Milestone and development updates
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                id="emergencyContact"
                checked={formData.partnerNotifications?.emergency || false}
                onChange={(e) => handleChange('partnerNotifications', 'emergency', e.target.checked)}
              />
              <label className="form-check-label" htmlFor="emergencyContact">
                Emergency contact notifications
              </label>
            </div>
          </div>
        </div>
      </div>

      <div className="relationship-info">
        <h6 className="relationship-title">
          <span className="relationship-icon">💑</span>
          Relationship Information
        </h6>
        <div className="row">
          <div className="col-md-6 mb-3">
            <label className="form-label">
              Relationship Status
            </label>
            <select
              className="form-select"
              value={formData.relationshipStatus || 'married'}
              onChange={(e) => handleChange('relationshipStatus', e.target.value)}
            >
              <option value="married">Married</option>
              <option value="engaged">Engaged</option>
              <option value="partner">Long-term Partner</option>
              <option value="single">Single Parent</option>
            </select>
          </div>

          <div className="col-md-6 mb-3">
            <label className="form-label">
              Years Together (optional)
            </label>
            <input
              type="number"
              className="form-control"
              placeholder="Years"
              min="0"
              max="50"
              value={formData.yearsTogether || ''}
              onChange={(e) => handleChange('yearsTogether', e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="support-info">
        <div className="support-header">
          <span className="support-icon">👨‍👩‍👧‍👦</span>
          <strong>Support System</strong>
        </div>
        <p className="support-text">
          Having a supportive partner during pregnancy is crucial for both mother and baby's 
          wellbeing. We'll provide resources and tips to help your partner support you 
          throughout this journey.
        </p>
      </div>
    </div>
  );
};

export default PartnerInfoSection;