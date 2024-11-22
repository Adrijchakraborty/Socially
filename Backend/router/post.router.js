import express from 'express'
import { createPost, editComments, editLikes, getFollowingFeedPosts, getPost, getUserPosts } from '../controller/post.controller.js';
import {verifyToken} from "../utils/verifyToken.js"

const router = express.Router()

router.post('/create-post', verifyToken , createPost);
router.get('/get-user-posts', verifyToken , getUserPosts);
router.get('/get-post/:id', verifyToken , getPost);
router.post('/edit-likes/:id', verifyToken , editLikes);
router.post('/edit-comments/:id', verifyToken , editComments);
router.get('/get-following-feed', verifyToken , getFollowingFeedPosts);


export default router;