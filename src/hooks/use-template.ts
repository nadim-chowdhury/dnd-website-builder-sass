import { useState } from "react";
import { templatesService } from "@/services/templates";
import { Template, TemplateCategory } from "@/types/template";

export function useTemplates() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  /**
   * Get all templates or filter by category
   */
  const getTemplates = async (category?: TemplateCategory) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await templatesService.getTemplates(category);
      setIsLoading(false);
      return response;
    } catch (err) {
      const error =
        err instanceof Error ? err : new Error("Failed to fetch templates");
      setError(error);
      setIsLoading(false);
      throw error;
    }
  };

  /**
   * Get template by ID
   */
  const getTemplateById = async (templateId: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const template = await templatesService.getTemplateById(templateId);
      setIsLoading(false);
      return template;
    } catch (err) {
      const error =
        err instanceof Error ? err : new Error("Failed to fetch template");
      setError(error);
      setIsLoading(false);
      throw error;
    }
  };

  /**
   * Get all template categories
   */
  const getTemplateCategories = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const categories = await templatesService.getTemplateCategories();
      setIsLoading(false);
      return categories;
    } catch (err) {
      const error =
        err instanceof Error
          ? err
          : new Error("Failed to fetch template categories");
      setError(error);
      setIsLoading(false);
      throw error;
    }
  };

  /**
   * Get featured templates
   */
  const getFeaturedTemplates = async (limit = 6) => {
    setIsLoading(true);
    setError(null);

    try {
      const templates = await templatesService.getFeaturedTemplates(limit);
      setIsLoading(false);
      return templates;
    } catch (err) {
      const error =
        err instanceof Error
          ? err
          : new Error("Failed to fetch featured templates");
      setError(error);
      setIsLoading(false);
      throw error;
    }
  };

  /**
   * Search templates
   */
  const searchTemplates = async (query: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const templates = await templatesService.searchTemplates(query);
      setIsLoading(false);
      return templates;
    } catch (err) {
      const error =
        err instanceof Error ? err : new Error("Failed to search templates");
      setError(error);
      setIsLoading(false);
      throw error;
    }
  };

  return {
    isLoading,
    error,
    getTemplates,
    getTemplateById,
    getTemplateCategories,
    getFeaturedTemplates,
    searchTemplates,
  };
}
