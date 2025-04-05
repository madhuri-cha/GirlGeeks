// components/ActivityTracker.jsx (continued)
import React, { useState, useEffect } from 'react';

const ActivityTracker = ({ user }) => {
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [duration, setDuration] = useState(30);
  const [distance, setDistance] = useState(2);
  const [activities, setActivities] = useState([]);
  
  const handleActivitySelect = (activity) => {
    setSelectedActivity(activity);
  };
  
  const handleAddActivity = () => {
    if (!selectedActivity) return;
    
    const newActivity = {
      id: Date.now(),
      type: selectedActivity,
      duration: duration,
      distance: distance,
      date: new Date().toLocaleDateString(),
      calories: calculateCalories(selectedActivity, duration, distance)
    };
    
    setActivities([newActivity, ...activities]);
    setSelectedActivity(null);
  };
  
  const calculateCalories = (activity, duration, distance) => {
    // Basic calorie calculation (simplified)
    const MET = {
      walking: 3.5,
      running: 8.0,
      cycling: 5.5,
      swimming: 6.0,
      hiking: 5.3
    };
    
    const weight = user?.weight || 70; // Default weight if not provided
    return Math.round(MET[activity] * weight * (duration / 60));
  };
  
  // Mock geolocation data for demo purposes
  useEffect(() => {
    if (selectedActivity) {
      const interval = setInterval(() => {
        setDistance(prev => {
          const increment = Math.random() * 0.1;
          return parseFloat((prev + increment).toFixed(2));
        });
      }, 5000);
      
      return () => clearInterval(interval);
    }
  }, [selectedActivity]);
  
  return (
    <div className="container fade-in">
      <h1>Activity Tracker</h1>
      <p>Choose an activity and track your progress in real-time.</p>
      
      <div className="activity-container">
        <div className="activity-types">
          <div 
            className={`activity-type ${selectedActivity === 'walking' ? 'active' : ''}`}
            onClick={() => handleActivitySelect('walking')}
          >
            <div className="activity-icon">🚶</div>
            <span>Walking</span>
          </div>
          
          <div 
            className={`activity-type ${selectedActivity === 'running' ? 'active' : ''}`}
            onClick={() => handleActivitySelect('running')}
          >
            <div className="activity-icon">🏃</div>
            <span>Running</span>
          </div>
          
          <div 
            className={`activity-type ${selectedActivity === 'cycling' ? 'active' : ''}`}
            onClick={() => handleActivitySelect('cycling')}
          >
            <div className="activity-icon">🚴</div>
            <span>Cycling</span>
          </div>
          
          <div 
            className={`activity-type ${selectedActivity === 'swimming' ? 'active' : ''}`}
            onClick={() => handleActivitySelect('swimming')}
          >
            <div className="activity-icon">🏊</div>
            <span>Swimming</span>
          </div>
          
          <div 
            className={`activity-type ${selectedActivity === 'hiking' ? 'active' : ''}`}
            onClick={() => handleActivitySelect('hiking')}
          >
            <div className="activity-icon">🥾</div>
            <span>Hiking</span>
          </div>
        </div>
        
        {selectedActivity && (
          <div className="activity-tracker-panel">
            <h3>Track your {selectedActivity}</h3>
            
            <div className="form-group">
              <label className="form-label">Duration (minutes)</label>
              <input 
                type="range" 
                min="5" 
                max="180" 
                value={duration} 
                onChange={(e) => setDuration(parseInt(e.target.value))}
                className="form-input range"
              />
              <span>{duration} minutes</span>
            </div>
            
            <div className="form-group">
              <label className="form-label">Distance (km)</label>
              <input 
                type="number" 
                min="0.1" 
                step="0.1" 
                value={distance} 
                onChange={(e) => setDistance(parseFloat(e.target.value))}
                className="form-input"
              />
            </div>
            
            <div className="location-tracking">
              <p>
                <strong>Current location data:</strong> Location tracking enabled
              </p>
              <p>
                <strong>Estimated calories:</strong> {calculateCalories(selectedActivity, duration, distance)}
              </p>
            </div>
            
            <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
              <button className="btn btn-primary" onClick={handleAddActivity}>
                Save Activity
              </button>
              <button className="btn btn-outline" onClick={() => setSelectedActivity(null)}>
                Cancel
              </button>
            </div>
          </div>
        )}
        
        {activities.length > 0 && (
          <div className="activity-history">
            <h3>Recent Activities</h3>
            <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
              <thead>
                <tr>
                  <th style={{ textAlign: 'left', padding: '10px', borderBottom: '1px solid var(--light-gray)' }}>Activity</th>
                  <th style={{ textAlign: 'left', padding: '10px', borderBottom: '1px solid var(--light-gray)' }}>Date</th>
                  <th style={{ textAlign: 'left', padding: '10px', borderBottom: '1px solid var(--light-gray)' }}>Duration</th>
                  <th style={{ textAlign: 'left', padding: '10px', borderBottom: '1px solid var(--light-gray)' }}>Distance</th>
                  <th style={{ textAlign: 'left', padding: '10px', borderBottom: '1px solid var(--light-gray)' }}>Calories</th>
                </tr>
              </thead>
              <tbody>
                {activities.map(activity => (
                  <tr key={activity.id}>
                    <td style={{ padding: '10px', borderBottom: '1px solid var(--light-gray)' }}>
                      {activity.type === 'walking' && '🚶 Walking'}
                      {activity.type === 'running' && '🏃 Running'}
                      {activity.type === 'cycling' && '🚴 Cycling'}
                      {activity.type === 'swimming' && '🏊 Swimming'}
                      {activity.type === 'hiking' && '🥾 Hiking'}
                    </td>
                    <td style={{ padding: '10px', borderBottom: '1px solid var(--light-gray)' }}>{activity.date}</td>
                    <td style={{ padding: '10px', borderBottom: '1px solid var(--light-gray)' }}>{activity.duration} min</td>
                    <td style={{ padding: '10px', borderBottom: '1px solid var(--light-gray)' }}>{activity.distance} km</td>
                    <td style={{ padding: '10px', borderBottom: '1px solid var(--light-gray)' }}>{activity.calories} cal</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default ActivityTracker;