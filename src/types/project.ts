import { Component } from "./components";

// Project status enum
export enum ProjectStatus {
  DRAFT = "DRAFT",
  PUBLISHED = "PUBLISHED",
  ARCHIVED = "ARCHIVED",
}

// Project base interface
export interface Project {
  id: string;
  name: string;
  description?: string;
  status: ProjectStatus;
  thumbnail?: string;
  pages?: ProjectPage[];
  settings: ProjectSettings;
  userId: string;
  teamId?: string;
  tags?: string[];
  isPublished: boolean;
  publishedAt?: string;
  archivedAt?: string;
  createdAt: string;
  updatedAt: string;
  components: ProjectComponent[];
  meta?: ProjectMeta;
  isTemplate?: boolean;
  templateId?: string;
  version?: string;
  lastEdited?: string;
}

// Project page interface
export interface ProjectPage {
  id: string;
  name: string;
  slug: string;
  isHome: boolean;
  components: ProjectComponent[];
  metadata?: {
    title?: string;
    description?: string;
    keywords?: string[];
  };
}

// Project component interface
export interface ProjectComponent {
  id: string;
  type: string;
  props: Record<string, any>;
  children?: ProjectComponent[];
  styles?: Record<string, any>;
  parentId?: string;
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
  project: Omit<Project, "id" | "createdAt" | "updatedAt" | "status">;
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
  views?: number;
  visits?: number;
  conversions?: number;
  bounceRate?: number;
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

// Response types
export interface ProjectServiceListResponse {
  projects: Project[];
  totalCount: number;
}

// Request types
export interface CreateProjectRequest {
  name: string;
  description?: string;
  tags?: string[];
  status?: ProjectStatus;
  thumbnail?: string;
  teamId?: string;
  settings?: ProjectSettings;
  templateId?: string;
}

export interface UpdateProjectRequest {
  name?: string;
  description?: string;
  status?: ProjectStatus;
  tags?: string[];
  thumbnail?: string;
  teamId?: string;
  settings?: ProjectSettings;
  isPublished?: boolean;
  publishedAt?: string;
  archivedAt?: string;
}

// Project filters
export interface ProjectFilters {
  searchTerm: string;
  status: ProjectStatus[];
  tags: string[];
  dateRange: {
    startDate: Date | null;
    endDate: Date | null;
  } | null;
}

// Sort order
export interface SortOrder {
  field: "name" | "createdAt" | "updatedAt";
  direction: "asc" | "desc";
}
