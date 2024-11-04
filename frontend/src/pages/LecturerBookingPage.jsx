import { useLocation } from 'react-router-dom'; // Add this import
import React, { useState, useEffect } from 'react';
import LecturerNavBar from '../components/LecturerNavBar';
import Footer from '../components/Footer';
import axios from 'axios';
import './LecturerBookingPage.css';

const LecturerBookingPage = () => {
  const location = useLocation(); // Get the location object
  const { state } = location; // Extract state from location
  const initialRoomType = state?.roomType || '';
  const initialRoom = state?.room || '';

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    department: '',
    subject: '',
    numberOfStudents: '',
    roomType: initialRoomType, // Set initial room type from props
    room: initialRoom, // Set initial room from props
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
        subject: '',
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
    <div className="full-section">
      <LecturerNavBar /><br /><br />
      <div className="lecbookingpage-booking-containor">
        <div className="lecbookingpage-forem-section">
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
            <label>Subject:</label> {/* New subject input field */}
            <input type="text" name="subject" value={formData.subject} onChange={handleChange} required />
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
                    <option value="LGF 01">LGF01</option>
                    <option value="LGF 02">LGF02</option>
                    <option value="LGF 03">LGF03</option>
                    <option value="LGF 04">LGF04</option>
                    <option value="LGF 05">LGF05</option>
                    <option value="LGF 06">LGF06</option>
                    <option value="LGF 07">LGF07</option>
                    <option value="LGF 08">LGF08</option>
                    <option value="LGF 09">LGF09</option>
                    <option value="GF 01">GF01</option>
                    <option value="GF 02">GF02</option>
                    <option value="GF 03">GF03</option>
                    <option value="GF 04">GF04</option>
                    <option value="GF 05">GF05</option>
                    <option value="GF 06">GF06</option>
                    <option value="GF 07">GF07</option>
                    <option value="GF 08">GF08</option>
                    <option value="GF 09">GF09</option>
                    <option value="FF 01">FF01</option>
                    <option value="FF 02">FF02</option>
                    <option value="FF 03">FF03</option>
                    <option value="FF 04">FF04</option>
                    <option value="FF 05">FF05</option>
                    <option value="FF 06">FF06</option>
                    <option value="FF 07">FF07</option>
                    <option value="FF 08">FF08</option>
                    <option value="FF 09">FF09</option>
                    <option value="FF 10">FF10</option>
                    <option value="FF 11">FF11</option>
                    <option value="FF 12">FF12</option>
                    <option value="SF 01">SF01</option>
                    <option value="SF 02">SF02</option>
                    </>
                  )}
                  {formData.roomType === 'Lab' && (
                    <>
                    <option value="ICT Lab 01">ICT Lab 01</option>
                    <option value="ICT Lab 02">ICT Lab 02</option>
                    <option value="IOT & Robotics Lab">IOT & Robotics Lab</option>
                    <option value="ICT Research Lab">ICT Research Lab</option>
                    <option value="Multimedia Lab">Multimedia Lab</option>
                    <option value="Network & Security Lab">Network & Security Lab</option>
                    <option value="Interactive Media Lab">Interactive Media Lab</option>
                    <option value="Physics Lab">Physics Lab</option>
                    <option value="Remolesensation & GIS lab">Remolesensation & GIS lab</option>
                    <option value="Electronic Lab">Electronic Lab</option>
                    <option value="Geotechnics Lab">Geotechnics Lab</option>
                    <option value="Rock Mechanics Lab">Rock Mechanics Lab</option>
                    <option value="Geology Lab">Geology Lab</option>
                    <option value="Microbiology Lab">Microbiology Lab</option>
                    <option value="Engineering, Drawing & Mechanics Lab">Engineering, Drawing & Mechanics Lab</option>
                    <option value="Energy Lab">Energy Lab</option>
                    <option value="Properties of Meterial Lab">Properties of Meterial Lab</option>
                    <option value="Biotechnolgoy Lab">Biotechnolgoy Lab</option>
                    <option value="A/V Studio">A/V Studio</option>
                    <option value="Mechatronic Lab">Mechatronic Lab</option>
                    <option value="Environmental Lab">Environmental Lab</option>
                    <option value="Plastic Testing Lab">Plastic Testing Lab</option>
                    <option value="Agriculture Common Lab">Agriculture Common Lab</option>
                    <option value="Thermodynamics & Fluid Mechanics Lab">Thermodynamics & Fluid Mechanics Lab</option>
                    <option value="Chemestry Lab">Chemestry Lab</option>
                    <option value="Latex Processing Lab">Latex Processing Lab</option>
                    <option value="Food Processing Lab 02 Lab">Food Processing Lab 02 Lab</option>
                    <option value="Metierial Characterization Lab">Metierial Characterization Lab</option>
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
          <div className="request-successful-modal-overlay">
            <div className="request-successful-modal-content">
              <p>Booking request submitted successfully.</p>
              <button className="request-successful-modal-button" onClick={handleCloseModal}>OK</button>
            </div>
          </div>
        )}
      </div>
      <div className="lecbookingpage-requests-section">
        <h2>Your Booking Requests</h2>
        <div className="lecbookingpage-booking-requests">
          {bookingRequests.length > 0 ? (
            bookingRequests.map((request) => (
              <div className="lecbookingpage-lecturer-booking-card" key={request._id}>
                <h3>Booking Request</h3>
                <p><strong>Date:</strong> {new Date(request.date).toLocaleDateString()}</p>
                <p><strong>Time Slot:</strong> {request.timeSlot}</p>
                <p><strong>Subject:</strong> {request.subject}</p>
                <p><strong>Room Type:</strong> {request.roomType}</p>
                <p><strong>Room:</strong> {request.room}</p>
                <div className="lecbookingpage-booking-card-actions">
                  <button onClick={() => handleCancelRequest(request._id)} className="cancel-button">Cancel</button>
                </div>
              </div>
            ))
          ) : (
            <p>No booking requests found.</p>
          )}
        </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default LecturerBookingPage;
