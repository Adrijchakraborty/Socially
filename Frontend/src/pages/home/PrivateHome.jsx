import React from 'react'
import { Header, MainContent, Sidebar, Suggession } from '../../components'

const PrivateHome = () => {
  return (
    <div className='flex flex-col-reverse md:flex-row min-h-screen max-w-[1440px] mx-auto'>
      <div className='sticky top-0 h-screen md:min-w-[15vw] lg:min-w-[20vw] xl:min-w-[290px]'>
        <Sidebar />
      </div>
      <div className="border-l border-gray-400"></div>
      
      <div className='flex-1'>
        <Header />
        <MainContent />
      </div>
      <div className="border-l border-gray-400"></div>
      <div className='sticky top-0 h-screen hidden lg:block md:min-w-[15vw] lg:min-w-[20vw] xl:min-w-[290px]'>
        <Suggession />
      </div>
    </div>
  )
}

export default PrivateHome