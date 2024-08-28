// src/pages/AdminBooking.jsx
import React from 'react';
import AdminNavBar from '../components/AdminNavBar'; // Import the AdminNavBar
//import './AdminBooking.css'; // Import the CSS file for this page

const AdminBooking = () => {
  return (
    <div className="admin-booking-page">
      <AdminNavBar />
      <div className="content">
        <h1>Booking</h1>
        {/* Additional booking-related content can go here */}
        <p>Manage all your bookings here.</p>
      </div>
    </div>
  );
};

export default AdminBooking;
