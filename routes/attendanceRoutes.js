import express from "express";
import { validateToken } from '../middleware/validateTokenHandler.js';
import { markCheckIn, markCheckOut, getUserAttendance, deleteAttendance } from "../controllers/Attendance.js";

const router = express.Router();

router.post("/checkin", validateToken, markCheckIn);
router.patch("/checkout", validateToken, markCheckOut);
router.get("/user/:userId", validateToken, getUserAttendance);
router.delete("/:id", validateToken, deleteAttendance);

export default router;
