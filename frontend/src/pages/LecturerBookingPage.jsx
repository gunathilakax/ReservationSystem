import React, { useState, useEffect } from 'react';
import LecturerNavBar from '../components/LecturerNavBar';
import axios from 'axios';
import './LecturerBookingPage.css';

const LecturerBookingPage = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    department: '',
    numberOfStudents: '',
    roomType: '',
    room: '',
    date: '',
    duration: '',
    timeSlot: '',
    note: '',
  });

  const [bookingRequests, setBookingRequests] = useState([]);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const username = sessionStorage.getItem('username');

  useEffect(() => {
    const fetchLecturerData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/users/${username}`);
        setFormData({
          ...formData,
          fullName: response.data.fullName,
          email: response.data.email,
          phone: response.data.phone,
          department: response.data.department,
        });
      } catch (error) {
        console.error('Error fetching lecturer data:', error);
      }
    };

    fetchLecturerData();
  }, [username]);

  useEffect(() => {
    const fetchBookingRequests = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/bookingrequests?username=${username}`);
        setBookingRequests(response.data);
      } catch (error) {
        console.error('Error fetching booking requests:', error);
      }
    };

    fetchBookingRequests();
  }, [username]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      await axios.post('http://localhost:5000/api/bookingrequests', {
        ...formData,
        username
      });
      setShowModal(true);
      setFormData({
        ...formData,
        numberOfStudents: '',
        roomType: '',
        room: '',
        date: '',
        duration: '',
        timeSlot: '',
        note: '',
      });
      const response = await axios.get(`http://localhost:5000/api/bookingrequests?username=${username}`);
      setBookingRequests(response.data);
    } catch (error) {
      setError('Failed to submit booking request.');
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  // New function to handle booking request cancellation
  const handleCancelRequest = async (requestId) => {
    try {
      await axios.delete(`http://localhost:5000/api/bookingrequests/${requestId}`);
      setBookingRequests(bookingRequests.filter((request) => request._id !== requestId));
    } catch (error) {
      console.error('Failed to cancel booking request:', error);
    }
  };

  return (
    <div className="booking-containor">
      <LecturerNavBar /><br /><br />
      <div className="forem-section">
        <h2>Book a Room</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Full Name:</label>
            <input type="text" name="fullName" value={formData.fullName} readOnly />
          </div>
          <div>
            <label>Email:</label>
            <input type="email" name="email" value={formData.email} readOnly />
          </div>
          <div>
            <label>Phone:</label>
            <input type="tel" name="phone" value={formData.phone} readOnly />
          </div>
          <div>
            <label>Department:</label>
            <input type="text" name="department" value={formData.department} readOnly />
          </div>
          <div>
            <label>Number of Students:</label>
            <input type="number" name="numberOfStudents" value={formData.numberOfStudents} onChange={handleChange} required />
          </div>
          <div>
            <label>Lecture Hall or Lab:</label>
            <select name="roomType" value={formData.roomType} onChange={handleChange} required>
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
            <label>Note:</label>
            <textarea name="note" value={formData.note} onChange={handleChange} />
          </div>
          <button type="submit">Submit</button>
          {error && <p className="error">{error}</p>}
        </form>
        {showModal && (
          <div className="modal-overlay">
            <div className="modal-content">
              <p>Booking request submitted successfully.</p>
              <button className="modal-button" onClick={handleCloseModal}>OK</button>
            </div>
          </div>
        )}
      </div>
      <div className="requests-section">
        <h2>Your Booking Requests</h2>
        <div className="booking-requests">
          {bookingRequests.length > 0 ? (
            bookingRequests.map((request) => (
              <div className="lecturer-booking-card" key={request._id}>
                <h3>Booking Request</h3>
                <p><strong>Date:</strong> {new Date(request.date).toLocaleDateString()}</p>
                <p><strong>Time Slot:</strong> {request.timeSlot}</p>
                <p><strong>Room Type:</strong> {request.roomType}</p>
                <p><strong>Room:</strong> {request.room}</p>
                <button onClick={() => handleCancelRequest(request._id)} className="cancel-button">Cancel</button>
              </div>
            ))
          ) : (
            <p>No booking requests found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default LecturerBookingPage;
