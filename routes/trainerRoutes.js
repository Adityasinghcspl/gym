import express from 'express';
import validateToken from '../middleware/validateTokenHandler.js';
import { registerTrainer, currentTrainer, loginTrainer, getAllTrainers, getTrainer } from '../controllers/trainerController.js';

const router = express.Router();

// Specific routes first
router.post("/register", registerTrainer);
router.post("/login", loginTrainer);
router.get("/current", validateToken, currentTrainer); 
router.get("/", validateToken, getAllTrainers);
// Generic dynamic route
router.get("/:id", validateToken, getTrainer);

export default router;
