import React, { useState } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './SemesterConfig.css'; // Optional: Create a CSS file for styling

const SemesterConfig = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Function to save semester configuration
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!startDate || !endDate) {
      setError('Both start and end dates are required.');
      return;
    }

    try {
      await axios.post('http://localhost:5000/api/semester', {
        start: {
          month: startDate.toLocaleString('default', { month: 'long' }),
          year: startDate.getFullYear(),
        },
        end: {
          month: endDate.toLocaleString('default', { month: 'long' }),
          year: endDate.getFullYear(),
        },
      });
      setSuccess('Semester configuration saved successfully!');
      setStartDate(null);
      setEndDate(null);
    } catch (error) {
      setError('Failed to save semester configuration.');
    }
  };

  // Function to reset semester configuration and delete all reservations
  const handleReset = async () => {
    setError('');
    setSuccess('');

    try {
      await axios.delete('http://localhost:5000/api/semester/reset');
      setSuccess('Semester configuration and all reservations deleted successfully!');
      setStartDate(null);
      setEndDate(null);
    } catch (error) {
      setError('Failed to reset semester configuration and delete reservations.');
    }
  };

  return (
    <div className="semester-config-container">
      <h2>Set Semester Start and End Month</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Start Month:</label>
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            showMonthYearPicker
            dateFormat="MMMM yyyy"
            placeholderText="Select Start Month"
            required
          />
        </div>
        <div>
          <label>End Month:</label>
          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            showMonthYearPicker
            dateFormat="MMMM yyyy"
            placeholderText="Select End Month"
            required
          />
        </div>
        <button type="submit">Save</button>
        <button type="button" onClick={handleReset} className="reset-button">Reset</button>
        {error && <p className="semester-config-error">{error}</p>}
        {success && <p className="semester-config-success">{success}</p>}
      </form>
    </div>
  );
};

export default SemesterConfig;
