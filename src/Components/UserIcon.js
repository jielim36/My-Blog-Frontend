import React , { useState }from 'react';
import '../Style/UserIcon.css';
import Ikun from '../Assets/ikun.png';
import arrowDown from '../Assets/arrow-down.png';
import arrowRight from '../Assets/arrow-right.png';

export default function UserIcon() {

    const [isHovered, setIsHovered] = useState(false);

    return (
        <div className="container">
            <div
                className={`userIcon ${isHovered ? 'hovered' : ''}`}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <img src={Ikun} />
            </div>
            <div className={`dropdown ${isHovered ? 'visible' : ''}`}>
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
                    <li>Profile <img src={arrowRight} /></li>
                    <li>b<img src={arrowRight} /></li>
                    <li>Logout<img src={arrowRight} /></li>
                </ul>
            </div>
        </div>
    );

  
}
