import React, { useEffect, useState } from 'react';
import axios from 'axios'; 
import { API_URL } from '../../config';

const SortsList = () => {
    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState({ category: '', title: '', type: 'video' });
    const [sortBy, setSortBy] = useState('date');

    useEffect(() => {
        fetchVideos();
    }, []);

    const fetchVideos = async () => {
        try {
            const response = await axios.get(`${API_URL}/videos/list`, { params: filters });
            let sortedVideos = response.data;
            if (sortBy === 'title') {
                sortedVideos = sortedVideos.sort((a, b) => a.title.localeCompare(b.title));
            } else if (sortBy === 'date') {
                sortedVideos = sortedVideos.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
            }
            setVideos(sortedVideos);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching videos:', error);
            setLoading(false);
        }
    };

    const handleDelete = async (videoId) => {
        try {
            const adminId = localStorage.getItem('tag_adminId');
            if (!adminId) {
                alert("Admin ID not found!");
                return;
            }
            await axios.delete(`${API_URL}/videos/admin/delete/${videoId}`, {
                data: { adminId },
                headers: { "Content-Type": "application/json" }
            });
            setVideos(videos.filter(video => video._id !== videoId));
            alert("Video deleted successfully");
        } catch (error) {
            console.error("Error deleting video:", error.response?.data || error.message);
            alert("Failed to delete video");
        }
    };

    const handleFilterChange = (e) => {
        setFilters({ ...filters, [e.target.name]: e.target.value });
    };

    return (
        <div className="p-6 min-h-screen bg-gray-100">
            <h2 className="text-3xl font-bold text-center text-red-700 mb-6">All Uploaded Videos</h2>
            
            <div className="flex flex-wrap gap-4 justify-center mb-6">
                <input 
                    type="text" 
                    name="category" 
                    placeholder="Category" 
                    value={filters.category} 
                    onChange={handleFilterChange} 
                    className="p-2 border border-red-700 rounded-md shadow-sm"
                />
                <input 
                    type="text" 
                    name="title" 
                    placeholder="Title" 
                    value={filters.title} 
                    onChange={handleFilterChange} 
                    className="p-2 border border-red-700 rounded-md shadow-sm"
                />
                <select 
                    onChange={(e) => setSortBy(e.target.value)}
                    value={sortBy}
                    className="p-2 border border-red-700 rounded-md shadow-sm">
                    <option value="date">Sort by Date</option>
                    <option value="title">Sort by Title</option>
                </select>
                <button 
                    onClick={fetchVideos} 
                    className="px-4 py-2 bg-red-700 text-white rounded-md shadow-md hover:bg-red-800 transition">
                    Apply Filters
                </button>
            </div>

            {loading ? (
                <p className="text-center">Loading...</p>
            ) : videos.length === 0 ? (
                <p className="text-center">No videos found.</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {videos.map((video) => {
                        const videoSrc = video.videoUrl.startsWith("http") ? video.videoUrl : `${API_URL}${video.videoUrl}`;
                        return (
                            <div 
                                key={video._id} 
                                className="bg-white border border-gray-200 p-4 rounded-lg shadow-lg hover:shadow-xl transition">
                                <video className="w-full h-64 rounded-md" controls>
                                    <source src={videoSrc} type="video/mp4" />
                                    Your browser does not support the video tag.
                                </video>
                                <h3 className="text-xl font-bold text-red-700 mt-3">{video.title}</h3>
                                <p className="text-gray-600">{video.description}</p>
                                <button 
                                    onClick={() => handleDelete(video._id)} 
                                    className="mt-4 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-800 transition">
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

export default SortsList;
