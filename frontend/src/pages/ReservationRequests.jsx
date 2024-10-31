import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import AdminNavBar from '../components/AdminNavBar';
import './ReservationRequests.css';

const ReservationRequests = () => {
  const [bookingRequests, setBookingRequests] = useState([]);
  const [expandedCard, setExpandedCard] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    const fetchAllBookingRequests = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/bookingrequests');
        setBookingRequests(response.data);
      } catch (error) {
        setError('Error fetching booking requests.');
        console.error('Error fetching booking requests:', error);
      }
    };

    fetchAllBookingRequests();
  }, []);

  // Get booked card IDs from local storage
  const getBookedCardIds = () => {
    const bookedCards = localStorage.getItem('bookedCards');
    return bookedCards ? JSON.parse(bookedCards) : [];
  };

  const [bookedCardIds, setBookedCardIds] = useState(getBookedCardIds());

  const handleCardClick = (id) => {
    if (expandedCard === id) {
      setExpandedCard(null);
    } else {
      setExpandedCard(id);
    }
  };

  const handleBookClick = (request) => {
    // Add the booking request ID to the booked cards
    const updatedBookedCardIds = [...bookedCardIds, request._id];
    setBookedCardIds(updatedBookedCardIds);
    localStorage.setItem('bookedCards', JSON.stringify(updatedBookedCardIds)); // Save to local storage

    // Navigate to AdminBooking page and pass request data as state
    navigate('/admin-booking', { state: { bookingRequest: request } });
  };

  return (
    <div className="reservation-requests-container">
      <AdminNavBar />
      <h2>All Booking Requests</h2>
      {error && <p className="reservation-requests-error">{error}</p>}
      <div className="reservation-requests">
        {bookingRequests.length > 0 ? (
          bookingRequests.map((request) => (
            <div
              className={`reservation-requests-card ${bookedCardIds.includes(request._id) ? 'booked' : ''} ${expandedCard === request._id ? 'expanded' : ''}`}
              key={request._id}
              onClick={() => handleCardClick(request._id)}
            >
              <h3>{request.fullName}</h3>
              <p>{request.email}</p>
              {expandedCard === request._id && (
                <div className="reservation-requests-expanded-details">
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
                    className="reservation-requests-book-button" 
                    onClick={(e) => {
                      e.stopPropagation();
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
