import React, { useState, useEffect } from 'react';
import axios from 'axios';
import LecturerNavBar from '../components/LecturerNavBar';
import './Labs.css';
import LabImage from '../assets/Lab.jpg';

const Labs = () => {
  const [labs, setLabs] = useState([]);

  useEffect(() => {
    const fetchLabs = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/labs');
        setLabs(response.data);
      } catch (error) {
        console.error('Error fetching labs:', error);
      }
    };

    fetchLabs();
  }, []);

  return (
    <div className="lec-labs-container">
      <LecturerNavBar />
      <img src={LabImage} alt="Lab" className="lec-lab-image" />
      <div className="lec-labs-grid">
        {labs.map((lab) => (
          <div key={lab._id} className="lec-lab-card">
            <h3>{lab.LabName}</h3>
            <p>Department: {lab.Department}</p>
            <p>Capacity: {lab.Capacity}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Labs;
