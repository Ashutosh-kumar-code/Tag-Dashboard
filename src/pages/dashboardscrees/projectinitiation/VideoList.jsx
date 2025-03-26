import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { API_URL } from '../../../config';

const VideoList = () => {
    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchVideos = async () => {
            try {
                const response = await axios.get(`${API_URL}/videos/all`); // Adjust API URL as needed
                setVideos(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching videos:', error);
                setLoading(false);
            }
        };

        fetchVideos();
    }, []);

    return (
        <div style={{ padding: '20px' }}>
            <h2>All Uploaded Videos</h2>

            {loading ? (
                <p>Loading...</p>
            ) : videos.length === 0 ? (
                <p>No videos found.</p>
            ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
                    {videos.map((video) => {
                        // 🔹 Ensure the video URL is absolute
                        const videoSrc = video.videoUrl.startsWith("http") 
                            ? video.videoUrl 
                            : `${API_URL}${video.videoUrl}`;  // API_URL should point to your backend

                        return (
                            <div key={video._id} style={{ border: '1px solid #ddd', padding: '10px', borderRadius: '8px' }}>
                                <h3>{video.title}</h3>
                                <p>{video.description}</p>
                                <img 
                                    src={video.thumbnailUrl || "https://via.placeholder.com/300"} 
                                    alt="Thumbnail" 
                                    width="100%" 
                                    height="150px" 
                                    style={{ objectFit: 'cover' }} 
                                />
                                <video width="100%" controls>
                                    <source src={videoSrc} type="video/mp4" />
                                    Your browser does not support the video tag.
                                </video>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default VideoList;
