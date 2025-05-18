import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectSelectedComponentId } from "../redux/selectors/builder-selectors";
import { useEditorState } from "./use-editor-state";
import { selectComponent } from "../redux/slices/builderSlice";

/**
 * Custom hook to manage component focus and selection in the editor
 */
export const useComponentFocus = () => {
  const dispatch = useDispatch();
  const selectedComponentId = useSelector(selectSelectedComponentId);
  const [selectedComponents, setSelectedComponents] = useState<string[]>([]);
  const { isEditing } = useEditorState();

  // Update the selectedComponents array when the selectedComponentId changes
  useEffect(() => {
    if (
      selectedComponentId &&
      !selectedComponents.includes(selectedComponentId)
    ) {
      setSelectedComponents([selectedComponentId]);
    } else if (!selectedComponentId && selectedComponents.length > 0) {
      // Clear selected components when selectedComponentId becomes null
      setSelectedComponents([]);
    }
  }, [selectedComponentId, selectedComponents]);

  /**
   * Sets focus to a specific component
   * @param componentId - The ID of the component to focus
   * @param multiSelect - Whether to allow multiple selection with Shift key
   */
  const setFocus = useCallback(
    (componentId: string, multiSelect: boolean = false) => {
      if (!isEditing) return;

      // Use the imported action creator instead of raw action object
      dispatch(selectComponent(componentId));

      if (multiSelect) {
        // Add to selection if not already selected
        if (!selectedComponents.includes(componentId)) {
          setSelectedComponents([...selectedComponents, componentId]);
        } else {
          setSelectedComponents(
            selectedComponents.filter((id) => id !== componentId)
          );
        }
      } else {
        // Replace selection with just this component
        setSelectedComponents([componentId]);
      }
    },
    [dispatch, selectedComponents, isEditing]
  );

  /**
   * Clears the current focus and selection
   */
  const clearFocus = useCallback(() => {
    dispatch(selectComponent(null));
    setSelectedComponents([]);
  }, [dispatch]);

  /**
   * Toggles selection of a component
   * @param componentId - The ID of the component to toggle selection
   */
  const toggleSelection = useCallback(
    (componentId: string) => {
      if (!isEditing) return;

      if (selectedComponents.includes(componentId)) {
        const updatedSelection = selectedComponents.filter(
          (id) => id !== componentId
        );
        setSelectedComponents(updatedSelection);

        // If we're removing the currently focused component, either focus another one or clear focus
        if (componentId === selectedComponentId) {
          if (updatedSelection.length > 0) {
            dispatch(selectComponent(updatedSelection[0]));
          } else {
            dispatch(selectComponent(null));
          }
        }
      } else {
        setSelectedComponents([...selectedComponents, componentId]);
        dispatch(selectComponent(componentId));
      }
    },
    [dispatch, selectedComponents, selectedComponentId, isEditing]
  );

  /**
   * Selects multiple components
   * @param componentIds - Array of component IDs to select
   */
  const selectMultipleComponents = useCallback(
    (componentIds: string[]) => {
      if (!isEditing) return;

      setSelectedComponents(componentIds);

      // Focus the last component in the selection
      if (componentIds.length > 0) {
        dispatch(selectComponent(componentIds[componentIds.length - 1]));
      } else {
        dispatch(selectComponent(null));
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
        selectedComponents.length > 0 &&
        document.activeElement?.tagName !== "INPUT" &&
        document.activeElement?.tagName !== "TEXTAREA"
      ) {
        // This would be handled by a separate hook or action
        // that listens for selected components
        // Added check to prevent deletion when typing in form fields
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [clearFocus, selectedComponents, isEditing]);

  return {
    focusedComponentId: selectedComponentId,
    selectedComponents,
    setFocus,
    clearFocus,
    toggleSelection,
    selectMultipleComponents,
    isMultipleSelection: selectedComponents.length > 1,
  };
};

export default useComponentFocus;
