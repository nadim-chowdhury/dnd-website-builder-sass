import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { ComponentType } from "../../types/components";
import { Component } from "../slices/builderSlice";

// Extended Component interface to include optional properties used in selectors
interface ExtendedComponent extends Component {
  locked?: boolean;
  static?: boolean;
}

// Define interfaces for component objects with children
// Note: This interface now correctly represents the hierarchical component structure
interface ComponentWithId extends Omit<ExtendedComponent, "children"> {
  id: string;
  children?: ComponentWithId[]; // Children are now ComponentWithId objects, not string IDs
}

// Project and EditorOptions interfaces
interface Project {
  id: string;
  name: string;
  description?: string;
  // Add other project properties as needed
}

interface EditorOptions {
  showGrid: boolean;
  snapToGrid: boolean;
  gridSize: number;
  // Add other editor settings as needed
}

// Extend BuilderState to include projects and editor settings
interface BuilderState {
  // Existing properties
  components: Record<string, Component>;
  selectedComponentId: string | null;
  hoveredComponentId: string | null;
  canvasConfig: {
    zoomLevel: number;
    width: number;
    height: number;
    // other canvas config properties
  };
  history: {
    past: any[];
    future: any[];
  };
  editorMode: string;
  currentBreakpoint: string;
  dragState: {
    resizing: any | null;
    // other drag state properties
  };
  unsavedChanges: boolean;
  activePanel: string;
  domRefIds: Record<string, string>;

  // New properties
  projects: Record<string, Project>;
  currentProjectId: string | null;
  editorSettings: EditorOptions;

  // Responsive preview properties
  responsiveMode: string;
  responsivePreviewWidth: number;
}

// Basic selectors
export const selectBuilderState = (state: RootState) => state.builder;
export const selectComponents = (state: RootState) => state.builder.components;
export const selectSelectedComponentId = (state: RootState) =>
  state.builder.selectedComponentId;
export const selectHoveredComponentId = (state: RootState) =>
  state.builder.hoveredComponentId;
export const selectCanvasConfig = (state: RootState) =>
  state.builder.canvasConfig;
export const selectEditorHistory = (state: RootState) => state.builder.history;
export const selectEditorMode = (state: RootState) => state.builder.editorMode;
export const selectCurrentBreakpoint = (state: RootState) =>
  state.builder.currentBreakpoint;
export const selectDragState = (state: RootState) => state.builder.dragState;
export const selectUnsavedChanges = (state: RootState) =>
  state.builder.unsavedChanges;
export const selectActivePanel = (state: RootState) =>
  state.builder.activePanel;
export const selectZoomLevel = (state: RootState) =>
  state.builder.canvasConfig.zoomLevel;

// Project selectors
export const selectProjects = (state: RootState) =>
  state.builder.projects || {};
export const selectCurrentProjectId = (state: RootState) =>
  state.builder.currentProjectId;

export const selectCurrentProjectData = createSelector(
  [selectProjects, selectCurrentProjectId],
  (projects, currentProjectId) =>
    currentProjectId && projects ? projects[currentProjectId] : null
);

// Editor settings selector
export const selectEditorSettings = (state: RootState) =>
  state.builder.editorSettings || {
    showGrid: true,
    snapToGrid: true,
    gridSize: 10,
  };

// Responsive preview selectors
export const selectResponsiveMode = (state: RootState) =>
  state.builder.responsiveMode || "desktop";

export const selectResponsivePreviewWidth = (state: RootState) =>
  state.builder.responsivePreviewWidth || 1920;

// Editor viewport selector
export const selectEditorViewport = createSelector(
  [selectCanvasConfig],
  (canvasConfig) => ({
    width: canvasConfig.width || 1920,
    height: canvasConfig.height || 1080,
  })
);

// Derived selectors
export const selectComponentsArray = createSelector(
  [selectComponents],
  (components) =>
    Object.entries(components).map(([id, component]) => ({
      ...component,
      id,
    }))
);

// Add this missing selector to get all components
export const selectAllComponents = createSelector(
  [selectComponents],
  (components) =>
    Object.entries(components).map(([id, component]) => ({
      ...component,
      id,
    }))
);

// Add this missing selector to get a component by ID
export const selectComponentById = createSelector(
  [selectComponents, (_, componentId: string) => componentId],
  (components, componentId) =>
    componentId && components[componentId]
      ? { ...components[componentId], id: componentId }
      : null
);

// Add this missing selector to get root components
export const selectRootComponents = createSelector(
  [selectComponents],
  (components) => {
    return Object.entries(components)
      .filter(([_, component]) => !component.parentId)
      .map(([id, component]) => ({
        ...component,
        id,
      }))
      .sort((a, b) => a.order - b.order);
  }
);

export const selectSelectedComponent = createSelector(
  [selectComponents, selectSelectedComponentId],
  (components, selectedId) => (selectedId ? components[selectedId] : null)
);

export const selectHoveredComponent = createSelector(
  [selectComponents, selectHoveredComponentId],
  (components, hoveredId) => (hoveredId ? components[hoveredId] : null)
);

export const selectParentComponents = createSelector(
  [selectComponents],
  (components) => {
    return Object.entries(components)
      .filter(
        ([_, component]) =>
          component.type === ComponentType.CONTAINER ||
          component.type === ComponentType.SECTION ||
          component.type === ComponentType.GRID ||
          component.type === ComponentType.COLUMN
      )
      .map(([id, component]) => ({
        ...component,
        id,
      }));
  }
);

