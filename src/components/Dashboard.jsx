// components/Dashboard.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Dashboard = ({ user }) => {
  const [stats, setStats] = useState({
    steps: 0,
    calories: 0,
    water: 0,
    sleep: 0,
    meditation: 0
  });

  // Simulate data loading
  useEffect(() => {
    // In a real app, this would be loading from an API or local storage
    setTimeout(() => {
      setStats({
        steps: 6843,
        calories: 1240,
        water: 5,
        sleep: 7.2,
        meditation: 15
      });
    }, 1000);
  }, []);

  // Calculate BMI
  const calculateBMI = () => {
    if (!user.height || !user.weight) return 'N/A';
    const heightInMeters = user.height / 100;
    const bmi = (user.weight / (heightInMeters * heightInMeters)).toFixed(1);
    return bmi;
  };

  return (
    <div className="container fade-in">
      <h1>Your Health Dashboard</h1>
      <p>Welcome back, {user.name}! Here's your health summary for today.</p>
      
      <div className="dashboard">
        <div className="stats-card">
          <div className="stats-header">
            <h3>Daily Steps</h3>
            <span className="stats-icon">👣</span>
          </div>
          <div className="stats-value">{stats.steps.toLocaleString()}</div>
          <div className="stats-label">Goal: 10,000 steps</div>
          <div className="progress-circle" style={{ "--progress": `${stats.steps / 100}%` }}>
            <div className="progress-circle-fill">{Math.round(stats.steps / 100)}%</div>
          </div>
          <Link to="/activity" className="btn btn-outline" style={{ width: '100%', marginTop: '20px' }}>
            Track Activity
          </Link>
        </div>
        
        <div className="stats-card">
          <div className="stats-header">
            <h3>Calories Burned</h3>
            <span className="stats-icon">🔥</span>
          </div>
          <div className="stats-value">{stats.calories}</div>
          <div className="stats-label">Goal: 2,000 calories</div>
          <div className="progress-circle" style={{ "--progress": `${(stats.calories / 2000) * 100}%` }}>
            <div className="progress-circle-fill">{Math.round((stats.calories / 2000) * 100)}%</div>
          </div>
        </div>
        
        <div className="stats-card">
          <div className="stats-header">
            <h3>Water Intake</h3>
            <span className="stats-icon">💧</span>
          </div>
          <div className="stats-value">{stats.water} <span style={{ fontSize: '1rem' }}>glasses</span></div>
          <div className="stats-label">Goal: 8 glasses</div>
          <div className="progress-circle" style={{ "--progress": `${(stats.water / 8) * 100}%` }}>
            <div className="progress-circle-fill">{Math.round((stats.water / 8) * 100)}%</div>
          </div>
          <button className="btn btn-outline" style={{ width: '100%', marginTop: '20px' }}
            onClick={() => setStats(prev => ({ ...prev, water: Math.min(prev.water + 1, 8) }))}>
            Add Glass
          </button>
        </div>
        
        <div className="stats-card">
          <div className="stats-header">
            <h3>Sleep</h3>
            <span className="stats-icon">💤</span>
          </div>
          <div className="stats-value">{stats.sleep} <span style={{ fontSize: '1rem' }}>hours</span></div>
          <div className="stats-label">Goal: 8 hours</div>
          <Link to="/sleep" className="btn btn-outline" style={{ width: '100%', marginTop: '20px' }}>
            Track Sleep
          </Link>
        </div>
        
        <div className="stats-card">
          <div className="stats-header">
            <h3>Meditation</h3>
            <span className="stats-icon">🧘</span>
          </div>
          <div className="stats-value">{stats.meditation} <span style={{ fontSize: '1rem' }}>min</span></div>
          <div className="stats-label">Goal: 20 minutes</div>
          <Link to="/meditation" className="btn btn-outline" style={{ width: '100%', marginTop: '20px' }}>
            Meditate Now
          </Link>
        </div>
        
        <div className="stats-card">
          <div className="stats-header">
            <h3>BMI</h3>
            <span className="stats-icon">📊</span>
          </div>
          <div className="stats-value">{calculateBMI()}</div>
          <div className="stats-label">
            {calculateBMI() !== 'N/A' ? (
              calculateBMI() < 18.5 ? 'Underweight' :
              calculateBMI() < 25 ? 'Normal weight' :
              calculateBMI() < 30 ? 'Overweight' : 'Obese'
            ) : 'Enter height and weight'}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;