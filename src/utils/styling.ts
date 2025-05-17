import { CSSProperties } from "react";
import { Breakpoint } from "@/types/editor";
import { StyleProperty, ComponentStyles, StyleValue } from "@/types/components";
import { getValueForBreakpoint, breakpoints } from "./responsive";
import { generateId } from "./component";

/**
 * Converts a CSS-in-JS object to a CSS string
 * @param styles - Object containing CSS properties
 * @returns CSS string representation
 */
export function cssObjectToString(styles: CSSProperties): string {
  return Object.entries(styles)
    .filter(([_, value]) => value !== undefined && value !== null)
    .map(([key, value]) => {
      // Convert camelCase to kebab-case
      const property = key.replace(/([A-Z])/g, "-$1").toLowerCase();
      return `${property}: ${value};`;
    })
    .join(" ");
}

/**
 * Converts a CSS string to a CSS-in-JS object
 * @param cssString - CSS string to parse
 * @returns CSS-in-JS object
 */
export function cssStringToObject(cssString: string): CSSProperties {
  const result: Record<string, string> = {};

  if (!cssString) return result;

  const declarations = cssString.split(";");

  declarations.forEach((declaration) => {
    const [property, value] = declaration.split(":").map((str) => str.trim());

    if (!property || !value) return;

    // Convert kebab-case to camelCase
    const camelCaseProp = property.replace(/-([a-z])/g, (_, letter) =>
      letter.toUpperCase()
    );
    result[camelCaseProp] = value;
  });

  return result as CSSProperties;
}

/**
 * Parses CSS variables from a string
 * @param cssText - CSS text containing variables
 * @returns Object with CSS variable mappings
 */
export function parseCssVariables(cssText: string): Record<string, string> {
  const variables: Record<string, string> = {};

  // Match CSS variables defined as --variable-name: value;
  const variableRegex = /--([a-zA-Z0-9-]+)\s*:\s*([^;]+);/g;
  let match;

  while ((match = variableRegex.exec(cssText)) !== null) {
    const [, name, value] = match;
    variables[`--${name}`] = value.trim();
  }

  return variables;
}

/**
 * Creates a CSS variable name
 * @param componentId - ID of the component
 * @param propertyName - Name of the CSS property
 * @returns CSS variable name
 */
export function createCssVariable(
  componentId: string,
  propertyName: string
): string {
  return `--${componentId}-${propertyName}`.toLowerCase();
}

/**
 * Applies styles to an element
 * @param element - DOM element to apply styles to
 * @param styles - CSS properties to apply
 */
export function applyStylesToElement(
  element: HTMLElement,
  styles: CSSProperties
): void {
  Object.entries(styles).forEach(([property, value]) => {
    if (value !== undefined && value !== null) {
      element.style[property as any] = value as string;
    }
  });
}

/**
 * Combines multiple style objects into one
 * @param styleObjects - Array of style objects to combine
 * @returns Combined style object
 */
export function combineStyles(...styleObjects: CSSProperties[]): CSSProperties {
  return styleObjects.reduce((result, current) => {
    return { ...result, ...current };
  }, {});
}

/**
 * Gets the computed styles for a component based on its style definitions and the current breakpoint
 * @param componentStyles - Style definitions for different breakpoints
 * @param currentBreakpoint - Current active breakpoint
 * @returns Combined styles for the current breakpoint
 */
export function getComputedStyles(
  componentStyles: ComponentStyles,
  currentBreakpoint: Breakpoint
): CSSProperties {
  const result: CSSProperties = {};

  // Process each style property
  Object.entries(componentStyles).forEach(([property, valuesByBreakpoint]) => {
    const value = getValueForBreakpoint(valuesByBreakpoint, currentBreakpoint);

    if (value !== undefined) {
      // Convert property name to camelCase for React style object
      const camelCaseProp = property.replace(/-([a-z])/g, (_, letter) =>
        letter.toUpperCase()
      );
      result[camelCaseProp as keyof CSSProperties] = value as any;
    }
  });

  return result;
}

/**
 * Formats a CSS value with its unit
 * @param value - Numeric value
 * @param unit - CSS unit (px, em, rem, etc.)
 * @returns Formatted CSS value string
 */
export function formatCssValue(value: number, unit: string = "px"): string {
  return `${value}${unit}`;
}

/**
 * Parses a CSS value string into its numeric value and unit
 * @param cssValue - CSS value string (e.g., "10px", "1.5rem")
 * @returns Object containing the numeric value and unit
 */
