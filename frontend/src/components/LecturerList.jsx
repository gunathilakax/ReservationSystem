import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './LecturerList.css';
import ConfirmationModal from './ConfirmationModal';

const LecturerList = () => {
  const [lecturers, setLecturers] = useState([]);
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
      } catch (error) {
        console.error('Error fetching lecturers:', error);
      }
    };

    fetchLecturers();
  }, []);

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

  // Filter lecturers based on the search term
  const filteredLecturers = lecturers.filter(lecturer =>
    lecturer.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="lecturer-list">
      <p>Search</p>
      <input
        type="text"
        placeholder="Search by ID"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
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

export default LecturerList;
