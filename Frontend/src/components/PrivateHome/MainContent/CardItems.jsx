import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import axios from 'axios';
import CardItem from './CardItem';



const CardItems = () => {
    const [posts,setPosts] = useState([])
    const { userInformation } = useSelector(state => state.user);

    useEffect(() =>{
        axios.get('/api/post/get-following-feed')
        .then((res)=>{
            setPosts(res.data);
        })
        .catch((err) => {
            console.log(err);
        })
    },[])
    return (
        <div>
            {posts.length == 0 && <p className='min-h-screen flex justify-center items-center'>Follow people to see this page</p>}
            {posts?.map((post,index) =>{
                return (
                    <div key={index}>
                        <CardItem  value={{post,userInformation}}/>
                    </div>                   
                )
            })}
        </div>
    )
}

export default CardItems