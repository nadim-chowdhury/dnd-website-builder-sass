import { jwtDecode } from "jwt-decode";
import { getCookie, setCookie, deleteCookie } from "./cookie";

/**
 * Interface for JWT token payload
 */
interface TokenPayload {
  userId: string;
  email: string;
  role: string;
  iat: number;
  exp: number;
}

/**
 * Store authentication tokens in cookies
 */
export const storeAuthTokens = (accessToken: string, refreshToken: string) => {
  setCookie("access_token", accessToken, { path: "/", maxAge: 3600 }); // 1 hour
  setCookie("refresh_token", refreshToken, { path: "/", maxAge: 604800 }); // 7 days
};

/**
 * Clear authentication tokens from cookies
 */
export const clearAuthTokens = () => {
  deleteCookie("access_token");
  deleteCookie("refresh_token");
};

/**
 * Get the current access token from cookies
 */
export const getAccessToken = (): string | null => {
  return getCookie("access_token");
};

/**
 * Get the current refresh token from cookies
 */
export const getRefreshToken = (): string | null => {
  return getCookie("refresh_token");
};

/**
 * Check if user is authenticated
 */
export const isAuthenticated = (): boolean => {
  const token = getAccessToken();
  if (!token) return false;

  try {
    const decoded = jwtDecode<TokenPayload>(token);
    return decoded.exp * 1000 > Date.now();
  } catch (error) {
    return false;
  }
};

/**
 * Get current user information from token
 */
export const getCurrentUser = (): TokenPayload | null => {
  const token = getAccessToken();
  if (!token) return null;

  try {
    return jwtDecode<TokenPayload>(token);
  } catch (error) {
    return null;
  }
};

/**
 * Get user role from token
 */
export const getUserRole = (): string | null => {
  const user = getCurrentUser();
  return user ? user.role : null;
};

/**
 * Check if token is about to expire (within 5 minutes)
 */
export const isTokenExpiringSoon = (): boolean => {
  const token = getAccessToken();
  if (!token) return false;

  try {
    const decoded = jwtDecode<TokenPayload>(token);
    // Check if token expires in less than 5 minutes
    return decoded.exp * 1000 < Date.now() + 5 * 60 * 1000;
  } catch (error) {
    return false;
  }
};

/**
 * Helper function to create auth headers
 */
export const createAuthHeaders = (): Record<string, string> => {
  const token = getAccessToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
};
