import React from 'react';
import './home.css'
import heroleft from '../../assets/hero-left.png';
import heroright from '../../assets/hero-right.png';
import searchicon from '../../assets/Search.svg'

function Home() {
  return (
    <div className='hero-section'>
        <img src={heroleft} alt="" className='hero-left'/>
        <div className="search-container">
        <h2>Search</h2>
        <p>Search high-resolution images from Unsplash</p>
        <div className="input-container">
        <input type="text" placeholder='Enter your keywords...' />
        <img src={searchicon} alt="" className='search-icon' />
        </div>
        </div>
        <img src={heroright} alt=""  className='hero-right'/>
    </div>
  )
}

export default Home