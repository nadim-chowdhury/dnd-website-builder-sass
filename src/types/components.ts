import { StyleProperties } from "./editor";

// Updated Component interface to match builderSlice requirements
export interface Component {
  id: string;
  type: ComponentType;
  name: string;
  children?: string[]; // Array of child component IDs
  props: ComponentProps;
  styles: StyleProperties;
  isHidden?: boolean;
  isLocked?: boolean;
  metadata?: ComponentMetadata;
  parentId: string | null;
  order: number;
}

// Component metadata for additional information
export interface ComponentMetadata {
  description?: string;
  tags?: string[];
  createdAt?: string;
  author?: string;
  customData?: Record<string, any>;
  propertySchema?: PropertySchema[];
}

export interface PropertySchema {
  name: string;
  label?: string;
  type:
    | "string"
    | "number"
    | "boolean"
    | "select"
    | "color"
    | "image"
    | "textarea";
  defaultValue?: any;
  placeholder?: string;
  description?: string;
  documentation?: string;
  options?: Array<{ value: string; label: string }>;
  required?: boolean;
  min?: number;
  max?: number;
  step?: number;
  pattern?: string;
}

// Available component types
export enum ComponentType {
  // Layout components
  SECTION = "section",
  CONTAINER = "container",
  GRID = "grid",
  COLUMN = "column",
  DIVIDER = "divider",
  SPACER = "spacer",

  // Element components
  HEADING = "heading",
  TEXT = "text",
  BUTTON = "button",
  IMAGE = "image",
  VIDEO = "video",
  ICON = "icon",
  LINK = "link",

  // Form components
  FORM = "form",
  INPUT = "input",
  TEXTAREA = "textarea",
  SELECT = "select",
  CHECKBOX = "checkbox",
  RADIO = "radio",
  SUBMIT_BUTTON = "submitButton",

  // E-commerce components
  PRODUCT_LIST = "productList",
  PRODUCT_CARD = "productCard",
  PRODUCT_FILTER = "productFilter",
  CART = "cart",
  CHECKOUT = "checkout",

  // Common components
  HEADER = "header",
  FOOTER = "footer",
  NAVIGATION = "navigation",
  LOGO = "logo",

  // Special components
  PLACEHOLDER = "placeholder",
  CUSTOM = "custom",
}

// Component category for organization
export enum ComponentCategory {
  LAYOUT = "layout",
  ELEMENTS = "elements",
  FORMS = "forms",
  ECOMMERCE = "ecommerce",
  COMMON = "common",
  CUSTOM = "custom",
}

// Base component props interface
export interface ComponentProps {
  [key: string]: any;
  className?: string;
  style?: Record<string, any>;
  "data-component-id"?: string;
}

// Specific component props interfaces
export interface TextProps extends ComponentProps {
  content: string;
  htmlElement?: "p" | "span" | "div";
  fontSize?: string;
  fontWeight?: string;
  textAlign?: "left" | "center" | "right" | "justify";
  color?: string;
}

export interface HeadingProps extends ComponentProps {
  content: string;
  level: 1 | 2 | 3 | 4 | 5 | 6;
  fontSize?: string;
  fontWeight?: string;
  textAlign?: "left" | "center" | "right" | "justify";
  color?: string;
}

export interface ButtonProps extends ComponentProps {
  label: string;
  url?: string;
  type?: "button" | "submit" | "reset";
  variant?: "primary" | "secondary" | "outline" | "text" | "ghost";
  size?: "small" | "medium" | "large";
  onClick?: string;
  disabled?: boolean;
  fullWidth?: boolean;
}

export interface ImageProps extends ComponentProps {
  src: string;
  alt: string;
  width?: number | string;
  height?: number | string;
  objectFit?: "cover" | "contain" | "fill" | "none" | "scale-down";
  loading?: "lazy" | "eager";
  borderRadius?: string;
}

export interface VideoProps extends ComponentProps {
  src: string;
  poster?: string;
  autoplay?: boolean;
  controls?: boolean;
  loop?: boolean;
  muted?: boolean;
  width?: number | string;
  height?: number | string;
}

export interface IconProps extends ComponentProps {
  name: string;
  size?: "small" | "medium" | "large" | number;
  color?: string;
  strokeWidth?: number;
}

export interface ContainerProps extends ComponentProps {
  maxWidth?: string;
  fluid?: boolean;
  padding?: string;
  margin?: string;
}

export interface GridProps extends ComponentProps {
  columns: number;
  gap?: number | string;
  responsive?: boolean;
  alignItems?: "start" | "center" | "end" | "stretch";
  justifyContent?: "start" | "center" | "end" | "between" | "around" | "evenly";
}

export interface ColumnProps extends ComponentProps {
  span?: number;
  offset?: number;
  order?: number;
}

export interface FormProps extends ComponentProps {
  action?: string;
  method?: "GET" | "POST";
  submitHandler?: string;
  noValidate?: boolean;
}

export interface InputProps extends ComponentProps {
  name: string;
  label?: string;
  placeholder?: string;
  type?:
    | "text"
    | "email"
    | "password"
    | "number"
    | "tel"
    | "url"
    | "date"
    | "time"
    | "datetime-local";
  required?: boolean;
  defaultValue?: string;
  validation?: string;
  disabled?: boolean;
  readOnly?: boolean;
  min?: string | number;
  max?: string | number;
  step?: string | number;
  pattern?: string;
}

export interface TextareaProps extends ComponentProps {
  name: string;
  label?: string;
  placeholder?: string;
  required?: boolean;
  defaultValue?: string;
  disabled?: boolean;
  readOnly?: boolean;
  rows?: number;
  cols?: number;
  maxLength?: number;
  minLength?: number;
}

