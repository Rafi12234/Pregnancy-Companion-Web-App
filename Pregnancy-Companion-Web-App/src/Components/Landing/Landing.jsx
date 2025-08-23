
import React from "react";
import "./LandingPage.css";
// Uncomment the next line if you add an image named "hero.jpg" in the same folder
// import heroImage from "./hero.jpg";

const LandingPage = () => {
  return (
    <div className="landing-container">
      {/* Header */}
      <header className="landing-header">
        <h1>Pregnancy Companion</h1>
        <nav>
          <ul>
            <li><a href="#features">Features</a></li>
            <li><a href="#tips">Tips</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-text">
          <h2>Your trusted guide throughout pregnancy</h2>
          <p>Track progress, get tips, and consult experts—all in one app.</p>
          <button className="cta-button">Get Started</button>
        </div>

        {/* Hero Image - optional */}
        {/* 
        <div className="hero-image">
          <img src={heroImage} alt="Pregnancy App" />
        </div> 
        */}
      </section>

      {/* Features Section */}
      <section id="features" className="features">
        <div className="feature-card">
          <h3>Track Progress</h3>
          <p>Monitor your pregnancy milestones week by week.</p>
        </div>
        <div className="feature-card">
          <h3>Health Tips</h3>
          <p>Daily advice for diet, wellness, and exercise.</p>
        </div>
        <div className="feature-card">
          <h3>Expert Consultation</h3>
          <p>Connect with healthcare professionals easily.</p>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="landing-footer">
        <p>© 2025 Pregnancy Companion. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default LandingPage;
