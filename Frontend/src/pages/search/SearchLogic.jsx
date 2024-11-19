import axios from 'axios'
import React, { useState } from 'react'

const SearchLogic = () => {
    const [search,setSearch] = useState([])
    const [searchInput,setSearchInput] = useState('')
    const handleChange = (e) => {
        setSearchInput(e.target.value)

        axios.get(`/api/search/search-user?username=${e.target.value}`)
        .then((response) =>{
            setSearch(response.data);
        })
        .catch((error) => {
            console.log(error)
        })
    }

    return (
        <div>
            <div className="form-control m-3">
                <input onChange={handleChange} type="text" placeholder="Search" className="input input-bordered w-auto" />
            </div>
            <div>
                {searchInput.length > 0 && search?.map((item,index)=>{
                    return (
                        <div key={index}>
                            {item.username}
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default SearchLogic