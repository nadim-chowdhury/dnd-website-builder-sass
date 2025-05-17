import {
  Template,
  ComponentData,
  TemplateValidationResult,
  ComponentType,
} from "../../types/template";

// Define allowed template categories
const VALID_CATEGORIES = [
  "general",
  "landing-page",
  "blog",
  "portfolio",
  "e-commerce",
  "business",
  "personal",
  "education",
  "nonprofit",
  "custom",
];

// Define allowed component types
const VALID_COMPONENT_TYPES: ComponentType[] = [
  "container",
  "section",
  "grid",
  "column",
  "heading",
  "text",
  "image",
  "video",
  "button",
  "form",
  "input",
  "textarea",
  "select",
  "checkbox",
  "radio",
  "submit-button",
  "spacer",
  "divider",
  "icon",
  "product-list",
  "product-card",
  "product-filter",
  "cart",
  "checkout",
  "navigation",
  "footer",
  "header",
  "logo",
  "custom",
];

/**
 * Validates a template object to ensure it meets all requirements
 * @param template The template to validate
 * @returns Validation result with success status and any errors
 */
export const validateTemplate = (
  template: Template
): TemplateValidationResult => {
  const errors: string[] = [];

  // Check required fields
  if (!template.id) {
    errors.push("Template ID is required");
  }

  if (!template.name) {
    errors.push("Template name is required");
  }

  if (!template.category) {
    errors.push("Template category is required");
  } else if (!VALID_CATEGORIES.includes(template.category)) {
    errors.push(
      `Invalid category: ${template.category}. Must be one of: ${VALID_CATEGORIES.join(", ")}`
    );
  }

  // Check components array
  if (!template.components || !Array.isArray(template.components)) {
    errors.push("Template must include a components array");
  } else {
    // Validate individual components
    for (let i = 0; i < template.components.length; i++) {
      const component = template.components[i];
      const componentErrors = validateComponent(component);

      if (componentErrors.length > 0) {
        errors.push(
          `Component at index ${i} (${component.id || "unknown"}): ${componentErrors.join(", ")}`
        );
      }
    }

    // Check for duplicate component IDs
    const componentIds = template.components.map((c) => c.id);
    const uniqueIds = new Set(componentIds);

    if (uniqueIds.size !== componentIds.length) {
      errors.push("Template contains duplicate component IDs");
    }
  }

  // Check styles object
  if (!template.styles || typeof template.styles !== "object") {
    errors.push("Template must include a styles object");
  } else {
    // Check that all referenced component IDs exist in the components array
    const componentIds = template.components?.map((c) => c.id) || [];

    for (const styleId of Object.keys(template.styles)) {
      if (!componentIds.includes(styleId)) {
        errors.push(
          `Style reference ${styleId} does not match any component ID`
        );
      }
    }
  }

  // Check metadata
  if (!template.metadata) {
    errors.push("Template must include metadata");
  } else {
    if (!template.metadata.createdAt) {
      errors.push("Template metadata must include createdAt timestamp");
    }

    if (!template.metadata.author) {
      errors.push("Template metadata must include author");
    }

    if (!template.metadata.version) {
      errors.push("Template metadata must include version");
    }
  }

  return {
    valid: errors.length === 0,
    errors,
  };
};

/**
 * Validates a single component within a template
 * @param component The component to validate
 * @returns Array of validation errors (empty if valid)
 */
export const validateComponent = (component: ComponentData): string[] => {
  const errors: string[] = [];

  // Check required fields
  if (!component.id) {
    errors.push("Component ID is required");
  }

  if (!component.type) {
    errors.push("Component type is required");
  } else if (!VALID_COMPONENT_TYPES.includes(component.type as ComponentType)) {
    errors.push(`Invalid component type: ${component.type}`);
  }

  // Check children
  if (component.children && !Array.isArray(component.children)) {
    errors.push("Component children must be an array");
  } else if (Array.isArray(component.children)) {
    // Recursively validate children
    for (let i = 0; i < component.children.length; i++) {
      const child = component.children[i];
      const childErrors = validateComponent(child);

      if (childErrors.length > 0) {
        errors.push(
          `Child component at index ${i} (${child.id || "unknown"}): ${childErrors.join(", ")}`
        );
      }
    }
  }

  // Check component properties
  if (component.props && typeof component.props !== "object") {
    errors.push("Component props must be an object");
  }

  // Check component content
  if (component.content && typeof component.content !== "object") {
    errors.push("Component content must be an object");
  }

  return errors;
};

/**
 * Validates a template structure but does not perform deep validation
 * @param template The template to validate
 * @returns Boolean indicating if the template has the correct structure
 */
export const hasValidStructure = (template: any): boolean => {
  return (
    template &&
    typeof template === "object" &&
    typeof template.id === "string" &&
    typeof template.name === "string" &&
    Array.isArray(template.components) &&
    typeof template.styles === "object" &&
    typeof template.metadata === "object"
  );
};

/**
 * Checks if a component tree structure is valid (no circular references)
 * @param components The component array to validate
 * @returns Boolean indicating if the component tree is valid
 */
export const hasValidComponentTree = (components: ComponentData[]): boolean => {
  const componentIds = new Set<string>();
  const usedIds = new Set<string>();

  // First pass: collect all component IDs
  for (const component of components) {
    if (!component.id) return false;
    componentIds.add(component.id);
  }

  // Second pass: check for circular references and duplicate child references
  const checkChildren = (children: ComponentData[]): boolean => {
    for (const child of children) {
      if (usedIds.has(child.id)) {
        // Component already used elsewhere in the tree (circular reference)
        return false;
      }

      usedIds.add(child.id);

      if (child.children && child.children.length > 0) {
        if (!checkChildren(child.children)) {
          return false;
        }
      }
    }

    return true;
  };

  return checkChildren(components);
};

/**
 * Compares two templates and returns if they are compatible
 * @param template1 First template
 * @param template2 Second template
 * @returns Boolean indicating if templates are compatible
 */
export const areTemplatesCompatible = (
  template1: Template,
  template2: Template
): boolean => {
  // Check if templates have the same version
  if (template1.metadata.version !== template2.metadata.version) {
    return false;
  }

  // Check if they have the same component types
  const types1 = new Set(template1.components.map((c) => c.type));
  const types2 = new Set(template2.components.map((c) => c.type));

  // Templates are compatible if they share at least some component types
  const intersection = [...types1].filter((type) => types2.has(type));
  return intersection.length > 0;
};

// Export template validation utilities
export const templateValidator = {
  validate: validateTemplate,
  validateComponent,
  hasValidStructure,
  hasValidComponentTree,
  areTemplatesCompatible,
  VALID_CATEGORIES,
  VALID_COMPONENT_TYPES,
};

export default templateValidator;
