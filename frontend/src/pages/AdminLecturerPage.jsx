import React, { useState } from 'react';
import AdminNavBar from '../components/AdminNavBar';
import LecturerList from '../components/LecturerList';  // Import the new component
//import './AdminLecturerPage.css';
import axios from 'axios';

const AdminLecturerPage = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    department: '',
    subject: '',
    username: '',
    password: '',
    role: 'lecturer' // default role, can be changed as needed
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/users', formData);
      alert('User added successfully');
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        department: '',
        subject: '',
        username: '',
        password: '',
        role: 'lecturer'
      });
    } catch (error) {
      console.error(error);
      alert('Failed to add user');
    }
  };

  return (
    <div className="admin-lecturer-page">
      <AdminNavBar /><br /><br />
      <div className="content">
        <h1>Add Lecturer/Admin</h1>
        <form onSubmit={handleSubmit}>
          <label>Full Name:
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required
            />
          </label>
          <label>Email:
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </label>
          <label>Phone:
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </label>
          <label>Department:
            <input
              type="text"
              name="department"
              value={formData.department}
              onChange={handleChange}
              required
            />
          </label>
          <label>Subject:
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              required
            />
          </label>
          <label>Username:
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </label>
          <label>Password:
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </label>
          <label>Role:
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              required
            >
              <option value="lecturer">Lecturer</option>
              <option value="admin">Admin</option>
            </select>
          </label>
          <button type="submit">Add User</button>
        </form>
        <hr />
        <h2>Lecturers List</h2>
        <LecturerList />  {/* Include the new component here */}
      </div>
    </div>
  );
};

export default AdminLecturerPage;