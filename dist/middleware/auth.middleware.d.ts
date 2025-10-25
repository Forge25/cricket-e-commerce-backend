import { Request, Response, NextFunction } from "express";
import { JWTPayload } from "../utils/jwt.util";
import { Role } from "../../generated/prisma";
declare global {
    namespace Express {
        interface Request {
            user?: JWTPayload;
        }
    }
}
/**
 * Middleware to verify JWT token
 */
export declare const authenticate: (req: Request, res: Response, next: NextFunction) => void;
/**
 * Middleware to authorize based on user role
 */
export declare const authorize: (...allowedRoles: Role[]) => (req: Request, res: Response, next: NextFunction) => void;
//# sourceMappingURL=auth.middleware.d.ts.map