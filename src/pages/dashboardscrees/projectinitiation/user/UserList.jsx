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
        <h1 className="list-heading">3A User List</h1>
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
          <button onClick={handleUserModal}  className="list-add-btn">
            Add User<Icons.add />
          </button>
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

      {/* Responsive Cards */}
      {/* <div className="grid gap-6 sm:grid-cols-2 grid-cols-1 md:hidden">
  {users.map((user, id) => (
    <Card
      key={id}
      
      title={user.userName}
      subtitle={`Project Access: ${user.projectAccess}`}
      description={
        <>
          {user.email}
          <br />
          <Link
            to={user.invitationLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline overflow-hidden"
          >
            {user.invitationLink}
          </Link>
          <br/>
          <span className={`${user.status === 'Pending' ? "text-red-600":"text-green-500"} text-right`}>{user.status}</span>
        </>
      }
      actions={[
        {
          label: <Icons.edit size={20} />,
          className: ' mt-1',
        },
      ]}
    />
  ))}
</div> */}

      {/* Pagination */}
      {/* <div className="pagi-container">
      
        <button
          className="pagi-prev-btn"
          aria-label="Previous"
        >
          <Icons.sliderarrowback />
        </button>

        
        <div className="pagi-dots">
          {[1, 2, 3, 4,'...',60].map((item) => (
            <button
              key={item}
              className={`px-4 py-2 ${item === 2 ? "bg-[#78222E] text-white" : "bg-gray-200 text-gray-600"
                }`}
            >
              {item}
            </button>
          ))}
        </div>

       
        <button
          className="pagi-next-btn"
          aria-label="Next"
        >
          <Icons.sliderarrowgo />
        </button>
      </div> */}
      <AddUser isOpen={adduserModal} onClose={handleClose} />
    </div>
  );
};

export default UserList;
