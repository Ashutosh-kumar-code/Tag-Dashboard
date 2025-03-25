import React, { useState } from 'react';
import axios from 'axios';
import { API_URL } from '../../../config';

const VideoAllList = () => {
    const [videoFile, setVideoFile] = useState(null);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [type, setType] = useState('');

    const handleFileChange = (event) => {
        setVideoFile(event.target.files[0]);
    };

    const handleUpload = async () => {
        if (!videoFile) {
            alert('Please select a video to upload');
            return;
        }

        const formData = new FormData();
        formData.append('videoFile', videoFile);
        formData.append('title', title);
        formData.append('description', description);
        formData.append('category', category);
        formData.append('type', "video");
        formData.append('creatorId', '67e016be9a50bd2709bbc2c2'); // Replace with dynamic creatorId

        try {
            const response = await axios.post(`${API_URL}/videos/post/creator`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });

            alert(response.data.message);
        } catch (error) {
            console.error('Error uploading video:', error);
            alert('Upload failed');
        }
    };

    return (
        <div>
            <h2>Upload Video</h2>
            <input type="file" accept="video/*" onChange={handleFileChange} />
            <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
            <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
            <input type="text" placeholder="Category" value={category} onChange={(e) => setCategory(e.target.value)} />
            <input type="text" placeholder="Type" value={type} onChange={(e) => setType(e.target.value)} />
            <button onClick={handleUpload}>Upload</button>
        </div>
    );
};

export default VideoAllList;
