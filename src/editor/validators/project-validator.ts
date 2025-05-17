import {
  Project,
  ProjectType,
  ProjectValidationResult,
  ProjectValidationOptions,
  ProjectSettings,
  PublishSettings,
} from "../../types/project";
import { componentValidator } from "./component-validator";
import styleValidator from "./style-validator";

// Define valid project types
const VALID_PROJECT_TYPES: ProjectType[] = [
  "website",
  "landing-page",
  "blog",
  "portfolio",
  "e-commerce",
  "webapp",
  "template",
];

// Minimum and maximum constraints for various project settings
const PROJECT_CONSTRAINTS = {
  MIN_NAME_LENGTH: 3,
  MAX_NAME_LENGTH: 100,
  MAX_DESCRIPTION_LENGTH: 500,
  MAX_COMPONENTS: 1000,
  MAX_PAGES: 50,
  MAX_DOMAINS: 10,
  MAX_ASSET_SIZE_MB: 50,
  ALLOWED_DOMAINS: [".com", ".org", ".net", ".io", ".app", ".dev"],
};

/**
 * Validates a complete project structure
 * @param project The project to validate
 * @param options Additional validation options
 * @returns Validation result
 */
export const validateProject = (
  project: Project,
  options: ProjectValidationOptions = { strictMode: false }
): ProjectValidationResult => {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Basic structure validation
  if (!project) {
    return {
      valid: false,
      errors: ["Project cannot be empty"],
      warnings: [],
    };
  }

  // Required fields validation
  if (!project.id) {
    errors.push("Project ID is required");
  }

  // Validate project name
  if (!project.name) {
    errors.push("Project name is required");
  } else if (project.name.length < PROJECT_CONSTRAINTS.MIN_NAME_LENGTH) {
    errors.push(
      `Project name must be at least ${PROJECT_CONSTRAINTS.MIN_NAME_LENGTH} characters`
    );
  } else if (project.name.length > PROJECT_CONSTRAINTS.MAX_NAME_LENGTH) {
    errors.push(
      `Project name cannot exceed ${PROJECT_CONSTRAINTS.MAX_NAME_LENGTH} characters`
    );
  }

  // Validate project type
  if (!project.type) {
    errors.push("Project type is required");
  } else if (!VALID_PROJECT_TYPES.includes(project.type)) {
    errors.push(
      `Invalid project type: ${project.type}. Must be one of: ${VALID_PROJECT_TYPES.join(", ")}`
    );
  }

  // Validate description length if present
  if (
    project.description &&
    project.description.length > PROJECT_CONSTRAINTS.MAX_DESCRIPTION_LENGTH
  ) {
    errors.push(
      `Project description cannot exceed ${PROJECT_CONSTRAINTS.MAX_DESCRIPTION_LENGTH} characters`
    );
  }

  // Validate components
  if (!project.components || !Array.isArray(project.components)) {
    errors.push("Project must contain a components array");
  } else {
    // Check component count
    if (project.components.length > PROJECT_CONSTRAINTS.MAX_COMPONENTS) {
      errors.push(
        `Project exceeds maximum of ${PROJECT_CONSTRAINTS.MAX_COMPONENTS} components`
      );
    }

    // Validate each component
    for (let i = 0; i < project.components.length; i++) {
      const component = project.components[i];
      const componentResult = componentValidator.validate(component, {
        strictMode: options.strictMode,
      });

      if (!componentResult.valid) {
        errors.push(
          `Invalid component at index ${i}: ${componentResult.errors.join(", ")}`
        );
      }

      if (componentResult.warnings.length > 0) {
        warnings.push(...componentResult.warnings);
      }
    }

    // Validate component tree structure
    const treeResult = componentValidator.validateTree(project.components);
    if (!treeResult.valid) {
      errors.push(...treeResult.errors);
    }
    if (treeResult.warnings.length > 0) {
      warnings.push(...treeResult.warnings);
    }
  }

  // Validate styles
  if (project.styles) {
    const styleResult = styleValidator.validateStyleMap(project.styles);
    if (!styleResult.valid) {
      errors.push(...styleResult.errors);
    }
    if (styleResult.warnings.length > 0) {
      warnings.push(...styleResult.warnings);
    }

    // Check component and style ID alignment
    const componentIds = new Set(project.components?.map((c) => c.id) || []);
    const styleIds = Object.keys(project.styles);

    for (const styleId of styleIds) {
      if (!componentIds.has(styleId)) {
        if (options.strictMode) {
          errors.push(`Style with ID ${styleId} doesn't match any component`);
        } else {
          warnings.push(`Style with ID ${styleId} doesn't match any component`);
        }
      }
    }
  }

  // Validate pages if present
  if (project.pages && Array.isArray(project.pages)) {
    if (project.pages.length > PROJECT_CONSTRAINTS.MAX_PAGES) {
      errors.push(
        `Project exceeds maximum of ${PROJECT_CONSTRAINTS.MAX_PAGES} pages`
      );
    }

    // Check for page IDs and duplicate slugs
    const slugs = new Set<string>();

    for (let i = 0; i < project.pages.length; i++) {
      const page = project.pages[i];

      if (!page.id) {
        errors.push(`Page at index ${i} is missing an ID`);
      }

      if (!page.slug) {
        errors.push(`Page at index ${i} is missing a slug`);
      } else if (slugs.has(page.slug)) {
        errors.push(`Duplicate page slug found: ${page.slug}`);
      } else {
        slugs.add(page.slug);
      }
    }
  }

  // Validate project settings
  if (project.settings) {
    const settingsResult = validateProjectSettings(project.settings);
    if (!settingsResult.valid) {
      errors.push(...settingsResult.errors);
    }
    if (settingsResult.warnings.length > 0) {
      warnings.push(...settingsResult.warnings);
    }
  }

  // Validate publish settings if present
  if (project.publishSettings) {
    const publishResult = validatePublishSettings(project.publishSettings);
    if (!publishResult.valid) {
      errors.push(...publishResult.errors);
    }
    if (publishResult.warnings.length > 0) {
      warnings.push(...publishResult.warnings);
    }
  }

  // Validate metadata
  if (!project.metadata) {
    warnings.push("Project is missing metadata");
  } else {
    // Check required timestamps
    if (!project.metadata.createdAt) {
      warnings.push("Project metadata is missing createdAt timestamp");
    }

    if (!project.metadata.updatedAt) {
      warnings.push("Project metadata is missing updatedAt timestamp");
    }

    // Validate timestamps format
    if (
      project.metadata.createdAt &&
      isNaN(Date.parse(project.metadata.createdAt))
    ) {
      errors.push("Project createdAt timestamp is invalid");
    }

    if (
      project.metadata.updatedAt &&
      isNaN(Date.parse(project.metadata.updatedAt))
    ) {
      errors.push("Project updatedAt timestamp is invalid");
    }
  }

  return {
    valid: errors.length === 0,
    errors,
    warnings,
  };
};

