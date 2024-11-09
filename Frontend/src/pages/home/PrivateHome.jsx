import React from 'react'
import { Header, MainContent, Sidebar, Suggession } from '../../components'

const PrivateHome = () => {
  return (
    <div className='flex flex-col-reverse md:flex-row min-h-screen bg-gray-400 max-w-[1440px] mx-auto'>
      <div className=''>
        <Sidebar />
      </div>
      <div className='flex-1'>
        <Header />
        <MainContent />
      </div>
      <div className=''>
        <Suggession />
      </div>
    </div>
  )
}

export default PrivateHome