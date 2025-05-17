import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import {
  Project,
  ProjectStatus,
  ProjectFilters,
  SortOrder,
} from "../../types/project";
import { RootState } from "../store";
import * as projectsService from "../../services/projects";

interface ProjectsState {
  projects: Record<string, Project>;
  currentProjectId: string | null;
  recentProjects: string[];
  filters: ProjectFilters;
  sortOrder: SortOrder;
  loading: boolean;
  saving: boolean;
  error: string | null;
}

const initialState: ProjectsState = {
  projects: {},
  currentProjectId: null,
  recentProjects: [],
  filters: {
    searchTerm: "",
    status: [],
    tags: [],
    dateRange: null,
  },
  sortOrder: {
    field: "updatedAt",
    direction: "desc",
  },
  loading: false,
  saving: false,
  error: null,
};

// Async thunks for API interactions
export const fetchProjects = createAsyncThunk(
  "projects/fetchProjects",
  async (_, { rejectWithValue }) => {
    try {
      const projects = await projectsService.getProjects();
      return projects;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Failed to fetch projects"
      );
    }
  }
);

export const fetchProjectById = createAsyncThunk(
  "projects/fetchProjectById",
  async (projectId: string, { rejectWithValue }) => {
    try {
      const project = await projectsService.getProjectById(projectId);
      return project;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Failed to fetch project"
      );
    }
  }
);

export const createProject = createAsyncThunk(
  "projects/createProject",
  async (
    project: Omit<Project, "id" | "createdAt" | "updatedAt">,
    { rejectWithValue }
  ) => {
    try {
      const newProject = await projectsService.createProject(project);
      return newProject;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Failed to create project"
      );
    }
  }
);

export const updateProject = createAsyncThunk(
  "projects/updateProject",
  async (
    { id, changes }: { id: string; changes: Partial<Project> },
    { rejectWithValue }
  ) => {
    try {
      const updatedProject = await projectsService.updateProject(id, changes);
      return updatedProject;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Failed to update project"
      );
    }
  }
);

export const deleteProject = createAsyncThunk(
  "projects/deleteProject",
  async (projectId: string, { rejectWithValue }) => {
    try {
      await projectsService.deleteProject(projectId);
      return projectId;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Failed to delete project"
      );
    }
  }
);

export const duplicateProject = createAsyncThunk(
  "projects/duplicateProject",
  async (projectId: string, { rejectWithValue, getState }) => {
    try {
      const state = getState() as RootState;
      const project = state.projects.projects[projectId];

      if (!project) {
        throw new Error("Project not found");
      }

      // Create a new project with the same properties
      const newProject = {
        ...project,
        name: `${project.name} (Copy)`,
        status: ProjectStatus.DRAFT,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      // Remove id and other unique properties
      delete (newProject as any).id;

      const createdProject = await projectsService.createProject(newProject);
      return createdProject;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Failed to duplicate project"
      );
    }
  }
);

export const publishProject = createAsyncThunk(
  "projects/publishProject",
  async (projectId: string, { rejectWithValue }) => {
    try {
      const updatedProject = await projectsService.updateProject(projectId, {
        status: ProjectStatus.PUBLISHED,
        publishedAt: new Date().toISOString(),
      });
      return updatedProject;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Failed to publish project"
      );
    }
  }
);

export const unpublishProject = createAsyncThunk(
  "projects/unpublishProject",
  async (projectId: string, { rejectWithValue }) => {
    try {
      const updatedProject = await projectsService.updateProject(projectId, {
        status: ProjectStatus.DRAFT,
      });
      return updatedProject;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Failed to unpublish project"
      );
    }
  }
);

export const archiveProject = createAsyncThunk(
  "projects/archiveProject",
  async (projectId: string, { rejectWithValue }) => {
    try {
      const updatedProject = await projectsService.updateProject(projectId, {
        status: ProjectStatus.ARCHIVED,
        archivedAt: new Date().toISOString(),
      });
      return updatedProject;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Failed to archive project"
      );
    }
  }
);

const projectsSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {
    // Set current project
    setCurrentProject: (state, action: PayloadAction<string | null>) => {
      state.currentProjectId = action.payload;

      // Add to recent projects if it's not null
      if (action.payload) {
        // Remove if already in the list
        state.recentProjects = state.recentProjects.filter(
          (id) => id !== action.payload
        );

        // Add to the beginning
        state.recentProjects.unshift(action.payload);

        // Limit to 10 recent projects
        if (state.recentProjects.length > 10) {
          state.recentProjects.pop();
        }
      }
    },

    // Filter and sorting actions
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.filters.searchTerm = action.payload;
    },

    setStatusFilter: (state, action: PayloadAction<ProjectStatus[]>) => {
      state.filters.status = action.payload;
    },

    setTagsFilter: (state, action: PayloadAction<string[]>) => {
      state.filters.tags = action.payload;
    },

    setDateRangeFilter: (
      state,
      action: PayloadAction<{
        startDate: Date | null;
        endDate: Date | null;
      } | null>
    ) => {
      state.filters.dateRange = action.payload;
    },

    clearFilters: (state) => {
      state.filters = initialState.filters;
    },

    setSortOrder: (state, action: PayloadAction<SortOrder>) => {
      state.sortOrder = action.payload;
    },

    // Add project locally (offline mode)
    addProject: (state, action: PayloadAction<Project>) => {
      state.projects[action.payload.id] = action.payload;
    },

    // Update project locally (offline mode)
    patchProject: (
      state,
      action: PayloadAction<{ id: string; changes: Partial<Project> }>
    ) => {
      const { id, changes } = action.payload;
      if (state.projects[id]) {
        state.projects[id] = {
          ...state.projects[id],
          ...changes,
          updatedAt: new Date().toISOString(),
        };
      }
    },

    // Remove project locally (offline mode)
    removeProject: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      delete state.projects[id];

      // Remove from recent projects if present
      state.recentProjects = state.recentProjects.filter(
        (projectId) => projectId !== id
      );

      // Clear current project if it was deleted
      if (state.currentProjectId === id) {
        state.currentProjectId = null;
      }
    },

    // Clear error
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Handle fetch projects
    builder.addCase(fetchProjects.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchProjects.fulfilled, (state, action) => {
      state.loading = false;

      // Convert array to record
      const projectsRecord: Record<string, Project> = {};
      action.payload.forEach((project: Project) => {
        projectsRecord[project.id] = project;
      });
      state.projects = projectsRecord;
    });
    builder.addCase(fetchProjects.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // Handle fetch project by id
    builder.addCase(fetchProjectById.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(
      fetchProjectById.fulfilled,
      (state, action: PayloadAction<Project>) => {
        state.loading = false;
        state.projects[action.payload.id] = action.payload;
        state.currentProjectId = action.payload.id;

        // Add to recent projects
        // Remove if already in the list
        state.recentProjects = state.recentProjects.filter(
          (id) => id !== action.payload.id
        );

        // Add to the beginning
        state.recentProjects.unshift(action.payload.id);

        // Limit to 10 recent projects
        if (state.recentProjects.length > 10) {
          state.recentProjects.pop();
        }
      }
    );
    builder.addCase(fetchProjectById.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // Handle create project
    builder.addCase(createProject.pending, (state) => {
      state.saving = true;
      state.error = null;
    });
    builder.addCase(
      createProject.fulfilled,
      (state, action: PayloadAction<Project>) => {
        state.saving = false;
        state.projects[action.payload.id] = action.payload;
        state.currentProjectId = action.payload.id;

        // Add to recent projects
        state.recentProjects.unshift(action.payload.id);
        if (state.recentProjects.length > 10) {
          state.recentProjects.pop();
        }
      }
    );
    builder.addCase(createProject.rejected, (state, action) => {
      state.saving = false;
      state.error = action.payload as string;
    });

    // Handle update project
    builder.addCase(updateProject.pending, (state) => {
      state.saving = true;
      state.error = null;
    });
    builder.addCase(
      updateProject.fulfilled,
      (state, action: PayloadAction<Project>) => {
        state.saving = false;
        state.projects[action.payload.id] = action.payload;
      }
    );
    builder.addCase(updateProject.rejected, (state, action) => {
      state.saving = false;
      state.error = action.payload as string;
    });

    // Handle delete project
    builder.addCase(deleteProject.pending, (state) => {
      state.saving = true;
      state.error = null;
    });
    builder.addCase(
      deleteProject.fulfilled,
      (state, action: PayloadAction<string>) => {
        state.saving = false;
        delete state.projects[action.payload];

        // Remove from recent projects
        state.recentProjects = state.recentProjects.filter(
          (id) => id !== action.payload
        );

        // Clear current project if it was deleted
        if (state.currentProjectId === action.payload) {
          state.currentProjectId = null;
        }
      }
    );
    builder.addCase(deleteProject.rejected, (state, action) => {
      state.saving = false;
      state.error = action.payload as string;
    });

    // Handle duplicate project
    builder.addCase(duplicateProject.pending, (state) => {
      state.saving = true;
      state.error = null;
    });
    builder.addCase(
      duplicateProject.fulfilled,
      (state, action: PayloadAction<Project>) => {
        state.saving = false;
        state.projects[action.payload.id] = action.payload;
        state.currentProjectId = action.payload.id;

        // Add to recent projects
        state.recentProjects.unshift(action.payload.id);
        if (state.recentProjects.length > 10) {
          state.recentProjects.pop();
        }
      }
    );
    builder.addCase(duplicateProject.rejected, (state, action) => {
      state.saving = false;
      state.error = action.payload as string;
    });

    // Handle publish/unpublish/archive
    builder.addCase(
      publishProject.fulfilled,
      (state, action: PayloadAction<Project>) => {
        state.projects[action.payload.id] = action.payload;
      }
    );
    builder.addCase(
      unpublishProject.fulfilled,
      (state, action: PayloadAction<Project>) => {
        state.projects[action.payload.id] = action.payload;
      }
    );
    builder.addCase(
      archiveProject.fulfilled,
      (state, action: PayloadAction<Project>) => {
        state.projects[action.payload.id] = action.payload;
      }
    );
  },
});

export const {
  setCurrentProject,
  setSearchTerm,
  setStatusFilter,
  setTagsFilter,
  setDateRangeFilter,
  clearFilters,
  setSortOrder,
  addProject,
  patchProject,
  removeProject,
  clearError,
} = projectsSlice.actions;

export default projectsSlice.reducer;
