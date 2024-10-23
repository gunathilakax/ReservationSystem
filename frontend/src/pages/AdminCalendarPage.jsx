import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // Importing the default styles
import './AdminCalendarPage.css'; // Optional: Create a CSS file for additional styles
import AdminNavBar from '../components/AdminNavBar'; // Import the AdminNavBar

const AdminCalendarPage = () => {
  const [date, setDate] = useState(new Date());

  const handleDateChange = (newDate) => {
    setDate(newDate);
    // Here you can also implement functionality to show reservations or other data for the selected date
  };

  return (
    <div className="admin-calendar-page">
      <AdminNavBar />
      <div className="content">
        <h1>Admin Calendar</h1>
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

export default AdminCalendarPage;
