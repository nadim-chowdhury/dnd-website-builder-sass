// src/lib/component-registry.ts

import { createElement } from "react";
import { LucideIcon } from "lucide-react";
import Button from "@/components/editor/components/Button";
import Container from "@/components/editor/components/Container";

// Component category types
export type ComponentCategory =
  | "layout"
  | "typography"
  | "forms"
  | "navigation"
  | "media"
  | "data"
  | "widgets"
  | "custom";

// Component definition interface
export interface ComponentDefinition {
  id: string;
  type: string;
  name: string;
  description?: string;
  category: ComponentCategory;
  component: any; // The actual React component
  icon?: LucideIcon;
  defaultProps?: Record<string, any>;
  allowChildren?: boolean;
  childTypes?: string[]; // Types of components this can contain
  parentTypes?: string[]; // Types of components this can be placed inside
  hasCustomRender?: boolean;
  builtIn?: boolean;
}

// The complete registry of components
const ComponentRegistry: Record<string, ComponentDefinition> = {
  Button: {
    id: "button",
    type: "Button",
    name: "Button",
    description: "A clickable button element with various styles",
    category: "forms",
    component: Button,
    defaultProps: {
      content: "Button",
      variant: "primary",
      size: "md",
    },
    allowChildren: false,
  },
  Container: {
    id: "container",
    type: "Container",
    name: "Container",
    description: "A container element with customizable width and padding",
    category: "layout",
    component: Container,
    defaultProps: {
      maxWidth: "lg",
      padding: "1rem",
      centered: true,
    },
    allowChildren: true,
  },
  // Add more components here
};

// Export the default registry
export default ComponentRegistry;

// Helper functions for the registry
export function getComponent(type: string) {
  return ComponentRegistry[type] || null;
}

export function getComponentsByCategory(category: ComponentCategory) {
  return Object.values(ComponentRegistry).filter(
    (component) => component.category === category
  );
}

export function getAllComponents() {
  return Object.values(ComponentRegistry);
}

export function registerComponent(component: ComponentDefinition) {
  ComponentRegistry[component.type] = component;
}
