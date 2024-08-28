// src/pages/ProfilePage.jsx
import React, { useEffect, useState } from 'react';
import LecturerNavBar from '../components/LecturerNavBar';
import axios from 'axios';

const ProfilePage = () => {
  const [lecturer, setLecturer] = useState(null);
  const username = sessionStorage.getItem("username")

  useEffect(() => {
    const fetchLecturer = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/users/${username}`);
        setLecturer(response.data);
      } catch (error) {
        console.error('Error fetching lecturer:', error);
      }
    };

    fetchLecturer();
  }, [username]);

  if (!lecturer) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <LecturerNavBar /><br /><br />
      <div className="profile-container">
        <h1>Profile</h1>
        <p><strong>Full Name:</strong> {lecturer.fullName}</p>
        <p><strong>Email:</strong> {lecturer.email}</p>
        <p><strong>Phone:</strong> {lecturer.phone}</p>
        <p><strong>Department:</strong> {lecturer.department}</p>
        <p><strong>Subject:</strong> {lecturer.subject}</p>
        <p><strong>Username:</strong> {lecturer.username}</p>
      </div>
    </div>
  );
};

export default ProfilePage;
