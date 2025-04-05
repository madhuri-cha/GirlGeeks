// components/UserForm.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const UserForm = ({ onUserSubmit }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    height: '',
    weight: '',
    gender: '',
    fitnessGoal: 'general'
  });
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    onUserSubmit(formData);
    navigate('/dashboard');
  };
  
  return (
    <div className="form-container fade-in">
      <h2 className="form-title">Let's Get to Know You</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name" className="form-label">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            className="form-input"
            placeholder="Enter your name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="age" className="form-label">Age</label>
          <input
            type="number"
            id="age"
            name="age"
            className="form-input"
            placeholder="Enter your age"
            value={formData.age}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="height" className="form-label">Height (cm)</label>
          <input
            type="number"
            id="height"
            name="height"
            className="form-input"
            placeholder="Enter your height in cm"
            value={formData.height}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="weight" className="form-label">Weight (kg)</label>
          <input
            type="number"
            id="weight"
            name="weight"
            className="form-input"
            placeholder="Enter your weight in kg"
            value={formData.weight}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="gender" className="form-label">Gender</label>
          <select
            id="gender"
            name="gender"
            className="form-input"
            value={formData.gender}
            onChange={handleChange}
            required
          >
            <option value="">Select gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="non-binary">Non-binary</option>
            <option value="prefer-not-to-say">Prefer not to say</option>
          </select>
        </div>
        
        <div className="form-group">
          <label htmlFor="fitnessGoal" className="form-label">Fitness Goal</label>
          <select
            id="fitnessGoal"
            name="fitnessGoal"
            className="form-input"
            value={formData.fitnessGoal}
            onChange={handleChange}
          >
            <option value="general">General fitness</option>
            <option value="weight-loss">Weight loss</option>
            <option value="muscle-gain">Muscle gain</option>
            <option value="endurance">Endurance</option>
            <option value="flexibility">Flexibility</option>
          </select>
        </div>
        
        <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
          Create Profile
        </button>
      </form>
    </div>
  );
};

export default UserForm;
