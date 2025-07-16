import React from 'react';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-grid">
        <div>
          <h4>Visit Us</h4>
          <p>
            A20, Murlikala Colony,<br />
            Gopalpura Bypass, Tank Road,<br />
            Jaipur, Rajasthan - 302018
          </p>
        </div>

        <div>
          <h4>Courses</h4>
          <ul>
            <li>Front End Development</li>
            <li>Back End Development</li>
            <li>Graphics Designing</li>
            <li>UI UX Designing</li>
          </ul>
        </div>

        <div>
          <h4>More Links</h4>
          <ul>
            <li>About Us</li>
            <li>Contact Us</li>
            <li>Terms & Condition</li>
            <li>Privacy Policy</li>
          </ul>
        </div>

        <div>
          <h4>Social Links</h4>
          <div className="social-icons">
            <a href="#"><i className="fab fa-facebook-f" /></a>
            <a href="#"><i className="fab fa-instagram" /></a>
            <a href="#"><i className="fab fa-linkedin" /></a>
            <a href="#"><i className="fab fa-youtube" /></a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>Copyright © 2024 | All Rights Reserved</p>
        <p>Managed & Hosted by Full Stack Learning</p>
      </div>
    </footer>
  );
};

export default Footer;
