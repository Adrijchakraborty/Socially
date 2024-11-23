import React, { useState } from 'react'
import { CiSearch } from "react-icons/ci";
import { Link } from 'react-router-dom';

const options = [
  {
    "title": "Following"
  },
  {
    "title": "For You"
  },
]
const Header = ({value}) => {

  const {selected,setSelected} = value;
  return (
    <div className=' flex flex-col items-center justify-center my-5 md:my-10'>
      <div className='flex items-center py-2 md:hidden justify-between w-full'>
        <div className="font-itim-regular text-2xl py-3 md:mx-3 md:px-2 cursor-pointer">
          Socially
        </div>
        <div className='text-xl cursor-pointer'>
          <Link to={'/search'}> <CiSearch /> </Link>
        </div>
      </div>
      <div className='flex border border-gray-400 gap-3 w-fit rounded-full p-2'>
        {options.map((option, index) => {
          return (
            <div key={index} onClick={() => setSelected(index)} className={`px-5 py-2 rounded-full ${selected == index ? 'bg-blue-600' : 'bg-gray-600'} transition cursor-pointer`}>{option.title}</div>
          )
        })}
      </div>
    </div>
  )
}

export default Header