import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import "./styles.css"
function Layout() {
  return (
    <>
    <nav>
        <NavLink to="/home">Home</NavLink>
    </nav>
    <Outlet />
    </>
  )
}

export default Layout