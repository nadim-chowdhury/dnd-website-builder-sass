/**
 * API constants for the website builder application
 * Contains endpoints, request timeouts, and other API-related configurations
 */

// Base API URL - change for different environments
export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "https://api.websitebuilder.com/v1";

// API request timeout in milliseconds
export const API_TIMEOUT = 30000;

// API endpoints for different resources
export const API_ENDPOINTS = {
  // Auth endpoints
  AUTH: {
    LOGIN: "/auth/login",
    REGISTER: "/auth/register",
    LOGOUT: "/auth/logout",
    REFRESH_TOKEN: "/auth/refresh-token",
    FORGOT_PASSWORD: "/auth/forgot-password",
    RESET_PASSWORD: "/auth/reset-password",
    VERIFY_EMAIL: "/auth/verify-email",
  },

  // User endpoints
  USER: {
    PROFILE: "/users/profile",
    UPDATE: "/users/update",
    CHANGE_PASSWORD: "/users/change-password",
    DELETE: "/users/delete",
  },

  // Project endpoints
  PROJECTS: {
    BASE: "/projects",
    GET_ALL: "/projects",
    GET_ONE: (id: string) => `/projects/${id}`,
    CREATE: "/projects",
    UPDATE: (id: string) => `/projects/${id}`,
    DELETE: (id: string) => `/projects/${id}`,
    DUPLICATE: (id: string) => `/projects/${id}/duplicate`,
    PUBLISH: (id: string) => `/projects/${id}/publish`,
  },

  // Template endpoints
  TEMPLATES: {
    BASE: "/templates",
    GET_ALL: "/templates",
    GET_ONE: (id: string) => `/templates/${id}`,
    CREATE: "/templates",
    UPDATE: (id: string) => `/templates/${id}`,
    DELETE: (id: string) => `/templates/${id}`,
    APPLY: (id: string) => `/templates/${id}/apply`,
  },

  // Billing endpoints
  BILLING: {
    PLANS: "/billing/plans",
    SUBSCRIBE: "/billing/subscribe",
    CANCEL: "/billing/cancel",
    INVOICES: "/billing/invoices",
    PAYMENT_METHODS: "/billing/payment-methods",
  },

  // Asset management endpoints
  ASSETS: {
    UPLOAD: "/assets/upload",
    GET_ALL: "/assets",
    DELETE: (id: string) => `/assets/${id}`,
  },
};

// HTTP methods
export const HTTP_METHODS = {
  GET: "GET",
  POST: "POST",
  PUT: "PUT",
  PATCH: "PATCH",
  DELETE: "DELETE",
};

// Response status codes
export const STATUS_CODES = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  INTERNAL_SERVER_ERROR: 500,
};

// API error codes
export const ERROR_CODES = {
  NETWORK_ERROR: "NETWORK_ERROR",
  TIMEOUT: "TIMEOUT",
  SERVER_ERROR: "SERVER_ERROR",
  VALIDATION_ERROR: "VALIDATION_ERROR",
  AUTHENTICATION_ERROR: "AUTHENTICATION_ERROR",
  AUTHORIZATION_ERROR: "AUTHORIZATION_ERROR",
  RESOURCE_NOT_FOUND: "RESOURCE_NOT_FOUND",
  DUPLICATE_RESOURCE: "DUPLICATE_RESOURCE",
};

// Authentication constants
export const AUTH = {
  TOKEN_KEY: "auth_token",
  REFRESH_TOKEN_KEY: "refresh_token",
  EXPIRY_KEY: "token_expiry",
  USER_KEY: "user_data",
};

// API version
export const API_VERSION = "v1";

// Rate limiting (requests per minute)
export const RATE_LIMIT = 60;

// Pagination defaults
export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 20,
  MAX_LIMIT: 100,
};
