import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../../redux/store";
import { historyManager } from "../history/history-manager";
import { SelectionState, ComponentSelection } from "../../types/editor";
import { findComponentById, findParentComponent } from "../../utils/component";

/**
 * Selects a single component by its ID
 */
export const selectComponent = createAsyncThunk(
  "builder/selectComponent",
  async (componentId: string, { getState, dispatch }) => {
    const state = getState() as RootState;
    const { currentProject } = state.projects;
    const { currentPageId } = state.builder;

    if (!currentProject || !currentPageId) {
      throw new Error("No active project or page");
    }

    const currentPage = currentProject.pages.find(
      (page) => page.id === currentPageId
    );
    if (!currentPage) {
      throw new Error("Current page not found");
    }

    // Find the component in the current page
    const component = findComponentById(currentPage.components, componentId);
    if (!component) {
      throw new Error(`Component with ID ${componentId} not found`);
    }

    // Get path to component (for breadcrumb navigation)
    const componentPath = getComponentPath(currentPage.components, componentId);

    const selection: SelectionState = {
      selectedComponents: [
        {
          id: componentId,
          type: component.type,
          parentId: component.parentId,
        },
      ],
      lastSelectedId: componentId,
      selectionPath: componentPath,
    };

    // Record selection in history
    historyManager.addAction({
      projectId: currentProject.id,
      type: "SELECTION_CHANGE",
      data: {
        previousSelection: state.builder.selection,
        newSelection: selection,
      },
    });

    return selection;
  }
);

/**
 * Clears the current selection
 */
export const clearSelection = createAsyncThunk(
  "builder/clearSelection",
  async (_, { getState }) => {
    const state = getState() as RootState;
    const { currentProject } = state.projects;

    if (currentProject) {
      // Record clear selection in history
      historyManager.addAction({
        projectId: currentProject.id,
        type: "SELECTION_CHANGE",
        data: {
          previousSelection: state.builder.selection,
          newSelection: null,
        },
      });
    }

    return null;
  }
);

/**
 * Adds a component to the current multi-selection
 */
export const addToSelection = createAsyncThunk(
  "builder/addToSelection",
  async (componentId: string, { getState }) => {
    const state = getState() as RootState;
    const { builder, projects } = state;
    const { currentProject } = projects;
    const { currentPageId, selection } = builder;

    if (!currentProject || !currentPageId) {
      throw new Error("No active project or page");
    }

    const currentPage = currentProject.pages.find(
      (page) => page.id === currentPageId
    );
    if (!currentPage) {
      throw new Error("Current page not found");
    }

    // Find the component in the current page
    const component = findComponentById(currentPage.components, componentId);
    if (!component) {
      throw new Error(`Component with ID ${componentId} not found`);
    }

    // Check if component is already selected
    if (selection?.selectedComponents.some((c) => c.id === componentId)) {
      // Return the current selection without changes
      return selection;
    }

    // Create the new selection to add to existing selection
    const newComponent: ComponentSelection = {
      id: componentId,
      type: component.type,
      parentId: component.parentId,
    };

    const newSelection: SelectionState = {
      selectedComponents: selection
        ? [...selection.selectedComponents, newComponent]
        : [newComponent],
      lastSelectedId: componentId,
      selectionPath: getComponentPath(currentPage.components, componentId),
    };

    // Record in history
    if (currentProject) {
      historyManager.addAction({
        projectId: currentProject.id,
        type: "SELECTION_CHANGE",
        data: {
          previousSelection: selection,
          newSelection,
        },
      });
    }

    return newSelection;
  }
);

/**
 * Removes a component from the current multi-selection
 */
export const removeFromSelection = createAsyncThunk(
  "builder/removeFromSelection",
  async (componentId: string, { getState }) => {
    const state = getState() as RootState;
    const { builder, projects } = state;
    const { currentProject } = projects;
    const { selection } = builder;

    if (!selection || selection.selectedComponents.length === 0) {
      // Nothing to remove
      return selection;
    }

    // Filter out the component to remove
    const newSelectedComponents = selection.selectedComponents.filter(
      (component) => component.id !== componentId
    );

    // If we removed everything, clear selection
    if (newSelectedComponents.length === 0) {
      if (currentProject) {
        historyManager.addAction({
          projectId: currentProject.id,
          type: "SELECTION_CHANGE",
          data: {
            previousSelection: selection,
            newSelection: null,
          },
        });
      }
      return null;
    }

    // If we removed the last selected component, update lastSelectedId
    let lastSelectedId = selection.lastSelectedId;
    if (lastSelectedId === componentId) {
      lastSelectedId =
        newSelectedComponents[newSelectedComponents.length - 1].id;
    }

    const newSelection: SelectionState = {
      selectedComponents: newSelectedComponents,
      lastSelectedId,
      // Keep the existing selection path
      selectionPath: selection.selectionPath,
    };

    // Record in history
    if (currentProject) {
      historyManager.addAction({
        projectId: currentProject.id,
        type: "SELECTION_CHANGE",
        data: {
          previousSelection: selection,
          newSelection,
        },
      });
    }

    return newSelection;
  }
);

