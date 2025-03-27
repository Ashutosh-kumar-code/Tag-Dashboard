import React, { useEffect, useState } from "react";
import { Icons } from "../../../icons";
import MobileResponsiveSidebar from "../mobileviwe/MobileResposiveSideBar";
import admin_img from "../../../assets/admin-pic.png"

const Head = () => {
  const [mobileSideBar, SetMonileSidebar] = useState(false);

  const [userName, setUserName] = useState("");

  useEffect(() => {
    // Retrieve the admin name from localStorage
    const adminName = localStorage.getItem("tag_adminName");
    if (adminName) {
      setUserName(adminName);
    }
  }, []); // Runs only once when component mounts

  const handleMobSideBarPop = () =>{
    SetMonileSidebar(!mobileSideBar)
  }

  const handleClose = () =>{
    SetMonileSidebar(false)
  }
  return (
    <div className="head-main-container ">
     
      {/* Left: Welcome Message */}
      <div className="head-left">
      <div onClick={handleMobSideBarPop} className="head-left-responsive">
           <Icons.align size={20} className="mt-1"/>
      </div>&nbsp;
      <div className="">
        Hello! <span className=" text-[#78222E]">{userName || "Admin"}</span>
        </div>
      </div>


      {/* Right: Search Bar, Notification, and Profile */}
      <div className="head-right">
        {/* Search Bar */}
        {/* <div className="head-search">
          <input
            type="text"
            placeholder="Search..."
            className="head-search-input"
          />
          <span className="head-search-icon">
            <Icons.search size={24}/></span>
        </div> */}

        {/* User Profile */}
        <div className="head-pro">
          <img
            src={admin_img} // Replace with user's profile image URL
            alt="User Profile"
            className="head-pro-img"
          />
        </div>
      </div>
      <MobileResponsiveSidebar isopen={mobileSideBar} onclose={handleClose} />
    </div>
  );
};

export default Head;