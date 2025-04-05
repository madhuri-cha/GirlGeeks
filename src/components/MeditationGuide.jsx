// components/MeditationGuide.jsx
import React, { useState, useEffect } from 'react';

const MeditationGuide = () => {
  const [isActive, setIsActive] = useState(false);
  const [breathState, setBreathState] = useState('ready');
  const [timer, setTimer] = useState(0);
  const [selectedTime, setSelectedTime] = useState(5);
  
  useEffect(() => {
    let interval;
    if (isActive) {
      interval = setInterval(() => {
        setTimer(prevTimer => {
          if (prevTimer >= selectedTime * 60) {
            setIsActive(false);
            return 0;
          }
          return prevTimer + 1;
        });
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, selectedTime]);
  
  useEffect(() => {
    let breathCycle;
    if (isActive) {
      breathCycle = setInterval(() => {
        setBreathState(prev => {
          if (prev === 'ready' || prev === 'exhale') return 'inhale';
          return 'exhale';
        });
      }, 4000);
    } else {
      setBreathState('ready');
    }
    return () => clearInterval(breathCycle);
  }, [isActive]);
  
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };
  
  const startMeditation = () => {
    setIsActive(true);
    setTimer(0);
  };
  
  const stopMeditation = () => {
    setIsActive(false);
  };
  
  return (
    <div className="container fade-in">
      <h1>Guided Meditation</h1>
      <p>Take a moment to breathe, relax, and center yourself.</p>
      
      <div className="meditation-container">
        <div className="form-group">
          <label className="form-label">Meditation Time (minutes)</label>
          <select 
            className="form-input" 
            value={selectedTime} 
            onChange={(e) => setSelectedTime(parseInt(e.target.value))}
            disabled={isActive}
          >
            <option value="3">3 minutes</option>
            <option value="5">5 minutes</option>
            <option value="10">10 minutes</option>
            <option value="15">15 minutes</option>
            <option value="20">20 minutes</option>
          </select>
        </div>
        
        <div className={`breathing-circle ${breathState}`}>
          {breathState === 'ready' ? 'Ready' : 
           breathState === 'inhale' ? 'Breathe In' : 'Breathe Out'}
        </div>
        
        <p style={{ fontSize: '1.5rem', margin: '20px 0' }}>
          {formatTime(timer)} / {formatTime(selectedTime * 60)}
        </p>
        
        {!isActive ? (
          <button className="btn btn-primary" onClick={startMeditation}>
            Start Meditation
          </button>
        ) : (
          <button className="btn btn-outline" onClick={stopMeditation}>
            End Session
          </button>
        )}
        
        {isActive && (
          <div className="meditation-guidance" style={{ marginTop: '30px' }}>
            <h3>Focus on your breath</h3>
            <p>Follow the circle as it expands and contracts. Breathe in deeply through your nose when it expands, and exhale slowly through your mouth when it contracts.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MeditationGuide;