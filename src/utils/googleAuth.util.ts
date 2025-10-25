import { OAuth2Client } from "google-auth-library";

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export interface GoogleUserInfo {
  email: string;
  name: string;
  picture?: string;
  sub: string;
}

/**
 * Verify Google ID token and extract user information
 */
export const verifyGoogleToken = async (
  idToken: string
): Promise<GoogleUserInfo> => {
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

    const userInfo: GoogleUserInfo = {
      email: payload.email,
      name: payload.name || "",
      sub: payload.sub,
    };

    if (payload.picture) {
      userInfo.picture = payload.picture;
    }

    return userInfo;
  } catch (error) {
    throw new Error("Failed to verify Google token");
  }
};
