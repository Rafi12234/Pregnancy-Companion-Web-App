import React, { useState } from "react";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import "./InputField.css";

const InputField = ({ type, placeholder, name, value, onChange, iconType }) => {
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const inputType = type === 'password' && showPassword ? 'text' : type;

  const getIcon = () => {
    switch (iconType) {
      case 'mail':
        return Mail;
      case 'lock':
        return Lock;
      default:
        return Mail;
    }
  };

  const Icon = getIcon();

  return (
    <div className="input-field-container">
      <div className={`input-wrapper ${isFocused ? 'focused' : ''}`}>
        <div className="input-icon-left">
          <Icon className={`icon ${isFocused ? 'icon-focused' : 'icon-default'}`} />
        </div>
        <input
          type={inputType}
          className="input-field"
          placeholder={placeholder}
          name={name}
          value={value}
          onChange={onChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          required
        />
        {type === 'password' && (
          <button
            type="button"
            className="password-toggle"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <EyeOff className="toggle-icon" />
            ) : (
              <Eye className="toggle-icon" />
            )}
          </button>
        )}
      </div>
      {isFocused && (
        <div className="focus-indicator"></div>
      )}
    </div>
  );
};

export default InputField;