/**
 * Toggles selection of a component (selects if not selected, deselects if selected)
 */
export const toggleComponentSelection = createAsyncThunk(
  "builder/toggleComponentSelection",
  async (componentId: string, { getState, dispatch }) => {
    const state = getState() as RootState;
    const { builder } = state;
    const { selection } = builder;

    // Check if component is already selected
    if (selection?.selectedComponents.some((c) => c.id === componentId)) {
      // If already selected and we have multiple selections, remove it
      if (selection.selectedComponents.length > 1) {
        const result = await dispatch(removeFromSelection(componentId));
        return result.payload;
      }
      // If it's the only selection, clear everything
      else {
        const result = await dispatch(clearSelection());
        return result.payload;
      }
    } else {
      // If shift key is pressed (multi-select mode)
      if (state.builder.multiSelectMode) {
        const result = await dispatch(addToSelection(componentId));
        return result.payload;
      } else {
        // Regular select
        const result = await dispatch(selectComponent(componentId));
        return result.payload;
      }
    }
  }
);

/**
 * Sets the multi-select mode (usually triggered by Shift key)
 */
export const setMultiSelectMode = createAsyncThunk(
  "builder/setMultiSelectMode",
  async (enabled: boolean) => {
    return enabled;
  }
);

/**
 * Selects the parent of the currently selected component
 */
export const selectParentComponent = createAsyncThunk(
  "builder/selectParentComponent",
  async (_, { getState, dispatch }) => {
    const state = getState() as RootState;
    const { builder, projects } = state;
    const { currentProject } = projects;
    const { currentPageId, selection } = builder;

    if (
      !currentProject ||
      !currentPageId ||
      !selection ||
      selection.selectedComponents.length === 0
    ) {
      return selection;
    }

    const currentPage = currentProject.pages.find(
      (page) => page.id === currentPageId
    );
    if (!currentPage) {
      return selection;
    }

    const lastSelectedComponent = selection.selectedComponents.find(
      (c) => c.id === selection.lastSelectedId
    );

    if (!lastSelectedComponent || !lastSelectedComponent.parentId) {
      // No parent to select
      return selection;
    }

    // Select the parent
    const result = await dispatch(
      selectComponent(lastSelectedComponent.parentId)
    );
    return result.payload;
  }
);

/**
 * Selects all child components of a container
 */
export const selectAllChildren = createAsyncThunk(
  "builder/selectAllChildren",
  async (containerId: string, { getState, dispatch }) => {
    const state = getState() as RootState;
    const { projects, builder } = state;
    const { currentProject } = projects;
    const { currentPageId } = builder;

    if (!currentProject || !currentPageId) {
      throw new Error("No active project or page");
    }

    const currentPage = currentProject.pages.find(
      (page) => page.id === currentPageId
    );
    if (!currentPage) {
      throw new Error("Current page not found");
    }

    // Find the container
    const container = findComponentById(currentPage.components, containerId);
    if (!container || !container.children || container.children.length === 0) {
      // No children to select
      return builder.selection;
    }

    // Create selection state with all children
    const childSelections: ComponentSelection[] = container.children.map(
      (child) => ({
        id: child.id,
        type: child.type,
        parentId: containerId,
      })
    );

    const newSelection: SelectionState = {
      selectedComponents: childSelections,
      lastSelectedId: childSelections[0].id,
      selectionPath: getComponentPath(currentPage.components, containerId),
    };

    // Record in history
    historyManager.addAction({
      projectId: currentProject.id,
      type: "SELECTION_CHANGE",
      data: {
        previousSelection: builder.selection,
        newSelection,
      },
    });

    return newSelection;
  }
);

/**
 * Helper function to get a path from root to the component (for breadcrumb navigation)
 */
const getComponentPath = (
  components: any[],
  targetId: string
): ComponentSelection[] => {
  const path: ComponentSelection[] = [];

  const findComponentPath = (
    comps: any[],
    targetId: string,
    currentPath: ComponentSelection[] = []
  ): boolean => {
    for (const comp of comps) {
      // Create path entry for this component
      const selectionItem: ComponentSelection = {
        id: comp.id,
        type: comp.type,
        parentId: comp.parentId,
      };

      // Check if this is the component we're looking for
      if (comp.id === targetId) {
        currentPath.push(selectionItem);
        path.push(...currentPath);
        return true;
      }

      // Check children recursively
      if (comp.children && comp.children.length > 0) {
        if (
          findComponentPath(comp.children, targetId, [
            ...currentPath,
            selectionItem,
          ])
        ) {
          return true;
        }
      }
    }

    return false;
  };

  findComponentPath(components, targetId);
  return path;
};

