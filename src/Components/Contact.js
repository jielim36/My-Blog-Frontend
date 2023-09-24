import React from 'react'
import github_logo from '../Assets/github.png';
import '../Style/Contact.css';
import instagram_logo from '../Assets/instagram.png';
import linkedin_logo from '../Assets/Linkedin.png';

export default function Contact() {
  return (
    <div className="contact">
        <div className="contact-images">
            <a href="https://github.com/jielim36" target="_blank" rel="noopener noreferrer">
                <img src={github_logo} alt="github" />
            </a>
            <a href="https://www.linkedin.com/in/lim-yee-jie-589058263/" target="_blank" rel="noopener noreferrer">
                <img src={linkedin_logo} alt="linkedin" />
            </a>
            <a href="link3.html" target="_blank" rel="noopener noreferrer">
                <img src={instagram_logo} alt="instagram" />
            </a>
        </div>
    </div>
  )
}
