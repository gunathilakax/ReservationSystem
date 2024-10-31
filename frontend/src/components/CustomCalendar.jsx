// src/components/CustomCalendar.jsx
import React from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './CustomCalendar.css'; // Import your custom styles

const CustomCalendar = ({ date, onDateChange }) => {
  return (
    <Calendar
      onChange={onDateChange}
      value={date}
      className="calendar"
    />
  );
};

export default CustomCalendar;
