import React from 'react'
import { Outlet } from 'react-router-dom'

const HomePage = () => {
  return (
    <div>
      HomePage
      {/* Message Component */}
      <section>
        <Outlet />
      </section>
    </div>
  )
}

export default HomePage
