import React from 'react'
import {Navbar} from "../../components"
import { useNavigate } from 'react-router-dom'

const PublicHome = () => {

  const navigate = useNavigate();
  return (
    <div
    className='h-screen'
    style={{
      backgroundImage: 'linear-gradient(to bottom, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), url(https://images.pexels.com/photos/920382/pexels-photo-920382.jpeg)',
      backgroundPosition: 'center', // Center the image
      backgroundSize: 'cover',      // Scale the image to cover the entire element
      backgroundRepeat: 'no-repeat' // Prevent repetition of the image
    }}
    >
      <Navbar/>
      <div
      className='flex gap-3 flex-col justify-center items-center text-white mt-[15%]'>
        <h1 className='font-parkinsans text-3xl'>Start a new way to connect</h1>
        <button onClick={()=> navigate('/sign-up')} className="btn btn-primary">Get Started</button>
      </div>
    </div>
  )
}

export default PublicHome