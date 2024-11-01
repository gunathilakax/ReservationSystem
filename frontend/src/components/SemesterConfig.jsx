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
        startMonth: startDate.toLocaleString('default', { month: 'long' }),
        startYear: startDate.getFullYear(),
        endMonth: endDate.toLocaleString('default', { month: 'long' }),
        endYear: endDate.getFullYear(),
      });
      setSuccess('Semester configuration saved successfully!');
      setStartDate(null);
      setEndDate(null);
    } catch (error) {
      setError('Failed to save semester configuration.');
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
        {error && <p className="semester-config-error">{error}</p>}
        {success && <p className="semester-config-success">{success}</p>}
      </form>
    </div>
  );
};

export default SemesterConfig;
