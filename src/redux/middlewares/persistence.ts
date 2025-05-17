import { Middleware } from "redux";
import { RootState } from "../store";

// Configuration for persistence middleware
interface PersistenceConfig {
  // Key prefix for storage
  keyPrefix: string;
  // State paths to persist (e.g., ['user', 'projects'])
  paths: string[];
  // Storage engine (defaults to localStorage)
  storage: Storage;
  // Debounce time in ms (to prevent too frequent saves)
  debounceTime: number;
  // Actions that trigger persistence
  persistOnActions: string[];
  // Whether to load state on initialization
  loadOnInit: boolean;
  // Whether this middleware is enabled
  enabled: boolean;
}

// Default configuration
const DEFAULT_CONFIG: PersistenceConfig = {
  keyPrefix: "web-builder-",
  paths: ["projects", "user.preferences"],
  storage: typeof window !== "undefined" ? window.localStorage : (null as any),
  debounceTime: 1000,
  persistOnActions: [
    // Project actions
    "projects/createProject",
    "projects/updateProject",
    "projects/deleteProject",
    // User preference actions
    "user/updatePreferences",
    "user/setTheme",
    "user/setLanguage",
  ],
  loadOnInit: true,
  enabled: typeof window !== "undefined",
};

// Helper functions
const getNestedValue = (obj: any, path: string): any => {
  return path
    .split(".")
    .reduce(
      (acc, part) => (acc && acc[part] !== undefined ? acc[part] : undefined),
      obj
    );
};

const setNestedValue = (obj: any, path: string, value: any): any => {
  const parts = path.split(".");
  if (parts.length === 1) {
    return { ...obj, [path]: value };
  }

  const [first, ...rest] = parts;
  return {
    ...obj,
    [first]: setNestedValue(obj[first] || {}, rest.join("."), value),
  };
};

// Create persistence middleware
export const createPersistenceMiddleware = (
  customConfig?: Partial<PersistenceConfig>
): Middleware<{}, RootState> => {
  const config: PersistenceConfig = { ...DEFAULT_CONFIG, ...customConfig };

  // Ensure we have a valid storage engine
  if (!config.storage && config.enabled) {
    console.warn(
      "Persistence middleware: No storage engine provided and running in a browser environment. Disabling persistence."
    );
    config.enabled = false;
  }

  // To track pending saves
  let debounceTimers: Record<string, NodeJS.Timeout> = {};

  // Function to persist state
  const persistState = (state: RootState, path: string) => {
    // Clear any existing timer for this path
    if (debounceTimers[path]) {
      clearTimeout(debounceTimers[path]);
    }

    // Set a new timer
    debounceTimers[path] = setTimeout(() => {
      try {
        const value = getNestedValue(state, path);
        if (value !== undefined) {
          const key = `${config.keyPrefix}${path.replace(".", "-")}`;
          config.storage.setItem(key, JSON.stringify(value));
        }
      } catch (err) {
        console.error(`Failed to persist state at path '${path}':`, err);
      }

      // Clear the timer reference
      delete debounceTimers[path];
    }, config.debounceTime);
  };

  // Function to load initial state
  const loadInitialState = (): Partial<RootState> => {
    let loadedState: Partial<RootState> = {};

    if (!config.enabled) return loadedState;

    for (const path of config.paths) {
      try {
        const key = `${config.keyPrefix}${path.replace(".", "-")}`;
        const storedValue = config.storage.getItem(key);

        if (storedValue) {
          const value = JSON.parse(storedValue);
          loadedState = setNestedValue(loadedState, path, value);
        }
      } catch (err) {
        console.error(`Failed to load persisted state at path '${path}':`, err);
      }
    }

    return loadedState;
  };

  // Create and return the middleware
  return (store) => {
    // Load initial state if enabled
    if (config.enabled && config.loadOnInit) {
      const initialState = loadInitialState();

      // If we have initial state, dispatch a hydrate action
      if (Object.keys(initialState).length > 0) {
        setTimeout(() => {
          store.dispatch({
            type: "persistence/hydrate",
            payload: initialState,
          });
        }, 0);
      }
    }

    return (next) => (action) => {
      // Call next middleware
      const result = next(action);

      // Check if we should persist on this action
      if (
        config.enabled &&
        (config.persistOnActions.includes(action.type) ||
          action.type === "persistence/persist")
      ) {
        const state = store.getState();

        // Persist each configured path
        for (const path of config.paths) {
          persistState(state, path);
        }
      }

      return result;
    };
  };
};

// Export default persistence middleware
export const persistenceMiddleware = createPersistenceMiddleware();
