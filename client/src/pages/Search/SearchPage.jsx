import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios'; 
import SearchInput from '../../components/search/SearchInput';

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
            per_page: 10, // Number of items per page
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
    <div>
      <h1>Search Results for "{query}"</h1>
      <SearchInput initialValue={query} />
      <div className="photos">
        {photos.map((photo) => (
          <img key={photo.id} src={photo.urls.regular} alt={photo.alt_description} />
        ))}
      </div>
    </div>
  );
}
export default SearchPage;
