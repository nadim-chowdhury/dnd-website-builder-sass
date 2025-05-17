import { z } from "zod";
import { BaseComponentSchema } from "./component-schema";

// Define schema for meta information
export const ProjectMetaSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  keywords: z.array(z.string()).optional(),
  author: z.string().optional(),
  createdAt: z.date().or(z.string()),
  updatedAt: z.date().or(z.string()),
  thumbnail: z.string().optional(),
  isPublic: z.boolean().default(false),
  isTemplate: z.boolean().default(false),
  category: z.string().optional(),
  tags: z.array(z.string()).optional(),
  status: z.enum(["draft", "published", "archived"]).default("draft"),
  version: z.string().default("1.0.0"),
});

// Schema for SEO settings
export const SEOSettingsSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  ogTitle: z.string().optional(),
  ogDescription: z.string().optional(),
  ogImage: z.string().optional(),
  twitterCard: z
    .enum(["summary", "summary_large_image", "app", "player"])
    .optional(),
  twitterTitle: z.string().optional(),
  twitterDescription: z.string().optional(),
  twitterImage: z.string().optional(),
  canonicalUrl: z.string().url().optional(),
  robots: z.string().optional(),
  favicon: z.string().optional(),
  structured: z.any().optional(), // Can be used for structured data (JSON-LD)
});

// Schema for page information
export const PageSchema = z.object({
  id: z.string().uuid(),
  slug: z
    .string()
    .regex(
      /^[a-z0-9-]+$/,
      "Slug must contain only lowercase alphanumeric characters and hyphens"
    ),
  title: z.string(),
  description: z.string().optional(),
  isHome: z.boolean().default(false),
  isPublished: z.boolean().default(false),
  seo: SEOSettingsSchema.optional(),
  rootComponentId: z.string().uuid(),
  createdAt: z.date().or(z.string()),
  updatedAt: z.date().or(z.string()),
});

// Schema for theme settings
export const ThemeSettingsSchema = z.object({
  colors: z
    .object({
      primary: z.string().optional(),
      secondary: z.string().optional(),
      accent: z.string().optional(),
      background: z.string().optional(),
      text: z.string().optional(),
      heading: z.string().optional(),
      link: z.string().optional(),
      linkHover: z.string().optional(),
      success: z.string().optional(),
      error: z.string().optional(),
      warning: z.string().optional(),
      info: z.string().optional(),
      surface: z.string().optional(),
      surfaceHover: z.string().optional(),
      border: z.string().optional(),
    })
    .optional(),

  typography: z
    .object({
      fontFamily: z
        .object({
          base: z.string().optional(),
          heading: z.string().optional(),
          mono: z.string().optional(),
        })
        .optional(),
      fontSize: z
        .object({
          base: z.string().optional(),
          xs: z.string().optional(),
          sm: z.string().optional(),
          md: z.string().optional(),
          lg: z.string().optional(),
          xl: z.string().optional(),
          "2xl": z.string().optional(),
          "3xl": z.string().optional(),
          "4xl": z.string().optional(),
          "5xl": z.string().optional(),
          "6xl": z.string().optional(),
        })
        .optional(),
      lineHeight: z
        .object({
          tight: z.string().optional(),
          normal: z.string().optional(),
          relaxed: z.string().optional(),
          loose: z.string().optional(),
        })
        .optional(),
      fontWeight: z
        .object({
          light: z.string().optional(),
          normal: z.string().optional(),
          medium: z.string().optional(),
          semibold: z.string().optional(),
          bold: z.string().optional(),
        })
        .optional(),
    })
    .optional(),

  spacing: z
    .object({
      xs: z.string().optional(),
      sm: z.string().optional(),
      md: z.string().optional(),
      lg: z.string().optional(),
      xl: z.string().optional(),
      "2xl": z.string().optional(),
      "3xl": z.string().optional(),
      "4xl": z.string().optional(),
    })
    .optional(),

  borderRadius: z
    .object({
      none: z.string().optional(),
      sm: z.string().optional(),
      md: z.string().optional(),
      lg: z.string().optional(),
      full: z.string().optional(),
    })
    .optional(),

  shadows: z
    .object({
      none: z.string().optional(),
      sm: z.string().optional(),
      md: z.string().optional(),
      lg: z.string().optional(),
      xl: z.string().optional(),
    })
    .optional(),

  // Custom CSS variables
  customCss: z.string().optional(),

  // Breakpoints for responsive design
  breakpoints: z
    .object({
      sm: z.string().optional(),
      md: z.string().optional(),
      lg: z.string().optional(),
      xl: z.string().optional(),
    })
    .optional(),
});

// Schema for navigation settings
export const NavigationItemSchema = z.object({
  id: z.string(),
  label: z.string(),
  url: z.string().optional(),
  pageId: z.string().uuid().optional(),
  children: z.lazy(() => z.array(NavigationItemSchema).optional()),
  isExternal: z.boolean().default(false),
  openInNewTab: z.boolean().default(false),
});

export const NavigationSchema = z.object({
  items: z.array(NavigationItemSchema),
});

// Schema for custom code
export const CustomCodeSchema = z.object({
  head: z.string().optional(),
  bodyStart: z.string().optional(),
  bodyEnd: z.string().optional(),
  customCss: z.string().optional(),
  customJs: z.string().optional(),
});

