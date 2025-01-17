// src/pages/LecturerCalendarPage.jsx
import React, { useState } from 'react';
import './LecturerCalendarPage.css';
import LecturerNavBar from '../components/LecturerNavBar';
import Footer from '../components/Footer';
import axios from 'axios';
import CustomCalendar from '../components/CustomCalendar';

const CalendarPage = () => {
  const [date, setDate] = useState(new Date());
  const [reservations, setReservations] = useState([]);
  const username = sessionStorage.getItem('username');

  const handleDateChange = async (newDate) => {
    setDate(newDate);

    // Format the date as YYYY-MM-DD in local time
    const formattedDate = newDate.toLocaleDateString('en-CA'); // Use 'en-CA' to get YYYY-MM-DD format

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
    <div className="lec-calendar-page">
      <div className="lec-calendar-page-content">
      <LecturerNavBar />
      
      <div className="lec-calendar-content">
        <h1>Calendar</h1>
        <CustomCalendar date={date} onDateChange={handleDateChange} />
        <div className="lec-calendar-selected-date">
          <h2>Selected Date: {date.toLocaleDateString()}</h2>
          <h3>Reservations for this date:</h3>
          {reservations.length === 0 ? (
            <p>No reservations found for this date.</p>
          ) : (
            <div className="lec-calendar-reservations-list">
              {reservations.map((reservation) => (
                <div className="lec-calendar-reservation-card" key={reservation._id}>
                  <h4>{reservation.room}</h4>
                  <p>{new Date(reservation.date).toLocaleDateString()}</p>
                  <p>Time Slot: {reservation.timeSlot}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      </div>
      <Footer />
    </div>
  );
};

export default CalendarPage;
