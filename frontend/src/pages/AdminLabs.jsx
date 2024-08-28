// src/pages/AdminLabs.jsx
import React from 'react';
import AdminNavBar from '../components/AdminNavBar'; // Ensure the correct path is used
//import './AdminLabs.css'; // Create a separate CSS file for the page

const AdminLabs = () => {
  return (
    <div className="admin-labs-page">
      <AdminNavBar />
      <div className="content">
        <h1>Admin Labs</h1>
        {/* Additional admin lab-related content can be added here */}
      </div>
    </div>
  );
};

export default AdminLabs;
