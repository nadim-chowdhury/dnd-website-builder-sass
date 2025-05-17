import { Project } from "./project";

// Template interface
export interface Template {
  id: string;
  name: string;
  description: string;
  thumbnail: string;
  category: TemplateCategory;
  tags: string[];
  projectData: Omit<
    Project,
    "id" | "createdAt" | "updatedAt" | "publishStatus"
  >;
  popularity: number;
  author: {
    id: string;
    name: string;
    avatar?: string;
  };
  price?: number; // Free templates have undefined or 0 price
  premium: boolean;
  createdAt: string;
  updatedAt: string;
  version: string;
  compatibility: string; // Minimum builder version required
  customData?: Record<string, any>;
}

// Template category
export enum TemplateCategory {
  LANDING_PAGE = "landing-page",
  BUSINESS = "business",
  PORTFOLIO = "portfolio",
  BLOG = "blog",
  ECOMMERCE = "ecommerce",
  PERSONAL = "personal",
  EDUCATION = "education",
  EVENT = "event",
  NONPROFIT = "nonprofit",
  ENTERTAINMENT = "entertainment",
  TECHNOLOGY = "technology",
  HEALTH = "health",
  RESTAURANT = "restaurant",
  REAL_ESTATE = "real-estate",
  TRAVEL = "travel",
  BLANK = "blank",
  OTHER = "other",
}

// Template summary for listings
export interface TemplateSummary {
  id: string;
  name: string;
  description: string;
  thumbnail: string;
  category: TemplateCategory;
  tags: string[];
  popularity: number;
  premium: boolean;
  price?: number;
}

// Template response (for listings with pagination)
export interface TemplateResponse {
  templates: Template[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

// Template creation input
export interface TemplateCreateInput {
  name: string;
  description: string;
  category: TemplateCategory;
  tags: string[];
  projectId: string; // ID of the project to convert to template
  thumbnail?: string;
  premium?: boolean;
  price?: number;
  customData?: Record<string, any>;
}

// Template update input
export interface TemplateUpdateInput {
  name?: string;
  description?: string;
  category?: TemplateCategory;
  tags?: string[];
  thumbnail?: string;
  premium?: boolean;
  price?: number;
  customData?: Record<string, any>;
}

// Template filter options
export interface TemplateFilterOptions {
  category?: TemplateCategory;
  tags?: string[];
  premium?: boolean;
  authorId?: string;
  search?: string;
  sortBy?: "popularity" | "newest" | "name" | "price";
  sortDirection?: "asc" | "desc";
}

// Template category info
export interface TemplateCategoryInfo {
  id: TemplateCategory;
  name: string;
  description: string;
  icon: string;
  count: number;
}

// Template preview data
export interface TemplatePreviewData {
  templateId: string;
  name: string;
  screenshot: string;
  previewUrl: string;
  components: {
    total: number;
    byType: Record<string, number>;
  };
  pages: number;
  complexity: "simple" | "medium" | "complex";
}

// Template import result
export interface TemplateImportResult {
  success: boolean;
  projectId?: string;
  message?: string;
  errors?: string[];
}

// Featured template
export interface FeaturedTemplate extends TemplateSummary {
  featured: boolean;
  featuredOrder?: number;
  featuredUntil?: string;
  featuredReason?: string;
}

// Template usage stats
export interface TemplateUsageStats {
  templateId: string;
  usageCount: number;
  rating: number;
  reviewCount: number;
  popularWithIndustries: string[];
}

// Template review
export interface TemplateReview {
  id: string;
  templateId: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  rating: number;
  comment: string;
  createdAt: string;
  updatedAt: string;
  helpful: number;
  unhelpful: number;
}

// src/types/template.ts
export interface Template {
  id: string;
  name: string;
  description: string;
  categoryId: string;
  thumbnailUrl: string;
  content: any; // Replace with a more specific type based on your template structure
}
