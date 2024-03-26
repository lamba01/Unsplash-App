import React, { useState } from 'react';
import './styles/navbar.css';
import logo from '../assets/Logo.svg';

function Navbar() {
  const [activeMenuItem, setActiveMenuItem] = useState('Home');

  const handleClick = (menuItem) => {
    setActiveMenuItem(menuItem);
  };

  return (
    <div>
      <nav className="flex align-center">
        <img src={logo} alt="logo" />
        <ul className='big-screens'>
          <li
            className={activeMenuItem === 'Home' ? 'active' : 'nav-item'}
            onClick={() => handleClick('Home')}
          >
            <span>Home</span>
          </li>
          <li
            className={activeMenuItem === 'Collections' ? 'active' : 'nav-item'}
            onClick={() => handleClick('Collections')}
          >
            <span>Collections</span>
          </li>
          {/* Add more menu items here if needed */}
        </ul>
      </nav>
    </div>
  );
}

export default Navbar;
