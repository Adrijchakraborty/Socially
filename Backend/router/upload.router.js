import express from 'express'
import {verifyToken} from "../utils/verifyToken.js"
import { imageUpload } from '../controller/upload.controller.js';
import multer from 'multer';

const router = express.Router()
const upload = multer({ storage: multer.memoryStorage() });

router.post('/upload-image',upload.single('file') ,imageUpload);

export default router;