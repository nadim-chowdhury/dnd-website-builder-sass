import apiClient from "./api-client";
import { User } from "@/types/user";
// import { jwtDecode } from "jwt-decode";

/**
 * Interface for login response
 */
interface LoginResponse {
  user: User;
  token: string;
}

/**
 * Interface for registration response
 */
interface RegistrationResponse {
  user: User;
  token: string;
}

/**
 * Interface for decoded token
 */
interface DecodedToken {
  sub: string;
  email: string;
  name: string;
  exp: number;
  iat: number;
}

/**
 * Log in with email and password
 * @param email - User email
 * @param password - User password
 * @returns Promise with user data
 */
export const login = async (email: string, password: string): Promise<User> => {
  try {
    const response = await apiClient.post<LoginResponse>("/auth/login", {
      email,
      password,
    });

    // Store JWT token
    apiClient.setToken(response.token);

    return response.user;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Login failed: ${error.message}`);
    }
    throw new Error("Login failed");
  }
};

/**
 * Register a new user
 * @param email - User email
 * @param password - User password
 * @param name - User name
 * @returns Promise with user data
 */
export const register = async (
  email: string,
  password: string,
  name: string
): Promise<User> => {
  try {
    const response = await apiClient.post<RegistrationResponse>(
      "/auth/register",
      {
        email,
        password,
        name,
      }
    );

    // Store JWT token
    apiClient.setToken(response.token);

    return response.user;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Registration failed: ${error.message}`);
    }
    throw new Error("Registration failed");
  }
};

/**
 * Log out current user
 */
export const logout = async (): Promise<void> => {
  try {
    // Call logout endpoint
    await apiClient.post("/auth/logout");

    // Clear token locally
    apiClient.clearToken();
  } catch (error) {
    // Even if server-side logout fails, clear token locally
    apiClient.clearToken();

    if (error instanceof Error) {
      throw new Error(`Logout failed: ${error.message}`);
    }
    throw new Error("Logout failed");
  }
};

/**
 * Get current user from token
 * @returns Promise with user data or null if not authenticated
 */
export const getCurrentUser = async (): Promise<User | null> => {
  try {
    // Get stored token from localStorage
    const token = localStorage.getItem("authToken");

    if (!token) {
      return null;
    }

    // Validate token with server
    const user = await apiClient.get<User>("/auth/me");
    return user;
  } catch (error) {
    // Clear invalid token
    apiClient.clearToken();
    return null;
  }
};

/**
 * Check if current token is valid
 * @returns boolean indicating if token is valid
 */
export const isTokenValid = (): boolean => {
  const token = localStorage.getItem("authToken");

  if (!token) {
    return false;
  }

  try {
    // Decode token and check expiration
    const decodedToken = jwtDecode<DecodedToken>(token);
    const currentTime = Date.now() / 1000;

    return decodedToken.exp > currentTime;
  } catch {
    return false;
  }
};

/**
 * Request password reset
 * @param email - User email address
 */
export const requestPasswordReset = async (email: string): Promise<void> => {
  try {
    await apiClient.post("/auth/reset-password", { email });
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Password reset request failed: ${error.message}`);
    }
    throw new Error("Password reset request failed");
  }
};

/**
 * Confirm password reset with token and new password
 * @param token - Reset token from email
 * @param newPassword - New password
 */
export const confirmPasswordReset = async (
  token: string,
  newPassword: string
): Promise<void> => {
  try {
    await apiClient.post("/auth/reset-password/confirm", {
      token,
      password: newPassword,
    });
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Password reset confirmation failed: ${error.message}`);
    }
    throw new Error("Password reset confirmation failed");
  }
};

/**
 * Change password (when user is logged in)
 * @param currentPassword - Current password
 * @param newPassword - New password
 */
export const changePassword = async (
  currentPassword: string,
  newPassword: string
): Promise<void> => {
  try {
    await apiClient.post("/auth/change-password", {
      currentPassword,
      newPassword,
    });
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Password change failed: ${error.message}`);
    }
    throw new Error("Password change failed");
  }
};

/**
 * Verify email address with token
 * @param token - Email verification token
 */
export const verifyEmail = async (token: string): Promise<void> => {
  try {
    await apiClient.post("/auth/verify-email", { token });
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Email verification failed: ${error.message}`);
    }
    throw new Error("Email verification failed");
  }
};

/**
 * Send verification email
 * @param email - User email address
 */
export const sendVerificationEmail = async (email: string): Promise<void> => {
  try {
    await apiClient.post("/auth/send-verification-email", { email });
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Sending verification email failed: ${error.message}`);
    }
    throw new Error("Sending verification email failed");
  }
};
