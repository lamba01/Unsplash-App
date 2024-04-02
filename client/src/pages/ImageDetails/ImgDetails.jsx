import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import "./imgdetails.css"
import { MdDownloading } from "react-icons/md";
import { IoIosAdd } from "react-icons/io";

const ACCESS_KEY = process.env.REACT_APP_UNSPLASH_ACCESS_KEY;
// const username = 'lambaaamm'

const ImgDetails = () => {
  const [imageDetails, setImageDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  // const [searchQuery, setSearchQuery] = useState('');
  // const [searchResults, setSearchResults] = useState([]);
  const { id } = useParams();
  // const username = 'lambaaamm'

  useEffect(() => {
    const fetchImageDetails = async () => {
      try {
        const response = await axios.get(`https://api.unsplash.com/photos/${id}`, {
          headers: {
            Authorization: `Client-ID ${ACCESS_KEY}`,
          },
        });
        console.log(response.data)
        setImageDetails(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching image details:', error);
        setLoading(false);
      }
    };

    fetchImageDetails();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!imageDetails) {
    return <div>No image details found</div>;
  }
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
 

  // const searchUserCollections = async () => {
  //   setLoading(true);
  //   try {
  //     const response = await axios.get(`https://api.unsplash.com/users/${username}/collections`, {
  //       params: {
  //         username: 'lambaaamm'
  //       },
  //       headers: {
  //         Authorization: `Client-ID ${ACCESS_KEY}`,
  //       },
  //     });
  //     setSearchResults(response.data);
  //     console.log(response.data)
  //     setLoading(false);
  //   } catch (error) {
  //     console.error('Error searching user collections:', error);
  //     setLoading(false);
  //   }
  // };
  
  return (
    <div className='image-details'>
      <div className="image-container">
      <img src={imageDetails.urls.regular} alt={imageDetails.alt_description} />
      </div>
      <div className="image-description">
        <div className="user">
          <img src={imageDetails.user.profile_image.small} alt="" />
          <p>{imageDetails.user.name}</p>
        </div>
      <p className='date'>Published on {formatDate(imageDetails.created_at)}</p>
      <button className='disabled-button'><IoIosAdd />Add to collection</button>
      <button className='download-button'> <MdDownloading />download</button>
      <h3 className='coll'>Collections</h3>
      <ul>
        {imageDetails.related_collections.results.map(collection => (
          <li key={collection.id}>
            <div className='collection-container'>
           <img src={collection.cover_photo.urls.regular} alt={collection.title} className='collection-img' />
            <div>
              <h5 className='collection-title'>{collection.title}</h5>
              <p className='collection-photo-amount'>{collection.total_photos}</p>
            </div>  
            </div>
          </li>
         
        ))}
      </ul>
      </div>
    </div>
  );
};

export default ImgDetails;
