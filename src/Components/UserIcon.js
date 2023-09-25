import React, { useState } from 'react';
import '../Style/UserIcon.css';
import userIcon from '../Assets/labixiaoxin.jpg';
import arrowRight from '../Assets/arrow-right.png';

export default function UserIcon() {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div className="container">
      <div
        className={`userIcon ${isHovered ? 'hovered' : ''}`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <img src={userIcon} alt="User Icon" />
      </div>
      <div
        className={`dropdown ${isHovered ? 'visible' : ''}`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <ul>
          <li className='userInfo'>
            <div>
              <p className='number'>50</p>
              <p className='type'>Follow</p>
            </div>
            <div>
              <p className='number'>10</p>
              <p className='type'>Follower</p>
            </div>
            <div>
              <p className='number'>4</p>
              <p className='type'>Articles</p>
            </div>
          </li>
          <li>Profile <img src={arrowRight} alt="Arrow Right" /></li>
          <li>Settings <img src={arrowRight} alt="Arrow Right" /></li>
          <li>Logout <img src={arrowRight} alt="Arrow Right" /></li>
        </ul>
      </div>
    </div>
  );
}
