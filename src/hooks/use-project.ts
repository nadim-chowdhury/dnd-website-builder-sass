import { useState } from "react";
import * as projectsApi from "@/services/projects";
import {
  Project,
  ProjectSettings,
  ProjectStatus,
  ProjectVersion,
} from "@/types/project";

interface CreateProjectParams {
  name: string;
  description?: string;
  templateId?: string;
  template?: any;
}

export function useProjects() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  /**
   * Get all projects with pagination and filters
   */
  const getProjects = async (
    page: number = 1,
    limit: number = 10,
    filters: {
      searchQuery?: string;
      status?: ProjectStatus;
      isPublished?: boolean;
      sortBy?: string;
      sortDirection?: "asc" | "desc";
    } = {}
  ) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await projectsApi.getProjects(page, limit, filters);
      setIsLoading(false);
      return response;
    } catch (err) {
      const error =
        err instanceof Error ? err : new Error("Failed to fetch projects");
      setError(error);
      setIsLoading(false);
      throw error;
    }
  };

  /**
   * Get project by ID
   */
  const getProjectById = async (projectId: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const project = await projectsApi.getProjectById(projectId);
      setIsLoading(false);
      return project;
    } catch (err) {
      const error =
        err instanceof Error ? err : new Error("Failed to fetch project");
      setError(error);
      setIsLoading(false);
      throw error;
    }
  };

  /**
   * Create a new project
   */
  const createProject = async (projectData: CreateProjectParams) => {
    setIsLoading(true);
    setError(null);

    try {
      const project = await projectsApi.createProject(projectData);
      setIsLoading(false);
      return project;
    } catch (err) {
      const error =
        err instanceof Error ? err : new Error("Failed to create project");
      setError(error);
      setIsLoading(false);
      throw error;
    }
  };

  /**
   * Create a project from template
   */
  const createProjectFromTemplate = async (
    templateId: string,
    name: string,
    description?: string
  ) => {
    setIsLoading(true);
    setError(null);

    try {
      const project = await projectsApi.createProjectFromTemplate(
        templateId,
        name,
        description
      );
      setIsLoading(false);
      return project;
    } catch (err) {
      const error =
        err instanceof Error
          ? err
          : new Error("Failed to create project from template");
      setError(error);
      setIsLoading(false);
      throw error;
    }
  };

  /**
   * Update project
   */
  const updateProject = async (
    projectId: string,
    projectData: {
      name?: string;
      description?: string;
      status?: ProjectStatus;
      isPublished?: boolean;
      publishedAt?: string;
      archivedAt?: string;
    }
  ) => {
    setIsLoading(true);
    setError(null);

    try {
      const project = await projectsApi.updateProject(projectId, projectData);
      setIsLoading(false);
      return project;
    } catch (err) {
      const error =
        err instanceof Error ? err : new Error("Failed to update project");
      setError(error);
      setIsLoading(false);
      throw error;
    }
  };

  /**
   * Delete project
   */
  const deleteProject = async (projectId: string) => {
    setIsLoading(true);
    setError(null);

    try {
      await projectsApi.deleteProject(projectId);
      setIsLoading(false);
      return true;
    } catch (err) {
      const error =
        err instanceof Error ? err : new Error("Failed to delete project");
      setError(error);
      setIsLoading(false);
      throw error;
    }
  };

  /**
   * Duplicate project
   */
  const duplicateProject = async (projectId: string, newName: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const project = await projectsApi.duplicateProject(projectId, newName);
      setIsLoading(false);
      return project;
    } catch (err) {
      const error =
        err instanceof Error ? err : new Error("Failed to duplicate project");
      setError(error);
      setIsLoading(false);
      throw error;
    }
  };

  /**
   * Publish project
   */
  const publishProject = async (projectId: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const project = await projectsApi.publishProject(projectId);
      setIsLoading(false);
      return project;
    } catch (err) {
      const error =
        err instanceof Error ? err : new Error("Failed to publish project");
      setError(error);
      setIsLoading(false);
      throw error;
    }
  };

  /**
   * Unpublish project
   */
  const unpublishProject = async (projectId: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const project = await projectsApi.unpublishProject(projectId);
      setIsLoading(false);
      return project;
    } catch (err) {
      const error =
        err instanceof Error ? err : new Error("Failed to unpublish project");
      setError(error);
      setIsLoading(false);
      throw error;
    }
  };

  return {
    isLoading,
    error,
    getProjects,
    getProjectById,
    createProject,
    createProjectFromTemplate,
    updateProject,
    deleteProject,
    duplicateProject,
    publishProject,
    unpublishProject,
  };
}

// import { useSelector, useDispatch } from "react-redux";
// import {
//   addProject,
//   updateProject,
//   removeProject,
//   setCurrentProject,
//   loadProject,
// } from "@/redux/slices/builderSlice";
// import { RootState } from "@/redux/store";
// import { v4 as uuidv4 } from "uuid";

// export interface Project {
//   id: string;
//   name: string;
//   description?: string;
//   template?: any;
//   createdAt?: string;
//   updatedAt?: string;
// }

// export const useProjects = () => {
//   const dispatch = useDispatch();
//   const projects = useSelector((state: RootState) => state.builder.projects);
//   const currentProjectId = useSelector(
//     (state: RootState) => state.builder.currentProjectId
//   );

//   // Get all projects
//   const getAllProjects = () => {
//     return Object.values(projects);
//   };

//   // Get a project by ID
//   const getProjectById = async (id: string) => {
//     // In a real app, you might fetch from an API here
//     return projects[id] || null;
//   };

//   // Create a new project
//   const createProject = async (projectData: Omit<Project, "id">) => {
//     const id = uuidv4();
//     const newProject = {
//       id,
//       ...projectData,
//       createdAt: new Date().toISOString(),
//       updatedAt: new Date().toISOString(),
//     };

//     dispatch(addProject(newProject));

//     // If this has a template, load it
//     if (projectData.template) {
//       dispatch(loadProject(projectData.template.components || {}));
//     }

//     return newProject;
//   };

//   // Update a project
//   const updateProjectById = async (id: string, changes: Partial<Project>) => {
//     if (projects[id]) {
//       const updatedProject = {
//         ...projects[id],
//         ...changes,
//         updatedAt: new Date().toISOString(),
//       };

//       dispatch(updateProject({ id, changes: updatedProject }));
//       return updatedProject;
//     }
//     return null;
//   };

//   // Delete a project
//   const deleteProject = async (id: string) => {
//     dispatch(removeProject(id));
//     return true;
//   };

//   // Set the current project
//   const setActiveProject = (id: string | null) => {
//     dispatch(setCurrentProject(id));
//   };

//   return {
//     projects,
//     currentProjectId,
//     getAllProjects,
//     getProjectById,
//     createProject,
//     updateProjectById,
//     deleteProject,
//     setActiveProject,
//   };
// };
