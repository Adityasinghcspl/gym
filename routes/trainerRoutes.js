import express from 'express';
import { validateToken, authorizeAdmin } from '../middleware/validateTokenHandler.js';
import { registerTrainer, updateTrainerByAdmin, loginTrainer, getAllTrainers, getTrainer, deleteTrainer, updateTrainerPasswordByAdmin, requestTrainerPasswordReset, resetTrainerPassword } from '../controllers/Trainer.js';

const router = express.Router();

// Specific routes first
router.post("/register", registerTrainer);
router.post("/login", loginTrainer);
router.get("/", validateToken, getAllTrainers);

// Password reset routes
router.post("/password-reset", requestTrainerPasswordReset);
router.post("/password-reset/:userId/:token", resetTrainerPassword);

// Generic dynamic route
router.get("/:id", validateToken, getTrainer);
router.delete("/:id", validateToken, authorizeAdmin, deleteTrainer);
router.patch("/:id", validateToken, authorizeAdmin, updateTrainerByAdmin);
router.patch("/update/password/:id", validateToken, authorizeAdmin, updateTrainerPasswordByAdmin);

export default router;
