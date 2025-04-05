import React, { useState, useEffect } from 'react';
import { Heart, Droplet, Apple, Dumbbell, Award, Sun, ArrowRight, Check, X, RefreshCw } from 'lucide-react';
import '../components/HealthGame.css';

const HealthAdventureGame = () => {
  const [gameState, setGameState] = useState('intro'); // intro, playing, results
  const [character, setCharacter] = useState(null);
  const [currentDay, setCurrentDay] = useState(1);
  const [score, setScore] = useState(0);
  const [health, setHealth] = useState(100);
  const [dailyChoices, setDailyChoices] = useState({
    nutrition: null,
    hydration: null,
    exercise: null,
    sleep: null
  });
  const [gameHistory, setGameHistory] = useState([]);
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [showFeedback, setShowFeedback] = useState(false);

  const characters = [
    { id: 'athlete', name: 'Alex the Athlete', img: 'athlete' },
    { id: 'student', name: 'Sam the Student', img: 'student' },
    { id: 'worker', name: 'Taylor the Worker', img: 'worker' }
  ];

  const dailyChallenges = [
    {
      day: 1,
      title: "Starting Your Health Journey",
      scenario: "It's your first day of your health journey. How will you begin?",
      choices: {
        nutrition: [
          { id: 'balanced', text: 'Eat a balanced breakfast with protein, fruits and whole grains', healthImpact: 10, isGood: true },
          { id: 'skip', text: 'Skip breakfast to save time', healthImpact: -5, isGood: false },
          { id: 'processed', text: 'Grab a processed breakfast bar', healthImpact: 0, isGood: false }
        ],
        hydration: [
          { id: 'water', text: 'Carry a reusable water bottle throughout the day', healthImpact: 10, isGood: true },
          { id: 'soda', text: 'Drink soda with meals', healthImpact: -5, isGood: false },
          { id: 'coffee', text: 'Just have coffee', healthImpact: -3, isGood: false }
        ],
        exercise: [
          { id: 'walk', text: 'Take a 30-minute walk', healthImpact: 10, isGood: true },
          { id: 'stretch', text: 'Do a quick 5-minute stretch', healthImpact: 5, isGood: true },
          { id: 'none', text: 'No time for exercise today', healthImpact: -5, isGood: false }
        ],
        sleep: [
          { id: 'early', text: 'Go to bed early for 8 hours of sleep', healthImpact: 10, isGood: true },
          { id: 'late', text: 'Stay up late but still get 6 hours', healthImpact: 0, isGood: false },
          { id: 'very-late', text: 'Stay up very late scrolling on your phone', healthImpact: -10, isGood: false }
        ]
      }
    },
    {
      day: 2,
      title: "Handling Work Stress",
      scenario: "You have a busy day at work/school. How do you maintain your health habits?",
      choices: {
        nutrition: [
          { id: 'meal-prep', text: 'Enjoy your prepared healthy lunch', healthImpact: 10, isGood: true },
          { id: 'fast-food', text: 'Grab fast food during your break', healthImpact: -10, isGood: false },
          { id: 'small-snacks', text: 'Have small healthy snacks throughout the day', healthImpact: 5, isGood: true }
        ],
        hydration: [
          { id: 'regular-sips', text: 'Take regular sips from your water bottle', healthImpact: 10, isGood: true },
          { id: 'energy-drink', text: 'Have an energy drink to stay alert', healthImpact: -5, isGood: false },
          { id: 'forget', text: 'Forget to drink anything until evening', healthImpact: -10, isGood: false }
        ],
        exercise: [
          { id: 'desk-stretches', text: 'Do desk stretches during breaks', healthImpact: 5, isGood: true },
          { id: 'stairs', text: 'Take the stairs instead of elevator', healthImpact: 5, isGood: true },
          { id: 'no-movement', text: 'Sit continuously without breaks', healthImpact: -10, isGood: false }
        ],
        sleep: [
          { id: 'consistent', text: 'Maintain your consistent sleep schedule', healthImpact: 10, isGood: true },
          { id: 'work-late', text: 'Work late and get less sleep', healthImpact: -5, isGood: false },
          { id: 'screen-time', text: 'Extensive screen time before bed', healthImpact: -8, isGood: false }
        ]
      }
    },
    {
      day: 3,
      title: "Weekend Choices",
      scenario: "It's the weekend! How do you balance fun and health?",
      choices: {
        nutrition: [
          { id: 'home-cooked', text: 'Cook a nutritious home-made meal', healthImpact: 10, isGood: true },
          { id: 'restaurant', text: 'Eat out but choose a healthier option', healthImpact: 5, isGood: true },
          { id: 'indulge', text: 'Indulge in unhealthy comfort food all day', healthImpact: -10, isGood: false }
        ],
        hydration: [
          { id: 'herbal-tea', text: 'Enjoy water and herbal tea', healthImpact: 10, isGood: true },
          { id: 'alcohol', text: 'Have several alcoholic drinks', healthImpact: -10, isGood: false },
          { id: 'sugary', text: 'Drink sugary beverages', healthImpact: -5, isGood: false }
        ],
        exercise: [
          { id: 'outdoors', text: 'Do an outdoor activity like hiking', healthImpact: 10, isGood: true },
          { id: 'quick-workout', text: 'Complete a quick home workout', healthImpact: 8, isGood: true },
          { id: 'sedentary', text: 'Spend the day being sedentary', healthImpact: -8, isGood: false }
        ],
        sleep: [
          { id: 'consistent-weekend', text: 'Maintain consistent sleep hours', healthImpact: 10, isGood: true },
          { id: 'sleep-in', text: 'Sleep in but get enough total hours', healthImpact: 5, isGood: true },
          { id: 'all-nighter', text: 'Stay up very late and disrupt your schedule', healthImpact: -10, isGood: false }
        ]
      }
    },
    {
      day: 4,
      title: "Social Pressure",
      scenario: "Your friends invite you to hang out. How do you handle social situations while staying healthy?",
      choices: {
        nutrition: [
          { id: 'suggest-healthy', text: 'Suggest a restaurant with healthy options', healthImpact: 10, isGood: true },
          { id: 'small-portion', text: 'Join them but eat a small portion', healthImpact: 5, isGood: true },
          { id: 'peer-pressure', text: 'Give in to peer pressure and overindulge', healthImpact: -10, isGood: false }
        ],
        hydration: [
          { id: 'alternate', text: 'Alternate between water and other drinks', healthImpact: 5, isGood: true },
          { id: 'water-only', text: 'Stick to water only', healthImpact: 10, isGood: true },
          { id: 'excessive-drinks', text: 'Have excessive sugary or alcoholic drinks', healthImpact: -10, isGood: false }
        ],
        exercise: [
          { id: 'active-socializing', text: 'Suggest an active social activity', healthImpact: 10, isGood: true },
          { id: 'walk-talk', text: 'Go for a walk and talk', healthImpact: 8, isGood: true },
          { id: 'inactive', text: 'Choose an inactive social activity', healthImpact: -5, isGood: false }
        ],
        sleep: [
          { id: 'leave-early', text: 'Leave early to maintain your sleep schedule', healthImpact: 10, isGood: true },
          { id: 'compromise', text: 'Stay out a bit later but still get adequate sleep', healthImpact: 5, isGood: true },
          { id: 'all-night', text: 'Stay out all night', healthImpact: -10, isGood: false }
        ]
      }
    },
    {
      day: 5,
      title: "Health Challenge Day",
      scenario: "Today is the final day of your health challenge! How will you finish strong?",
      choices: {
        nutrition: [
          { id: 'balanced-meals', text: 'Plan balanced meals for the entire day', healthImpact: 10, isGood: true },
          { id: 'healthy-breakfast', text: 'Focus on a healthy breakfast but relax later', healthImpact: 5, isGood: true },
          { id: 'give-up', text: 'Give up and return to unhealthy eating', healthImpact: -10, isGood: false }
        ],
        hydration: [
          { id: 'track-intake', text: 'Track water intake to ensure you get enough', healthImpact: 10, isGood: true },
          { id: 'herbal-water', text: 'Drink herbal teas and fruit-infused water', healthImpact: 8, isGood: true },
          { id: 'forget-hydration', text: 'Forget about hydration', healthImpact: -10, isGood: false }
        ],
        exercise: [
          { id: 'challenge-workout', text: 'Complete a challenging workout', healthImpact: 10, isGood: true },
          { id: 'active-day', text: 'Make the whole day active with multiple movement breaks', healthImpact: 10, isGood: true },
          { id: 'skip-exercise', text: 'Skip exercise completely', healthImpact: -10, isGood: false }
        ],
        sleep: [
          { id: 'perfect-routine', text: 'Follow a perfect sleep routine', healthImpact: 10, isGood: true },
          { id: 'wind-down', text: 'Include a calming wind-down routine', healthImpact: 8, isGood: true },
          { id: 'ignore-sleep', text: 'Ignore sleep health on the last day', healthImpact: -10, isGood: false }
        ]
      }
    }
  ];

  const getCurrentChallenge = () => {
    return dailyChallenges.find(challenge => challenge.day === currentDay);
  };

  const handleCharacterSelect = (selectedCharacter) => {
    setCharacter(selectedCharacter);
    setGameState('playing');
  };

  const handleChoice = (category, choice) => {
    setDailyChoices(prev => ({
      ...prev,
      [category]: choice
    }));

    // Check if all choices for the day have been made
    const updatedChoices = { ...dailyChoices, [category]: choice };
    const allChoicesMade = Object.values(updatedChoices).every(choice => choice !== null);

    if (allChoicesMade) {
      // Calculate health impact and update score
      let dailyHealthImpact = 0;
      let dailyScore = 0;

      Object.values(updatedChoices).forEach(choice => {
        dailyHealthImpact += choice.healthImpact;
        if (choice.isGood) dailyScore += 10;
      });

      // Update health and score
      setHealth(prev => Math.max(0, Math.min(100, prev + dailyHealthImpact)));
      setScore(prev => prev + dailyScore);

      // Add to game history
      setGameHistory(prev => [...prev, {
        day: currentDay,
        choices: { ...updatedChoices },
        healthImpact: dailyHealthImpact,
        score: dailyScore
      }]);

      // Show feedback
      if (dailyHealthImpact > 20) {
        setFeedbackMessage("Excellent choices! Your health is improving significantly!");
      } else if (dailyHealthImpact > 0) {
        setFeedbackMessage("Good job! You're making positive health choices.");
      } else if (dailyHealthImpact === 0) {
        setFeedbackMessage("Your choices today had a neutral effect on your health.");
      } else if (dailyHealthImpact > -20) {
        setFeedbackMessage("Some of your choices weren't the best for your health.");
      } else {
        setFeedbackMessage("Your health took a hit today. Try to make better choices!");
      }

      setShowFeedback(true);
    }
  };

  const handleNextDay = () => {
    if (currentDay >= dailyChallenges.length) {
      setGameState('results');
    } else {
      setCurrentDay(prev => prev + 1);
      setDailyChoices({
        nutrition: null,
        hydration: null,
        exercise: null,
        sleep: null
      });
      setShowFeedback(false);
    }
  };

  const handleRestart = () => {
    setGameState('intro');
    setCharacter(null);
    setCurrentDay(1);
    setScore(0);
    setHealth(100);
    setDailyChoices({
      nutrition: null,
      hydration: null,
      exercise: null,
      sleep: null
    });
    setGameHistory([]);
    setFeedbackMessage('');
    setShowFeedback(false);
  };

  // Character selection screen
  const IntroScreen = () => (
    <div className="flex flex-col items-center justify-center p-6 text-center">
      <h1 className="text-3xl font-bold mb-6">Health & Wellness Adventure</h1>
      <p className="text-lg mb-8">Choose your character to begin your 5-day health journey!</p>
      
      <div className="flex flex-wrap justify-center gap-6">
        {characters.map(char => (
          <div 
            key={char.id}
            className="bg-white p-6 rounded-lg shadow-md cursor-pointer transition-transform hover:scale-105 w-64 flex flex-col items-center"
            onClick={() => handleCharacterSelect(char)}
          >
            <div className="h-32 w-32 rounded-full bg-blue-100 flex items-center justify-center mb-4">
              {char.id === 'athlete' && <Dumbbell size={48} className="text-blue-500" />}
              {char.id === 'student' && <Sun size={48} className="text-yellow-500" />}
              {char.id === 'worker' && <Award size={48} className="text-purple-500" />}
            </div>
            <h3 className="text-xl font-semibold mb-2">{char.name}</h3>
            <p className="text-gray-600 text-sm">
              {char.id === 'athlete' && "Focused on fitness and performance."}
              {char.id === 'student' && "Balancing studies and healthy habits."}
              {char.id === 'worker' && "Managing work-life balance and wellness."}
            </p>
          </div>
        ))}
      </div>
    </div>
  );

  // Game play screen
  const GameScreen = () => {
    const challenge = getCurrentChallenge();
    
    return (
      <div className="p-6">
        {/* Game header */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center">
            <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center mr-3">
              {character.id === 'athlete' && <Dumbbell className="text-blue-500" />}
              {character.id === 'student' && <Sun className="text-yellow-500" />}
              {character.id === 'worker' && <Award className="text-purple-500" />}
            </div>
            <div>
              <h3 className="font-semibold">{character.name}</h3>
              <p className="text-sm text-gray-600">Day {currentDay} of 5</p>
            </div>
          </div>
          
          <div className="flex gap-6">
            <div className="flex items-center">
              <Heart className="text-red-500 mr-2" />
              <span className="font-semibold">{health}%</span>
            </div>
            <div className="flex items-center">
              <Award className="text-yellow-500 mr-2" />
              <span className="font-semibold">{score} pts</span>
            </div>
          </div>
        </div>
        
        {/* Day challenge */}
        {showFeedback ? (
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-2xl font-bold mb-4">Day {currentDay} Results</h2>
            <p className="text-lg mb-6">{feedbackMessage}</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {Object.entries(dailyChoices).map(([category, choice]) => (
                <div key={category} className="flex items-start">
                  <div className={`rounded-full p-2 mr-3 ${choice.isGood ? 'bg-green-100' : 'bg-red-100'}`}>
                    {category === 'nutrition' && <Apple className={choice.isGood ? 'text-green-500' : 'text-red-500'} />}
                    {category === 'hydration' && <Droplet className={choice.isGood ? 'text-green-500' : 'text-red-500'} />}
                    {category === 'exercise' && <Dumbbell className={choice.isGood ? 'text-green-500' : 'text-red-500'} />}
                    {category === 'sleep' && <Sun className={choice.isGood ? 'text-green-500' : 'text-red-500'} />}
                  </div>
                  <div>
                    <h4 className="font-semibold capitalize">{category}</h4>
                    <p className="text-sm text-gray-600">{choice.text}</p>
                    <p className={`text-sm font-medium ${choice.healthImpact > 0 ? 'text-green-600' : choice.healthImpact < 0 ? 'text-red-600' : 'text-gray-600'}`}>
                      {choice.healthImpact > 0 ? `+${choice.healthImpact}` : choice.healthImpact} health
                    </p>
                  </div>
                </div>
              ))}
            </div>
            
            <button 
              onClick={handleNextDay}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg flex items-center justify-center"
            >
              <span>{currentDay >= dailyChallenges.length ? 'See Final Results' : 'Next Day'}</span>
              <ArrowRight className="ml-2" size={18} />
            </button>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-2xl font-bold mb-2">{challenge.title}</h2>
            <p className="text-lg mb-6">{challenge.scenario}</p>
            
            {/* Choice categories */}
            <div className="space-y-8">
              {Object.entries(challenge.choices).map(([category, choices]) => (
                <div key={category} className="border-b pb-6 last:border-b-0">
                  <h3 className="flex items-center text-xl font-semibold mb-4 capitalize">
                    {category === 'nutrition' && <Apple className="mr-2 text-green-500" />}
                    {category === 'hydration' && <Droplet className="mr-2 text-blue-500" />}
                    {category === 'exercise' && <Dumbbell className="mr-2 text-orange-500" />}
                    {category === 'sleep' && <Sun className="mr-2 text-purple-500" />}
                    {category}
                  </h3>
                  
                  <div className="grid grid-cols-1 gap-3">
                    {choices.map(choice => (
                      <button
                        key={choice.id}
                        className={`p-4 rounded-lg text-left transition ${
                          dailyChoices[category]?.id === choice.id 
                            ? 'bg-blue-100 border-2 border-blue-500' 
                            : 'bg-gray-50 hover:bg-gray-100 border-2 border-transparent'
                        }`}
                        onClick={() => handleChoice(category, choice)}
                      >
                        {choice.text}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  // Results screen
  const ResultsScreen = () => {
    const getHealthRating = () => {
      if (health >= 90) return { text: "Excellent", color: "text-green-500" };
      if (health >= 70) return { text: "Good", color: "text-blue-500" };
      if (health >= 50) return { text: "Fair", color: "text-yellow-500" };
      return { text: "Poor", color: "text-red-500" };
    };
    
    const getFeedback = () => {
      if (score >= 180) return "Amazing job! You've made consistently healthy choices that will have a lasting positive impact on your wellbeing.";
      if (score >= 120) return "Great work! You've built some solid healthy habits that will serve you well going forward.";
      if (score >= 80) return "Good effort! You've taken some important steps toward a healthier lifestyle.";
      return "You've completed the challenge. With more consistent healthy choices, you can improve your wellbeing.";
    };
    
    const healthRating = getHealthRating();
    
    return (
      <div className="p-6">
        <div className="bg-white rounded-lg shadow-md p-6 mb-6 text-center">
          <h2 className="text-3xl font-bold mb-6">Your 5-Day Health Journey Results</h2>
          
          <div className="flex flex-col items-center justify-center mb-8">
            <div className="mb-4">
              <span className="text-2xl font-bold">Final Score: </span>
              <span className="text-3xl font-bold text-blue-600">{score}</span>
              <span className="text-lg text-gray-600"> / 200</span>
            </div>
            
            <div className="mb-6">
              <span className="text-2xl font-bold">Health Level: </span>
              <span className={`text-3xl font-bold ${healthRating.color}`}>{healthRating.text}</span>
              <span className="text-lg text-gray-600"> ({health}%)</span>
            </div>
            
            <p className="text-lg mb-6">{getFeedback()}</p>
          </div>
          
          <h3 className="text-xl font-semibold mb-4">Your Daily Choices</h3>
          <div className="space-y-4 mb-8">
            {gameHistory.map((day, index) => (
              <div key={index} className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold">Day {day.day}: {dailyChallenges[day.day-1].title}</h4>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  {Object.entries(day.choices).map(([category, choice]) => (
                    <div key={category} className="flex items-center">
                      <div className={`rounded-full p-1 mr-2 ${choice.isGood ? 'bg-green-100' : 'bg-red-100'}`}>
                        {choice.isGood ? 
                          <Check size={16} className="text-green-600" /> : 
                          <X size={16} className="text-red-600" />
                        }
                      </div>
                      <div className="text-sm">
                        <span className="font-medium capitalize">{category}:</span> {choice.text.length > 30 ? choice.text.substring(0, 30) + '...' : choice.text}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          
          <h3 className="text-xl font-semibold mb-4">Health Tips To Remember</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left mb-8">
            <div className="bg-green-50 p-4 rounded-lg">
              <h4 className="font-semibold flex items-center"><Apple className="mr-2 text-green-500" /> Nutrition</h4>
              <p className="text-sm mt-2">Aim for balanced meals with lean proteins, whole grains, and plenty of fruits and vegetables. Plan your meals ahead when possible.</p>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-semibold flex items-center"><Droplet className="mr-2 text-blue-500" /> Hydration</h4>
              <p className="text-sm mt-2">Drink water throughout the day. Limit sugary drinks and alcohol. A good goal is 8 glasses (64 oz) of water daily.</p>
            </div>
            <div className="bg-orange-50 p-4 rounded-lg">
              <h4 className="font-semibold flex items-center"><Dumbbell className="mr-2 text-orange-500" /> Exercise</h4>
              <p className="text-sm mt-2">Aim for at least 30 minutes of movement daily. Mix cardio, strength training, and flexibility exercises throughout your week.</p>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <h4 className="font-semibold flex items-center"><Sun className="mr-2 text-purple-500" /> Sleep</h4>
              <p className="text-sm mt-2">Prioritize 7-9 hours of quality sleep. Establish a regular sleep schedule and create a relaxing bedtime routine.</p>
            </div>
          </div>
          
          <button 
            onClick={handleRestart}
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg flex items-center justify-center mx-auto"
          >
            <RefreshCw className="mr-2" size={18} />
            <span>Play Again</span>
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        {gameState === 'intro' && <IntroScreen />}
        {gameState === 'playing' && <GameScreen />}
        {gameState === 'results' && <ResultsScreen />}
      </div>
    </div>
  );
};

export default HealthAdventureGame;