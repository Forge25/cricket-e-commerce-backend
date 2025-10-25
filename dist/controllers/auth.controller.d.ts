import { Request, Response } from "express";
/**
 * Register a new user
 * POST /api/v1/auth/register
 */
export declare const register: (req: Request, res: Response) => Promise<void>;
/**
 * Login user with email and password
 * POST /api/v1/auth/login
 */
export declare const login: (req: Request, res: Response) => Promise<void>;
/**
 * Authenticate with Google
 * POST /api/v1/auth/google
 */
export declare const googleAuthentication: (req: Request, res: Response) => Promise<void>;
/**
 * Get current authenticated user
 * GET /api/v1/auth/me
 */
export declare const getCurrentUser: (req: Request, res: Response) => Promise<void>;
//# sourceMappingURL=auth.controller.d.ts.map