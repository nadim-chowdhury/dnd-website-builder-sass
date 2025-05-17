import { z } from "zod";

// Schema for user roles
export const UserRoleSchema = z.enum(["user", "admin", "editor", "guest"]);

// Schema for subscription plans
export const SubscriptionPlanSchema = z.enum([
  "free",
  "basic",
  "pro",
  "enterprise",
  "custom",
]);

// Schema for subscription status
export const SubscriptionStatusSchema = z.enum([
  "active",
  "trialing",
  "past_due",
  "canceled",
  "incomplete",
  "incomplete_expired",
]);

// Schema for authentication providers
export const AuthProviderSchema = z.enum([
  "email",
  "google",
  "github",
  "facebook",
  "twitter",
  "apple",
]);

// Schema for user profile information
export const UserProfileSchema = z.object({
  firstName: z.string().min(1, "First name is required").max(50).optional(),
  lastName: z.string().min(1, "Last name is required").max(50).optional(),
  fullName: z.string().max(100).optional(),
  bio: z.string().max(500).optional(),
  avatar: z.string().url().optional(),
  website: z.string().url().optional(),
  company: z.string().max(100).optional(),
  jobTitle: z.string().max(100).optional(),
  location: z.string().max(100).optional(),
  phone: z.string().max(20).optional(),
  timezone: z.string().optional(),
  language: z.string().optional(),
  socialLinks: z
    .object({
      twitter: z.string().url().optional(),
      facebook: z.string().url().optional(),
      instagram: z.string().url().optional(),
      linkedin: z.string().url().optional(),
      github: z.string().url().optional(),
      dribbble: z.string().url().optional(),
      behance: z.string().url().optional(),
    })
    .optional(),
});

// Schema for user settings
export const UserSettingsSchema = z.object({
  theme: z.enum(["light", "dark", "system"]).default("system"),
  emailNotifications: z
    .object({
      marketing: z.boolean().default(true),
      security: z.boolean().default(true),
      updates: z.boolean().default(true),
      projectActivity: z.boolean().default(true),
      commentMentions: z.boolean().default(true),
    })
    .optional(),
  pushNotifications: z
    .object({
      projectComments: z.boolean().default(true),
      projectUpdates: z.boolean().default(true),
      mentions: z.boolean().default(true),
    })
    .optional(),
  displayLanguage: z.string().default("en"),
  editorPreferences: z
    .object({
      snapToGrid: z.boolean().default(true),
      showGuides: z.boolean().default(true),
      defaultView: z.enum(["desktop", "tablet", "mobile"]).default("desktop"),
      autosaveInterval: z.number().min(0).max(60).default(5),
      showComponentTree: z.boolean().default(true),
    })
    .optional(),
  defaultProjectSettings: z
    .object({
      template: z.string().optional(),
      theme: z.string().optional(),
      isPublic: z.boolean().default(false),
    })
    .optional(),
});

// Schema for user subscription
export const UserSubscriptionSchema = z.object({
  plan: SubscriptionPlanSchema.default("free"),
  status: SubscriptionStatusSchema.default("active"),
  trialEndsAt: z.date().or(z.string()).nullable().optional(),
  currentPeriodStart: z.date().or(z.string()).nullable().optional(),
  currentPeriodEnd: z.date().or(z.string()).nullable().optional(),
  cancelAtPeriodEnd: z.boolean().default(false),
  stripeCustomerId: z.string().optional(),
  stripeSubscriptionId: z.string().optional(),
  features: z
    .object({
      maxProjects: z.number().int().nonnegative(),
      maxCollaborators: z.number().int().nonnegative(),
      customDomain: z.boolean(),
      removeWatermark: z.boolean(),
      analytics: z.boolean(),
      priority: z.boolean(),
      storage: z.number().int().nonnegative(), // in MB
      exportFormats: z.array(z.string()),
      aiAssistant: z.boolean(),
      advancedSeo: z.boolean(),
      apiAccess: z.boolean(),
      supportLevel: z.enum(["basic", "priority", "dedicated"]),
      customCss: z.boolean(),
      customJs: z.boolean(),
      customFonts: z.boolean(),
    })
    .optional(),
});

// Schema for user usage metrics
export const UserUsageSchema = z.object({
  projectsCount: z.number().int().nonnegative().default(0),
  publishedProjectsCount: z.number().int().nonnegative().default(0),
  templatesCount: z.number().int().nonnegative().default(0),
  storageUsed: z.number().int().nonnegative().default(0), // in bytes
  apiCallsCount: z.number().int().nonnegative().default(0),
  lastLoginAt: z.date().or(z.string()).nullable().optional(),
  lastActivityAt: z.date().or(z.string()).nullable().optional(),
  lifetimeProjectsCreated: z.number().int().nonnegative().default(0),
  lifetimeExportsCount: z.number().int().nonnegative().default(0),
});

