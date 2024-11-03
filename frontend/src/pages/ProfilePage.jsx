// src/pages/ProfilePage.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LecturerNavBar from '../components/LecturerNavBar';
import axios from 'axios';
import './ProfilePage.css';
import ProfileImage from '../assets/Profile.png';

const ProfilePage = () => {
  const [lecturer, setLecturer] = useState(null);
  const username = sessionStorage.getItem("username");
  const navigate = useNavigate();

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

  const handleLogout = () => {
    // Perform logout logic, e.g., clearing authentication tokens
    navigate('/'); // Redirect to the login page
  };

  if (!lecturer) {
    return <p>Loading...</p>;
  }

  return (
    <div className="profile-page">
      <LecturerNavBar /><br /><br />
      <div className="profile-container">
        <img src={ProfileImage} alt="Profile" className="profile-image" />
        <p>{lecturer.username}</p>
        <p> {lecturer.email}</p>
        <p />
        <div className="profile-info-section">
        <p>{lecturer.fullName}</p>
        <p>{lecturer.phone}</p>
        <p>Department : {lecturer.department}</p>
        <p>Subject : {lecturer.subject}</p>
        </div>
        <button onClick={handleLogout} className="profile-logout-button">Logout</button>
      </div>
    </div>
  );
};

export default ProfilePage;
