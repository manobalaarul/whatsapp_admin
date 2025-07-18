import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from './includes/Sidebar'
import Navbar from './includes/Navbar';

const App = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="flex h-screen">
      <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
      <div className="flex-1 flex flex-col">
        <Navbar toggleSidebar={() => setIsCollapsed(!isCollapsed)} />
        <main className="p-4">
          <Outlet/>
        </main>
      </div>
    </div>
  );
}

export default App