/**
 * Validates project settings
 * @param settings Project settings to validate
 * @returns Validation result
 */
export const validateProjectSettings = (
  settings: ProjectSettings
): ProjectValidationResult => {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Validate SEO settings if present
  if (settings.seo) {
    if (settings.seo.title && settings.seo.title.length > 60) {
      warnings.push("SEO title exceeds recommended length of 60 characters");
    }

    if (settings.seo.description && settings.seo.description.length > 160) {
      warnings.push(
        "SEO description exceeds recommended length of 160 characters"
      );
    }
  }

  // Validate responsive settings
  if (settings.responsive) {
    const { breakpoints } = settings.responsive;

    if (breakpoints) {
      if (
        breakpoints.mobile &&
        (breakpoints.mobile < 320 || breakpoints.mobile > 500)
      ) {
        warnings.push(
          "Mobile breakpoint should typically be between 320px and 500px"
        );
      }

      if (
        breakpoints.tablet &&
        (breakpoints.tablet < 501 || breakpoints.tablet > 1024)
      ) {
        warnings.push(
          "Tablet breakpoint should typically be between 501px and 1024px"
        );
      }

      if (breakpoints.desktop && breakpoints.desktop < 1025) {
        warnings.push("Desktop breakpoint should typically be at least 1025px");
      }

      // Check if breakpoints are in correct order
      if (
        breakpoints.mobile &&
        breakpoints.tablet &&
        breakpoints.mobile >= breakpoints.tablet
      ) {
        errors.push("Mobile breakpoint must be less than tablet breakpoint");
      }

      if (
        breakpoints.tablet &&
        breakpoints.desktop &&
        breakpoints.tablet >= breakpoints.desktop
      ) {
        errors.push("Tablet breakpoint must be less than desktop breakpoint");
      }
    }
  }

  // Validate theme settings
  if (settings.theme) {
    // Validate color format if present
    if (settings.theme.colors) {
      const colorEntries = Object.entries(settings.theme.colors);

      for (const [colorName, colorValue] of colorEntries) {
        if (typeof colorValue === "string") {
          // Basic color format validation (hex, rgb, etc.)
          const isValidColor =
            /^(#([0-9A-Fa-f]{3,8})|(rgba?|hsla?)\(.*\))$/.test(colorValue);

          if (!isValidColor) {
            errors.push(`Invalid color format for ${colorName}: ${colorValue}`);
          }
        }
      }
    }

    // Font validation could be added here
  }

  return {
    valid: errors.length === 0,
    errors,
    warnings,
  };
};

/**
 * Validates project publish settings
 * @param settings Publish settings to validate
 * @returns Validation result
 */
export const validatePublishSettings = (
  settings: PublishSettings
): ProjectValidationResult => {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Validate domains if present
  if (settings.domains && Array.isArray(settings.domains)) {
    if (settings.domains.length > PROJECT_CONSTRAINTS.MAX_DOMAINS) {
      errors.push(
        `Exceeds maximum of ${PROJECT_CONSTRAINTS.MAX_DOMAINS} domains`
      );
    }

    // Validate each domain
    for (const domain of settings.domains) {
      // Basic domain format validation
      const isValidDomain =
        /^([a-zA-Z0-9]([a-zA-Z0-9\-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}$/.test(
          domain
        );

      if (!isValidDomain) {
        errors.push(`Invalid domain format: ${domain}`);
      } else {
        // Check if domain has an allowed TLD
        const hasAllowedTLD = PROJECT_CONSTRAINTS.ALLOWED_DOMAINS.some((tld) =>
          domain.endsWith(tld)
        );

        if (!hasAllowedTLD) {
          warnings.push(
            `Domain ${domain} does not have a commonly supported TLD`
          );
        }
      }
    }
  }

  // Validate assets if present
  if (settings.assets && Array.isArray(settings.assets)) {
    // Check total asset size
    let totalSizeMB = 0;

    for (const asset of settings.assets) {
      if (asset.size) {
        totalSizeMB += asset.size / (1024 * 1024); // Convert bytes to MB
      }
    }

    if (totalSizeMB > PROJECT_CONSTRAINTS.MAX_ASSET_SIZE_MB) {
      errors.push(
        `Total assets size exceeds maximum of ${PROJECT_CONSTRAINTS.MAX_ASSET_SIZE_MB}MB`
      );
    }
  }

  return {
    valid: errors.length === 0,
    errors,
    warnings,
  };
};

/**
 * Checks if a project can be published
 * @param project The project to check
 * @returns Validation result with publishable status
 */
export const canPublishProject = (
  project: Project
): ProjectValidationResult => {
  const result = validateProject(project, { strictMode: true });

  if (!result.valid) {
    return result;
  }

  const errors: string[] = [];
  const warnings: string[] = [];

  // Additional publish-specific checks

  // Check if the project has required components (e.g., needs a header and footer for websites)
  if (project.type === "website" || project.type === "landing-page") {
    const hasHeader = project.components?.some((c) => c.type === "header");
    const hasFooter = project.components?.some((c) => c.type === "footer");

    if (!hasHeader) {
      warnings.push("Project is missing a header component");
    }

    if (!hasFooter) {
      warnings.push("Project is missing a footer component");
    }
  }

  // Check if the project has at least one page defined for multi-page projects
  if (project.type === "website" || project.type === "blog") {
    if (!project.pages || project.pages.length === 0) {
      errors.push("Project must have at least one page defined");
    }
  }

  // Check for empty sections or placeholders
  const hasEmptySections = project.components?.some(
    (c) =>
      (c.type === "section" || c.type === "container") &&
      (!c.children || c.children.length === 0)
  );

  if (hasEmptySections) {
    warnings.push("Project contains empty sections or containers");
  }

  // Check publish settings
  if (!project.publishSettings) {
    errors.push("Project is missing publish settings");
  } else {
    if (
      !project.publishSettings.domains ||
      project.publishSettings.domains.length === 0
    ) {
      warnings.push("No domains configured for publishing");
    }
  }

  // Check for unfinished content
  const hasPlaceholderContent = project.components?.some((c) => {
    if (c.content && c.content.text) {
      const text = c.content.text as string;
      return (
        text.includes("Lorem ipsum") ||
        text.includes("[Your content here]") ||
        text === "Heading" ||
        text === "Button"
      );
    }
    return false;
  });

  if (hasPlaceholderContent) {
    warnings.push(
      "Project contains placeholder content that should be replaced"
    );
  }

  return {
    valid: errors.length === 0,
    errors,
    warnings,
    publishable: errors.length === 0,
  };
};

// Export project validation utilities
export const projectValidator = {
  validate: validateProject,
  validateSettings: validateProjectSettings,
  validatePublishSettings,
  canPublish: canPublishProject,
  VALID_PROJECT_TYPES,
  PROJECT_CONSTRAINTS,
};

export default projectValidator;
