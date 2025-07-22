import React from 'react'
import CountCard from '../components/home/CountCard'

const Home = () => {
  return (
    <div>
      <div className="grid grid-cols-12 gap-6">
        <CountCard/>
        <CountCard/>
        <CountCard/>
        <CountCard/>
      </div>
    </div>
  )
}

export default Home