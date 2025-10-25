import { PrismaClient, Provider, Role, User } from "../../generated/prisma";
import { hashPassword, comparePassword } from "../utils/password.util";
import { generateToken, JWTPayload } from "../utils/jwt.util";
import { verifyGoogleToken } from "../utils/googleAuth.util";

const prisma = new PrismaClient();

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
export const registerUser = async (
  data: RegisterDTO
): Promise<AuthResponse> => {
  const { fullName, email, password, role } = data;

  // Check if user already exists
  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    throw new Error("User with this email already exists");
  }

  // Hash password
  const hashedPassword = await hashPassword(password);

  // Create user - role defaults to USER in database if not provided
  const user = await prisma.user.create({
    data: {
      fullName,
      email,
      password: hashedPassword,
      provider: Provider.LOCAL,
      ...(role && { role }), // Only include role if explicitly provided
    },
  });

  // Generate JWT token
  const tokenPayload: JWTPayload = {
    id: user.id,
    email: user.email,
    role: user.role,
    provider: user.provider,
  };

  const token = generateToken(tokenPayload);

  return {
    message: "User registered successfully",
    token,
    user: {
      id: user.id,
      fullName: user.fullName,
      email: user.email,
      role: user.role,
      provider: user.provider,
    },
  };
};

/**
 * Login user with email and password
 */
export const loginUser = async (data: LoginDTO): Promise<AuthResponse> => {
  const { email, password } = data;

  // Find user by email
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    throw new Error("Invalid email or password");
  }

  // Check if user registered with Google
  if (user.provider === Provider.GOOGLE) {
    throw new Error("Please use Google Sign-In for this account");
  }

  // Verify password
  if (!user.password) {
    throw new Error("Invalid email or password");
  }

  const isPasswordValid = await comparePassword(password, user.password);

  if (!isPasswordValid) {
    throw new Error("Invalid email or password");
  }

  // Generate JWT token
  const tokenPayload: JWTPayload = {
    id: user.id,
    email: user.email,
    role: user.role,
    provider: user.provider,
  };

  const token = generateToken(tokenPayload);

  return {
    message: "Login successful",
    token,
    user: {
      id: user.id,
      fullName: user.fullName,
      email: user.email,
      role: user.role,
      provider: user.provider,
    },
  };
};

/**
 * Authenticate user with Google ID token
 */
export const googleAuth = async (
  data: GoogleAuthDTO
): Promise<AuthResponse> => {
  const { idToken } = data;

  // Verify Google token
  const googleUser = await verifyGoogleToken(idToken);

  // Check if user exists
  let user = await prisma.user.findUnique({
    where: { email: googleUser.email },
  });

  // If user doesn't exist, create new user
  if (!user) {
    user = await prisma.user.create({
      data: {
        fullName: googleUser.name,
        email: googleUser.email,
        password: null,
        provider: Provider.GOOGLE,
        role: Role.USER,
      },
    });
  } else {
    // If user exists but registered with email/password
    if (user.provider === Provider.LOCAL) {
      throw new Error(
        "Account exists with email/password. Please use email login."
      );
    }
  }

  // Generate JWT token
  const tokenPayload: JWTPayload = {
    id: user.id,
    email: user.email,
    role: user.role,
    provider: user.provider,
  };

  const token = generateToken(tokenPayload);

  return {
    message: "Google authentication successful",
    token,
    user: {
      id: user.id,
      fullName: user.fullName,
      email: user.email,
      role: user.role,
      provider: user.provider,
    },
  };
};

/**
 * Get user by ID
 */
export const getUserById = async (userId: string): Promise<User> => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!user) {
    throw new Error("User not found");
  }

  return user;
};
