// src/pages/AdminProfilePage.jsx
import React from 'react';
import AdminNavBar from '../components/AdminNavBar';
//import './AdminProfilePage.css'; // Create a CSS file for AdminProfilePage if needed

const AdminProfilePage = () => {
  return (
    <div>
      <AdminNavBar />
      <div className="admin-profile-content">
        <h1>Admin Profile</h1>
        {/* Add more content or details related to the admin's profile here */}
      </div>
    </div>
  );
};

export default AdminProfilePage;
