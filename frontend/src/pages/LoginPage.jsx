// LoginPage.jsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authAPI from '../api/auth';
import UniNavBar from '../components/UniNavBar';
import './loginPage.css';
import logo from '../assets/logo.png'; // Import the logo image

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await authAPI.login(username, password);
      sessionStorage.setItem("username", response.username);

      if (response.message === 'admin') {
        navigate('/admin');
      } else if (response.message === 'lecturer') {
        navigate('/lecturer');
      } else {
        setError('The username or password is incorrect');
      }
    } catch (error) {
      setError('The username or password is incorrect');
    }
  };

  return (
    <div className="login-body">
    <div className="login-container">
      <UniNavBar />
      <div className="login-header">
        <img src={logo} alt="University Logo" className="login-logo" />
        <h1>FACULTY OF TECHNOLOGY</h1>
        <h2>UNIVERSITY OF SRI JAYEWARDENEPURA</h2>
      </div>
      <form onSubmit={handleSubmit} className="login-form">
        <div className="form-group">
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            placeholder="Username"
          />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Password"
          />
        </div>
        <div className="form-group">
          <input type="checkbox" id="remember" />
          <label htmlFor="remember">Remember username</label>
        </div>
        {error && <p className="login-error-message">{error}</p>}
        <button type="submit" className="login-button">LOG IN</button>
        <div className="extra-info">
          <a href="#">Forgotten your username or password?</a>
        </div>
      </form>
    </div>
    </div>
  );
};

export default LoginPage;
