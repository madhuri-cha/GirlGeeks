// components/NutritionPlan.jsx
import React, { useState } from 'react';

const NutritionPlan = ({ user }) => {
  const [selectedMealPlan, setSelectedMealPlan] = useState('balanced');
  
  // Sample meal plans based on different dietary preferences
  const mealPlans = {
    balanced: {
      title: 'Balanced Diet Plan',
      description: 'A well-rounded diet with proper macronutrient distribution.',
      dailyCalories: `${Math.round((user?.weight || 70) * 15)} calories`,
      meals: [
        {
          name: 'Breakfast',
          time: '7:00 - 8:00 AM',
          options: [
            'Oatmeal with berries and nuts (350 cal)',
            'Greek yogurt with honey and granola (300 cal)',
            'Whole grain toast with avocado and egg (400 cal)'
          ]
        },
        {
          name: 'Mid-morning Snack',
          time: '10:00 - 11:00 AM',
          options: [
            'Apple with 1 tbsp peanut butter (150 cal)',
            'Small handful of mixed nuts (180 cal)',
            'Carrot sticks with hummus (120 cal)'
          ]
        },
        {
          name: 'Lunch',
          time: '12:30 - 1:30 PM',
          options: [
            'Grilled chicken salad with olive oil dressing (450 cal)',
            'Quinoa bowl with roasted vegetables (420 cal)',
            'Turkey and avocado wrap with side salad (500 cal)'
          ]
        },
        {
          name: 'Afternoon Snack',
          time: '3:30 - 4:30 PM',
          options: [
            'Greek yogurt with honey (150 cal)',
            'Protein shake with banana (200 cal)',
            'Dark chocolate (1 oz) and berries (160 cal)'
          ]
        },
        {
          name: 'Dinner',
          time: '6:30 - 7:30 PM',
          options: [
            'Baked salmon with roasted sweet potatoes and broccoli (550 cal)',
            'Stir-fried tofu with vegetables and brown rice (480 cal)',
            'Lean beef steak with quinoa and asparagus (600 cal)'
          ]
        }
      ],
      tips: [
        'Aim for a balance of 45-65% carbs, 10-35% protein, and 20-35% fats',
        'Stay hydrated by drinking at least 8 glasses of water daily',
        'Eat slowly and mindfully to improve digestion and satisfaction',
        'Include a variety of colorful fruits and vegetables each day'
      ]
    },
    vegetarian: {
      title: 'Vegetarian Diet Plan',
      description: 'Plant-based nutrition without meat products.',
      dailyCalories: `${Math.round((user?.weight || 70) * 14)} calories`,
      meals: [
        {
          name: 'Breakfast',
          time: '7:00 - 8:00 AM',
          options: [
            'Spinach and mushroom omelette with toast (380 cal)',
            'Chia seed pudding with fruits and nuts (320 cal)',
            'Smoothie bowl with granola and seeds (350 cal)'
          ]
        },
        {
          name: 'Mid-morning Snack',
          time: '10:00 - 11:00 AM',
          options: [
            'Trail mix with dried fruits (170 cal)',
            'Yogurt with honey (150 cal)',
            'Apple slices with almond butter (160 cal)'
          ]
        },
        {
          name: 'Lunch',
          time: '12:30 - 1:30 PM',
          options: [
            'Lentil soup with whole grain bread (420 cal)',
            'Mediterranean quinoa salad with feta (450 cal)',
            'Veggie wrap with hummus and avocado (400 cal)'
          ]
        },
        {
          name: 'Afternoon Snack',
          time: '3:30 - 4:30 PM',
          options: [
            'Edamame beans (150 cal)',
            'Cottage cheese with fruit (160 cal)',
            'Roasted chickpeas (180 cal)'
          ]
        },
        {
          name: 'Dinner',
          time: '6:30 - 7:30 PM',
          options: [
            'Eggplant parmesan with side salad (520 cal)',
            'Stuffed bell peppers with quinoa and black beans (480 cal)',
            'Vegetable stir fry with tofu and brown rice (500 cal)'
          ]
        }
      ],
      tips: [
        'Ensure adequate protein intake through beans, lentils, tofu, and dairy',
        'Consider B12 supplementation or fortified foods',
        'Include iron-rich foods like spinach, lentils, and fortified cereals',
        'Combine iron sources with vitamin C foods to improve absorption'
      ]
    },
    weightloss: {
      title: 'Weight Loss Diet Plan',
      description: 'Calorie-controlled nutrition plan to support healthy weight loss.',
      dailyCalories: `${Math.round((user?.weight || 70) * 12)} calories`,
      meals: [
        {
          name: 'Breakfast',
          time: '7:00 - 8:00 AM',
          options: [
            'Egg white omelette with spinach and tomatoes (220 cal)',
            'Overnight oats with berries (no added sugar) (280 cal)',
            'Green smoothie with protein powder (230 cal)'
          ]
        },
        {
          name: 'Mid-morning Snack',
          time: '10:00 - 11:00 AM',
          options: [
            'Celery sticks with 1 tbsp almond butter (100 cal)',
            'Small apple (80 cal)',
            'Plain Greek yogurt with cinnamon (90 cal)'
          ]
        },
        {
          name: 'Lunch',
          time: '12:30 - 1:30 PM',
          options: [
            'Large green salad with grilled chicken and light dressing (350 cal)',
            'Turkey lettuce wraps with veggies (320 cal)',
            'Tuna salad (made with Greek yogurt) on cucumber slices (330 cal)'
          ]
        },
        {
          name: 'Afternoon Snack',
          time: '3:30 - 4:30 PM',
          options: [
            'Sliced bell peppers with 2 tbsp hummus (80 cal)',
            'Hard-boiled egg (70 cal)',
            '1/4 cup cottage cheese with cucumber (90 cal)'
          ]
        },
        {
          name: 'Dinner',
          time: '6:00 - 7:00 PM',
          options: [
            'Baked cod with roasted brussels sprouts (350 cal)',
            'Zucchini noodles with turkey meatballs (340 cal)',
            'Cauliflower rice stir fry with shrimp (320 cal)'
          ]
        }
      ],
      tips: [
        'Focus on high-volume, low-calorie foods like vegetables and lean proteins',
        'Drink water before meals to help control appetite',
        'Use smaller plates to help with portion control',
        'Aim for steady weight loss of 1-2 pounds per week',
        'Combine diet with regular exercise for best results'
      ]
    },
    athletic: {
      title: 'Athletic Performance Diet Plan',
      description: 'Higher-calorie plan optimized for training and muscle recovery.',
      dailyCalories: `${Math.round((user?.weight || 70) * 18)} calories`,
      meals: [
        {
          name: 'Breakfast',
          time: '6:30 - 7:30 AM',
          options: [
            'Protein pancakes with banana and honey (500 cal)',
            'Egg and vegetable breakfast burrito with avocado (550 cal)',
            'Oatmeal with protein powder, peanut butter and berries (520 cal)'
          ]
        },
        {
          name: 'Mid-morning Snack',
          time: '10:00 - 11:00 AM',
          options: [
            'Protein shake with banana and almond butter (300 cal)',
            'Greek yogurt with granola and honey (280 cal)',
            'Tuna on whole grain crackers (250 cal)'
          ]
        },
        {
          name: 'Lunch',
          time: '12:30 - 1:30 PM',
          options: [
            'Chicken, sweet potato and broccoli meal prep bowl (650 cal)',
            'Salmon with quinoa and roasted vegetables (600 cal)',
            'Turkey and avocado sandwich with fruit (620 cal)'
          ]
        },
        {
          name: 'Pre-workout Snack',
          time: '3:30 - 4:00 PM',
          options: [
            'Banana with 1 tbsp peanut butter (200 cal)',
            'Apple with handful of nuts (220 cal)',
            'Rice cakes with honey (180 cal)'
          ]
        },
        {
          name: 'Post-workout',
          time: 'Within 30 minutes after workout',
          options: [
            'Whey protein shake with milk and banana (350 cal)',
            'Chicken and rice bowl (400 cal)',
            'Greek yogurt with berries and granola (320 cal)'
          ]
        },
        {
          name: 'Dinner',
          time: '7:00 - 8:00 PM',
          options: [
            'Steak with baked potato and green beans (700 cal)',
            'Salmon with brown rice and roasted vegetables (650 cal)',
            'Chicken stir fry with vegetables and rice noodles (630 cal)'
          ]
        }
      ],
      tips: [
        'Time protein intake around workouts for optimal muscle recovery',
        'Ensure adequate carbohydrate intake for training energy',
        'Stay well hydrated throughout the day, especially before and during workouts',
        'Consider adding sports drinks during intense exercise sessions',
        'Prioritize post-workout nutrition within 30-60 minutes of training'
      ]
    }
  };

  // Calculate BMI to provide customized nutrition advice
  const calculateBMI = () => {
    if (!user?.height || !user?.weight) return null;
    const heightInMeters = user.height / 100;
    const bmi = (user.weight / (heightInMeters * heightInMeters)).toFixed(1);
    return bmi;
  };

  // Get nutrition tips based on BMI
  const getBMITips = () => {
    const bmi = calculateBMI();
    if (!bmi) return null;
    
    if (bmi < 18.5) {
      return "Your BMI suggests you're underweight. Consider our balanced or athletic diet plans to help gain healthy weight.";
    } else if (bmi < 25) {
      return "Your BMI is in the healthy range. Any of our meal plans can be suitable based on your goals.";
    } else if (bmi < 30) {
      return "Your BMI suggests you're overweight. Our weight loss plan may help you achieve a healthier weight.";
    } else {
      return "Your BMI suggests obesity. We recommend consulting with a healthcare provider and considering our weight loss plan.";
    }
  };

  const activePlan = mealPlans[selectedMealPlan];

  return (
    <div className="container fade-in">
      <h1>Nutrition & Diet Plan</h1>
      <p>Personalized nutrition recommendations based on your health profile and goals.</p>
      
      {getBMITips() && (
        <div className="info-box">
          <p><strong>Personalized Recommendation:</strong> {getBMITips()}</p>
        </div>
      )}
      
      <div className="plan-selector">
        <h3>Select Your Diet Plan:</h3>
        <div className="plan-buttons">
          <button 
            className={`btn ${selectedMealPlan === 'balanced' ? 'btn-active' : 'btn-outline'}`}
            onClick={() => setSelectedMealPlan('balanced')}
          >
            Balanced
          </button>
          <button 
            className={`btn ${selectedMealPlan === 'vegetarian' ? 'btn-active' : 'btn-outline'}`}
            onClick={() => setSelectedMealPlan('vegetarian')}
          >
            Vegetarian
          </button>
          <button 
            className={`btn ${selectedMealPlan === 'weightloss' ? 'btn-active' : 'btn-outline'}`}
            onClick={() => setSelectedMealPlan('weightloss')}
          >
            Weight Loss
          </button>
          <button 
            className={`btn ${selectedMealPlan === 'athletic' ? 'btn-active' : 'btn-outline'}`}
            onClick={() => setSelectedMealPlan('athletic')}
          >
            Athletic
          </button>
        </div>
      </div>
      
      <div className="meal-plan-details">
        <div className="plan-header">
          <h2>{activePlan.title}</h2>
          <p>{activePlan.description}</p>
          <p><strong>Recommended Daily Intake:</strong> {activePlan.dailyCalories}</p>
        </div>
        
        <div className="daily-meals">
          {activePlan.meals.map((meal, index) => (
            <div className="meal-card" key={index}>
              <div className="meal-header">
                <h3>{meal.name}</h3>
                <span className="meal-time">{meal.time}</span>
              </div>
              <ul className="meal-options">
                {meal.options.map((option, idx) => (
                  <li key={idx}>{option}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        <div className="tips-section">
          <h3>Nutrition Tips</h3>
          <ul className="tips-list">
            {activePlan.tips.map((tip, index) => (
              <li key={index}>{tip}</li>
            ))}
          </ul>
        </div>
        
        <div className="disclaimer">
          <p><strong>Note:</strong> This meal plan is provided as general guidance only. Please consult with a registered dietitian or healthcare provider for personalized nutrition advice.</p>
        </div>
      </div>
    </div>
  );
};

export default NutritionPlan;