/**
 * Selects component by location on the canvas
 */
export const selectComponentAtPosition = createAsyncThunk(
  "builder/selectComponentAtPosition",
  async ({ x, y }: { x: number; y: number }, { getState, dispatch }) => {
    // This would typically use DOM APIs to find elements at the position
    // Since we can't directly interact with the DOM in this context,
    // we'd implement an algorithm that uses element bounds stored in state

    const state = getState() as RootState;
    const { componentBounds } = state.builder;

    // Find the topmost component at the given coordinates
    let targetId: string | null = null;
    let highestZIndex = -1;

    for (const [id, bounds] of Object.entries(componentBounds)) {
      if (
        x >= bounds.x &&
        x <= bounds.x + bounds.width &&
        y >= bounds.y &&
        y <= bounds.y + bounds.height &&
        bounds.zIndex > highestZIndex
      ) {
        targetId = id;
        highestZIndex = bounds.zIndex;
      }
    }

    if (targetId) {
      const result = await dispatch(selectComponent(targetId));
      return result.payload;
    }

    // If no component found, clear selection
    const result = await dispatch(clearSelection());
    return result.payload;
  }
);

/**
 * Updates selection based on a drag selection box
 */
export const selectComponentsInBox = createAsyncThunk(
  "builder/selectComponentsInBox",
  async (
    {
      left,
      top,
      width,
      height,
    }: { left: number; top: number; width: number; height: number },
    { getState, dispatch }
  ) => {
    const state = getState() as RootState;
    const { componentBounds } = state.builder;
    const { currentProject } = state.projects;
    const { currentPageId } = state.builder;

    if (!currentProject || !currentPageId) {
      throw new Error("No active project or page");
    }

    const currentPage = currentProject.pages.find(
      (page) => page.id === currentPageId
    );
    if (!currentPage) {
      throw new Error("Current page not found");
    }

    // Get all components that intersect with the selection box
    const selectedComponentIds: string[] = [];
    const right = left + width;
    const bottom = top + height;

    for (const [id, bounds] of Object.entries(componentBounds)) {
      // Check for intersection between bounds and selection box
      if (
        bounds.x < right &&
        bounds.x + bounds.width > left &&
        bounds.y < bottom &&
        bounds.y + bounds.height > top
      ) {
        selectedComponentIds.push(id);
      }
    }

    if (selectedComponentIds.length === 0) {
      // If nothing selected, clear selection
      const result = await dispatch(clearSelection());
      return result.payload;
    }

    // Create the multi-selection
    const componentSelections: ComponentSelection[] = selectedComponentIds.map(
      (id) => {
        const component = findComponentById(currentPage.components, id);
        if (!component) {
          throw new Error(`Component with ID ${id} not found`);
        }

        return {
          id,
          type: component.type,
          parentId: component.parentId,
        };
      }
    );

    const newSelection: SelectionState = {
      selectedComponents: componentSelections,
      lastSelectedId: componentSelections[0].id,
      // Use the first component's path
      selectionPath: getComponentPath(
        currentPage.components,
        componentSelections[0].id
      ),
    };

    // Record in history
    historyManager.addAction({
      projectId: currentProject.id,
      type: "SELECTION_CHANGE",
      data: {
        previousSelection: state.builder.selection,
        newSelection,
      },
    });

    return newSelection;
  }
);

/**
 * Selects components by type throughout the page
 */
export const selectComponentsByType = createAsyncThunk(
  "builder/selectComponentsByType",
  async (componentType: string, { getState }) => {
    const state = getState() as RootState;
    const { currentProject } = state.projects;
    const { currentPageId } = state.builder;

    if (!currentProject || !currentPageId) {
      throw new Error("No active project or page");
    }

    const currentPage = currentProject.pages.find(
      (page) => page.id === currentPageId
    );
    if (!currentPage) {
      throw new Error("Current page not found");
    }

    // Find all components of the specified type
    const componentsOfType: ComponentSelection[] = [];

    const findComponentsByType = (components: any[]): void => {
      for (const comp of components) {
        if (comp.type === componentType) {
          componentsOfType.push({
            id: comp.id,
            type: comp.type,
            parentId: comp.parentId,
          });
        }

        // Check children recursively
        if (comp.children && comp.children.length > 0) {
          findComponentsByType(comp.children);
        }
      }
    };

    findComponentsByType(currentPage.components);

    if (componentsOfType.length === 0) {
      // No components of this type found
      return null;
    }

    const newSelection: SelectionState = {
      selectedComponents: componentsOfType,
      lastSelectedId: componentsOfType[0].id,
      selectionPath: getComponentPath(
        currentPage.components,
        componentsOfType[0].id
      ),
    };

    // Record in history
    historyManager.addAction({
      projectId: currentProject.id,
      type: "SELECTION_CHANGE",
      data: {
        previousSelection: state.builder.selection,
        newSelection,
      },
    });

    return newSelection;
  }
);

