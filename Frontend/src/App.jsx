import React from 'react'
import { Route, Routes } from 'react-router-dom'
import MainLayout from './Layouts/Main/MainLayout'
import { LazyHome, LazyLogIn, LazyMessages, LazyProfile, LazySearch, LazySignup } from './pages'
import AuthLayout from './Layouts/Auth/AuthLayout'
import SelectTopics from './pages/signup/SelectTopics'
import PrivateTopics from './Layouts/Private/PrivateTopics'
import Loader from './utils/Loader'
import Private from './Layouts/Private/Private'

const App = () => {
  return (
    <Routes>
      {/* main route */}
      <Route path='/' element={<MainLayout />}>
        <Route index element={<React.Suspense fallback={<Loader />}> <LazyHome /></React.Suspense>} />
        <Route element={<Private />}>
          <Route path='/profile/:name' element={<React.Suspense fallback={<Loader />}> <LazyProfile /></React.Suspense>} />
          <Route path='/messages' element={<React.Suspense fallback={<Loader />}> <LazyMessages /></React.Suspense>} />
          <Route path='/search' element={<React.Suspense fallback={<Loader />}> <LazySearch /></React.Suspense>} />
        </Route>
      </Route>

      {/* protected route */}
      <Route element={<AuthLayout />}>
        <Route path='/sign-up' element={<React.Suspense fallback={<Loader />}> <LazySignup /></React.Suspense>} />
        <Route element={<PrivateTopics />}>
          <Route path='/select-topics' element={<SelectTopics />} />
        </Route>
        <Route path='/login' element={<React.Suspense fallback={<Loader />}> <LazyLogIn /></React.Suspense>} />
      </Route>
    </Routes>
  )
}

export default App