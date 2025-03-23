import React, { useState } from 'react';
import { Icons } from '../../../../icons'; import { Link } from 'react-router-dom';
import Card from '../../../../components/dashboard/card/Card'
import AddUser from './AddUser';


const UserList = () => {
  const [adduserModal,setAddUserModal] = useState(false)

  const handleUserModal = () =>{
    setAddUserModal(!adduserModal)
  }

  const handleClose =() =>{
    setAddUserModal(false)
  }
  const users = [
    {
      userName: "John Doe",
      email: "john.doe@example.com",
      number:'9373736383',
      projectAccess: "Global",
      invitationLink: "https://via.placeholder.com/51",
      status: "Registered",
    },
    {
      userName: "Jane Smith",
      email: "jane.smith@example.com",
      number:'9373736383',
      projectAccess: "Local",
      invitationLink: "https://via.placeholder.com/52",
      status: "Pending",
    },
    // Add more users as needed
  ];
  const [isOpen, setIsOpen] = useState(false);
  const projects = ["Project A", "Project B", "Project C", "Project D"];

  return (
    <div className="">
      {/* Header */}
      <div className="list-header">
        <h1 className="list-heading">Creators List</h1>
        <div className=' flex gap-4'>
          <div className="dropdown-relative">
            {/* Button */}
            <button
              className="dropdown-container-btn"
              onClick={() => setIsOpen(!isOpen)}
            >
              <span>Select Project</span>
              <span>
                {/* Replace with your Icons.arrowdropdown */}
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

            {/* Dropdown Menu */}
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
          {/* <button onClick={handleUserModal}  className="list-add-btn">
            Add User<Icons.add />
          </button> */}
        </div>
      </div>

      

      {/* Table */}
      <div className="list-table-head" >
        <table className="list-table ">
          <thead className=''>
            <tr className="list-table-container">
              <th className="list-th">User Name</th>
              <th className="list-th">Email Address</th>
              <th className="list-th">Phone Number</th>
              <th className="list-th">Project access</th>
              <th className="list-th">Send Invitation</th>
              <th className="list-th">Status</th>
              <th className="list-th">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={index} className="list-tr">
                <td className="list-th">{user.userName}</td>
                <td className="list-th">{user.email}</td>
                <td className="list-th">{user.number}</td>

                <td className="list-th">{user.projectAccess}</td>
                <td className="list-th">
                  <a
                    href={user.invitationLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-blue-500 text-white font-medium px-4 py-2 rounded hover:bg-blue-600 transition"
                  >
                    Invitation Link
                  </a>
                </td>

                <td className={`list-th ${user.status === "Registered" ? "text-green-500" : "text-red-500"}`}>
                  {user.status}
                </td>
                <td className="list-th list-action">
                  <Icons.edit size={24} /><Icons.Delete size={24} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    
      {/* <AddUser isOpen={adduserModal} onClose={handleClose} /> */}
    </div>
  );
};

export default UserList;
