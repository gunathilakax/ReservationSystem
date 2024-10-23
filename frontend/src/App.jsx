// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AdminPage from './pages/AdminPage';
import LecturerPage from './pages/LecturerPage';
import AdminProfilePage from './pages/AdminProfilePage';
import ProfilePage from './pages/ProfilePage';
import LoginPage from './pages/LoginPage';
import AdminLecturerPage from './pages/AdminLecturerPage';
import AdminBooking from './pages/AdminBooking';
import ReservationRequests from './pages/ReservationRequests';
import LectureHalls from './pages/LectureHalls';
import AdminLectureHalls from './pages/AdminLectureHalls';
import Labs from './pages/Labs';
import AdminLabs from './pages/AdminLabs';
import ReservationsPage from './pages/ReservationsPage';
import LecturerBookingPage from './pages/LecturerBookingPage';
import LecturerCalendarPage from './pages/LecturerCalendarPage';
import AdminCalendarPage from './pages/AdminCalendarPage';


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/lecturer" element={<LecturerPage />} />
        <Route path="/admin-profile" element={<AdminProfilePage />} />
        <Route path="/profile" element={<ProfilePage/>} />
        <Route path="/lectures" element={<AdminLecturerPage />} />
        <Route path="/admin-booking" element={<AdminBooking />} />
        <Route path="/reservation-requests" element={<ReservationRequests />} />
        <Route path="/lecture-halls" element={<LectureHalls />} />
        <Route path="/admin-lecture-halls" element={<AdminLectureHalls />} />
        <Route path="/labs" element={<Labs />} />
        <Route path="/admin-labs" element={<AdminLabs />} />
        <Route path="/reservations" element={<ReservationsPage />} />
        <Route path="/booking" element={<LecturerBookingPage />} /> {/* Add route */}
        <Route path="/calendar" element={<LecturerCalendarPage />} />
        <Route path="/admin-calendar" element={<AdminCalendarPage />} />
      </Routes>
    </Router>
  );
};

export default App;
