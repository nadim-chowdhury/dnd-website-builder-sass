import apiClient from "./api-client";
import {
  Project,
  ProjectSettings,
  ProjectStatus,
  ProjectVersion,
} from "@/types/project";

/**
 * Interface for project list response with pagination
 */
interface ProjectListResponse {
  projects: Project[];
  totalCount: number;
  pageCount: number;
}

/**
 * Interface for project creation request
 */
interface CreateProjectRequest {
  name: string;
  description?: string;
  templateId?: string;
}

/**
 * Interface for project update request
 */
interface UpdateProjectRequest {
  name?: string;
  description?: string;
  status?: ProjectStatus;
  isPublished?: boolean;
  publishedAt?: string;
  archivedAt?: string;
}

/**
 * Interface for project collaborator
 */
interface ProjectCollaborator {
  userId: string;
  email: string;
  name: string;
  role: "viewer" | "editor" | "admin";
}

/**
 * Get projects for current user with pagination
 * @param page - Page number (starting from 1)
 * @param limit - Number of items per page
 * @param filters - Optional filters object
 * @returns Promise with paginated projects data
 */
export const getProjects = async (
  page: number = 1,
  limit: number = 10,
  filters: {
    searchQuery?: string;
    status?: ProjectStatus;
    isPublished?: boolean;
    sortBy?: string;
    sortDirection?: "asc" | "desc";
  } = {}
): Promise<ProjectListResponse> => {
  try {
    return await apiClient.get<ProjectListResponse>("/projects", {
      params: {
        page,
        limit,
        ...filters,
      },
    });
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to fetch projects: ${error.message}`);
    }
    throw new Error("Failed to fetch projects");
  }
};

/**
 * Get project by ID
 * @param id - Project ID
 * @returns Promise with project data
 */
export const getProjectById = async (id: string): Promise<Project> => {
  try {
    return await apiClient.get<Project>(`/projects/${id}`);
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to fetch project: ${error.message}`);
    }
    throw new Error("Failed to fetch project");
  }
};

/**
 * Create a new project
 * @param projectData - Project creation data
 * @returns Promise with created project data
 */
export const createProject = async (
  projectData: CreateProjectRequest
): Promise<Project> => {
  try {
    return await apiClient.post<Project>("/projects", projectData);
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to create project: ${error.message}`);
    }
    throw new Error("Failed to create project");
  }
};

/**
 * Create a project from a template
 * @param templateId - Template ID
 * @param name - Project name
 * @param description - Project description (optional)
 * @returns Promise with created project data
 */
export const createProjectFromTemplate = async (
  templateId: string,
  name: string,
  description?: string
): Promise<Project> => {
  try {
    return await apiClient.post<Project>("/projects/from-template", {
      templateId,
      name,
      description,
    });
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(
        `Failed to create project from template: ${error.message}`
      );
    }
    throw new Error("Failed to create project from template");
  }
};

/**
 * Update project by ID
 * @param id - Project ID
 * @param projectData - Project update data
 * @returns Promise with updated project data
 */
export const updateProject = async (
  id: string,
  projectData: UpdateProjectRequest
): Promise<Project> => {
  try {
    return await apiClient.patch<Project>(`/projects/${id}`, projectData);
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to update project: ${error.message}`);
    }
    throw new Error("Failed to update project");
  }
};

/**
 * Delete project by ID
 * @param id - Project ID
 */
export const deleteProject = async (id: string): Promise<void> => {
  try {
    await apiClient.delete(`/projects/${id}`);
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to delete project: ${error.message}`);
    }
    throw new Error("Failed to delete project");
  }
};

/**
 * Duplicate project by ID
 * @param id - Project ID
 * @param newName - Name for the duplicated project
 * @returns Promise with duplicated project data
 */
export const duplicateProject = async (
  id: string,
  newName: string
): Promise<Project> => {
  try {
    return await apiClient.post<Project>(`/projects/${id}/duplicate`, {
      name: newName,
    });
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to duplicate project: ${error.message}`);
    }
    throw new Error("Failed to duplicate project");
  }
};

/**
 * Save project content
 * @param id - Project ID
 * @param content - Project content (JSON structure)
 * @returns Promise with saved project data
 */
export const saveProjectContent = async (
  id: string,
  content: any
): Promise<Project> => {
  try {
    return await apiClient.put<Project>(`/projects/${id}/content`, { content });
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to save project content: ${error.message}`);
    }
    throw new Error("Failed to save project content");
  }
};

/**
 * Get project content
 * @param id - Project ID
 * @returns Promise with project content
 */
export const getProjectContent = async (id: string): Promise<any> => {
  try {
    const response = await apiClient.get<{ content: any }>(
      `/projects/${id}/content`
    );
    return response.content;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to fetch project content: ${error.message}`);
    }
    throw new Error("Failed to fetch project content");
  }
};

/**
 * Publish project
 * @param id - Project ID
 * @returns Promise with published project data
 */
export const publishProject = async (id: string): Promise<Project> => {
  try {
    return await apiClient.post<Project>(`/projects/${id}/publish`);
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to publish project: ${error.message}`);
    }
    throw new Error("Failed to publish project");
  }
};

/**
 * Unpublish project
 * @param id - Project ID
 * @returns Promise with unpublished project data
 */
export const unpublishProject = async (id: string): Promise<Project> => {
  try {
    return await apiClient.post<Project>(`/projects/${id}/unpublish`);
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to unpublish project: ${error.message}`);
    }
    throw new Error("Failed to unpublish project");
  }
};

