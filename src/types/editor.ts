import { Component, ComponentType } from "./components";
import { CSSProperties } from "react";

// Editor state
export interface EditorState {
  projectId: string;
  components: Component[];
  selectedComponentId: string | null;
  hoveredComponentId: string | null;
  canvas: CanvasState;
  history: HistoryState;
  clipboard: ClipboardState | null;
  responsive: ResponsiveState;
  isDragging: boolean;
}

// Canvas state
export interface CanvasState {
  zoom: number;
  pan: { x: number; y: number };
  grid: GridSettings;
  guides: GuideLine[];
  scrollPosition: { x: number; y: number };
}

// Grid settings
export interface GridSettings {
  visible: boolean;
  size: number; // Grid cell size in pixels
  color: string;
  snapToGrid: boolean;
}

// Guide line
export interface GuideLine {
  id: string;
  position: number;
  orientation: "horizontal" | "vertical";
  color: string;
}

// History state
export interface HistoryState {
  undoStack: HistoryAction[];
  redoStack: HistoryAction[];
  lastSavedIndex: number;
}

// History action
export interface HistoryAction {
  type: HistoryActionType;
  componentId?: string;
  timestamp: number;
  payload: any;
  description: string;
}

// History action types
export enum HistoryActionType {
  ADD_COMPONENT = "addComponent",
  DELETE_COMPONENT = "deleteComponent",
  MOVE_COMPONENT = "moveComponent",
  EDIT_COMPONENT = "editComponent",
  STYLE_COMPONENT = "styleComponent",
  REORDER_COMPONENT = "reorderComponent",
  DUPLICATE_COMPONENT = "duplicateComponent",
  MULTI_COMPONENT_ACTION = "multiComponentAction",
}

// Clipboard state
export interface ClipboardState {
  components: Component[];
  operation: "cut" | "copy";
  timestamp: number;
}

// Responsive state
export interface ResponsiveState {
  activeBreakpoint: Breakpoint;
  previewMode: boolean;
}

// Breakpoint definition
export interface Breakpoint {
  id: string;
  name: string;
  width: number;
  height?: number;
  icon: string;
  order: number;
}

// Standard breakpoints
export const BREAKPOINTS: Record<string, Breakpoint> = {
  DESKTOP: {
    id: "desktop",
    name: "Desktop",
    width: 1280,
    icon: "computer",
    order: 1,
  },
  TABLET: {
    id: "tablet",
    name: "Tablet",
    width: 768,
    icon: "tablet",
    order: 2,
  },
  MOBILE: {
    id: "mobile",
    name: "Mobile",
    width: 360,
    icon: "smartphone",
    order: 3,
  },
};

// Styling related types

// Basic style property
export interface StyleProperty {
  value: string | number;
  unit?: string;
  breakpoint?: string;
  important?: boolean;
}

// Style properties grouped by category
export interface StyleProperties {
  layout?: LayoutStyles;
  typography?: TypographyStyles;
  spacing?: SpacingStyles;
  borders?: BorderStyles;
  effects?: EffectStyles;
  positioning?: PositioningStyles;
  background?: BackgroundStyles;
  [key: string]: any; // For custom style categories
}

// Layout styles
export interface LayoutStyles {
  display?: StyleProperty;
  width?: StyleProperty;
  height?: StyleProperty;
  minWidth?: StyleProperty;
  maxWidth?: StyleProperty;
  minHeight?: StyleProperty;
  maxHeight?: StyleProperty;
  overflow?: StyleProperty;
  visibility?: StyleProperty;
  zIndex?: StyleProperty;
  opacity?: StyleProperty;
  flexDirection?: StyleProperty;
  flexWrap?: StyleProperty;
  justifyContent?: StyleProperty;
  alignItems?: StyleProperty;
  gap?: StyleProperty;
  aspectRatio?: StyleProperty;
}

// Typography styles
export interface TypographyStyles {
  fontFamily?: StyleProperty;
  fontSize?: StyleProperty;
  fontWeight?: StyleProperty;
  lineHeight?: StyleProperty;
  textAlign?: StyleProperty;
  textDecoration?: StyleProperty;
  textTransform?: StyleProperty;
  letterSpacing?: StyleProperty;
  color?: StyleProperty;
  wordBreak?: StyleProperty;
  whiteSpace?: StyleProperty;
}

