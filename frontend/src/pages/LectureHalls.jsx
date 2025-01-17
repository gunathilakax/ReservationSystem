import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AdminNavBar from '../components/LecturerNavBar';
import Footer from '../components/Footer'; 
import './LectureHalls.css';
import LectureHallImage from '../assets/Lecture_Hall.jpg';
import DefaultImage from '../assets/lecture-halls/default.png'; // Import the default image

// Import images for the slideshow
import SlideImage1 from '../assets/lecture-halls-slide-show/slideshow1.jpg';
import SlideImage2 from '../assets/lecture-halls-slide-show/slideshow2.jpg';
import SlideImage3 from '../assets/lecture-halls-slide-show/slideshow3.jpg';

// Import images for specific halls
import LGF01Image from '../assets/lecture-halls/LGF_01.jpg';
import LGF02Image from '../assets/lecture-halls/LGF_02.jpg';
import LGF03Image from '../assets/lecture-halls/LGF_03.jpg';
import LGF04Image from '../assets/lecture-halls/LGF_04.jpg';
import LGF05Image from '../assets/lecture-halls/LGF_05.jpg';
import LGF06Image from '../assets/lecture-halls/LGF_06.jpg';
import LGF07Image from '../assets/lecture-halls/LGF_07.jpg';
import LGF08Image from '../assets/lecture-halls/LGF_08.jpg';
import LGF09Image from '../assets/lecture-halls/LGF_09.jpg';
import GF01Image from '../assets/lecture-halls/GF_01.jpg';
import GF02Image from '../assets/lecture-halls/GF_02.jpg';
import GF03Image from '../assets/lecture-halls/GF_03.jpg';
import GF04Image from '../assets/lecture-halls/GF_04.jpg';
import GF05Image from '../assets/lecture-halls/GF_05.jpg';
import GF06Image from '../assets/lecture-halls/GF_06.jpg';
import GF07Image from '../assets/lecture-halls/GF_07.jpg';
import GF08Image from '../assets/lecture-halls/GF_08.jpg';
import GF09Image from '../assets/lecture-halls/GF_09.jpg';
import FF01Image from '../assets/lecture-halls/FF_01.jpg';
import FF02Image from '../assets/lecture-halls/FF_02.jpg';
import FF03Image from '../assets/lecture-halls/FF_03.jpg';
import FF04Image from '../assets/lecture-halls/FF_04.jpg';
import FF05Image from '../assets/lecture-halls/FF_05.jpg';
import FF06Image from '../assets/lecture-halls/FF_06.jpg';
import FF07Image from '../assets/lecture-halls/FF_07.jpg';
import FF08Image from '../assets/lecture-halls/FF_08.jpg';
import FF09Image from '../assets/lecture-halls/FF_09.jpg';
import FF10Image from '../assets/lecture-halls/FF_10.jpg';
import FF11Image from '../assets/lecture-halls/FF_11.jpg';
import FF12Image from '../assets/lecture-halls/FF_12.jpg';
import SF01Image from '../assets/lecture-halls/SF_01.jpg';
import SF02Image from '../assets/lecture-halls/SF_02.jpg';

const hallImageMapping = {
  'LGF 01': LGF01Image,
  'LGF 02': LGF02Image,
  'LGF 03': LGF03Image,
  'LGF 04': LGF04Image,
  'LGF 05': LGF05Image,
  'LGF 06': LGF06Image,
  'LGF 07': LGF07Image,
  'LGF 08': LGF08Image,
  'LGF 09': LGF09Image,
  'GF 01': GF01Image,
  'GF 02': GF02Image,
  'GF 03': GF03Image,
  'GF 04': GF04Image,
  'GF 05': GF05Image,
  'GF 06': GF06Image,
  'GF 07': GF07Image,
  'GF 08': GF08Image,
  'GF 09': GF09Image,
  'FF 01': FF01Image,
  'FF 02': FF02Image,
  'FF 03': FF03Image,
  'FF 04': FF04Image,
  'FF 05': FF05Image,
  'FF 06': FF06Image,
  'FF 07': FF07Image,
  'FF 08': FF08Image,
  'FF 09': FF09Image,
  'FF 10': FF10Image,
  'FF 11': FF11Image,
  'FF 12': FF12Image,
  'SF 01': SF01Image,
  'SF 02': SF02Image
};

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
        const hallImage = hallImageMapping[hall['Hall No']] || DefaultImage;
        return (
          <div key={hall._id} className="lec-lecture-hall-card">
            <img src={hallImage} alt={hall['Hall No']} className="lec-hall-card-image" />
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
    <div className="lec-lecture-halls-page">
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
      <div className="lec-lecture-hall-section">
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
      </div>
      <Footer />
    </div>
  );
};

export default AdminLectureHalls;
