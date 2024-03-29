import React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from './pages/Home/Home';
import Navbar from './components/navigation/Navbar';
import SearchPage from './pages/Search/SearchPage';
import ImgDetails from './pages/ImageDetails/ImgDetails';
import Auth from './auth/Auth';
import './App.css'

function App() {
  return (
    <Router> 
      <Navbar />
      <Routes>
      <Route path="/" element={<Home />} />
        <Route path="/search/:query" element={<SearchPage />} />
        <Route path="/image-details/:id" element={<ImgDetails />} />
        <Route path="/auth/callback/:code" element={<Auth />} />

      </Routes>
    </Router>
  );
}

export default App;
