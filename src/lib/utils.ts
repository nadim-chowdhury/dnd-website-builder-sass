import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { Component, ComponentType, ComponentProps } from "@/types/components";

/**
 * Combines class names with tailwind utilities
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Generates a unique ID with optional prefix
 */
export function generateId(prefix = ""): string {
  const timestamp = Date.now().toString(36);
  const randomStr = Math.random().toString(36).substring(2, 9);
  return prefix
    ? `${prefix}-${timestamp}-${randomStr}`
    : `${timestamp}-${randomStr}`;
}

/**
 * Debounces a function call
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;

  return function (...args: Parameters<T>) {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

/**
 * Throttles a function call
 */
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle = false;

  return function (...args: Parameters<T>) {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

/**
 * Format date to localized string
 */
export function formatDate(date: Date | string): string {
  const d = typeof date === "string" ? new Date(date) : date;
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

/**
 * Safely parse JSON with error handling
 */
export function safeJsonParse<T>(json: string, fallback: T): T {
  try {
    return JSON.parse(json) as T;
  } catch (error) {
    console.error("Error parsing JSON:", error);
    return fallback;
  }
}

/**
 * Truncate text to specified length with ellipsis
 */
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + "...";
}

/**
 * Check if running on client-side
 */
export const isClient = typeof window !== "undefined";

/**
 * Check if running on server-side
 */
export const isServer = typeof window === "undefined";

/**
 * Convert camelCase to kebab-case
 */
export function camelToKebabCase(str: string): string {
  return str.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
}

/**
 * Convert kebab-case to camelCase
 */
export function kebabToCamelCase(str: string): string {
  return str.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase());
}

/**
 * Sleep function for async operations
 */
export const sleep = (ms: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Download data as a file
 */
export function downloadFile(
  data: string,
  filename: string,
  type: string
): void {
  if (!isClient) return;

  const blob = new Blob([data], { type });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

/**
 * Copy text to clipboard
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  if (!isClient) return false;

  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (error) {
    console.error("Failed to copy text:", error);
    // Fallback for older browsers
    try {
      const textArea = document.createElement("textarea");
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      return true;
    } catch (fallbackError) {
      console.error("Fallback copy failed:", fallbackError);
      return false;
    }
  }
}

/**
 * Get viewport dimensions
 */
export function getViewportDimensions(): { width: number; height: number } {
  if (!isClient) return { width: 0, height: 0 };

  return {
    width: window.innerWidth,
    height: window.innerHeight,
  };
}

/**
 * Check if element is in viewport
 */
export function isInViewport(element: HTMLElement): boolean {
  if (!isClient) return false;

  const rect = element.getBoundingClientRect();

  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= window.innerHeight &&
    rect.right <= window.innerWidth
  );
}

/**
 * Get URL query parameters as object
 */
export function getQueryParams(): Record<string, string> {
  if (!isClient) return {};

  const params = new URLSearchParams(window.location.search);
  const result: Record<string, string> = {};

  params.forEach((value, key) => {
    result[key] = value;
  });

  return result;
}

/**
 * Deep clone an object (handles circular references)
 */
export function deepClone<T>(obj: T): T {
  if (obj === null || typeof obj !== "object") return obj;
  if (obj instanceof Date) return new Date(obj.getTime()) as unknown as T;
  if (obj instanceof Array)
    return obj.map((item) => deepClone(item)) as unknown as T;
  if (typeof obj === "object") {
    const clonedObj = {} as { [key: string]: any };
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        clonedObj[key] = deepClone(obj[key]);
      }
    }
    return clonedObj as T;
  }
  return obj;
}

/**
 * Capitalize first letter of string
 */
