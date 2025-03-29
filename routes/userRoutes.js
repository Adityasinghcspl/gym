import express from 'express';
import { authorizeAdmin, validateToken } from '../middleware/validateTokenHandler.js';
import { registerUser, currentUser, loginUser, getAllUsers, getUser, deleteUser, updateUserByAdmin, updateUserPasswordByAdmin } from '../controllers/userController.js';

const router = express.Router();

// Specific routes first
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/current", validateToken, currentUser);
router.get("/", validateToken, getAllUsers);
// Generic dynamic route
router.get("/:id", validateToken, getUser);
router.delete("/:id", validateToken, authorizeAdmin, deleteUser);
router.patch("/:id", validateToken, authorizeAdmin, updateUserByAdmin);
router.patch("/update/password/:id", validateToken, authorizeAdmin, updateUserPasswordByAdmin);

export default router;
