import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { API_BASE_URL } from "@/lib/constants/api";

/**
 * ApiClient class provides a wrapper around axios for making HTTP requests
 */
class ApiClient {
  private client: AxiosInstance;
  private token: string | null;

  constructor() {
    this.token = null;
    this.client = axios.create({
      baseURL: API_BASE_URL,
      headers: {
        "Content-Type": "application/json",
      },
    });

    // Setup interceptors
    this.setupInterceptors();
  }

  /**
   * Setup request and response interceptors
   */
  private setupInterceptors(): void {
    // Request interceptor
    this.client.interceptors.request.use(
      (config) => {
        // Add authorization token if available
        if (this.token) {
          config.headers["Authorization"] = `Bearer ${this.token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Response interceptor
    this.client.interceptors.response.use(
      (response) => {
        return response;
      },
      async (error) => {
        // Handle 401 Unauthorized errors (token expired)
        if (error.response && error.response.status === 401) {
          // Try to refresh token or redirect to login
          if (typeof window !== "undefined") {
            // Clear local storage
            localStorage.removeItem("authToken");
            // Redirect to login page
            window.location.href = "/login";
          }
        }
        return Promise.reject(error);
      }
    );
  }

  /**
   * Set the authentication token
   * @param token - JWT token
   */
  public setToken(token: string): void {
    this.token = token;
    // Store token in localStorage for persistence
    if (typeof window !== "undefined") {
      localStorage.setItem("authToken", token);
    }
  }

  /**
   * Clear the authentication token
   */
  public clearToken(): void {
    this.token = null;
    // Remove token from localStorage
    if (typeof window !== "undefined") {
      localStorage.removeItem("authToken");
    }
  }

  /**
   * Initialize token from localStorage (call on app startup)
   */
  public initToken(): void {
    if (typeof window !== "undefined") {
      const storedToken = localStorage.getItem("authToken");
      if (storedToken) {
        this.token = storedToken;
      }
    }
  }

  /**
   * Make a GET request
   * @param url - Endpoint URL
   * @param config - Axios request config
   * @returns Promise with response data
   */
  public async get<T = any>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<T> {
    const response: AxiosResponse<T> = await this.client.get(url, config);
    return response.data;
  }

  /**
   * Make a POST request
   * @param url - Endpoint URL
   * @param data - Request payload
   * @param config - Axios request config
   * @returns Promise with response data
   */
  public async post<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T> {
    const response: AxiosResponse<T> = await this.client.post(
      url,
      data,
      config
    );
    return response.data;
  }

  /**
   * Make a PUT request
   * @param url - Endpoint URL
   * @param data - Request payload
   * @param config - Axios request config
   * @returns Promise with response data
   */
  public async put<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T> {
    const response: AxiosResponse<T> = await this.client.put(url, data, config);
    return response.data;
  }

  /**
   * Make a PATCH request
   * @param url - Endpoint URL
   * @param data - Request payload
   * @param config - Axios request config
   * @returns Promise with response data
   */
  public async patch<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T> {
    const response: AxiosResponse<T> = await this.client.patch(
      url,
      data,
      config
    );
    return response.data;
  }

  /**
   * Make a DELETE request
   * @param url - Endpoint URL
   * @param config - Axios request config
   * @returns Promise with response data
   */
  public async delete<T = any>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<T> {
    const response: AxiosResponse<T> = await this.client.delete(url, config);
    return response.data;
  }

  /**
   * Upload file(s)
   * @param url - Endpoint URL
   * @param formData - FormData with files
   * @param config - Axios request config
   * @returns Promise with response data
   */
  public async upload<T = any>(
    url: string,
    formData: FormData,
    config?: AxiosRequestConfig
  ): Promise<T> {
    const response: AxiosResponse<T> = await this.client.post(url, formData, {
      ...config,
      headers: {
        ...config?.headers,
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  }
}

// Create a singleton instance
const apiClient = new ApiClient();

// Initialize token on startup
if (typeof window !== "undefined") {
  apiClient.initToken();
}

export default apiClient;
