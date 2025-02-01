import express from 'express';
import validateToken from '../middleware/validateTokenHandler.js';
import { registerUser, currentUser, loginUser, getAllUsers, getUser } from '../controllers/userController.js';

const router = express.Router();

// Specific routes first
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/current", validateToken, currentUser); 
router.get("/", validateToken, getAllUsers);
// Generic dynamic route
router.get("/:id", validateToken, getUser);

export default router;
