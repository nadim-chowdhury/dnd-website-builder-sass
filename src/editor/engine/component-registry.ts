import { ComponentType } from "react";
import {
  BuilderComponent,
  ComponentCategory,
  ComponentMeta,
} from "@/types/components";

/**
 * The ComponentRegistry manages all available components in the builder.
 * It handles registration, retrieval, and categorization of components.
 */
class ComponentRegistry {
  private components: Map<string, BuilderComponent> = new Map();
  private categories: Map<string, ComponentCategory> = new Map();

  /**
   * Register a new component in the registry
   * @param id Unique identifier for the component
   * @param component React component to register
   * @param meta Metadata for the component
   */
  registerComponent(
    id: string,
    component: ComponentType<any>,
    meta: ComponentMeta
  ): void {
    if (this.components.has(id)) {
      console.warn(
        `Component with ID "${id}" is already registered. Overwriting...`
      );
    }

    this.components.set(id, {
      id,
      component,
      meta,
    });

    // Ensure category exists
    if (!this.categories.has(meta.category)) {
      this.categories.set(meta.category, {
        id: meta.category,
        name: meta.category.charAt(0).toUpperCase() + meta.category.slice(1),
        components: [],
      });
    }

    // Add component to its category
    const category = this.categories.get(meta.category);
    if (category && !category.components.includes(id)) {
      category.components.push(id);
    }
  }

  /**
   * Get a component by its ID
   * @param id Component ID
   * @returns The component or undefined if not found
   */
  getComponent(id: string): BuilderComponent | undefined {
    return this.components.get(id);
  }

  /**
   * Get all registered components
   * @returns Array of all registered components
   */
  getAllComponents(): BuilderComponent[] {
    return Array.from(this.components.values());
  }

  /**
   * Get all registered categories
   * @returns Array of all component categories
   */
  getAllCategories(): ComponentCategory[] {
    return Array.from(this.categories.values());
  }

  /**
   * Get components by category
   * @param categoryId Category identifier
   * @returns Array of components in the specified category
   */
  getComponentsByCategory(categoryId: string): BuilderComponent[] {
    const category = this.categories.get(categoryId);
    if (!category) return [];

    return category.components
      .map((id) => this.components.get(id))
      .filter((component): component is BuilderComponent => !!component);
  }

  /**
   * Search for components by name or description
   * @param query Search query string
   * @returns Array of matching components
   */
  searchComponents(query: string): BuilderComponent[] {
    const lowerQuery = query.toLowerCase();

    return this.getAllComponents().filter((component) => {
      const { name, description } = component.meta;
      return (
        name.toLowerCase().includes(lowerQuery) ||
        (description && description.toLowerCase().includes(lowerQuery))
      );
    });
  }

  /**
   * Check if a component exists in the registry
   * @param id Component ID
   * @returns Boolean indicating if component exists
   */
  hasComponent(id: string): boolean {
    return this.components.has(id);
  }

  /**
   * Remove a component from the registry
   * @param id Component ID to remove
   * @returns Boolean indicating if removal was successful
   */
  unregisterComponent(id: string): boolean {
    const component = this.components.get(id);
    if (!component) return false;

    // Remove from category
    const category = this.categories.get(component.meta.category);
    if (category) {
      const index = category.components.indexOf(id);
      if (index !== -1) {
        category.components.splice(index, 1);
      }
    }

    // Remove from components map
    return this.components.delete(id);
  }
}

// Create singleton instance
const componentRegistry = new ComponentRegistry();

export default componentRegistry;