// Spacing styles
export interface SpacingStyles {
  padding?: StyleProperty;
  paddingTop?: StyleProperty;
  paddingRight?: StyleProperty;
  paddingBottom?: StyleProperty;
  paddingLeft?: StyleProperty;
  margin?: StyleProperty;
  marginTop?: StyleProperty;
  marginRight?: StyleProperty;
  marginBottom?: StyleProperty;
  marginLeft?: StyleProperty;
}

// Border styles
export interface BorderStyles {
  borderWidth?: StyleProperty;
  borderStyle?: StyleProperty;
  borderColor?: StyleProperty;
  borderTopWidth?: StyleProperty;
  borderRightWidth?: StyleProperty;
  borderBottomWidth?: StyleProperty;
  borderLeftWidth?: StyleProperty;
  borderRadius?: StyleProperty;
  borderTopLeftRadius?: StyleProperty;
  borderTopRightRadius?: StyleProperty;
  borderBottomRightRadius?: StyleProperty;
  borderBottomLeftRadius?: StyleProperty;
}

// Effect styles
export interface EffectStyles {
  boxShadow?: StyleProperty;
  textShadow?: StyleProperty;
  filter?: StyleProperty;
  backdropFilter?: StyleProperty;
  transition?: StyleProperty;
  transform?: StyleProperty;
}

// Positioning styles
export interface PositioningStyles {
  position?: StyleProperty;
  top?: StyleProperty;
  right?: StyleProperty;
  bottom?: StyleProperty;
  left?: StyleProperty;
  float?: StyleProperty;
  clear?: StyleProperty;
}

// Background styles
export interface BackgroundStyles {
  backgroundColor?: StyleProperty;
  backgroundImage?: StyleProperty;
  backgroundSize?: StyleProperty;
  backgroundPosition?: StyleProperty;
  backgroundRepeat?: StyleProperty;
  backgroundAttachment?: StyleProperty;
  backgroundBlendMode?: StyleProperty;
}

// Style property with responsive values for different breakpoints
export interface ResponsiveStyleProperty {
  base: StyleProperty;
  breakpoints: Record<string, StyleProperty>;
}

// Drop zone information
export interface DropZone {
  componentId: string | "root"; // 'root' for top-level drop
  index: number; // Index to insert at
  position: "before" | "after" | "inside"; // Relative to target
  rect: DOMRect; // Position and dimensions
  isActive: boolean;
}

// Selection information
export interface Selection {
  componentId: string;
  status: SelectionStatus;
  edges?: SelectionEdge[];
}

// Selection status
export enum SelectionStatus {
  SELECTED = "selected",
  HOVERED = "hovered",
  DRAGGING = "dragging",
  RESIZING = "resizing",
  EDITING = "editing",
}

// Selection edge for resizing
export interface SelectionEdge {
  position:
    | "top"
    | "right"
    | "bottom"
    | "left"
    | "topLeft"
    | "topRight"
    | "bottomRight"
    | "bottomLeft";
  cursor: string;
}

// Component action types
export enum ComponentAction {
  ADD = "add",
  DELETE = "delete",
  DUPLICATE = "duplicate",
  UPDATE = "update",
  MOVE = "move",
  REPARENT = "reparent",
  STYLE = "style",
  RESET = "reset",
  LOCK = "lock",
  UNLOCK = "unlock",
  HIDE = "hide",
  SHOW = "show",
}

// Editor panel types
export enum EditorPanel {
  COMPONENT_BROWSER = "componentBrowser",
  STYLE_EDITOR = "styleEditor",
  PROPERTY_EDITOR = "propertyEditor",
  CONTENT_EDITOR = "contentEditor",
  ADVANCED_EDITOR = "advancedEditor",
  HELP = "help",
  EXPORT = "export",
  SETTINGS = "settings",
  PREVIEW = "preview",
}

// Editor mode
export enum EditorMode {
  DESIGN = "design", // Visual editing mode
  CODE = "code", // Code editing mode
  PREVIEW = "preview", // Preview mode
}

// Editor interface options
export interface EditorOptions {
  showGrid: boolean;
  snapToGrid: boolean;
  highlightDropZones: boolean;
  showGuides: boolean;
  autoSave: boolean;
  autoSaveInterval: number; // in milliseconds
  defaultBreakpoint: string;
}

/**
 * Result of validating a style object
 */
export interface StyleValidationResult {
  /**
   * Whether the entire style object is valid
   */
  isValid: boolean;

  /**
   * Object containing only the valid styles
   */
  validStyles: CSSProperties;

  /**
   * Object mapping property names to error messages
   */
  errors: Record<string, string>;
}
