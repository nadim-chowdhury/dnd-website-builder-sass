import {
  Template,
  TemplateImportData,
  EditorState,
  ComponentData,
} from "../../types/template";
import { stateSerializer } from "../serializer/state-serializer";
import { styleSerializer } from "../serializer/style-serializer";
import { templateValidator } from "./template-validator";
import { v4 as uuidv4 } from "uuid";

/**
 * Parses a template into an editor state for editing
 * @param template The template to parse
 * @returns Editor state initialized from the template
 */
export const parseTemplateToState = (template: Template): EditorState => {
  if (!template || !template.components) {
    throw new Error("Invalid template format");
  }

  // Validate template first
  const validationResult = templateValidator.validate(template);
  if (!validationResult.valid) {
    throw new Error(`Invalid template: ${validationResult.errors.join(", ")}`);
  }

  // Create a new editor state with components and styles from the template
  const editorState = stateSerializer.createEmpty({
    name: `${template.name} Project`,
    description: template.description,
    components: [...template.components], // Clone the components array
    styles: styleSerializer.deserializeAll(template.styles),
    metadata: {
      author: template.metadata?.author || "Unknown",
      template: {
        id: template.id,
        name: template.name,
      },
    },
  });

  return editorState;
};

/**
 * Parses a JSON string into a template object
 * @param jsonString JSON string representation of a template
 * @returns Parsed template object
 */
export const parseTemplateFromJson = (jsonString: string): Template => {
  if (!jsonString) {
    throw new Error("Empty template JSON provided");
  }

  let templateData: any;

  try {
    templateData = JSON.parse(jsonString);
  } catch (error) {
    throw new Error(
      `Failed to parse template JSON: ${(error as Error).message}`
    );
  }

  if (!templateData.components || !Array.isArray(templateData.components)) {
    throw new Error("Invalid template format: missing components array");
  }

  // Ensure the template has proper structure
  const template: Template = {
    id: templateData.id || uuidv4(),
    name: templateData.name || "Imported Template",
    description: templateData.description || "",
    category: templateData.category || "general",
    tags: Array.isArray(templateData.tags) ? templateData.tags : [],
    thumbnail: templateData.thumbnail || "",
    isPublic: !!templateData.isPublic,
    components: templateData.components,
    styles: templateData.styles || {},
    metadata: {
      createdAt: templateData.metadata?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      author: templateData.metadata?.author || "Unknown",
      version: templateData.metadata?.version || "1.0.0",
    },
  };

  // Validate the template
  const validationResult = templateValidator.validate(template);
  if (!validationResult.valid) {
    throw new Error(
      `Invalid template format: ${validationResult.errors.join(", ")}`
    );
  }

  return template;
};

/**
 * Imports a template from an external source
 * @param importData Data required for template import
 * @returns The imported template
 */
export const importTemplate = async (
  importData: TemplateImportData
): Promise<Template> => {
  let template: Template;

  // Handle different import sources
  switch (importData.source) {
    case "file":
      if (!importData.fileContent) {
        throw new Error("Missing file content for template import");
      }
      template = parseTemplateFromJson(importData.fileContent);
      break;

    case "url":
      if (!importData.url) {
        throw new Error("Missing URL for template import");
      }

      try {
        const response = await fetch(importData.url);
        if (!response.ok) {
          throw new Error(`Failed to fetch template: ${response.statusText}`);
        }

        const data = await response.text();
        template = parseTemplateFromJson(data);
      } catch (error) {
        throw new Error(
          `Error importing template from URL: ${(error as Error).message}`
        );
      }
      break;

    case "marketplace":
      if (!importData.templateId) {
        throw new Error("Missing template ID for marketplace import");
      }

      try {
        // This would normally be an API call to a template marketplace service
        const response = await fetch(`/api/templates/${importData.templateId}`);
        if (!response.ok) {
          throw new Error(`Failed to fetch template: ${response.statusText}`);
        }

        const data = await response.json();
        template = data as Template;

        // Validate the imported template
        const validationResult = templateValidator.validate(template);
        if (!validationResult.valid) {
          throw new Error(
            `Invalid template format: ${validationResult.errors.join(", ")}`
          );
        }
      } catch (error) {
        throw new Error(
          `Error importing template from marketplace: ${(error as Error).message}`
        );
      }
      break;

    default:
      throw new Error(`Unsupported import source: ${importData.source}`);
  }

  // Update import metadata
  template.metadata.importedAt = new Date().toISOString();
  template.metadata.importSource = importData.source;

  return template;
};

/**
 * Extracts reusable components from a template
 * @param template The template to extract components from
 * @param componentIds Optional array of specific component IDs to extract
 * @returns Array of extracted components with their associated styles
 */
export const extractComponentsFromTemplate = (
  template: Template,
  componentIds?: string[]
): { components: ComponentData[]; styles: Record<string, any> } => {
  if (!template || !template.components) {
    throw new Error("Invalid template provided");
  }

  let filteredComponents: ComponentData[];

  // Filter components if IDs are specified
  if (componentIds && componentIds.length > 0) {
    filteredComponents = template.components.filter((comp) =>
      componentIds.includes(comp.id)
    );

    if (filteredComponents.length === 0) {
      throw new Error("No matching components found in template");
    }
  } else {
    // Use all components if no IDs specified
    filteredComponents = [...template.components];
  }

  // Extract relevant styles
  const extractedStyles: Record<string, any> = {};
  const extractedComponentIds = filteredComponents.map((comp) => comp.id);

  Object.entries(template.styles).forEach(([id, style]) => {
    if (extractedComponentIds.includes(id)) {
      extractedStyles[id] = style;
    }
  });

  return {
    components: filteredComponents,
    styles: extractedStyles,
  };
};

// Export template parsing utilities
export const templateParser = {
  parseToState: parseTemplateToState,
  parseFromJson: parseTemplateFromJson,
  import: importTemplate,
  extractComponents: extractComponentsFromTemplate,
};

export default templateParser;
