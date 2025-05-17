import { createAsyncThunk } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import { Project, ProjectSettings, PageData } from "../../types/project";
import * as projectService from "../../services/projects";
import { projectValidator } from "../validators/project-validator";
import * as projectSerializer from "../serializer/project-serializer";
import { historyManager } from "../history/history-manager";
import { RootState } from "../../redux/store";
import { selectCurrentProject } from "@/redux/selectors/project-selectors";

// Action to create a new project
export const createProject = createAsyncThunk(
  "projects/create",
  async (projectData: Partial<Project>, { rejectWithValue }) => {
    try {
      const newProject: Project = {
        id: uuidv4(),
        name: projectData.name || "Untitled Project",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        pages: projectData.pages || [
          {
            id: uuidv4(),
            name: "Home",
            path: "/",
            components: [],
            isHome: true,
          },
        ],
        settings: projectData.settings || {
          favicon: "",
          seo: {
            title: "",
            description: "",
            keywords: [],
          },
          fonts: ["Inter", "sans-serif"],
          colors: {
            primary: "#3b82f6",
            secondary: "#10b981",
            background: "#ffffff",
            text: "#333333",
          },
        },
        published: false,
        publishedUrl: "",
        status: projectData.status,
        ...projectData,
      };

      // Validate the project structure
      const validationResult = projectValidator.validate(newProject);
      if (!validationResult.valid) {
        return rejectWithValue(validationResult.errors);
      }

      // Save the project to backend
      const savedProject = await projectService.createProject({
        name: newProject.name,
        description: newProject.description,
      });

      // Initialize history for the project
      historyManager.initializeProjectHistory(savedProject.id);

      return savedProject;
    } catch (error) {
      console.error("Failed to create project:", error);
      return rejectWithValue(
        error instanceof Error ? error.message : "Unknown error occurred"
      );
    }
  }
);

// Action to load project by ID
export const loadProject = createAsyncThunk(
  "projects/load",
  async (projectId: string, { rejectWithValue }) => {
    try {
      const project = await projectService.getProjectById(projectId);

      // Initialize or reset history for this project
      historyManager.initializeProjectHistory(projectId);

      return project;
    } catch (error) {
      console.error("Failed to load project:", error);
      return rejectWithValue(
        error instanceof Error ? error.message : "Failed to load project"
      );
    }
  }
);

// Action to save project changes
export const saveProject = createAsyncThunk(
  "projects/save",
  async (_, { getState, rejectWithValue }) => {
    try {
      const state = getState() as RootState;
      const currentProject = selectCurrentProject(state);

      if (!currentProject) {
        return rejectWithValue("No active project to save");
      }

      // Update timestamps
      const projectToSave = {
        ...currentProject,
        updatedAt: new Date().toISOString(),
      };

      // Validate the project structure before saving
      const validationResult = projectValidator.validate(projectToSave);
      if (!validationResult.valid) {
        return rejectWithValue(validationResult.errors);
      }

      // Serialize the project for storage
      const serializedProject =
        projectSerializer.serializeProject(projectToSave);

      // Save to the backend
      const savedProject = await projectService.updateProject(
        projectToSave.id,
        {
          name: projectToSave.name,
          description: projectToSave.description,
          status: projectToSave.status,
        }
      );

      // Create a snapshot in history - FIX: Pass the entire state instead of just the project
      historyManager.saveSnapshot(
        state,
        `Saved project: ${projectToSave.name}`
      );

      return savedProject;
    } catch (error) {
      console.error("Failed to save project:", error);
      return rejectWithValue(
        error instanceof Error ? error.message : "Failed to save project"
      );
    }
  }
);

