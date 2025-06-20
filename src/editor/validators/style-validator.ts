import { CSSProperties } from "react";
import {
  ALLOWED_CSS_PROPERTIES,
  CSS_UNIT_REGEX,
  COLOR_REGEX,
  MAX_CSS_VALUE_LENGTH,
} from "../../lib/constants/styling";
import type { StyleValidationResult } from "../../types/editor";
import { ProjectValidationResult } from "../../types/project";

/**
 * Validates a CSS property name to ensure it's in the list of allowed properties
 * @param property - The CSS property name to validate
 */
export const validateCSSProperty = (property: string): boolean => {
  return ALLOWED_CSS_PROPERTIES.includes(property);
};

/**
 * Validates a CSS value based on its property type
 * @param property - The CSS property name
 * @param value - The CSS value to validate
 */
export const validateCSSValue = (property: string, value: string): boolean => {
  // Check if value exceeds maximum length
  if (value.length > MAX_CSS_VALUE_LENGTH) {
    return false;
  }

  // Skip validation for empty values (they'll be handled elsewhere)
  if (
    !value ||
    value === "initial" ||
    value === "inherit" ||
    value === "unset"
  ) {
    return true;
  }

  // Property-specific validations
  if (
    property.includes("color") ||
    property === "background" ||
    property === "border"
  ) {
    return (
      COLOR_REGEX.test(value) ||
      value === "transparent" ||
      value === "currentColor"
    );
  }

  if (
    property.includes("width") ||
    property.includes("height") ||
    property.includes("margin") ||
    property.includes("padding") ||
    property.includes("size") ||
    property.includes("position") ||
    property === "top" ||
    property === "right" ||
    property === "bottom" ||
    property === "left"
  ) {
    // Allow percentages, pixels, ems, rems, etc.
    return CSS_UNIT_REGEX.test(value) || value === "auto";
  }

  if (property === "display") {
    const validDisplayValues = [
      "block",
      "inline",
      "inline-block",
      "flex",
      "inline-flex",
      "grid",
      "inline-grid",
      "none",
    ];
    return validDisplayValues.includes(value);
  }

  if (property === "position") {
    const validPositionValues = [
      "static",
      "relative",
      "absolute",
      "fixed",
      "sticky",
    ];
    return validPositionValues.includes(value);
  }

  if (
    property === "overflow" ||
    property === "overflowX" ||
    property === "overflowY"
  ) {
    const validOverflowValues = ["visible", "hidden", "scroll", "auto"];
    return validOverflowValues.includes(value);
  }

  // For any other properties, allow the value
  return true;
};

/**
 * Validates an entire style object for safety and correctness
 * @param styles - The style object to validate
 * @returns Validation result with valid styles and errors
 */
export const validateStyleObject = (
  styles: CSSProperties
): StyleValidationResult => {
  const result: StyleValidationResult = {
    isValid: true,
    validStyles: {},
    errors: {},
  };

  // If no styles, return early
  if (!styles || Object.keys(styles).length === 0) {
    return result;
  }

  Object.entries(styles).forEach(([property, value]) => {
    // Skip if value is null or undefined
    if (value === null || value === undefined) {
      return;
    }

    const stringValue = String(value);

    // Validate property name
    const isValidProperty = validateCSSProperty(property);

    // Validate property value if property is valid
    const isValidValue = isValidProperty
      ? validateCSSValue(property, stringValue)
      : false;

    if (isValidProperty && isValidValue) {
      // Add to valid styles
      (result.validStyles as Record<string, any>)[property] = value;
    } else {
      // Track validation errors
      result.isValid = false;
      if (!isValidProperty) {
        result.errors[property] = `Invalid CSS property: ${property}`;
      } else {
        result.errors[property] =
          `Invalid value for ${property}: ${stringValue}`;
      }
    }
  });

  return result;
};

/**
 * Validates a map of styles keyed by component IDs
 * @param styleMap - Object mapping component IDs to style objects
 * @returns Project validation result with errors and warnings
 */
export const validateStyleMap = (
  styleMap: Record<string, CSSProperties>
): ProjectValidationResult => {
  const errors: string[] = [];
  const warnings: string[] = [];

  // If no styles, return valid result
  if (!styleMap || Object.keys(styleMap).length === 0) {
    return {
      valid: true,
      errors: [],
      warnings: [],
    };
  }

  // Validate each component's styles
  for (const [componentId, styles] of Object.entries(styleMap)) {
    if (!styles) continue;

    const styleResult = validateStyleObject(styles);

    if (!styleResult.isValid) {
      // Get all error messages for this component
      const styleErrors = Object.entries(styleResult.errors)
        .map(([prop, error]) => error)
        .join("; ");

      errors.push(
        `Invalid styles for component ${componentId}: ${styleErrors}`
      );
    }

    // Check for potentially problematic style combinations
    if (
      styles.position === "absolute" &&
      !styles.top &&
      !styles.left &&
      !styles.bottom &&
      !styles.right
    ) {
      warnings.push(
        `Component ${componentId} uses absolute positioning without any positioning values`
      );
    }

    // Check for z-index values that might be too high
    if (styles.zIndex && Number(styles.zIndex) > 1000) {
      warnings.push(
        `Component ${componentId} has a very high z-index: ${styles.zIndex}`
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
 * Sanitizes a style object by removing any invalid properties or values
 * @param styles - The style object to sanitize
 * @returns A clean, valid style object
 */
export const sanitizeStyles = (styles: CSSProperties): CSSProperties => {
  const { validStyles } = validateStyleObject(styles);
  return validStyles;
};

/**
 * Validates a specific CSS property-value pair
 * @param property - The CSS property name
 * @param value - The CSS value
 * @returns Whether the property-value pair is valid
 */
export const validateStyleProperty = (
  property: string,
  value: string | number
): boolean => {
  if (!validateCSSProperty(property)) {
    return false;
  }
  return validateCSSValue(property, String(value));
};

/**
 * Checks if two style objects are equivalent
 * @param styleA - First style object
 * @param styleB - Second style object
 * @returns Whether the style objects are equivalent
 */
export const areStylesEqual = (
  styleA: CSSProperties,
  styleB: CSSProperties
): boolean => {
  const keysA = Object.keys(styleA);
  const keysB = Object.keys(styleB);

  if (keysA.length !== keysB.length) {
    return false;
  }

  return keysA.every(
    (key) =>
      styleB.hasOwnProperty(key) &&
      styleA[key as keyof CSSProperties] === styleB[key as keyof CSSProperties]
  );
};

/**
 * Checks if the style object is empty or contains only default values
 * @param styles - The style object to check
 * @returns Whether the style object is effectively empty
 */
export const isStyleEmpty = (styles: CSSProperties): boolean => {
  if (!styles) return true;

  const styleKeys = Object.keys(styles);
  if (styleKeys.length === 0) return true;

  return styleKeys.every((key) => {
    const value = styles[key as keyof CSSProperties];
    return (
      value === "" ||
      value === undefined ||
      value === null ||
      value === "initial"
    );
  });
};

// Default export
const styleValidator = {
  validateCSSProperty,
  validateCSSValue,
  validateStyleObject,
  validateStyleMap, // Added the missing method
  sanitizeStyles,
  validateStyleProperty,
  areStylesEqual,
  isStyleEmpty,
};

export default styleValidator;
