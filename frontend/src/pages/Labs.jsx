// src/pages/Labs.jsx
import React from 'react';
import LecturerNavBar from '../components/LecturerNavBar'; // Ensure the correct path is used
//import './Labs.css'; // Create a separate CSS file for the page

const Labs = () => {
  return (
    <div className="labs-page">
      <LecturerNavBar />
      <div className="content">
        <h1>Labs</h1>
        {/* Additional lab-related content can be added here */}
      </div>
    </div>
  );
};

export default Labs;
