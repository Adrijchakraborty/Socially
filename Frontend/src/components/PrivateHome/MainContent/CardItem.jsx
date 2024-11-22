import React, { useState } from 'react'
import { useNavigate } from "react-router-dom"
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { AiFillLike, AiOutlineLike } from 'react-icons/ai'
import { FaComment, FaRegComment } from 'react-icons/fa6'
import { IoSend } from 'react-icons/io5';
import axios from 'axios';
import { toast } from 'react-toastify';


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

const CardItem = ({ value }) => {
    const [comment, setComment] = useState('')
    const { post, userInformation } = value;
    const [currentPost, setCurrentPost] = useState(post)

    const navigate = useNavigate()

    const handleClick = (ind) => {

        if (ind == 0) {
            axios.post(`/api/post/edit-likes/${post._id}`)
                .then((res) => {
                    setCurrentPost(res.data)
                })
                .catch((err) => {
                    console.log(err)
                })
        }
        else if(ind == 1) {
            navigate(`/view-post/${currentPost?._id}`)
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        axios.post(`/api/post/edit-comments/${currentPost?._id}`, {
            comment: comment
        })
            .then((res) => {
                toast.success("Comment was successful");
            })
            .catch((err) => {
                console.log(err)
            })
        setComment('')
    }
    return (
        <div id='card-item' className='py-2'>
            <div id='header' className='flex items-center gap-2 py-2'>
                <div
                    style={{ backgroundImage: `url(${currentPost?.Ref?.profile})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundPosition: 'center' }}
                    className={`w-8 h-8 rounded-full`}>

                </div>
                <p onClick={() => navigate(`/profile/${currentPost?.Ref?.username}`)} className='cursor-pointer'>{currentPost?.Ref?.username}</p>
            </div>
            <div id='content' onClick={()=>navigate(`/view-post/${currentPost?._id}`)} className='py-2 cursor-pointer'>
                <LazyLoadImage
                    alt={'content'}
                    effect="blur"
                    src={currentPost.postImage}
                />
            </div>
            <div id='title'>
                <p>{currentPost?.postDetails}</p>
            </div>
            <div id='like-comment' className='flex gap-4 py-2 text-xl'>
                {likeComment.map((icon, index) => {
                    return (
                        <span key={index} onClick={() => handleClick(index)} className='cursor-pointer hover:opacity-40 transition flex gap-1'>{index == 0 && currentPost?.likes?.includes(userInformation._id) ?
                            <icon.selected /> : <icon.icon />
                        }
                            {index == 0 && currentPost?.likes?.length > 0 && <p className='text-sm'>{currentPost?.likes?.length}</p>}
                        </span>
                    )
                })}
            </div>
            <div id='write-comment'>
                <form onSubmit={handleSubmit} className='flex gap-2 items-center'>
                    <input onChange={(e) => setComment(e.target.value)} value={comment} type="text" placeholder='write your comment...' className='outline-none bg-transparent py-3' />
                    <button type='submit' className={`${comment.length == 0 && 'hidden'} cursor-pointer`}>
                        <IoSend />
                    </button>
                </form>
            </div>
            <div className="border-t border-gray-400"></div>
        </div>
    )
}

export default CardItem