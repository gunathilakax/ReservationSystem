import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './LecturerList.css';
import ConfirmationModal from './ConfirmationModal';

const LecturerList = () => {
  const [lecturers, setLecturers] = useState([]);
  const [filteredLecturers, setFilteredLecturers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedLecturer, setSelectedLecturer] = useState(null);
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const [lecturerToRemove, setLecturerToRemove] = useState(null);

  useEffect(() => {
    const fetchLecturers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/users');
        const filteredLecturers = response.data.filter(user => user.role !== 'admin');
        setLecturers(filteredLecturers);
        setFilteredLecturers(filteredLecturers);
      } catch (error) {
        console.error('Error fetching lecturers:', error);
      }
    };

    fetchLecturers();
  }, []);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    const filtered = lecturers.filter(lecturer =>
      lecturer.username.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredLecturers(filtered);
  };

  const handleEditClick = (lecturer) => {
    setSelectedLecturer(lecturer);
    setEditModalOpen(true);
  };

  const handleRemoveClick = (lecturer) => {
    setLecturerToRemove(lecturer);
    setConfirmModalOpen(true);
  };

  const handleConfirmRemove = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/users/${lecturerToRemove._id}`);
      setLecturers(lecturers.filter(lecturer => lecturer._id !== lecturerToRemove._id));
      setFilteredLecturers(filteredLecturers.filter(lecturer => lecturer._id !== lecturerToRemove._id));
      setConfirmModalOpen(false);
      setLecturerToRemove(null);
    } catch (error) {
      console.error('Error removing lecturer:', error);
    }
  };

  const handleModalClose = () => {
    setEditModalOpen(false);
    setSelectedLecturer(null);
  };

  const handleConfirmCancel = () => {
    setConfirmModalOpen(false);
    setLecturerToRemove(null);
  };

  return (
    <div className="lecturer-list">
      <input
        type="text"
        placeholder="Search by username"
        value={searchTerm}
        onChange={handleSearchChange}
        className="search-bar"
      />
      {filteredLecturers.length === 0 ? (
        <p>No lecturers found.</p>
      ) : (
        filteredLecturers.map((lecturer) => (
          <div className="lecturer-card" key={lecturer._id}>
            <h3>{lecturer.fullName}</h3>
            <p>Email: {lecturer.email}</p>
            <p>Phone: {lecturer.phone}</p>
            <p>Department: {lecturer.department}</p>
            <p>Subject: {lecturer.subject}</p>
            <div className="button-container">
              <button className="lecture-card-edit-button" onClick={() => handleEditClick(lecturer)}>Edit</button>
              <button className="lecture-card-remove-button" onClick={() => handleRemoveClick(lecturer)}>Remove</button>
            </div>
          </div>
        ))
      )}
      {editModalOpen && selectedLecturer && (
        <EditLecturerModal 
          lecturer={selectedLecturer} 
          onClose={handleModalClose} 
          onUpdate={(updatedLecturer) => {
            setLecturers(lecturers.map(lecturer => 
              lecturer._id === updatedLecturer._id ? updatedLecturer : lecturer
            ));
            setFilteredLecturers(filteredLecturers.map(lecturer =>
              lecturer._id === updatedLecturer._id ? updatedLecturer : lecturer
            ));
            handleModalClose();
          }} 
        />
      )}
      {confirmModalOpen && (
        <ConfirmationModal 
          message="Are you sure you want to remove?" 
          onConfirm={handleConfirmRemove} 
          onCancel={handleConfirmCancel} 
        />
      )}
    </div>
  );
};

const EditLecturerModal = ({ lecturer, onClose, onUpdate }) => {
  const [formData, setFormData] = useState({ ...lecturer });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:5000/api/users/${lecturer._id}`, formData);
      onUpdate(response.data);
    } catch (error) {
      console.error('Error updating lecturer:', error);
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Edit Lecturer</h2>
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
          <button type="submit">Save Changes</button>
          <button type="button" onClick={onClose}>Cancel</button>
        </form>
      </div>
    </div>
  );
};

export default LecturerList;
