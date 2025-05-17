import {
  StyleDefinition,
  StyleMap,
  SerializedStyleMap,
  ResponsiveStyleValues,
  StyleProperty,
} from "../../types/editor";

/**
 * Converts a single style definition to a serializable format
 * @param style The style definition to serialize
 * @returns Serialized style definition
 */
export const serializeStyle = (style: StyleDefinition): StyleDefinition => {
  // Create a clean copy of the style object
  const serialized: StyleDefinition = {
    id: style.id,
    name: style.name,
    properties: {},
  };

  // Process each property in the style definition
  Object.entries(style.properties).forEach(([propName, propValue]) => {
    if (typeof propValue === "object" && propValue !== null) {
      // Handle responsive style values
      const responsiveValues = propValue as ResponsiveStyleValues;
      serialized.properties[propName] = {
        desktop: responsiveValues.desktop,
        tablet: responsiveValues.tablet,
        mobile: responsiveValues.mobile,
      };
    } else {
      // Handle simple property values
      serialized.properties[propName] = propValue;
    }
  });

  return serialized;
};

/**
 * Deserializes a style definition from saved format
 * @param serialized The serialized style definition
 * @returns Deserialized style definition
 */
export const deserializeStyle = (
  serialized: StyleDefinition
): StyleDefinition => {
  if (!serialized || !serialized.id) {
    throw new Error("Invalid style definition format");
  }

  const style: StyleDefinition = {
    id: serialized.id,
    name: serialized.name || "Unnamed Style",
    properties: {},
  };

  if (serialized.properties) {
    Object.entries(serialized.properties).forEach(([propName, propValue]) => {
      if (propValue !== null && typeof propValue === "object") {
        // Handle responsive style values
        const responsiveValues = propValue as ResponsiveStyleValues;
        style.properties[propName] = {
          desktop: responsiveValues.desktop || null,
          tablet: responsiveValues.tablet || null,
          mobile: responsiveValues.mobile || null,
        };
      } else {
        // Handle simple property values
        style.properties[propName] = propValue;
      }
    });
  }

  return style;
};

/**
 * Serializes an entire style map for storage or export
 * @param styleMap The map of component IDs to style definitions
 * @returns Serialized style map
 */
export const serializeStyleMap = (styleMap: StyleMap): SerializedStyleMap => {
  const serialized: SerializedStyleMap = {};

  Object.entries(styleMap).forEach(([componentId, styles]) => {
    serialized[componentId] = serializeStyle(styles);
  });

  return serialized;
};

/**
 * Deserializes a style map from storage or import
 * @param serialized The serialized style map
 * @returns Deserialized style map
 */
export const deserializeStyleMap = (
  serialized: SerializedStyleMap
): StyleMap => {
  if (!serialized) {
    return {};
  }

  const styleMap: StyleMap = {};

  Object.entries(serialized).forEach(([componentId, styleData]) => {
    styleMap[componentId] = deserializeStyle(styleData);
  });

  return styleMap;
};

/**
 * Normalizes style values to ensure consistent format
 * @param value The style value to normalize
 * @returns Normalized style value
 */
export const normalizeStyleValue = (value: any): any => {
  // Convert numeric strings to numbers where appropriate
  if (
    typeof value === "string" &&
    !isNaN(Number(value)) &&
    !value.includes("px") &&
    !value.includes("%")
  ) {
    return Number(value);
  }

  // Normalize null/undefined values
  if (value === undefined) {
    return null;
  }

  return value;
};

/**
 * Creates a deep copy of style properties
 * @param properties The style properties to clone
 * @returns Cloned style properties
 */
export const cloneStyleProperties = (
  properties: Record<string, StyleProperty>
): Record<string, StyleProperty> => {
  const cloned: Record<string, StyleProperty> = {};

  Object.entries(properties).forEach(([key, value]) => {
    if (value === null || value === undefined) {
      cloned[key] = null;
    } else if (typeof value === "object") {
      // Deep clone for responsive values
      const responsiveValues = value as ResponsiveStyleValues;
      cloned[key] = {
        desktop: responsiveValues.desktop,
        tablet: responsiveValues.tablet,
        mobile: responsiveValues.mobile,
      };
    } else {
      // Direct assignment for primitive values
      cloned[key] = value;
    }
  });

  return cloned;
};

/**
 * Compares two style definitions and returns true if they are equivalent
 * @param style1 First style to compare
 * @param style2 Second style to compare
 * @returns Boolean indicating if styles are equivalent
 */
export const areStylesEqual = (style1: StyleMap, style2: StyleMap): boolean => {
  // Simple identity check
  if (style1 === style2) return true;

  // Check if both are null/undefined
  if (!style1 && !style2) return true;
  if (!style1 || !style2) return false;

  const keys1 = Object.keys(style1);
  const keys2 = Object.keys(style2);

  // Check if they have the same component IDs
  if (keys1.length !== keys2.length) return false;

  // Check each component's style
  for (const key of keys1) {
    if (!keys2.includes(key)) return false;

    const compStyle1 = style1[key];
    const compStyle2 = style2[key];

    if (
      compStyle1.id !== compStyle2.id ||
      compStyle1.name !== compStyle2.name
    ) {
      return false;
    }

    // Compare properties
    const propKeys1 = Object.keys(compStyle1.properties);
    const propKeys2 = Object.keys(compStyle2.properties);

    if (propKeys1.length !== propKeys2.length) return false;

    for (const propKey of propKeys1) {
      if (!propKeys2.includes(propKey)) return false;

      const prop1 = compStyle1.properties[propKey];
      const prop2 = compStyle2.properties[propKey];

      // Check responsive values if applicable
      if (
        typeof prop1 === "object" &&
        prop1 !== null &&
        typeof prop2 === "object" &&
        prop2 !== null
      ) {
        const resp1 = prop1 as ResponsiveStyleValues;
        const resp2 = prop2 as ResponsiveStyleValues;

        if (
          resp1.desktop !== resp2.desktop ||
          resp1.tablet !== resp2.tablet ||
          resp1.mobile !== resp2.mobile
        ) {
          return false;
        }
      } else if (prop1 !== prop2) {
        return false;
      }
    }
  }

  return true;
};

// Export combined style serialization utilities
export const styleSerializer = {
  serialize: serializeStyle,
  deserialize: deserializeStyle,
  serializeAll: serializeStyleMap,
  deserializeAll: deserializeStyleMap,
  normalize: normalizeStyleValue,
  cloneProperties: cloneStyleProperties,
  areStylesEqual,
};

export default styleSerializer;