// Action to update project settings
export const updateProjectSettings = createAsyncThunk(
  "projects/updateSettings",
  async (settings: Partial<ProjectSettings>, { getState, rejectWithValue }) => {
    try {
      const state = getState() as RootState;
      const currentProject = selectCurrentProject(state);

      if (!currentProject) {
        return rejectWithValue("No active project");
      }

      const updatedProject = {
        ...currentProject,
        settings: {
          ...currentProject.settings,
          ...settings,
        },
        updatedAt: new Date().toISOString(),
      };

      return updatedProject;
    } catch (error) {
      console.error("Failed to update project settings:", error);
      return rejectWithValue(
        error instanceof Error ? error.message : "Unknown error occurred"
      );
    }
  }
);

// Action to create a new page in the project
export const createPage = createAsyncThunk(
  "projects/createPage",
  async (pageData: Partial<PageData>, { getState, rejectWithValue }) => {
    try {
      const state = getState() as RootState;
      const currentProject = selectCurrentProject(state);

      if (!currentProject) {
        return rejectWithValue("No active project");
      }

      const newPage: PageData = {
        id: uuidv4(),
        name: pageData.name || "New Page",
        path: pageData.path || `/page-${Date.now()}`,
        components: [],
        isHome: !!pageData.isHome,
        ...pageData,
      };

      // If this is marked as home page, update other pages
      let updatedPages = [...currentProject.pages];
      if (newPage.isHome) {
        updatedPages = updatedPages.map((page) => ({
          ...page,
          isHome: false,
        }));
      }

      const updatedProject = {
        ...currentProject,
        pages: [...updatedPages, newPage],
        updatedAt: new Date().toISOString(),
      };

      // Add to history
      historyManager.addAction({
        projectId: currentProject.id,
        type: "CREATE_PAGE",
        data: { pageId: newPage.id },
      });

      return updatedProject;
    } catch (error) {
      console.error("Failed to create page:", error);
      return rejectWithValue(
        error instanceof Error ? error.message : "Unknown error occurred"
      );
    }
  }
);

// Action to delete a page from the project
export const deletePage = createAsyncThunk(
  "projects/deletePage",
  async (pageId: string, { getState, rejectWithValue }) => {
    try {
      const state = getState() as RootState;
      const currentProject = selectCurrentProject(state);

      if (!currentProject) {
        return rejectWithValue("No active project");
      }

      // Cannot delete the home page
      const pageToDelete = currentProject.pages.find(
        (page) => page.id === pageId
      );
      if (!pageToDelete) {
        return rejectWithValue("Page not found");
      }

      if (pageToDelete.isHome) {
        return rejectWithValue("Cannot delete the home page");
      }

      const updatedProject = {
        ...currentProject,
        pages: currentProject.pages.filter((page) => page.id !== pageId),
        updatedAt: new Date().toISOString(),
      };

      // Add to history
      historyManager.addAction({
        projectId: currentProject.id,
        type: "DELETE_PAGE",
        data: { pageId, pageData: pageToDelete },
      });

      return updatedProject;
    } catch (error) {
      console.error("Failed to delete page:", error);
      return rejectWithValue(
        error instanceof Error ? error.message : "Unknown error occurred"
      );
    }
  }
);

// Action to update a page in the project
export const updatePage = createAsyncThunk(
  "projects/updatePage",
  async (
    { pageId, pageData }: { pageId: string; pageData: Partial<PageData> },
    { getState, rejectWithValue }
  ) => {
    try {
      const state = getState() as RootState;
      const currentProject = selectCurrentProject(state);

      if (!currentProject) {
        return rejectWithValue("No active project");
      }

      const pageIndex = currentProject.pages.findIndex(
        (page) => page.id === pageId
      );
      if (pageIndex === -1) {
        return rejectWithValue("Page not found");
      }

      // Handle home page changes
      let updatedPages = [...currentProject.pages];
      if (pageData.isHome) {
        updatedPages = updatedPages.map((page) => ({
          ...page,
          isHome: page.id === pageId,
        }));
      } else {
        // Update the specific page
        const oldPageData = currentProject.pages[pageIndex];
        updatedPages[pageIndex] = {
          ...oldPageData,
          ...pageData,
          // Preserve home status if not explicitly changing it
          isHome:
            pageData.isHome !== undefined
              ? pageData.isHome
              : oldPageData.isHome,
        };
      }

      const updatedProject = {
        ...currentProject,
        pages: updatedPages,
        updatedAt: new Date().toISOString(),
      };

      // Add to history
      historyManager.addAction({
        projectId: currentProject.id,
        type: "UPDATE_PAGE",
        data: {
          pageId,
          oldData: currentProject.pages[pageIndex],
          newData: updatedPages[pageIndex],
        },
      });

      return updatedProject;
    } catch (error) {
      console.error("Failed to update page:", error);
      return rejectWithValue(
        error instanceof Error ? error.message : "Unknown error occurred"
      );
    }
  }
);