// Schema for user billing information
export const UserBillingSchema = z.object({
  name: z.string().optional(),
  email: z.string().email().optional(),
  address: z
    .object({
      line1: z.string().optional(),
      line2: z.string().optional(),
      city: z.string().optional(),
      state: z.string().optional(),
      postalCode: z.string().optional(),
      country: z.string().optional(),
    })
    .optional(),
  company: z
    .object({
      name: z.string().optional(),
      vatId: z.string().optional(),
    })
    .optional(),
  paymentMethods: z
    .array(
      z.object({
        id: z.string(),
        type: z.enum(["card", "paypal", "bank"]),
        isDefault: z.boolean(),
        details: z.record(z.any()),
        lastFour: z.string().optional(),
        expiryMonth: z.number().int().optional(),
        expiryYear: z.number().int().optional(),
        brand: z.string().optional(),
      })
    )
    .optional(),
  invoices: z
    .array(
      z.object({
        id: z.string(),
        number: z.string(),
        amount: z.number(),
        currency: z.string(),
        status: z.enum(["paid", "open", "void", "draft"]),
        date: z.date().or(z.string()),
        pdfUrl: z.string().url().optional(),
      })
    )
    .optional(),
});

// Schema for user authentication
export const UserAuthSchema = z.object({
  email: z.string().email("Invalid email address"),
  emailVerified: z.boolean().default(false),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .optional(),
  provider: AuthProviderSchema.default("email"),
  providerId: z.string().optional(),
  providerData: z.record(z.any()).optional(),
  twoFactorEnabled: z.boolean().default(false),
  twoFactorMethod: z.enum(["app", "sms", "email"]).optional(),
  resetPasswordToken: z.string().optional(),
  resetPasswordExpires: z.date().or(z.string()).optional(),
  verificationToken: z.string().optional(),
  verificationExpires: z.date().or(z.string()).optional(),
  passwordUpdatedAt: z.date().or(z.string()).optional(),
  failedLoginAttempts: z.number().int().nonnegative().default(0),
  lastFailedLoginAt: z.date().or(z.string()).nullable().optional(),
  accountLocked: z.boolean().default(false),
  accountLockedUntil: z.date().or(z.string()).nullable().optional(),
});

// Schema for user security questions
export const SecurityQuestionSchema = z.object({
  question: z.string(),
  answer: z.string(),
});

// Schema for API keys
export const ApiKeySchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  key: z.string(),
  createdAt: z.date().or(z.string()),
  lastUsedAt: z.date().or(z.string()).nullable().optional(),
  permissions: z.array(z.string()),
  expiresAt: z.date().or(z.string()).nullable().optional(),
});

// Schema for user collaborations
export const CollaborationSchema = z.object({
  projectId: z.string().uuid(),
  projectName: z.string(),
  role: z.enum(["owner", "editor", "viewer"]),
  invitedBy: z.string().uuid(),
  invitedAt: z.date().or(z.string()),
  acceptedAt: z.date().or(z.string()).nullable().optional(),
  lastAccessedAt: z.date().or(z.string()).nullable().optional(),
});

// Main user schema
export const UserSchema = z.object({
  id: z.string().uuid(),
  email: z.string().email("Invalid email address"),
  username: z
    .string()
    .min(3, "Username must be at least 3 characters")
    .max(30)
    .regex(
      /^[a-zA-Z0-9_-]+$/,
      "Username can only contain letters, numbers, underscores, and hyphens"
    )
    .optional(),
  roles: z.array(UserRoleSchema).default(["user"]),
  profile: UserProfileSchema.optional(),
  settings: UserSettingsSchema.optional(),
  subscription: UserSubscriptionSchema.optional(),
  usage: UserUsageSchema.optional(),
  billing: UserBillingSchema.optional(),
  auth: UserAuthSchema,
  securityQuestions: z.array(SecurityQuestionSchema).optional(),
  apiKeys: z.array(ApiKeySchema).optional(),
  collaborations: z.array(CollaborationSchema).optional(),
  createdAt: z.date().or(z.string()),
  updatedAt: z.date().or(z.string()),
  deletedAt: z.date().or(z.string()).nullable().optional(),
  active: z.boolean().default(true),
  onboardingCompleted: z.boolean().default(false),
  referredBy: z.string().uuid().nullable().optional(),
  referralCode: z.string().optional(),
});

// User login schema
export const UserLoginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
  rememberMe: z.boolean().optional(),
});

// User registration schema
export const UserRegistrationSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  firstName: z.string().min(1, "First name is required").max(50).optional(),
  lastName: z.string().min(1, "Last name is required").max(50).optional(),
  username: z
    .string()
    .min(3, "Username must be at least 3 characters")
    .max(30)
    .regex(
      /^[a-zA-Z0-9_-]+$/,
      "Username can only contain letters, numbers, underscores, and hyphens"
    )
    .optional(),
  agreeToTerms: z
    .boolean()
    .refine((val) => val === true, {
      message: "You must agree to the terms and conditions",
    }),
  marketingConsent: z.boolean().optional(),
  referralCode: z.string().optional(),
});

