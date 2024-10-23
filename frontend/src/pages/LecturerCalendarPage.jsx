import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './LecturerCalendarPage.css';
import LecturerNavBar from '../components/LecturerNavBar';
import axios from 'axios';

const CalendarPage = () => {
  const [date, setDate] = useState(new Date());
  const [reservations, setReservations] = useState([]);
  const username = sessionStorage.getItem('username');

  const handleDateChange = async (newDate) => {
    setDate(newDate);
    const formattedDate = newDate.toISOString().split('T')[0]; // Format date as YYYY-MM-DD

    // Fetch reservations for the selected date
    try {
      const response = await axios.get('http://localhost:5000/api/reservations', {
        params: { username, date: formattedDate },
      });
      setReservations(response.data);
    } catch (err) {
      console.error('Failed to fetch reservations:', err);
    }
  };

  return (
    <div className="calendar-page">
      <LecturerNavBar />
      <div className="content">
        <h1>Calendar</h1>
        <Calendar
          onChange={handleDateChange}
          value={date}
          className="calendar"
        />
        <div className="selected-date">
          <h2>Selected Date: {date.toLocaleDateString()}</h2>
          <h3>Reservations for this date:</h3>
          {reservations.length === 0 ? (
            <p>No reservations found for this date.</p>
          ) : (
            reservations.map((reservation) => (
              <div className="reservation-card" key={reservation._id}>
                <h4>{reservation.room}</h4>
                <p>{new Date(reservation.date).toLocaleDateString()}</p>
                <p>Time Slot: {reservation.timeSlot}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default CalendarPage;
