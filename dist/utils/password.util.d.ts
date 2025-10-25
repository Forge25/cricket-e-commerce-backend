/**
 * Hash password using bcrypt
 */
export declare const hashPassword: (password: string) => Promise<string>;
/**
 * Compare plain password with hashed password
 */
export declare const comparePassword: (password: string, hashedPassword: string) => Promise<boolean>;
//# sourceMappingURL=password.util.d.ts.map