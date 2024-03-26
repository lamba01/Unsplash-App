import React from 'react';
import heroleft from '../../assets/hero-left.png';
import heroright from '../../assets/hero-right.png';

function Home() {
  return (
    <div className='hero-section'>
        <img src={heroleft} alt="" />
        <h2>Search</h2>
        <p>Search high-resolution images from Unsplash</p>
        <input type="text" placeholder='Enter your keywords...' />
        <img src={heroright} alt="" />
    </div>
  )
}

export default Home