export interface SelectProps extends ComponentProps {
  name: string;
  label?: string;
  options: Array<{ value: string; label: string; disabled?: boolean }>;
  required?: boolean;
  defaultValue?: string;
  multiple?: boolean;
  disabled?: boolean;
  placeholder?: string;
}

export interface LinkProps extends ComponentProps {
  href: string;
  content: string;
  target?: "_blank" | "_self" | "_parent" | "_top";
  rel?: string;
  download?: boolean;
}

export interface NavigationProps extends ComponentProps {
  items: Array<{
    label: string;
    url: string;
    children?: Array<{ label: string; url: string }>;
    active?: boolean;
  }>;
  orientation?: "horizontal" | "vertical";
  showDropdown?: boolean;
}

export interface ProductListProps extends ComponentProps {
  source?: "dynamic" | "static";
  products?: Array<{
    id: string;
    name: string;
    price: number;
    image: string;
    url?: string;
    description?: string;
    category?: string;
    inStock?: boolean;
  }>;
  columns?: number;
  showPagination?: boolean;
  itemsPerPage?: number;
  sortBy?: "name" | "price" | "date";
  sortOrder?: "asc" | "desc";
}

export interface HeaderProps extends ComponentProps {
  fixed?: boolean;
  transparent?: boolean;
  height?: string;
  zIndex?: number;
}

export interface FooterProps extends ComponentProps {
  backgroundColor?: string;
  textColor?: string;
  padding?: string;
}

export interface CustomComponentProps extends ComponentProps {
  componentType: string;
  customProps?: Record<string, any>;
  htmlContent?: string;
  cssContent?: string;
  jsContent?: string;
}

// Component registration info
export interface ComponentRegistrationInfo {
  type: ComponentType;
  category: ComponentCategory;
  name: string;
  displayName: string;
  icon: string;
  defaultProps: ComponentProps;
  defaultStyles: StyleProperties;
  allowedChildren?: ComponentType[];
  maxChildren?: number;
  minChildren?: number;
  description?: string;
  isResizable?: boolean;
  isDraggable?: boolean;
  isContainer?: boolean;
  isDroppable?: boolean;
  requiredProps?: string[];
  propertySchema?: PropertySchema[];
}

// Component dragging info
export interface DraggedComponentInfo {
  type: ComponentType;
  initialProps?: ComponentProps;
  initialStyles?: StyleProperties;
  sourceId?: string; // For moving existing components
}

// Component registry
export type ComponentRegistry = Record<
  ComponentType,
  ComponentRegistrationInfo
>;

// Component renderer props
export interface ComponentRendererProps {
  component: Component;
  isEditing?: boolean;
  isSelected?: boolean;
  isHovered?: boolean;
  isDragging?: boolean;
  isDropTarget?: boolean;
  onSelect?: (id: string) => void;
  onHover?: (id: string | null) => void;
  onDoubleClick?: (id: string) => void;
  children?: React.ReactNode;
}

// Editor mode options
export enum EditorMode {
  EDIT = "edit",
  PREVIEW = "preview",
  CODE = "code",
}

// Breakpoint types for responsive design
export enum BreakpointType {
  MOBILE = "mobile",
  TABLET = "tablet",
  DESKTOP = "desktop",
  LARGE_DESKTOP = "largeDesktop",
}

// Drop position types
export enum DropPosition {
  BEFORE = "before",
  AFTER = "after",
  INSIDE = "inside",
}

// Resize handle types
export type ResizeHandle =
  | "top"
  | "right"
  | "bottom"
  | "left"
  | "topLeft"
  | "topRight"
  | "bottomRight"
  | "bottomLeft";

// State for drag and drop operations
export interface DragState {
  isDragging: boolean;
  draggedComponentId: string | null;
  draggedComponentType: ComponentType | null;
  dropTargetId: string | null;
  dropPosition: DropPosition | null;
  position: { x: number; y: number };
  offset: { x: number; y: number };
  resizing: {
    componentId: string;
    handle: ResizeHandle;
    initialSize: { width: number; height: number };
    initialPosition: { x: number; y: number };
  } | null;
}

// Validation result interface
export interface ValidationResult {
  isValid: boolean;
  errors: Array<{
    field: string;
    message: string;
    type: "required" | "invalid" | "constraint";
  }>;
  warnings: Array<{
    field: string;
    message: string;
  }>;
}

// Component tree node interface
export interface ComponentTreeNode {
  component: Component;
  children: ComponentTreeNode[];
  depth: number;
  isExpanded?: boolean;
}

// Export helper types
export type ComponentPropsMap = {
  [ComponentType.TEXT]: TextProps;
  [ComponentType.HEADING]: HeadingProps;
  [ComponentType.BUTTON]: ButtonProps;
  [ComponentType.IMAGE]: ImageProps;
  [ComponentType.VIDEO]: VideoProps;
  [ComponentType.ICON]: IconProps;
  [ComponentType.CONTAINER]: ContainerProps;
  [ComponentType.GRID]: GridProps;
  [ComponentType.COLUMN]: ColumnProps;
  [ComponentType.FORM]: FormProps;
  [ComponentType.INPUT]: InputProps;
  [ComponentType.TEXTAREA]: TextareaProps;
  [ComponentType.SELECT]: SelectProps;
  [ComponentType.LINK]: LinkProps;
  [ComponentType.NAVIGATION]: NavigationProps;
  [ComponentType.PRODUCT_LIST]: ProductListProps;
  [ComponentType.HEADER]: HeaderProps;
  [ComponentType.FOOTER]: FooterProps;
  [ComponentType.CUSTOM]: CustomComponentProps;
};
