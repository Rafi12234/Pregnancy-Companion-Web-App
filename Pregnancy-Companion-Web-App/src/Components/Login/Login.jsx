import React, { useEffect, useMemo, useState } from "react";
import { Heart } from "lucide-react";
import "./Login.css";
import InputField from "./InputField";
import AnimatedBackground from "./AnimatedBackground";
import LoadingButton from "./LoadingButton";
import SuccessNotification from "./SuccessNotification";
import { Link, useNavigate } from "react-router-dom";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [touched, setTouched] = useState({});
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [remember, setRemember] = useState(false);

  const navigate = useNavigate();

  // Mount animations + restore remembered email
  useEffect(() => {
    setMounted(true);
    const rememberedEmail = localStorage.getItem("rememberedEmail");
    if (rememberedEmail) {
      setFormData((f) => ({ ...f, email: rememberedEmail }));
      setRemember(true);
    }
  }, []);

  // Derived validation
  const currentErrors = useMemo(() => {
    const e = {};
    if (!EMAIL_RE.test(formData.email)) e.email = "Enter a valid email address.";
    if (formData.password.length < 6)
      e.password = "Password must be at least 6 characters.";
    return e;
  }, [formData]);

  const isValid = Object.keys(currentErrors).length === 0;

  // Sync visible errors when fields touched or form changes
  useEffect(() => {
    const shown = {};
    for (const k of Object.keys(touched)) {
      if (touched[k]) shown[k] = currentErrors[k];
    }
    setErrors(shown);
  }, [currentErrors, touched]);

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    if (name === "remember") {
      setRemember(checked);
      return;
    }
    setFormData((f) => ({ ...f, [name]: value }));
  }

  function handleBlur(e) {
    const { name } = e.target;
    setTouched((t) => ({ ...t, [name]: true }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setServerError("");
    setTouched({ email: true, password: true });

    if (!isValid) {
      // surface all current errors
      setErrors(currentErrors);
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include", // include cookies if your backend sets them
        body: JSON.stringify({
          email: formData.email.trim(),
          password: formData.password,
        }),
      });

      const data = await res.json().catch(() => ({}));

      setIsLoading(false);

      if (res.ok) {
        setShowSuccess(true);

        // Remember email preference
        if (remember) {
          localStorage.setItem("rememberedEmail", formData.email.trim());
        } else {
          localStorage.removeItem("rememberedEmail");
        }

        // If backend returns a token and you prefer localStorage tokens:
        // if (data.token) localStorage.setItem("token", data.token);

        // Navigate after a short success moment
        setTimeout(() => navigate("/dashboard"), 1200);
      } else {
        setServerError(data.message || "Login failed. Please try again.");
      }
    } catch (err) {
      setIsLoading(false);
      setServerError("Server error. Please try again later.");
    }
  }

  return (
    <div className="login-container">
      <AnimatedBackground />

      <SuccessNotification show={showSuccess} onClose={() => setShowSuccess(false)} />

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
          <form className="login-form" onSubmit={handleSubmit} noValidate>
            <InputField
              type="email"
              placeholder="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              onBlur={handleBlur}
              iconType="mail"
              aria-invalid={Boolean(touched.email && currentErrors.email)}
              aria-describedby="email-error"
            />
            {touched.email && currentErrors.email && (
              <p id="email-error" className="error">{currentErrors.email}</p>
            )}

            <InputField
              type="password"
              placeholder="Password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              onBlur={handleBlur}
              iconType="lock"
              aria-invalid={Boolean(touched.password && currentErrors.password)}
              aria-describedby="password-error"
            />
            {touched.password && currentErrors.password && (
              <p id="password-error" className="error">{currentErrors.password}</p>
            )}

            <div className="form-options">
              <label className="remember-me">
                <input
                  type="checkbox"
                  className="checkbox"
                  name="remember"
                  checked={remember}
                  onChange={handleChange}
                />
                <span>Remember me</span>
              </label>
              <a href="#" className="forgot-password">
                Forgot password?
              </a>
            </div>

            {/* Server error banner */}
            {serverError && <div className="error" style={{ marginBottom: 10 }}>{serverError}</div>}

            <LoadingButton isLoading={isLoading} type="submit" disabled={!isValid || isLoading}>
              Sign In
            </LoadingButton>
          </form>

          {/* Divider */}
          <div className="divider">
            <div className="divider-line"></div>
            <span className="divider-text">or</span>
            <div className="divider-line"></div>
          </div>

          {/* Social Login (placeholder) */}
          <div className="social-login">
            <button className="social-btn" type="button">
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
