import axios from 'axios';
import React, { useState } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { toast } from 'react-toastify';

const CreatePostNext = ({ urlItem }) => {
  const { url } = urlItem;
  const [post, setPost] = useState({
    "postImage" : url
  });
  const [isLoaded, setIsLoaded] = useState(false);

  const handleChange = (e) => {
    setPost((prev)=>({
      ...prev,
      "postDetails" : e.target.value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post('/api/post/create-post',post)
    .then((response)=>{
      if(response.data.success == false) {
        return toast.error(response.data.message);
      }
      toast.success("post successfully created");
      // console.log(response.data)
    })
    .catch((error)=>{
      toast.error(error.message)
    })
  }

  return (
    <div className='h-full border-2 border-black'>
      <div className='flex min-h-[30vh] justify-center items-center py-3 relative'>
        {!isLoaded && <div className="skeleton min-h-32 min-w-32 absolute"></div>}
        <LazyLoadImage
          src={url}
          alt="ImagePreview"
          effect="blur"
          className={`max-h-[30vh] ${!isLoaded ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
          onLoad={() => setIsLoaded(true)}
        />
      </div>
      <div className="border-b border-gray-400"></div>
      <form onSubmit={handleSubmit}>
        <input
          onChange={handleChange}
          type="text"
          placeholder='Write something about the post...'
          className='outline-none w-full px-5 py-2'
        />
        <button
          type="submit"
          className="mx-3 my-2 px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Post
        </button>
      </form>
    </div>
  );
};

export default CreatePostNext;