export const selectComponentChildren = createSelector(
  [selectComponents, (_, componentId: string) => componentId],
  (components, componentId) => {
    if (!componentId) return [];

    return Object.entries(components)
      .filter(([_, component]) => component.parentId === componentId)
      .map(([id, component]) => ({
        ...component,
        id,
      }))
      .sort((a, b) => a.order - b.order);
  }
);

export const selectComponentHierarchy = createSelector(
  [selectComponents],
  (components) => {
    // Find root components (those without parents)
    const rootComponents = Object.entries(components)
      .filter(([_, component]) => !component.parentId)
      .map(([id, component]) => ({ ...component, id }))
      .sort((a, b) => a.order - b.order);

    // Recursive function to build component tree
    const buildComponentTree = (
      rootItems: (Omit<Component, "children"> & { id: string })[]
    ): ComponentWithId[] => {
      return rootItems.map((rootItem) => {
        const children = Object.entries(components)
          .filter(([_, component]) => component.parentId === rootItem.id)
          .map(([id, component]) => ({ ...component, id }))
          .sort((a, b) => a.order - b.order);

        return {
          ...rootItem,
          children: children.length > 0 ? buildComponentTree(children) : [],
        } as ComponentWithId;
      });
    };

    return buildComponentTree(rootComponents);
  }
);

export const selectCanUndo = createSelector(
  [selectEditorHistory],
  (history) => history.past.length > 0
);

export const selectCanRedo = createSelector(
  [selectEditorHistory],
  (history) => history.future.length > 0
);

export const selectComponentStylesForBreakpoint = createSelector(
  [selectSelectedComponent, selectCurrentBreakpoint],
  (component, breakpoint) => {
    if (!component) return null;

    // Get the base styles
    const baseStyles = component.styles?.base || {};

    // Get the responsive styles for the current breakpoint
    const responsiveStyles = component.styles?.responsive?.[breakpoint] || {};

    // Merge the styles
    return {
      ...baseStyles,
      ...responsiveStyles,
    };
  }
);

export const selectIsComponentSelected = createSelector(
  [selectSelectedComponentId, (_, componentId: string) => componentId],
  (selectedId, componentId) => selectedId === componentId
);

export const selectIsComponentHovered = createSelector(
  [selectHoveredComponentId, (_, componentId: string) => componentId],
  (hoveredId, componentId) => hoveredId === componentId
);

export const selectComponentsInPath = createSelector(
  [selectComponents, (_, componentId: string) => componentId],
  (components, componentId) => {
    if (!componentId || !components[componentId]) return [];

    const path: string[] = [];
    let currentId = componentId;

    // Build the path from the component to root
    while (currentId) {
      path.unshift(currentId);
      const component = components[currentId];
      currentId = component?.parentId || "";
    }

    return path;
  }
);

export const selectIsComponentDraggable = createSelector(
  [selectComponents, (_, componentId: string) => componentId],
  (components, componentId) => {
    const component = components[componentId] as ExtendedComponent;
    // Consider a component draggable by default if the locked/static properties don't exist
    return component ? !(component.locked || component.static || false) : false;
  }
);

export const selectIsResizing = createSelector(
  [selectDragState],
  (dragState) => dragState.resizing !== null
);

// Preview mode selector - using EditorMode instead of undefined isPreview property
export const selectIsPreview = createSelector(
  [selectEditorMode],
  (mode) => mode === "preview"
);

// Helper selector to determine if we're in edit mode
export const selectIsEditing = createSelector(
  [selectEditorMode],
  (mode) => mode === "edit"
);

// DOM reference selectors
export const selectDomRefIds = (state: RootState) => state.builder.domRefIds;
export const selectDomRefIdForComponent = (id: string) => (state: RootState) =>
  state.builder.domRefIds[id] || null;

// src/redux/selectors/builder-selectors.ts

// import { RootState } from "../store";
// import { createSelector } from "@reduxjs/toolkit";

// // Select all components
// export const selectComponents = (state: RootState) => state.builder.components;

// // Select a specific component by ID
// export const selectComponentById = (state: RootState, componentId: string) =>
//   state.builder.components[componentId];

// // Select the currently selected component
// export const selectSelectedComponent = createSelector(
//   [(state: RootState) => state.builder.selectedComponentId, selectComponents],
//   (selectedId, components) => {
//     if (!selectedId) return null;
//     return components[selectedId];
//   }
// );

// // Select components by parent ID
// export const selectComponentsByParent = createSelector(
//   [selectComponents, (_, parentId: string | null) => parentId],
//   (components, parentId) => {
//     return Object.values(components)
//       .filter((component) => component.parentId === parentId)
//       .sort((a, b) => a.order - b.order);
//   }
// );

// // Select root components (components with no parent)
// export const selectRootComponents = createSelector(
//   [selectComponents],
//   (components) => {
//     return Object.values(components)
//       .filter((component) => component.parentId === null)
//       .sort((a, b) => a.order - b.order);
//   }
// );

// // Select the current project
// export const selectCurrentProject = createSelector(
//   [
//     (state: RootState) => state.builder.projects,
//     (state: RootState) => state.builder.currentProjectId,
//   ],
//   (projects, currentProjectId) => {
//     if (!currentProjectId) return null;
//     return projects[currentProjectId];
//   }
// );

// // Select all projects as an array
// export const selectAllProjects = createSelector(
//   [(state: RootState) => state.builder.projects],
//   (projects) => {
//     return Object.values(projects);
//   }
// );
