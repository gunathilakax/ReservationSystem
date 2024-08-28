// src/pages/ReservationRequests.jsx
import React from 'react';
import AdminNavBar from '../components/AdminNavBar'; // Ensure the correct path is used
//import './ReservationRequests.css'; // Create a separate CSS file for the page

const ReservationRequests = () => {
  return (
    <div className="reservation-requests-page">
      <AdminNavBar />
      <div className="content">
        <h1>Reservation Requests</h1>
        {/* Additional reservation request-related content can be added here */}
      </div>
    </div>
  );
};

export default ReservationRequests;
