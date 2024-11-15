import express from 'express'
import { createPost } from '../controller/post.controller.js';
import {verifyToken} from "../utils/verifyToken.js"

const router = express.Router()

router.post('/create-post', createPost);

export default router;