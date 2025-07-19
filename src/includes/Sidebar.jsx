import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { MdHome, MdPerson, MdSettings } from "react-icons/md";

const menu = [
  { icon: <MdHome size={20} />, label: "Home", to: "/" },
  { icon: <MdPerson size={20} />, label: "Profile", to: "/profile" },
  { icon: <MdSettings size={20} />, label: "Settings", to: "/settings" },
];

const Sidebar = ({ isCollapsed }) => {
  const location = useLocation();
  const [hovering, setHovering] = useState(false);
  const isOpen = !isCollapsed || hovering;

  return (
    <div
      className={`h-full transition-all duration-300 border-r border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 ${
        isOpen ? "w-64" : "w-20"
      }`}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      <div className="p-4 font-bold text-xl text-gray-900 dark:text-white">Logo</div>
      <ul className="space-y-2 mt-4 px-4">
        {menu.map((item, idx) => {
          const isActive = location.pathname === item.to;

          return (
            <Link to={item.to} key={idx}>
              <li
                className={`flex items-center space-x-3 px-4 py-3 rounded-md cursor-pointer transition-colors duration-200
                ${
                  isActive 
                    ? "bg-primary-bg text-white dark:bg-primary-bg" 
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-primary dark:hover:text-primary"
                }`}
              >
                {item.icon}
                {isOpen && <span>{item.label}</span>}
              </li>
            </Link>
          );
        })}
      </ul>
    </div>
  );
};

export default Sidebar;