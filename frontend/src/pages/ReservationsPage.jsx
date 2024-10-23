import React, { useState, useEffect } from 'react';
import LecturerNavBar from '../components/LecturerNavBar'; // Adjust the path as needed
import axios from 'axios';
import './ReservationsPage.css'; // Create a separate CSS file for styling the cards

const ReservationsPage = () => {
  const [reservations, setReservations] = useState([]);
  const [username, setUsername] = useState(sessionStorage.getItem('username')); // Assuming username is stored in sessionStorage

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/reservations', {
          params: { username },
        });
        setReservations(response.data);
      } catch (err) {
        console.error('Failed to fetch reservations:', err);
      }
    };

    fetchReservations();
  }, [username]);

  return (
    <div className="reservations-page">
      <LecturerNavBar />
      <div className="content">
        <h1>My Reservations</h1>
        <div className="reservations-list">
          {reservations.length === 0 ? (
            <p>No reservations found.</p>
          ) : (
            reservations.map((reservation) => (
              <div className="reservation-card" key={reservation._id}>
                <h3>{reservation.room}</h3>
                <p>Date: {new Date(reservation.date).toLocaleDateString()}</p>
                <p>Time Slot: {reservation.timeSlot}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ReservationsPage;
