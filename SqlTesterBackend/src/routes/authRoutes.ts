import { signup, login, logout, getUser } from "../controllers/authControllers";
import { authMiddleware } from "../middleware/authMiddleware";
import express from "express";

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login)
router.post('/getUser', authMiddleware, getUser)
router.post('/logout', authMiddleware, logout)

export default router;