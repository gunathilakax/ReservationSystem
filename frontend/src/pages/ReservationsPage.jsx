import React, { useState, useEffect } from 'react';
import LecturerNavBar from '../components/LecturerNavBar'; // Adjust the path as needed
import axios from 'axios';
import './ReservationsPage.css';

const ReservationsPage = () => {
  const [reservations, setReservations] = useState([]);
  const [username, setUsername] = useState(sessionStorage.getItem('username'));

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/reservations', {
          params: { username },
        });

        // Sort reservations by date in ascending order
        const sortedReservations = response.data.sort((a, b) => new Date(a.date) - new Date(b.date));
        setReservations(sortedReservations);
      } catch (err) {
        console.error('Failed to fetch reservations:', err);
      }
    };

    fetchReservations();
  }, [username]);

  const isPastReservation = (date) => new Date(date) < new Date();

  return (
    <div className="my-reservations-page">
      <LecturerNavBar />
      <div className="my-reservation-content">
        <h2>My Reservations</h2>
        <div className="my-reservations-list">
          {reservations.length === 0 ? (
            <p>No reservations found.</p>
          ) : (
            reservations.map((reservation) => (
              <div
                className={`my-reservation-card ${isPastReservation(reservation.date) ? 'past' : ''}`}
                key={reservation._id}
              >
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
