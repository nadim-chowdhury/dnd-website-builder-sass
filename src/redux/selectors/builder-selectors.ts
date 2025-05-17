import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { ComponentType } from "../../types/components";

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

// Derived selectors
export const selectComponentsArray = createSelector(
  [selectComponents],
  (components) =>
    Object.entries(components).map(([id, component]) => ({
      id,
      ...component,
    }))
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
        id,
        ...component,
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
        id,
        ...component,
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
      .map(([id, component]) => ({ id, ...component }))
      .sort((a, b) => a.order - b.order);

    // Recursive function to build component tree
    const buildComponentTree = (rootItems: any[]) => {
      return rootItems.map((rootItem) => {
        const children = Object.entries(components)
          .filter(([_, component]) => component.parentId === rootItem.id)
          .map(([id, component]) => ({ id, ...component }))
          .sort((a, b) => a.order - b.order);

        return {
          ...rootItem,
          children: children.length > 0 ? buildComponentTree(children) : [],
        };
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
    const baseStyles = component.styles.base || {};

    // Get the responsive styles for the current breakpoint
    const responsiveStyles = component.styles.responsive?.[breakpoint] || {};

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
    const component = components[componentId];
    return component ? !component.locked && !component.static : false;
  }
);

export const selectIsResizing = createSelector(
  [selectDragState],
  (dragState) => dragState.resizing !== null
);
