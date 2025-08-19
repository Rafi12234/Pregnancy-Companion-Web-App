import React from "react";
import { Heart } from "lucide-react";
import "./AnimatedBackground.css";

const AnimatedBackground = () => {
  return (
    <div className="animated-background">
      {/* Gradient Background */}
      <div className="gradient-bg"></div>
      
      {/* Floating Hearts */}
      <div className="floating-hearts">
        {Array.from({ length: 15 }).map((_, i) => (
          <div
            key={`heart-${i}`}
            className="floating-heart"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 20}s`,
              animationDuration: `${15 + Math.random() * 10}s`
            }}
          >
            <Heart 
              size={Math.random() * 30 + 20} 
              className="heart-element" 
            />
          </div>
        ))}
      </div>

      {/* Gradient Orbs */}
      <div className="gradient-orb orb-1"></div>
      <div className="gradient-orb orb-2"></div>
      <div className="gradient-orb orb-3"></div>

      {/* Floating Particles */}
      <div className="floating-particles">
        {Array.from({ length: 50 }).map((_, i) => (
          <div
            key={`particle-${i}`}
            className="particle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default AnimatedBackground;