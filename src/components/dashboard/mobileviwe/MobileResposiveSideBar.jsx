import React, { useState } from "react";
import { Icons } from "../../../icons";
import { assets } from "../../../assets/assets";
import { Link } from "react-router-dom";

const MobileResponsiveSidebar = ({ isopen, onclose }) => {
  const [openMenu, setOpenMenu] = useState(null); // Track parent menus
  const [openSubMenu, setOpenSubMenu] = useState({}); // Track nested submenus
  let [activeTab, setActiveTab] = useState("Dashboard");
  const [activeSubMenu, setActiveSubMenu] = useState({}); // Track active submenu item

  const menuItems = [
    {
      name: "Dashboard",
      link: "/dashboard",
      icon: <Icons.home />,
      subMenu: [], // No submenu
    },
    {
      name: "Users",
      icon: <Icons.settings />,
      subMenu: [
        { name: "Creators", link: "creators" },
        { name: "Brands", link: "brands" },
      ],
    },
 
  
    
  ];

  const toggleMenu = (index) => {
    setOpenMenu(openMenu === index ? null : index); // Toggle main menu
  };

  const toggleSubMenu = (parentIndex, subIndex) => {
    setOpenSubMenu((prev) => ({
      ...prev,
      [`${parentIndex}-${subIndex}`]: !prev[`${parentIndex}-${subIndex}`], // Toggle submenu
    }));
  };

  const renderSubMenu = (subMenu, parentIndex) => {
    return subMenu.map((subItem, subIndex) => (
      <div key={subIndex}>
        <Link
          to={subItem.link}
          className={`submenu-link ${
            activeSubMenu === subItem.name ? "active-text" : ""
          }`}
          onClick={() => {
            toggleSubMenu(parentIndex, subIndex);
            setActiveSubMenu(subItem.name);
          }}>
          <div className=" flex justify-between">
            {subItem.name}
            {subItem.subMenu && // Show toggle icon if nested submenu exists
              (openSubMenu[`${parentIndex}-${subIndex}`] ? (
                <Icons.Chevron size={15} className="mt-1" />
              ) : (
                <Icons.ChevroDown size={15} className="mt-1" />
              ))}
          </div>
        </Link>

        {/* Render nested submenu */}
        {subItem.subMenu && openSubMenu[`${parentIndex}-${subIndex}`] && (
          <div className="nested-submenu">
            {renderSubMenu(subItem.subMenu, `${parentIndex}-${subIndex}`)}
          </div>
        )}
      </div>
    ));
  };

  if (!isopen) {
    return null; // Hide sidebar when not open
  }

  return (
    <div className="fixed inset-0 z-50">
      {/* Background Overlay */}
      <div
        className="absolute inset-0 bg-black bg-opacity-50"
        onClick={onclose}></div>

      {/* Sidebar Container */}
      <div className="absolute top-0 left-0 w-64 h-full bg-white text-[#000000] shadow-lg  overflow-y-auto scrollbar-hide ">
        <div className=" flex justify-between items-center px-4">
          {/* Logo */}
          <div className="">
            <img src={assets.dashboaedlogo} alt="logo" />
          </div>
          <span onClick={onclose} className=" cursor-pointer">
            <Icons.cross size={24} />
          </span>
        </div>
        {/* Menu */}
        <nav className="sidebar-menu">
          {menuItems.map((item, index) => (
            <div key={index} className={`mb-2`}>
              {/* Parent Menu */}
              <Link
                to={item.link}
                className={`sidebar-parent-menu group ${
                  activeTab === item.name ? "active " : ""
                }`}
                onClick={() => {
                  toggleMenu(index);
                  setActiveTab(item.name);
                }}>
                <div className="side-menu-icon">
                  {item.icon}
                  <span className="">{item.name}</span>
                </div>
                {/* Toggle Icon */}
                {item.subMenu.length > 0 &&
                  (openMenu === index ? (
                    <Icons.Chevron />
                  ) : (
                    <Icons.ChevroDown />
                  ))}

                {/* Simulated Left Border */}
                <span className="side-Simulated-border"></span>
              </Link>

              {/* Submenu */}
              {openMenu === index && item.subMenu.length > 0 && (
                <div className="sidebar-submenu">
                  {renderSubMenu(item.subMenu, index)}
                </div>
              )}
            </div>
          ))}
        </nav>
        {/* Footer */}
        <div className="sidebar-logout">
          <span>
            <Icons.logout size={20} className="side-logout-icon" />
          </span>
          <span>Logout</span>
        </div>
      </div>
    </div>
  );
};

export default MobileResponsiveSidebar;
