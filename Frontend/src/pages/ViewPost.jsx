import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

import { Sidebar } from '../components';
import { AiFillLike, AiOutlineLike } from 'react-icons/ai';
import { FaComment, FaRegComment } from 'react-icons/fa6';
import { IoSend } from "react-icons/io5";
import { useSelector } from 'react-redux';



const likeComment = [
    {
        "icon": AiOutlineLike,
        "selected": AiFillLike
    },
    {
        "icon": FaRegComment,
        "selected": FaComment
    },
]

const ViewPost = () => {
    const [post, setPost] = useState()
    const [comment, setComment] = useState('')
    const { userInformation } = useSelector(state => state.user)

    const params = useParams();

    useEffect(() => {
        axios.get(`/api/post/get-post/${params.id}`)
            .then((res) => {
                setPost(res.data);
            })
            .catch((err) => {
                console.log(err);
            })
    }, [])

    const handleClick = (ind) => {

        if (ind == 0) {
            axios.post(`/api/post/edit-likes/${post._id}`)
                .then((res) => {
                    // console.log(res.data);
                })
                .catch((err) => {
                    console.log(err)
                })
        }
    }

    const handleSubmit = (e)=>{
        e.preventDefault();

        axios.post(`/api/post/edit-comments/${post._id}`,{
            comment : comment
        })
        .then((res)=>{
            
        })
        .catch((err) => {
            console.log(err)
        })
    }

    return (
        <div className='flex flex-col-reverse md:flex-row min-h-screen max-w-[1440px] mx-auto'>
            <div className='sticky top-0 h-screen md:min-w-[15vw] lg:min-w-[20vw] xl:min-w-[290px]'>
                <Sidebar />
            </div>
            <div className="hidden md:block border-l h-screen border-gray-400"></div>
            <div className='md:max-w-[60%] mx-auto flex flex-col sm:flex-row my-5 px-3 md:px-0 border border-gray-200'>
                <div>
                    <LazyLoadImage
                        alt={'PostImage'}
                        effect="blur"
                        src={post?.postImage}
                    />
                </div>

                <div className='min-w-[35%] '>
                    <div id='like-comment' className='flex gap-4 py-2 text-xl'>
                        {likeComment.map((icon, index) => {
                            return (
                                <span key={index} onClick={() => handleClick(index)} className='cursor-pointer hover:opacity-40 transition'>{index == 0 && post?.likes?.includes(userInformation._id) ?
                                    <icon.selected /> : <icon.icon />
                                }</span>
                            )
                        })}
                    </div>
                    <div>Likes {post?.likes?.length > 0 && post?.likes?.length}</div>
                    <div>
                        <form onSubmit={handleSubmit} className='flex gap-2 items-center'>
                            <input onChange={(e) => setComment(e.target.value)} type="text" placeholder='write your comment...' className='outline-none bg-transparent py-3' />
                            <button type='submit' className={`${comment.length == 0 && 'hidden'} cursor-pointer`}>
                                <IoSend />
                            </button>
                        </form>
                        <h1>Recent Comments</h1>
                        {post?.comments?.length == 0 && <p>No comments yet...</p>}
                        {post?.comments?.map((comment, index) => {
                            return (
                                <p key={index}>{comment.commentText}</p>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ViewPost