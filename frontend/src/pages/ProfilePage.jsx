import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LecturerNavBar from '../components/LecturerNavBar';
import axios from 'axios';
import './ProfilePage.css';
import ProfileImage from '../assets/Profile.png';

const ProfilePage = () => {
  const [lecturer, setLecturer] = useState(null);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
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
    navigate('/'); // Redirect to the login page
  };

  const handlePasswordChange = async () => {
    if (newPassword !== confirmNewPassword) {
      setPasswordError("New passwords do not match.");
      return;
    }
    
    try {
      const response = await axios.put(`http://localhost:5000/api/users/${username}/change-password`, {
        currentPassword,
        newPassword,
      });
      alert(response.data.message);
      setShowPasswordModal(false);

      // Clear input fields and error message
      setCurrentPassword('');
      setNewPassword('');
      setConfirmNewPassword('');
      setPasswordError('');
    } catch (error) {
      setPasswordError(error.response?.data?.error || 'Failed to change password');
    }
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
        <p>{lecturer.email}</p>
        <div className="profile-info-section">
          <p>{lecturer.fullName}</p>
          <p>{lecturer.phone}</p>
          <p>Department : {lecturer.department}</p>
          <p>Subject : {lecturer.subject}</p>
        </div>
        <button onClick={() => setShowPasswordModal(true)} className="change-password-button">
          Change Password
        </button>
        <button onClick={handleLogout} className="profile-logout-button">Logout</button>
      </div>

      {showPasswordModal && (
        <div className="password-modal">
          <div className="password-modal-content">
            <h3>Change Password</h3>
            <label>Current Password:</label>
            <input
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
            />
            <label>New Password:</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <label>Confirm New Password:</label>
            <input
              type="password"
              value={confirmNewPassword}
              onChange={(e) => setConfirmNewPassword(e.target.value)}
            />
            {passwordError && <p className="error-message">{passwordError}</p>}
            <button onClick={handlePasswordChange} className="submit-password-button">Submit</button>
            <button onClick={() => setShowPasswordModal(false)} className="close-password-button">
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
