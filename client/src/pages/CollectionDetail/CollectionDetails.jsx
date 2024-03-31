import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
const ACCESS_KEY = process.env.REACT_APP_UNSPLASH_ACCESS_KEY;

function CollectionDetails() {
    const { id, name } = useParams();
    const [collectionPhotos, setCollectionPhotos] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCollectionPhotos = async () => {
            try {
                const response = await axios.get(`https://api.unsplash.com/collections/${id}/photos`, {
                    params: {
                        per_page: 8,
                        orientation: 'landscape',
                        privacy: 'public' 
                    },
                    headers: {
                        Authorization: `Client-ID ${ACCESS_KEY}`,
                    },
                });
                setCollectionPhotos(response.data);
                console.log(response.data)
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

    if (!collectionPhotos.length) {
        return <div>No photos found for this collection</div>;
    }

    return (
        <div>
            <h2>{name}</h2>
            <div className="collection-photos">
                {collectionPhotos.map(photo => (
                    <div key={photo.id} className="photo-item">
                        <img src={photo.urls.regular} alt={photo.alt_description} />
                        <p>Uploaded by: {photo.user.name}</p>
                        <p>Published date: {new Date(photo.created_at).toLocaleDateString()}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default CollectionDetails;
