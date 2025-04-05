import React, { useState, useEffect } from 'react';
import './PeriodTracker.css';

const PeriodTracker = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [periodHistory, setPeriodHistory] = useState([]);
  const [viewMode, setViewMode] = useState('calendar'); // 'calendar' or 'history'
  
  // Calculate period dates for a given start date
  const calculatePeriodDates = (startDateString) => {
    if (!startDateString) return [];
    
    const dates = [];
    const startDate = new Date(startDateString);
    
    for (let i = 0; i < 5; i++) {
      const date = new Date(startDate);
      date.setDate(date.getDate() + i);
      dates.push(date.toISOString().split('T')[0]);
    }
    
    return dates;
  };
  
  // Function to add a new period to history
  const addPeriodToHistory = (startDateString) => {
    const startDate = new Date(startDateString);
    const endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + 4);
    
    const month = startDate.toLocaleString('default', { month: 'long' });
    const year = startDate.getFullYear();
    
    // Check if we're trying to add a duplicate period
    const isDuplicate = periodHistory.some(period => 
      period.startDate === startDateString
    );
    
    if (!isDuplicate) {
      const newPeriod = {
        id: Date.now(), // Unique identifier
        startDate: startDateString,
        endDate: endDate.toISOString().split('T')[0],
        month,
        year
      };
      
      setPeriodHistory(prevHistory => [...prevHistory, newPeriod]);
    }
  };
  
  // Update period history when selected date changes
  useEffect(() => {
    if (selectedDate) {
      addPeriodToHistory(selectedDate);
    }
  }, [selectedDate]);
  
  // Get all period dates from history for the current month view
  const getCurrentMonthPeriodDates = () => {
    const allPeriodDates = [];
    
    periodHistory.forEach(period => {
      const periodDates = calculatePeriodDates(period.startDate);
      allPeriodDates.push(...periodDates);
    });
    
    return allPeriodDates;
  };
  
  // Get days in month
  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };
  
  // Get day of week for first day of month (0 = Sunday)
  const getFirstDayOfMonth = (year, month) => {
    return new Date(year, month, 1).getDay();
  };
  
  // Check if date is today
  const isToday = (year, month, day) => {
    const today = new Date();
    return day === today.getDate() && 
           month === today.getMonth() && 
           year === today.getFullYear();
  };
  
  const renderCalendar = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const daysInMonth = getDaysInMonth(year, month);
    const firstDayOfMonth = getFirstDayOfMonth(year, month);
    
    // Get all period dates
    const allPeriodDates = getCurrentMonthPeriodDates();
    
    // Create calendar grid
    const totalCells = Math.ceil((daysInMonth + firstDayOfMonth) / 7) * 7;
    const calendarRows = [];
    let calendarCells = [];
    
    // Create cells for each position in the calendar
    for (let i = 0; i < totalCells; i++) {
      const dayOfMonth = i - firstDayOfMonth + 1;
      
      if (dayOfMonth > 0 && dayOfMonth <= daysInMonth) {
        // This is a valid day in the current month
        const date = new Date(year, month, dayOfMonth);
        const dateString = date.toISOString().split('T')[0];
        const isPeriodDay = allPeriodDates.includes(dateString);
        const isPeriodStartDay = periodHistory.some(period => period.startDate === dateString);
        const isTodayDay = isToday(year, month, dayOfMonth);
        
        let cellClasses = "calendar-day";
        if (isPeriodDay) cellClasses += " period-day";
        if (isPeriodStartDay) cellClasses += " selected-day";
        if (isTodayDay) cellClasses += " today";
        
        calendarCells.push(
          <td key={i} className="calendar-cell">
            <div 
              onClick={() => handleDateClick(dateString)}
              className={cellClasses}
            >
              <span>{dayOfMonth}</span>
            </div>
          </td>
        );
      } else {
        // This is a placeholder cell (before or after the current month)
        calendarCells.push(<td key={i} className="calendar-cell empty-cell"></td>);
      }
      
      // Start a new row after every 7 cells
      if ((i + 1) % 7 === 0) {
        calendarRows.push(<tr key={i / 7}>{calendarCells}</tr>);
        calendarCells = [];
      }
    }
    
    return calendarRows;
  };
  
  const handleDateClick = (dateString) => {
    setSelectedDate(dateString);
  };
  
  const changeMonth = (increment) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() + increment);
    setCurrentDate(newDate);
  };
  
  const removePeriod = (id) => {
    setPeriodHistory(prevHistory => 
      prevHistory.filter(period => period.id !== id)
    );
  };
  
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { weekday: 'short', month: 'short', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  };
  
  // Group periods by month and year
  const groupedPeriods = () => {
    const grouped = {};
    
    periodHistory.forEach(period => {
      const key = `${period.month} ${period.year}`;
      if (!grouped[key]) {
        grouped[key] = [];
      }
      grouped[key].push(period);
    });
    
    return grouped;
  };
  
  // Calculate next predicted period
  const getNextPredictedPeriod = () => {
    if (periodHistory.length < 1) return null;
    
    // Get the most recent period
    const sortedHistory = [...periodHistory].sort((a, b) => 
      new Date(b.startDate) - new Date(a.startDate)
    );
    
    const lastPeriod = sortedHistory[0];
    const lastStartDate = new Date(lastPeriod.startDate);
    
    // Predict next period (assuming 28-day cycle)
    const nextPredictedDate = new Date(lastStartDate);
    nextPredictedDate.setDate(nextPredictedDate.getDate() + 28);
    
    return {
      date: nextPredictedDate,
      formatted: formatDate(nextPredictedDate)
    };
  };
  
  // Calculate average cycle length
  const getAverageCycle = () => {
    if (periodHistory.length < 2) return 'Not enough data';
    
    const sortedHistory = [...periodHistory].sort((a, b) => 
      new Date(a.startDate) - new Date(b.startDate)
    );
    
    let totalDays = 0;
    let cycles = 0;
    
    for (let i = 0; i < sortedHistory.length - 1; i++) {
      const currentStart = new Date(sortedHistory[i].startDate);
      const nextStart = new Date(sortedHistory[i + 1].startDate);
      const diffTime = Math.abs(nextStart - currentStart);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      totalDays += diffDays;
      cycles++;
    }
    
    return cycles > 0 
      ? `${Math.round(totalDays / cycles)} days` 
      : 'Not enough data';
  };
  
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  
  return (
    <div className="period-tracker-calendar">
      {/* Navigation tabs */}
      <div className="tab-navigation">
        <button 
          className={`tab-button ${viewMode === 'calendar' ? 'active' : ''}`}
          onClick={() => setViewMode('calendar')}
        >
          Calendar
        </button>
        <button 
          className={`tab-button ${viewMode === 'history' ? 'active' : ''}`}
          onClick={() => setViewMode('history')}
        >
          History
        </button>
      </div>
      
      {viewMode === 'calendar' ? (
        <>
          {/* Header with gradient background */}
          <div className="calendar-header">
            <div className="header-content">
              <button 
                onClick={() => changeMonth(-1)}
                className="nav-button"
              >
                <span className="sr-only">Previous month</span>
                &larr;
              </button>
              <h2 className="month-title">{monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}</h2>
              <button 
                onClick={() => changeMonth(1)}
                className="nav-button"
              >
                <span className="sr-only">Next month</span>
                &rarr;
              </button>
            </div>
          </div>
          
          {/* Calendar */}
          <div className="calendar-body">
            <table className="calendar-table">
              <thead>
                <tr>
                  {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(day => (
                    <th key={day} className="weekday-header">
                      {day}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {renderCalendar()}
              </tbody>
            </table>
            
            {/* Legend */}
            <div className="calendar-legend">
              <div className="legend-item">
                <div className="legend-indicator period-indicator"></div>
                <span className="legend-text">Period days</span>
              </div>
              <div className="legend-item">
                <div className="legend-indicator selected-indicator"></div>
                <span className="legend-text">Start date</span>
              </div>
            </div>
            
            {/* Predictions */}
            {periodHistory.length > 0 && (
              <div className="predictions-section">
                <h3 className="section-title">Predictions</h3>
                <div className="info-card full-width">
                  <p className="info-label">Next Period</p>
                  <p className="info-value">{
                    getNextPredictedPeriod() 
                      ? getNextPredictedPeriod().formatted 
                      : 'Not enough data'
                  }</p>
                </div>
                <div className="info-card full-width">
                  <p className="info-label">Average Cycle Length</p>
                  <p className="info-value">{getAverageCycle()}</p>
                </div>
              </div>
            )}
          </div>
        </>
      ) : (
        // History view
        <div className="history-view">
          <h2 className="history-title">Period History</h2>
          
          {periodHistory.length === 0 ? (
            <div className="empty-history">
              <p>No period data recorded yet. Mark your period start date on the calendar.</p>
            </div>
          ) : (
            <div className="history-list">
              {Object.entries(groupedPeriods()).map(([monthYear, periods]) => (
                <div key={monthYear} className="history-month">
                  <h3 className="month-year-title">{monthYear}</h3>
                  {periods.map(period => (
                    <div key={period.id} className="history-item">
                      <div className="history-dates">
                        <p className="history-date-label">Start: <span className="history-date-value">{formatDate(period.startDate)}</span></p>
                        <p className="history-date-label">End: <span className="history-date-value">{formatDate(period.endDate)}</span></p>
                      </div>
                      <button 
                        className="remove-button"
                        onClick={() => removePeriod(period.id)}
                      >
                        &times;
                      </button>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PeriodTracker;