/**
 * Get project settings
 * @param id - Project ID
 * @returns Promise with project settings
 */
export const getProjectSettings = async (
  id: string
): Promise<ProjectSettings> => {
  try {
    return await apiClient.get<ProjectSettings>(`/projects/${id}/settings`);
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to fetch project settings: ${error.message}`);
    }
    throw new Error("Failed to fetch project settings");
  }
};

/**
 * Update project settings
 * @param id - Project ID
 * @param settings - Project settings data
 * @returns Promise with updated project settings
 */
export const updateProjectSettings = async (
  id: string,
  settings: Partial<ProjectSettings>
): Promise<ProjectSettings> => {
  try {
    return await apiClient.patch<ProjectSettings>(
      `/projects/${id}/settings`,
      settings
    );
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to update project settings: ${error.message}`);
    }
    throw new Error("Failed to update project settings");
  }
};

/**
 * Get project versions history
 * @param id - Project ID
 * @returns Promise with project versions
 */
export const getProjectVersions = async (
  id: string
): Promise<ProjectVersion[]> => {
  try {
    return await apiClient.get<ProjectVersion[]>(`/projects/${id}/versions`);
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to fetch project versions: ${error.message}`);
    }
    throw new Error("Failed to fetch project versions");
  }
};

/**
 * Create a new project version
 * @param id - Project ID
 * @param name - Version name
 * @param description - Version description (optional)
 * @returns Promise with created version data
 */
export const createProjectVersion = async (
  id: string,
  name: string,
  description?: string
): Promise<ProjectVersion> => {
  try {
    return await apiClient.post<ProjectVersion>(`/projects/${id}/versions`, {
      name,
      description,
    });
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to create project version: ${error.message}`);
    }
    throw new Error("Failed to create project version");
  }
};

/**
 * Restore project to a specific version
 * @param id - Project ID
 * @param versionId - Version ID
 * @returns Promise with restored project data
 */
export const restoreProjectVersion = async (
  id: string,
  versionId: string
): Promise<Project> => {
  try {
    return await apiClient.post<Project>(
      `/projects/${id}/versions/${versionId}/restore`
    );
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to restore project version: ${error.message}`);
    }
    throw new Error("Failed to restore project version");
  }
};

/**
 * Get project collaborators
 * @param id - Project ID
 * @returns Promise with collaborators list
 */
export const getProjectCollaborators = async (
  id: string
): Promise<ProjectCollaborator[]> => {
  try {
    return await apiClient.get<ProjectCollaborator[]>(
      `/projects/${id}/collaborators`
    );
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(
        `Failed to fetch project collaborators: ${error.message}`
      );
    }
    throw new Error("Failed to fetch project collaborators");
  }
};

/**
 * Add collaborator to project
 * @param id - Project ID
 * @param email - Collaborator email
 * @param role - Collaborator role
 * @returns Promise with updated collaborators list
 */
export const addProjectCollaborator = async (
  id: string,
  email: string,
  role: "viewer" | "editor" | "admin"
): Promise<ProjectCollaborator[]> => {
  try {
    return await apiClient.post<ProjectCollaborator[]>(
      `/projects/${id}/collaborators`,
      {
        email,
        role,
      }
    );
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to add project collaborator: ${error.message}`);
    }
    throw new Error("Failed to add project collaborator");
  }
};

/**
 * Update collaborator role
 * @param id - Project ID
 * @param userId - Collaborator user ID
 * @param role - New role
 * @returns Promise with updated collaborators list
 */
export const updateProjectCollaborator = async (
  id: string,
  userId: string,
  role: "viewer" | "editor" | "admin"
): Promise<ProjectCollaborator[]> => {
  try {
    return await apiClient.patch<ProjectCollaborator[]>(
      `/projects/${id}/collaborators/${userId}`,
      {
        role,
      }
    );
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(
        `Failed to update project collaborator: ${error.message}`
      );
    }
    throw new Error("Failed to update project collaborator");
  }
};

/**
 * Remove collaborator from project
 * @param id - Project ID
 * @param userId - Collaborator user ID
 * @returns Promise with updated collaborators list
 */
export const removeProjectCollaborator = async (
  id: string,
  userId: string
): Promise<ProjectCollaborator[]> => {
  try {
    return await apiClient.delete<ProjectCollaborator[]>(
      `/projects/${id}/collaborators/${userId}`
    );
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(
        `Failed to remove project collaborator: ${error.message}`
      );
    }
    throw new Error("Failed to remove project collaborator");
  }
};

/**
 * Export project as HTML/CSS/JS
 * @param id - Project ID
 * @returns Promise with export data
 */
export const exportProject = async (id: string): Promise<Blob> => {
  try {
    return await apiClient.get<Blob>(`/projects/${id}/export`, {
      responseType: "blob",
    });
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to export project: ${error.message}`);
    }
    throw new Error("Failed to export project");
  }
};

/**
 * Get project analytics
 * @param id - Project ID
 * @param startDate - Start date for analytics
 * @param endDate - End date for analytics
 * @returns Promise with analytics data
 */
export const getProjectAnalytics = async (
  id: string,
  startDate: string,
  endDate: string
): Promise<any> => {
  try {
    return await apiClient.get(`/projects/${id}/analytics`, {
      params: {
        startDate,
        endDate,
      },
    });
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to fetch project analytics: ${error.message}`);
    }
    throw new Error("Failed to fetch project analytics");
  }
};
