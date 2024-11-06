import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className='flex justify-around bg-stone-700 text-white '>
        <div>Socially</div>
        <div className='flex gap-4'>
            <Link to={'/sign-up'}>Sign-up</Link>
            <Link to={'/login'}>Login</Link>
        </div>
    </div>
  )
}

export default Navbar