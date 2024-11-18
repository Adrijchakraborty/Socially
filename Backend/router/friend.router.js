import express from 'express'
import {verifyToken} from "../utils/verifyToken.js"
import { findUsersWithCommonTopics, friendList, getFriendList } from '../controller/friend.controller.js';

const router = express.Router();

router.post('/add-friends', verifyToken , friendList);
router.get('/get-friendlist',verifyToken, getFriendList);
router.get('/similar-users', verifyToken, findUsersWithCommonTopics);

export default router;