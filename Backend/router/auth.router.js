import express from 'express'
import { getUser, login, logout, signup, updateUser } from '../controller/auth.controller.js';
import {verifyToken} from "../utils/verifyToken.js"

const router = express.Router()

router.post('/sign-up', signup);
router.post('/login',login);
router.put('/update',updateUser);
router.get('/get-user',verifyToken,getUser);
router.get('/logout-user',verifyToken,logout);

export default router;