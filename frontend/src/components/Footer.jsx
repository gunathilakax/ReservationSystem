import React from 'react';
import './Footer.css';
import FBImage from '../assets/social-image.png';
import InstaImage from '../assets/instagram-image.png';


const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
      <div className="footer-section-1">
        <h5 className="footer-heading">INFO</h5>
        <ul className="footer-list">
          <li><a href="https://technology.sjp.ac.lk" className="footer-link">Faculty of Technology</a></li>
          <li><a href="https://it.sjp.ac.lk" className="footer-link">Center for IT Services</a></li>
          <li><a href="https://www.sjp.ac.lk" className="footer-link">University of Sri Jayewardenepura</a></li>
          <li><a href="https://facebook.com" className="footer-link">Facebook</a></li>
          <li><a href="https://youtube.com" className="footer-link">YouTube</a></li>
        </ul>
      </div>
      <div className="footer-section-2">
        <h3 className="footer-heading">CONTACT US</h3>
        <p className="footer-text">Pitipana, Homagama, Sri Lanka</p>
        <p className="footer-text"><span role="img" aria-label="phone">📞</span> Phone: +94 111 222 333</p>
        <p className="footer-text"><span role="img" aria-label="email">📧</span> E-mail: <a href="mailto:example@fot.sjp.ac.lk" className="footer-link">help@fot.sjp.ac.lk</a></p>
      </div>
      <div className="footer-section-3">
        <h3 className="footer-heading">GET SOCIAL</h3>
        <a href="https://facebook.com" className="footer-icon"><img src={FBImage} alt="Facebook" className="social-icon" /></a>
        <a href="https://facebook.com" className="footer-icon"><img src={InstaImage} alt="Instagram" className="insta-icon" /></a>
      </div>
      </div>
    </footer>
  );
};

export default Footer;
