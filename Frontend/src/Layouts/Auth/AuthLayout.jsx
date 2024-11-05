import React, { useState } from 'react'
import { Outlet,Navigate } from 'react-router-dom'

const AuthLayout = () => {
  const [user,setUser] = useState()
  return user ? <Navigate to={'/'}/> : <Outlet/>;
}

export default AuthLayout