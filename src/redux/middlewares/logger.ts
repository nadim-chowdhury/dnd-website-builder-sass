import { Middleware } from "redux";
import { RootState } from "../store";

// Default logger configuration
const DEFAULT_CONFIG = {
  // Actions that shouldn't be logged (e.g. frequent updates that would clutter the console)
  ignoredActions: [
    "builder/hoverComponent",
    "builder/updateSelectionBox",
    "builder/updateDragPreview",
  ],
  // Whether to log the full action object
  logActionObject: false,
  // Whether to log the previous and next state
  logState: false,
  // Whether this middleware is enabled
  enabled: process.env.NODE_ENV === "development",
};

// Logger middleware configuration type
export type LoggerConfig = Partial<typeof DEFAULT_CONFIG>;

// Create a logger middleware with custom configuration
export const createLoggerMiddleware = (
  customConfig?: LoggerConfig
): Middleware<{}, RootState> => {
  const config = { ...DEFAULT_CONFIG, ...customConfig };

  return (store) => (next) => (action) => {
    // Skip logging if disabled or action is in ignored list
    if (!config.enabled || config.ignoredActions.includes(action.type)) {
      return next(action);
    }

    // Get current state
    const prevState = config.logState ? store.getState() : null;

    // Group collapsed in console for better readability
    const actionType = `action ${action.type}`;
    console.groupCollapsed(
      `%c ${actionType}`,
      "color: #738ADB; font-weight: bold"
    );

    // Log action
    console.log(
      "%c Action:",
      "color: #738ADB; font-weight: bold",
      config.logActionObject ? action : action.type
    );

    // Log payload if exists
    if (action.payload !== undefined) {
      console.log(
        "%c Payload:",
        "color: #47B04B; font-weight: bold",
        action.payload
      );
    }

    // Log error if exists
    if (action.error) {
      console.log(
        "%c Error:",
        "color: #FF0000; font-weight: bold",
        action.error
      );
    }

    // Log meta if exists
    if (action.meta) {
      console.log("%c Meta:", "color: #FF9800; font-weight: bold", action.meta);
    }

    if (config.logState) {
      console.log(
        "%c Previous State:",
        "color: #9E9E9E; font-weight: bold",
        prevState
      );
    }

    console.groupEnd();

    // Call next middleware
    const result = next(action);

    // Log next state if enabled
    if (config.logState) {
      const nextState = store.getState();

      console.groupCollapsed(
        `%c State after ${action.type}`,
        "color: #7B68EE; font-weight: bold"
      );
      console.log(
        "%c Next State:",
        "color: #7B68EE; font-weight: bold",
        nextState
      );
      console.groupEnd();
    }

    return result;
  };
};

// Export default logger middleware
export const loggerMiddleware = createLoggerMiddleware();
