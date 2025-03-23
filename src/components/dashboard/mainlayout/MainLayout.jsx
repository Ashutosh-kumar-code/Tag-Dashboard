import React from 'react';
import SideBar from '../sidebar/SideBar';  // Assuming you've already created the sidebar component
import Head from '../head/Head';        // Assuming you've already created the header component
import { Outlet } from 'react-router-dom';

const MainLayout = () => {
  return (
    <div className="mainlayout-container w-full">
      {/* Sidebar */}
      <div className="mainlayout-side lg:w-[20%]">
        <SideBar />
      </div>
      {/* Main content area */}
      <div className="mainlayout-head-section relative lg:w-[80%] w-full">
        {/* Header */}
        <div className=" lg:flex-1 sticky top-0 left-0 right-0 bg-white z-50">
          <Head />
        </div>

        {/* Page Content Area */}
        <div className="sm:p-6 p-3">
          {/* Add your page content here */}
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default MainLayout;