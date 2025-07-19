import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from './includes/Sidebar'
import Navbar from './includes/Navbar';

const App = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div>
      <Sidebar/>
      <Outlet/>
    </div>
  )
}

export default App

