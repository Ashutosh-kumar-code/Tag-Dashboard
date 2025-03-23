import React from 'react';
import { assets } from '../../assets/assets';
import { Icons } from '../../icons';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {

  const location = useLocation()
  return (
    <div className="absolute top-0 w-full">
      {/* Flex Container */}
      <div className="flex flex-wrap justify-between items-center md:px-20 px-4 py-1">
        {/* Left Section */}
        <div className=" flex md:justify-center justify-between gap-4">
          {/* Logo */}
          <div className='logo'>
            <img src={assets.logo} alt="logo" />
          </div>

          {/* Contact Info */}
          {/* <div className="header-section-slrc">
            <div className="header-text-detail">
              <Icons.call size={20} className="header-icon" />
              <span className="header-text-size">+1234 567 89</span>
            </div>
            <div className="header-text-detail ">
              <Icons.mail size={20} className="header-icon" />
              <span className="header-text-size">Sales@example.com</span>
            </div>
            <div className="header-text-detail ">
              <Icons.location size={20} className="header-icon" />
              <span className="header-text-size">43-18 97th PI, Corona, NY 11368</span>
            </div>
          </div> */}
        </div>

        {/* Right Section */}
        <div className="header-section-slrc-b">
          {/* Conditionally render the buttons */}
          {location.pathname === "/login" ? (
            <Link to="/signup">
              <button className="header-btns">
                Signup
              </button>
            </Link>
          ) : location.pathname === "/signup" ? (
            <Link to="/login">
              <button className="header-btns">
                Login
              </button>
            </Link>
          ) : (
            <>
              {/* Optional: Render both buttons for other paths */}
              <button className="header-btns">
                <Link to="/login">Login</Link>
              </button>
              <button className="header-btns">
                <Link to="/signup">Signup</Link>
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
