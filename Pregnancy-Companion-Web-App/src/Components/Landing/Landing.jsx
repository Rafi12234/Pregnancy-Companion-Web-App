import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Landing.css";

const LandingPage = () => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger animations after component mounts
    setIsVisible(true);
  }, []);

  const handleGetStarted = () => {
    navigate("/Signup");
  };

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="landing-container">
      {/* Header */}
      <header className={`landing-header ${isVisible ? "visible" : ""}`}>
        <div className="header-content">
          <h1 className="logo">Pregnancy Companion</h1>
          <nav>
            <ul>
              <li>
                <button onClick={() => scrollToSection("features")}>
                  Features
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection("tips")}>Tips</button>
              </li>
              <li>
                <button onClick={() => scrollToSection("contact")}>
                  Contact
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <div className={`hero-text ${isVisible ? "visible" : ""}`}>
            <h2>Your trusted guide throughout pregnancy</h2>
            <p>
              Track progress, get personalized tips, and connect with
              experts—all in one beautiful app designed for expectant mothers.
            </p>
            <button className="cta-button" onClick={handleGetStarted}>
              Get Started
              <span className="button-icon">→</span>
            </button>
          </div>
          <div className={`hero-visual ${isVisible ? "visible" : ""}`}>
            <div className="floating-elements">
              <div className="circle-element"></div>
              <div className="circle-element"></div>
              <div className="circle-element"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="features">
        <div className="section-header">
          <h2>How We Support Your Journey</h2>
          <p>Everything you need for a healthy, informed pregnancy</p>
        </div>
        <div className="features-grid">
          <div className={`feature-card ${isVisible ? "visible" : ""}`}>
            <div className="feature-icon">
              <i className="fas fa-chart-line"></i>
            </div>
            <h3>Track Progress</h3>
            <p>Monitor your pregnancy milestones week by week with beautiful visualizations.</p>
          </div>
          <div className={`feature-card ${isVisible ? "visible" : ""}`}>
            <div className="feature-icon">
              <i className="fas fa-heartbeat"></i>
            </div>
            <h3>Health Tips</h3>
            <p>Daily personalized advice for nutrition, wellness, and exercise.</p>
          </div>
          <div className={`feature-card ${isVisible ? "visible" : ""}`}>
            <div className="feature-icon">
              <i className="fas fa-user-md"></i>
            </div>
            <h3>Expert Consultation</h3>
            <p>Connect with healthcare professionals for guidance and reassurance.</p>
          </div>
        </div>
      </section>

      {/* Tips Section */}
      <section id="tips" className="tips">
        <div className="section-header">
          <h2>Weekly Pregnancy Tips</h2>
          <p>Expert advice tailored to your pregnancy stage</p>
        </div>
        <div className="tips-content">
          <div className="tip-cards">
            <div className={`tip-card ${isVisible ? "visible" : ""}`}>
              <div className="tip-header">
                <span className="tip-week">Week 12</span>
                <h4>First Trimester Care</h4>
              </div>
              <p>Focus on nutrition and rest as your baby's organs begin to form.</p>
            </div>
            <div className={`tip-card ${isVisible ? "visible" : ""}`}>
              <div className="tip-header">
                <span className="tip-week">Week 24</span>
                <h4>Second Trimester Wellness</h4>
              </div>
              <p>Stay active with gentle exercises and monitor your baby's movements.</p>
            </div>
            <div className={`tip-card ${isVisible ? "visible" : ""}`}>
              <div className="tip-header">
                <span className="tip-week">Week 36</span>
                <h4>Third Trimester Preparation</h4>
              </div>
              <p>Prepare for delivery and learn about early signs of labor.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className={`cta-content ${isVisible ? "visible" : ""}`}>
          <h2>Start Your Journey Today</h2>
          <p>Join thousands of expectant mothers who trust Pregnancy Companion</p>
          <button className="cta-button secondary" onClick={handleGetStarted}>
            Create Account
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="landing-footer">
        <div className="footer-content">
          <div className="footer-section">
            <h3>Pregnancy Companion</h3>
            <p>Your trusted partner throughout pregnancy</p>
          </div>
          <div className="footer-section">
            <h4>Contact Us</h4>
            <p>support@pregnancycompanion.com</p>
            <p>+1 (800) 123-4567</p>
          </div>
          <div className="footer-section">
            <h4>Follow Us</h4>
            <div className="social-links">
              <a href="#"><i className="fab fa-facebook"></i></a>
              <a href="#"><i className="fab fa-instagram"></i></a>
              <a href="#"><i className="fab fa-twitter"></i></a>
              <a href="#"><i className="fab fa-pinterest"></i></a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2025 Pregnancy Companion. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;