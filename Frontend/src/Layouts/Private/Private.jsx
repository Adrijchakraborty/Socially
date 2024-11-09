import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const Private = () => {
   const {userInformation} = useSelector(state=>state.user)
  return userInformation ? <Outlet/> : <Navigate to={'/'}/>
}

export default Private