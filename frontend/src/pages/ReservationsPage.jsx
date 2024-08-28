// src/pages/ReservationsPage.jsx
import React from 'react';
import LecturerNavBar from '../components/LecturerNavBar'; // Ensure the correct path is used
//import './ReservationsPage.css'; // Create a separate CSS file for the page

const ReservationsPage = () => {
  return (
    <div className="reservations-page">
      <LecturerNavBar />
      <div className="content">
        <h1>Reservations</h1>
        {/* Additional reservations-related content can be added here */}
      </div>
    </div>
  );
};

export default ReservationsPage;
