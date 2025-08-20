import React from "react";
import { Phone, Mail, MapPin, Globe } from "lucide-react";
import "./ContactInfoSection.css";

const ContactInfoSection = ({ formData, onChange }) => {
  const handleChange = (field, value) => {
    onChange('contact', field, value);
  };

  const districts = [
    "Dhaka", "Chittagong", "Rajshahi", "Khulna", "Barisal", "Sylhet", 
    "Rangpur", "Mymensingh", "Comilla", "Gazipur", "Narayanganj", "Tangail"
  ];

  return (
    <div className="form-section fade-in">
      <div className="section-title">
        <Phone size={24} className="title-icon" />
        Contact Information
      </div>
      <p className="section-subtitle">
        How can we reach you for important updates and emergency situations?
      </p>

      <div className="row">
        <div className="col-md-6 mb-4">
          <label className="form-label required">
            <Phone size={16} className="label-icon" />
            Your Phone Number
          </label>
          <div className="input-group">
            <span className="input-group-text">🇧🇩 +880</span>
            <input
              type="tel"
              className="form-control"
              placeholder="1712345678"
              maxLength="10"
              pattern="[0-9]{10}"
              value={formData.motherPhone}
              onChange={(e) => handleChange('motherPhone', e.target.value)}
              required
            />
          </div>
          <div className="form-text">
            We'll send appointment reminders and important updates
          </div>
        </div>

        <div className="col-md-6 mb-4">
          <label className="form-label required">
            <Mail size={16} className="label-icon" />
            Email Address
          </label>
          <input
            type="email"
            className="form-control"
            placeholder="your.email@example.com"
            value={formData.motherEmail}
            onChange={(e) => handleChange('motherEmail', e.target.value)}
            required
          />
          <div className="form-text">
            For account verification and weekly pregnancy reports
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-12 mb-4">
          <label className="form-label required">
            <MapPin size={16} className="label-icon" />
            Home Address
          </label>
          <textarea
            className="form-control"
            rows="3"
            placeholder="House/Flat No., Road, Area, Thana"
            value={formData.address}
            onChange={(e) => handleChange('address', e.target.value)}
            required
          ></textarea>
          <div className="form-text">
            Complete address for emergency contacts and home visits if needed
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-md-6 mb-4">
          <label className="form-label required">
            <Globe size={16} className="label-icon" />
            District
          </label>
          <select
            className="form-select"
            value={formData.district || ''}
            onChange={(e) => handleChange('district', e.target.value)}
            required
          >
            <option value="">Select your district</option>
            {districts.map(district => (
              <option key={district} value={district}>{district}</option>
            ))}
          </select>
        </div>

        <div className="col-md-6 mb-4">
          <label className="form-label">
            Emergency Contact Name (optional)
          </label>
          <input
            type="text"
            className="form-control"
            placeholder="Parent/Sister/Friend name"
            value={formData.emergencyContactName || ''}
            onChange={(e) => handleChange('emergencyContactName', e.target.value)}
          />
        </div>
      </div>

      <div className="row">
        <div className="col-md-6 mb-4">
          <label className="form-label">
            Emergency Contact Phone (optional)
          </label>
          <div className="input-group">
            <span className="input-group-text">🇧🇩 +880</span>
            <input
              type="tel"
              className="form-control"
              placeholder="1712345678"
              maxLength="10"
              value={formData.emergencyContactPhone || ''}
              onChange={(e) => handleChange('emergencyContactPhone', e.target.value)}
            />
          </div>
          <div className="form-text">
            Someone to contact in case of emergency
          </div>
        </div>

        <div className="col-md-6 mb-4">
          <label className="form-label">
            Preferred Communication Method
          </label>
          <select
            className="form-select"
            value={formData.preferredCommunication || 'both'}
            onChange={(e) => handleChange('preferredCommunication', e.target.value)}
          >
            <option value="both">Both SMS & Email</option>
            <option value="sms">SMS Only</option>
            <option value="email">Email Only</option>
            <option value="call">Phone Calls</option>
          </select>
        </div>
      </div>

      <div className="notification-preferences">
        <h6 className="preferences-title">
          <span className="preferences-icon">🔔</span>
          Notification Preferences
        </h6>
        <div className="row">
          <div className="col-md-6">
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                id="appointmentReminders"
                checked={formData.notifications?.appointments || false}
                onChange={(e) => handleChange('notifications', 'appointments', e.target.checked)}
              />
              <label className="form-check-label" htmlFor="appointmentReminders">
                Appointment Reminders
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                id="dailyTips"
                checked={formData.notifications?.dailyTips || false}
                onChange={(e) => handleChange('notifications', 'dailyTips', e.target.checked)}
              />
              <label className="form-check-label" htmlFor="dailyTips">
                Daily Pregnancy Tips
              </label>
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                id="milestones"
                checked={formData.notifications?.milestones || false}
                onChange={(e) => handleChange('notifications', 'milestones', e.target.checked)}
              />
              <label className="form-check-label" htmlFor="milestones">
                Milestone Updates
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                id="emergencyAlerts"
                checked={formData.notifications?.emergencyAlerts || false}
                onChange={(e) => handleChange('notifications', 'emergencyAlerts', e.target.checked)}
              />
              <label className="form-check-label" htmlFor="emergencyAlerts">
                Emergency Alerts
              </label>
            </div>
          </div>
        </div>
      </div>

      <div className="privacy-notice">
        <div className="privacy-header">
          <span className="privacy-icon">🔒</span>
          <strong>Privacy & Security</strong>
        </div>
        <p className="privacy-text">
          Your contact information is encrypted and will only be used for pregnancy-related 
          services. We never share your personal data with third parties.
        </p>
      </div>
    </div>
  );
};

export default ContactInfoSection;