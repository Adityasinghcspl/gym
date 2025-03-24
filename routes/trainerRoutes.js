import express from 'express';
import { validateToken, authorizeAdmin } from '../middleware/validateTokenHandler.js';
import { registerTrainer, updateTrainerByAdmin, loginTrainer, getAllTrainers, getTrainer, deleteTrainer, updateTrainerPasswordByAdmin } from '../controllers/trainerController.js';

const router = express.Router();

// Specific routes first
router.post("/register", registerTrainer);
router.post("/login", loginTrainer);
router.get("/", validateToken, getAllTrainers);
// Generic dynamic route
router.get("/:id", validateToken, getTrainer);
router.delete("/:id", validateToken, authorizeAdmin, deleteTrainer);
router.patch("/:id", validateToken, authorizeAdmin, updateTrainerByAdmin);
router.patch("/update/password/:id", validateToken, authorizeAdmin, updateTrainerPasswordByAdmin);

export default router;
