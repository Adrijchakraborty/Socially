import React, { useEffect, useState } from 'react'
import {useSelector} from "react-redux"
import { sidebarList } from './sidebar'

const Sidebar = () => {
  const [width,setWidth] = useState();
  const {userInformation} = useSelector(state=>state.user);

  const resizeWindow = ()=>{
    setWidth(window.innerWidth)
  }
  useEffect(() => {
    setWidth(window.innerWidth)
    window.addEventListener('resize',resizeWindow)

    return ()=> window.removeEventListener('resize',resizeWindow)
  },[width])
  return (
    <div className='bg-pink-300 fixed w-full bottom-0 md:relative md:min-w-[15vw] lg:min-w-[20vw] xl:min-w-[290px]'>
      {width > 768 ? <span>Logo</span> : ""}
      <ul className='flex justify-around md:flex-col md:gap-5'>
        
          {sidebarList.map((item,index)=>{
            return (
              <li key={index}> <item.icon/> </li>
            )
          })}
          <li><img src={userInformation.profile} alt="ProfileImg" className='w-9 rounded-full'/> </li>
      </ul>

    </div>
  )
}

export default Sidebar