// Action to publish a project
export const publishProject = createAsyncThunk(
  "projects/publish",
  async (_, { getState, rejectWithValue }) => {
    try {
      const state = getState() as RootState;
      const currentProject = selectCurrentProject(state);

      if (!currentProject) {
        return rejectWithValue("No active project");
      }

      // Validate the project before publishing
      const validationResult = projectValidator.validate(currentProject);
      if (!validationResult.valid) {
        return rejectWithValue(validationResult.errors);
      }

      // Call publish API
      const publishedProject = await projectService.publishProject(
        currentProject.id
      );

      return publishedProject;
    } catch (error) {
      console.error("Failed to publish project:", error);
      return rejectWithValue(
        error instanceof Error ? error.message : "Failed to publish project"
      );
    }
  }
);

// Action to duplicate a project
export const duplicateProject = createAsyncThunk(
  "projects/duplicate",
  async (projectId: string, { rejectWithValue }) => {
    try {
      // Get the project to duplicate
      const sourceProject = await projectService.getProjectById(projectId);

      // Create a new project with duplicated name
      const duplicatedProject = await projectService.duplicateProject(
        projectId,
        `${sourceProject.name} (Copy)`
      );

      // Initialize history for the new project
      historyManager.initializeProjectHistory(duplicatedProject.id);

      return duplicatedProject;
    } catch (error) {
      console.error("Failed to duplicate project:", error);
      return rejectWithValue(
        error instanceof Error ? error.message : "Failed to duplicate project"
      );
    }
  }
);

// Action to import a project from template
export const importFromTemplate = createAsyncThunk(
  "projects/importTemplate",
  async (templateId: string, { rejectWithValue }) => {
    try {
      // Create a new project from template
      const newProject = await projectService.createProjectFromTemplate(
        templateId,
        "New Template Project"
      );

      // Initialize history for the project
      historyManager.initializeProjectHistory(newProject.id);

      return newProject;
    } catch (error) {
      console.error("Failed to import from template:", error);
      return rejectWithValue(
        error instanceof Error
          ? error.message
          : "Failed to import from template"
      );
    }
  }
);

// Action to export project as template
export const exportAsTemplate = createAsyncThunk(
  "projects/exportTemplate",
  async (
    { name, description }: { name: string; description: string },
    { getState, rejectWithValue }
  ) => {
    try {
      const state = getState() as RootState;
      const currentProject = selectCurrentProject(state);

      if (!currentProject) {
        return rejectWithValue("No active project");
      }

      // Since there's no specific template service method in the provided file,
      // we would need to implement a custom function or use an appropriate API endpoint.
      // For now, we'll just return a placeholder template object
      const template = {
        id: uuidv4(),
        name,
        description,
        thumbnail: "", // This would be generated or uploaded
        pages: currentProject.pages,
        settings: currentProject.settings,
        category: "custom",
        createdAt: new Date().toISOString(),
      };

      // In a real implementation, you'd save this template to the backend
      // For now we'll just simulate this
      return template;
    } catch (error) {
      console.error("Failed to export as template:", error);
      return rejectWithValue(
        error instanceof Error ? error.message : "Failed to export as template"
      );
    }
  }
);
