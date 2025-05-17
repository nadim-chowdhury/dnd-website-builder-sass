import { apiClient } from "./api-client";
import {
  Template,
  TemplateCategory,
  TemplateResponse,
} from "../types/template";

/**
 * Templates service - handles all template-related API calls
 */
export const templatesService = {
  /**
   * Get all available templates
   * @param category Optional category filter
   * @returns Promise with template response
   */
  getTemplates: async (
    category?: TemplateCategory
  ): Promise<TemplateResponse> => {
    const endpoint = category
      ? `/templates?category=${category}`
      : "/templates";
    return apiClient.get<TemplateResponse>(endpoint);
  },

  /**
   * Get a specific template by ID
   * @param templateId The ID of the template to retrieve
   * @returns Promise with the template data
   */
  getTemplateById: async (templateId: string): Promise<Template> => {
    return apiClient.get<Template>(`/templates/${templateId}`);
  },

  /**
   * Create a new template from a project
   * @param templateData Template data including name, category, and project data
   * @returns Promise with the created template
   */
  createTemplate: async (
    templateData: Omit<Template, "id" | "createdAt" | "updatedAt">
  ): Promise<Template> => {
    return apiClient.post<Template>("/templates", templateData);
  },

  /**
   * Update an existing template
   * @param templateId ID of the template to update
   * @param templateData Updated template data
   * @returns Promise with the updated template
   */
  updateTemplate: async (
    templateId: string,
    templateData: Partial<Template>
  ): Promise<Template> => {
    return apiClient.patch<Template>(`/templates/${templateId}`, templateData);
  },

  /**
   * Delete a template
   * @param templateId ID of the template to delete
   * @returns Promise with the operation result
   */
  deleteTemplate: async (templateId: string): Promise<{ success: boolean }> => {
    return apiClient.delete<{ success: boolean }>(`/templates/${templateId}`);
  },

  /**
   * Get featured templates for the homepage or template gallery
   * @param limit Maximum number of templates to return
   * @returns Promise with featured templates
   */
  getFeaturedTemplates: async (limit = 6): Promise<Template[]> => {
    return apiClient.get<Template[]>(`/templates/featured?limit=${limit}`);
  },

  /**
   * Duplicate an existing template
   * @param templateId ID of the template to duplicate
   * @param newName Optional new name for the duplicated template
   * @returns Promise with the duplicated template
   */
  duplicateTemplate: async (
    templateId: string,
    newName?: string
  ): Promise<Template> => {
    return apiClient.post<Template>(`/templates/${templateId}/duplicate`, {
      newName,
    });
  },

  /**
   * Search templates by query string
   * @param query Search query
   * @returns Promise with matching templates
   */
  searchTemplates: async (query: string): Promise<Template[]> => {
    return apiClient.get<Template[]>(
      `/templates/search?q=${encodeURIComponent(query)}`
    );
  },
};
