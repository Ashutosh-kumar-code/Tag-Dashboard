import React, { useState, useEffect } from "react";
import axios from "axios"; 
import { toast } from "react-toastify";
import { Icons } from "../../../../icons";
import { API_URL } from "../../../../config";
import { formatDate } from "../../../../customfn";

const BrandsAllList = () => {
  const [brands, setBrands] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedBrandId, setSelectedBrandId] = useState(null);

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const response = await axios.post(`${API_URL}/admin/users`, {
            role: "brand"
        });
        console.log("response======", response);
        setBrands(response.data || []); // Ensure it handles empty responses
      } catch (error) {
        console.error("Error fetching brands:", error);
      }
    };

    fetchBrands();
  }, []);

  // Open delete confirmation popup
  const confirmDelete = (brandId) => {
    setSelectedBrandId(brandId);
    setShowPopup(true);
  };

  // Function to delete a brand
  const handleDelete = async () => {
    if (!selectedBrandId) return;

    try {
      await axios.delete(`${API_URL}/admin/delete-user/${selectedBrandId}`);
      setBrands(brands.filter((brand) => brand._id !== selectedBrandId));
      toast.success("Brand deleted successfully!");
    } catch (error) {
      console.error("Error deleting brand:", error);
      toast.error("Failed to delete brand.");
    } finally {
      setShowPopup(false);
      setSelectedBrandId(null);
    }
  };

  return (
    <div className="">
      {/* Header */}
      <div className="list-header">
        <h1 className="list-heading">Brands List</h1>
      </div>

      {/* Table */}
      <div className="list-table-head">
        <table className="list-table">
          <thead>
            <tr className="list-table-container">
              <th className="list-th">Brand Name</th>
              <th className="list-th">Email Address</th>
              <th className="list-th">Company Name</th>
              <th className="list-th">Website</th>
              <th className="list-th">Registered On</th>
              <th className="list-th">Action</th>
            </tr>
          </thead>
          <tbody>
            {brands.length > 0 ? (
              brands.map((brand, index) => (
                <tr key={index} className="list-tr">
                  <td className="list-th">{brand.name}</td>
                  <td className="list-th">{brand.email}</td>
                  <td className="list-th">{brand.companyName}</td>
                  <td className="list-th">{brand.website}</td>
                  <td className="list-th">{formatDate(brand.createdAt)}</td>
                  <td className="list-th list-action">
                    <Icons.Delete
                      size={24}
                      className="cursor-pointer text-red-500"
                      onClick={() => confirmDelete(brand._id)}
                    />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center text-gray-500">
                  No brands found
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

export default BrandsAllList;
