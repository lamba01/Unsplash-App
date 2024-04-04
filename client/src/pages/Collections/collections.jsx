import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import "./collection.css"

const ACCESS_KEY = process.env.REACT_APP_UNSPLASH_ACCESS_KEY;
const username = 'nowheresville';

function Collections() {
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCollections = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`https://api.unsplash.com/users/${username}/collections`, {
          params: {
            username: 'nowheresville',
            per_page: 20 // Increase per_page to get more collections
          },
          headers: {
            Authorization: `Client-ID ${ACCESS_KEY}`,
          },
        });
        // Filter collections with over 10 photos
        const filteredCollections = response.data.filter(collection => collection.total_photos > 10);
        setCollections(filteredCollections);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching user collections:', error);
        setLoading(false);
      }
    };

    fetchCollections();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="header">
        <h1>Collections</h1>
        <p>Explore the world through collections of beautiful photos free to use under the <strong>Unsplash License.</strong></p>
      </div>
      <div className="collections-list">
        {collections.slice(0, 6).map(collection => (
          <div key={collection.id} className="collection-item">
            <div className="title-div">
            <Link to={`/collections/${collection.id}/${encodeURIComponent(collection.title)}`}>
              <h4 className='collection-title'>{collection.title}</h4>
            </Link>
            <p>{collection.total_photos} photos</p>
            </div>
            <div className="preview-photos">
                <img src={collection.preview_photos[0].urls.regular} alt={collection.preview_photos[0].alt_description} className='large-photo'/>
              <div className="small-photos">
                <img src={collection.preview_photos[1].urls.regular} alt={collection.preview_photos[1].alt_description} className='small-image' />
                <img src={collection.preview_photos[2].urls.regular} alt={collection.preview_photos[2].alt_description} className='small-image' />
              </div>
            </div>
            {/* <div className="preview-photos">
              {collection.preview_photos.slice(0, 3).map(photo => (
                <img key={photo.id} src={photo.urls.regular} alt={photo.alt_description} />
              ))}
            </div> */}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Collections;

