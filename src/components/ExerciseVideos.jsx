import React, { useState } from 'react';

const ExerciseVideos = () => {
  const [level, setLevel] = useState('beginner');
  
  // Mock video data with YouTube video IDs
  const videoData = {
    beginner: [
      { id: 1, title: 'Gentle Yoga for Beginners', duration: '15 minutes', thumbnail: 'yoga-beginner', youtubeId: 'C2RAjUEAoLI' },
      { id: 2, title: 'Walking Cardio for Seniors', duration: '20 minutes', thumbnail: 'walking-cardio', youtubeId: 'LYJ3U0Fs4dg' },
      { id: 3, title: 'Simple Stretching Routine', duration: '10 minutes', thumbnail: 'stretching', youtubeId: 'Ef6LwAaB3_E' },
      { id: 4, title: 'Chair Exercises for Everyone', duration: '15 minutes', thumbnail: 'chair-exercise', youtubeId: 'azv8eJgoGLk' },
      { id: 5, title: 'Basic Strength Training', duration: '25 minutes', thumbnail: 'basic-strength', youtubeId: 'IODxDxX7oi4' },
      { id: 6, title: 'Easy Home Workout (No Equipment)', duration: '20 minutes', thumbnail: 'home-workout', youtubeId: 'UItWltVZZmE' }
    ],
    intermediate: [
      { id: 7, title: 'Intermediate HIIT Workout', duration: '30 minutes', thumbnail: 'hiit', youtubeId: 'ml6cT4AZdqI' },
      { id: 8, title: 'Full Body Resistance Band Workout', duration: '25 minutes', thumbnail: 'resistance-band', youtubeId: '18hPypKsQ8w' },
      { id: 9, title: 'Pilates for Core Strength', duration: '35 minutes', thumbnail: 'pilates', youtubeId: 'Zma_7kh-FGA' },
      { id: 10, title: '5K Running Training', duration: '40 minutes', thumbnail: 'running', youtubeId: 'cESEp8n-BtE' },
      { id: 11, title: 'Intermediate Yoga Flow', duration: '30 minutes', thumbnail: 'yoga-intermediate', youtubeId: 'VpW33Celubg' },
      { id: 12, title: 'Bodyweight Circuit Training', duration: '35 minutes', thumbnail: 'bodyweight', youtubeId: 'yN8tKZobL8c' }
    ],
    expert: [
      { id: 13, title: 'Advanced HIIT Challenge', duration: '45 minutes', thumbnail: 'hiit-advanced', youtubeId: 'jpizoUy4K9s' },
      { id: 14, title: 'Power Yoga Flow', duration: '50 minutes', thumbnail: 'power-yoga', youtubeId: 'Eml2xnoLpYE' },
      { id: 15, title: 'Marathon Training Run', duration: '60 minutes', thumbnail: 'marathon', youtubeId: 'aIlWb5MZ9rQ' },
      { id: 16, title: 'Advanced Strength & Conditioning', duration: '55 minutes', thumbnail: 'strength-conditioning', youtubeId: '2M8bTJj-ouY' },
      { id: 17, title: 'Olympic Weightlifting Techniques', duration: '40 minutes', thumbnail: 'weightlifting', youtubeId: 'uFz0I7fyc9g' },
      { id: 18, title: 'CrossFit WOD Challenge', duration: '50 minutes', thumbnail: 'crossfit', youtubeId: 'yVUcHEOr450' }
    ]
  };
  
  // Function to handle watching a video
  const handleWatchVideo = (youtubeId) => {
    // Open YouTube video in a new tab
    window.open(`https://www.youtube.com/watch?v=${youtubeId}`, '_blank');
  };

  // Function to get YouTube thumbnail URL
  const getYouTubeThumbnail = (youtubeId) => {
    return `https://img.youtube.com/vi/${youtubeId}/mqdefault.jpg`;
  };

  return (
    <div className="container fade-in">
      <h1>Exercise Videos</h1>
      <p>Find workout videos tailored to your fitness level.</p>
      
      <div className="exercise-container">
        <div className="level-tabs">
          <div
            className={`level-tab ${level === 'beginner' ? 'active' : ''}`}
            onClick={() => setLevel('beginner')}
          >
            Beginner
          </div>
          <div
            className={`level-tab ${level === 'intermediate' ? 'active' : ''}`}
            onClick={() => setLevel('intermediate')}
          >
            Intermediate
          </div>
          <div
            className={`level-tab ${level === 'expert' ? 'active' : ''}`}
            onClick={() => setLevel('expert')}
          >
            Expert
          </div>
        </div>
        
        <div className="video-grid">
          {videoData[level].map(video => (
            <div key={video.id} className="video-card">
              <div 
                className="video-thumbnail"
                style={{ cursor: 'pointer' }}
                onClick={() => handleWatchVideo(video.youtubeId)}
              >
                <img
                  src={getYouTubeThumbnail(video.youtubeId)}
                  alt={video.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = '/api/placeholder/320/180';
                  }}
                />
                <div className="play-overlay">
                  <span className="play-icon">▶</span>
                </div>
              </div>
              <div className="video-info">
                <h3 className="video-title">{video.title}</h3>
                <p className="video-duration">{video.duration}</p>
                <button 
                  className="btn btn-primary" 
                  style={{ width: '100%', marginTop: '10px' }}
                  onClick={() => handleWatchVideo(video.youtubeId)}
                >
                  Watch Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add CSS for the play button overlay */}
      <style jsx>{`
        .video-thumbnail {
          position: relative;
          overflow: hidden;
          border-radius: 8px;
          margin-bottom: 10px;
        }
        
        .play-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(0, 0, 0, 0.2);
          display: flex;
          justify-content: center;
          align-items: center;
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        
        .video-thumbnail:hover .play-overlay {
          opacity: 1;
        }
        
        .play-icon {
          color: white;
          font-size: 48px;
          background-color: rgba(0, 0, 0, 0.5);
          border-radius: 50%;
          width: 60px;
          height: 60px;
          display: flex;
          justify-content: center;
          align-items: center;
        }
      `}</style>
    </div>
  );
};

export default ExerciseVideos;