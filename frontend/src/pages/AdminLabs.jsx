// src/pages/AdminLabs.jsx
import React, { useEffect, useState } from 'react';
import AdminNavBar from '../components/AdminNavBar';
import axios from 'axios';
import './AdminLabs.css';
import LabImage from '../assets/Lab.jpg';

const AdminLabs = () => {
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
    <div className="admin-labs-page">
      <AdminNavBar />
      <img src={LabImage} alt="Lab" className="lab-image" />
      <div className="labs-container">
        {labs.map((lab) => (
          <div key={lab._id} className="lab-card">
            <h3>{lab.LabName}</h3>
            <p>Department: {lab.Department}</p>
            <p>Capacity: {lab.Capacity}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminLabs;
