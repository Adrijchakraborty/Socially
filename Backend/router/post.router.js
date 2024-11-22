import express from 'express'
import { createPost, editComments, editLikes, getPost, getUserPosts } from '../controller/post.controller.js';
import {verifyToken} from "../utils/verifyToken.js"

const router = express.Router()

router.post('/create-post', verifyToken , createPost);
router.get('/get-user-posts', verifyToken , getUserPosts);
router.get('/get-post/:id', verifyToken , getPost);
router.post('/edit-likes/:id', verifyToken , editLikes);
router.post('/edit-comments/:id', verifyToken , editComments);


export default router;