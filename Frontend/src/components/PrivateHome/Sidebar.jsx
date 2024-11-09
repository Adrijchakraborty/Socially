import React, { useEffect, useState } from 'react'
import { useSelector } from "react-redux"
import { sidebarList } from './sidebar'
import { Link, useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const [width, setWidth] = useState();
  const [selected, setSelected] = useState(0);
  const { userInformation } = useSelector(state => state.user);

  const navigate = useNavigate()

  const resizeWindow = () => {
    setWidth(window.innerWidth)
  }
  useEffect(() => {
    setWidth(window.innerWidth)
    window.addEventListener('resize', resizeWindow)

    return () => window.removeEventListener('resize', resizeWindow)
  }, [width])

  const handleClick = (ind,path) => {
    setSelected(ind)
    if(path !== null) {
      navigate(`${path}`)
    }
  }
  return (
    <div className='fixed w-full md:h-screen bottom-0 md:relative md:min-w-[15vw] lg:min-w-[20vw] xl:min-w-[290px]'>
      {width > 768 ? <div className='font-itim-regular sm:text-base md:text-4xl py-3 md:mx-3 md:px-2 cursor-pointer'>Socially</div> : ""}
      <ul className='flex justify-around md:flex-col gap-3 md:mt-8'>

        {sidebarList.map((item, index) => {
          return (
            <li onClick={() => handleClick(index,item.path)} key={index} className='icon-parent transition text-2xl py-3 hover:bg-gray-200 cursor-pointer md:mx-3 md:px-2 flex items-center gap-2 rounded-md'>
              <span className='icons'> {selected == index ? <item.altIcon /> : < item.icon />} </span>
              <p className={`text-base hidden lg:block ${selected == index ? 'font-bold' : ''}`}>{item.title}</p>
            </li>
          )
        })}
        <Link to={`/profile/${userInformation.username}`}>
          <li className='flex gap-2 items-center cursor-pointer py-3 hover:bg-gray-200 transition rounded-md md:mx-3 md:px-2 '>
            <div
              style={{ backgroundImage: `url(${userInformation.profile})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundPosition: 'center' }}
              className={`w-8 h-8 rounded-full`}>

            </div>
            <p className='text-base hidden lg:block'>Profile</p>
          </li>
        </Link>
      </ul>

    </div>
  )
}

export default Sidebar