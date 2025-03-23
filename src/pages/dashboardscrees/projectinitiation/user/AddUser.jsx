import React from 'react'
import { Icons } from '../../../../icons'

const AddUser = ({ isOpen, onClose }) => {
  if (!isOpen) {
    return null
  }
  return (
    <div className="add-main">
      <div className="add-popup ">
        {/* Popup Header */}
        <div className="add-pop-header">
          <h2 className="add-heading">Add User</h2>
          <span onClick={onClose} className=" cursor-pointer"><Icons.cross size={20} /></span>
        </div>
        <hr className="mt-5 mx-5" />
        {/* Form */}
        <form className="p-6">
          {/* Row 1 */}
          <div className="add-grid-container">
            <div>
              <label className="add-lable">
                User Name
              </label>
              <input
                type="text"
                className="add-input"
                placeholder="Enter user name"
              />
            </div>
            <div>
              <label className="add-lable">
                Email Address
              </label>
              <input
                type="email"
                className="add-input"
                placeholder="Enter Email"
              />
            </div>

          </div>

          {/* Row 2 */}
          <div className="add-grid-container">
            <div>
              <label className="add-lable">
                Phone Number
              </label>
              <input
                type="umber"
                className="add-input"
                placeholder="Enter Number"
              />
            </div>
            <div>
              <label className="add-lable">
                Project Access
              </label>
              <select
                className="add-input bg-white"
                defaultValue=""
              >
                <option value="" disabled>
                  Select
                </option>
                <option value="new-york">Local</option>
                <option value="los-angeles">Global</option>
              </select>
            </div>
            <div>
              <label className="add-lable">
                Status
              </label>
              <select
                className="add-input bg-white"
                defaultValue=""
              >
                <option value="" disabled>
                  Select
                </option>
                <option value="new-york">Registered</option>
                <option value="los-angeles">Pending</option>
              </select>
            </div>
            <div>
              <label className="add-lable">
                Invitaltion Link
              </label>
              <input
                type="text"
                className="add-input"
                placeholder="https://via.placeholder.com/51"
              />
            </div>
            <div>
              <label className="add-lable">
                Password
              </label>
              <input
                type="password"
                className="add-input"
                placeholder="       "
              />
            </div>
            <div>
              <label className="add-lable">
               Role Type
              </label>
              <input
                type="text"
                className="add-input"
                placeholder="       "
              />
            </div>
          </div>


          {/* Buttons */}
          <div className="add-btn-container">
            <button
              type="button"
              onClick={onClose}
              className="in-add-cancel-btn"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="in-add-confirm-btn"
            >
              Confirm
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddUser