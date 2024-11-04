import React, { useState } from 'react';
import AdminNavBar from '../components/AdminNavBar';
import LecturerList from '../components/LecturerList';
import Footer from '../components/Footer';
import './AdminLecturerPage.css';
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
      <div className="admin-lecturer-page-container">
      <div className="adlec-content">
        <h2>Add Users</h2>
        <form className="adlec-form" onSubmit={handleSubmit}>
          <label className="adlec-label">Full Name:
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required
            />
          </label>
          <label className="adlec-label">Email:
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </label>
          <label className="adlec-label">Phone:
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </label>
          <label className="adlec-label">Department:
            <input
              type="text"
              name="department"
              value={formData.department}
              onChange={handleChange}
              required
            />
          </label>
          <label className="adlec-label">Subject:
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              required
            />
          </label>
          <label className="adlec-label">Username:
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </label>
          <label className="adlec-label">Password:
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </label>
          <label className="adlec-label">Role:
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
          <button type="submit" className="adlec-button">Add User</button>
        </form>
        <hr />
        <h2>Users</h2>
        <LecturerList />  {/* Include the new component here */}
      </div>
      </div>
      <Footer />
    </div>
  );
};

export default AdminLecturerPage;
