import axios from 'axios'
import React, { useEffect, useState } from 'react'
import {useNavigate} from "react-router-dom"
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

const PostComponent = ({ id }) => {
  const [posts, setPosts] = useState([]);

  const navigate = useNavigate()

  useEffect(() => {
    if (id) {
      axios.get(`/api/post/get-user-posts?id=${id}`)
        .then((response) => {
          setPosts(response.data);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, [id])
  return (
    <div className=' parent my-5'>
      {posts.length == 0 && <p>No posts</p>}
      {posts.map((post, index) => {
        return (
          <div key={index} onClick={()=>navigate(`/view-post/${post._id}`)} className='child cursor-pointer'>
            <LazyLoadImage
              alt="Posts"
              effect="blur"
              src={post.postImage}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />

          </div>
        )
      })}
    </div>
  )
}

export default PostComponent