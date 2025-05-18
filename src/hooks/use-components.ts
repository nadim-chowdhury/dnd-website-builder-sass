import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectAllComponents,
  selectComponentById,
  selectComponentChildren,
  selectRootComponents,
} from "../redux/selectors/builder-selectors";
import {
  addComponent,
  updateComponent,
  removeComponent,
  moveComponent,
  duplicateComponent,
} from "../redux/slices/builderSlice";
import type { Component, ComponentType } from "../types/components";
import {
  createComponent,
  canAcceptChildren as checkCanAcceptChildren,
} from "../utils/component";
import { useEditorState } from "./use-editor-state";
import { useComponentFocus } from "./use-component-focus";
import { RootState } from "../redux/store"; // Make sure to import the RootState type

/**
 * Custom hook for managing components in the builder
 */
export const useComponents = () => {
  const dispatch = useDispatch();
  const components = useSelector(selectAllComponents);
  const rootComponents = useSelector(selectRootComponents);
  const { isEditing } = useEditorState();
  const { setFocus } = useComponentFocus();

  // Pre-select the selector functions to use in callbacks
  const componentByIdSelector = useSelector(
    (state: RootState) => (id: string) => selectComponentById(state, id)
  );

  const componentChildrenSelector = useSelector(
    (state: RootState) => (parentId: string) =>
      selectComponentChildren(state, parentId)
  );

  /**
   * Get a component by its ID
   * @param id - The component ID
   */
  const getComponent = useCallback(
    (id: string) => {
      return componentByIdSelector(id);
    },
    [componentByIdSelector]
  );

  /**
   * Get children of a component
   * @param parentId - The parent component ID
   */
  const getComponentChildren = useCallback(
    (parentId: string) => {
      return componentChildrenSelector(parentId);
    },
    [componentChildrenSelector]
  );

  /**
   * Add a new component to the builder
   * @param componentType - The type of component to add
   * @param parentId - Optional parent component ID
   * @param initialProps - Optional initial props for the component
   * @param index - Optional index to insert the component at
   */
  const addNewComponent = useCallback(
    (
      componentType: ComponentType,
      parentId?: string,
      initialProps?: Record<string, any>,
      index?: number
    ) => {
      if (!isEditing) return null;

      const newComponent = createComponent(
        componentType,
        parentId,
        initialProps
      );

      // Ensure the component matches the expected structure in the reducer
      dispatch(addComponent(newComponent));
      setFocus(newComponent.id);
      return newComponent.id;
    },
    [dispatch, setFocus, isEditing]
  );

  /**
   * Update a component's properties
   * @param id - The component ID
   * @param props - The props to update
   */
  const updateComponentProps = useCallback(
    (id: string, props: Record<string, any>) => {
      if (!isEditing) return;

      dispatch(
        updateComponent({
          id,
          changes: { props }, // Changed from 'updates' to 'changes' to match the action type
        })
      );
    },
    [dispatch, isEditing]
  );

  /**
   * Update a component's styles
   * @param id - The component ID
   * @param styles - The styles to update
   */
  const updateComponentStyles = useCallback(
    (id: string, styles: Record<string, any>) => {
      if (!isEditing) return;

      dispatch(
        updateComponent({
          id,
          changes: { styles }, // Changed from 'updates' to 'changes' to match the action type
        })
      );
    },
    [dispatch, isEditing]
  );

  /**
   * Delete a component
   * @param id - The component ID to delete
   */
  const deleteComponent = useCallback(
    (id: string) => {
      if (!isEditing) return;

      dispatch(removeComponent(id));
    },
    [dispatch, isEditing]
  );

  /**
   * Duplicate a component
   * @param id - The component ID to duplicate
   */
  const cloneComponent = useCallback(
    (id: string) => {
      if (!isEditing) return;

      // The duplicateComponent action returns an action object, not the new ID directly
      const action = dispatch(duplicateComponent(id));
      // Extract the new ID from the action's payload
      const newId = action.payload;
      setFocus(newId);
      return newId;
    },
    [dispatch, setFocus, isEditing]
  );

  /**
   * Move a component to a new parent or position
   * @param id - The component ID to move
   * @param newParentId - The new parent component ID
   * @param index - The position index in the new parent's children
   */
  const moveComponentTo = useCallback(
    (id: string, newParentId: string | null, index?: number) => {
      if (!isEditing) return;

      dispatch(
        moveComponent({
          id, // Changed from componentId to id to match the action type
          parentId: newParentId, // Changed from newParentId to parentId to match the action type
          index: index || 0, // Ensure index is not undefined
        })
      );
    },
    [dispatch, isEditing]
  );

  /**
   * Check if a component can accept children
   * @param componentType - The component type to check
   */
  const canAcceptChildren = useCallback((componentType: ComponentType) => {
    return checkCanAcceptChildren(componentType);
  }, []);

  return {
    components,
    rootComponents,
    getComponent,
    getComponentChildren,
    addNewComponent,
    updateComponentProps,
    updateComponentStyles,
    deleteComponent,
    cloneComponent,
    moveComponentTo,
    canAcceptChildren,
  };
};

export default useComponents;
