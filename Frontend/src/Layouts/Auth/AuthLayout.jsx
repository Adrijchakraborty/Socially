import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { Outlet,Navigate } from 'react-router-dom'

const AuthLayout = () => {
  const {userInformation} = useSelector(state=>state.user);
  return userInformation ? <Navigate to={'/'}/> : <Outlet/>;
}

export default AuthLayout