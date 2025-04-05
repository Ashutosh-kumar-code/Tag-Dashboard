import React, { useState } from 'react';
import axios from 'axios';
import { API_URL } from '../../../config';

const VideoUpload = () => {
    const [videoFile, setVideoFile] = useState(null);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');

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
        formData.append('type', 'short'); // Static for now
        formData.append('creatorId', '67e016be9a50bd2709bbc2c2'); // Replace with dynamic value

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
        <div style={styles.wrapper}>
            <div style={styles.card}>
                <h2 style={styles.title}>Upload Video</h2>

                <input
                    type="file"
                    accept="video/*"
                    onChange={handleFileChange}
                    style={styles.input}
                />

                <input
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    style={styles.input}
                />

                <textarea
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={4}
                    style={{ ...styles.input, resize: 'none' }}
                />

                <input
                    type="text"
                    placeholder="Category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    style={styles.input}
                />

                <button onClick={handleUpload} style={styles.button}>
                    Upload
                </button>
            </div>
        </div>
    );
};

const styles = {
    wrapper: {
        minHeight: '100vh',
        backgroundColor: '#fff',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '20px'
    },
    card: {
        width: '100%',
        maxWidth: '500px',
        backgroundColor: '#f9f9f9',
        borderRadius: '16px',
        padding: '30px',
        boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px'
    },
    title: {
        fontSize: '24px',
        fontWeight: '600',
        color: 'rgb(120, 34, 46)',
        textAlign: 'center'
    },
    input: {
        padding: '10px 14px',
        border: '1px solid #ccc',
        borderRadius: '8px',
        fontSize: '16px'
    },
    button: {
        backgroundColor: 'rgb(120, 34, 46)',
        color: '#fff',
        padding: '12px',
        border: 'none',
        borderRadius: '8px',
        fontSize: '16px',
        fontWeight: 'bold',
        cursor: 'pointer',
        transition: 'background 0.3s'
    }
};

export default VideoUpload;
