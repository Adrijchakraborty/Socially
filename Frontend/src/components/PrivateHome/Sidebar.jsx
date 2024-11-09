import React, { useEffect, useState } from 'react'
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { sidebarList } from './sidebar'

const Sidebar = () => {
  const [width, setWidth] = useState();
  const { userInformation } = useSelector(state => state.user);

  const resizeWindow = () => {
    setWidth(window.innerWidth)
  }
  useEffect(() => {
    setWidth(window.innerWidth)
    window.addEventListener('resize', resizeWindow)

    return () => window.removeEventListener('resize', resizeWindow)
  }, [width])
  return (
    <div className='fixed w-full md:h-screen bottom-0 md:relative md:min-w-[15vw] lg:min-w-[20vw] xl:min-w-[290px]'>
      {width > 768 ? <div className='font-itim-regular sm:text-base md:text-4xl py-3 md:mx-3 md:px-2 cursor-pointer'>Socially</div> : ""}
      <ul className='flex justify-around md:flex-col gap-3 md:mt-8'>

        {sidebarList.map((item, index) => {
          return (
            <li key={index} className='text-2xl py-4 cursor-pointer md:mx-3 md:px-2 flex items-center gap-2'> 
            <item.icon /> 
            <p className='text-base hidden lg:block'>{item.title}</p>
            </li>
          )
        })}
        <li className='flex gap-2 items-center cursor-pointer py-4 md:mx-3 md:px-2 '>
          <div
            style={{ backgroundImage: `url(${userInformation.profile})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundPosition: 'center' }}
            className={`w-8 h-8 rounded-full`}>

          </div>
          <p className='text-base hidden lg:block'>Profile</p>
        </li>
      </ul>

    </div>
  )
}

export default Sidebar