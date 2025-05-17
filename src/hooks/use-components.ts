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
import { generateComponentId } from "../utils/component";
import { useEditorState } from "./use-editor-state";
import { useComponentFocus } from "./use-component-focus";

/**
 * Custom hook for managing components in the builder
 */
export const useComponents = () => {
  const dispatch = useDispatch();
  const components = useSelector(selectAllComponents);
  const rootComponents = useSelector(selectRootComponents);
  const { isEditing } = useEditorState();
  const { setFocus } = useComponentFocus();

  /**
   * Get a component by its ID
   * @param id - The component ID
   */
  const getComponent = useCallback((id: string) => {
    return useSelector((state) => selectComponentById(state, id));
  }, []);

  /**
   * Get children of a component
   * @param parentId - The parent component ID
   */
  const getComponentChildren = useCallback((parentId: string) => {
    return useSelector((state) => selectComponentChildren(state, parentId));
  }, []);

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

      const id = generateComponentId(componentType);
      const newComponent: Component = {
        id,
        type: componentType,
        props: initialProps || {},
        styles: {},
        parentId: parentId || null,
        children: [],
      };

      dispatch(addComponent({ component: newComponent, index }));
      setFocus(id);
      return id;
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
          updates: { props },
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
          updates: { styles },
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

      const newId = dispatch(duplicateComponent(id));
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
          componentId: id,
          newParentId,
          index,
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
    // Container components that can accept children
    const containerTypes: ComponentType[] = [
      "section",
      "container",
      "grid",
      "column",
      "form",
    ];

    return containerTypes.includes(componentType);
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
