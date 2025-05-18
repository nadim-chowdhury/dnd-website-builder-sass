import { StyleProperties } from "./editor";

// Updated Component interface to match builderSlice requirements
export interface Component {
  id: string;
  type: ComponentType;
  name: string;
  children?: string[]; // Changed from Component[] to string[] to match builderSlice
  props: ComponentProps;
  styles: StyleProperties;
  isHidden?: boolean;
  isLocked?: boolean;
  metadata?: ComponentMetadata;
  parentId: string | null; // Fixed type to match builderSlice
  order: number; // Fixed type to match builderSlice
}

// Component metadata for additional information
export interface ComponentMetadata {
  description?: string;
  tags?: string[];
  createdAt?: string;
  author?: string;
  customData?: Record<string, any>;
  propertySchema?: PropertySchema[]; // Add this line
}

export interface PropertySchema {
  name: string;
  label?: string;
  type: "string" | "number" | "boolean" | "select" | string;
  defaultValue?: any;
  placeholder?: string;
  description?: string;
  documentation?: string;
  options?: Array<{ value: string; label: string }>;
  required?: boolean;
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

  // Custom components
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

// The rest of your file remains the same...
export interface ComponentProps {
  [key: string]: any;
}

export interface TextProps extends ComponentProps {
  content: string;
  htmlElement?: "p" | "span" | "div";
}

export interface HeadingProps extends ComponentProps {
  content: string;
  level: 1 | 2 | 3 | 4 | 5 | 6;
}

export interface ButtonProps extends ComponentProps {
  label: string;
  url?: string;
  type?: "button" | "submit" | "reset";
  variant?: "primary" | "secondary" | "outline" | "text";
  size?: "small" | "medium" | "large";
  onClick?: string; // JavaScript code as string or action identifier
}

export interface ImageProps extends ComponentProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  objectFit?: "cover" | "contain" | "fill" | "none";
  loading?: "lazy" | "eager";
}

export interface VideoProps extends ComponentProps {
  src: string;
  poster?: string;
  autoplay?: boolean;
  controls?: boolean;
  loop?: boolean;
  muted?: boolean;
  width?: number;
  height?: number;
}

export interface IconProps extends ComponentProps {
  name: string;
  size?: "small" | "medium" | "large" | number;
  color?: string;
}

export interface ContainerProps extends ComponentProps {
  maxWidth?: string;
  fluid?: boolean;
}

export interface GridProps extends ComponentProps {
  columns: number;
  gap?: number;
  responsive?: boolean;
}

export interface FormProps extends ComponentProps {
  action?: string;
  method?: "GET" | "POST";
  submitHandler?: string; // JavaScript code as string or action identifier
}

export interface InputProps extends ComponentProps {
  name: string;
  label?: string;
  placeholder?: string;
  type?: "text" | "email" | "password" | "number" | "tel" | "url" | "date";
  required?: boolean;
  defaultValue?: string;
  validation?: string; // Validation rules
}

export interface SelectProps extends ComponentProps {
  name: string;
  label?: string;
  options: Array<{ value: string; label: string }>;
  required?: boolean;
  defaultValue?: string;
  multiple?: boolean;
}

export interface ProductListProps extends ComponentProps {
  source?: "dynamic" | "static";
  products?: Array<{
    id: string;
    name: string;
    price: number;
    image: string;
    url?: string;
  }>;
  columns?: number;
  showPagination?: boolean;
  itemsPerPage?: number;
}

export interface HeaderProps extends ComponentProps {
  fixed?: boolean;
  transparent?: boolean;
}

export interface NavigationProps extends ComponentProps {
  items: Array<{
    label: string;
    url: string;
    children?: Array<{ label: string; url: string }>;
  }>;
  orientation?: "horizontal" | "vertical";
}

export interface CustomComponentProps extends ComponentProps {
  componentType: string;
  customProps?: Record<string, any>;
}

// Component registration info
export interface ComponentRegistrationInfo {
  type: ComponentType;
  category: ComponentCategory;
  name: string;
  icon: string;
  defaultProps: ComponentProps;
  defaultStyles: StyleProperties;
  allowedChildren?: ComponentType[];
  maxChildren?: number;
  description?: string;
  isResizable?: boolean;
  isDraggable?: boolean;
  isContainer?: boolean;
}

// Component dragging info
export interface DraggedComponentInfo {
  type: ComponentType;
  initialProps?: ComponentProps;
  initialStyles?: StyleProperties;
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
  onSelect?: (id: string) => void;
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

// State for drag and drop operations
export interface DragState {
  isDragging: boolean;
  draggedComponentId: string | null;
  draggedComponentType: ComponentType | null;
  dropTargetId: string | null;
  position: { x: number; y: number };
  offset: { x: number; y: number };
  resizing: {
    componentId: string;
    handle:
      | "top"
      | "right"
      | "bottom"
      | "left"
      | "topLeft"
      | "topRight"
      | "bottomRight"
      | "bottomLeft";
    initialSize: { width: number; height: number };
    initialPosition: { x: number; y: number };
  } | null;
}
