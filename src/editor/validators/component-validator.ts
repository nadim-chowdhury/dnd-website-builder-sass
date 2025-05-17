import {
  ComponentData,
  ComponentType,
  ComponentValidationResult,
  ComponentValidationOptions,
  ComponentSchema,
} from "../../types/components";

// Define valid component types
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

// Component schemas define the expected structure for each component type
const COMPONENT_SCHEMAS: Record<ComponentType, ComponentSchema> = {
  container: {
    allowsChildren: true,
    requiredProps: [],
    optionalProps: ["width", "height", "background", "padding"],
    contentSchema: {},
  },
  section: {
    allowsChildren: true,
    requiredProps: [],
    optionalProps: ["width", "height", "background", "padding", "fullWidth"],
    contentSchema: {},
  },
  grid: {
    allowsChildren: true,
    requiredProps: ["columns"],
    optionalProps: ["gap", "rowGap", "columnGap", "alignment"],
    contentSchema: {},
  },
  column: {
    allowsChildren: true,
    requiredProps: [],
    optionalProps: ["width", "span", "alignment"],
    contentSchema: {},
  },
  heading: {
    allowsChildren: false,
    requiredProps: [],
    optionalProps: ["level", "alignment", "color"],
    contentSchema: {
      text: { type: "string", required: true },
    },
  },
  text: {
    allowsChildren: false,
    requiredProps: [],
    optionalProps: ["size", "color", "alignment"],
    contentSchema: {
      text: { type: "string", required: true },
    },
  },
  image: {
    allowsChildren: false,
    requiredProps: ["src"],
    optionalProps: ["alt", "width", "height", "objectFit"],
    contentSchema: {},
  },
  video: {
    allowsChildren: false,
    requiredProps: ["src"],
    optionalProps: ["autoplay", "controls", "loop", "muted", "width", "height"],
    contentSchema: {},
  },
  button: {
    allowsChildren: false,
    requiredProps: [],
    optionalProps: ["variant", "size", "href", "target", "onClick"],
    contentSchema: {
      text: { type: "string", required: true },
    },
  },
  form: {
    allowsChildren: true,
    requiredProps: ["action"],
    optionalProps: ["method", "encType", "onSubmit"],
    contentSchema: {},
  },
  input: {
    allowsChildren: false,
    requiredProps: ["name"],
    optionalProps: ["type", "placeholder", "label", "required", "defaultValue"],
    contentSchema: {},
  },
  textarea: {
    allowsChildren: false,
    requiredProps: ["name"],
    optionalProps: ["placeholder", "label", "required", "rows", "defaultValue"],
    contentSchema: {},
  },
  select: {
    allowsChildren: false,
    requiredProps: ["name", "options"],
    optionalProps: ["label", "required", "defaultValue"],
    contentSchema: {},
  },
  checkbox: {
    allowsChildren: false,
    requiredProps: ["name"],
    optionalProps: ["label", "checked", "required"],
    contentSchema: {},
  },
  radio: {
    allowsChildren: false,
    requiredProps: ["name", "value", "options"],
    optionalProps: ["label", "defaultValue"],
    contentSchema: {},
  },
  "submit-button": {
    allowsChildren: false,
    requiredProps: [],
    optionalProps: ["variant", "size"],
    contentSchema: {
      text: { type: "string", required: true },
    },
  },
  spacer: {
    allowsChildren: false,
    requiredProps: [],
    optionalProps: ["height", "width"],
    contentSchema: {},
  },
  divider: {
    allowsChildren: false,
    requiredProps: [],
    optionalProps: ["orientation", "color", "thickness"],
    contentSchema: {},
  },
  icon: {
    allowsChildren: false,
    requiredProps: ["name"],
    optionalProps: ["size", "color"],
    contentSchema: {},
  },
  "product-list": {
    allowsChildren: false,
    requiredProps: [],
    optionalProps: ["columns", "limit", "categoryId", "sortBy"],
    contentSchema: {},
  },
  "product-card": {
    allowsChildren: false,
    requiredProps: ["productId"],
    optionalProps: ["showPrice", "showDescription", "showAddToCart"],
    contentSchema: {},
  },
  "product-filter": {
    allowsChildren: false,
    requiredProps: [],
    optionalProps: ["filterOptions", "layout"],
    contentSchema: {},
  },
  cart: {
    allowsChildren: false,
    requiredProps: [],
    optionalProps: ["showThumbnails", "showQuantity", "showTotal"],
    contentSchema: {},
  },
  checkout: {
    allowsChildren: false,
    requiredProps: [],
    optionalProps: ["steps", "layout"],
    contentSchema: {},
  },
  navigation: {
    allowsChildren: false,
    requiredProps: ["items"],
    optionalProps: ["orientation", "alignment"],
    contentSchema: {},
  },
  footer: {
    allowsChildren: true,
    requiredProps: [],
    optionalProps: ["columns", "background"],
    contentSchema: {},
  },
  header: {
    allowsChildren: true,
    requiredProps: [],
    optionalProps: ["fixed", "transparent", "background"],
    contentSchema: {},
  },
  logo: {
    allowsChildren: false,
    requiredProps: [],
    optionalProps: ["src", "width", "height", "alt"],
    contentSchema: {
      text: { type: "string", required: false },
    },
  },
  custom: {
    allowsChildren: true,
    requiredProps: ["componentName"],
    optionalProps: [],
    contentSchema: {},
  },
};

