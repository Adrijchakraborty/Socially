import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import axios from 'axios';
import CardItem from './CardItem';



const ForYouCards = () => {
    const [posts,setPosts] = useState([])
    const [prevImg,setPrevImg] = useState()
    const { userInformation } = useSelector(state => state.user);

    const [skip,setSkip] = useState(0);
    const [limit,setLimit] = useState(10);

    useEffect(() => {
        axios
            .get(`/api/post/get-all?limit=${limit}&skip=${skip}`)
            .then((res) => {
                setPosts([...posts,...res.data]);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [limit,skip]);

    useEffect(() => {
        const observer = new IntersectionObserver((param)=>{
            if(param[0].isIntersecting){
                observer.unobserve(lastImage)
                setPrevImg(lastImage);
                setSkip(prev=>prev + 10);
            }
        })

        const lastImage = document.querySelector('.card-itmes:last-child');

        if(!lastImage || lastImage === prevImg) {
            return;
        }
        observer.observe(lastImage);
    },[posts])
    return (
        <div>
            {posts?.map((post,index) =>{
                return (
                    <div className='card-itmes' key={index}>
                        <CardItem  value={{post,userInformation}}/>
                    </div>                   
                )
            })}
        </div>
    )
}

export default ForYouCards