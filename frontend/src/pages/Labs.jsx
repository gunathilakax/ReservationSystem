import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import LecturerNavBar from '../components/LecturerNavBar';
import Footer from '../components/Footer';
import './Labs.css';
import LabImage1 from '../assets/labs-slide-show/Lab1.jpg';
import LabImage2 from '../assets/labs-slide-show/Lab2.jpg';
import LabImage3 from '../assets/labs-slide-show/Lab3.jpg';

const Labs = () => {
  const [labs, setLabs] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const navigate = useNavigate();

  // Image array for slideshow
  const labImages = [LabImage1, LabImage2, LabImage3];

  useEffect(() => {
    const fetchLabs = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/labs');
        setLabs(response.data);
      } catch (error) {
        console.error('Error fetching labs:', error);
      }
    };

    fetchLabs();

    // Slideshow logic
    const intervalId = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % labImages.length);
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(intervalId); // Clear interval on unmount
  }, []);

  const handleBookLab = (hallName) => {
    console.log(hallName);
    navigate('/Booking', {
      state: {
        roomType: 'Lab',
        room: hallName,
      },
    });
  };

  return (
    <div className="lec-lab-page">
    <div className="lec-labs-container">
      <LecturerNavBar />
      <div className="lec-lab-slideshow">
        <div
          className="lec-lab-images"
          style={{ transform: `translateX(-${currentImageIndex * 100}%)` }}
        >
          {labImages.map((image, index) => (
            <img key={index} src={image} alt={`Lab ${index + 1}`} className="lec-lab-image" />
          ))}
        </div>
      </div>
      <div className="lec-labs-grid">
        {labs.map((lab) => (
          <div key={lab._id} className="lec-lab-card">
            <h3>{lab.LabName}</h3>
            <p>Department: {lab.Department}</p>
            <p>Capacity: {lab.Capacity}</p>
            <button className='lec-lab-book-button' onClick={() => handleBookLab(lab.LabName)}>Book</button>
          </div>
        ))}
      </div>
      
      </div>
      <Footer />
    </div>
  );
};

export default Labs;
