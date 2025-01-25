import React, { useState } from 'react'
import { Header, MainContent, Sidebar, Suggession } from '../../components'

const PrivateHome = () => {
  const [selected, setSelected] = useState(0)
  return (
    <div className='flex flex-col-reverse md:flex-row min-h-screen max-w-[1440px] mx-auto'>
      <div className='sticky z-[9999] top-0 h-screen md:min-w-[15vw] lg:min-w-[20vw] xl:min-w-[290px]'>
        <Sidebar />
      </div>
      <div className="border-l border-gray-400"></div>

      <div className='flex-1'>
        <div className='w-[90%] md:w-[60%] mx-auto'>
          <Header value={{selected,setSelected}}/>
          <MainContent value={{selected}}/>
        </div>
      </div>
      <div className="border-l border-gray-400"></div>
      <div className='sticky top-0 h-screen hidden lg:block md:min-w-[15vw] lg:min-w-[20vw] xl:min-w-[290px]'>
        <Suggession />
      </div>
    </div>
  )
}

export default PrivateHome