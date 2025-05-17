import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  StyleProperty,
  ComponentStyle,
  ResponsiveBreakpoint,
  StylePreset,
} from "../../types/editor";
import { historyManager } from "../history/history-manager";
import { styleValidator } from "../validators/style-validator";
import { styleSerializer } from "../serializer/style-serializer";
import { StylingEngine } from "../engine/styling-engine";

// Create a styling engine instance
const stylingEngine = new StylingEngine();

/**
 * Updates a style property for a specific component
 */
export const updateComponentStyle = createAsyncThunk(
  "builder/updateComponentStyle",
  async (
    {
      componentId,
      property,
      value,
      breakpoint = "default",
    }: {
      componentId: string;
      property: StyleProperty;
      value: string | number;
      breakpoint?: ResponsiveBreakpoint;
    },
    { dispatch, getState }
  ) => {
    // Save current state for undo
    historyManager.saveSnapshot(getState());

    // Validate the style value
    const isValid = styleValidator.validateStyleProperty(property, value);
    if (!isValid) {
      throw new Error(
        `Invalid style value: ${value} for property: ${property}`
      );
    }

    // Return the validated data
    return { componentId, property, value, breakpoint };
  }
);

/**
 * Removes a style property from a component
 */
export const removeComponentStyle = createAsyncThunk(
  "builder/removeComponentStyle",
  async (
    {
      componentId,
      property,
      breakpoint = "default",
    }: {
      componentId: string;
      property: StyleProperty;
      breakpoint?: ResponsiveBreakpoint;
    },
    { dispatch, getState }
  ) => {
    // Save current state for undo
    historyManager.saveSnapshot(getState());

    return { componentId, property, breakpoint };
  }
);

/**
 * Updates multiple style properties for a component at once
 */
export const updateComponentStyles = createAsyncThunk(
  "builder/updateComponentStyles",
  async (
    {
      componentId,
      styles,
      breakpoint = "default",
    }: {
      componentId: string;
      styles: Partial<ComponentStyle>;
      breakpoint?: ResponsiveBreakpoint;
    },
    { dispatch, getState }
  ) => {
    // Save current state for undo
    historyManager.saveSnapshot(getState());

    // Validate all style values
    for (const [property, value] of Object.entries(styles)) {
      const isValid = styleValidator.validateStyleProperty(
        property as StyleProperty,
        value
      );
      if (!isValid) {
        throw new Error(
          `Invalid style value: ${value} for property: ${property}`
        );
      }
    }

    return { componentId, styles, breakpoint };
  }
);

/**
 * Copies styles from one component to another
 */
export const copyStyles = createAsyncThunk(
  "builder/copyStyles",
  async (
    {
      sourceComponentId,
      targetComponentId,
      properties = "all",
      breakpoints = ["default"],
    }: {
      sourceComponentId: string;
      targetComponentId: string;
      properties?: StyleProperty[] | "all";
      breakpoints?: ResponsiveBreakpoint[];
    },
    { dispatch, getState }
  ) => {
    // Save current state for undo
    historyManager.saveSnapshot(getState());

    const state = getState() as any;
    const sourceComponent = state.builder.components[sourceComponentId];

    if (!sourceComponent) {
      throw new Error(`Source component not found: ${sourceComponentId}`);
    }

    return { sourceComponentId, targetComponentId, properties, breakpoints };
  }
);

/**
 * Applies a style preset to a component
 */
export const applyStylePreset = createAsyncThunk(
  "builder/applyStylePreset",
  async (
    {
      componentId,
      presetId,
    }: {
      componentId: string;
      presetId: string;
    },
    { dispatch, getState }
  ) => {
    // Save current state for undo
    historyManager.saveSnapshot(getState());

    const state = getState() as any;
    const preset = state.builder.stylePresets[presetId];

    if (!preset) {
      throw new Error(`Style preset not found: ${presetId}`);
    }

    return { componentId, preset };
  }
);

/**
 * Creates a new style preset from a component's styles
 */
export const createStylePreset = createAsyncThunk(
  "builder/createStylePreset",
  async (
    {
      componentId,
      presetName,
      properties = "all",
      breakpoints = ["default"],
    }: {
      componentId: string;
      presetName: string;
      properties?: StyleProperty[] | "all";
      breakpoints?: ResponsiveBreakpoint[];
    },
    { dispatch, getState }
  ) => {
    const state = getState() as any;
    const component = state.builder.components[componentId];

    if (!component) {
      throw new Error(`Component not found: ${componentId}`);
    }

    // Extract styles from the component
    const styles = stylingEngine.extractStyles(
      component,
      properties,
      breakpoints
    );

    // Create a new preset object
    const newPreset: StylePreset = {
      id: `preset_${Date.now()}`,
      name: presetName,
      styles: styles,
      createdAt: new Date().toISOString(),
    };

    return newPreset;
  }
);

