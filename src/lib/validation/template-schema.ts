import { z } from "zod";
import { ProjectSchema } from "./project-schema";

// Schema for template categories
export const TemplateCategorySchema = z.enum([
  "landing-page",
  "portfolio",
  "blog",
  "e-commerce",
  "business",
  "personal",
  "education",
  "nonprofit",
  "event",
  "restaurant",
  "health",
  "fitness",
  "photography",
  "travel",
  "real-estate",
  "other",
]);

// Schema for template difficulty level
export const TemplateDifficultySchema = z.enum([
  "beginner",
  "intermediate",
  "advanced",
]);

// Schema for template features
export const TemplateFeatureSchema = z.enum([
  "responsive",
  "animations",
  "forms",
  "e-commerce",
  "blog",
  "gallery",
  "contact-form",
  "newsletter",
  "social-media",
  "maps",
  "search",
  "multi-language",
  "authentication",
  "dark-mode",
  "seo-optimized",
  "accessibility",
]);

// Schema for template metadata
export const TemplateMetaSchema = z.object({
  name: z.string().min(3, "Template name must be at least 3 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  thumbnail: z.string().url("Thumbnail must be a valid URL"),
  previewUrl: z.string().url("Preview URL must be a valid URL").optional(),
  category: TemplateCategorySchema,
  subcategories: z.array(z.string()).optional(),
  tags: z.array(z.string()).optional(),
  features: z.array(TemplateFeatureSchema).optional(),
  difficulty: TemplateDifficultySchema.default("intermediate"),
  popularity: z.number().min(0).default(0),
  rating: z.number().min(0).max(5).default(0),
  ratingCount: z.number().min(0).default(0),
  createdAt: z.date().or(z.string()),
  updatedAt: z.date().or(z.string()),
  version: z.string().default("1.0.0"),
  author: z.object({
    id: z.string().uuid(),
    name: z.string(),
    avatar: z.string().url().optional(),
  }),
  isPremium: z.boolean().default(false),
  price: z.number().min(0).default(0),
  isOfficial: z.boolean().default(false),
  isRecommended: z.boolean().default(false),
  isPublished: z.boolean().default(false),
});

// Schema for template requirements
export const TemplateRequirementsSchema = z.object({
  minEditorVersion: z.string().optional(),
  plugins: z.array(z.string()).optional(),
  dependencies: z.array(z.string()).optional(),
});

// Schema for template customization options
export const TemplateCustomizationSchema = z.object({
  colorSchemes: z
    .array(
      z.object({
        id: z.string(),
        name: z.string(),
        colors: z.record(z.string()),
      })
    )
    .optional(),

  fontPairings: z
    .array(
      z.object({
        id: z.string(),
        name: z.string(),
        heading: z.string(),
        body: z.string(),
      })
    )
    .optional(),

  layoutOptions: z
    .array(
      z.object({
        id: z.string(),
        name: z.string(),
        value: z.string(),
      })
    )
    .optional(),

  customizableElements: z
    .array(
      z.object({
        id: z.string(),
        name: z.string(),
        type: z.enum(["image", "text", "color", "font", "layout"]),
        description: z.string().optional(),
      })
    )
    .optional(),
});

// Schema for template usage statistics
export const TemplateUsageStatsSchema = z.object({
  views: z.number().default(0),
  downloads: z.number().default(0),
  createdProjects: z.number().default(0),
  lastDownloadedAt: z.date().or(z.string()).nullable().optional(),
});

// Schema for template reviews
export const TemplateReviewSchema = z.object({
  id: z.string().uuid(),
  userId: z.string().uuid(),
  userName: z.string(),
  userAvatar: z.string().url().optional(),
  rating: z.number().min(1).max(5),
  comment: z.string().optional(),
  createdAt: z.date().or(z.string()),
  updatedAt: z.date().or(z.string()),
});

// Main template schema
export const TemplateSchema = z.object({
  id: z.string().uuid(),
  meta: TemplateMetaSchema,
  project: ProjectSchema,
  requirements: TemplateRequirementsSchema.optional(),
  customization: TemplateCustomizationSchema.optional(),
  usageStats: TemplateUsageStatsSchema.optional(),
  reviews: z.array(TemplateReviewSchema).optional(),
});

// Template listing schema (lightweight version for browsing)
export const TemplateListingSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  description: z.string(),
  thumbnail: z.string().url(),
  previewUrl: z.string().url().optional(),
  category: TemplateCategorySchema,
  tags: z.array(z.string()).optional(),
  features: z.array(TemplateFeatureSchema).optional(),
  difficulty: TemplateDifficultySchema,
  rating: z.number().min(0).max(5),
  ratingCount: z.number().min(0),
  author: z.object({
    id: z.string().uuid(),
    name: z.string(),
    avatar: z.string().url().optional(),
  }),
  isPremium: z.boolean(),
  price: z.number().min(0),
  isOfficial: z.boolean(),
  isRecommended: z.boolean(),
  createdAt: z.date().or(z.string()),
  updatedAt: z.date().or(z.string()),
});