export function parseCssValue(cssValue: string): {
  value: number;
  unit: string;
} {
  const regex = /^(-?\d*\.?\d+)([a-z%]*)$/i;
  const matches = regex.exec(cssValue);

  if (!matches) {
    return { value: 0, unit: "px" };
  }

  return {
    value: parseFloat(matches[1]),
    unit: matches[2] || "px",
  };
}

/**
 * Creates a style object for margins or paddings
 * @param top - Top value
 * @param right - Right value
 * @param bottom - Bottom value
 * @param left - Left value
 * @param unit - CSS unit
 * @returns Style object with margin or padding properties
 */
export function createSpacingStyles(
  top: number | string,
  right: number | string,
  bottom: number | string,
  left: number | string,
  unit: string = "px"
): CSSProperties {
  return {
    paddingTop: typeof top === "number" ? `${top}${unit}` : top,
    paddingRight: typeof right === "number" ? `${right}${unit}` : right,
    paddingBottom: typeof bottom === "number" ? `${bottom}${unit}` : bottom,
    paddingLeft: typeof left === "number" ? `${left}${unit}` : left,
  };
}

/**
 * Generates margin/padding shorthand notation
 * @param top - Top value
 * @param right - Right value
 * @param bottom - Bottom value
 * @param left - Left value
 * @returns CSS shorthand string
 */
export function createSpacingShorthand(
  top: number,
  right: number,
  bottom: number,
  left: number
): string {
  // Check if we can use the shorthand notation
  if (top === right && right === bottom && bottom === left) {
    return `${top}px`; // All sides equal
  } else if (top === bottom && right === left) {
    return `${top}px ${right}px`; // Top/bottom and right/left pairs
  } else if (right === left) {
    return `${top}px ${right}px ${bottom}px`; // Top, right/left, bottom
  } else {
    return `${top}px ${right}px ${bottom}px ${left}px`; // All sides different
  }
}

/**
 * Creates a style rule for a component
 * @param componentId - Component ID
 * @param styles - CSS properties
 * @returns CSS rule string
 */
export function createStyleRule(
  componentId: string,
  styles: CSSProperties
): string {
  const cssText = cssObjectToString(styles);
  return `#${componentId} { ${cssText} }`;
}

/**
 * Generates a color with opacity
 * @param color - Base color (hex, rgb, or rgba)
 * @param opacity - Opacity value (0 to 1)
 * @returns Color with applied opacity
 */
