import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { MdChatBubble, MdHome, MdPerson, MdSettings, MdClose, MdGroup } from "react-icons/md";
import Logo from '../assets/images/logo/growsoon.jpg';

const menu = [
  { icon: <MdHome size={20} />, label: "Home", to: "/" },
  { icon: <MdChatBubble size={20} />, label: "Chat", to: "/chat" },
  { icon: <MdGroup size={20} />, label: "Bulk Message", to: "/bulk_message" },
  { icon: <MdPerson size={20} />, label: "Profile", to: "/profile" },
  { icon: <MdSettings size={20} />, label: "Settings", to: "/settings" },
];

const Sidebar = ({ isSidebarOpen, closeSidebar, isSidebarExpanded }) => {
  const location = useLocation();
  const [hovering, setHovering] = useState(false);
   const isDesktop = window.innerWidth >= 1024;

  // Sidebar expanded if:
  // - on mobile: always (when open)
  // - on desktop: if isSidebarExpanded is true OR hovering
  const isExpanded = isDesktop ? (isSidebarExpanded || hovering) : true;


  const handleMenuClick = () => {
    // Close sidebar on mobile when menu item is clicked
    if (window.innerWidth < 1024) {
      closeSidebar();
    }
  };

  return (
    <>
      {/* Desktop Sidebar - Always visible on lg+ screens */}
      <div
        className={`hidden lg:flex h-full transition-all duration-300 ease-in-out border-r border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-lg ${isExpanded ? "w-64" : "w-20"} transition-width duration-300 ease-in-out`}
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => setHovering(false)}
      >
        <div className="flex flex-col w-full">
          {/* Logo Section */}
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <div className="font-bold text-xl text-gray-900 dark:text-white transition-all duration-300">
              <img 
                src={Logo} 
                alt="Logo" 
                className={`transition-all duration-300 rounded-lg hover:scale-105 ${
                  isExpanded ? "w-full h-12 object-contain" : "w-12 h-12 object-cover"
                }`}
              />
            </div>
          </div>
          
          {/* Navigation Menu */}
          <ul className="space-y-2 px-3 flex-1 py-4">
            {menu.map((item, idx) => {
              const isActive = location.pathname === item.to;
              return (
                <Link to={item.to} key={idx}>
                  <li
                    className={`group flex items-center space-x-3 px-4 py-3 rounded-lg cursor-pointer transition-all duration-200 transform hover:scale-105 hover:shadow-md ${
                      isActive 
                        ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg" 
                        : "text-gray-700 dark:text-gray-300 hover:bg-gradient-to-r hover:from-gray-100 hover:to-gray-50 dark:hover:from-gray-700 dark:hover:to-gray-600 hover:text-blue-600 dark:hover:text-blue-400"
                    }`}
                  >
                    <div className={`flex-shrink-0 transition-all duration-200 ${
                      isActive ? "text-white" : "group-hover:scale-110"
                    }`}>
                      {item.icon}
                    </div>
                    {isExpanded && (
                      <span className="whitespace-nowrap font-medium transition-all duration-200 opacity-100">
                        {item.label}
                      </span>
                    )}
                    {!isExpanded && (
                      <div className="absolute left-20 bg-gray-900 dark:bg-gray-700 text-white px-3 py-2 rounded-lg text-sm font-medium opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 shadow-lg">
                        {item.label}
                        <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1 w-2 h-2 bg-gray-900 dark:bg-gray-700 rotate-45"></div>
                      </div>
                    )}
                  </li>
                </Link>
              );
            })}
          </ul>

          {/* Footer Section */}
          <div className="p-4 border-t border-gray-200 dark:border-gray-700">
            <div className={`text-center text-xs text-gray-500 dark:text-gray-400 transition-all duration-300 ${
              isExpanded ? "opacity-100" : "opacity-0"
            }`}>
              © 2024 GrowSoon
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Sidebar - Overlay */}
      <div
        className={`fixed top-0 left-0 h-full w-80 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 z-50 transform transition-transform duration-300 ease-in-out lg:hidden shadow-2xl ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Mobile Header with Close Button */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-gray-50 to-white dark:from-gray-800 dark:to-gray-700">
            <div className="font-bold text-xl text-gray-900 dark:text-white">
              <img 
                src={Logo} 
                alt="Logo" 
                className="w-32 h-10 object-contain hover:scale-105 transition-transform duration-200"
              />
            </div>
            <button
              onClick={closeSidebar}
              className="p-2 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-full text-gray-600 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 transition-all duration-200 hover:scale-110 hover:rotate-90"
              aria-label="Close sidebar"
            >
              <MdClose size={20} />
            </button>
          </div>

          {/* Mobile Menu */}
          <ul className="space-y-3 p-4 flex-1">
            {menu.map((item, idx) => {
              const isActive = location.pathname === item.to;
              return (
                <Link to={item.to} key={idx} onClick={handleMenuClick}>
                  <li
                    className={`group flex items-center space-x-4 px-4 py-4 rounded-lg cursor-pointer transition-all duration-200 transform hover:scale-105 hover:shadow-lg ${
                      isActive 
                        ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg" 
                        : "text-gray-700 dark:text-gray-300 hover:bg-gradient-to-r hover:from-gray-100 hover:to-gray-50 dark:hover:from-gray-700 dark:hover:to-gray-600 hover:text-blue-600 dark:hover:text-blue-400"
                    }`}
                  >
                    <div className={`transition-all duration-200 ${
                      isActive ? "text-white" : "group-hover:scale-110"
                    }`}>
                      {item.icon}
                    </div>
                    <span className="font-medium">{item.label}</span>
                  </li>
                </Link>
              );
            })}
          </ul>

          {/* Mobile Footer */}
          <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-gradient-to-r from-gray-50 to-white dark:from-gray-800 dark:to-gray-700">
            <div className="text-center text-xs text-gray-500 dark:text-gray-400">
              © 2024 GrowSoon
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;