import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Icons } from "../../../icons";
import { API_URL } from "../../../config";
import { formatDate } from "../../../customfn";
import { toast } from "react-toastify";

const CreatorsAllList = () => {
  const [creators, setCreators] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null); 

  useEffect(() => {
    const fetchCreators = async () => {
      try {
        const response = await axios.post(`${API_URL}/admin/users`, {
          role: "creator"
        });
console.log("response======",response)
        setCreators(response.data || []); // Ensure it handles empty responses
      } catch (error) {
        console.error("Error fetching creators:", error);
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
      await axios.delete(`${API_URL}/delete-user/${selectedUserId}`);
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
        <h1 className="list-heading">Creators List</h1>
        {/* <div className="flex gap-4">
          <div className="dropdown-relative">
        
            <button
              className="dropdown-container-btn"
              onClick={() => setIsOpen(!isOpen)}
            >
              <span>Select Project</span>
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`h-5 w-5 transform ${isOpen ? "rotate-180" : ""}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </span>
            </button>
 
            {isOpen && (
              <div className="dropdown-menu-container">
                <ul className="">
                  {projects.map((project, index) => (
                    <li
                      key={index}
                      onClick={() => {
                        setIsOpen(false);
                        alert(`Selected: ${project}`);
                      }}
                    >
                      {project}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div> */}
      </div>

      {/* Table */}
      <div className="list-table-head">
        <table className="list-table">
          <thead>
            <tr className="list-table-container">
              <th className="list-th">Name</th>
              <th className="list-th">Email Address</th>
              <th className="list-th">Topic</th>
              <th className="list-th">Created On</th> 
              <th className="list-th">Action</th>
            </tr>
          </thead>
          <tbody>
            {creators.length > 0 ? (
              creators.map((creator, index) => (
                <tr key={index} className="list-tr">
                  <td className="list-th">{creator.name}</td>
                  <td className="list-th">{creator.email}</td>
                  <td className="list-th">{creator.topic }</td>
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
                  No creators found
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

export default CreatorsAllList;
