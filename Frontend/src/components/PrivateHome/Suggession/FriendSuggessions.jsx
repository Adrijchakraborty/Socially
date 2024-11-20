import React, { useEffect, useState } from 'react'
import { useSelector } from "react-redux"
import axios from 'axios'
import { Navigate, useNavigate } from 'react-router-dom';

const limit = 2;
const FriendSuggessions = () => {
  const [suggession, setSuggession] = useState([])
  const [friendList, setFriendList] = useState([])
  const [skip, setSkip] = useState(0)

  const { userInformation } = useSelector(state => state.user)
  const navigate = useNavigate()

  const fetchSuggessions = () => {

    axios.get(`/api/friendlist/similar-users?limit=${limit}&skip=${skip}`)
      .then((response) => {
        // console.log(response.data);
        setSuggession(response.data);
      })
      .catch((err) => {
        console.log(err);
      })

  }

  const fetchFriendList = () => {
    axios.get('/api/friendlist/get-friendlist')
      .then((response) => {
        // console.log(response.data);
        setFriendList(response.data);
      })
      .catch((err) => {
        console.log(err);
      })
  }

  useEffect(() => {
    fetchSuggessions();
  }, [skip]);

  useEffect(() => {
    fetchFriendList();
  }, []);

  const handleClick = (id) => {
    axios.post('/api/friendlist/add-friends', {
      following: id,
      follower: userInformation._id
    })
      .then((response) => {
        console.log(response.data)
      })
      .catch((err) => {
        console.log(err);
      })

  }
  return (
    <div className='flex flex-col gap-2'>
      {suggession.length == 0 && 
      <div className='flex gap-4 items-center'>
        <div className="skeleton h-16 w-16 shrink-0 rounded-full"></div>
          <div className="skeleton h-4 w-20"></div>
      </div>}
      {suggession?.map((item, index) => {
        return (
          <div key={index} className='flex items-center my-3 gap-2'>
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
            <button onClick={() => handleClick(item._id)} type="button" className="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-3 py-1.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">{friendList.following?.includes(item._id) ? "following" : "follow"}</button>
          </div>
        )
      })}
      <button disabled={suggession.length == 0} onClick={() => setSkip((prev) => prev + limit)} className='w-fit btn btn-success'>Refresh</button>
    </div>
  )
}

export default FriendSuggessions