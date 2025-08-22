import React, { useState, useEffect } from "react";
import { Heart } from "lucide-react";
import "./Login.css";
import InputField from "./InputField";
import AnimatedBackground from "./AnimatedBackground";
import LoadingButton from "./LoadingButton";
import SuccessNotification from "./SuccessNotification";
import { Link, useNavigate } from "react-router-dom"; // ✅ import useNavigate

const Login = () => {
  const [formData, setFormData] = useState({ emailOrPhone: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [mounted, setMounted] = useState(false);

  const navigate = useNavigate(); // ✅ hook for navigation

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setShowSuccess(true);

      // ✅ navigate to dashboard after short delay
      setTimeout(() => {
        navigate("/dashboard");
      }, 1500); // wait 1.5s to show success message
    }, 2000);
  };

  return (
    <div className="login-container">
      <AnimatedBackground />
      <SuccessNotification
        show={showSuccess}
        onClose={() => setShowSuccess(false)}
      />

      <div className={`login-wrapper ${mounted ? "mounted" : ""}`}>
        <div className="login-card">
          {/* Header */}
          <div className="login-header">
            <div className="login-icon">
              <Heart className="heart-icon" />
            </div>
            <h2 className="login-title">Welcome Back, Mother! 👩‍🍼</h2>
            <p className="login-subtitle">Sign in to continue your journey</p>
          </div>

          {/* Form */}
          <div className="login-form">
            <InputField
              type="text"
              placeholder="Email or Phone"
              name="emailOrPhone"
              value={formData.emailOrPhone}
              onChange={handleChange}
              iconType="mail"
            />

            <InputField
              type="password"
              placeholder="Password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              iconType="lock"
            />

            <div className="form-options">
              <label className="remember-me">
                <input type="checkbox" className="checkbox" />
                <span>Remember me</span>
              </label>
              <a href="#" className="forgot-password">
                Forgot password?
              </a>
            </div>

            <LoadingButton isLoading={isLoading} onClick={handleSubmit}>
              Sign In
            </LoadingButton>
          </div>

          {/* Divider */}
          <div className="divider">
            <div className="divider-line"></div>
            <span className="divider-text">or</span>
            <div className="divider-line"></div>
          </div>

          {/* Social Login */}
          <div className="social-login">
            <button className="social-btn">
              <div className="google-icon"></div>
              <span>Continue with Google</span>
            </button>
          </div>

          {/* Footer */}
          <p className="login-footer">
            Don’t have an account?{" "}
            <Link to="/signup" className="signup-link">
              Sign Up
            </Link>
          </p>
        </div>

        {/* Floating Action Hint */}
        <div className="love-message">
          <p>
            <Heart className="heart-small" />
            <span>Made with love for amazing mothers</span>
            <Heart className="heart-small" />
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
