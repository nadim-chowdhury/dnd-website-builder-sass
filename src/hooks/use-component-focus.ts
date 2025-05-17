import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectFocusedComponentId,
  selectSelectedComponents,
} from "../redux/selectors/builder-selectors";
import {
  setFocusedComponent,
  clearFocusedComponent,
  addSelectedComponent,
  removeSelectedComponent,
  clearSelectedComponents,
} from "../redux/slices/builderSlice";
import { useEditorState } from "./use-editor-state";

/**
 * Custom hook to manage component focus and selection in the editor
 */
export const useComponentFocus = () => {
  const dispatch = useDispatch();
  const focusedComponentId = useSelector(selectFocusedComponentId);
  const selectedComponents = useSelector(selectSelectedComponents);
  const { isEditing } = useEditorState();

  /**
   * Sets focus to a specific component
   * @param componentId - The ID of the component to focus
   * @param multiSelect - Whether to allow multiple selection with Shift key
   */
  const setFocus = useCallback(
    (componentId: string, multiSelect: boolean = false) => {
      if (!isEditing) return;

      dispatch(setFocusedComponent(componentId));

      if (multiSelect) {
        // Add to selection if not already selected
        if (!selectedComponents.includes(componentId)) {
          dispatch(addSelectedComponent(componentId));
        } else {
          dispatch(removeSelectedComponent(componentId));
        }
      } else {
        // Replace selection with just this component
        dispatch(clearSelectedComponents());
        dispatch(addSelectedComponent(componentId));
      }
    },
    [dispatch, selectedComponents, isEditing]
  );

  /**
   * Clears the current focus and selection
   */
  const clearFocus = useCallback(() => {
    dispatch(clearFocusedComponent());
    dispatch(clearSelectedComponents());
  }, [dispatch]);

  /**
   * Toggles selection of a component
   * @param componentId - The ID of the component to toggle selection
   */
  const toggleSelection = useCallback(
    (componentId: string) => {
      if (!isEditing) return;

      if (selectedComponents.includes(componentId)) {
        dispatch(removeSelectedComponent(componentId));
      } else {
        dispatch(addSelectedComponent(componentId));
        dispatch(setFocusedComponent(componentId));
      }
    },
    [dispatch, selectedComponents, isEditing]
  );

  /**
   * Selects multiple components
   * @param componentIds - Array of component IDs to select
   */
  const selectMultipleComponents = useCallback(
    (componentIds: string[]) => {
      if (!isEditing) return;

      dispatch(clearSelectedComponents());
      componentIds.forEach((id) => {
        dispatch(addSelectedComponent(id));
      });

      // Focus the last component in the selection
      if (componentIds.length > 0) {
        dispatch(setFocusedComponent(componentIds[componentIds.length - 1]));
      }
    },
    [dispatch, isEditing]
  );

  // Handle keyboard events for focus management
  useEffect(() => {
    if (!isEditing) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      // Handle Escape key to clear selection
      if (e.key === "Escape") {
        clearFocus();
      }

      // Handle deletion of selected components
      if (
        (e.key === "Delete" || e.key === "Backspace") &&
        selectedComponents.length > 0
      ) {
        // This would be handled by a separate hook or action
        // that listens for selected components
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [clearFocus, selectedComponents, isEditing]);

  return {
    focusedComponentId,
    selectedComponents,
    setFocus,
    clearFocus,
    toggleSelection,
    selectMultipleComponents,
    isMultipleSelection: selectedComponents.length > 1,
  };
};

export default useComponentFocus;
