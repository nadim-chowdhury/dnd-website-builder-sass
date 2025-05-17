import { v4 as uuidv4 } from "uuid";
import {
  EditorState,
  Template,
  TemplateCategory,
  TemplatePreset,
  ComponentData,
} from "../../types/template";
import { stateSerializer } from "../serializer/state-serializer";
import { styleSerializer } from "../serializer/style-serializer";
import { templateValidator } from "./template-validator";

/**
 * Generates a new template from an existing editor state
 * @param state The editor state to convert to a template
 * @param options Additional template options
 * @returns A new template object
 */
export const generateFromState = (
  state: EditorState,
  options: {
    name: string;
    description: string;
    category: TemplateCategory;
    tags?: string[];
    thumbnail?: string;
    isPublic?: boolean;
  }
): Template => {
  if (!state || !options.name) {
    throw new Error("Missing required parameters for template generation");
  }

  const timestamp = new Date().toISOString();

  const template: Template = {
    id: uuidv4(),
    name: options.name,
    description: options.description || "",
    category: options.category || "general",
    tags: options.tags || [],
    thumbnail: options.thumbnail || "",
    isPublic: options.isPublic !== undefined ? options.isPublic : false,
    components: state.components.map((comp) => ({
      ...comp,
      id: comp.id, // Preserve component IDs for style mapping
    })),
    styles: styleSerializer.serializeAll(state.styles),
    metadata: {
      createdAt: timestamp,
      updatedAt: timestamp,
      author: state.metadata?.author || "Unknown",
      version: "1.0.0",
    },
  };

  // Validate the generated template
  const validationResult = templateValidator.validate(template);

  if (!validationResult.valid) {
    throw new Error(`Invalid template: ${validationResult.errors.join(", ")}`);
  }

  return template;
};

/**
 * Generates a template from a subset of components
 * @param components Array of components to include in the template
 * @param styles Style definitions for the components
 * @param options Additional template options
 * @returns A new template object
 */
export const generateFromComponents = (
  components: ComponentData[],
  styles: Record<string, any>,
  options: {
    name: string;
    description: string;
    category: TemplateCategory;
    tags?: string[];
    thumbnail?: string;
    isPublic?: boolean;
  }
): Template => {
  if (!components || components.length === 0 || !options.name) {
    throw new Error("Missing required parameters for template generation");
  }

  const timestamp = new Date().toISOString();

  // Filter styles to only include those for the selected components
  const componentIds = components.map((comp) => comp.id);
  const filteredStyles: Record<string, any> = {};

  Object.entries(styles).forEach(([id, style]) => {
    if (componentIds.includes(id)) {
      filteredStyles[id] = style;
    }
  });

  const template: Template = {
    id: uuidv4(),
    name: options.name,
    description: options.description || "",
    category: options.category || "general",
    tags: options.tags || [],
    thumbnail: options.thumbnail || "",
    isPublic: options.isPublic !== undefined ? options.isPublic : false,
    components,
    styles: filteredStyles,
    metadata: {
      createdAt: timestamp,
      updatedAt: timestamp,
      author: "Unknown",
      version: "1.0.0",
    },
  };

  // Validate the generated template
  const validationResult = templateValidator.validate(template);

  if (!validationResult.valid) {
    throw new Error(`Invalid template: ${validationResult.errors.join(", ")}`);
  }

  return template;
};

/**
 * Creates a basic empty template structure
 * @param options Template configuration options
 * @returns A basic template structure
 */
export const createEmptyTemplate = (options: {
  name: string;
  description?: string;
  category?: TemplateCategory;
  author?: string;
}): Template => {
  const timestamp = new Date().toISOString();

  return {
    id: uuidv4(),
    name: options.name || "Untitled Template",
    description: options.description || "",
    category: options.category || "general",
    tags: [],
    thumbnail: "",
    isPublic: false,
    components: [],
    styles: {},
    metadata: {
      createdAt: timestamp,
      updatedAt: timestamp,
      author: options.author || "Unknown",
      version: "1.0.0",
    },
  };
};

/**
 * Creates a template preset based on specified parameters
 * @param name Name of the preset
 * @param description Description of the preset
 * @param options Additional preset options
 * @returns A template preset configuration
 */
export const createTemplatePreset = (
  name: string,
  description: string,
  options: {
    defaultComponents?: ComponentData[];
    defaultStyles?: Record<string, any>;
    thumbnail?: string;
    category?: TemplateCategory;
  } = {}
): TemplatePreset => {
  return {
    id: uuidv4(),
    name,
    description,
    thumbnail: options.thumbnail || "",
    category: options.category || "general",
    defaultComponents: options.defaultComponents || [],
    defaultStyles: options.defaultStyles || {},
    metadata: {
      createdAt: new Date().toISOString(),
    },
  };
};

/**
 * Creates a screenshot/thumbnail for a template
 * @param template The template to generate a thumbnail for
 * @returns Promise resolving to a thumbnail URL
 */
export const generateTemplateThumbnail = async (
  template: Template
): Promise<string> => {
  // In a real implementation, this would use a headless browser or render service
  // to create an actual screenshot of the rendered template

  // For this example, we'll just return a placeholder URL
  return `/api/placeholder/600/400?text=${encodeURIComponent(template.name)}`;
};

// Export template generation utilities
export const templateGenerator = {
  fromState: generateFromState,
  fromComponents: generateFromComponents,
  createEmpty: createEmptyTemplate,
  createPreset: createTemplatePreset,
  generateThumbnail: generateTemplateThumbnail,
};

export default templateGenerator;
