import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./Landing.css";

const LandingPage = () => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const observerRef = useRef(null);

  useEffect(() => {
    // Trigger initial animations
    const timer = setTimeout(() => setIsVisible(true), 100);
    
    // Intersection Observer for scroll animations
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-in");
            setActiveSection(entry.target.id || "home");
          }
        });
      },
      { threshold: 0.1, rootMargin: "-50px" }
    );

    // Observe all sections
    const sections = document.querySelectorAll("section, .hero");
    sections.forEach((section) => {
      if (observerRef.current) {
        observerRef.current.observe(section);
      }
    });

    return () => {
      clearTimeout(timer);
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  const handleGetStarted = () => {
    navigate("/Login");
  };

  const handleCreateAccount = () => {
    navigate("/SignUp");
  };

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="landing-container">
      {/* Navigation Header */}
      <header className={`landing-header ${isVisible ? "header-visible" : ""}`}>
        <div className="header-content">
          <div className="logo-section">
            <div className="logo-icon">
              <div className="logo-heart"></div>
            </div>
            <h1 className="logo-text">Pregnancy Companion</h1>
          </div>
          
          <nav className="navigation">
            <ul className="nav-list">
              <li className={activeSection === "home" ? "active" : ""}>
                <button onClick={() => scrollToSection("home")}>Home</button>
              </li>
              <li className={activeSection === "features" ? "active" : ""}>
                <button onClick={() => scrollToSection("features")}>Features</button>
              </li>
              <li className={activeSection === "tips" ? "active" : ""}>
                <button onClick={() => scrollToSection("tips")}>Tips</button>
              </li>
              <li className={activeSection === "contact" ? "active" : ""}>
                <button onClick={() => scrollToSection("contact")}>Contact</button>
              </li>
            </ul>
          </nav>

          <div className="header-actions">
            <button className="login-btn" onClick={handleGetStarted}>
              Sign In
            </button>
            <button className="signup-btn" onClick={handleCreateAccount}>
              Sign Up
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section id="home" className="hero">
        <div className="hero-background">
          <div className="gradient-orb orb-1"></div>
          <div className="gradient-orb orb-2"></div>
          <div className="gradient-orb orb-3"></div>
        </div>
        
        <div className="hero-content">
          <div className="hero-text">
            <div className="hero-badge">
              <span>✨ Trusted by 50,000+ mothers</span>
            </div>
            <h1 className="hero-title">
              Your <span className="gradient-text">trusted companion</span><br />
              throughout pregnancy
            </h1>
            <p className="hero-description">
              Experience a seamless pregnancy journey with personalized tracking, 
              expert guidance, and a supportive community—all designed with love 
              for expectant mothers.
            </p>
            <div className="hero-actions">
              <button className="primary-button" onClick={handleGetStarted}>
                Start Your Journey
                <div className="button-arrow">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"/>
                  </svg>
                </div>
              </button>
            </div>
          </div>
          
          <div className="hero-visual">
            <div className="phone-mockup">
              <div className="phone-screen">
                <div className="app-interface">
                  <div className="app-header">
                    <div className="welcome-section">
                      <h3>Welcome to</h3>
                      <h2>Pregnancy Companion</h2>
                    </div>
                  </div>
                  <div className="app-content">
                    <div className="feature-preview">
                      <div className="preview-item">
                        <div className="preview-icon">📊</div>
                        <div className="preview-text">
                          <div className="preview-title">Track Progress</div>
                          <div className="preview-desc">Weekly milestones</div>
                        </div>
                      </div>
                      <div className="preview-item">
                        <div className="preview-icon">💡</div>
                        <div className="preview-text">
                          <div className="preview-title">Daily Tips</div>
                          <div className="preview-desc">Expert guidance</div>
                        </div>
                      </div>
                      <div className="preview-item">
                        <div className="preview-icon">👩‍⚕️</div>
                        <div className="preview-text">
                          <div className="preview-title">Expert Support</div>
                          <div className="preview-desc">24/7 assistance</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="floating-elements">
              <div className="float-item float-item-1">💕</div>
              <div className="float-item float-item-2">🤱</div>
              <div className="float-item float-item-3">👶</div>
              <div className="float-item float-item-4">🤰</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="features">
        <div className="container">
          <div className="section-header">
            <div className="section-badge">Features</div>
            <h2 className="section-title">
              Everything you need for a<br />
              <span className="gradient-text">healthy pregnancy</span>
            </h2>
            <p className="section-description">
              Comprehensive tools and insights designed to support you through every stage of your pregnancy journey.
            </p>
          </div>

          <div className="features-grid">
            <div className="feature-card feature-primary">
              <div className="feature-icon">
                <svg width="32" height="32" viewBox="0 0 32 32" fill="currentColor">
                  <path d="M4 8h24v2H4V8zm0 6h24v2H4v-2zm0 6h16v2H4v-2z"/>
                </svg>
              </div>
              <h3>Smart Tracking</h3>
              <p>Monitor your pregnancy milestones, symptoms, and baby's development with intelligent insights and beautiful visualizations.</p>
              <div className="feature-link">
                Learn more →
              </div>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <svg width="32" height="32" viewBox="0 0 32 32" fill="currentColor">
                  <path d="M16 4L4 16l12 12 12-12L16 4zm0 4.828L23.172 16 16 23.172 8.828 16 16 8.828z"/>
                </svg>
              </div>
              <h3>Personalized Tips</h3>
              <p>Receive daily guidance tailored to your pregnancy stage, including nutrition advice and wellness recommendations.</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <svg width="32" height="32" viewBox="0 0 32 32" fill="currentColor">
                  <path d="M16 2C8.268 2 2 8.268 2 16s6.268 14 14 14 14-6.268 14-14S23.732 2 16 2zm8 14c0 4.418-3.582 8-8 8s-8-3.582-8-8 3.582-8 8-8 8 3.582 8 8z"/>
                </svg>
              </div>
              <h3>Pregnancy Progress</h3>
              <p>Connect with certified healthcare professionals and join a community of expectant mothers for support and advice.</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <svg width="32" height="32" viewBox="0 0 32 32" fill="currentColor">
                  <path d="M16 8a8 8 0 100 16 8 8 0 000-16zM8 16a8 8 0 1116 0 8 8 0 01-16 0z"/>
                </svg>
              </div>
              <h3>Health, Diet & Symptom Logs</h3>
              <p>Track vital health metrics, appointments, and medication reminders to ensure you and your baby stay healthy.</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <svg width="32" height="32" viewBox="0 0 32 32" fill="currentColor">
                  <path d="M16 2l4.5 9h9.5l-7.75 6 3 9.5L16 21l-9.25 5.5 3-9.5L2 11.5h9.5L16 2z"/>
                </svg>
              </div>
              <h3>Community Support</h3>
              <p>Prepare for delivery with comprehensive birth plan tools, hospital bag checklists, and labor preparation guides.</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <svg width="32" height="32" viewBox="0 0 32 32" fill="currentColor">
                  <path d="M28 12H4a2 2 0 00-2 2v12a2 2 0 002 2h24a2 2 0 002-2V14a2 2 0 00-2-2zM4 14h24v12H4V14z"/>
                </svg>
              </div>
              <h3>Memory Keeping</h3>
              <p>Capture and preserve precious moments with photo journals, milestone recordings, and digital baby books.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Tips Section */}
      <section id="tips" className="tips">
        <div className="container">
          <div className="section-header">
            <div className="section-badge">Weekly Tips</div>
            <h2 className="section-title">
              Expert guidance for<br />
              <span className="gradient-text">every stage</span>
            </h2>
          </div>

          <div className="tips-timeline">
            <div className="timeline-line"></div>
            
            <div className="tip-item">
              <div className="tip-marker">
                <span className="tip-week">12</span>
              </div>
              <div className="tip-content">
                <div className="tip-header">
                  <h4>First Trimester Essentials</h4>
                  <span className="tip-badge">Weeks 1-12</span>
                </div>
                <p>Focus on foundational nutrition, managing morning sickness, and establishing healthy habits as your baby's vital organs begin to develop.</p>
                <div className="tip-highlights">
                  <span>• Folic acid supplements</span>
                  <span>• Regular prenatal checkups</span>
                  <span>• Gentle exercise routines</span>
                </div>
              </div>
            </div>

            <div className="tip-item">
              <div className="tip-marker">
                <span className="tip-week">24</span>
              </div>
              <div className="tip-content">
                <div className="tip-header">
                  <h4>Second Trimester Wellness</h4>
                  <span className="tip-badge">Weeks 13-27</span>
                </div>
                <p>Embrace increased energy levels with safe exercise routines, monitor baby's movements, and prepare for important screening tests.</p>
                <div className="tip-highlights">
                  <span>• Glucose screening</span>
                  <span>• Anatomy ultrasound</span>
                  <span>• Prenatal yoga</span>
                </div>
              </div>
            </div>

            <div className="tip-item">
              <div className="tip-marker">
                <span className="tip-week">36</span>
              </div>
              <div className="tip-content">
                <div className="tip-header">
                  <h4>Third Trimester Preparation</h4>
                  <span className="tip-badge">Weeks 28-40</span>
                </div>
                <p>Finalize birth plans, pack hospital bags, and learn about labor signs while maintaining comfort and reducing anxiety.</p>
                <div className="tip-highlights">
                  <span>• Birth plan creation</span>
                  <span>• Hospital bag checklist</span>
                  <span>• Labor preparation classes</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <div className="cta-text">
              <h2 className="cta-title">
                Ready to start your<br />
                <span className="gradient-text">pregnancy journey?</span>
              </h2>
              <p className="cta-description">
                Join thousands of expectant mothers who trust Pregnancy Companion for expert guidance, community support, and peace of mind.
              </p>
              <div className="cta-stats">
                <div className="stat">
                  <div className="stat-number">50K+</div>
                  <div className="stat-label">Happy mothers</div>
                </div>
                <div className="stat">
                  <div className="stat-number">4.9</div>
                  <div className="stat-label">App rating</div>
                </div>
                <div className="stat">
                  <div className="stat-number">24/7</div>
                  <div className="stat-label">Expert support</div>
                </div>
              </div>
            </div>
            <div className="cta-actions">
              <button className="primary-button large" onClick={handleCreateAccount}>
                Create Free Account
                <div className="button-arrow">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"/>
                  </svg>
                </div>
              </button>
              <p className="cta-note">No credit card required • Free for 14 days</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="landing-footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-brand">
              <div className="logo-section">
                <div className="logo-icon">
                  <div className="logo-heart"></div>
                </div>
                <h3 className="logo-text">Pregnancy Companion</h3>
              </div>
              <p className="footer-description">
                Your trusted partner throughout pregnancy, providing expert guidance, 
                personalized insights, and a supportive community for expectant mothers.
              </p>
              <div className="social-links">
                <a href="#" className="social-link">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                  </svg>
                </a>
                <a href="#" className="social-link">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/>
                  </svg>
                </a>
                <a href="#" className="social-link">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.097.118.112.222.085.343-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001.012.001z"/>
                  </svg>
                </a>
                <a href="#" className="social-link">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
              </div>
            </div>

            <div className="footer-links">
              <div className="footer-column">
                <h4>Product</h4>
                <ul>
                  <li><a href="#">Features</a></li>
                  <li><a href="#">Pricing</a></li>
                  <li><a href="#">Mobile App</a></li>
                  <li><a href="#">Integrations</a></li>
                </ul>
              </div>
              <div className="footer-column">
                <h4>Resources</h4>
                <ul>
                  <li><a href="#">Blog</a></li>
                  <li><a href="#">Help Center</a></li>
                  <li><a href="#">Community</a></li>
                  <li><a href="#">Expert Tips</a></li>
                </ul>
              </div>
              <div className="footer-column">
                <h4>Company</h4>
                <ul>
                  <li><a href="#">About Us</a></li>
                  <li><a href="#">Careers</a></li>
                  <li><a href="#">Privacy Policy</a></li>
                  <li><a href="#">Terms of Service</a></li>
                </ul>
              </div>
              <div className="footer-column">
                <h4>Contact</h4>
                <ul>
                  <li><a href="mailto:support@pregnancycompanion.com">support@pregnancycompanion.com</a></li>
                  <li><a href="tel:+18001234567">+1 (800) 123-4567</a></li>
                  <li>24/7 Expert Support</li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="footer-bottom">
            <p>© 2025 Pregnancy Companion. All rights reserved.</p>
            <div className="footer-bottom-links">
              <a href="#">Privacy</a>
              <a href="#">Terms</a>
              <a href="#">Cookies</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
