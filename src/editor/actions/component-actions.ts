import { createAction } from "@reduxjs/toolkit";
import {
  ComponentType,
  Component,
  ComponentId,
  ComponentProps,
} from "../../types/components";
import { historyManager } from "../history/history-manager";

// Action Types
export const ADD_COMPONENT = "editor/component/add";
export const REMOVE_COMPONENT = "editor/component/remove";
export const UPDATE_COMPONENT = "editor/component/update";
export const DUPLICATE_COMPONENT = "editor/component/duplicate";
export const MOVE_COMPONENT = "editor/component/move";
export const REPARENT_COMPONENT = "editor/component/reparent";
export const REORDER_COMPONENT = "editor/component/reorder";
export const RESET_COMPONENTS = "editor/component/reset";

// Action Creators
export const addComponent = createAction<{
  component: Component;
  parentId?: ComponentId;
  index?: number;
}>(ADD_COMPONENT);

export const removeComponent = createAction<{
  componentId: ComponentId;
}>(REMOVE_COMPONENT);

export const updateComponent = createAction<{
  componentId: ComponentId;
  props: Partial<ComponentProps>;
}>(UPDATE_COMPONENT);

export const duplicateComponent = createAction<{
  componentId: ComponentId;
  newId?: ComponentId;
}>(DUPLICATE_COMPONENT);

export const moveComponent = createAction<{
  componentId: ComponentId;
  x: number;
  y: number;
}>(MOVE_COMPONENT);

export const reparentComponent = createAction<{
  componentId: ComponentId;
  newParentId: ComponentId;
  index?: number;
}>(REPARENT_COMPONENT);

export const reorderComponent = createAction<{
  componentId: ComponentId;
  newIndex: number;
  parentId?: ComponentId;
}>(REORDER_COMPONENT);

export const resetComponents = createAction<{
  components: Component[];
}>(RESET_COMPONENTS);

// Thunk Actions
export const addComponentWithHistory = (
  component: Component,
  parentId?: ComponentId,
  index?: number
) => {
  return (dispatch: any) => {
    historyManager.startTransaction();
    dispatch(addComponent({ component, parentId, index }));
    historyManager.commitTransaction("Add component");
    return component.id;
  };
};

export const removeComponentWithHistory = (componentId: ComponentId) => {
  return (dispatch: any) => {
    historyManager.startTransaction();
    dispatch(removeComponent({ componentId }));
    historyManager.commitTransaction("Remove component");
  };
};

export const updateComponentWithHistory = (
  componentId: ComponentId,
  props: Partial<ComponentProps>
) => {
  return (dispatch: any) => {
    historyManager.startTransaction();
    dispatch(updateComponent({ componentId, props }));
    historyManager.commitTransaction("Update component");
  };
};

export const duplicateComponentWithHistory = (
  componentId: ComponentId,
  newId?: ComponentId
) => {
  return (dispatch: any) => {
    historyManager.startTransaction();
    dispatch(duplicateComponent({ componentId, newId }));
    historyManager.commitTransaction("Duplicate component");
  };
};

export const moveComponentWithHistory = (
  componentId: ComponentId,
  x: number,
  y: number
) => {
  return (dispatch: any) => {
    historyManager.startTransaction();
    dispatch(moveComponent({ componentId, x, y }));
    historyManager.commitTransaction("Move component");
  };
};

export const reparentComponentWithHistory = (
  componentId: ComponentId,
  newParentId: ComponentId,
  index?: number
) => {
  return (dispatch: any) => {
    historyManager.startTransaction();
    dispatch(reparentComponent({ componentId, newParentId, index }));
    historyManager.commitTransaction("Reparent component");
  };
};

export const reorderComponentWithHistory = (
  componentId: ComponentId,
  newIndex: number,
  parentId?: ComponentId
) => {
  return (dispatch: any) => {
    historyManager.startTransaction();
    dispatch(reorderComponent({ componentId, newIndex, parentId }));
    historyManager.commitTransaction("Reorder component");
  };
};

// Helper Actions
export const createEmptyComponent = (
  type: ComponentType,
  props: Partial<ComponentProps> = {},
  id?: ComponentId
): Component => {
  const newId =
    id || `component-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

  return {
    id: newId,
    type,
    props: {
      ...getDefaultPropsForType(type),
      ...props,
    },
    children: [],
    styles: {},
  };
};

const getDefaultPropsForType = (
  type: ComponentType
): Partial<ComponentProps> => {
  switch (type) {
    case "heading":
      return { text: "New Heading", level: "h1" };
    case "text":
      return { content: "New Text Component" };
    case "button":
      return { label: "Button", variant: "primary" };
    case "image":
      return { src: "/placeholder.jpg", alt: "Image description" };
    case "container":
      return { direction: "column" };
    case "section":
      return { background: "transparent" };
    case "grid":
      return { columns: 3, gap: 16 };
    case "form":
      return { action: "", method: "post" };
    case "input":
      return { type: "text", placeholder: "Enter text..." };
    default:
      return {};
  }
};
