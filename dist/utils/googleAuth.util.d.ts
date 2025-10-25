export interface GoogleUserInfo {
    email: string;
    name: string;
    picture?: string;
    sub: string;
}
/**
 * Verify Google ID token and extract user information
 */
export declare const verifyGoogleToken: (idToken: string) => Promise<GoogleUserInfo>;
//# sourceMappingURL=googleAuth.util.d.ts.map