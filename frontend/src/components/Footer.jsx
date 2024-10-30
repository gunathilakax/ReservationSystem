import React from 'react';
import './Footer.css'; // Import the CSS file

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="info-section">
          <h3 className="footer-title">INFO</h3>
          <ul className="footer-links">
            <li><a href="https://tech.sjp.ac.lk/">Faculty of Technology</a></li>
            <li><a href="https://www.sjp.ac.lk/cits/">Center for IT Services</a></li>
            <li><a href="https://www.sjp.ac.lk/">University of Sri Jayewardenepura</a></li>
            <li><a href="https://web.facebook.com/FOTUSJP/?_rdc=1&_rdr">Facebook</a></li>
            <li><a href="https://www.youtube.com/c/FacultyofTechnology/?sub_confirmation=1">YouTube</a></li>
          </ul>
        </div>

        <div className="contact-section">
          <h3 className="footer-title">Contact Us</h3>
          <p className="contact-info">
            Pitipana, Homagama,<br />Sri Lanka
          </p>
          <p>Email: <a href="mailto:help@fot.sjp.ac.lk">help@fot.sjp.ac.lk</a></p>
          <p>Phone: <a href="tel:+94113438555">0113 438 555</a></p>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container footer-bottom-container">
          <p>&copy; 2023 your company. All rights reserved</p>

          <ul className="social-links">
            <li><a href="https://web.facebook.com/FOTUSJP/?_rdc=1&_rdr"><i className="fab fa-facebook fa-lg"></i></a></li>
            <li><a href="https://www.youtube.com/c/FacultyofTechnology/?sub_confirmation=1"><i className="fab fa-youtube fa-lg"></i></a></li>
            <li><a href="#"><i className="fab fa-instagram fa-lg"></i></a></li>
            <li><a href="#"><i className="fab fa-linkedin fa-lg"></i></a></li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
