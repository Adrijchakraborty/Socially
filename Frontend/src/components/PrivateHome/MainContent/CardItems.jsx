import React from 'react'
import { AiOutlineLike, AiFillLike } from "react-icons/ai";
import { FaRegComment, FaComment } from "react-icons/fa6";
import { useSelector } from 'react-redux'
import { LazyLoadImage } from 'react-lazy-load-image-component';

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

const CardItems = () => {
    const { userInformation } = useSelector(state => state.user)
    return (
        <div>
            <div id='card-item' className='py-2'>
                <div id='header' className='flex items-center gap-2 py-2'>
                    <div
                        style={{ backgroundImage: `url(${userInformation.profile})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundPosition: 'center' }}
                        className={`w-8 h-8 rounded-full`}>

                    </div>
                    <p>{userInformation.username}</p>
                </div>
                <div id='content' className='py-2'>
                    <img src="https://images.pexels.com/photos/26953529/pexels-photo-26953529/free-photo-of-woman-holding-vinyl-disk.jpeg?auto=compress&cs=tinysrgb&w=600" alt="" className='border' />
                </div>
                <div id='like-comment' className='flex gap-4 py-2 text-xl'>
                    {likeComment.map((icon, index) => {
                        return (
                            <span key={index} className='cursor-pointer hover:opacity-40 transition'> <icon.icon /> </span>
                        )
                    })}
                </div>
                <div id='write-comment'>
                    <input type="text" placeholder='write your comment...' className='outline-none bg-transparent py-3' />
                </div>
                <div className="border-t border-gray-400"></div>
            </div>
            <div id='card-item' className='py-2'>
                <div id='header' className='flex items-center gap-2 py-2'>
                    <div
                        style={{ backgroundImage: `url(${userInformation.profile})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundPosition: 'center' }}
                        className={`w-8 h-8 rounded-full`}>

                    </div>
                    <p>{userInformation.username}</p>
                </div>
                <div id='content' className='py-2'>
                    <LazyLoadImage
                        alt={'content'}
                        src={'https://images.pexels.com/photos/26953529/pexels-photo-26953529/free-photo-of-woman-holding-vinyl-disk.jpeg?auto=compress&cs=tinysrgb&w=600'}
                    />

                </div>
                <div id='like-comment' className='flex gap-4 py-2 text-xl'>
                    {likeComment.map((icon, index) => {
                        return (
                            <span key={index} className='cursor-pointer hover:opacity-40 transition'> <icon.icon /> </span>
                        )
                    })}
                </div>
                <div id='write-comment'>
                    <input type="text" placeholder='write your comment...' className='outline-none bg-transparent py-3' />
                </div>
                <div className="border-t border-gray-400"></div>
            </div>
        </div>
    )
}

export default CardItems