/**
 * Selects components by a CSS selector
 */
export const selectComponentsBySelector = createAsyncThunk(
  "builder/selectComponentsBySelector",
  async (selector: string, { getState }) => {
    const state = getState() as RootState;
    const { currentProject } = state.projects;
    const { currentPageId } = state.builder;

    if (!currentProject || !currentPageId) {
      throw new Error("No active project or page");
    }

    // This would typically be implemented using the DOM API
    // For this implementation, we'll simulate finding components that match common selectors

    // Example implementation for class selectors
    if (selector.startsWith(".")) {
      const className = selector.substring(1);
      // Logic to find components with the specified class
      // This would need to be implemented based on how you store component classes
    }

    // Example implementation for ID selectors
    if (selector.startsWith("#")) {
      const id = selector.substring(1);
      // Logic to find component with the specified ID
    }

    // For this implementation, we'll return null to indicate no components matched
    return null;
  }
);

/**
 * Selects next component in the DOM tree (used for keyboard navigation)
 */
export const selectNextComponent = createAsyncThunk(
  "builder/selectNextComponent",
  async (_, { getState, dispatch }) => {
    const state = getState() as RootState;
    const { builder, projects } = state;
    const { currentProject } = projects;
    const { currentPageId, selection } = builder;

    if (!currentProject || !currentPageId || !selection) {
      return selection;
    }

    const currentPage = currentProject.pages.find(
      (page) => page.id === currentPageId
    );
    if (!currentPage) {
      return selection;
    }

    // Flatten the component tree to get an array of all components
    const allComponents: {
      id: string;
      type: string;
      parentId: string | null;
    }[] = [];

    const flattenComponents = (
      components: any[],
      parentId: string | null = null
    ): void => {
      for (const comp of components) {
        allComponents.push({
          id: comp.id,
          type: comp.type,
          parentId,
        });

        if (comp.children && comp.children.length > 0) {
          flattenComponents(comp.children, comp.id);
        }
      }
    };

    flattenComponents(currentPage.components);

    if (allComponents.length === 0) {
      return selection;
    }

    // Find the index of the last selected component
    const currentIndex = allComponents.findIndex(
      (comp) => comp.id === selection.lastSelectedId
    );

    if (currentIndex === -1) {
      // If not found, select the first component
      const result = await dispatch(selectComponent(allComponents[0].id));
      return result.payload;
    }

    // Select the next component (or loop back to the first)
    const nextIndex = (currentIndex + 1) % allComponents.length;
    const result = await dispatch(selectComponent(allComponents[nextIndex].id));
    return result.payload;
  }
);

/**
 * Selects previous component in the DOM tree (used for keyboard navigation)
 */
export const selectPreviousComponent = createAsyncThunk(
  "builder/selectPreviousComponent",
  async (_, { getState, dispatch }) => {
    const state = getState() as RootState;
    const { builder, projects } = state;
    const { currentProject } = projects;
    const { currentPageId, selection } = builder;

    if (!currentProject || !currentPageId || !selection) {
      return selection;
    }

    const currentPage = currentProject.pages.find(
      (page) => page.id === currentPageId
    );
    if (!currentPage) {
      return selection;
    }

    // Flatten the component tree to get an array of all components
    const allComponents: {
      id: string;
      type: string;
      parentId: string | null;
    }[] = [];

    const flattenComponents = (
      components: any[],
      parentId: string | null = null
    ): void => {
      for (const comp of components) {
        allComponents.push({
          id: comp.id,
          type: comp.type,
          parentId,
        });

        if (comp.children && comp.children.length > 0) {
          flattenComponents(comp.children, comp.id);
        }
      }
    };

    flattenComponents(currentPage.components);

    if (allComponents.length === 0) {
      return selection;
    }

    // Find the index of the last selected component
    const currentIndex = allComponents.findIndex(
      (comp) => comp.id === selection.lastSelectedId
    );

    if (currentIndex === -1) {
      // If not found, select the last component
      const result = await dispatch(
        selectComponent(allComponents[allComponents.length - 1].id)
      );
      return result.payload;
    }

    // Select the previous component (or loop back to the last)
    const prevIndex =
      (currentIndex - 1 + allComponents.length) % allComponents.length;
    const result = await dispatch(selectComponent(allComponents[prevIndex].id));
    return result.payload;
  }
);
