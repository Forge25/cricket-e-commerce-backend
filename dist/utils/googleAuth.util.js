"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyGoogleToken = void 0;
const google_auth_library_1 = require("google-auth-library");
const client = new google_auth_library_1.OAuth2Client(process.env.GOOGLE_CLIENT_ID);
/**
 * Verify Google ID token and extract user information
 */
const verifyGoogleToken = async (idToken) => {
    try {
        const googleClientId = process.env.GOOGLE_CLIENT_ID;
        if (!googleClientId) {
            throw new Error("GOOGLE_CLIENT_ID is not configured");
        }
        const ticket = await client.verifyIdToken({
            idToken,
            audience: googleClientId,
        });
        const payload = ticket.getPayload();
        if (!payload || !payload.email) {
            throw new Error("Invalid Google token payload");
        }
        const userInfo = {
            email: payload.email,
            name: payload.name || "",
            sub: payload.sub,
        };
        if (payload.picture) {
            userInfo.picture = payload.picture;
        }
        return userInfo;
    }
    catch (error) {
        throw new Error("Failed to verify Google token");
    }
};
exports.verifyGoogleToken = verifyGoogleToken;
//# sourceMappingURL=googleAuth.util.js.map