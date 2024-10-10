import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AdminNavBar from '../components/AdminNavBar'; // Adjust the path if necessary
import './AdminBooking.css'; // Make sure to create this CSS file for styles

const ReservationRequests = () => {
  const [bookingRequests, setBookingRequests] = useState([]);
  const [expandedCard, setExpandedCard] = useState(null); // To track which card is expanded
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchAllBookingRequests = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/bookingrequests');
        console.log(response.data); // Log response for debugging
        setBookingRequests(response.data);
      } catch (error) {
        setError('Error fetching booking requests.');
        console.error('Error fetching booking requests:', error);
      }
    };

    fetchAllBookingRequests();
  }, []);

  const handleCardClick = (id) => {
    if (expandedCard === id) {
      setExpandedCard(null); // Collapse if the same card is clicked
    } else {
      setExpandedCard(id); // Expand the clicked card
    }
  };

  const handleBookClick = (request) => {
    // Handle booking logic here
    alert(`Booking confirmed for ${request.fullName}`);
    // You can add more logic to process the booking if needed
  };

  return (
    <div className="admin-booking-container">
      <AdminNavBar /> {/* Include AdminNavBar here */}
      <h2>All Booking Requests</h2>
      {error && <p className="error">{error}</p>}
      <div className="booking-requests">
        {bookingRequests.length > 0 ? (
          bookingRequests.map((request) => (
            <div
              className={`booking-card ${expandedCard === request._id ? 'expanded' : ''}`}
              key={request._id}
              onClick={() => handleCardClick(request._id)}
            >
              <h3>{request.fullName}</h3>
              <p>{request.email}</p>
              {expandedCard === request._id && (
                <div className="expanded-details">
                  <p><strong>Phone:</strong> {request.phone}</p>
                  <p><strong>Department:</strong> {request.department}</p>
                  <p><strong>Number of Students:</strong> {request.numberOfStudents}</p>
                  <p><strong>Room Type:</strong> {request.roomType}</p>
                  <p><strong>Room:</strong> {request.room}</p>
                  <p><strong>Date:</strong> {new Date(request.date).toLocaleDateString()}</p>
                  <p><strong>Duration:</strong> {request.duration}</p>
                  <p><strong>Time Slot:</strong> {request.timeSlot}</p>
                  <p><strong>Note:</strong> {request.note}</p>
                  <button 
                    className="book-button" 
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent triggering card click
                      handleBookClick(request);
                    }}
                  >
                    Book
                  </button>
                </div>
              )}
            </div>
          ))
        ) : (
          <p>No booking requests found.</p>
        )}
      </div>
    </div>
  );
};

export default ReservationRequests;
