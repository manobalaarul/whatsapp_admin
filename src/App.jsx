import React, { useState } from "react";
import Sidebar from "./includes/Sidebar";
import Navbar from "./includes/Navbar";
import { Outlet } from "react-router-dom";

const App = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="flex h-screen bg-white dark:bg-gray-900">
      <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
      <div className="flex-1 flex flex-col">
        <Navbar toggleSidebar={() => setIsCollapsed(!isCollapsed)} />
        <main className="p-4 flex-1 bg-gray-50 dark:bg-gray-800 overflow-hidden">
          <Outlet/>
        </main>
      </div>
    </div>
  );
};

export default App;