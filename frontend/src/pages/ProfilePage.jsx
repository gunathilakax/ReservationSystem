// src/pages/ProfilePage.jsx
import React, { useEffect, useState } from 'react';
import LecturerNavBar from '../components/LecturerNavBar';
import axios from 'axios';
import './ProfilePage.css';
import ProfileImage from '../assets/Profile.jpg';

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
        <img src={ProfileImage} alt="Profile" className="profile-image" />
        <p>{lecturer.username}</p>
        <p> {lecturer.email}</p>
        <p />
        <p>{lecturer.fullName}</p>
        <p>{lecturer.phone}</p>
        <p>Department : {lecturer.department}</p>
        <p>Subject : {lecturer.subject}</p>
        
      </div>
    </div>
  );
};

export default ProfilePage;
