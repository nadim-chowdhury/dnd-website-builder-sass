/**
 * Safely parse JSON with error handling
 * @param jsonString - JSON string to parse
 * @param fallback - Fallback value if parsing fails
 */
export const safeParseJSON = <T>(jsonString: string, fallback: T): T => {
  try {
    return JSON.parse(jsonString) as T;
  } catch (error) {
    console.error("Error parsing JSON:", error);
    return fallback;
  }
};

/**
 * Safely stringify JSON with error handling
 * @param value - Value to stringify
 * @param fallback - Fallback string if stringifying fails
 */
export const safeStringifyJSON = (
  value: any,
  fallback: string = "{}"
): string => {
  try {
    return JSON.stringify(value);
  } catch (error) {
    console.error("Error stringifying to JSON:", error);
    return fallback;
  }
};

/**
 * Safely stringify JSON with pretty formatting
 * @param value - Value to stringify
 * @param spacing - Number of spaces for indentation
 * @param fallback - Fallback string if stringifying fails
 */
export const prettyStringifyJSON = (
  value: any,
  spacing: number = 2,
  fallback: string = "{}"
): string => {
  try {
    return JSON.stringify(value, null, spacing);
  } catch (error) {
    console.error("Error creating pretty JSON:", error);
    return fallback;
  }
};

/**
 * Deep clone an object using JSON parse/stringify
 * Note: This will lose functions, undefined values, and circular references
 * @param obj - Object to clone
 */
export const jsonClone = <T>(obj: T): T => {
  return JSON.parse(JSON.stringify(obj)) as T;
};

/**
 * Check if a string is valid JSON
 * @param jsonString - String to validate
 */
export const isValidJSON = (jsonString: string): boolean => {
  try {
    JSON.parse(jsonString);
    return true;
  } catch (error) {
    return false;
  }
};

/**
 * Get specific nested value from object using path
 * @param obj - Object to traverse
 * @param path - Path to value (e.g., "user.profile.name" or ["user", "profile", "name"])
 * @param defaultValue - Default value if path doesn't exist
 */
export const getValueByPath = <T>(
  obj: Record<string, any>,
  path: string | string[],
  defaultValue?: T
): T | undefined => {
  const keys = Array.isArray(path) ? path : path.split(".");
  let result = obj;

  for (const key of keys) {
    if (result === null || result === undefined || typeof result !== "object") {
      return defaultValue;
    }
    result = result[key];
  }

  return result === undefined ? defaultValue : (result as T);
};

/**
 * Set nested value in object using path
 * @param obj - Object to modify
 * @param path - Path to value (e.g., "user.profile.name" or ["user", "profile", "name"])
 * @param value - Value to set
 */
export const setValueByPath = (
  obj: Record<string, any>,
  path: string | string[],
  value: any
): Record<string, any> => {
  const keys = Array.isArray(path) ? path : path.split(".");
  const lastKey = keys.pop();

  if (!lastKey) return obj;

  let current = obj;

  // Traverse/create path
  for (const key of keys) {
    if (
      current[key] === undefined ||
      current[key] === null ||
      typeof current[key] !== "object"
    ) {
      current[key] = {};
    }
    current = current[key];
  }

  // Set value
  current[lastKey] = value;
  return obj;
};

/**
 * Compare two objects for deep equality
 * @param obj1 - First object
 * @param obj2 - Second object
 */
export const areObjectsEqual = (obj1: any, obj2: any): boolean => {
  // Handle primitive types and null/undefined
  if (obj1 === obj2) return true;
  if (obj1 === null || obj2 === null) return false;
  if (obj1 === undefined || obj2 === undefined) return false;
  if (typeof obj1 !== "object" || typeof obj2 !== "object") return false;

  // Handle arrays
  if (Array.isArray(obj1) && Array.isArray(obj2)) {
    if (obj1.length !== obj2.length) return false;
    return obj1.every((val, idx) => areObjectsEqual(val, obj2[idx]));
  }

  // One is array, other is not
  if (Array.isArray(obj1) || Array.isArray(obj2)) return false;

  // Handle objects
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  if (keys1.length !== keys2.length) return false;

  return keys1.every(
    (key) =>
      Object.prototype.hasOwnProperty.call(obj2, key) &&
      areObjectsEqual(obj1[key], obj2[key])
  );
};

/**
 * Merge two objects deeply
 * @param target - Target object
 * @param source - Source object to merge in
 */
export const deepMerge = <T extends Record<string, any>>(
  target: T,
  source: Record<string, any>
): T => {
  const output = { ...target };

  if (isObject(target) && isObject(source)) {
    Object.keys(source).forEach((key) => {
      if (isObject(source[key])) {
        if (!(key in target)) {
          Object.assign(output, { [key]: source[key] });
        } else {
          output[key] = deepMerge(target[key], source[key]);
        }
      } else {
        Object.assign(output, { [key]: source[key] });
      }
    });
  }

  return output;
};

/**
 * Helper function to check if value is an object
 */
const isObject = (item: any): boolean => {
  return item && typeof item === "object" && !Array.isArray(item);
};

/**
 * Remove undefined values from an object (useful before JSON.stringify)
 * @param obj - Object to clean
 */
export const removeUndefined = <T extends Record<string, any>>(obj: T): T => {
  const result = { ...obj };

  Object.keys(result).forEach((key) => {
    if (result[key] === undefined) {
      delete result[key];
    } else if (isObject(result[key])) {
      result[key] = removeUndefined(result[key]);
    }
  });

  return result;
};

/**
 * Convert object to URL query string
 * @param params - Object with parameters
 */
export const objectToQueryString = (params: Record<string, any>): string => {
  return Object.keys(params)
    .filter((key) => params[key] !== undefined && params[key] !== null)
    .map((key) => {
      const value =
        typeof params[key] === "object"
          ? JSON.stringify(params[key])
          : params[key];
      return `${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
    })
    .join("&");
};

/**
 * Parse URL query string to object
 * @param queryString - Query string (with or without leading ?)
 */
export const queryStringToObject = (
  queryString: string
): Record<string, string> => {
  const result: Record<string, string> = {};

  // Remove leading ? if present
  const query = queryString.startsWith("?")
    ? queryString.substring(1)
    : queryString;

  if (!query) return result;

  const pairs = query.split("&");

  for (const pair of pairs) {
    const [key, value] = pair.split("=").map(decodeURIComponent);
    if (key) {
      result[key] = value || "";
    }
  }

  return result;
};
