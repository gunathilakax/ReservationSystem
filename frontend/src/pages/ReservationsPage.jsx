import React, { useState, useEffect } from 'react';
import LecturerNavBar from '../components/LecturerNavBar'; // Adjust the path as needed
import axios from 'axios';
import './ReservationsPage.css';

const ReservationsPage = () => {
  const [reservations, setReservations] = useState([]);
  const [username, setUsername] = useState(sessionStorage.getItem('username'));
  const [selectedWeekday, setSelectedWeekday] = useState('All');
  const [selectedRoomType, setSelectedRoomType] = useState('All');

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

  const handleWeekdayChange = (event) => {
    setSelectedWeekday(event.target.value);
  };

  const handleRoomTypeChange = (event) => {
    setSelectedRoomType(event.target.value);
  };

  // Define available weekdays and room types
  const weekdays = ['All', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const roomTypes = ['All', 'Lecture Hall', 'Lab', 'Seminar Room'];

  // Filter reservations based on selected weekday and room type
  const filteredReservations = reservations.filter(reservation => {
    const reservationDate = new Date(reservation.date);
    const reservationWeekday = reservationDate.toLocaleString('default', { weekday: 'long' });

    const matchesWeekday = selectedWeekday === 'All' || reservationWeekday === selectedWeekday;
    const matchesRoomType = selectedRoomType === 'All' || reservation.roomType === selectedRoomType;

    return matchesWeekday && matchesRoomType;
  });

  return (
    <div className="my-reservations-page">
      <LecturerNavBar />
      <div className="my-reservation-content">
        <h2>My Reservations</h2>

        <div className="filters">
          <div className="weekday-selector">
            <label htmlFor="weekday">Select Weekday: </label>
            <select id="weekday" value={selectedWeekday} onChange={handleWeekdayChange}>
              {weekdays.map((weekday) => (
                <option key={weekday} value={weekday}>
                  {weekday}
                </option>
              ))}
            </select>
          </div>

          <div className="room-type-selector">
            <label htmlFor="roomType">Select Room Type: </label>
            <select id="roomType" value={selectedRoomType} onChange={handleRoomTypeChange}>
              {roomTypes.map((roomType) => (
                <option key={roomType} value={roomType}>
                  {roomType}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="my-reservations-list">
          {filteredReservations.length === 0 ? (
            <p>No reservations found for the selected filters.</p>
          ) : (
            filteredReservations.map((reservation) => (
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
