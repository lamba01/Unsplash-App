import React, { useState } from 'react';
import './navbar.css';
import logo from '../../assets/Logo.svg';
import { Link } from 'react-router-dom';

function Navbar() {
  const [activeMenuItem, setActiveMenuItem] = useState('Home');

  const handleClick = (menuItem) => {
    setActiveMenuItem(menuItem);
  };

  return (
    <div>
      <nav className="flex align-center">
        <img src={logo} alt="logo"/>
        <ul className='big-screens'>
          <li
            className={activeMenuItem === 'Home' ? 'active' : 'nav-item'}
            onClick={() => handleClick('Home')}
          >
            <Link to={`/`}><span>Home</span></Link>
          </li>
          <li
            className={activeMenuItem === 'Collections' ? 'active' : 'nav-item'}
            onClick={() => handleClick('Collections')}
          >
            <Link to={`/collections`}><span>Collections</span></Link>
          </li>
          {/* Add more menu items here if needed */}
        </ul>
      </nav>
    </div>
  );
}

export default Navbar;
