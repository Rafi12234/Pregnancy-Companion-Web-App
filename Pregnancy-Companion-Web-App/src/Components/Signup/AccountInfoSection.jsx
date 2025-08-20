import React, { useState } from "react";
import { Lock, Eye, EyeOff, Shield, Check, X } from "lucide-react";
import "./AccountInfoSection.css";

const AccountInfoSection = ({ formData, onChange }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);

  const handleChange = (field, value) => {
    onChange('account', field, value);
    
    if (field === 'password') {
      calculatePasswordStrength(value);
    }
  };

  const calculatePasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/\d/.test(password)) strength++;
    if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) strength++;
    
    setPasswordStrength(strength);
  };

  const getPasswordStrengthText = () => {
    switch (passwordStrength) {
      case 0:
      case 1: return { text: 'Very Weak', color: '#ef4444' };
      case 2: return { text: 'Weak', color: '#f97316' };
      case 3: return { text: 'Fair', color: '#eab308' };
      case 4: return { text: 'Strong', color: '#22c55e' };
      case 5: return { text: 'Very Strong', color: '#16a34a' };
      default: return { text: '', color: '#6b7280' };
    }
  };

  const passwordMatch = formData.password && formData.confirmPassword && 
                       formData.password === formData.confirmPassword;

  const passwordRequirements = [
    { met: formData.password?.length >= 8, text: 'At least 8 characters' },
    { met: /[A-Z]/.test(formData.password || ''), text: 'One uppercase letter' },
    { met: /[a-z]/.test(formData.password || ''), text: 'One lowercase letter' },
    { met: /\d/.test(formData.password || ''), text: 'One number' },
    { met: /[!@#$%^&*(),.?":{}|<>]/.test(formData.password || ''), text: 'One special character' }
  ];

  return (
    <div className="form-section fade-in">
      <div className="section-title">
        <Lock size={24} className="title-icon" />
        Account Security
      </div>
      <p className="section-subtitle">
        Create a secure account to protect your pregnancy journey data
      </p>

      <div className="security-notice">
        <div className="security-header">
          <Shield size={20} className="security-icon" />
          <strong>Account Security Features</strong>
        </div>
        <ul className="security-features">
          <li>🔒 End-to-end encryption of all personal data</li>
          <li>🛡️ Two-factor authentication available</li>
          <li>📱 Secure mobile app access</li>
          <li>🔐 Regular security audits and updates</li>
        </ul>
      </div>

      <div className="row">
        <div className="col-12 mb-4">
          <label className="form-label required">
            <Lock size={16} className="label-icon" />
            Create Password
          </label>
          <div className="password-input-group">
            <input
              type={showPassword ? "text" : "password"}
              className="form-control"
              placeholder="Enter a strong password"
              value={formData.password}
              onChange={(e) => handleChange('password', e.target.value)}
              required
            />
            <button
              type="button"
              className="password-toggle"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {formData.password && (
            <div className="password-strength mt-2">
              <div className="strength-bar">
                <div 
                  className="strength-fill"
                  style={{ 
                    width: `${(passwordStrength / 5) * 100}%`,
                    backgroundColor: getPasswordStrengthText().color 
                  }}
                ></div>
              </div>
              <span 
                className="strength-text"
                style={{ color: getPasswordStrengthText().color }}
              >
                {getPasswordStrengthText().text}
              </span>
            </div>
          )}
        </div>
      </div>

      <div className="row">
        <div className="col-12 mb-4">
          <label className="form-label required">
            Confirm Password
          </label>
          <div className="password-input-group">
            <input
              type={showConfirmPassword ? "text" : "password"}
              className={`form-control ${
                formData.confirmPassword ? 
                  (passwordMatch ? 'is-valid' : 'is-invalid') : ''
              }`}
              placeholder="Confirm your password"
              value={formData.confirmPassword}
              onChange={(e) => handleChange('confirmPassword', e.target.value)}
              required
            />
            <button
              type="button"
              className="password-toggle"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          
          {formData.confirmPassword && (
            <div className={`password-match mt-2 ${passwordMatch ? 'match' : 'no-match'}`}>
              {passwordMatch ? (
                <><Check size={16} /> Passwords match</>
              ) : (
                <><X size={16} /> Passwords don't match</>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="password-requirements">
        <h6 className="requirements-title">Password Requirements:</h6>
        <div className="requirements-list">
          {passwordRequirements.map((req, index) => (
            <div key={index} className={`requirement-item ${req.met ? 'met' : 'unmet'}`}>
              {req.met ? <Check size={16} /> : <X size={16} />}
              <span>{req.text}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="account-preferences">
        <h6 className="preferences-title">
          <span className="preferences-icon">⚙️</span>
          Account Preferences
        </h6>
        
        <div className="preference-group">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              id="twoFactorAuth"
              checked={formData.accountPreferences?.twoFactorAuth || false}
              onChange={(e) => handleChange('accountPreferences', 'twoFactorAuth', e.target.checked)}
            />
            <label className="form-check-label" htmlFor="twoFactorAuth">
              <strong>Enable Two-Factor Authentication</strong>
              <br />
              <small className="text-muted">
                Add an extra layer of security to your account
              </small>
            </label>
          </div>

          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              id="biometricLogin"
              checked={formData.accountPreferences?.biometricLogin || false}
              onChange={(e) => handleChange('accountPreferences', 'biometricLogin', e.target.checked)}
            />
            <label className="form-check-label" htmlFor="biometricLogin">
              <strong>Enable Biometric Login</strong>
              <br />
              <small className="text-muted">
                Use fingerprint or face recognition for quick access
              </small>
            </label>
          </div>

          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              id="sessionTimeout"
              checked={formData.accountPreferences?.sessionTimeout || true}
              onChange={(e) => handleChange('accountPreferences', 'sessionTimeout', e.target.checked)}
            />
            <label className="form-check-label" htmlFor="sessionTimeout">
              <strong>Auto-logout after inactivity</strong>
              <br />
              <small className="text-muted">
                Automatically sign out after 30 minutes of inactivity
              </small>
            </label>
          </div>
        </div>
      </div>

      <div className="data-sharing-preferences">
        <h6 className="data-title">
          <span className="data-icon">📊</span>
          Data & Privacy Preferences
        </h6>
        
        <div className="preference-group">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              id="anonymousData"
              checked={formData.dataPreferences?.anonymousData || false}
              onChange={(e) => handleChange('dataPreferences', 'anonymousData', e.target.checked)}
            />
            <label className="form-check-label" htmlFor="anonymousData">
              <strong>Contribute to pregnancy research</strong>
              <br />
              <small className="text-muted">
                Share anonymous data to help improve pregnancy care for all mothers
              </small>
            </label>
          </div>

          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              id="marketingEmails"
              checked={formData.dataPreferences?.marketingEmails || false}
              onChange={(e) => handleChange('dataPreferences', 'marketingEmails', e.target.checked)}
            />
            <label className="form-check-label" htmlFor="marketingEmails">
              <strong>Receive health and wellness tips</strong>
              <br />
              <small className="text-muted">
                Get curated content about pregnancy, nutrition, and baby care
              </small>
            </label>
          </div>

          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              id="dataExport"
              checked={formData.dataPreferences?.dataExport || true}
              onChange={(e) => handleChange('dataPreferences', 'dataExport', e.target.checked)}
            />
            <label className="form-check-label" htmlFor="dataExport">
              <strong>Allow data export</strong>
              <br />
              <small className="text-muted">
                Enable downloading your data for personal records or doctor visits
              </small>
            </label>
          </div>
        </div>
      </div>

      <div className="terms-agreement">
        <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            id="termsAccepted"
            checked={formData.termsAccepted || false}
            onChange={(e) => handleChange('termsAccepted', e.target.checked)}
            required
          />
          <label className="form-check-label" htmlFor="termsAccepted">
            I agree to the{" "}
            <a href="/terms" target="_blank" className="terms-link">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="/privacy" target="_blank" className="terms-link">
              Privacy Policy
            </a>
          </label>
        </div>
      </div>

      <div className="account-creation-info">
        <div className="info-header">
          <span className="info-icon">✨</span>
          <strong>What happens next?</strong>
        </div>
        <ul className="info-list">
          <li>📧 Email verification link will be sent</li>
          <li>🎯 Personalized dashboard setup</li>
          <li>📅 First appointment scheduling assistance</li>
          <li>📖 Access to pregnancy week-by-week guide</li>
          <li>👥 Connection with healthcare providers</li>
        </ul>
      </div>
    </div>
  );
};

export default AccountInfoSection;