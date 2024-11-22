import React, { useEffect, useState } from 'react'
import {LazyPostComponent,LazyFollowerComponent,LazyFollowingComponent} from "./component"
import Loader from '../../utils/Loader'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useDispatch } from 'react-redux'

import { removeUser } from '../../redux/slice/userSlice'
import { useNavigate } from 'react-router-dom'

const ProfileItems = [
    {
        tag : "Posts",
        component : LazyPostComponent
    },
    {
        tag : "Followers",
        component : LazyFollowerComponent
    },
    {
        tag : "Following",
        component : LazyFollowingComponent
    },
]


const ProfileContent = ({value}) => {
    const [friendList, setFriendList] = useState([])

    const {userInformation,user,index,setIndex} = value;


    let Component = ProfileItems[index].component;
    const dispatch = useDispatch()
    const navigate = useNavigate()


    const handleClick = ()=>{
        axios.get('/api/auth/logout-user')
        .then((res)=>{
            toast.success("Logged out successfully");
            dispatch(removeUser());
            navigate('/')
        })
        .catch((err)=>{
            console.log(err);
        })
    }

    const handleClickFollow = (id) => {
        axios.post('/api/friendlist/add-friends', {
          following: id,
          follower: userInformation._id
        })
          .then((response) => {
            setFriendList(response.data)
          })
          .catch((err) => {
            console.log(err);
          })
    
      }

      const fetchFriendList = () => {
        axios.get(`/api/friendlist/get-friendlist?id=${userInformation?._id}`)
          .then((response) => {
            // console.log(response.data);
            setFriendList(response.data);
          })
          .catch((err) => {
            console.log(err);
          })
      }

      useEffect(() => {
        fetchFriendList();
      },[])
  return (
    <div className='flex sm:w-[80%] md:w-[70%] mx-auto flex-col my-5'>
        <div className='flex justify-center gap-6 relative'>
            {ProfileItems.map((profile,ind) =>{
                return (
                    <div onClick={()=>setIndex(ind)} key={ind} className='cursor-pointer hover:underline transition'>
                        {profile.tag}
                    </div>
                )
            })}
            <button onClick={handleClick} className={`${user?._id === userInformation?._id ? 'block' : 'hidden'} bg-red-400 px-2 py-1 rounded-full absolute right-0 top-0`}>Logout</button>
            <button onClick={() => handleClickFollow(user?._id)} type="button" hidden={user?._id === userInformation?._id} className="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-3 py-1.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">{friendList?.following?.some((item) => item._id === user._id) ? "following" : "follow"}</button>
        </div>
        <div className='mx-2 md:mx-0'>
            {
                <React.Suspense fallback={<Loader/>}>
                    < Component id={user?._id}/>
                </React.Suspense>
            }
        </div>
    </div>
  )
}

export default ProfileContent