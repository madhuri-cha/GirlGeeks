// components/SleepTracker.jsx
import React, { useState, useEffect } from 'react';

const SleepTracker = () => {
  const [sleepData, setSleepData] = useState([
    { date: '2025-04-04', hours: 7.2 },
    { date: '2025-04-03', hours: 6.8 },
    { date: '2025-04-02', hours: 8.1 },
    { date: '2025-04-01', hours: 7.5 },
    { date: '2025-03-31', hours: 6.5 },
    { date: '2025-03-30', hours: 7.0 },
    { date: '2025-03-29', hours: 8.3 }
  ]);
  
  const [newSleepEntry, setNewSleepEntry] = useState({
    hours: 7.5,
    quality: 'good'
  });
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewSleepEntry(prev => ({
      ...prev,
      [name]: name === 'hours' ? parseFloat(value) : value
    }));
  };
  
  const addSleepEntry = () => {
    const today = new Date().toISOString().split('T')[0];
    
    // Check if today's entry already exists
    const existingEntry = sleepData.find(entry => entry.date === today);
    
    if (existingEntry) {
      setSleepData(sleepData.map(entry => 
        entry.date === today ? { ...entry, hours: newSleepEntry.hours } : entry
      ));
    } else {
      setSleepData([
        { date: today, hours: newSleepEntry.hours, quality: newSleepEntry.quality },
        ...sleepData
      ]);
    }
  };
  
  const calculateAverageSleep = () => {
    if (sleepData.length === 0) return 0;
    const sum = sleepData.reduce((total, entry) => total + entry.hours, 0);
    return (sum / sleepData.length).toFixed(1);
  };
  
  return (
    <div className="container fade-in">
      <h1>Sleep Tracker</h1>
      <p>Track your sleep patterns to ensure you're getting enough rest for optimal health.</p>
      
      <div className="sleep-container">
        <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
          <div style={{ flex: '1', minWidth: '300px' }}>
            <h3>Log Your Sleep</h3>
            
            <div className="form-group">
              <label className="form-label">Hours Slept</label>
              <input
                type="range"
                min="0"
                max="12"
                step="0.5"
                name="hours"
                value={newSleepEntry.hours}
                onChange={handleInputChange}
                className="form-input"
              />
              <span>{newSleepEntry.hours} hours</span>
            </div>
            
            <div className="form-group">
              <label className="form-label">Sleep Quality</label>
              <select
                name="quality"
                value={newSleepEntry.quality}
                onChange={handleInputChange}
                className="form-input"
              >
                <option value="poor">Poor</option>
                <option value="fair">Fair</option>
                <option value="good">Good</option>
                <option value="excellent">Excellent</option>
              </select>
            </div>
            
            <button className="btn btn-primary" onClick={addSleepEntry}>
              Save Sleep Data
            </button>
          </div>
          
          <div style={{ flex: '1', minWidth: '300px' }}>
            <h3>Sleep Stats</h3>
            <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', marginTop: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                <div>
                  <h4>Average Sleep</h4>
                  <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--primary)' }}>
                    {calculateAverageSleep()}
                    <span style={{ fontSize: '1rem' }}> hours</span>
                  </div>
                </div>
                <div>
                  <h4>Recommended</h4>
                  <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--gray)' }}>
                    8
                    <span style={{ fontSize: '1rem' }}> hours</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h4>Sleep Quality</h4>
                <div style={{ marginTop: '10px', display: 'flex', gap: '10px' }}>
                  {['poor', 'fair', 'good', 'excellent'].map(quality => {
                    const count = sleepData.filter(entry => entry.quality === quality).length;
                    const percentage = sleepData.length > 0 ? Math.round((count / sleepData.length) * 100) : 0;
                    
                    return (
                      <div key={quality} style={{ textAlign: 'center', flex: '1' }}>
                        <div style={{
                          height: '80px',
                          display: 'flex',
                          alignItems: 'flex-end',
                          justifyContent: 'center'
                        }}>
                          <div style={{
                            width: '40px',
                            height: `${percentage}%`,
                            backgroundColor: 
                              quality === 'poor' ? 'var(--danger)' :
                              quality === 'fair' ? 'var(--warning)' :
                              quality === 'good' ? 'var(--primary)' : 'var(--success)',
                            borderRadius: '4px 4px 0 0'
                          }}></div>
                        </div>
                        <div style={{
                          marginTop: '5px',
                          fontSize: '0.8rem',
                          textTransform: 'capitalize'
                        }}>{quality}</div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div style={{ marginTop: '40px' }}>
          <h3>Sleep History</h3>
          <div className="sleep-chart">
            {sleepData.slice(0, 7).map((entry, index) => {
              const day = new Date(entry.date).toLocaleDateString('en-US', { weekday: 'short' });
              const height = (entry.hours / 12) * 100;
              
              return (
                <div key={index} className="sleep-bar" style={{ height: `${height}%` }}>
                  <span className="sleep-bar-label">{day}</span>
                  <div style={{ 
                    position: 'absolute', 
                    bottom: '-25px', 
                    left: '0', 
                    right: '0', 
                    textAlign: 'center',
                    fontSize: '0.8rem'
                  }}>
                    {entry.hours}h
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SleepTracker;