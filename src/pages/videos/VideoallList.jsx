import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Icons } from "../../icons";
import { API_URL } from "../../config";
import { formatDate } from "../../customfn";
import { toast } from "react-toastify";

const VideoallList = () => {
    const [creators, setCreators] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [showPopup, setShowPopup] = useState(false);
    const [selectedUserId, setSelectedUserId] = useState(null); 
  
    useEffect(() => {
      const fetchCreators = async () => {
        try {
          const response = await axios.get(`${API_URL}/videos/all`);
          setCreators(response.data || []); // Ensure it handles empty responses
        } catch (error) {
          console.error("Error fetching videos:", error);
        }
      };
  
      fetchCreators();
    }, []);
  
    // Open delete confirmation popup
    const confirmDelete = (userId) => {
      setSelectedUserId(userId);
      setShowPopup(true);
    };
  
    // Function to delete a user
    const handleDelete = async () => {
      if (!selectedUserId) return;
  
      try {
        await axios.delete(`${API_URL}/admin/delete-video/${selectedUserId}`);
        setCreators(creators.filter((creator) => creator._id !== selectedUserId));
        toast.success("User deleted successfully!");
      } catch (error) {
        console.error("Error deleting user:", error);
        toast.error("Failed to delete user.");
      } finally {
        setShowPopup(false);
        setSelectedUserId(null);
      }
    };
  
    return (
      <div className="">
        {/* Header */}
        <div className="list-header">
          <h1 className="list-heading">Uploaded Videos List</h1>
     
        </div>
  
        {/* Table */}
        <div className="list-table-head">
          <table className="list-table">
            <thead>
              <tr className="list-table-container">
                <th className="list-th">Title</th>
                <th className="list-th">category</th>
                <th className="list-th">Creator name</th>
                <th className="list-th">Created On</th> 
                <th className="list-th">Action</th>
              </tr>
            </thead>
            <tbody>
              {creators.length > 0 ? (
                creators.map((creator, index) => (
                  <tr key={index} className="list-tr">
                    <td className="list-th">{creator.title}</td>
                    <td className="list-th">{creator.category }</td>
                    <td className="list-th">{creator.creatorId }</td>
                    <td className="list-th">{formatDate(creator.createdAt)}</td>
                    
                    <td className="list-th list-action">
                      {/* <Icons.edit size={24} /> */}
                      <Icons.Delete size={24} className="cursor-pointer text-red-500" onClick={() => confirmDelete(creator._id)} />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center text-gray-500">
                    No Videos found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
  
    {/* Delete Confirmation Popup */}
    {showPopup && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-lg font-semibold">Are you sure?</h2>
              <p className="text-sm text-gray-600">This action cannot be undone.</p>
              <div className="flex justify-end gap-4 mt-4">
                <button className="bg-gray-300 px-4 py-2 rounded" onClick={() => setShowPopup(false)}>
                  Cancel
                </button>
                <button className="bg-red-500 text-white px-4 py-2 rounded" onClick={handleDelete}>
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
  
      </div>
    );
  };

export default VideoallList
