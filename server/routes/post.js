import express from "express";
import {getFeedPosts, getUserPosts, likePost} from "../controllers/post.js";
import { varifyToken } from "../middleware/auth.js";


const router = express.Router();

/* read */
router.get('/', varifyToken, getFeedPosts);
router.get('/:userId/posts', varifyToken, getUserPosts);

/* update */
router.patch('/:id/like', varifyToken, likePost);

export default router;