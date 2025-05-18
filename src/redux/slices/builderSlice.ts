import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  ComponentType,
  EditorMode,
  BreakpointType,
  DragState,
} from "../../types/components";
import type { ResponsiveMode } from "../../types/editor";

// Define a serializable reference type instead of using HTMLElement directly
export type DomRefID = string;

// Define the Component type directly in the file to ensure it has all needed properties
export interface Component {
  id: string;
  name: string;
  type: ComponentType;
  parentId: string | null;
  order: number;
  props?: Record<string, any>;
  styles?: Record<string, any>;
  children?: string[];
  // Add any other properties that your Component type needs
}

// Project interface
export interface Project {
  id: string;
  name: string;
  description?: string;
  // Add other project properties as needed
}

// Editor settings interface
export interface EditorOptions {
  showGrid: boolean;
  snapToGrid: boolean;
  gridSize: number;
  // Add other editor settings as needed
}

// Define the shape of the builder state
interface BuilderState {
  components: Record<string, Component>;
  selectedComponentId: string | null;
  hoveredComponentId: string | null;
  canvasConfig: {
    width: number;
    height: number;
    zoomLevel: number;
    gridVisible: boolean;
    snapToGrid: boolean;
    gridSize: number;
  };
  currentBreakpoint: BreakpointType;
  editorMode: EditorMode;
  history: {
    past: Array<Record<string, Component>>;
    future: Array<Record<string, Component>>;
    maxHistoryItems: number;
  };
  dragState: DragState;
  unsavedChanges: boolean;
  activePanel: string | null;
  domRefIds: Record<string, DomRefID | null>; // Store IDs instead of DOM elements
  error: string | null;

  // Add the missing properties
  projects: Record<string, Project>;
  currentProjectId: string | null;
  editorSettings: EditorOptions;

  // Responsive preview properties
  responsiveMode: ResponsiveMode;
  responsivePreviewWidth: number;
}

// Define the initial state
const initialState: BuilderState = {
  components: {},
  selectedComponentId: null,
  hoveredComponentId: null,
  canvasConfig: {
    width: 1440,
    height: 900,
    zoomLevel: 1,
    gridVisible: true,
    snapToGrid: true,
    gridSize: 8,
  },
  currentBreakpoint: BreakpointType.DESKTOP,
  editorMode: EditorMode.EDIT,
  history: {
    past: [],
    future: [],
    maxHistoryItems: 50,
  },
  dragState: {
    isDragging: false,
    draggedComponentId: null,
    draggedComponentType: null,
    dropTargetId: null,
    position: { x: 0, y: 0 },
    offset: { x: 0, y: 0 },
    resizing: null,
  },
  unsavedChanges: false,
  activePanel: "components",
  domRefIds: {}, // Changed from domRefs to domRefIds
  error: null,

  // Initialize the missing properties
  projects: {},
  currentProjectId: null,
  editorSettings: {
    showGrid: true,
    snapToGrid: true,
    gridSize: 10,
  },

  // Initialize responsive preview properties
  responsiveMode: "desktop",
  responsivePreviewWidth: 1920,
};

// Helper function to save to history
function saveToHistory(state: BuilderState): void {
  state.history.past = [...state.history.past, { ...state.components }];
  state.history.future = [];

  // Limit history size
  if (state.history.past.length > state.history.maxHistoryItems) {
    state.history.past.shift();
  }
}

// Helper function to generate component ID
function generateComponentId(type: ComponentType): string {
  const typePrefix = type.toLowerCase();
  const randomId = Math.random().toString(36).substring(2, 10);
  return `${typePrefix}-${randomId}`;
}

