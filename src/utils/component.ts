import { v4 as uuidv4 } from "uuid";
import { Component, ComponentType } from "@/types/components";

/**
 * Create a new component with default properties
 */
export const createComponent = (
  type: ComponentType,
  parentId?: string,
  initialProps: Record<string, any> = {}
): Component => {
  const id = uuidv4();

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
 */
export const cloneComponent = (
  component: Component,
  newParentId?: string
): Component => {
  const clonedId = uuidv4();

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
 * Find component by ID in a component tree
 */
export const findComponentById = (
  rootComponents: Record<string, Component>,
  id: string
): Component | null => {
  return rootComponents[id] || null;
};

/**
 * Find component and its ancestors by ID
 */
export const findComponentPathById = (
  rootComponents: Record<string, Component>,
  id: string
): Component[] => {
  const path: Component[] = [];
  let currentId = id;

  while (currentId) {
    const component = rootComponents[currentId];
    if (!component) break;

    path.unshift(component);
    currentId = component.parentId || "";
  }

  return path;
};

/**
 * Check if a component can accept children
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
 */
export const isDraggable = (type: ComponentType): boolean => {
  const nonDraggableTypes: ComponentType[] = [
    // Add any component types that shouldn't be draggable
  ];

  return !nonDraggableTypes.includes(type);
};

/**
 * Check if child can be added to parent
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
