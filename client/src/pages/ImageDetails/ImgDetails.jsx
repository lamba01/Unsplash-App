import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ACCESS_KEY = process.env.REACT_APP_UNSPLASH_ACCESS_KEY;
const REDIRECT_URI = 'http://localhost:3000/redirect'; 
const LOGIN_URL = `https://unsplash.com/oauth/authorize?client_id=${ACCESS_KEY}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&response_type=code&scope=public+write_user+write_collections+read_collections+write_photos+read_photos`;

const ImgDetails = () => {
  const [imageDetails, setImageDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const { id } = useParams();
  const accessToken = localStorage.getItem('accessToken');

  useEffect(() => {
    const fetchImageDetails = async () => {
      try {
        const response = await axios.get(`https://api.unsplash.com/photos/${id}`, {
          headers: {
            Authorization: `Client-ID ${ACCESS_KEY}`,
          },
        });
        setImageDetails(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching image details:', error);
        setLoading(false);
      }
    };

    fetchImageDetails();
  }, [id]);


  const handleLogin = () => {
    // Redirect user to login page
    window.location.href = LOGIN_URL;
  };

  const addToCollection = async (collectionId) => {
    if (!accessToken) {
      // Redirect user to login page
      handleLogin();
      return;
    }
    try {
      await axios.post(`https://api.unsplash.com/collections/${collectionId}/add`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          params: {
            photo_id: id
          },
        }
      );
      alert('Image added to collection successfully!');
      
    } catch (error) {
      console.error('Error adding image to collection:', error);
      alert('Failed to add image to collection');
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!imageDetails) {
    return <div>No image details found</div>;
  }
 

  const handleAddToCollection = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const searchCollections = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`https://api.unsplash.com/search/collections`, {
        params: {
          query: searchQuery,
          per_page: 3,
        },
        headers: {
          Authorization: `Client-ID ${ACCESS_KEY}`,
        },
      });
      setSearchResults(response.data.results);
      console.log(response.data.results)
      setLoading(false);
    } catch (error) {
      console.error('Error searching collections:', error);
      setLoading(false);
    }
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    searchCollections();
  };
  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <div>
      <h2>{imageDetails.alt_description}</h2>
      <img src={imageDetails.urls.regular} alt={imageDetails.alt_description} />
      <p>Uploaded by: {imageDetails.user.name}</p>
      <p>Published date: {new Date(imageDetails.created_at).toLocaleDateString()}</p>
      <p>Collections:</p>
      {/* <ul>
        {imageDetails.related_collections.results.map(collection => (
          <li key={collection.id}>
            {collection.title} 
            
          </li>
        ))}
      </ul> */}
      <button onClick={handleAddToCollection}>Add to Collection</button>
      {showModal && (
        <div className="modal">
          <div className="modal-content">
          <form onSubmit={handleSearchSubmit}>
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchInputChange}
          placeholder="Search collections..."
        />
        <button type="submit">Search</button>
      </form>
      <ul>
          {searchResults.map(collection => (
            <li key={collection.id}>
              {collection.title}
              <button onClick={() => addToCollection(collection.id)}>ADD</button>
            </li>
          ))}
        </ul>
            <button onClick={handleCloseModal}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImgDetails;
