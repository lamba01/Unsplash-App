import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "./collection.css"

const ACCESS_KEY = process.env.REACT_APP_UNSPLASH_ACCESS_KEY;

function Collections() {
  const [collections, setCollections] = useState([]);

  useEffect(() => {
    const fetchCollections = async () => {
      try {
        const response = await axios.get('https://api.unsplash.com/collections', {
          params: {
            client_id: ACCESS_KEY,
            per_page:6,
            page: 1,
            featured: true, // Fetch only featured collections
          },
        });
        setCollections(response.data);
        console.log(response.data)
      } catch (error) {
        console.error('Error fetching collections:', error);
      }
    };

    fetchCollections();
  }, []);

  return (
    <div>
      <div className="header">
        <h1>Collections</h1>
        <p>Explore the world through collections of beautiful photos free to use under the <strong>Unsplash License.</strong> </p>
      </div>
      <div className="collections-list">
        {collections.map(collection => (
          <div key={collection.id} className="collection-item">
            <h4>{collection.title}</h4>
            <p>{collection.total_photos} photos</p>
             <div className="preview-photos">
                <img src={collection.preview_photos[0].urls.regular} alt={collection.preview_photos[0].alt_description} className='large-photo'/>
              <div className="small-photos">
                <img src={collection.preview_photos[1].urls.regular} alt={collection.preview_photos[1].alt_description} className='small-image' />
                <img src={collection.preview_photos[2].urls.regular} alt={collection.preview_photos[2].alt_description} className='small-image' />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Collections;
