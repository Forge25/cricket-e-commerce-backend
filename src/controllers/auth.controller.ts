import { Request, Response } from "express";
import {
  registerUser,
  loginUser,
  googleAuth,
  getUserById,
  RegisterDTO,
  LoginDTO,
  GoogleAuthDTO,
} from "../services/auth.service";
import { Role } from "../../generated/prisma";

/**
 * Register a new user
 * POST /api/v1/auth/register
 */
export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { full_name, email, password } = req.body;

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

    // Don't pass role - database default will set it to USER
    const registerData: RegisterDTO = {
      fullName: full_name,
      email,
      password,
      // role is omitted - database will use default value (USER)
    };

    const result = await registerUser(registerData);

    res.status(201).json({
      success: true,
      message: result.message,
      data: {
        token: result.token,
        user: result.user,
      },
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message || "Registration failed",
    });
  }
};

/**
 * Login user with email and password
 * POST /api/v1/auth/login
 */
export const login = async (req: Request, res: Response): Promise<void> => {
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

    const loginData: LoginDTO = {
      email,
      password,
    };

    const result = await loginUser(loginData);

    res.status(200).json({
      success: true,
      message: result.message,
      data: {
        token: result.token,
        user: result.user,
      },
    });
  } catch (error: any) {
    res.status(401).json({
      success: false,
      message: error.message || "Login failed",
    });
  }
};

/**
 * Authenticate with Google
 * POST /api/v1/auth/google
 */
export const googleAuthentication = async (
  req: Request,
  res: Response
): Promise<void> => {
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

    const googleAuthData: GoogleAuthDTO = {
      idToken,
    };

    const result = await googleAuth(googleAuthData);

    res.status(200).json({
      success: true,
      message: result.message,
      data: {
        token: result.token,
        user: result.user,
      },
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message || "Google authentication failed",
    });
  }
};

/**
 * Get current authenticated user
 * GET /api/v1/auth/me
 */
export const getCurrentUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    // User ID is attached by auth middleware
    const userId = (req as any).user.id;

    const user = await getUserById(userId);

    // Remove password from response
    const { password, ...userWithoutPassword } = user;

    res.status(200).json({
      success: true,
      data: {
        user: userWithoutPassword,
      },
    });
  } catch (error: any) {
    res.status(404).json({
      success: false,
      message: error.message || "User not found",
    });
  }
};
