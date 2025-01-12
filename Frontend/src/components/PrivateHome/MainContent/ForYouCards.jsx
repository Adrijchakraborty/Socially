import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import axios from 'axios';
import CardItem from './CardItem';



const ForYouCards = () => {
    const [posts,setPosts] = useState([])
    const { userInformation } = useSelector(state => state.user);

    useEffect(() =>{
        axios.get('/api/post/get-all')
        .then((res)=>{
            setPosts(res.data);
        })
        .catch((err) => {
            console.log(err);
        })
    },[])
    return (
        <div>
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

export default ForYouCards