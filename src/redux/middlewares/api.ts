import { Middleware } from "redux";
import { RootState } from "../store";
import { API_BASE_URL } from "../../lib/constants/api";

// API request types
type ApiRequest = {
  url: string;
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  body?: any;
  headers?: Record<string, string>;
  onSuccess?: string;
  onError?: string;
  auth?: boolean;
  meta?: any;
};

// API middleware action type
export interface ApiAction {
  type: string;
  payload?: any;
  meta?: {
    api?: ApiRequest;
  };
}

/**
 * Middleware to handle API calls
 * This middleware will intercept actions with meta.api property
 * and make API requests based on that configuration
 */
export const apiMiddleware: Middleware<{}, RootState> =
  (store) => (next) => async (action: ApiAction) => {
    // If action doesn't have api meta property, just pass it through
    if (!action.meta?.api) {
      return next(action);
    }

    const {
      url,
      method,
      body,
      headers = {},
      onSuccess,
      onError,
      auth = true,
      meta,
    } = action.meta.api;

    // Pass the original action through
    next(action);

    try {
      // Setup request headers
      const requestHeaders: Record<string, string> = {
        "Content-Type": "application/json",
        ...headers,
      };

      // Add authorization header if required
      if (auth) {
        const token = store.getState().user.authToken;
        if (token) {
          requestHeaders["Authorization"] = `Bearer ${token}`;
        } else {
          // If auth is required but we don't have a token, throw an error
          throw new Error("Authentication required but no token available");
        }
      }

      // Make the request
      const response = await fetch(`${API_BASE_URL}${url}`, {
        method,
        headers: requestHeaders,
        body: body ? JSON.stringify(body) : undefined,
      });

      // Check for error response
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `API Error: ${response.status}`);
      }

      // Parse the response
      const data = await response.json().catch(() => ({}));

      // Dispatch success action if provided
      if (onSuccess) {
        store.dispatch({
          type: onSuccess,
          payload: data,
          meta: meta
            ? { ...meta, originalAction: action }
            : { originalAction: action },
        });
      }

      return data;
    } catch (error) {
      // Handle errors
      console.error("API request failed:", error);

      // Dispatch error action if provided
      if (onError) {
        store.dispatch({
          type: onError,
          payload: error instanceof Error ? error.message : "Unknown error",
          error: true,
          meta: meta
            ? { ...meta, originalAction: action }
            : { originalAction: action },
        });
      }

      // Re-throw to allow components to handle the error
      throw error;
    }
  };
