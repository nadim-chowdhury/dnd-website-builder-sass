import { apiClient } from "./api-client";
import {
  User,
  UserProfile,
  UserSettings,
  PasswordChangeRequest,
} from "../types/user";

/**
 * Users service - handles all user-related API calls
 */
export const usersService = {
  /**
   * Get the current authenticated user's profile
   * @returns Promise with user data
   */
  getCurrentUser: async (): Promise<User> => {
    return apiClient.get<User>("/users/me");
  },

  /**
   * Update the current user's profile information
   * @param profileData User profile data to update
   * @returns Promise with updated user data
   */
  updateProfile: async (profileData: Partial<UserProfile>): Promise<User> => {
    return apiClient.patch<User>("/users/me/profile", profileData);
  },

  /**
   * Update user account settings
   * @param settings Settings to update
   * @returns Promise with updated user settings
   */
  updateSettings: async (
    settings: Partial<UserSettings>
  ): Promise<UserSettings> => {
    return apiClient.patch<UserSettings>("/users/me/settings", settings);
  },

  /**
   * Change user password
   * @param passwordData Current and new password
   * @returns Promise with success message
   */
  changePassword: async (
    passwordData: PasswordChangeRequest
  ): Promise<{ success: boolean; message: string }> => {
    return apiClient.post<{ success: boolean; message: string }>(
      "/users/me/change-password",
      passwordData
    );
  },

  /**
   * Upload a new profile picture
   * @param imageFile Image file to upload
   * @returns Promise with updated profile URL
   */
  uploadProfilePicture: async (
    imageFile: File
  ): Promise<{ imageUrl: string }> => {
    const formData = new FormData();
    formData.append("profileImage", imageFile);

    return apiClient.post<{ imageUrl: string }>(
      "/users/me/profile-picture",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
  },

  /**
   * Delete user account
   * @param confirmation Confirmation text or code
   * @returns Promise with operation result
   */
  deleteAccount: async (confirmation: {
    confirmationText: string;
  }): Promise<{ success: boolean }> => {
    return apiClient.delete<{ success: boolean }>("/users/me", {
      data: confirmation,
    });
  },

  /**
   * Get user subscription information
   * @returns Promise with subscription details
   */
  getSubscriptionInfo: async (): Promise<{
    plan: string;
    status: string;
    expiresAt?: string;
  }> => {
    return apiClient.get<{ plan: string; status: string; expiresAt?: string }>(
      "/users/me/subscription"
    );
  },

  /**
   * Verify user email address
   * @param token Verification token
   * @returns Promise with verification result
   */
  verifyEmail: async (
    token: string
  ): Promise<{ success: boolean; message: string }> => {
    return apiClient.post<{ success: boolean; message: string }>(
      "/users/verify-email",
      { token }
    );
  },

  /**
   * Request password reset
   * @param email User email address
   * @returns Promise with operation result
   */
  requestPasswordReset: async (
    email: string
  ): Promise<{ success: boolean; message: string }> => {
    return apiClient.post<{ success: boolean; message: string }>(
      "/users/reset-password",
      { email }
    );
  },

  /**
   * Complete password reset with token
   * @param token Reset token
   * @param newPassword New password
   * @returns Promise with operation result
   */
  resetPassword: async (
    token: string,
    newPassword: string
  ): Promise<{ success: boolean; message: string }> => {
    return apiClient.post<{ success: boolean; message: string }>(
      "/users/reset-password/confirm",
      {
        token,
        newPassword,
      }
    );
  },

  /**
   * Get user activity log
   * @param limit Maximum number of entries to return
   * @returns Promise with activity log entries
   */
  getActivityLog: async (
    limit = 10
  ): Promise<Array<{ activity: string; timestamp: string }>> => {
    return apiClient.get<Array<{ activity: string; timestamp: string }>>(
      `/users/me/activity?limit=${limit}`
    );
  },
};
