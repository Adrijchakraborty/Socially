import axios from 'axios'
import React, { useEffect, useState } from 'react'

const FollowerComponent = ({id}) => {
  const [follower,setFollower] = useState()

  useEffect(() => {
    axios.get(`/api/friendlist/get-friendlist?id=${id}`)
    .then((response)=>{
      setFollower(response.data.followers);
    })
    .catch((err) => {
      console.log(err);
    })
  },[])

  return (
    <div>
      {follower == 0 && <p>No Follower</p>}
      {follower?.map((item,index)=>{
        return (
          <div className='flex items-center my-3 gap-2' key={index}>
            
            <div
             onClick={()=>navigate(`/profile/${item.username}`)}
              style={{
                backgroundImage: `url(${item.profile})`,
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
              className='w-8 h-8 rounded-full cursor-pointer'
            ></div>
            <p onClick={()=>navigate(`/profile/${item.username}`)} className='cursor-pointer'>{item.username}</p>

          </div>
        )
      })}
    </div>
  )
}

export default FollowerComponent