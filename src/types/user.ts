// User interface
export interface User {
  id: string;
  email: string;
  username?: string;
  profile: UserProfile;
  settings: UserSettings;
  subscription: UserSubscription;
  stats: UserStats;
  createdAt: string;
  updatedAt: string;
  lastLoginAt?: string;
  isVerified: boolean;
  role: UserRole;
  teams?: UserTeam[];
}

// User roles
export enum UserRole {
  USER = "user",
  ADMIN = "admin",
  MODERATOR = "moderator",
}

// User profile
export interface UserProfile {
  firstName: string;
  lastName: string;
  displayName?: string;
  avatar?: string;
  bio?: string;
  company?: string;
  jobTitle?: string;
  location?: string;
  phone?: string;
  website?: string;
  socialLinks?: {
    twitter?: string;
    linkedin?: string;
    github?: string;
    instagram?: string;
    facebook?: string;
    dribbble?: string;
    [key: string]: string | undefined;
  };
}

// User settings
export interface UserSettings {
  theme: "light" | "dark" | "system";
  emailNotifications: EmailNotificationSettings;
  timezone: string;
  language: string;
  editorSettings: EditorSettings;
  twoFactorEnabled: boolean;
  privacy: PrivacySettings;
  marketingEmails: boolean;
}

// Email notification settings
export interface EmailNotificationSettings {
  projectComments: boolean;
  teamUpdates: boolean;
  productUpdates: boolean;
  securityAlerts: boolean;
  billingAlerts: boolean;
  newFeatures: boolean;
}

// Editor settings
export interface EditorSettings {
  defaultTemplateCategory?: string;
  autoSave: boolean;
  autoSaveInterval: number; // in milliseconds
  showGrid: boolean;
  snapToGrid: boolean;
  defaultBreakpoint: string;
  defaultView: "desktop" | "mobile" | "tablet";
  customComponents?: string[]; // IDs of custom components to load by default
}

// Privacy settings
export interface PrivacySettings {
  profileVisibility: "public" | "private" | "team";
  shareProjectData: boolean;
  allowAnalytics: boolean;
  showProjectsInGallery: boolean;
}

// User subscription
export interface UserSubscription {
  plan: SubscriptionPlan;
  status: SubscriptionStatus;
  currentPeriodStart: string;
  currentPeriodEnd: string;
  cancelAtPeriodEnd?: boolean;
  trialEnd?: string;
  paymentMethod?: PaymentMethod;
  invoices?: Invoice[];
}

// Subscription plan
export enum SubscriptionPlan {
  FREE = "free",
  STARTER = "starter",
  PROFESSIONAL = "professional",
  ENTERPRISE = "enterprise",
}

// Subscription status
export enum SubscriptionStatus {
  ACTIVE = "active",
  CANCELED = "canceled",
  PAST_DUE = "past_due",
  TRIALING = "trialing",
  INCOMPLETE = "incomplete",
  INCOMPLETE_EXPIRED = "incomplete_expired",
}

// Payment method
export interface PaymentMethod {
  id: string;
  type: "card" | "paypal" | "bank_transfer";
  last4?: string;
  expiryMonth?: number;
  expiryYear?: number;
  brand?: string;
  isDefault: boolean;
}

// Invoice
export interface Invoice {
  id: string;
  number: string;
  amount: number;
  currency: string;
  status: "paid" | "open" | "void" | "draft";
  date: string;
  pdf?: string;
}

// User stats
export interface UserStats {
  projectsCount: number;
  publishedProjectsCount: number;
  templatesCreated: number;
  storage: {
    used: number;
    total: number;
    unit: "KB" | "MB" | "GB";
  };
  lastActive: string;
  collaborations: number;
  activeDays: number;
}

// User team
export interface UserTeam {
  id: string;
  name: string;
  role: "owner" | "admin" | "member";
  avatar?: string;
  membersCount: number;
  projectsCount: number;
}

// Authentication inputs

// Registration input
export interface RegisterInput {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  username?: string;
  marketingConsent?: boolean;
}

// Login input
export interface LoginInput {
  email: string;
  password: string;
  rememberMe?: boolean;
}

// Password change request
export interface PasswordChangeRequest {
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}

// Password reset request
export interface PasswordResetRequest {
  email: string;
}

// Password reset completion
export interface PasswordResetCompletion {
  token: string;
  newPassword: string;
  confirmNewPassword: string;
}

// User update input
export interface UserUpdateInput {
  profile?: Partial<UserProfile>;
  settings?: Partial<UserSettings>;
}

// User activity
export interface UserActivity {
  id: string;
  userId: string;
  action: string;
  details?: any;
  ipAddress?: string;
  userAgent?: string;
  createdAt: string;
}

// User invitation
export interface UserInvitation {
  id: string;
  email: string;
  role: "member" | "admin";
  invitedBy: string;
  teamId?: string;
  projectId?: string;
  status: "pending" | "accepted" | "expired";
  createdAt: string;
  expiresAt: string;
}

// User API key
export interface UserApiKey {
  id: string;
  name: string;
  key: string; // Only shown once upon creation
  lastUsed?: string;
  createdAt: string;
  expiresAt?: string;
  scopes: string[];
}

// User OAuth connection
export interface UserOAuthConnection {
  provider: "google" | "github" | "facebook" | "twitter";
  providerId: string;
  email: string;
  displayName: string;
  avatar?: string;
  connectedAt: string;
  lastUsed?: string;
  scopes: string[];
}

// User session
export interface UserSession {
  id: string;
  deviceName: string;
  browser: string;
  operatingSystem: string;
  ipAddress: string;
  location?: string;
  createdAt: string;
  lastActiveAt: string;
  isCurrent: boolean;
}
