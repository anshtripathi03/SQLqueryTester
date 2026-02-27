import { getAllAssignments, getAssignment } from "../controllers/assignmentControllers";
import express from 'express'

const router = express.Router();

router.get("/", getAllAssignments);
router.get("/:id", getAssignment);

export default router;