// Template category listing schema
export const TemplateCategoryListingSchema = z.object({
  id: TemplateCategorySchema,
  name: z.string(),
  description: z.string(),
  thumbnail: z.string().url(),
  count: z.number().min(0),
  featured: z.boolean().default(false),
});

// Export types
export type TemplateCategory = z.infer<typeof TemplateCategorySchema>;
export type TemplateDifficulty = z.infer<typeof TemplateDifficultySchema>;
export type TemplateFeature = z.infer<typeof TemplateFeatureSchema>;
export type TemplateMeta = z.infer<typeof TemplateMetaSchema>;
export type TemplateRequirements = z.infer<typeof TemplateRequirementsSchema>;
export type TemplateCustomization = z.infer<typeof TemplateCustomizationSchema>;
export type TemplateUsageStats = z.infer<typeof TemplateUsageStatsSchema>;
export type TemplateReview = z.infer<typeof TemplateReviewSchema>;
export type Template = z.infer<typeof TemplateSchema>;
export type TemplateListing = z.infer<typeof TemplateListingSchema>;
export type TemplateCategoryListing = z.infer<
  typeof TemplateCategoryListingSchema
>;

// Utility function to validate a template
export const validateTemplate = (template: unknown): Template => {
  return TemplateSchema.parse(template);
};

// Factory function to create a new template with default values
export function createTemplate(
  projectId: string,
  name: string,
  authorId: string,
  authorName: string,
  category: TemplateCategory,
  overrides: Partial<Template> = {}
): Template {
  const now = new Date();

  const baseTemplate: Template = {
    id: crypto.randomUUID(),
    meta: {
      name,
      description: `A ${category} template`,
      thumbnail: "https://placeholder.com/600x400",
      category,
      difficulty: "intermediate",
      popularity: 0,
      rating: 0,
      ratingCount: 0,
      createdAt: now,
      updatedAt: now,
      version: "1.0.0",
      author: {
        id: authorId,
        name: authorName,
      },
      isPremium: false,
      price: 0,
      isOfficial: false,
      isRecommended: false,
      isPublished: false,
    },
    project: {
      id: projectId,
      ownerId: authorId,
      meta: {
        title: name,
        description: `A ${category} template`,
        createdAt: now,
        updatedAt: now,
        isTemplate: true,
        status: "published",
        version: "1.0.0",
      },
      pages: [],
      components: {},
    },
    requirements: {
      minEditorVersion: "1.0.0",
    },
    customization: {
      colorSchemes: [],
      fontPairings: [],
    },
    usageStats: {
      views: 0,
      downloads: 0,
      createdProjects: 0,
    },
    reviews: [],
  };

  return {
    ...baseTemplate,
    ...overrides,
  };
}
