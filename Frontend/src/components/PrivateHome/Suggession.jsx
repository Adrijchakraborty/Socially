import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const Suggession = () => {
  const { userInformation } = useSelector(state => state.user)
  return (
    <div className='px-3'>
      <Link to={`/profile/${userInformation.username}`}>
        <div className='py-5 cursor-pointer flex items-center gap-2'>
          <div
            style={{ backgroundImage: `url(${userInformation.profile})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundPosition: 'center' }}
            className='w-8 h-8 rounded-full '>

          </div>
          <p>Your Profile</p>
        </div>
      </Link>
      <div>
        <h1 className='text-sm'>Suggessions :</h1>
      </div>
    </div>
  )
}

export default Suggession