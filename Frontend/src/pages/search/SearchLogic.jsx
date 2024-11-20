import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from "react-router-dom"

const SearchLogic = () => {
    const [search, setSearch] = useState([])
    const [searchInput, setSearchInput] = useState('')

    const navigate = useNavigate()

    const handleChange = (e) => {
        setSearchInput(e.target.value)

        axios.get(`/api/search/search-user?username=${e.target.value}`)
            .then((response) => {
                setSearch(response.data);
            })
            .catch((error) => {
                console.log(error)
            })
    }

    return (
        <div className='mx-3'>
            <div className="form-control my-3">
                <input onChange={handleChange} type="text" placeholder="Search" className="input input-bordered w-auto" />
            </div>
            <div className='flex flex-col gap-2'>
                {searchInput.length > 0 && search.length == 0 &&
                    <div className='flex flex-col gap-3'>
                        <div className="skeleton h-4 w-28"></div>
                        <div className="skeleton h-4 w-full"></div>
                    </div>}
                {searchInput.length > 0 && search?.map((item, index) => {
                    return (
                        <div className='flex gap-2 items-center cursor-pointer' onClick={() => navigate(`/profile/${item.username}`)} key={index}>
                            <div
                                style={{
                                    backgroundImage: `url(${item.profile})`,
                                    backgroundRepeat: 'no-repeat',
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                }}
                                className='w-8 h-8 rounded-full'
                            ></div>
                            <p>{item.username}</p>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default SearchLogic