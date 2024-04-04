import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import './collectiondetails.css';
const ACCESS_KEY = process.env.REACT_APP_UNSPLASH_ACCESS_KEY;

function CollectionDetails() {
    const { id, name } = useParams();
    const [collectionPhotos, setCollectionPhotos] = useState([]);
    const [totalPhotos, setTotalPhotos] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCollectionDetails = async () => {
            try {
                const response = await axios.get(`https://api.unsplash.com/collections/${id}`, {
                    headers: {
                        Authorization: `Client-ID ${ACCESS_KEY}`,
                    },
                });
                setTotalPhotos(response.data.total_photos);
            } catch (error) {
                console.error('Error fetching collection details:', error);
            }
        };

        fetchCollectionDetails();
    }, [id]);

    useEffect(() => {
        const fetchCollectionPhotos = async () => {
            try {
                const response = await axios.get(`https://api.unsplash.com/collections/${id}/photos`, {
                    params: {
                        per_page: 8,
                        orientation: 'landscape',
                    },
                    headers: {
                        Authorization: `Client-ID ${ACCESS_KEY}`,
                    },
                });
                setCollectionPhotos(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching collection photos:', error);
                setLoading(false);
            }
        };

        fetchCollectionPhotos();
    }, [id]);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className='collections'>
            <div className="collection-header">
                <h2 className='collection-name'>{name}</h2>
                <p>{totalPhotos} photos</p>
            </div>
            <div className="collection-photos">
                {collectionPhotos.map(photo => (
                    <div key={photo.id} className="photo-item">
                        <Link key={photo.id} to={`/image-details/${photo.id}`}>
                        <img src={photo.urls.regular} alt={photo.alt_description} className='collection-image' />
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default CollectionDetails;
