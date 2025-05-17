import {
  Project,
  ProjectSettings,
  ProjectMetadata,
  ProjectAsset,
} from "@/types/project";
import { Component } from "@/types/components";
import {
  serializeComponent,
  deserializeComponent,
  SerializedComponent,
} from "./component-serializer";
import { validateProject } from "../validators/project-validator";
import { EditorState } from "@/types/editor";

/**
 * Project serialization format
 * This is the format used for saving and loading projects
 */
export interface SerializedProject {
  id: string;
  name: string;
  components: SerializedComponent[];
  settings: ProjectSettings;
  metadata: ProjectMetadata;
  version: string;
  createdAt: string;
  updatedAt: string;
  assets?: SerializedProjectAsset[];
  publishedUrl?: string;
  publishedVersion?: number;
}

/**
 * Serialized format for project assets
 */
export interface SerializedProjectAsset {
  id: string;
  name: string;
  type: string;
  url: string;
  size: number;
  metadata: Record<string, any>;
  createdAt: string;
}

/**
 * Current serialization version
 */
export const CURRENT_PROJECT_VERSION = "1.0.0";

/**
 * Serializes a project to a plain JSON object
 *
 * @param project The project to serialize
 * @returns Serialized project representation
 */
export function serializeProject(project: Project): SerializedProject {
  const serialized: SerializedProject = {
    id: project.id,
    name: project.name,
    components: project.components.map(serializeComponent),
    settings: {
      ...project.settings,
      // Ensure settings have all required fields with defaults
      responsive: project.settings.responsive ?? {
        enabled: true,
        breakpoints: {
          mobile: 480,
          tablet: 768,
          desktop: 1200,
        },
      },
      meta: project.settings.meta ?? {
        title: project.name,
        description: "",
        keywords: [],
        author: "",
      },
    },
    metadata: {
      ...project.metadata,
      lastModifiedBy: project.metadata.lastModifiedBy ?? "unknown",
    },
    version: CURRENT_PROJECT_VERSION,
    createdAt: project.createdAt.toISOString(),
    updatedAt: project.updatedAt.toISOString(),
    publishedUrl: project.publishedUrl,
    publishedVersion: project.publishedVersion,
  };

  // Serialize assets if present
  if (Array.isArray(project.assets) && project.assets.length > 0) {
    serialized.assets = project.assets.map((asset) => ({
      id: asset.id,
      name: asset.name,
      type: asset.type,
      url: asset.url,
      size: asset.size,
      metadata: { ...asset.metadata },
      createdAt: asset.createdAt.toISOString(),
    }));
  }

  return serialized;
}

/**
 * Deserializes a project from a plain JSON object
 *
 * @param serialized The serialized project data
 * @returns Deserialized project
 */
export function deserializeProject(serialized: SerializedProject): Project {
  // First deserialize all individual components
  const components: Component[] =
    serialized.components.map(deserializeComponent);

  // Build component hierarchy
  buildComponentHierarchy(components);

  // Create the project object
  const project: Project = {
    id: serialized.id,
    name: serialized.name,
    components,
    settings: {
      ...serialized.settings,
    },
    metadata: {
      ...serialized.metadata,
    },
    createdAt: new Date(serialized.createdAt),
    updatedAt: new Date(serialized.updatedAt),
    publishedUrl: serialized.publishedUrl,
    publishedVersion: serialized.publishedVersion,
  };

  // Deserialize assets if present
  if (Array.isArray(serialized.assets) && serialized.assets.length > 0) {
    project.assets = serialized.assets.map((asset) => ({
      id: asset.id,
      name: asset.name,
      type: asset.type,
      url: asset.url,
      size: asset.size,
      metadata: { ...asset.metadata },
      createdAt: new Date(asset.createdAt),
    }));
  }

  // Validate the deserialized project
  const validationResult = validateProject(project);
  if (!validationResult.valid) {
    console.warn(`Project validation issues:`, validationResult.issues);
    // Apply automatic fixes for known issues
    applyProjectFixes(project, validationResult.issues);
  }

  return project;
}

/**
 * Build the component hierarchy by linking parent-child relationships
 *
 * @param components Array of all components
 */
function buildComponentHierarchy(components: Component[]): void {
  // Create a map of components by ID for quick lookup
  const componentMap = new Map<string, Component>();
  components.forEach((component) => {
    componentMap.set(component.id, component);
  });

  // Sort components by order to ensure correct rendering
  components.sort((a, b) => a.order - b.order);

  // Clear existing children arrays to rebuild the hierarchy
  components.forEach((component) => {
    component.children = [];
  });

  // Build parent-child relationships
  components.forEach((component) => {
    if (component.parentId) {
      const parent = componentMap.get(component.parentId);
      if (parent) {
        parent.children.push(component);
      } else {
        console.warn(
          `Parent component ${component.parentId} not found for ${component.id}`
        );
        // Orphaned component - attach to root level
        component.parentId = null;
      }
    }
  });

  // Sort children by order for each component
  components.forEach((component) => {
    component.children.sort((a, b) => a.order - b.order);
  });
}

