import React from 'react';
import './home.css'
import heroleft from '../../assets/hero-left.png';
import heroright from '../../assets/hero-right.png';
import SearchInput from '../../components/search/SearchInput';

function Home() {
  return (
    <div className='hero-section'>
        <img src={heroleft} alt="" className='hero-left'/>
        <div className="search-container">
        <h2>Search</h2>
        <p>Search high-resolution images from Unsplash</p>
        <SearchInput />
        </div>
        <img src={heroright} alt=""  className='hero-right'/>
    </div>
  )
}

export default Home