import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <h1 className="text-2xl">Socially</h1>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1 text-lg">
          <li><Link to={'/sign-up'}>Sign-up</Link></li>
          <li><Link to={'/login'}>Login</Link></li>
        </ul>
      </div>
    </div>
  )
}

export default Navbar