import { Component } from "./components";

// Project interface
export interface Project {
  id: string;
  name: string;
  description?: string;
  components: Component[];
  settings: ProjectSettings;
  meta: ProjectMeta;
  publishStatus: PublishStatus;
  thumbnail?: string;
  collaborators?: ProjectCollaborator[];
  createdAt: string;
  updatedAt: string;
  isTemplate?: boolean;
  templateId?: string;
  version: string;
}

// Project metadata
export interface ProjectMeta {
  author: string;
  authorId: string;
  lastModifiedBy?: string;
  lastModifiedById?: string;
  tags?: string[];
  customData?: Record<string, any>;
}

// Project settings
export interface ProjectSettings {
  seo: SEOSettings;
  analytics: AnalyticsSettings;
  styling: StylingSettings;
  functionality: FunctionalitySettings;
  hosting: HostingSettings;
  customCode: CustomCodeSettings;
  fonts: FontSettings[];
}

// SEO settings
export interface SEOSettings {
  title: string;
  description?: string;
  keywords?: string[];
  favicon?: string;
  socialImage?: string;
  canonicalUrl?: string;
  metaTags?: MetaTag[];
  structuredData?: Record<string, any>;
  sitemap?: boolean;
  robots?: string;
}

// Meta tag
export interface MetaTag {
  name?: string;
  property?: string;
  content: string;
}

// Analytics settings
export interface AnalyticsSettings {
  googleAnalyticsId?: string;
  facebookPixelId?: string;
  hotjarId?: string;
  customScripts?: CustomScript[];
}

// Custom script
export interface CustomScript {
  id: string;
  name: string;
  content: string;
  placement: "head" | "body";
  loadingStrategy: "sync" | "async" | "defer";
  enabled: boolean;
}

// Styling settings
export interface StylingSettings {
  themeColors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    text: string;
    [key: string]: string;
  };
  globalStyles: {
    body?: Record<string, any>;
    headings?: Record<string, any>;
    links?: Record<string, any>;
    buttons?: Record<string, any>;
    [key: string]: Record<string, any> | undefined;
  };
  cssVariables?: Record<string, string>;
  customCSS?: string;
}

// Functionality settings
export interface FunctionalitySettings {
  animations?: boolean;
  formHandling?: FormHandlingSettings;
  dynamicContent?: boolean;
  ecommerce?: boolean;
  multiLanguage?: LanguageSettings[];
  passwordProtection?: boolean;
  routes?: RouteSettings[];
}

// Form handling settings
export interface FormHandlingSettings {
  provider: "email" | "zapier" | "webhook" | "custom";
  endpoint?: string;
  emailRecipient?: string;
  captcha?: boolean;
  successRedirect?: string;
  successMessage?: string;
}

// Language settings
export interface LanguageSettings {
  code: string;
  name: string;
  isDefault: boolean;
  direction: "ltr" | "rtl";
}

// Route settings
export interface RouteSettings {
  path: string;
  component: string;
  exact?: boolean;
  auth?: boolean;
  redirectTo?: string;
}

// Hosting settings
export interface HostingSettings {
  domain?: string;
  subdomain?: string;
  provider?: "self" | "vercel" | "netlify" | "github" | "custom";
  deploymentUrl?: string;
  customDomains?: string[];
}

// Custom code settings
export interface CustomCodeSettings {
  head?: string;
  bodyStart?: string;
  bodyEnd?: string;
  globalJs?: string;
}

// Font settings
export interface FontSettings {
  family: string;
  variants: string[];
  source: "google" | "custom" | "system";
  url?: string;
}

// Project template
export interface ProjectTemplate {
  id: string;
  name: string;
  description?: string;
  category: string;
  thumbnail: string;
  project: Omit<Project, "id" | "createdAt" | "updatedAt" | "publishStatus">;
  tags?: string[];
}

// Project collaborator
export interface ProjectCollaborator {
  id: string;
  userId: string;
  name: string;
  email: string;
  role: "owner" | "editor" | "viewer";
  avatar?: string;
  joinedAt: string;
  lastActive?: string;
}

// Publish status
export interface PublishStatus {
  status: "draft" | "published" | "archived";
  lastPublishedAt?: string;
  lastPublishedBy?: string;
  publishedUrl?: string;
  version?: string;
  environment?: "development" | "staging" | "production";
}

// Project export options
export interface ProjectExportOptions {
  format: "json" | "html" | "react" | "nextjs" | "zip";
  includeAssets: boolean;
  optimizeAssets: boolean;
  minify: boolean;
}

// Project import options
export interface ProjectImportOptions {
  generateNewIds: boolean;
  overwriteExisting: boolean;
  validateComponents: boolean;
}

// Project list response
export interface ProjectListResponse {
  projects: ProjectSummary[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

// Project summary (lightweight version for listings)
export interface ProjectSummary {
  id: string;
  name: string;
  description?: string;
  thumbnail?: string;
  createdAt: string;
  updatedAt: string;
  publishStatus: {
    status: "draft" | "published" | "archived";
    lastPublishedAt?: string;
  };
  owner: {
    id: string;
    name: string;
  };
}

// Project stats
export interface ProjectStats {
  componentCount: number;
  pageCount: number;
  assetCount: number;
  lastEditDate: string;
  publishCount: number;
  visitCount?: number;
  collaboratorCount: number;
  versionCount: number;
}

// Project version
export interface ProjectVersion {
  id: string;
  projectId: string;
  version: string;
  createdAt: string;
  createdBy: string;
  comment?: string;
  snapshot: any; // Project data snapshot
}