/**
 * Validates a component against its type schema
 * @param component The component to validate
 * @param options Additional validation options
 * @returns Validation result
 */
export const validateComponent = (
  component: ComponentData,
  options: ComponentValidationOptions = { strictMode: false }
): ComponentValidationResult => {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Check required fields
  if (!component.id) {
    errors.push("Component ID is required");
  }

  // Validate component type
  if (!component.type) {
    errors.push("Component type is required");
  } else if (!VALID_COMPONENT_TYPES.includes(component.type as ComponentType)) {
    errors.push(`Invalid component type: ${component.type}`);
  } else {
    // Type-specific validation
    const schema = COMPONENT_SCHEMAS[component.type as ComponentType];

    if (!schema) {
      errors.push(`No schema defined for component type: ${component.type}`);
    } else {
      // Check required props
      for (const prop of schema.requiredProps) {
        if (!component.props || component.props[prop] === undefined) {
          errors.push(
            `Missing required prop '${prop}' for ${component.type} component`
          );
        }
      }

      // Check for unknown props in strict mode
      if (options.strictMode && component.props) {
        const allowedProps = [...schema.requiredProps, ...schema.optionalProps];
        Object.keys(component.props).forEach((prop) => {
          if (!allowedProps.includes(prop)) {
            warnings.push(
              `Unknown prop '${prop}' for ${component.type} component`
            );
          }
        });
      }

      // Validate content schema
      if (
        schema.contentSchema &&
        Object.keys(schema.contentSchema).length > 0
      ) {
        // Check required content fields
        Object.entries(schema.contentSchema).forEach(([field, fieldSchema]) => {
          if (
            fieldSchema.required &&
            (!component.content || component.content[field] === undefined)
          ) {
            errors.push(
              `Missing required content field '${field}' for ${component.type} component`
            );
          }
        });
      }

      // Children validation
      if (
        !schema.allowsChildren &&
        component.children &&
        component.children.length > 0
      ) {
        errors.push(
          `Component type '${component.type}' does not allow children`
        );
      }
    }
  }

  // Validate children recursively
  if (component.children && Array.isArray(component.children)) {
    component.children.forEach((child, index) => {
      const childResult = validateComponent(child, options);

      if (!childResult.valid) {
        errors.push(
          `Invalid child component at index ${index}: ${childResult.errors.join(", ")}`
        );
      }

      if (childResult.warnings.length > 0) {
        warnings.push(
          `Warnings in child component at index ${index}: ${childResult.warnings.join(", ")}`
        );
      }
    });
  }

  // Validate props types if available
  if (component.props && typeof component.props === "object") {
    // Basic type validation could be added here
  }

  return {
    valid: errors.length === 0,
    errors,
    warnings,
  };
};

