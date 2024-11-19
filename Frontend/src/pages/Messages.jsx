import React from 'react'
import { Sidebar } from '../components'

const Messages = () => {
  return (
    <div className='flex flex-col-reverse md:flex-row min-h-screen max-w-[1440px] mx-auto'>
      <div className='sticky top-0 h-screen md:min-w-[15vw] lg:min-w-[20vw] xl:min-w-[290px]'>
        <Sidebar />
      </div>
      <div className='flex justify-center items-center h-screen'>
        coming soon...
      </div>

    </div>
  )
}

export default Messages