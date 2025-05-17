import { v4 as uuidv4 } from "uuid";
import {
  EditorState,
  SerializedEditorState,
  ComponentData,
} from "../../types/editor";
import { componentSerializer } from "./component-serializer";
import { styleSerializer } from "./style-serializer";

/**
 * Serializes the entire editor state for persistence or exporting
 * @param state Current editor state
 * @returns Serialized representation of the editor state
 */
export const serializeState = (state: EditorState): SerializedEditorState => {
  const timestamp = new Date().toISOString();

  return {
    id: state.id || uuidv4(),
    version: "1.0.0",
    lastUpdated: timestamp,
    createdAt: state.createdAt || timestamp,
    name: state.name,
    description: state.description,
    components: state.components.map((component) =>
      componentSerializer.serialize(component)
    ),
    styles: styleSerializer.serializeAll(state.styles),
    selectedComponentId: state.selectedComponentId,
    canvas: {
      width: state.canvas.width,
      height: state.canvas.height,
      zoom: state.canvas.zoom,
      offset: {
        x: state.canvas.offset.x,
        y: state.canvas.offset.y,
      },
    },
    responsiveMode: state.responsiveMode,
    metadata: {
      ...state.metadata,
      exportedAt: timestamp,
    },
  };
};

/**
 * Deserializes a saved editor state from storage or import
 * @param serialized The serialized editor state
 * @returns A restored editor state
 */
export const deserializeState = (
  serialized: SerializedEditorState
): EditorState => {
  if (!serialized || !serialized.version) {
    throw new Error("Invalid serialized state format");
  }

  // Version compatibility check
  const supportedVersions = ["1.0.0"];
  if (!supportedVersions.includes(serialized.version)) {
    console.warn(
      `State version ${serialized.version} may not be fully compatible with the current editor`
    );
  }

  // Ensure we have a valid component structure
  const components: ComponentData[] = Array.isArray(serialized.components)
    ? serialized.components.map((component) =>
        componentSerializer.deserialize(component)
      )
    : [];

  // Build and return the deserialized state
  return {
    id: serialized.id,
    name: serialized.name || "Untitled Project",
    description: serialized.description || "",
    components,
    styles: styleSerializer.deserializeAll(serialized.styles),
    selectedComponentId: serialized.selectedComponentId || null,
    canvas: {
      width: serialized.canvas?.width || 1024,
      height: serialized.canvas?.height || 768,
      zoom: serialized.canvas?.zoom || 1,
      offset: {
        x: serialized.canvas?.offset?.x || 0,
        y: serialized.canvas?.offset?.y || 0,
      },
    },
    responsiveMode: serialized.responsiveMode || "desktop",
    createdAt: serialized.createdAt,
    lastUpdated: new Date().toISOString(),
    metadata: serialized.metadata || {},
  };
};

/**
 * Creates a new, empty editor state
 * @param options Optional configuration options
 * @returns A new editor state
 */
export const createEmptyState = (
  options: Partial<EditorState> = {}
): EditorState => {
  const timestamp = new Date().toISOString();

  return {
    id: options.id || uuidv4(),
    name: options.name || "Untitled Project",
    description: options.description || "",
    components: options.components || [],
    styles: options.styles || {},
    selectedComponentId: null,
    canvas: {
      width: options.canvas?.width || 1024,
      height: options.canvas?.height || 768,
      zoom: options.canvas?.zoom || 1,
      offset: {
        x: options.canvas?.offset?.x || 0,
        y: options.canvas?.offset?.y || 0,
      },
    },
    responsiveMode: options.responsiveMode || "desktop",
    createdAt: timestamp,
    lastUpdated: timestamp,
    metadata: options.metadata || {
      author: "",
      template: null,
    },
  };
};

/**
 * Compares two editor states and returns true if they are functionally equivalent
 * @param state1 First state to compare
 * @param state2 Second state to compare
 * @returns Boolean indicating if states are equivalent
 */
export const areStatesEqual = (
  state1: EditorState,
  state2: EditorState
): boolean => {
  // Simple identity check
  if (state1 === state2) return true;

  // Check structure equality (excluding timestamps and selection)
  if (
    state1.id !== state2.id ||
    state1.name !== state2.name ||
    state1.description !== state2.description ||
    state1.components.length !== state2.components.length ||
    state1.canvas.width !== state2.canvas.width ||
    state1.canvas.height !== state2.canvas.height ||
    state1.responsiveMode !== state2.responsiveMode
  ) {
    return false;
  }

  // Deep comparison of components
  for (let i = 0; i < state1.components.length; i++) {
    if (
      !componentSerializer.areComponentsEqual(
        state1.components[i],
        state2.components[i]
      )
    ) {
      return false;
    }
  }

  // Style comparison
  if (!styleSerializer.areStylesEqual(state1.styles, state2.styles)) {
    return false;
  }

  return true;
};

// Export combined state serialization utilities
export const stateSerializer = {
  serialize: serializeState,
  deserialize: deserializeState,
  createEmpty: createEmptyState,
  areEqual: areStatesEqual,
};

export default stateSerializer;
