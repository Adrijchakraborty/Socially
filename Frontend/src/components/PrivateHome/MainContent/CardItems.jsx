import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import axios from 'axios';
import CardItem from './CardItem';



const CardItems = () => {
    const [posts,setPosts] = useState([])
    const [prevImg,setPrevImg] = useState()
    const { userInformation } = useSelector(state => state.user);

    const [skip,setSkip] = useState(0);
    const [limit,setLimit] = useState(10);

    useEffect(() => {
        axios
            .get(`/api/post/get-following-feed?limit=${limit}&skip=${skip}`)
            .then((res) => {
                setPosts([...posts,...res.data]);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [skip]);

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
            {posts.length == 0 && <p className='min-h-screen flex justify-center items-center'>Follow people to see this page</p>}
            {posts?.map((post,index) =>{
                return (
                    <div className='card-items' key={index}>
                        <CardItem  value={{post,userInformation}}/>
                    </div>                   
                )
            })}
        </div>
    )
}

export default CardItems