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