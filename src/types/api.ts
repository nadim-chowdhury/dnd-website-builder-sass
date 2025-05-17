// Base API response interface
export interface ApiResponse<T = any> {
  data: T;
  status: number;
  message?: string;
}

// Error response from the API
export interface ApiError {
  status: number;
  message: string;
  errors?: Record<string, string[]>;
  code?: string;
}

// Pagination data structure
export interface PaginationData {
  page: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
}

// Paginated response structure
export interface PaginatedResponse<T> extends ApiResponse {
  data: T[];
  pagination: PaginationData;
}

// Query parameters for API requests
export interface QueryParams {
  [key: string]: string | number | boolean | undefined;
}

// Request options for API calls
export interface RequestOptions {
  headers?: Record<string, string>;
  params?: QueryParams;
  timeout?: number;
  data?: any;
  signal?: AbortSignal;
}

// API endpoints configuration
export interface ApiEndpoints {
  auth: {
    login: string;
    register: string;
    logout: string;
    refreshToken: string;
  };
  projects: {
    base: string;
    byId: (id: string) => string;
    publish: (id: string) => string;
  };
  templates: {
    base: string;
    byId: (id: string) => string;
    featured: string;
    categories: string;
  };
  users: {
    me: string;
    profile: string;
    settings: string;
    subscription: string;
    activity: string;
  };
}

// Auth token structure
export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

// File upload response
export interface FileUploadResponse {
  url: string;
  filename: string;
  size: number;
  mimeType: string;
}

// API client configuration
export interface ApiClientConfig {
  baseUrl: string;
  timeout: number;
  headers: Record<string, string>;
  withCredentials: boolean;
}
