import React from 'react';
import { Link } from 'react-router-dom';

const Welcome = () => {
  return (
    <div className="welcome fade-in">
      <div className="welcome-content">
        <h1>Welcome to VitalTrack</h1>
        <p>Your personal health and wellness companion for a healthier, happier life</p>
        
        <div className="welcome-cta">
          <Link to="/register" className="btn btn-primary">Get Started</Link>
          <a href="#features" className="btn btn-outline">Learn More</a>
        </div>
        
        <div className="features" id="features">
          <div className="feature-card slide-up">
            <div className="feature-icon">🏃</div>
            <h3>Activity Tracking</h3>
            <p>Track your daily walks, runs, and cycling activities to reach your fitness goals.</p>
          </div>
          
          <div className="feature-card slide-up">
            <div className="feature-icon">🧘</div>
            <h3>Guided Meditation</h3>
            <p>Reduce stress and improve focus with our guided breathing exercises.</p>
          </div>
          
          <div className="feature-card slide-up">
            <div className="feature-icon">💤</div>
            <h3>Sleep Analysis</h3>
            <p>Monitor your sleep patterns to ensure you're getting quality rest.</p>
          </div>
          
          <div className="feature-card slide-up">
            <div className="feature-icon">💪</div>
            <h3>Exercise Library</h3>
            <p>Access a variety of workout videos tailored to your fitness level.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Welcome;