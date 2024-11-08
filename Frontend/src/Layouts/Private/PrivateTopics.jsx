import React, { useContext } from 'react'
import { GlobalContext } from '../../context/Context'
import { Navigate, Outlet } from 'react-router-dom';

const PrivateTopics = () => {
    const {userInfo} = useContext(GlobalContext);
  return userInfo ? <Outlet/> : <Navigate to={'/sign-up'}/>
}

export default PrivateTopics