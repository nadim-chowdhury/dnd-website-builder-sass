import { v4 as uuidv4 } from "uuid";
import type { Component, ComponentType } from "../types/components";

/**
 * Generate a unique component ID
 * @param type - The component type
 * @returns A unique ID for the component
 */
export const generateComponentId = (type: ComponentType): string => {
  return `${type}-${uuidv4().substring(0, 8)}`;
};

/**
 * Create a new component with default properties
 * @param type - The component type
 * @param parentId - Optional parent component ID
 * @param initialProps - Optional initial properties
 * @returns A new component object
 */
export const createComponent = (
  type: ComponentType,
  parentId?: string,
  initialProps: Record<string, any> = {}
): Component => {
  const id = generateComponentId(type);
  const defaultProps = getDefaultPropsForType(type);

  return {
    id,
    type,
    parentId: parentId || null,
    children: [],
    props: {
      ...defaultProps,
      ...initialProps,
    },
    styles: {
      desktop: {},
      tablet: {},
      mobile: {},
    },
    events: [],
    metadata: {
      label: getLabelForType(type),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  };
};

/**
 * Get default props based on component type
 * @param type - The component type
 * @returns Default properties for the component type
 */
export const getDefaultPropsForType = (
  type: ComponentType
): Record<string, any> => {
  switch (type) {
    case "container":
      return {
        direction: "column",
        width: "100%",
      };
    case "section":
      return {
        height: "auto",
        fullWidth: true,
      };
    case "column":
      return {
        width: "100%",
      };
    case "grid":
      return {
        columns: 2,
        gap: 16,
      };
    case "text":
      return {
        content: "Text content",
        tag: "p",
      };
    case "heading":
      return {
        content: "Heading",
        level: "h2",
      };
    case "image":
      return {
        src: "/placeholder.jpg",
        alt: "Image",
        width: 400,
        height: 300,
      };
    case "button":
      return {
        text: "Click me",
        variant: "primary",
        size: "medium",
      };
    case "form":
      return {
        action: "",
        method: "post",
        submitLabel: "Submit",
      };
    case "input":
      return {
        type: "text",
        placeholder: "Enter text",
        label: "Input field",
        required: false,
      };
    case "textarea":
      return {
        placeholder: "Enter text",
        label: "Text area",
        rows: 4,
        required: false,
      };
    case "checkbox":
      return {
        label: "Checkbox",
        checked: false,
        required: false,
      };
    case "radio":
      return {
        options: [
          { label: "Option 1", value: "option1" },
          { label: "Option 2", value: "option2" },
        ],
        name: "radiogroup",
        required: false,
      };
    case "select":
      return {
        options: [
          { label: "Option 1", value: "option1" },
          { label: "Option 2", value: "option2" },
        ],
        placeholder: "Select an option",
        label: "Select field",
        required: false,
      };
    case "spacer":
      return {
        height: 40,
      };
    case "divider":
      return {
        orientation: "horizontal",
        thickness: 1,
      };
    case "icon":
      return {
        name: "star",
        size: 24,
        color: "#000000",
      };
    case "video":
      return {
        src: "",
        autoplay: false,
        controls: true,
        muted: false,
        loop: false,
      };
    default:
      return {};
  }
};

/**
 * Get readable label for component type
 * @param type - The component type
 * @returns A formatted label for the component type
 */
export const getLabelForType = (type: ComponentType): string => {
  // Convert camelCase or kebab-case to Title Case
  const formatted = type
    .replace(/-/g, " ")
    .replace(/([A-Z])/g, " $1")
    .replace(/^\w/, (c) => c.toUpperCase());

  return formatted;
};

/**
 * Clone a component and all its children
 * @param component - The component to clone
 * @param newParentId - Optional new parent ID
 * @returns A cloned component
 */
export const cloneComponent = (
  component: Component,
  newParentId?: string
): Component => {
  const clonedId = generateComponentId(component.type);

  return {
    ...component,
    id: clonedId,
    parentId: newParentId ?? component.parentId,
    children: component.children.slice(),
    metadata: {
      ...component.metadata,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  };
};

/**
 * Deeply clone a component tree
 * @param component - The root component to clone
 * @param components - Object containing all components
 * @param newParentId - Optional new parent ID
 * @returns An object containing all cloned components
 */
export const cloneComponentTree = (
  component: Component,
  components: Record<string, Component>,
  newParentId?: string
): Record<string, Component> => {
  const result: Record<string, Component> = {};

  const cloned = cloneComponent(component, newParentId);
  result[cloned.id] = cloned;

  // Reset children array
  cloned.children = [];

  // Clone each child and update parent reference
  component.children.forEach((childId) => {
    const child = components[childId];
    if (child) {
      const clonedChildren = cloneComponentTree(child, components, cloned.id);
      // Add the first-level cloned child ID to the parent's children array
      const firstLevelChildId = Object.keys(clonedChildren).find(
        (id) => clonedChildren[id].parentId === cloned.id
      );
      if (firstLevelChildId) {
        cloned.children.push(firstLevelChildId);
      }
      // Merge all cloned children into result
      Object.assign(result, clonedChildren);
    }
  });

  return result;
};

/**
 * Check if a component can accept children
 * @param type - The component type to check
 * @returns Whether the component can accept children
 */
export const canAcceptChildren = (type: ComponentType): boolean => {
  const containerTypes: ComponentType[] = [
    "container",
    "section",
    "column",
    "grid",
    "form",
  ];

  return containerTypes.includes(type);
};

/**
 * Check if a component can be dragged
 * @param type - The component type to check
 * @returns Whether the component can be dragged
 */
export const isDraggable = (type: ComponentType): boolean => {
  const nonDraggableTypes: ComponentType[] = [
    // Add any component types that shouldn't be draggable
  ];

  return !nonDraggableTypes.includes(type);
};

/**
 * Check if child can be added to parent
 * @param parentType - The parent component type
 * @param childType - The child component type
 * @returns Whether the child can be added to the parent
 */
export const canAddChild = (
  parentType: ComponentType,
  childType: ComponentType
): boolean => {
  if (!canAcceptChildren(parentType)) return false;

  // Special rules for form
  if (parentType === "form") {
    const formElements: ComponentType[] = [
      "input",
      "textarea",
      "checkbox",
      "radio",
      "select",
      "button",
    ];

    return formElements.includes(childType);
  }

  return true;
};

/**
 * Get all descendants of a component
 * @param componentId - The component ID
 * @param components - Object containing all components
 * @returns Array of component IDs that are descendants
 */
export const getAllDescendants = (
  componentId: string,
  components: Record<string, Component>
): string[] => {
  const component = components[componentId];
  if (!component) return [];

  const descendants: string[] = [...component.children];

  component.children.forEach((childId) => {
    descendants.push(...getAllDescendants(childId, components));
  });

  return descendants;
};

/**
 * Flatten component tree into a list
 * @param rootId - The root component ID
 * @param components - Object containing all components
 * @returns Array of components in the tree
 */
export const flattenComponentTree = (
  rootId: string,
  components: Record<string, Component>
): Component[] => {
  const result: Component[] = [];
  const queue: string[] = [rootId];

  while (queue.length > 0) {
    const currentId = queue.shift()!;
    const component = components[currentId];

    if (component) {
      result.push(component);
      queue.push(...component.children);
    }
  }

  return result;
};

/**
 * Find component by ID in a component tree
 * @param components - Object containing all components
 * @param id - The component ID to find
 * @returns The component or null if not found
 */
export const findComponentById = (
  components: Record<string, Component>,
  id: string
): Component | null => {
  return components[id] || null;
};

/**
 * Find component and its ancestors by ID
 * @param components - Object containing all components
 * @param id - The component ID to find
 * @returns Array of components forming the path from root to the component
 */
export const findComponentPathById = (
  components: Record<string, Component>,
  id: string
): Component[] => {
  const path: Component[] = [];
  let currentId = id;

  while (currentId) {
    const component = components[currentId];
    if (!component) break;

    path.unshift(component);
    currentId = component.parentId || "";
  }

  return path;
};
