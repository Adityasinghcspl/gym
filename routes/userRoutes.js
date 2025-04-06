import express from 'express';
import { authorizeAdmin, validateToken } from '../middleware/validateTokenHandler.js';
import { registerUser, currentUser, loginUser, getAllUsers, getUser, deleteUser, updateUserByAdmin, updateUserPasswordByAdmin, requestUserPasswordReset, resetUserPassword } from '../controllers/User.js';

const router = express.Router();

// Specific routes first
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/current", validateToken, currentUser);
router.get("/", validateToken, getAllUsers);

// Password reset routes
router.post("/password-reset", requestUserPasswordReset);
router.post("/password-reset/:userId/:token", resetUserPassword);

// Generic dynamic route
router.get("/:id", validateToken, getUser);
router.delete("/:id", validateToken, authorizeAdmin, deleteUser);
router.patch("/:id", validateToken, authorizeAdmin, updateUserByAdmin);
router.patch("/update/password/:id", validateToken, authorizeAdmin, updateUserPasswordByAdmin);

export default router;
