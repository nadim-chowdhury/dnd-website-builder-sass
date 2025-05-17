import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { UserRole, SubscriptionTier } from "../../types/user";

// Basic selectors
export const selectUserState = (state: RootState) => state.user;
export const selectCurrentUser = (state: RootState) => state.user.currentUser;
export const selectAuthToken = (state: RootState) => state.user.authToken;
export const selectAuthStatus = (state: RootState) => state.user.authStatus;
export const selectUserLoading = (state: RootState) => state.user.loading;
export const selectUserError = (state: RootState) => state.user.error;
export const selectUserPreferences = (state: RootState) =>
  state.user.preferences;
export const selectNotifications = (state: RootState) =>
  state.user.notifications;
export const selectUserSubscription = (state: RootState) =>
  state.user.currentUser?.subscription;

// Derived selectors
export const selectIsAuthenticated = createSelector(
  [selectAuthStatus],
  (authStatus) => authStatus === "authenticated"
);

export const selectIsAdmin = createSelector(
  [selectCurrentUser],
  (user) => user?.role === UserRole.ADMIN
);

export const selectIsPremiumUser = createSelector(
  [selectUserSubscription],
  (subscription) => {
    if (!subscription) return false;

    return (
      subscription.tier === SubscriptionTier.PRO ||
      subscription.tier === SubscriptionTier.BUSINESS
    );
  }
);

export const selectUserTheme = createSelector(
  [selectUserPreferences],
  (preferences) => preferences.theme || "system"
);

export const selectUserLanguage = createSelector(
  [selectUserPreferences],
  (preferences) => preferences.language || "en"
);

export const selectUnreadNotificationsCount = createSelector(
  [selectNotifications],
  (notifications) =>
    notifications.filter((notification) => !notification.read).length
);

export const selectUserSubscriptionFeatures = createSelector(
  [selectUserSubscription],
  (subscription) => {
    const defaultFeatures = {
      maxProjects: 3,
      maxCollaborators: 0,
      customDomain: false,
      privateProjects: false,
      advancedAnalytics: false,
      exportOptions: ["html"],
      maxStorageGB: 1,
      prioritySupport: false,
      whiteLabeling: false,
      apiAccess: false,
    };

    if (!subscription) return defaultFeatures;

    switch (subscription.tier) {
      case SubscriptionTier.FREE:
        return defaultFeatures;

      case SubscriptionTier.PRO:
        return {
          maxProjects: 20,
          maxCollaborators: 5,
          customDomain: true,
          privateProjects: true,
          advancedAnalytics: true,
          exportOptions: ["html", "react", "next"],
          maxStorageGB: 10,
          prioritySupport: false,
          whiteLabeling: false,
          apiAccess: true,
        };

      case SubscriptionTier.BUSINESS:
        return {
          maxProjects: 100,
          maxCollaborators: 20,
          customDomain: true,
          privateProjects: true,
          advancedAnalytics: true,
          exportOptions: ["html", "react", "next", "vue", "angular"],
          maxStorageGB: 50,
          prioritySupport: true,
          whiteLabeling: true,
          apiAccess: true,
        };

      default:
        return defaultFeatures;
    }
  }
);

export const selectUserDisplayName = createSelector(
  [selectCurrentUser],
  (user) => {
    if (!user) return "";

    if (user.displayName) return user.displayName;

    if (user.firstName && user.lastName) {
      return `${user.firstName} ${user.lastName}`;
    }

    if (user.firstName) return user.firstName;

    return user.email ? user.email.split("@")[0] : "";
  }
);

export const selectUserInitials = createSelector(
  [selectCurrentUser],
  (user) => {
    if (!user) return "";

    if (user.firstName && user.lastName) {
      return `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`.toUpperCase();
    }

    if (user.displayName) {
      const nameParts = user.displayName.split(" ");
      if (nameParts.length > 1) {
        return `${nameParts[0].charAt(0)}${nameParts[nameParts.length - 1].charAt(0)}`.toUpperCase();
      }
      return nameParts[0].charAt(0).toUpperCase();
    }

    if (user.firstName) {
      return user.firstName.charAt(0).toUpperCase();
    }

    if (user.email) {
      return user.email.charAt(0).toUpperCase();
    }

    return "";
  }
);

export const selectCanAccessFeature = createSelector(
  [
    selectUserSubscriptionFeatures,
    (_, feature: keyof ReturnType<typeof selectUserSubscriptionFeatures>) =>
      feature,
  ],
  (features, feature) => {
    return typeof features[feature] === "boolean"
      ? features[feature]
      : features[feature] > 0;
  }
);

export const selectHasReachedProjectLimit = createSelector(
  [selectUserSubscriptionFeatures, (_, projectCount: number) => projectCount],
  (features, projectCount) => {
    return projectCount >= features.maxProjects;
  }
);

export const selectSubscriptionStatus = createSelector(
  [selectUserSubscription],
  (subscription) => {
    if (!subscription) return "inactive";

    const now = new Date();
    const expiryDate = new Date(subscription.expiresAt);

    if (expiryDate < now) {
      return "expired";
    }

    // Check if expiry is within 7 days
    const sevenDaysFromNow = new Date();
    sevenDaysFromNow.setDate(now.getDate() + 7);

    if (expiryDate < sevenDaysFromNow) {
      return "expiring-soon";
    }

    return "active";
  }
);

export const selectUserProfileCompleteness = createSelector(
  [selectCurrentUser],
  (user) => {
    if (!user) return 0;

    const fields = [
      "firstName",
      "lastName",
      "displayName",
      "bio",
      "avatar",
      "phoneNumber",
      "company",
      "position",
    ];

    const completedFields = fields.filter(
      (field) =>
        user[field as keyof typeof user] !== undefined &&
        user[field as keyof typeof user] !== null &&
        user[field as keyof typeof user] !== ""
    );

    return (completedFields.length / fields.length) * 100;
  }
);
