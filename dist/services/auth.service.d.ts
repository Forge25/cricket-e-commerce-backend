import { Provider, Role, User } from "../../generated/prisma";
export interface RegisterDTO {
    fullName: string;
    email: string;
    password: string;
    role?: Role;
}
export interface LoginDTO {
    email: string;
    password: string;
}
export interface GoogleAuthDTO {
    idToken: string;
}
export interface AuthResponse {
    message: string;
    token: string;
    user: {
        id: string;
        fullName: string;
        email: string;
        role: Role;
        provider: Provider;
    };
}
/**
 * Register a new user with email and password
 */
export declare const registerUser: (data: RegisterDTO) => Promise<AuthResponse>;
/**
 * Login user with email and password
 */
export declare const loginUser: (data: LoginDTO) => Promise<AuthResponse>;
/**
 * Authenticate user with Google ID token
 */
export declare const googleAuth: (data: GoogleAuthDTO) => Promise<AuthResponse>;
/**
 * Get user by ID
 */
export declare const getUserById: (userId: string) => Promise<User>;
//# sourceMappingURL=auth.service.d.ts.map