import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios'; 
import SearchInput from '../../components/search/SearchInput';
import gradient from '../../assets/gradiend-bg@2x.png';
import './searchpage.css'

function SearchPage() {
  const { query } = useParams();
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const ACCESS_KEY = process.env.REACT_APP_UNSPLASH_ACCESS_KEY;

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`https://api.unsplash.com/search/photos`, {
          params: {
            query: query,
            per_page: 8, // Number of items per page
            // Add other parameters as needed
          },
          headers: {
            Authorization: `Client-ID ${ACCESS_KEY}`,
          },
        });
        setPhotos(response.data.results);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching photos:', error);
        setLoading(false);
      }
    };

    fetchPhotos();
  }, [query, ACCESS_KEY]);

  if (loading) {
    return <div>Loading...</div>;
  }  


  return (
    <div className='search-page'>
      <img src={gradient} alt=""  className='gradient-img'/>
      <div className="search-page-inputcontainer">
      <SearchInput initialValue={query} />
      </div>
      <div className="photo-grid">      
        {photos.map((photo, index) => (
          <Link key={photo.id} to={`/image-details/${photo.id}`}>
          <img src={photo.urls.regular} alt={photo.alt_description} className={`photo-item`} />
          </Link>
        ))}
      </div>
    </div>
  );
}
export default SearchPage;