/**
 * Sets up responsive styles for a component
 */
export const setupResponsiveStyles = createAsyncThunk(
  "builder/setupResponsiveStyles",
  async (
    {
      componentId,
      breakpoint,
      inheritFromDefault = true,
    }: {
      componentId: string;
      breakpoint: ResponsiveBreakpoint;
      inheritFromDefault?: boolean;
    },
    { dispatch, getState }
  ) => {
    // Save current state for undo
    historyManager.saveSnapshot(getState());

    const state = getState() as any;
    const component = state.builder.components[componentId];

    if (!component) {
      throw new Error(`Component not found: ${componentId}`);
    }

    // If inheriting, copy default styles first
    let initialStyles = {};
    if (inheritFromDefault && component.styles && component.styles.default) {
      initialStyles = { ...component.styles.default };
    }

    return { componentId, breakpoint, initialStyles };
  }
);

/**
 * Resets all styles for a component
 */
export const resetComponentStyles = createAsyncThunk(
  "builder/resetComponentStyles",
  async (
    {
      componentId,
      breakpoints = "all",
    }: {
      componentId: string;
      breakpoints?: ResponsiveBreakpoint[] | "all";
    },
    { dispatch, getState }
  ) => {
    // Save current state for undo
    historyManager.saveSnapshot(getState());

    return { componentId, breakpoints };
  }
);

/**
 * Imports styles from a CSS string
 */
export const importStyles = createAsyncThunk(
  "builder/importStyles",
  async (
    {
      componentId,
      cssString,
      overwrite = false,
    }: {
      componentId: string;
      cssString: string;
      overwrite?: boolean;
    },
    { dispatch, getState }
  ) => {
    // Save current state for undo
    historyManager.saveSnapshot(getState());

    try {
      // Parse CSS string into style object
      const parsedStyles = styleSerializer.cssStringToStyleObject(cssString);

      return { componentId, styles: parsedStyles, overwrite };
    } catch (error) {
      throw new Error(`Failed to parse CSS: ${error.message}`);
    }
  }
);

/**
 * Exports component styles to CSS
 */
export const exportStyles = createAsyncThunk(
  "builder/exportStyles",
  async (
    {
      componentId,
      includeBreakpoints = true,
    }: {
      componentId: string;
      includeBreakpoints?: boolean;
    },
    { getState }
  ) => {
    const state = getState() as any;
    const component = state.builder.components[componentId];

    if (!component) {
      throw new Error(`Component not found: ${componentId}`);
    }

    // Convert style object to CSS string
    const cssString = styleSerializer.styleObjectToCssString(
      component.styles,
      component.id,
      includeBreakpoints
    );

    return cssString;
  }
);

/**
 * Updates global theme variables
 */
export const updateThemeVariable = createAsyncThunk(
  "builder/updateThemeVariable",
  async (
    {
      variableName,
      value,
    }: {
      variableName: string;
      value: string;
    },
    { dispatch, getState }
  ) => {
    // Save current state for undo
    historyManager.saveSnapshot(getState());

    return { variableName, value };
  }
);

/**
 * Gets computed styles for a component including all applied styles,
 * inheritance, and variable substitutions
 */
export const getComputedStyles = createAsyncThunk(
  "builder/getComputedStyles",
  async (
    {
      componentId,
      breakpoint = "default",
    }: {
      componentId: string;
      breakpoint?: ResponsiveBreakpoint;
    },
    { getState }
  ) => {
    const state = getState() as any;
    const component = state.builder.components[componentId];

    if (!component) {
      throw new Error(`Component not found: ${componentId}`);
    }

    // Get computed styles including inherited styles and variable substitutions
    const computedStyles = stylingEngine.computeStyles(
      component,
      state.builder.components,
      breakpoint,
      state.builder.themeVariables
    );

    return { componentId, breakpoint, computedStyles };
  }
);

/**
 * Applies a style transition to a component
 */
export const applyStyleTransition = createAsyncThunk(
  "builder/applyStyleTransition",
  async (
    {
      componentId,
      transitionName,
      duration = 300,
      timingFunction = "ease",
    }: {
      componentId: string;
      transitionName: "fade" | "slide" | "scale" | "rotate" | "custom";
      duration?: number;
      timingFunction?: string;
    },
    { dispatch, getState }
  ) => {
    // Save current state for undo
    historyManager.saveSnapshot(getState());

    // Get transition properties based on transition name
    const transitionProperties = stylingEngine.getTransitionProperties(
      transitionName,
      duration,
      timingFunction
    );

    return { componentId, transitionProperties };
  }
);
