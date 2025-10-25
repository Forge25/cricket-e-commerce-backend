"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserById = exports.googleAuth = exports.loginUser = exports.registerUser = void 0;
const prisma_1 = require("../../generated/prisma");
const password_util_1 = require("../utils/password.util");
const jwt_util_1 = require("../utils/jwt.util");
const googleAuth_util_1 = require("../utils/googleAuth.util");
const prisma = new prisma_1.PrismaClient();
/**
 * Register a new user with email and password
 */
const registerUser = async (data) => {
    const { fullName, email, password, role = prisma_1.Role.USER } = data;
    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
        where: { email },
    });
    if (existingUser) {
        throw new Error("User with this email already exists");
    }
    // Hash password
    const hashedPassword = await (0, password_util_1.hashPassword)(password);
    // Create user
    const user = await prisma.user.create({
        data: {
            fullName,
            email,
            password: hashedPassword,
            provider: prisma_1.Provider.LOCAL,
            role,
        },
    });
    // Generate JWT token
    const tokenPayload = {
        id: user.id,
        email: user.email,
        role: user.role,
        provider: user.provider,
    };
    const token = (0, jwt_util_1.generateToken)(tokenPayload);
    return {
        message: "User registered successfully",
        token,
        user: {
            id: user.id,
            fullName: user.fullName,
            email: user.email,
            role: user.role,
            provider: user.provider,
        },
    };
};
exports.registerUser = registerUser;
/**
 * Login user with email and password
 */
const loginUser = async (data) => {
    const { email, password } = data;
    // Find user by email
    const user = await prisma.user.findUnique({
        where: { email },
    });
    if (!user) {
        throw new Error("Invalid email or password");
    }
    // Check if user registered with Google
    if (user.provider === prisma_1.Provider.GOOGLE) {
        throw new Error("Please use Google Sign-In for this account");
    }
    // Verify password
    if (!user.password) {
        throw new Error("Invalid email or password");
    }
    const isPasswordValid = await (0, password_util_1.comparePassword)(password, user.password);
    if (!isPasswordValid) {
        throw new Error("Invalid email or password");
    }
    // Generate JWT token
    const tokenPayload = {
        id: user.id,
        email: user.email,
        role: user.role,
        provider: user.provider,
    };
    const token = (0, jwt_util_1.generateToken)(tokenPayload);
    return {
        message: "Login successful",
        token,
        user: {
            id: user.id,
            fullName: user.fullName,
            email: user.email,
            role: user.role,
            provider: user.provider,
        },
    };
};
exports.loginUser = loginUser;
/**
 * Authenticate user with Google ID token
 */
const googleAuth = async (data) => {
    const { idToken } = data;
    // Verify Google token
    const googleUser = await (0, googleAuth_util_1.verifyGoogleToken)(idToken);
    // Check if user exists
    let user = await prisma.user.findUnique({
        where: { email: googleUser.email },
    });
    // If user doesn't exist, create new user
    if (!user) {
        user = await prisma.user.create({
            data: {
                fullName: googleUser.name,
                email: googleUser.email,
                password: null,
                provider: prisma_1.Provider.GOOGLE,
                role: prisma_1.Role.USER,
            },
        });
    }
    else {
        // If user exists but registered with email/password
        if (user.provider === prisma_1.Provider.LOCAL) {
            throw new Error("Account exists with email/password. Please use email login.");
        }
    }
    // Generate JWT token
    const tokenPayload = {
        id: user.id,
        email: user.email,
        role: user.role,
        provider: user.provider,
    };
    const token = (0, jwt_util_1.generateToken)(tokenPayload);
    return {
        message: "Google authentication successful",
        token,
        user: {
            id: user.id,
            fullName: user.fullName,
            email: user.email,
            role: user.role,
            provider: user.provider,
        },
    };
};
exports.googleAuth = googleAuth;
/**
 * Get user by ID
 */
const getUserById = async (userId) => {
    const user = await prisma.user.findUnique({
        where: { id: userId },
    });
    if (!user) {
        throw new Error("User not found");
    }
    return user;
};
exports.getUserById = getUserById;
//# sourceMappingURL=auth.service.js.map