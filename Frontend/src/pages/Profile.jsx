import React from 'react'
import { useSelector } from 'react-redux'
import { Sidebar } from '../components';

const Profile = () => {
  const { userInformation } = useSelector(state => state.user);
  return (
    <div className='flex flex-col-reverse md:flex-row min-h-screen max-w-[1440px] mx-auto'>
      <div className='sticky top-0 h-screen md:min-w-[15vw] lg:min-w-[20vw] xl:min-w-[290px]'>
        <Sidebar />
      </div>
      <div>
        <div className='flex flex-col gap-2 items-center py-3 px-3 justify-center'>
          <div id='profile-image'
            style={{
              backgroundImage: `url(${userInformation.profile})`,
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
            className="w-16 h-16 rounded-full"></div>
          <p>{userInformation.username}</p>
        </div>
        <div>
          <h1>Your posts</h1>

        </div>
      </div>
    </div>
  )
}

export default Profile