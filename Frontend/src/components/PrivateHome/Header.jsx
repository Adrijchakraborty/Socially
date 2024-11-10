import React, { useState } from 'react'


const options = [
  {
    "title" : "Following"
  },
  {
    "title" : "For You"
  },
]
const Header = () => {
  const [selected,setSelected] = useState(0)

  return (
    <div className=' flex justify-center my-5 md:my-10'>
      <div className='flex border border-gray-400 gap-3 rounded-full p-2'>
        {options.map((option,index)=>{
          return (
            <div key={index} onClick={()=>setSelected(index)} className={`px-5 py-2 rounded-full ${selected == index ? 'bg-blue-600' : 'bg-gray-600'} transition cursor-pointer`}>{option.title}</div>
          )
        })}
      </div>
    </div>
  )
}

export default Header