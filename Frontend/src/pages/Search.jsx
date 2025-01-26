import React from 'react'
import { Sidebar } from '../components'
import SearchLogic from './search/SearchLogic'

const Search = () => {
    return (
        <div className='flex flex-col-reverse md:flex-row min-h-screen max-w-[1440px] mx-auto'>
      <div className='sticky top-0 md:min-w-[15vw] lg:min-w-[20vw] xl:min-w-[290px]'>
        <Sidebar />
      </div>
      <div className="border-r hidden md:block h-screen border-gray-400"></div>
      <div className='h-screen min-w-[30%]'>
        <SearchLogic />
      
      </div>
      <div className="border-r hidden md:block h-screen border-gray-400"></div>

    </div>
    )
}

export default Search