import React from 'react';
import './UniNavBar.css'; // Use the same CSS for consistency
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png'; // Adjust the path as needed

const UniNavBar = () => {
  const navigate = useNavigate();

  return (
    <div className="uni-navbar">
      <img src={logo} alt="Logo" className="logo" />
    </div>
  );
};

export default UniNavBar;
