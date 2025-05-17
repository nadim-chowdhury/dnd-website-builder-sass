import { Component, ComponentType, ComponentProps } from "@/types/components";
import { serializeStyles, deserializeStyles } from "./style-serializer";
import { componentRegistry } from "../engine/component-registry";
import { validateComponent } from "../validators/component-validator";

/**
 * Component serialization format
 * This is the format used for saving and loading components
 */
export interface SerializedComponent {
  id: string;
  type: string;
  name: string;
  props: Record<string, any>;
  styles: Record<string, any>;
  children: SerializedComponent[];
  parentId: string | null;
  order: number;
  isHidden: boolean;
  metadata: Record<string, any>;
}

/**
 * Serializes a component to a plain JSON object
 *
 * @param component The component to serialize
 * @returns Serialized component representation
 */
export function serializeComponent(component: Component): SerializedComponent {
  // Start with basic properties
  const serialized: SerializedComponent = {
    id: component.id,
    type: component.type,
    name: component.name,
    props: { ...component.props },
    styles: serializeStyles(component.styles),
    children: [],
    parentId: component.parentId,
    order: component.order,
    isHidden: component.isHidden ?? false,
    metadata: { ...component.metadata },
  };

  // Process children recursively
  if (Array.isArray(component.children) && component.children.length > 0) {
    serialized.children = component.children.map((child) =>
      serializeComponent(child)
    );
  }

  // Handle special props that might need serialization
  if (component.props) {
    for (const [key, value] of Object.entries(component.props)) {
      // Handle functions by serializing them as special strings
      if (typeof value === "function") {
        serialized.props[key] = `__FUNCTION__:${value.toString()}`;
      }

      // Handle Date objects
      else if (value instanceof Date) {
        serialized.props[key] = `__DATE__:${value.toISOString()}`;
      }

      // Handle certain complex objects that might need special handling
      else if (value && typeof value === "object" && !Array.isArray(value)) {
        // Deep clone to prevent reference issues
        serialized.props[key] = JSON.parse(JSON.stringify(value));
      }
    }
  }

  return serialized;
}

/**
 * Deserializes a component from a plain JSON object
 *
 * @param serialized The serialized component data
 * @returns Deserialized component
 */
export function deserializeComponent(
  serialized: SerializedComponent
): Component {
  // Check if the component type exists in the registry
  const componentDefinition = componentRegistry.getComponentDefinition(
    serialized.type
  );
  if (!componentDefinition) {
    console.warn(
      `Component type "${serialized.type}" not found in registry. Using fallback.`
    );
    // Return a placeholder component instead of throwing an error
    return createPlaceholderComponent(serialized);
  }

  // Process props for special serialized values
  const props: ComponentProps = {};
  for (const [key, value] of Object.entries(serialized.props || {})) {
    if (typeof value === "string" && value.startsWith("__FUNCTION__:")) {
      // Warning: This is potentially unsafe - in a production environment,
      // you might want to have predefined functions instead of eval
      try {
        const functionBody = value.substring("__FUNCTION__:".length);
        props[key] = new Function(`return ${functionBody}`)();
      } catch (error) {
        console.error(`Failed to deserialize function prop "${key}":`, error);
        props[key] = () => {}; // Fallback to empty function
      }
    } else if (typeof value === "string" && value.startsWith("__DATE__:")) {
      try {
        const dateString = value.substring("__DATE__:".length);
        props[key] = new Date(dateString);
      } catch (error) {
        console.error(`Failed to deserialize date prop "${key}":`, error);
        props[key] = new Date(); // Fallback to current date
      }
    } else {
      props[key] = value;
    }
  }

  // Create the base component
  const component: Component = {
    id: serialized.id,
    type: serialized.type as ComponentType,
    name: serialized.name,
    props: props,
    styles: deserializeStyles(serialized.styles),
    children: [],
    parentId: serialized.parentId,
    order: serialized.order,
    isHidden: serialized.isHidden ?? false,
    metadata: serialized.metadata || {},
  };

  // Recursively deserialize children
  if (Array.isArray(serialized.children) && serialized.children.length > 0) {
    component.children = serialized.children.map((child) =>
      deserializeComponent(child)
    );
  }

  // Validate the deserialized component
  const validationResult = validateComponent(component);
  if (!validationResult.valid) {
    console.warn(`Component validation issues:`, validationResult.issues);
    // Still return the component, but with issues logged
  }

  return component;
}

/**
 * Creates a placeholder component when the original type is not found
 *
 * @param serialized The serialized data to use as basis
 * @returns A placeholder component
 */
function createPlaceholderComponent(
  serialized: SerializedComponent
): Component {
  return {
    id: serialized.id,
    type: "container" as ComponentType, // Fallback to container type
    name: `Placeholder (${serialized.name || serialized.type})`,
    props: {
      placeholder: true,
      originalType: serialized.type,
      originalProps: serialized.props,
    },
    styles: deserializeStyles(serialized.styles),
    children: [], // Don't try to deserialize children
    parentId: serialized.parentId,
    order: serialized.order,
    isHidden: serialized.isHidden ?? false,
    metadata: {
      ...(serialized.metadata || {}),
      isPlaceholder: true,
      originalType: serialized.type,
    },
  };
}

/**
 * Recursively checks if a component tree contains any placeholder components
 *
 * @param component The component to check
 * @returns True if the component or any of its children is a placeholder
 */
export function hasPlaceholderComponents(component: Component): boolean {
  if (component.metadata?.isPlaceholder) {
    return true;
  }

  if (Array.isArray(component.children) && component.children.length > 0) {
    return component.children.some((child) => hasPlaceholderComponents(child));
  }

  return false;
}

/**
 * Clones a component and all its children
 *
 * @param component The component to clone
 * @param newParentId Optional new parent ID for the cloned component
 * @returns A new component instance with new IDs
 */
export function cloneComponent(
  component: Component,
  newParentId?: string
): Component {
  // Generate a new ID for the cloned component
  const newId = `component_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;

  // Clone the component
  const cloned: Component = {
    ...component,
    id: newId,
    parentId: newParentId ?? component.parentId,
    props: { ...component.props },
    styles: { ...component.styles },
    metadata: { ...component.metadata, clonedFrom: component.id },
    children: [],
  };

  // Clone children recursively
  if (Array.isArray(component.children) && component.children.length > 0) {
    cloned.children = component.children.map((child) =>
      cloneComponent(child, newId)
    );
  }

  return cloned;
}

/**
 * Extracts a subtree of components starting from a root component
 *
 * @param components Array of all components
 * @param rootId ID of the root component to extract
 * @returns Object containing the extracted component subtree
 */
export function extractComponentSubtree(
  components: Component[],
  rootId: string
): { rootComponent: Component | null; subtree: Component[] } {
  const rootComponent = components.find((c) => c.id === rootId);
  if (!rootComponent) {
    return { rootComponent: null, subtree: [] };
  }

  // Function to collect all child component IDs recursively
  function collectChildIds(component: Component): string[] {
    const childIds: string[] = [component.id];
    if (Array.isArray(component.children) && component.children.length > 0) {
      component.children.forEach((child) => {
        childIds.push(...collectChildIds(child));
      });
    }
    return childIds;
  }

  const subtreeIds = collectChildIds(rootComponent);
  const subtree = components.filter((c) => subtreeIds.includes(c.id));

  return { rootComponent, subtree };
}
