import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { API_URL } from '../../../config';

const VideoList = () => {
    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState({ category: '', title: '', type: 'video' });
    // const adminId = localStorage.getItem('tag_adminId'); // Get adminId from localStorage

    useEffect(() => {
        fetchVideos();
    }, []); // Fetch videos only on component mount

    const fetchVideos = async () => {
        try {
            const response = await axios.get(`${API_URL}/videos/list`, { params: filters });
            setVideos(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching videos:', error);
            setLoading(false);
        }
    };

    const handleDelete = async (videoId) => {
        console.log("videoId=====",videoId)
        try {
            const adminId = localStorage.getItem('tag_adminId'); // Ensure you get adminId from localStorage
    
            if (!adminId) {
                alert("Admin ID not found!");
                return;
            }
    
            await axios.delete(`${API_URL}/videos/admin/delete/${videoId}?adminId=${adminId}`, {
                headers: { "Content-Type": "application/json" } // Ensures JSON format
            });
    
            setVideos(videos.filter(video => video._id !== videoId));
            alert("Video deleted successfully");
        } catch (error) {
            console.error("Error deleting video:", error.response?.data || error.message);
            alert("Failed to delete video");
        }
    };
    
    // const handleDelete = async (videoId) => {
    //     try {
    //         const adminId = localStorage.getItem('tag_adminId'); // Ensure you get adminId from localStorage
    
    //         if (!adminId) {
    //             alert("Admin ID not found!");
    //             return;
    //         }
    
    //         await axios.delete(`${API_URL}/videos/admin/delete/${videoId}`, {
    //             data: { adminId }, // Correctly sending adminId in the request body
    //             headers: { "Content-Type": "application/json" } // Ensures JSON format
    //         });
    
    //         setVideos(videos.filter(video => video._id !== videoId));
    //         alert("Video deleted successfully");
    //     } catch (error) {
    //         console.error("Error deleting video:", error.response?.data || error.message);
    //         alert("Failed to delete video");
    //     }
    // };
    
    // const handleDelete = async (videoId) => {
    //     try {
    //         // await axios.delete(`${API_URL}/videos/admin/delete/${videoId}`, { adminId: adminId } );
    //         await axios.delete(`${API_URL}/videos/admin/delete/${videoId}`, {
    //             data: { adminId } // Ensure it's sent as 'data'
    //         });
    //         setVideos(videos.filter(video => video._id !== videoId));
    //         alert("Video deleted successfully");
    //     } catch (error) {
    //         console.error("Error deleting video:", error);
    //         alert("Failed to delete video");
    //     }
    // };

    const handleFilterChange = (e) => {
        setFilters({ ...filters, [e.target.name]: e.target.value });
    };

    return (
        <div style={{ padding: '20px', color: '#000', minHeight: '100vh' }}>
            <h2 style={{ textAlign: 'center', color: '#78222E' }}>All Uploaded Videos</h2>
            
            {/* Filters */}
            <div style={{ marginBottom: '20px', display: 'flex', gap: '10px', justifyContent: 'center' }}>
                <input 
                    type="text" 
                    name="category" 
                    placeholder="Category" 
                    value={filters.category} 
                    onChange={handleFilterChange} 
                    style={{ padding: '8px', border: '1px solid #78222E', borderRadius: '5px' }}
                />
                <input 
                    type="text" 
                    name="title" 
                    placeholder="Title" 
                    value={filters.title} 
                    onChange={handleFilterChange} 
                    style={{ padding: '8px', border: '1px solid #78222E', borderRadius: '5px' }}
                />
                <button 
                    onClick={fetchVideos} 
                    style={{ padding: '8px 12px', border: 'none', backgroundColor: '#78222E', color: '#fff', borderRadius: '5px', cursor: 'pointer', transition: '0.3s' }}
                    onMouseEnter={(e) => e.target.style.backgroundColor = '#5e1b24'}
                    onMouseLeave={(e) => e.target.style.backgroundColor = '#78222E'}>
                    Apply Filters
                </button>
            </div>

            {loading ? (
                <p>Loading...</p>
            ) : videos.length === 0 ? (
                <p>No videos found.</p>
            ) : (
                <div style={{ 
                    display: 'grid', 
                    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
                    gap: '20px', 
                    justifyContent: 'center' 
                }}>
                    {videos.map((video) => {
                        const videoSrc = video.videoUrl.startsWith("http") ? video.videoUrl : `${API_URL}${video.videoUrl}`;
                        return (
                            <div 
                                key={video._id} 
                                style={{ 
                                    border: '1px solid #ddd', 
                                    padding: '10px', 
                                    borderRadius: '8px', 
                                    transition: '0.3s',
                                    cursor: 'pointer',
                                    boxShadow: '0px 4px 10px rgba(120, 34, 46, 0.3)'
                                }}
                                onMouseEnter={(e) => e.currentTarget.style.boxShadow = '0px 6px 12px rgba(120, 34, 46, 0.5)'}
                                onMouseLeave={(e) => e.currentTarget.style.boxShadow = '0px 4px 10px rgba(120, 34, 46, 0.3)'}>
                                <video width="100%" controls>
                                    <source src={videoSrc} type="video/mp4" />
                                    Your browser does not support the video tag.
                                </video>
                                <h3 style={{ color: '#78222E', fontWeight: 'bold', marginTop: '10px' }}>{video.title}</h3>
                                <p>{video.description}</p>
                                <button 
                                    onClick={() => handleDelete(video._id)} 
                                    style={{ 
                                        padding: '8px 12px', 
                                        border: 'none', 
                                        backgroundColor: 'red', 
                                        color: '#fff', 
                                        borderRadius: '5px', 
                                        cursor: 'pointer',
                                        transition: '0.3s',
                                        marginTop: '10px' 
                                    }}
                                    onMouseEnter={(e) => e.target.style.backgroundColor = '#b30000'}
                                    onMouseLeave={(e) => e.target.style.backgroundColor = 'red'}>
                                    Delete Video
                                </button>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default VideoList;