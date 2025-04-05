// components/LandingPage.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const LandingPage = ({ onComplete }) => {
  const navigate = useNavigate();
  const [fadeOut, setFadeOut] = useState(false);
  
  // Array of inspiring health and wellness quotes
  const quotes = [
    {
      text: "The greatest wealth is health.",
      author: "Virgil"
    },
    {
      text: "Take care of your body. It's the only place you have to live.",
      author: "Jim Rohn"
    },
    {
      text: "Health is not about the weight you lose, but about the life you gain.",
      author: "Anonymous"
    },
    {
      text: "Wellness is the complete integration of body, mind, and spirit.",
      author: "Greg Anderson"
    },
    {
      text: "Your body hears everything your mind says. Stay positive.",
      author: "Anonymous"
    },
    {
      text: "The first wealth is health.",
      author: "Ralph Waldo Emerson"
    },
    {
      text: "Physical fitness is not only one of the most important keys to a healthy body, it is the basis of dynamic and creative intellectual activity.",
      author: "John F. Kennedy"
    }
  ];
  
  // Select a random quote
  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
  
  useEffect(() => {
    // Start fade out after 2.5 seconds
    const fadeTimeout = setTimeout(() => {
      setFadeOut(true);
    }, 2500);
    
    // Navigate to home after 3 seconds
    const navigateTimeout = setTimeout(() => {
      onComplete(); // Let App know we're done with the landing page
      navigate('/welcome');
    }, 3000);
    
    // Clean up the timeouts if component unmounts
    return () => {
      clearTimeout(fadeTimeout);
      clearTimeout(navigateTimeout);
    };
  }, [navigate, onComplete]);
  
  return (
    <div className={`landing-page ${fadeOut ? 'fade-out' : 'fade-in'}`}>
      <div className="quote-container">
        <div className="quote-mark">"</div>
        <h1 className="quote-text">{randomQuote.text}</h1>
        <p className="quote-author">— {randomQuote.author}</p>
        <div className="pulse-circle"></div>
      </div>
      
      <style jsx>{`
        .landing-page {
          height: 100vh;
          width: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          background: linear-gradient(135deg, #43cea2 0%,rgb(54, 142, 73) 100%);
          color: white;
          position: fixed;
          top: 0;
          left: 0;
          z-index: 1000;
          transition: opacity 0.5s ease;
        }
        
        .fade-in {
          opacity: 1;
        }
        
        .fade-out {
          opacity: 0;
        }
        
        .quote-container {
          max-width: 800px;
          text-align: center;
          padding: 2rem;
          position: relative;
          animation: float 3s ease-in-out infinite;
        }
        
        .quote-mark {
          font-size: 8rem;
          position: absolute;
          top: -4rem;
          left: 0;
          opacity: 0.2;
          font-family: 'Georgia', serif;
        }
        
        .quote-text {
          font-size: 2.5rem;
          font-weight: 300;
          line-height: 1.4;
          margin-bottom: 1.5rem;
          position: relative;
          z-index: 2;
          text-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
        }
        
        .quote-author {
          font-size: 1.2rem;
          font-style: italic;
          opacity: 0.8;
        }
        
        .pulse-circle {
          position: absolute;
          width: 300px;
          height: 300px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.1);
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          z-index: 1;
          animation: pulse 2s infinite ease-in-out;
        }
        
        @keyframes pulse {
          0% {
            transform: translate(-50%, -50%) scale(0.8);
            opacity: 0.7;
          }
          50% {
            transform: translate(-50%, -50%) scale(1);
            opacity: 0.3;
          }
          100% {
            transform: translate(-50%, -50%) scale(0.8);
            opacity: 0.7;
          }
        }
        
        @keyframes float {
          0% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
          100% {
            transform: translateY(0px);
          }
        }
        
        @media (max-width: 768px) {
          .quote-text {
            font-size: 1.8rem;
          }
          
          .quote-mark {
            font-size: 6rem;
            top: -3rem;
          }
        }
      `}</style>
    </div>
  );
};

export default LandingPage;