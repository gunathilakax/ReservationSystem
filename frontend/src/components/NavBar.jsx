/*import React, { useState, useEffect, useRef } from 'react';
import './NavBar.css';
import { useNavigate } from 'react-router-dom';

const NavBar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const sidebarRef = useRef(null);
  const profileMenuRef = useRef(null);
  const navigate = useNavigate();

  const handleLogout = () => {
    // Perform logout logic, e.g., clearing authentication tokens
    navigate('/'); // Redirect to the login page
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const toggleProfileMenu = () => {
    setProfileMenuOpen(!profileMenuOpen);
  };

  const handleClickOutside = (event) => {
    if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
      setProfileMenuOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <>
      <div className="navbar">
        <div className="navbar-left">
          <button className="slide-bar-btn" onClick={toggleSidebar}>
            {sidebarOpen ? 'X' : '☰'}
          </button>
        </div>
        <div className="navbar-right">
          <button className="profile-btn" onClick={toggleProfileMenu}>Profile</button>
          {profileMenuOpen && (
            <div className="profile-menu" ref={profileMenuRef}>
              <ul>
                <li onClick={() => navigate('/notice-board')}>Notice Board</li>
                <li onClick={() => navigate('/profile')}>Profile</li>
                <li onClick={() => navigate('/my-reservations')}>My Reservations</li>
                <li onClick={() => navigate('/calendar')}>Calendar</li>
                <li onClick={handleLogout}>Logout</li>
              </ul>
            </div>
          )}
        </div>
      </div>

      <div className={`sidebar ${sidebarOpen ? 'open' : ''}`} ref={sidebarRef}>
        <ul>
          <li>Booking</li>
          <li>Reservations</li>
          <li>Labs</li>
          <li>Lecture Halls</li>
        </ul>
      </div>
    </>
  );
};

export default NavBar;
*/