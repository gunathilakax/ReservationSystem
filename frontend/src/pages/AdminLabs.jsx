// src/pages/AdminLabs.jsx
import React, { useEffect, useState } from 'react';
import AdminNavBar from '../components/AdminNavBar';
import axios from 'axios';
import './AdminLabs.css';

// Import images for the slideshow
import LabImage1 from '../assets/labs-slide-show/lab1.jpg';
import LabImage2 from '../assets/labs-slide-show/lab2.jpg';
import LabImage3 from '../assets/labs-slide-show/lab3.jpg';

const AdminLabs = () => {
  const [labs, setLabs] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const labImages = [LabImage1, LabImage2, LabImage3]; // Array of lab images

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

    const intervalId = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % labImages.length);
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(intervalId); // Clear interval on unmount
  }, []);


  return (
    <div className="admin-labs-page">
      <AdminNavBar />
      <div className="admin-labs-slideshow">
      <div
          className="admin-lab-images"
          style={{ transform: `translateX(-${currentImageIndex * 100}%)` }}
        >
          {labImages.map((image, index) => (
            <img key={index} src={image} alt={`Lab ${index + 1}`} className="admin-lab-image" />
          ))}
      </div>
      </div>
      <div className="admin-labs-container">
        {labs.map((lab) => (
          <div key={lab._id} className="admin-lab-card">
            <h3>{lab.LabName}</h3>
            <p>Department: {lab.Department}</p>
            <p>Capacity: {lab.Capacity}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminLabs;