/**
 * Validates a component tree to ensure there are no circular references
 * @param components Root level components to validate
 * @returns Validation result
 */
export const validateComponentTree = (
  components: ComponentData[]
): ComponentValidationResult => {
  const errors: string[] = [];
  const warnings: string[] = [];
  const componentIds = new Set<string>();
  const usedIds = new Set<string>();

  // First pass: collect all component IDs
  for (const component of components) {
    if (!component.id) {
      errors.push("Component is missing ID");
      continue;
    }

    if (componentIds.has(component.id)) {
      errors.push(`Duplicate component ID found: ${component.id}`);
    } else {
      componentIds.add(component.id);
    }
  }

  // Second pass: check for circular references and proper parent-child relationships
  const checkChildren = (
    component: ComponentData,
    parentPath: string[]
  ): void => {
    if (!component.id) return;

    const currentPath = [...parentPath, component.id];

    // Check for circular references
    if (parentPath.includes(component.id)) {
      errors.push(`Circular reference detected for component ${component.id}`);
      return;
    }

    if (usedIds.has(component.id) && options.strictMode) {
      warnings.push(
        `Component ${component.id} is used multiple times in the tree`
      );
    }

    usedIds.add(component.id);

    // Check children recursively
    if (component.children && component.children.length > 0) {
      for (const child of component.children) {
        checkChildren(child, currentPath);
      }
    }
  };

  // Check all root components
  for (const component of components) {
    checkChildren(component, []);
  }

  return {
    valid: errors.length === 0,
    errors,
    warnings,
  };
};

/**
 * Determines if a component can accept another component as a child
 * @param parent The parent component
 * @param child The child component
 * @returns Boolean indicating if the relationship is valid
 */
export const canAcceptChild = (
  parent: ComponentData,
  child: ComponentData
): boolean => {
  if (!parent.type || !child.type) return false;

  const parentSchema = COMPONENT_SCHEMAS[parent.type as ComponentType];

  if (!parentSchema) return false;

  return parentSchema.allowsChildren;
};

/**
 * Validates a component's props against its schema
 * @param component The component to validate
 * @returns Validation result for the props
 */
export const validateComponentProps = (
  component: ComponentData
): ComponentValidationResult => {
  const errors: string[] = [];
  const warnings: string[] = [];

  if (
    !component.type ||
    !VALID_COMPONENT_TYPES.includes(component.type as ComponentType)
  ) {
    return {
      valid: false,
      errors: ["Invalid or missing component type"],
      warnings: [],
    };
  }

  const schema = COMPONENT_SCHEMAS[component.type as ComponentType];

  // Check each prop against expected types or constraints
  // This would be expanded with detailed type checking in a real implementation
  if (component.props) {
    // Example prop validation for specific component types
    switch (component.type) {
      case "image":
        if (component.props.src && typeof component.props.src !== "string") {
          errors.push("Image src must be a string URL");
        }
        break;

      case "grid":
        if (
          component.props.columns &&
          (typeof component.props.columns !== "number" ||
            component.props.columns < 1)
        ) {
          errors.push("Grid columns must be a positive number");
        }
        break;

      // Additional type-specific validations would go here
    }
  }

  return {
    valid: errors.length === 0,
    errors,
    warnings,
  };
};

// Default validation options
const options: ComponentValidationOptions = {
  strictMode: false,
};

// Export component validation utilities
export const componentValidator = {
  validate: validateComponent,
  validateTree: validateComponentTree,
  validateProps: validateComponentProps,
  canAcceptChild,
  VALID_COMPONENT_TYPES,
  COMPONENT_SCHEMAS,
};

export default componentValidator;
