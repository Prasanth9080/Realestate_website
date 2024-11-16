import React from "react";
import './Footer.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faInstagram, faYoutube, faTwitter } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
    return(
        <div>
<footer>
  <div class="footer-container">
    <div class="footer-content">
      <div class="footer-logo">
        <h2>ProPerties</h2>
      </div>
      <ul className="social-icons">
            <li>
              <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faFacebookF} />
              </a>
            </li>
            <li>
              <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faInstagram} />
              </a>
            </li>
            <li>
              <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faYoutube} />
              </a>
            </li>
            <li>
              <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faTwitter} />
              </a>
            </li>
          </ul>
      <ul class="footer-menu">
        <li><a href='/home'>Home</a></li>
        <li><a href='/about'>About</a></li>
        <li><a href='/service'>Services</a></li>
        <li><a href='/contact'>Contact</a></li>
      </ul>
      <p>&copy; 2024 Your Company. All Rights Reserved.</p>
    </div>
  </div>
</footer>
        </div>
    ) 
}


export default Footer

