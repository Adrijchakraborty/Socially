import React from 'react'
import { Route,Routes } from 'react-router-dom'
import MainLayout from './Layouts/Main/MainLayout'
import { Home, Login, Signup } from './pages'
import AuthLayout from './Layouts/Auth/AuthLayout'

const App = () => {
  return (
    <Routes>
      {/* main route */}
      <Route path='/' element={<MainLayout/>}>
        <Route index element={<Home/>}/>
      </Route>

      {/* protected route */}
      <Route element={<AuthLayout/>}>
        <Route path='/sign-up' element={<Signup/>}/>
        <Route path='/login' element={<Login/>}/>
      </Route>
    </Routes>
  )
}

export default App