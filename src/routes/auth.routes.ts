import { Router } from "express";
import {
  register,
  login,
  googleAuthentication,
  getCurrentUser,
} from "../controllers/auth.controller";
import { authenticate } from "../middleware/auth.middleware";

const router = Router();

/**
 * @route   POST /api/v1/auth/register
 * @desc    Register a new user
 * @access  Public
 */
router.post("/register", register);

/**
 * @route   POST /api/v1/auth/login
 * @desc    Login user with email and password
 * @access  Public
 */
router.post("/login", login);

/**
 * @route   POST /api/v1/auth/google
 * @desc    Authenticate with Google
 * @access  Public
 */
router.post("/google", googleAuthentication);

/**
 * @route   GET /api/v1/auth/me
 * @desc    Get current authenticated user
 * @access  Protected
 */
router.get("/me", authenticate, getCurrentUser);

export default router;
