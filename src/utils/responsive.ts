import { Breakpoint } from "@/types/editor";

// Define standard breakpoints (in pixels)
export const breakpoints = {
  xs: 320,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
};

// Device types used throughout the application
export type DeviceType = "mobile" | "tablet" | "desktop";

// Mapping between device types and their corresponding breakpoints
export const deviceBreakpoints: Record<DeviceType, Breakpoint> = {
  mobile: "sm",
  tablet: "md",
  desktop: "lg",
};

/**
 * Gets the current device type based on screen width
 * @param width - Current screen width in pixels
 * @returns The detected device type
 */
export function getDeviceType(width: number): DeviceType {
  if (width < breakpoints.md) {
    return "mobile";
  } else if (width < breakpoints.lg) {
    return "tablet";
  } else {
    return "desktop";
  }
}

/**
 * Checks if a given breakpoint is active based on screen width
 * @param breakpoint - The breakpoint to check
 * @param width - Current screen width in pixels
 * @returns Whether the breakpoint is active
 */
export function isBreakpointActive(
  breakpoint: Breakpoint,
  width: number
): boolean {
  return width >= breakpoints[breakpoint];
}

/**
 * Returns the active breakpoint based on the current width
 * @param width - Current screen width in pixels
 * @returns The active breakpoint
 */
export function getActiveBreakpoint(width: number): Breakpoint {
  if (width < breakpoints.sm) return "xs";
  if (width < breakpoints.md) return "sm";
  if (width < breakpoints.lg) return "md";
  if (width < breakpoints.xl) return "lg";
  if (width < breakpoints["2xl"]) return "xl";
  return "2xl";
}

/**
 * Gets the CSS media query for a specific breakpoint
 * @param breakpoint - The breakpoint to get the media query for
 * @returns The media query string
 */
export function getMediaQuery(breakpoint: Breakpoint): string {
  return `@media (min-width: ${breakpoints[breakpoint]}px)`;
}

/**
 * Helper to generate responsive classes based on the active breakpoint
 * @param baseClass - The base CSS class name
 * @param breakpoint - The active breakpoint
 * @returns The combined responsive class name
 */
export function getResponsiveClassName(
  baseClass: string,
  breakpoint: Breakpoint
): string {
  return `${baseClass}-${breakpoint}`;
}

/**
 * Generates CSS rules for responsive styling
 * @param property - CSS property name
 * @param value - CSS property value
 * @param breakpoint - The breakpoint to apply the style to
 * @returns CSS style rule
 */
export function generateResponsiveStyle(
  property: string,
  value: string,
  breakpoint: Breakpoint
): string {
  if (breakpoint === "xs") {
    return `${property}: ${value};`;
  }
  return `${getMediaQuery(breakpoint)} { ${property}: ${value}; }`;
}

/**
 * Finds the next largest breakpoint
 * @param current - The current breakpoint
 * @returns The next breakpoint or undefined if already at largest
 */
export function getNextBreakpoint(current: Breakpoint): Breakpoint | undefined {
  const breakpointList: Breakpoint[] = ["xs", "sm", "md", "lg", "xl", "2xl"];
  const currentIndex = breakpointList.indexOf(current);

  if (currentIndex < breakpointList.length - 1) {
    return breakpointList[currentIndex + 1];
  }

  return undefined;
}

/**
 * Finds the previous smaller breakpoint
 * @param current - The current breakpoint
 * @returns The previous breakpoint or undefined if already at smallest
 */
export function getPreviousBreakpoint(
  current: Breakpoint
): Breakpoint | undefined {
  const breakpointList: Breakpoint[] = ["xs", "sm", "md", "lg", "xl", "2xl"];
  const currentIndex = breakpointList.indexOf(current);

  if (currentIndex > 0) {
    return breakpointList[currentIndex - 1];
  }

  return undefined;
}

/**
 * Calculates responsive dimensions based on container size and device type
 * @param baseSize - The base size value
 * @param deviceType - Current device type
 * @returns Adjusted size for the current device
 */
export function getResponsiveDimension(
  baseSize: number,
  deviceType: DeviceType
): number {
  const scaleFactor = {
    mobile: 0.4,
    tablet: 0.7,
    desktop: 1,
  };

  return Math.floor(baseSize * scaleFactor[deviceType]);
}

/**
 * Determines if the current view should use the mobile layout
 * @param width - Current screen width
 * @returns Boolean indicating if mobile layout should be used
 */
export function shouldUseMobileLayout(width: number): boolean {
  return width < breakpoints.md;
}

/**
 * Creates a responsive value object for all breakpoints
 * @param defaultValue - The default value to use
 * @returns Object with values for each breakpoint
 */
export function createResponsiveValue<T>(
  defaultValue: T
): Record<Breakpoint, T> {
  return {
    xs: defaultValue,
    sm: defaultValue,
    md: defaultValue,
    lg: defaultValue,
    xl: defaultValue,
    "2xl": defaultValue,
  };
}

/**
 * Gets the appropriate value for the current breakpoint
 * @param responsiveValues - Object containing values for different breakpoints
 * @param currentBreakpoint - Current active breakpoint
 * @returns The value for the current breakpoint
 */
export function getValueForBreakpoint<T>(
  responsiveValues: Partial<Record<Breakpoint, T>>,
  currentBreakpoint: Breakpoint
): T | undefined {
  // Try to find the value for the current breakpoint or fall back to smaller breakpoints
  const breakpointOrder: Breakpoint[] = ["xs", "sm", "md", "lg", "xl", "2xl"];
  const currentIndex = breakpointOrder.indexOf(currentBreakpoint);

  // Check current and all smaller breakpoints, starting from current and going down
  for (let i = currentIndex; i >= 0; i--) {
    const breakpoint = breakpointOrder[i];
    if (responsiveValues[breakpoint] !== undefined) {
      return responsiveValues[breakpoint];
    }
  }

  return undefined;
}
