import { ComponentType } from "react";
import { ComponentConfig } from "@/types/components";

/**
 * Registry of all custom components available in the builder
 *
 * This file serves as a central registry for all custom components that can be
 * added to the builder. Each component must be registered here to be available.
 */

// Type for the component registry
export interface ComponentRegistry {
  [key: string]: {
    component: ComponentType<any>;
    config: ComponentConfig;
  };
}

// Initialize an empty registry
const componentRegistry: ComponentRegistry = {};

/**
 * Register a custom component to make it available in the builder
 *
 * @param id - Unique identifier for the component
 * @param component - The React component to register
 * @param config - Configuration details for the component in the builder
 */
export function registerComponent(
  id: string,
  component: ComponentType<any>,
  config: ComponentConfig
) {
  if (componentRegistry[id]) {
    console.warn(
      `Component with ID '${id}' is already registered. Overwriting.`
    );
  }

  componentRegistry[id] = {
    component,
    config,
  };
}

/**
 * Get a registered component by its ID
 *
 * @param id - The ID of the component to retrieve
 * @returns The registered component or undefined if not found
 */
export function getComponent(id: string) {
  return componentRegistry[id];
}

/**
 * Get all registered components
 *
 * @returns An object containing all registered components
 */
export function getAllComponents() {
  return componentRegistry;
}

/**
 * Check if a component with the given ID is registered
 *
 * @param id - The ID to check
 * @returns Boolean indicating if the component is registered
 */
export function isComponentRegistered(id: string) {
  return !!componentRegistry[id];
}

/**
 * Remove a component from the registry
 *
 * @param id - The ID of the component to remove
 * @returns Boolean indicating if the component was successfully removed
 */
export function unregisterComponent(id: string) {
  if (!componentRegistry[id]) {
    return false;
  }

  delete componentRegistry[id];
  return true;
}

/**
 * Group components by their category
 *
 * @returns An object with components grouped by category
 */
export function getComponentsByCategory() {
  const categories: Record<string, typeof componentRegistry> = {};

  Object.entries(componentRegistry).forEach(([id, { component, config }]) => {
    const category = config.category || "Uncategorized";

    if (!categories[category]) {
      categories[category] = {};
    }

    categories[category][id] = { component, config };
  });

  return categories;
}

export default {
  registerComponent,
  getComponent,
  getAllComponents,
  isComponentRegistered,
  unregisterComponent,
  getComponentsByCategory,
};
