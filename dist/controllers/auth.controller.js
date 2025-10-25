"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCurrentUser = exports.googleAuthentication = exports.login = exports.register = void 0;
const auth_service_1 = require("../services/auth.service");
const prisma_1 = require("../../generated/prisma");
/**
 * Register a new user
 * POST /api/v1/auth/register
 */
const register = async (req, res) => {
    try {
        const { full_name, email, password, role } = req.body;
        // Validation
        if (!full_name || !email || !password) {
            res.status(400).json({
                success: false,
                message: "Please provide full name, email, and password",
            });
            return;
        }
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            res.status(400).json({
                success: false,
                message: "Please provide a valid email address",
            });
            return;
        }
        // Password validation (minimum 6 characters)
        if (password.length < 6) {
            res.status(400).json({
                success: false,
                message: "Password must be at least 6 characters long",
            });
            return;
        }
        // Role validation
        let userRole = prisma_1.Role.USER;
        if (role) {
            if (role !== "ADMIN" && role !== "USER") {
                res.status(400).json({
                    success: false,
                    message: "Invalid role. Must be either ADMIN or USER",
                });
                return;
            }
            userRole = role;
        }
        const registerData = {
            fullName: full_name,
            email,
            password,
            role: userRole,
        };
        const result = await (0, auth_service_1.registerUser)(registerData);
        res.status(201).json({
            success: true,
            message: result.message,
            data: {
                token: result.token,
                user: result.user,
            },
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: error.message || "Registration failed",
        });
    }
};
exports.register = register;
/**
 * Login user with email and password
 * POST /api/v1/auth/login
 */
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        // Validation
        if (!email || !password) {
            res.status(400).json({
                success: false,
                message: "Please provide email and password",
            });
            return;
        }
        const loginData = {
            email,
            password,
        };
        const result = await (0, auth_service_1.loginUser)(loginData);
        res.status(200).json({
            success: true,
            message: result.message,
            data: {
                token: result.token,
                user: result.user,
            },
        });
    }
    catch (error) {
        res.status(401).json({
            success: false,
            message: error.message || "Login failed",
        });
    }
};
exports.login = login;
/**
 * Authenticate with Google
 * POST /api/v1/auth/google
 */
const googleAuthentication = async (req, res) => {
    try {
        const { idToken } = req.body;
        // Validation
        if (!idToken) {
            res.status(400).json({
                success: false,
                message: "Please provide Google ID token",
            });
            return;
        }
        const googleAuthData = {
            idToken,
        };
        const result = await (0, auth_service_1.googleAuth)(googleAuthData);
        res.status(200).json({
            success: true,
            message: result.message,
            data: {
                token: result.token,
                user: result.user,
            },
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: error.message || "Google authentication failed",
        });
    }
};
exports.googleAuthentication = googleAuthentication;
/**
 * Get current authenticated user
 * GET /api/v1/auth/me
 */
const getCurrentUser = async (req, res) => {
    try {
        // User ID is attached by auth middleware
        const userId = req.user.id;
        const user = await (0, auth_service_1.getUserById)(userId);
        // Remove password from response
        const { password, ...userWithoutPassword } = user;
        res.status(200).json({
            success: true,
            data: {
                user: userWithoutPassword,
            },
        });
    }
    catch (error) {
        res.status(404).json({
            success: false,
            message: error.message || "User not found",
        });
    }
};
exports.getCurrentUser = getCurrentUser;
//# sourceMappingURL=auth.controller.js.map