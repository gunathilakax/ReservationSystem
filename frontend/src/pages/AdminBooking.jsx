import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import AdminNavBar from '../components/AdminNavBar';
import axios from 'axios';
import './AdminBooking.css';

const AdminBooking = () => {
  const location = useLocation();
  const bookingRequest = location.state?.bookingRequest;

  const formatDate = (date) => {
    if (!date) return '';
    const d = new Date(date);
    return d.toISOString().split('T')[0];
  };

  const [formData, setFormData] = useState({
    fullName: bookingRequest ? bookingRequest.fullName : '',
    username: bookingRequest ? bookingRequest.username : '',
    email: bookingRequest ? bookingRequest.email : '',
    phone: bookingRequest ? bookingRequest.phone : '',
    department: bookingRequest ? bookingRequest.department : '',
    numberOfStudents: bookingRequest ? bookingRequest.numberOfStudents : '',
    roomType: bookingRequest ? bookingRequest.roomType : '',
    room: bookingRequest ? bookingRequest.room : '',
    date: bookingRequest ? formatDate(bookingRequest.date) : '',
    duration: bookingRequest ? bookingRequest.duration : '',
    timeSlot: bookingRequest ? bookingRequest.timeSlot : '',
  });

  const [setForEveryWeek, setSetForEveryWeek] = useState(false);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleRoomTypeChange = (e) => {
    const { value } = e.target;
    setFormData({ ...formData, roomType: value, room: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      await axios.post('http://localhost:5000/api/reservations', { ...formData, setForEveryWeek });
      setShowModal(true);
      setFormData({
        fullName: '',
        username: '',
        email: '',
        phone: '',
        department: '',
        numberOfStudents: '',
        roomType: '',
        room: '',
        date: '',
        duration: '',
        timeSlot: '',
      });
      setSetForEveryWeek(false);
    } catch (error) {
      setError('Failed to submit booking request.');
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className="admin-booking-container">
      <AdminNavBar />
      <div className="admin-booking-form-section">
        <h2>Book a Room</h2>
        <form onSubmit={handleSubmit}>
          {/* Form Fields */}
          <div>
            <label>Full Name:</label>
            <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} required />
          </div>
          <div>
            <label>Username:</label>
            <input type="text" name="username" value={formData.username} onChange={handleChange} required />
          </div>
          <div>
            <label>Email:</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} required />
          </div>
          <div>
            <label>Phone:</label>
            <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required />
          </div>
          <div>
            <label>Department:</label>
            <input type="text" name="department" value={formData.department} onChange={handleChange} required />
          </div>
          <div>
            <label>Number of Students:</label>
            <input type="number" name="numberOfStudents" value={formData.numberOfStudents} onChange={handleChange} required />
          </div>
          <div>
            <label>Lecture Hall or Lab:</label>
            <select name="roomType" value={formData.roomType} onChange={handleRoomTypeChange} required>
              <option value="">Select Type</option>
              <option value="Lecture Hall">Lecture Hall</option>
              <option value="Lab">Lab</option>
            </select>
          </div>
          {formData.roomType && (
            <div>
              <label>{formData.roomType}:</label>
              <select name="room" value={formData.room} onChange={handleChange} required>
                <option value="">Select {formData.roomType}</option>
                {formData.roomType === 'Lecture Hall' && (
                  <>
                    <option value="FF01">FF01</option>
                    <option value="FF02">FF02</option>
                    <option value="FF03">FF03</option>
                  </>
                )}
                {formData.roomType === 'Lab' && (
                  <>
                    <option value="ICT Common Lab 1">ICT Common Lab 1</option>
                    <option value="ICT Common Lab 2">ICT Common Lab 2</option>
                    <option value="Multimedia Lab">Multimedia Lab</option>
                  </>
                )}
              </select>
            </div>
          )}
          <div>
            <label>Date:</label>
            <input type="date" name="date" value={formData.date} onChange={handleChange} required />
          </div>
          <div>
            <label>Select Duration:</label>
            <select name="duration" value={formData.duration} onChange={handleChange} required>
              <option value="">Select Duration</option>
              <option value="1 hour">1 hour</option>
              <option value="2 hours">2 hours</option>
            </select>
          </div>
          {formData.duration && (
            <div>
              <label>Select Time Slot:</label>
              <select name="timeSlot" value={formData.timeSlot} onChange={handleChange} required>
                <option value="">Select Time Slot</option>
                {formData.duration === '1 hour' && (
                  <>
                    <option value="8:00-9:00">8:00-9:00</option>
                    <option value="9:00-10:00">9:00-10:00</option>
                    <option value="10:00-11:00">10:00-11:00</option>
                    <option value="11:00-12:00">11:00-12:00</option>
                    <option value="1:00-2:00">1:00-2:00</option>
                    <option value="2:00-3:00">2:00-3:00</option>
                    <option value="3:00-4:00">3:00-4:00</option>
                    <option value="4:00-5:00">4:00-5:00</option>
                    <option value="5:00-6:00">5:00-6:00</option>
                  </>
                )}
                {formData.duration === '2 hours' && (
                  <>
                    <option value="8:00-10:00">8:00-10:00</option>
                    <option value="10:00-12:00">10:00-12:00</option>
                    <option value="1:00-3:00">1:00-3:00</option>
                    <option value="3:00-5:00">3:00-5:00</option>
                  </>
                )}
              </select>
            </div>
          )}
          <div>
            <label>
              <input type="checkbox" checked={setForEveryWeek} onChange={() => setSetForEveryWeek(!setForEveryWeek)} />
              Set for every week (6 months)
            </label>
          </div>
          <button type="submit">Submit</button>
          {error && <p className="admin-booking-error">{error}</p>}
        </form>
        {showModal && (
          <div className="admin-booking-modal-overlay">
            <div className="admin-booking-modal-content">
              <p>Booking completed successfully.</p>
              <button className="admin-booking-modal-button" onClick={handleCloseModal}>OK</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminBooking;
