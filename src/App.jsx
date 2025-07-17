import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from './includes/Sidebar'

const App = () => {
  return (
    <div>
      <Sidebar/>
      <Outlet/>
    </div>
  )
}

export default App