// User update schema
export const UserUpdateSchema = z
  .object({
    profile: UserProfileSchema.partial().optional(),
    settings: UserSettingsSchema.partial().optional(),
    username: z
      .string()
      .min(3, "Username must be at least 3 characters")
      .max(30)
      .regex(
        /^[a-zA-Z0-9_-]+$/,
        "Username can only contain letters, numbers, underscores, and hyphens"
      )
      .optional(),
    currentPassword: z.string().optional(),
    newPassword: z
      .string()
      .min(8, "New password must be at least 8 characters")
      .optional(),
    confirmPassword: z.string().optional(),
  })
  .refine(
    (data) => !data.newPassword || data.newPassword === data.confirmPassword,
    {
      message: "Passwords do not match",
      path: ["confirmPassword"],
    }
  )
  .refine((data) => !data.newPassword || data.currentPassword, {
    message: "Current password is required to set a new password",
    path: ["currentPassword"],
  });

// Password reset request schema
export const PasswordResetRequestSchema = z.object({
  email: z.string().email("Invalid email address"),
});

// Password reset confirmation schema
export const PasswordResetConfirmationSchema = z
  .object({
    token: z.string(),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

// Export types
export type UserRole = z.infer<typeof UserRoleSchema>;
export type SubscriptionPlan = z.infer<typeof SubscriptionPlanSchema>;
export type SubscriptionStatus = z.infer<typeof SubscriptionStatusSchema>;
export type AuthProvider = z.infer<typeof AuthProviderSchema>;
export type UserProfile = z.infer<typeof UserProfileSchema>;
export type UserSettings = z.infer<typeof UserSettingsSchema>;
export type UserSubscription = z.infer<typeof UserSubscriptionSchema>;
export type UserUsage = z.infer<typeof UserUsageSchema>;
export type UserBilling = z.infer<typeof UserBillingSchema>;
export type UserAuth = z.infer<typeof UserAuthSchema>;
export type SecurityQuestion = z.infer<typeof SecurityQuestionSchema>;
export type ApiKey = z.infer<typeof ApiKeySchema>;
export type Collaboration = z.infer<typeof CollaborationSchema>;
export type User = z.infer<typeof UserSchema>;
export type UserLogin = z.infer<typeof UserLoginSchema>;
export type UserRegistration = z.infer<typeof UserRegistrationSchema>;
export type UserUpdate = z.infer<typeof UserUpdateSchema>;
export type PasswordResetRequest = z.infer<typeof PasswordResetRequestSchema>;
export type PasswordResetConfirmation = z.infer<
  typeof PasswordResetConfirmationSchema
>;

// Utility function to validate a user
export const validateUser = (user: unknown): User => {
  return UserSchema.parse(user);
};

// Factory function to create a new user with default values
export function createUser(
  email: string,
  password: string,
  firstName?: string,
  lastName?: string,
  overrides: Partial<User> = {}
): User {
  const now = new Date();

  const baseUser: User = {
    id: crypto.randomUUID(),
    email,
    roles: ["user"],
    auth: {
      email,
      emailVerified: false,
      password,
      provider: "email",
      twoFactorEnabled: false,
      failedLoginAttempts: 0,
      accountLocked: false,
    },
    profile: {
      firstName,
      lastName,
      fullName: firstName && lastName ? `${firstName} ${lastName}` : undefined,
    },
    settings: {
      theme: "system",
      displayLanguage: "en",
      emailNotifications: {
        marketing: true,
        security: true,
        updates: true,
        projectActivity: true,
        commentMentions: true,
      },
      editorPreferences: {
        snapToGrid: true,
        showGuides: true,
        defaultView: "desktop",
        autosaveInterval: 5,
        showComponentTree: true,
      },
    },
    subscription: {
      plan: "free",
      status: "active",
      cancelAtPeriodEnd: false,
      features: {
        maxProjects: 3,
        maxCollaborators: 0,
        customDomain: false,
        removeWatermark: false,
        analytics: false,
        priority: false,
        storage: 100, // 100 MB
        exportFormats: ["html", "zip"],
        aiAssistant: false,
        advancedSeo: false,
        apiAccess: false,
        supportLevel: "basic",
        customCss: false,
        customJs: false,
        customFonts: false,
      },
    },
    usage: {
      projectsCount: 0,
      publishedProjectsCount: 0,
      templatesCount: 0,
      storageUsed: 0,
      apiCallsCount: 0,
      lifetimeProjectsCreated: 0,
      lifetimeExportsCount: 0,
    },
    createdAt: now,
    updatedAt: now,
    active: true,
    onboardingCompleted: false,
  };

  return {
    ...baseUser,
    ...overrides,
  };
}
