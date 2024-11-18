import React, { useEffect, useState } from 'react'
import axios from 'axios'

const limit = 2;
const FriendSuggessions = () => {
  const [suggession, setSuggession] = useState([])
  const [skip,setSkip] = useState(0)

  const fetchSuggessions = () => {

    axios.get(`/api/friendlist/similar-users?limit=${limit}&skip=${skip}`)
      .then((response) => {
        setSuggession(response.data);
      })
      .catch((err) => {
        console.log(err);
      })

  }

  useEffect(() => {
    fetchSuggessions();
  }, [skip]);

  return (
    <div className='flex flex-col gap-2'>
      {suggession.length == 0 && <p>No suggessions</p>}
      {suggession.map((item, index) => {
        return (
          <div key={index} className='flex items-center my-3 gap-2'>
            <div
              style={{
                backgroundImage: `url(${item.profile})`,
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
              className='w-8 h-8 rounded-full'
            ></div>
            <p>{item.username}</p>
            <button type="button" className="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-3 py-1.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Follow</button>
          </div>
        )
      })}
      <button disabled={suggession.length == 0} onClick={()=>setSkip((prev)=>prev + limit)} className='w-fit btn btn-success'>Refresh</button>
    </div>
  )
}

export default FriendSuggessions