/**
 * Apply automatic fixes for project validation issues
 *
 * @param project The project to fix
 * @param issues Array of validation issues
 */
function applyProjectFixes(project: Project, issues: string[]): void {
  // Example fixes for common issues
  issues.forEach((issue) => {
    // Fix missing orders by assigning incremental values
    if (issue.includes("missing order value")) {
      let order = 0;
      project.components.forEach((component) => {
        if (component.order === undefined) {
          component.order = order++;
        }
      });
    }

    // Fix orphaned components
    if (issue.includes("orphaned component")) {
      project.components.forEach((component) => {
        if (
          component.parentId &&
          !project.components.some((c) => c.id === component.parentId)
        ) {
          component.parentId = null;
        }
      });
    }

    // Add more automatic fixes as needed
  });
}

/**
 * Serializes an editor state to save with the project
 *
 * @param state The editor state to serialize
 * @returns Serialized editor state
 */
export function serializeEditorState(state: EditorState): Record<string, any> {
  return {
    selectedComponentId: state.selectedComponentId,
    activePanel: state.activePanel,
    zoom: state.zoom,
    canvasPosition: state.canvasPosition,
    activeBreakpoint: state.activeBreakpoint,
    viewMode: state.viewMode,
    history: {
      undoAvailable: state.history.undoAvailable,
      redoAvailable: state.history.redoAvailable,
    },
  };
}

/**
 * Deserializes a saved editor state
 *
 * @param serialized The serialized editor state
 * @returns Deserialized editor state
 */
export function deserializeEditorState(
  serialized: Record<string, any>
): Partial<EditorState> {
  return {
    selectedComponentId: serialized.selectedComponentId,
    activePanel: serialized.activePanel,
    zoom: serialized.zoom,
    canvasPosition: serialized.canvasPosition,
    activeBreakpoint: serialized.activeBreakpoint,
    viewMode: serialized.viewMode,
    history: {
      undoAvailable: serialized.history?.undoAvailable ?? false,
      redoAvailable: serialized.history?.redoAvailable ?? false,
      lastAction: null,
    },
  };
}

/**
 * Creates an empty project with default settings
 *
 * @param name Project name
 * @param userId User ID of the creator
 * @returns A new empty project
 */
export function createEmptyProject(name: string, userId: string): Project {
  const now = new Date();
  const projectId = `project_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;

  // Create root container component
  const rootContainer: Component = {
    id: `component_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    type: "container",
    name: "Root Container",
    props: {},
    styles: {
      width: "100%",
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
    },
    children: [],
    parentId: null,
    order: 0,
    isHidden: false,
    metadata: { isRoot: true },
  };

  return {
    id: projectId,
    name: name,
    components: [rootContainer],
    settings: {
      responsive: {
        enabled: true,
        breakpoints: {
          mobile: 480,
          tablet: 768,
          desktop: 1200,
        },
      },
      meta: {
        title: name,
        description: "",
        keywords: [],
        author: "",
      },
      scripts: [],
      styles: [],
    },
    metadata: {
      createdBy: userId,
      lastModifiedBy: userId,
      tags: [],
    },
    createdAt: now,
    updatedAt: now,
  };
}

/**
 * Creates a serialized export of a project suitable for sharing or importing
 *
 * @param project The project to export
 * @returns A JSON string of the serialized project
 */
export function exportProject(project: Project): string {
  const serialized = serializeProject(project);

  // Add export metadata
  const exportData = {
    ...serialized,
    exportedAt: new Date().toISOString(),
    exportVersion: CURRENT_PROJECT_VERSION,
  };

  return JSON.stringify(exportData, null, 2);
}

/**
 * Imports a project from a serialized export
 *
 * @param jsonString The JSON string containing the exported project
 * @param newOwnerId Optional new owner ID
 * @returns The imported project
 * @throws Error if the import data is invalid
 */
export function importProject(
  jsonString: string,
  newOwnerId?: string
): Project {
  try {
    const importData = JSON.parse(jsonString);

    // Validate the import data
    if (!importData.id || !importData.components) {
      throw new Error("Invalid project export data");
    }

    // Handle version differences if needed
    if (importData.version && importData.version !== CURRENT_PROJECT_VERSION) {
      console.warn(
        `Importing project with version ${importData.version}, current version is ${CURRENT_PROJECT_VERSION}`
      );
      // Add version migration logic here if needed
    }

    // Deserialize the project
    const project = deserializeProject(importData);

    // Assign new owner if provided
    if (newOwnerId) {
      project.metadata.lastModifiedBy = newOwnerId;
      if (project.metadata.createdBy) {
        project.metadata.originalCreator = project.metadata.createdBy;
        project.metadata.createdBy = newOwnerId;
      }
    }

    // Update timestamps
    project.updatedAt = new Date();

    // Generate new IDs if this is a duplicate import
    if (!newOwnerId) {
      project.id = `project_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
      // May also need to regenerate component IDs to avoid conflicts
    }

    return project;
  } catch (error) {
    console.error("Failed to import project:", error);
    throw new Error("Invalid project file or format");
  }
}
