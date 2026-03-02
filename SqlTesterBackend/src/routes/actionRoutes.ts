import { executeQuery, getHint, getUserSolution } from "../controllers/actionController";
import express from 'express'
import { authMiddleware } from "../middleware/authMiddleware";
import { hintLimiter } from "../middleware/rateLimiter";

const router = express.Router();

router.post("/execute/:assignmentId",authMiddleware,executeQuery);
router.post("/hint/:assignmentId",authMiddleware, hintLimiter ,getHint);
router.get('/user/solutions', authMiddleware, getUserSolution);

export default router;