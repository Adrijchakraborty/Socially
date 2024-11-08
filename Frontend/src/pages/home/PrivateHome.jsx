import React from 'react'
import { Header, MainContent, Sidebar, Suggession } from '../../components'

const PrivateHome = () => {
  return (
    <div className='flex min-h-screen'>
      <div className=''>
        <Sidebar />
      </div>
      <div className='flex-1'>
        <Header />
        <MainContent />
      </div>
      <div className=''><Suggession /></div>
    </div>
  )
}

export default PrivateHome