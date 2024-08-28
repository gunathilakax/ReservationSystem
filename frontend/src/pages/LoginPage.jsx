import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authAPI from '../api/auth';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); // State to manage error message
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Clear previous error

    try {
      const response = await authAPI.login(username, password);

      console.log(response)

      
      sessionStorage.setItem("username", response.username)
      

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
    <form onSubmit={handleSubmit}>
      <div>
        <label>Username: </label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Password: </label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      {error && <p style={{ color: 'red' }}>{error}</p>} {/* Error message */}
      <button type="submit">Login</button>
    </form>
  );
};

export default LoginPage;
