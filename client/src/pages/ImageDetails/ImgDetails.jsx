import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
const ACCESS_KEY = process.env.REACT_APP_UNSPLASH_ACCESS_KEY;


const ImgDetails = ({ imageId }) => {
  const [imageDetails, setImageDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  // console.log(imageId)
  const { id } = useParams();

  useEffect(() => {
    const fetchImageDetails = async () => {
      try {
        const response = await axios.get(`https://api.unsplash.com/photos/${id}`, {
          headers: {
            Authorization: `Client-ID ${ACCESS_KEY}`, // Replace YOUR_ACCESS_KEY with your Unsplash access key
          },
        });
        setImageDetails(response.data);
        console.log(response.data)
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

  return (
    <div>
      <h2>{imageDetails.alt_description}</h2>
      <img src={imageDetails.urls.regular} alt={imageDetails.alt_description} />
      <p>Uploaded by: {imageDetails.user.name}</p>
      <p>Published date: {new Date(imageDetails.created_at).toLocaleDateString()}</p>
      <p>Collections:</p>
      <ul>
        {imageDetails.related_collections.results.map(collection => (
          <li key={collection.id}>{collection.title}</li>
        ))}
      </ul>
      {/* Add more details as needed */}
      <button>Add to collection</button>
    </div>
  );
};

export default ImgDetails;

