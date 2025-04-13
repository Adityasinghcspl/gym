import express from "express";
import { validateToken, authorizeAdmin } from '../middleware/validateTokenHandler.js';
import { createMembership, getAllMemberships, getMembershipById, updateMembership, deleteMembership } from "../controllers/Membership.js";

const router = express.Router();

//Access by the admin and trainer
router.get("/", authorizeAdmin, getAllMemberships);
router.get("/:id", authorizeAdmin, getMembershipById);

//Only Access by the admin
router.post("/", validateToken, authorizeAdmin, createMembership);
router.put("/:id", validateToken, authorizeAdmin, updateMembership);
router.delete("/:id", validateToken, authorizeAdmin, deleteMembership);

export default router;
