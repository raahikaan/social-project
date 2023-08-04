import express from "express";
import {
    getUser,
    getUserFriends,
    addRemoveFriend
} from "../controllers/user.js";
import { varifyToken } from "../middleware/auth.js";


const router = express.Router();

/* read */
router.get("/:id", varifyToken, getUser);
router.get(":id/friends", varifyToken, getUserFriends);

/* update */
router.patch(":/id/:friendId", varifyToken, addRemoveFriend);

export default router;