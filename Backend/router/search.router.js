import express from 'express'
import {verifyToken} from "../utils/verifyToken.js"
import { searchUser } from '../controller/search.controller.js';

const router = express.Router()

router.get('/search-user', verifyToken , searchUser);

export default router;