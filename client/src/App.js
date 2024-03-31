import React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from './pages/Home/Home';
import Navbar from './components/navigation/Navbar';
import SearchPage from './pages/Search/SearchPage';
import ImgDetails from './pages/ImageDetails/ImgDetails';
import Collections from './pages/Collections/collections';
import CollectionDetails from './pages/CollectionDetail/CollectionDetails';
import RedirectPage from './pages/Redirect';
import Error from './pages/Error';
import './App.css'

function App() {
  return (
    <Router> 
      <Navbar />
      <Routes>
      <Route path="/" element={<Home />} />
        <Route path="/search/:query" element={<SearchPage />} />
        <Route path="/image-details/:id" element={<ImgDetails />} />
        <Route path="/collections" element={<Collections />} />
        <Route path="/collections/:id/:name" element={<CollectionDetails />} />
        <Route path="/redirect" element={<RedirectPage />} />
        <Route path="/error" element={<Error />} />
      </Routes>
    </Router>
  );
}

export default App;