// Create the slice
const builderSlice = createSlice({
  name: "builder",
  initialState,
  reducers: {
    // Component actions
    addComponent: (state, action: PayloadAction<Component>) => {
      state.components[action.payload.id] = action.payload;
      state.unsavedChanges = true;
      saveToHistory(state);
    },

    updateComponent: (
      state,
      action: PayloadAction<{ id: string; changes: Partial<Component> }>
    ) => {
      const { id, changes } = action.payload;
      if (state.components[id]) {
        state.components[id] = { ...state.components[id], ...changes };
        state.unsavedChanges = true;
        saveToHistory(state);
      }
    },

    removeComponent: (state, action: PayloadAction<string>) => {
      const id = action.payload;

      // Before removing, check for and remove any children
      Object.keys(state.components).forEach((componentId) => {
        const component = state.components[componentId];
        if (component.parentId === id) {
          delete state.components[componentId];
        }
      });

      delete state.components[id];

      // Clear selection if the removed component was selected
      if (state.selectedComponentId === id) {
        state.selectedComponentId = null;
      }

      // Clear hover if the removed component was hovered
      if (state.hoveredComponentId === id) {
        state.hoveredComponentId = null;
      }

      state.unsavedChanges = true;
      saveToHistory(state);
    },

    moveComponent: (
      state,
      action: PayloadAction<{
        componentId: string;
        newParentId: string | null;
        index: number | undefined;
      }>
    ) => {
      const { componentId, newParentId, index } = action.payload;
      if (!state.components[componentId]) return;

      const component = state.components[componentId];
      const oldParentId = component.parentId;

      // Update the component's parent
      state.components[componentId] = {
        ...component,
        parentId: newParentId,
      };

      // Update the order of all affected components
      // Get siblings in the new parent
      const siblings = Object.values(state.components)
        .filter((c) => c.parentId === newParentId && c.id !== componentId)
        .sort((a, b) => a.order - b.order);

      // Insert the component at the desired index or at the end if index is undefined
      const insertIndex = index !== undefined ? index : siblings.length;
      siblings.splice(insertIndex, 0, state.components[componentId]);

      // Update the order of all siblings
      siblings.forEach((sibling, idx) => {
        if (sibling.id) {
          state.components[sibling.id] = {
            ...state.components[sibling.id],
            order: idx,
          };
        }
      });

      // If the component moved from another parent, reorder the old siblings
      if (oldParentId !== newParentId) {
        const oldSiblings = Object.values(state.components)
          .filter((c) => c.parentId === oldParentId)
          .sort((a, b) => a.order - b.order);

        oldSiblings.forEach((sibling, idx) => {
          if (sibling.id) {
            state.components[sibling.id] = {
              ...state.components[sibling.id],
              order: idx,
            };
          }
        });
      }

      state.unsavedChanges = true;
      saveToHistory(state);
    },

    duplicateComponent: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      if (!state.components[id]) return;

      const component = state.components[id];
      const newId = generateComponentId(component.type);

      // Create a new component based on the original
      const newComponent: Component = {
        ...component,
        id: newId,
        name: `${component.name} Copy`,
      };

      state.components[newId] = newComponent;

      // If this component has children, duplicate them too
      const childrenComponents = Object.values(state.components).filter(
        (c) => c.parentId === id
      );

      childrenComponents.forEach((child) => {
        const newChildId = generateComponentId(child.type);
        state.components[newChildId] = {
          ...child,
          id: newChildId,
          parentId: newId,
        };
      });

      state.unsavedChanges = true;
      saveToHistory(state);

      // Select the newly duplicated component
      state.selectedComponentId = newId;
    },

    // NEW ACTION: Create a snapshot of the current state with an optional label
    createSnapshot: (state, action: PayloadAction<string | undefined>) => {
      // We don't need to use the label in the state, but it could be useful for debugging
      // or future enhancements like named history states
      saveToHistory(state);
    },

    // Selection actions
    selectComponent: (state, action: PayloadAction<string | null>) => {
      state.selectedComponentId = action.payload;
    },

    hoverComponent: (state, action: PayloadAction<string | null>) => {
      state.hoveredComponentId = action.payload;
    },

    // Canvas config actions
    updateCanvasConfig: (
      state,
      action: PayloadAction<Partial<BuilderState["canvasConfig"]>>
    ) => {
      state.canvasConfig = { ...state.canvasConfig, ...action.payload };
    },

    setZoomLevel: (state, action: PayloadAction<number>) => {
      state.canvasConfig.zoomLevel = action.payload;
    },

    // Breakpoint actions
    setBreakpoint: (state, action: PayloadAction<BreakpointType>) => {
      state.currentBreakpoint = action.payload;
    },

    // Editor mode actions
    setEditorMode: (state, action: PayloadAction<EditorMode>) => {
      state.editorMode = action.payload;

      // Clear selection when switching to preview mode
      if (action.payload === EditorMode.PREVIEW) {
        state.selectedComponentId = null;
        state.hoveredComponentId = null;
      }
    },

    // Responsive preview actions
    setResponsiveMode: (state, action: PayloadAction<ResponsiveMode>) => {
      state.responsiveMode = action.payload;
    },

    setResponsivePreviewWidth: (state, action: PayloadAction<number>) => {
      state.responsivePreviewWidth = action.payload;
    },

    // History actions
    undo: (state) => {
      if (state.history.past.length === 0) return;

      // Get the last state from the past
      const previous = state.history.past[state.history.past.length - 1];

      // Save current state to future
      state.history.future = [{ ...state.components }, ...state.history.future];
      if (state.history.future.length > state.history.maxHistoryItems) {
        state.history.future.pop();
      }

      // Restore the previous state
      state.components = { ...previous };

      // Remove the used state from the past
      state.history.past = state.history.past.slice(0, -1);

      state.unsavedChanges = true;
    },

    redo: (state) => {
      if (state.history.future.length === 0) return;

      // Get the next state from the future
      const next = state.history.future[0];

      // Save current state to past
      state.history.past = [...state.history.past, { ...state.components }];
      if (state.history.past.length > state.history.maxHistoryItems) {
        state.history.past.shift();
      }

      // Restore the next state
      state.components = { ...next };

      // Remove the used state from the future
      state.history.future = state.history.future.slice(1);

      state.unsavedChanges = true;
    },

    clearHistory: (state) => {
      state.history.past = [];
      state.history.future = [];
    },

    // Drag and drop actions
    startDrag: (
      state,
      action: PayloadAction<{
        componentId: string | null;
        componentType: ComponentType | null;
        position: { x: number; y: number };
        offset: { x: number; y: number };
      }>
    ) => {
      state.dragState = {
        ...state.dragState,
        isDragging: true,
        draggedComponentId: action.payload.componentId,
        draggedComponentType: action.payload.componentType,
        position: action.payload.position,
        offset: action.payload.offset,
      };
    },

    updateDrag: (
      state,
      action: PayloadAction<{
        position: { x: number; y: number };
        dropTargetId?: string | null;
      }>
    ) => {
      state.dragState.position = action.payload.position;
      if (action.payload.dropTargetId !== undefined) {
        state.dragState.dropTargetId = action.payload.dropTargetId;
      }
    },

    endDrag: (state) => {
      state.dragState = {
        ...initialState.dragState,
      };
    },

    startResize: (
      state,
      action: PayloadAction<{
        componentId: string;
        handle:
          | "top"
          | "right"
          | "bottom"
          | "left"
          | "topLeft"
          | "topRight"
          | "bottomRight"
          | "bottomLeft";
        initialSize: { width: number; height: number };
        initialPosition: { x: number; y: number };
      }>
    ) => {
      state.dragState.resizing = action.payload;
    },

    endResize: (state) => {
      state.dragState.resizing = null;
      saveToHistory(state);
    },

    // Project state actions
    setUnsavedChanges: (state, action: PayloadAction<boolean>) => {
      state.unsavedChanges = action.payload;
    },

    // UI state actions
    setActivePanel: (state, action: PayloadAction<string | null>) => {
      state.activePanel = action.payload;
    },

    // DOM references - Fixed the property name
    updateComponentDomId: (
      state,
      action: PayloadAction<{ id: string; domId: DomRefID | null }>
    ) => {
      state.domRefIds[action.payload.id] = action.payload.domId;
    },

    // Error handling
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },

    // Load/save project
    loadProject: (state, action: PayloadAction<Record<string, Component>>) => {
      state.components = action.payload;
      state.selectedComponentId = null;
      state.hoveredComponentId = null;
      state.history.past = [];
      state.history.future = [];
      state.unsavedChanges = false;
    },

    // Add project management actions
    addProject: (state, action: PayloadAction<Project>) => {
      state.projects[action.payload.id] = action.payload;
    },

    updateProject: (
      state,
      action: PayloadAction<{ id: string; changes: Partial<Project> }>
    ) => {
      const { id, changes } = action.payload;
      if (state.projects[id]) {
        state.projects[id] = { ...state.projects[id], ...changes };
      }
    },

    removeProject: (state, action: PayloadAction<string>) => {
      delete state.projects[action.payload];
      if (state.currentProjectId === action.payload) {
        state.currentProjectId = null;
      }
    },

    setCurrentProject: (state, action: PayloadAction<string | null>) => {
      state.currentProjectId = action.payload;
    },

    // Editor settings actions
    updateEditorSettings: (
      state,
      action: PayloadAction<Partial<EditorOptions>>
    ) => {
      state.editorSettings = { ...state.editorSettings, ...action.payload };
    },

    resetBuilder: (state) => {
      return { ...initialState, canvasConfig: { ...state.canvasConfig } };
    },
  },
});

export const {
  addComponent,
  updateComponent,
  removeComponent,
  moveComponent,
  duplicateComponent,
  createSnapshot,
  selectComponent,
  hoverComponent,
  updateCanvasConfig,
  setZoomLevel,
  setBreakpoint,
  setEditorMode,
  setResponsiveMode,
  setResponsivePreviewWidth,
  undo,
  redo,
  clearHistory,
  startDrag,
  updateDrag,
  endDrag,
  startResize,
  endResize,
  setUnsavedChanges,
  setActivePanel,
  updateComponentDomId,
  setError,
  loadProject,
  addProject,
  updateProject,
  removeProject,
  setCurrentProject,
  updateEditorSettings,
  resetBuilder,
} = builderSlice.actions;

export default builderSlice.reducer;