export function capitalizeFirstLetter(string: string): string {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

/**
 * Convert string to title case
 */
export function toTitleCase(str: string): string {
  return str.replace(
    /\w\S*/g,
    (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
  );
}

/**
 * Remove HTML tags from string
 */
export function stripHtml(html: string): string {
  const doc = new DOMParser().parseFromString(html, "text/html");
  return doc.body.textContent || "";
}

/**
 * Check if object is empty
 */
export function isEmpty(obj: any): boolean {
  if (obj == null) return true;
  if (Array.isArray(obj) || typeof obj === "string") return obj.length === 0;
  if (typeof obj === "object") return Object.keys(obj).length === 0;
  return false;
}

/**
 * Get nested object property safely
 */
export function getNestedValue(
  obj: any,
  path: string,
  defaultValue: any = undefined
): any {
  const keys = path.split(".");
  let result = obj;

  for (const key of keys) {
    if (result == null || typeof result !== "object") {
      return defaultValue;
    }
    result = result[key];
  }

  return result !== undefined ? result : defaultValue;
}

/**
 * Set nested object property safely
 */
export function setNestedValue(obj: any, path: string, value: any): void {
  const keys = path.split(".");
  const lastKey = keys.pop();

  if (!lastKey) return;

  let current = obj;
  for (const key of keys) {
    if (!(key in current) || typeof current[key] !== "object") {
      current[key] = {};
    }
    current = current[key];
  }

  current[lastKey] = value;
}

/**
 * Validate email format
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validate URL format
 */
export function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

/**
 * Generate color variations
 */
export function generateColorVariations(baseColor: string): {
  light: string;
  dark: string;
  muted: string;
} {
  // This is a simplified version - you might want to use a color manipulation library
  return {
    light: `${baseColor}20`, // Add transparency for light version
    dark: baseColor,
    muted: `${baseColor}60`, // Add transparency for muted version
  };
}

/**
 * Component-specific utility functions
 */

/**
 * Build component tree from flat array
 */
export function buildComponentTree(components: Component[]): Component[] {
  const componentMap = new Map<string, Component>();
  const roots: Component[] = [];

  // Create a map for quick lookup
  components.forEach((component) => {
    componentMap.set(component.id, { ...component, children: [] });
  });

  // Build the tree structure
  components.forEach((component) => {
    const comp = componentMap.get(component.id)!;

    if (component.parentId && componentMap.has(component.parentId)) {
      const parent = componentMap.get(component.parentId)!;
      if (!parent.children) parent.children = [];
      parent.children.push(comp.id);
    } else {
      roots.push(comp);
    }
  });

  // Sort children by order
  componentMap.forEach((component) => {
    if (component.children && component.children.length > 0) {
      component.children.sort((a, b) => {
        const compA = componentMap.get(a);
        const compB = componentMap.get(b);
        return (compA?.order || 0) - (compB?.order || 0);
      });
    }
  });

  return roots.sort((a, b) => a.order - b.order);
}

/**
 * Find component by ID in tree
 */
export function findComponentById(
  components: Component[],
  id: string
): Component | null {
  for (const component of components) {
    if (component.id === id) return component;

    if (component.children) {
      const childComponents = component.children
        .map((childId) => components.find((c) => c.id === childId))
        .filter(Boolean) as Component[];

      const found = findComponentById(childComponents, id);
      if (found) return found;
    }
  }
  return null;
}

/**
 * Get all parent components of a given component
 */
export function getComponentParents(
  components: Component[],
  componentId: string
): Component[] {
  const parents: Component[] = [];
  let currentComponent = components.find((c) => c.id === componentId);

  while (currentComponent?.parentId) {
    const parent = components.find((c) => c.id === currentComponent!.parentId);
    if (parent) {
      parents.unshift(parent);
      currentComponent = parent;
    } else {
      break;
    }
  }

  return parents;
}

/**
 * Check if component can accept children
 */
export function canAcceptChildren(componentType: ComponentType): boolean {
  const containerTypes = [
    ComponentType.CONTAINER,
    ComponentType.SECTION,
    ComponentType.GRID,
    ComponentType.COLUMN,
    ComponentType.FORM,
    ComponentType.HEADER,
    ComponentType.FOOTER,
    ComponentType.NAVIGATION,
  ];

  return containerTypes.includes(componentType);
}

/**
 * Sanitize component props
 */
export function sanitizeProps(props: ComponentProps): ComponentProps {
  const sanitized = { ...props };

  // Remove potentially harmful props
  delete sanitized.dangerouslySetInnerHTML;
  delete sanitized.ref;

  // Sanitize string values
  Object.keys(sanitized).forEach((key) => {
    if (typeof sanitized[key] === "string") {
      // Basic XSS prevention
      sanitized[key] = sanitized[key]
        .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
        .replace(/javascript:/gi, "")
        .replace(/on\w+="[^"]*"/gi, "");
    }
  });

  return sanitized;
}

/**
 * Generate component display name
 */
export function getComponentDisplayName(component: Component): string {
  return (
    component.name || toTitleCase(component.type.replace(/([A-Z])/g, " $1"))
  );
}

/**
 * Check if drag operation is valid
 */
export function isValidDropTarget(
  draggedType: ComponentType,
  targetType: ComponentType,
  targetComponent?: Component
): boolean {
  // Can't drop on self
  if (draggedType === targetType) return false;

  // Can't drop container components into non-container components
  const containerTypes = [
    ComponentType.CONTAINER,
    ComponentType.SECTION,
    ComponentType.GRID,
  ];

  const elementTypes = [
    ComponentType.TEXT,
    ComponentType.HEADING,
    ComponentType.BUTTON,
    ComponentType.IMAGE,
    ComponentType.ICON,
  ];

  if (
    containerTypes.includes(draggedType) &&
    elementTypes.includes(targetType)
  ) {
    return false;
  }

  // Form inputs can only be dropped in forms
  const formInputTypes = [
    ComponentType.INPUT,
    ComponentType.TEXTAREA,
    ComponentType.SELECT,
    ComponentType.CHECKBOX,
    ComponentType.RADIO,
    ComponentType.SUBMIT_BUTTON,
  ];

  if (
    formInputTypes.includes(draggedType) &&
    targetType !== ComponentType.FORM
  ) {
    return false;
  }

  return true;
}

/**
 * Generate component default props based on type
 */
export function getDefaultProps(type: ComponentType): ComponentProps {
  const defaults: Record<ComponentType, ComponentProps> = {
    [ComponentType.TEXT]: { content: "Add your text here" },
    [ComponentType.HEADING]: { content: "Heading", level: 1 },
    [ComponentType.BUTTON]: { label: "Button", variant: "primary" },
    [ComponentType.IMAGE]: { src: "/api/placeholder/300/200", alt: "Image" },
    [ComponentType.CONTAINER]: { maxWidth: "1200px" },
    [ComponentType.GRID]: { columns: 2, gap: 16 },
    [ComponentType.INPUT]: {
      name: "input",
      type: "text",
      placeholder: "Enter text",
    },
    [ComponentType.TEXTAREA]: { name: "textarea", rows: 4 },
    [ComponentType.SELECT]: {
      name: "select",
      options: [{ value: "option1", label: "Option 1" }],
    },
    // Add defaults for other component types
    [ComponentType.SECTION]: {},
    [ComponentType.COLUMN]: {},
    [ComponentType.DIVIDER]: {},
    [ComponentType.SPACER]: {},
    [ComponentType.VIDEO]: { src: "", controls: true },
    [ComponentType.ICON]: { name: "star", size: "medium" },
    [ComponentType.LINK]: { href: "#", content: "Link" },
    [ComponentType.FORM]: { method: "POST" },
    [ComponentType.CHECKBOX]: { name: "checkbox" },
    [ComponentType.RADIO]: { name: "radio" },
    [ComponentType.SUBMIT_BUTTON]: { label: "Submit", type: "submit" },
    [ComponentType.PRODUCT_LIST]: { columns: 3 },
    [ComponentType.PRODUCT_CARD]: {},
    [ComponentType.PRODUCT_FILTER]: {},
    [ComponentType.CART]: {},
    [ComponentType.CHECKOUT]: {},
    [ComponentType.HEADER]: {},
    [ComponentType.FOOTER]: {},
    [ComponentType.NAVIGATION]: { items: [], orientation: "horizontal" },
    [ComponentType.LOGO]: {},
    [ComponentType.PLACEHOLDER]: {},
    [ComponentType.CUSTOM]: {},
  };

  return defaults[type] || {};
}
