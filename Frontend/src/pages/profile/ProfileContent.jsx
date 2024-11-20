import React, { useState } from 'react'


const ProfileItems = [
    "Posts",
    "Followers",
    "Following"
]
const ProfileContent = () => {
    const [index,setIndex] = useState(0)

  return (
    <div className='flex justify-center my-5'>
        <div className='flex gap-6'>
            {ProfileItems.map((profile,ind) =>{
                return (
                    <div onClick={()=>setIndex(ind)} key={ind} className='cursor-pointer hover:underline transition'>
                        {profile}
                    </div>
                )
            })}
        </div>
        <div>
            {console.log(index)}
        </div>
    </div>
  )
}

export default ProfileContent