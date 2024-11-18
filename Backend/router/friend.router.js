import express from 'express'
import {verifyToken} from "../utils/verifyToken.js"
import { findUsersWithCommonTopics, friendList } from '../controller/friend.controller.js';

const router = express.Router();

router.post('/friends', verifyToken , friendList);
router.get('/similar-users', verifyToken, findUsersWithCommonTopics);

export default router;