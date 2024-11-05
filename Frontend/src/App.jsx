import React from 'react'
import { Route,Routes } from 'react-router-dom'
import MainLayout from './Layouts/Main/MainLayout'
import { Home, Signup } from './pages'
import AuthLayout from './Layouts/Auth/AuthLayout'

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<MainLayout/>}>
        <Route index element={<Home/>}/>
      </Route>

      <Route element={<AuthLayout/>}>
        <Route path='/sign-up' element={<Signup/>}/>
      </Route>

    </Routes>
  )
}

export default App