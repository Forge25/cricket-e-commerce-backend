import jwt, { Secret, SignOptions } from "jsonwebtoken";
import { Provider, Role } from "../../generated/prisma";

export interface JWTPayload {
  id: string;
  email: string;
  role: Role;
  provider: Provider;
}

const JWT_SECRET: Secret = process.env.JWT_SECRET || "your-secret-key";
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "7d";

/**
 * Generate JWT token with user payload
 */
export const generateToken = (payload: JWTPayload): string => {
  const plainPayload = {
    id: payload.id,
    email: payload.email,
    role: String(payload.role),
    provider: String(payload.provider),
  };

  return jwt.sign(plainPayload, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN as string | number,
  } as SignOptions);
};

/**
 * Verify and decode JWT token
 */
export const verifyToken = (token: string): JWTPayload => {
  try {
    return jwt.verify(token, JWT_SECRET) as JWTPayload;
  } catch (error) {
    throw new Error("Invalid or expired token");
  }
};
