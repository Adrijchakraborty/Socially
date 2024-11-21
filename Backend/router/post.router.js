import express from 'express'
import { createPost, getPost } from '../controller/post.controller.js';
import {verifyToken} from "../utils/verifyToken.js"

const router = express.Router()

router.post('/create-post', verifyToken , createPost);
router.get('/get-post', verifyToken , getPost);

export default router;