// src/pages/AdminLectureHalls.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AdminNavBar from '../components/AdminNavBar'; // Import AdminNavBar
import './AdminLectureHalls.css'; // Import the CSS file for styling

const AdminLectureHalls = () => {
  const [lectureHalls, setLectureHalls] = useState([]);
  const [activeTab, setActiveTab] = useState('LGF');

  useEffect(() => {
    const fetchLectureHalls = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/lecturehalls');
        setLectureHalls(response.data);
      } catch (error) {
        console.error('Error fetching lecture halls:', error);
      }
    };

    fetchLectureHalls();
  }, []);

  const renderLectureHalls = () => {
    return lectureHalls
      .filter(hall => hall['Hall No'].startsWith(activeTab))
      .map(hall => (
        <div key={hall._id} className="lecture-hall-card">
          <h2>{hall['Hall No']}</h2>
          <p>Capacity: {hall.Capacity}</p>
          <p>Multimedia Projector: {hall['Multimedia Projector']}</p>
          <p>White Board: {hall['White Board']}</p>
          <p>TV: {hall.TV}</p>
          <p>Wall Fans: {hall['Wall Fans']}</p>
          <p>Ceiling Fans: {hall['Celling Fans']}</p>
          <p>Speakers: {hall.Speakers}</p>
        </div>
      ));
  };

  return (
    <div className="admin-lecture-halls-container">
      <AdminNavBar />
      <div className="tabs">
        <button
          className={activeTab === 'LGF' ? 'active' : ''}
          onClick={() => setActiveTab('LGF')}
        >
          LGF
        </button>
        <button
          className={activeTab === 'GF' ? 'active' : ''}
          onClick={() => setActiveTab('GF')}
        >
          GF
        </button>
        <button
          className={activeTab === 'FF' ? 'active' : ''}
          onClick={() => setActiveTab('FF')}
        >
          FF
        </button>
        <button
          className={activeTab === 'SF' ? 'active' : ''}
          onClick={() => setActiveTab('SF')}
        >
          SF
        </button>
      </div>
      <div className="admin-lecture-halls-grid">
        {renderLectureHalls()}
      </div>
    </div>
  );
};

export default AdminLectureHalls;