// Schema for form settings
export const FormSettingsSchema = z.object({
  action: z.string().optional(),
  method: z.enum(["GET", "POST"]).default("POST"),
  recaptcha: z.boolean().default(false),
  successRedirect: z.string().optional(),
  successMessage: z.string().optional(),
  errorMessage: z.string().optional(),
  emailNotification: z
    .object({
      enabled: z.boolean().default(false),
      to: z.string().email().optional(),
      subject: z.string().optional(),
      fromField: z.string().optional(),
    })
    .optional(),
});

// Schema for integration settings
export const IntegrationSettingsSchema = z.object({
  analytics: z
    .object({
      googleAnalytics: z.string().optional(),
      facebookPixel: z.string().optional(),
      hotjar: z.string().optional(),
      customScript: z.string().optional(),
    })
    .optional(),

  marketing: z
    .object({
      mailchimp: z
        .object({
          apiKey: z.string().optional(),
          listId: z.string().optional(),
        })
        .optional(),

      zapier: z
        .object({
          webhookUrl: z.string().url().optional(),
        })
        .optional(),
    })
    .optional(),

  ecommerce: z
    .object({
      stripePublicKey: z.string().optional(),
      currency: z.string().optional(),
    })
    .optional(),

  social: z
    .object({
      facebook: z.string().url().optional(),
      twitter: z.string().url().optional(),
      instagram: z.string().url().optional(),
      linkedin: z.string().url().optional(),
      youtube: z.string().url().optional(),
    })
    .optional(),
});

// Schema for font settings
export const FontSettingsSchema = z.object({
  googleFonts: z.array(z.string()).optional(),
  customFonts: z
    .array(
      z.object({
        name: z.string(),
        url: z.string().url(),
        format: z.enum(["woff", "woff2", "ttf", "otf", "eot"]),
      })
    )
    .optional(),
});

// Main project schema
export const ProjectSchema = z.object({
  id: z.string().uuid(),
  ownerId: z.string().uuid(),
  meta: ProjectMetaSchema,
  pages: z.array(PageSchema),
  components: z.record(z.string(), BaseComponentSchema),
  theme: ThemeSettingsSchema.optional(),
  navigation: NavigationSchema.optional(),
  customCode: CustomCodeSchema.optional(),
  formSettings: z.record(z.string(), FormSettingsSchema).optional(),
  integrations: IntegrationSettingsSchema.optional(),
  fonts: FontSettingsSchema.optional(),
  publishConfig: z
    .object({
      domain: z.string().optional(),
      subdomain: z.string().optional(),
      customDomain: z.string().optional(),
      deployments: z
        .array(
          z.object({
            id: z.string(),
            version: z.string(),
            timestamp: z.date().or(z.string()),
            status: z.enum(["success", "failed", "pending"]),
            url: z.string().url().optional(),
          })
        )
        .optional(),
    })
    .optional(),
});

// Export types
export type ProjectMeta = z.infer<typeof ProjectMetaSchema>;
export type SEOSettings = z.infer<typeof SEOSettingsSchema>;
export type Page = z.infer<typeof PageSchema>;
export type ThemeSettings = z.infer<typeof ThemeSettingsSchema>;
export type NavigationItem = z.infer<typeof NavigationItemSchema>;
export type Navigation = z.infer<typeof NavigationSchema>;
export type CustomCode = z.infer<typeof CustomCodeSchema>;
export type FormSettings = z.infer<typeof FormSettingsSchema>;
export type IntegrationSettings = z.infer<typeof IntegrationSettingsSchema>;
export type FontSettings = z.infer<typeof FontSettingsSchema>;
export type Project = z.infer<typeof ProjectSchema>;

// Utility function to validate a project
export const validateProject = (project: unknown): Project => {
  return ProjectSchema.parse(project);
};

// Factory function to create a new project with default values
export function createProject(
  ownerId: string,
  title: string,
  overrides: Partial<Project> = {}
): Project {
  const now = new Date();
  const projectId = crypto.randomUUID();
  const homePageId = crypto.randomUUID();
  const rootComponentId = crypto.randomUUID();

  const baseProject: Project = {
    id: projectId,
    ownerId,
    meta: {
      title,
      description: "",
      createdAt: now,
      updatedAt: now,
      isPublic: false,
      isTemplate: false,
      status: "draft",
      version: "1.0.0",
    },
    pages: [
      {
        id: homePageId,
        slug: "home",
        title: "Home",
        isHome: true,
        isPublished: false,
        rootComponentId,
        createdAt: now,
        updatedAt: now,
      },
    ],
    components: {
      [rootComponentId]: {
        id: rootComponentId,
        type: "container",
        isContainer: true,
        visible: true,
        locked: false,
        children: [],
        parentId: null,
      },
    },
    theme: {
      colors: {
        primary: "#3b82f6",
        secondary: "#10b981",
        background: "#ffffff",
        text: "#1f2937",
      },
    },
    navigation: {
      items: [
        {
          id: crypto.randomUUID(),
          label: "Home",
          pageId: homePageId,
        },
      ],
    },
  };

  return {
    ...baseProject,
    ...overrides,
  };
}