export function createColorWithOpacity(color: string, opacity: number): string {
  // Check if already rgba
  if (color.startsWith("rgba")) {
    return color.replace(/rgba\((.+?),\s*[\d.]+\)/, `rgba($1, ${opacity})`);
  }

  // Check if rgb
  if (color.startsWith("rgb")) {
    return color.replace(/rgb\((.+?)\)/, `rgba($1, ${opacity})`);
  }

  // Assume hex color
  if (color.startsWith("#")) {
    // Convert hex to rgb
    const r = parseInt(color.slice(1, 3), 16);
    const g = parseInt(color.slice(3, 5), 16);
    const b = parseInt(color.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
  }

  return color; // Return original if format not recognized
}

/**
 * Converts pixels to rem units
 * @param px - Value in pixels
 * @param baseSize - Base font size in pixels (default: 16)
 * @returns Value in rem units
 */
export function pxToRem(px: number, baseSize: number = 16): string {
  return `${px / baseSize}rem`;
}

/**
 * Generates box shadow CSS value
 * @param hOffset - Horizontal offset
 * @param vOffset - Vertical offset
 * @param blur - Blur radius
 * @param spread - Spread radius
 * @param color - Shadow color
 * @returns Box shadow CSS value
 */
export function createBoxShadow(
  hOffset: number,
  vOffset: number,
  blur: number,
  spread: number,
  color: string
): string {
  return `${hOffset}px ${vOffset}px ${blur}px ${spread}px ${color}`;
}

/**
 * Creates a gradient background
 * @param type - Gradient type (linear or radial)
 * @param angle - Angle for linear gradient
 * @param stops - Color stops
 * @returns Gradient CSS value
 */
export function createGradient(
  type: "linear" | "radial",
  angle: number,
  stops: Array<{ color: string; position: number }>
): string {
  const colorStops = stops
    .map((stop) => `${stop.color} ${stop.position}%`)
    .join(", ");

  if (type === "linear") {
    return `linear-gradient(${angle}deg, ${colorStops})`;
  } else {
    return `radial-gradient(circle, ${colorStops})`;
  }
}

/**
 * Generates styles for component state (hover, active, focus)
 * @param componentId - Component ID
 * @param state - Component state
 * @param styles - CSS properties for the state
 * @returns CSS rule for component state
 */
export function createStateStyleRule(
  componentId: string,
  state: "hover" | "active" | "focus",
  styles: CSSProperties
): string {
  const cssText = cssObjectToString(styles);
  return `#${componentId}:${state} { ${cssText} }`;
}

/**
 * Creates unique class name for a component style
 * @param componentType - Type of component
 * @param styleName - Name of the style
 * @returns Unique class name
 */
export function createStyleClassName(
  componentType: string,
  styleName: string
): string {
  const uniqueId = generateId(6);
  return `${componentType}-${styleName}-${uniqueId}`;
}

/**
 * Updates a style property in component styles
 * @param styles - Current component styles
 * @param property - Style property to update
 * @param value - New style value
 * @param breakpoint - Breakpoint to update
 * @returns Updated component styles
 */
export function updateStyleProperty(
  styles: ComponentStyles,
  property: StyleProperty,
  value: StyleValue,
  breakpoint: Breakpoint
): ComponentStyles {
  const updatedStyles = { ...styles };

  // Initialize property if it doesn't exist
  if (!updatedStyles[property]) {
    updatedStyles[property] = {};
  }

  // Update value for the specific breakpoint
  updatedStyles[property] = {
    ...updatedStyles[property],
    [breakpoint]: value,
  };

  return updatedStyles;
}

/**
 * Removes a style property from component styles
 * @param styles - Current component styles
 * @param property - Style property to remove
 * @param breakpoint - Breakpoint to remove property from (optional)
 * @returns Updated component styles
 */
export function removeStyleProperty(
  styles: ComponentStyles,
  property: StyleProperty,
  breakpoint?: Breakpoint
): ComponentStyles {
  const updatedStyles = { ...styles };

  if (!updatedStyles[property]) {
    return updatedStyles;
  }

  if (breakpoint) {
    // Remove property only for specific breakpoint
    const { [breakpoint]: _, ...remaining } = updatedStyles[property];
    updatedStyles[property] = remaining;

    // Remove the property entirely if no breakpoint values remain
    if (Object.keys(updatedStyles[property]).length === 0) {
      const { [property]: _, ...restStyles } = updatedStyles;
      return restStyles;
    }
  } else {
    // Remove property for all breakpoints
    const { [property]: _, ...restStyles } = updatedStyles;
    return restStyles;
  }

  return updatedStyles;
}

/**
 * Checks if a style should be applied based on media queries
 * @param breakpoint - Breakpoint to check
 * @param currentWidth - Current screen width
 * @returns Whether the style should be applied
 */
export function shouldApplyStyle(
  breakpoint: Breakpoint,
  currentWidth: number
): boolean {
  return currentWidth >= breakpoints[breakpoint];
}

/**
 * Generates responsive CSS based on component styles
 * @param componentId - Component ID
 * @param styles - Component styles
 * @returns CSS rules string
 */
export function generateResponsiveCSS(
  componentId: string,
  styles: ComponentStyles
): string {
  let cssRules: string[] = [];

  // Process each breakpoint from smallest to largest
  const orderedBreakpoints: Breakpoint[] = [
    "xs",
    "sm",
    "md",
    "lg",
    "xl",
    "2xl",
  ];

  orderedBreakpoints.forEach((breakpoint) => {
    const breakpointStyles: CSSProperties = {};

    // Collect all style properties for this breakpoint
    Object.entries(styles).forEach(([property, valuesByBreakpoint]) => {
      if (valuesByBreakpoint[breakpoint] !== undefined) {
        // Convert property name to camelCase for React style object
        const camelCaseProp = property.replace(/-([a-z])/g, (_, letter) =>
          letter.toUpperCase()
        );
        breakpointStyles[camelCaseProp as keyof CSSProperties] =
          valuesByBreakpoint[breakpoint] as any;
      }
    });

    // If we have styles for this breakpoint, create a media query rule
    if (Object.keys(breakpointStyles).length > 0) {
      const cssText = cssObjectToString(breakpointStyles);

      if (breakpoint === "xs") {
        // Base styles without media query
        cssRules.push(`#${componentId} { ${cssText} }`);
      } else {
        // Wrap in media query
        cssRules.push(
          `@media (min-width: ${breakpoints[breakpoint]}px) { #${componentId} { ${cssText} } }`
        );
      }
    }
  });

  return cssRules.join("\n");
}

/**
 * Generates CSS from theme variables
 * @param theme - Theme object with variable definitions
 * @returns CSS rules with variable definitions
 */
export function generateThemeCSS(theme: Record<string, string>): string {
  const cssVars = Object.entries(theme)
    .map(([name, value]) => `--${name}: ${value};`)
    .join("\n  ");

  return `:root {\n  ${cssVars}\n}`;
}
