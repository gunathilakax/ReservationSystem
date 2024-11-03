import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AdminNavBar from '../components/LecturerNavBar'; // Ensure this points to the correct navbar component
import './LectureHalls.css'; // Import the CSS file for styling

// Import images for the slideshow
import SlideImage1 from '../assets/lecture-halls-slide-show/slideshow1.jpg';
import SlideImage2 from '../assets/lecture-halls-slide-show/slideshow2.jpg';
import SlideImage3 from '../assets/lecture-halls-slide-show/slideshow3.jpg';

const AdminLectureHalls = () => {
  const [lectureHalls, setLectureHalls] = useState([]);
  const [activeTab, setActiveTab] = useState('LGF');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  const navigate = useNavigate();
  
  // Image array for slideshow
  const hallSlideImages = [SlideImage1, SlideImage2, SlideImage3];

  useEffect(() => {
    const fetchLectureHalls = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/lecturehalls');
        setLectureHalls(response.data);
      } catch (error) {
        console.error('Error fetching lecture halls:', error);
      }
    };

    fetchLectureHalls();

    // Slideshow logic
    const intervalId = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % hallSlideImages.length);
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(intervalId); // Clear interval on unmount
  }, []);

  const handleBookClick = (hallName) => {
    navigate('/Booking', {
      state: {
        roomType: 'Lecture Hall',
        room: hallName,
      },
    });
  };

  const renderLectureHalls = () => {
    return lectureHalls
      .filter(hall => hall['Hall No'].startsWith(activeTab))
      .map(hall => {
        return (
          <div key={hall._id} className="lec-lecture-hall-card">
            <h3>{hall['Hall No']}</h3>
            <p>Capacity: {hall.Capacity}</p>
            <p>Multimedia Projector: {hall['Multimedia Projector']}</p>
            <p>White Board: {hall['White Board']}</p>
            <p>TV: {hall.TV}</p>
            <p>Wall Fans: {hall['Wall Fans']}</p>
            <p>Ceiling Fans: {hall['Ceiling Fans']}</p>
            <p>Speakers: {hall.Speakers}</p>
            {/* Add the Book button here */}
            <button className='lec-book-button' onClick={() => handleBookClick(hall['Hall No'])}>Book</button>
          </div>
        );
      });
  };

  return (
    <div className="lec-lecture-halls-container">
      <AdminNavBar />
      <div className="lec-hall-slideshow">
        <div
          className="lec-hall-images"
          style={{
            transform: `translateX(-${currentImageIndex * 100}%)`,
            transition: 'transform 1s ease',
          }}
        >
          {hallSlideImages.map((image, index) => (
            <img key={index} src={image} alt={`Slide ${index + 1}`} className="lec-hall-image" />
          ))}
        </div>
      </div>
      <div className="lec-tabs">
        <button className={activeTab === 'LGF' ? 'active' : ''} onClick={() => setActiveTab('LGF')}>LGF</button>
        <button className={activeTab === 'GF' ? 'active' : ''} onClick={() => setActiveTab('GF')}>GF</button>
        <button className={activeTab === 'FF' ? 'active' : ''} onClick={() => setActiveTab('FF')}>FF</button>
        <button className={activeTab === 'SF' ? 'active' : ''} onClick={() => setActiveTab('SF')}>SF</button>
      </div>
      <div className="lec-lecture-halls-grid">
        {renderLectureHalls()}
      </div>
    </div>
  );
};

export default AdminLectureHalls;
