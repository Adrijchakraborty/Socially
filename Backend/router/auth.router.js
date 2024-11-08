import express from 'express'
import { login, signup, updateUser } from '../controller/auth.controller.js';

const router = express.Router()

router.post('/sign-up', signup);
router.post('/login',login);
router.put('/update',updateUser);

export default router;