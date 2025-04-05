// App.jsx - Main application component
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import './App.css';

// Components
import LandingPage from './components/LandingPage';
import Welcome from './components/Welcome';
import UserForm from './components/UserForm';
import Dashboard from './components/Dashboard';
import ActivityTracker from './components/ActivityTracker';
import MeditationGuide from './components/MeditationGuide';
import SleepTracker from './components/SleepTracker';
import ExerciseVideos from './components/ExerciseVideos';
import NotFound from './components/NotFound';
import logo from '../src/image.png';
import PeriodTrackerCalendar from './components/PeriodTracker';
import HealthAdventureGame from './components/HealthAdventureGame';
import NutritionPlan from './components/NutritionPlan';

function App() {
  const [user, setUser] = useState(null);
  const [showLanding, setShowLanding] = useState(true);
  const [darkMode, setDarkMode] = useState(() => {
    // Initialize from localStorage, default to user's system preference
    const savedMode = localStorage.getItem('darkMode');
    if (savedMode !== null) {
      return savedMode === 'true';
    }
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  });
  
  // Check if this is the user's first visit in the current session
  useEffect(() => {
    const hasVisited = sessionStorage.getItem('hasVisited');
    if (hasVisited) {
      setShowLanding(true); // Show landing page only on first visit
    } else {
      sessionStorage.setItem('hasVisited', 'true');
    }
  }, []);
  
  // Apply theme class to document whenever darkMode changes
  useEffect(() => {
    // Apply theme class to the root HTML element
    if (darkMode) {
      document.documentElement.classList.add('dark-theme');
      document.documentElement.classList.remove('light-theme');
    } else {
      document.documentElement.classList.add('light-theme');
      document.documentElement.classList.remove('dark-theme');
    }
    
    // Save preference to localStorage
    localStorage.setItem('darkMode', darkMode);
  }, [darkMode]);
  
  const toggleDarkMode = () => {
    setDarkMode(prevMode => !prevMode);
  };

  const handleUserSubmit = (userData) => {
    setUser(userData);
  };

  return (
    <Router>
      <div className="app">
        <header className="header">
          <div className="container header-content">
            <Link to="/" className="logo">
              <span className="logo-icon"><img src={logo} width={60} height={60} alt="VitalTrack Logo"/></span>
              <span className="logo-text">VitalTrack</span>
            </Link>
            
            <div className="right-header">
              {user && (
                <nav className="nav">
                  <ul className="nav-links">
                    <li><Link to="/dashboard">Dashboard</Link></li>
                    <li><Link to="/activity">Activity</Link></li>
                    <li><Link to="/meditation">Meditation</Link></li>
                    <li><Link to="/sleep">Sleep</Link></li>
                    <li><Link to="/exercises">Exercises</Link></li>
                    <li><Link to="/period">Period Cycle</Link></li>
                    <li><Link to="/nutrition">Nutrition</Link></li>
                    <li><Link to="/game">Game</Link></li>
                  </ul>
                </nav>
              )}
              
              <div className="theme-user-container">
                <button 
                  className="theme-toggle" 
                  onClick={toggleDarkMode} 
                  aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
                >
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    width="24" 
                    height="24" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  >
                    {darkMode ? (
                      // Sun icon for dark mode (clicking switches to light)
                      <g>
                        <circle cx="12" cy="12" r="5"></circle>
                        <line x1="12" y1="1" x2="12" y2="3"></line>
                        <line x1="12" y1="21" x2="12" y2="23"></line>
                        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                        <line x1="1" y1="12" x2="3" y2="12"></line>
                        <line x1="21" y1="12" x2="23" y2="12"></line>
                        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
                      </g>
                    ) : (
                      // Moon icon for light mode (clicking switches to dark)
                      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                    )}
                  </svg>
                </button>
                
                {user && (
                  <div className="user-info">
                    <span className="user-greeting">Hello, {user.name}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>
        
        <main className="main">
          <Routes>
            {/* Landing page route that shows only on first visit */}
            <Route path="/" element={
              showLanding 
                ? <LandingPage onComplete={() => setShowLanding(false)} /> 
                : (!user ? <Welcome /> : <Navigate to="/dashboard" />)
            } />
            <Route path="/welcome" element={!user ? <Welcome /> : <Navigate to="/dashboard" />} />
            <Route path="/register" element={!user ? <UserForm onUserSubmit={handleUserSubmit} /> : <Navigate to="/dashboard" />} />
            <Route path="/dashboard" element={user ? <Dashboard user={user} /> : <Navigate to="/" />} />
            <Route path="/activity" element={user ? <ActivityTracker user={user} /> : <Navigate to="/" />} />
            <Route path="/meditation" element={user ? <MeditationGuide user={user} /> : <Navigate to="/" />} />
            <Route path="/sleep" element={user ? <SleepTracker user={user} /> : <Navigate to="/" />} />
            <Route path="/exercises" element={user ? <ExerciseVideos user={user} /> : <Navigate to="/" />} />
            <Route path="/period" element={user ? <PeriodTrackerCalendar user={user}/> : <Navigate to="/" />} />
            <Route path="/game" element={user ? < HealthAdventureGame user={user}/> : <Navigate to="/" />} />
            <Route path="/nutrition" element={user ? < NutritionPlan user={user}/> : <Navigate to="/" />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        
        <footer className="footer">
          <div className="container">
            <p>&copy; {new Date().getFullYear()} VitalTrack - Your Health & Wellness Companion</p>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;