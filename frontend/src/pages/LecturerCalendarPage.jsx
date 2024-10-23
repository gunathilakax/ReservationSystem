import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // Importing the default styles
import './LecturerCalendarPage.css'; // Optional: You can create a CSS file for additional styles
import LecturerNavBar from '../components/LecturerNavBar'; // Import the LecturerNavBar

const CalendarPage = () => {
  const [date, setDate] = useState(new Date());

  const handleDateChange = (newDate) => {
    setDate(newDate);
    // Here you can also implement functionality to show reservations for the selected date
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
          {/* Additional information or functionality can be displayed here */}
        </div>
      </div>
    </div>
  );
};

export default CalendarPage;
