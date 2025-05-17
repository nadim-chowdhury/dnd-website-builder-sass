import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { Project, ProjectStatus } from "../../types/project";

// Basic selectors
export const selectProjectsState = (state: RootState) => state.projects;
export const selectAllProjects = (state: RootState) => state.projects.projects;
export const selectCurrentProjectId = (state: RootState) =>
  state.projects.currentProjectId;
export const selectProjectsLoading = (state: RootState) =>
  state.projects.loading;
export const selectProjectsError = (state: RootState) => state.projects.error;
export const selectProjectFilters = (state: RootState) =>
  state.projects.filters;
export const selectProjectSortOrder = (state: RootState) =>
  state.projects.sortOrder;
export const selectRecentProjects = (state: RootState) =>
  state.projects.recentProjects;

// Derived selectors
export const selectProjectsArray = createSelector(
  [selectAllProjects],
  (projects) => Object.values(projects)
);

export const selectCurrentProject = createSelector(
  [selectAllProjects, selectCurrentProjectId],
  (projects, currentId) => (currentId ? projects[currentId] : null)
);

export const selectFilteredProjects = createSelector(
  [selectProjectsArray, selectProjectFilters],
  (projects, filters) => {
    return projects.filter((project) => {
      let matches = true;

      // Filter by search term
      if (filters.searchTerm && filters.searchTerm.trim() !== "") {
        const searchTerm = filters.searchTerm.toLowerCase();
        const nameMatch = project.name.toLowerCase().includes(searchTerm);
        const descMatch = project.description
          ?.toLowerCase()
          .includes(searchTerm);
        matches = matches && (nameMatch || descMatch);
      }

      // Filter by status
      if (filters.status && filters.status.length > 0) {
        matches = matches && filters.status.includes(project.status);
      }

      // Filter by tags
      if (filters.tags && filters.tags.length > 0) {
        const projectHasTags = filters.tags.some(
          (tag) => project.tags && project.tags.includes(tag)
        );
        matches = matches && projectHasTags;
      }

      // Filter by date range
      if (filters.dateRange) {
        const { startDate, endDate } = filters.dateRange;
        const projectDate = new Date(project.updatedAt || project.createdAt);

        if (startDate) {
          matches = matches && projectDate >= startDate;
        }

        if (endDate) {
          matches = matches && projectDate <= endDate;
        }
      }

      return matches;
    });
  }
);

export const selectSortedProjects = createSelector(
  [selectFilteredProjects, selectProjectSortOrder],
  (projects, sortOrder) => {
    const sortedProjects = [...projects];

    sortedProjects.sort((a, b) => {
      switch (sortOrder.field) {
        case "name":
          return sortOrder.direction === "asc"
            ? a.name.localeCompare(b.name)
            : b.name.localeCompare(a.name);

        case "createdAt":
          return sortOrder.direction === "asc"
            ? new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
            : new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();

        case "updatedAt":
          return sortOrder.direction === "asc"
            ? new Date(a.updatedAt || a.createdAt).getTime() -
                new Date(b.updatedAt || b.createdAt).getTime()
            : new Date(b.updatedAt || b.createdAt).getTime() -
                new Date(a.updatedAt || a.createdAt).getTime();

        default:
          return 0;
      }
    });

    return sortedProjects;
  }
);

export const selectProjectsByStatus = createSelector(
  [selectProjectsArray],
  (projects) => {
    return {
      draft: projects.filter(
        (project) => project.status === ProjectStatus.DRAFT
      ),
      published: projects.filter(
        (project) => project.status === ProjectStatus.PUBLISHED
      ),
      archived: projects.filter(
        (project) => project.status === ProjectStatus.ARCHIVED
      ),
    };
  }
);

export const selectProjectStats = createSelector(
  [selectProjectsArray],
  (projects) => {
    return {
      total: projects.length,
      draft: projects.filter(
        (project) => project.status === ProjectStatus.DRAFT
      ).length,
      published: projects.filter(
        (project) => project.status === ProjectStatus.PUBLISHED
      ).length,
      archived: projects.filter(
        (project) => project.status === ProjectStatus.ARCHIVED
      ).length,
      recentlyUpdated: projects.filter((project) => {
        const updatedAt = new Date(project.updatedAt || project.createdAt);
        const oneWeekAgo = new Date();
        oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
        return updatedAt >= oneWeekAgo;
      }).length,
    };
  }
);

export const selectProjectById = createSelector(
  [selectAllProjects, (_, projectId: string) => projectId],
  (projects, projectId) => (projectId ? projects[projectId] : null)
);

export const selectRecentProjectsData = createSelector(
  [selectAllProjects, selectRecentProjects],
  (projects, recentIds) => {
    return recentIds
      .map((id) => projects[id])
      .filter((project) => project !== undefined);
  }
);

export const selectProjectTags = createSelector(
  [selectProjectsArray],
  (projects) => {
    const tagsSet = new Set<string>();

    projects.forEach((project) => {
      if (project.tags && project.tags.length > 0) {
        project.tags.forEach((tag) => tagsSet.add(tag));
      }
    });

    return Array.from(tagsSet).sort();
  }
);

export const selectIsProjectOwner = createSelector(
  [selectCurrentProject, (_, userId: string) => userId],
  (project, userId) => {
    return project ? project.ownerId === userId : false;
  }
);

export const selectProjectCollaborators = createSelector(
  [selectCurrentProject],
  (project) => {
    return project && project.collaborators ? project.collaborators : [];
  }
);

export const selectCanUserEditProject = createSelector(
  [selectCurrentProject, (_, userId: string) => userId],
  (project, userId) => {
    if (!project || !userId) return false;

    // Owner can always edit
    if (project.ownerId === userId) return true;

    // Check if user is a collaborator with edit access
    return (
      project.collaborators?.some(
        (collaborator) => collaborator.userId === userId && collaborator.canEdit
      ) || false
    );
  }
);
