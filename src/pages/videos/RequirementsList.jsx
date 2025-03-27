import React, { useEffect, useState } from 'react';
import axios from 'axios'; 
import { API_URL } from '../../config'; 
import { toast } from 'react-toastify';
import { formatDate } from '../../customfn';
import { Icons } from '../../icons';

const RequirementsList = () => {
    const [requirements, setRequirements] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState({ category: '', title: '' });
    const [showPopup, setShowPopup] = useState(false);
    const [selectedRequirementId, setSelectedRequirementId] = useState(null);

    useEffect(() => {
        fetchRequirements();
    }, []);

    const fetchRequirements = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`${API_URL}/requirements/list`, { params: filters });
            setRequirements(response.data);
        } catch (error) {
            console.error('Error fetching requirements:', error);
        }
        setLoading(false);
    };

    const confirmDelete = (id) => {
        setSelectedRequirementId(id);
        setShowPopup(true);
    };

    const handleDelete = async () => {
        if (!selectedRequirementId) return;
    
        try {
            await axios.delete(`${API_URL}/requirements/delete/${selectedRequirementId}`);
    
            setRequirements(requirements.filter(req => req._id !== selectedRequirementId));
    
            toast.success("Requirement deleted successfully");
        } catch (error) {
            console.error("Error deleting requirement:", error.response?.data || error.message);
            toast.error("Failed to delete requirement");
        }
    
        setShowPopup(false);
    };
    

    const handleFilterChange = (e) => {
        setFilters({ ...filters, [e.target.name]: e.target.value });
    };

    return (
        <div className="p-6 min-h-screen ">
            <h1 className="list-heading">Requirement List</h1>
           
            {/* Filter Section */}
            <div className="flex flex-wrap gap-4 justify-center items-center mb-6 bg-white p-4 rounded-lg shadow-md">
                <input 
                    type="text" 
                    name="category" 
                    placeholder="Category" 
                    value={filters.category} 
                    onChange={handleFilterChange} 
                    className="p-2 border border-gray-300 rounded-md w-64"
                />
                <input 
                    type="text" 
                    name="title" 
                    placeholder="Title" 
                    value={filters.title} 
                    onChange={handleFilterChange} 
                    className="p-2 border border-gray-300 rounded-md w-64"
                />
                <button 
                    onClick={fetchRequirements} 
                    className="px-4 py-2 bg-[#78222E] text-white rounded-md shadow-md hover:bg-[#5e1b24] transition">
                    Apply Filters
                </button>
            </div>

            {/* Requirements Table */}
            <div className="overflow-x-auto">
                <table className="w-full bg-white border rounded-lg shadow-md">
                    <thead>
                        <tr className="bg-[#78222E] text-white">
                            <th className="p-3 text-left">Title</th>
                            <th className="p-3 text-left">Category</th>
                            <th className="p-3 text-left">Budget</th>
                            <th className="p-3 text-left">Total Need</th>
                            <th className="p-3 text-left">Brand</th>
                            <th className="p-3 text-left">Created On</th>
                            <th className="p-3 text-left">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr>
                                <td colSpan="7" className="text-center p-4">Loading...</td>
                            </tr>
                        ) : requirements.length === 0 ? (
                            <tr>
                                <td colSpan="7" className="text-center p-4">No requirements found.</td>
                            </tr>
                        ) : (
                            requirements.map((req) => (
                                <tr key={req._id} className="border-b hover:bg-gray-100">
                                    <td className="p-3">{req.title}</td>
                                    <td className="p-3">{req.category}</td>
                                    <td className="p-3">${req.budget}</td>
                                    <td className="p-3">{req.totalNeed}</td>
                                    <td className="p-3">{req.brandId?.companyName || 'N/A'}</td>
                                    <td className="p-3">{formatDate(req.createdAt)}</td>
                                    <td className="p-3">
                                        <button 
                                            onClick={() => confirmDelete(req._id)} 
                                            className=" text-white px-3 py-1 rounded-md transition">
                                          <Icons.Delete size={24} className="cursor-pointer text-red-500" onClick={() => confirmDelete(req._id)} />
                                                           
                                        </button>
                                    </td>
                                </tr>
                            ))
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

export default RequirementsList;
