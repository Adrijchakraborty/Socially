import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Sidebar } from '../components';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ProfileContent from './profile/ProfileContent';

const Profile = () => {
  const [user, setUser] = useState();

  const { userInformation } = useSelector(state => state.user);

  const params = useParams()

  useEffect(() => {
    axios.get(`/api/auth/get-user?username=${params.name}`)
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => {
        console.log(error);
      })
  }, [params.name])

  return (
    <div className='flex flex-col-reverse md:flex-row min-h-screen max-w-[1440px] mx-auto'>
      <div className='sticky top-0 h-screen md:min-w-[15vw] lg:min-w-[20vw] xl:min-w-[290px]'>
        <Sidebar />
      </div>
      <div className="hidden md:block border-l h-screen border-gray-400"></div>
      <div className='w-full'>
        <div className='flex flex-col gap-2 items-center py-3 px-3 justify-center'>
          <div id='profile-image'
            style={{
              backgroundImage: `url(${user?.profile})`,
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
            className="w-16 h-16 rounded-full">
          </div>
          {user?._id === userInformation?._id && <button className='bg-red-400 w-8 z-10'>edit</button>}
          <p>{user?.username}</p>
          {user?._id === userInformation?._id && <button className='bg-red-400 w-8 z-10'>edit</button>}
        </div>
        <div>
          <ProfileContent />

        </div>
      </div>
    </div>
  )
}

export default Profile