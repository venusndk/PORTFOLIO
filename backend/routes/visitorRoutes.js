import express from "express";
import rateLimit from "express-rate-limit";
import { trackVisitor, getVisitorList } from "../controllers/visitorController.js";
import { adminAuth } from "../middleware/adminAuth.js";

const router = express.Router();

// 1 tracking call per 30 seconds per IP — prevents beacon spam
const trackLimiter = rateLimit({
  windowMs: 30 * 1000,
  max: 1,
  standardHeaders: true,
  legacyHeaders: false,
  skip: () => false,
});

// Public: record a visit
router.post("/track", trackLimiter, trackVisitor);

// Protected: retrieve all visits (admin only)
router.get("/", adminAuth, getVisitorList);

export default router;
