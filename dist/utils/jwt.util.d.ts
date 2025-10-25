import { Provider, Role } from "../../generated/prisma";
export interface JWTPayload {
    id: string;
    email: string;
    role: Role;
    provider: Provider;
}
/**
 * Generate JWT token with user payload
 */
export declare const generateToken: (payload: JWTPayload) => string;
/**
 * Verify and decode JWT token
 */
export declare const verifyToken: (token: string) => JWTPayload;
//# sourceMappingURL=jwt.util.d.ts.map