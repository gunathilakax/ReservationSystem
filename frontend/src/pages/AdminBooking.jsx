import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import AdminNavBar from '../components/AdminNavBar';
import Footer from '../components/Footer'; 
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
    subject: bookingRequest ? bookingRequest.subject : ' ',
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
  const [semester, setSemester] = useState({ start: {}, end: {} }); // State to hold semester data

  // Fetch semester configuration
  useEffect(() => {
    const fetchSemester = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/semester'); // Adjust the URL as necessary
        setSemester(response.data);
      } catch (error) {
        console.error('Failed to fetch semester configuration:', error);
      }
    };

    fetchSemester();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleRoomTypeChange = (e) => {
    const { value } = e.target;
    setFormData({ ...formData, roomType: value, room: '' });
  };

  const checkExistingReservations = async (reservation) => {
    try {
      const response = await axios.get('http://localhost:5000/api/reservations', {
        params: {
          room: reservation.room,
          date: reservation.date,
          timeSlot: reservation.timeSlot,
        },
      });
      return response.data.length > 0; // Returns true if there are existing reservations
    } catch (error) {
      console.error('Error checking existing reservations:', error);
      return false; // Return false if there's an error, allowing the booking to proceed
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const startDate = new Date(formData.date);
      const endDate = new Date(semester.end.year, new Date(Date.parse(`${semester.end.month} 1`)).getMonth() + 1, 0); // Last day of the end month

      const reservationDates = [];

      if (setForEveryWeek) {
        // Generate reservations for every week until the end month
        while (startDate <= endDate) {
          reservationDates.push({
            ...formData,
            date: formatDate(startDate), // Format date for submission
          });
          // Move to next week
          startDate.setDate(startDate.getDate() + 7);
        }
      } else {
        // Just add the single reservation date
        reservationDates.push({
          ...formData,
          date: formatDate(startDate),
        });
      }

      // Check for existing reservations before submitting
      const conflictingReservations = await Promise.all(reservationDates.map(checkExistingReservations));

      if (conflictingReservations.some((conflict) => conflict)) {
        setError('Already Booked for the selected date and time slot.');
        return;
      }

      // Submit all reservations in one go
      await Promise.all(reservationDates.map(reservation => 
        axios.post('http://localhost:5000/api/reservations', reservation)
      ));

      setShowModal(true);
      setFormData({
        fullName: '',
        username: '',
        email: '',
        phone: '',
        department: '',
        subject: '',
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
    <div className="admin-booking-page">
    <div className="admin-booking-container">
      <AdminNavBar />
      <div className="admin-booking-background">
      <div className="admin-booking-form-section">
        <h2>Book a Room</h2>
        
        {/* Display semester information */}
        <div className="semester-info">
          <h3>Current Semester:</h3>
          <p>Start: {semester.start.month} {semester.start.year}</p>
          <p>End: {semester.end.month} {semester.end.year}</p>
        </div>

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
            <label>Subject:</label> {/* New subject input field */}
            <input type="text" name="subject" value={formData.subject} onChange={handleChange} required />
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
            <label>Repeat weekly until semester end:</label>
            <input
              type="checkbox"
              checked={setForEveryWeek}
              onChange={(e) => setSetForEveryWeek(e.target.checked)}
            />
          </div>
          {error && <p className="error-message">{error}</p>}
          <button type="submit">Submit Booking</button>
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
    </div>
    <Footer />
    </div>
  );
};

export default AdminBooking;
