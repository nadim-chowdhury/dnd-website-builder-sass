// Editor modes
export const EDITOR_MODES = {
  DESIGN: "design",
  PREVIEW: "preview",
  CODE: "code",
};

// Editor panels
export const EDITOR_PANELS = {
  COMPONENTS: "components",
  LAYERS: "layers",
  PROPERTIES: "properties",
  STYLES: "styles",
  SETTINGS: "settings",
  EXPORT: "export",
  HELP: "help",
};

// Editor default state
export const DEFAULT_EDITOR_STATE = {
  mode: EDITOR_MODES.DESIGN,
  activePanel: EDITOR_PANELS.COMPONENTS,
  selectedComponentId: null,
  hoveredComponentId: null,
  zoom: 1,
  grid: {
    show: true,
    size: 10,
  },
  rulers: {
    show: true,
    size: 20,
  },
  guides: {
    show: true,
  },
  device: DEVICE_TYPES.DESKTOP,
  history: {
    undo: [],
    redo: [],
  },
  clipboard: null,
};

// Selection modes
export const SELECTION_MODES = {
  SINGLE: "single",
  MULTIPLE: "multiple",
};

// Device types for responsive preview
export const DEVICE_TYPES = {
  DESKTOP: "desktop",
  TABLET_LANDSCAPE: "tablet-landscape",
  TABLET_PORTRAIT: "tablet-portrait",
  MOBILE_LANDSCAPE: "mobile-landscape",
  MOBILE_PORTRAIT: "mobile-portrait",
};

// Device dimensions
export const DEVICE_DIMENSIONS = {
  [DEVICE_TYPES.DESKTOP]: {
    width: 1440,
    height: 900,
    label: "Desktop",
    icon: "monitor",
  },
  [DEVICE_TYPES.TABLET_LANDSCAPE]: {
    width: 1024,
    height: 768,
    label: "Tablet Landscape",
    icon: "tabletLandscape",
  },
  [DEVICE_TYPES.TABLET_PORTRAIT]: {
    width: 768,
    height: 1024,
    label: "Tablet Portrait",
    icon: "tablet",
  },
  [DEVICE_TYPES.MOBILE_LANDSCAPE]: {
    width: 667,
    height: 375,
    label: "Mobile Landscape",
    icon: "smartphoneLandscape",
  },
  [DEVICE_TYPES.MOBILE_PORTRAIT]: {
    width: 375,
    height: 667,
    label: "Mobile Portrait",
    icon: "smartphone",
  },
};

// Editor sidebar widths
export const SIDEBAR_WIDTHS = {
  LEFT: {
    DEFAULT: 280,
    MIN: 240,
    MAX: 400,
    COLLAPSED: 60,
  },
  RIGHT: {
    DEFAULT: 320,
    MIN: 280,
    MAX: 500,
    COLLAPSED: 60,
  },
};

// Editor toolbar height
export const TOOLBAR_HEIGHT = 56;

// Editor canvas padding
export const CANVAS_PADDING = 40;

// Editor default zoom levels
export const ZOOM_LEVELS = [0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2];

// Max undo/redo history steps
export const MAX_HISTORY_STEPS = 50;

// Autosave interval in milliseconds
export const AUTOSAVE_INTERVAL = 30000; // 30 seconds

// Editor keyboard shortcuts
export const KEYBOARD_SHORTCUTS = {
  SAVE: ["Ctrl+S", "Command+S"],
  UNDO: ["Ctrl+Z", "Command+Z"],
  REDO: ["Ctrl+Shift+Z", "Command+Shift+Z"],
  CUT: ["Ctrl+X", "Command+X"],
  COPY: ["Ctrl+C", "Command+C"],
  PASTE: ["Ctrl+V", "Command+V"],
  DELETE: ["Delete", "Backspace"],
  DUPLICATE: ["Ctrl+D", "Command+D"],
  SELECT_ALL: ["Ctrl+A", "Command+A"],
  PREVIEW: ["Ctrl+P", "Command+P"],
  PUBLISH: ["Ctrl+Shift+P", "Command+Shift+P"],
  ZOOM_IN: ["Ctrl++", "Command++"],
  ZOOM_OUT: ["Ctrl+-", "Command+-"],
  ZOOM_RESET: ["Ctrl+0", "Command+0"],
  TOGGLE_GRID: ["Ctrl+G", "Command+G"],
  TOGGLE_RULERS: ["Ctrl+R", "Command+R"],
  TOGGLE_GUIDES: ["Ctrl+;", "Command+;"],
  TOGGLE_DESKTOP: ["Ctrl+1", "Command+1"],
  TOGGLE_TABLET_LANDSCAPE: ["Ctrl+2", "Command+2"],
  TOGGLE_TABLET_PORTRAIT: ["Ctrl+3", "Command+3"],
  TOGGLE_MOBILE_LANDSCAPE: ["Ctrl+4", "Command+4"],
  TOGGLE_MOBILE_PORTRAIT: ["Ctrl+5", "Command+5"],
};

// Drag and drop constants
export const DRAG_DROP = {
  COMPONENT_DRAG_TYPE: "component",
  COMPONENT_MOVE_TYPE: "component-move",
  ASSET_DRAG_TYPE: "asset",
  PLACEHOLDER_HEIGHT: 40,
  PLACEHOLDER_OPACITY: 0.5,
  SCROLL_SPEED: 10,
  SCROLL_THRESHOLD: 50,
};

// Component selection constants
export const SELECTION = {
  BORDER_COLOR: "#1e88e5",
  BORDER_WIDTH: 2,
  HANDLE_SIZE: 8,
  HANDLE_COLOR: "#1e88e5",
  HIGHLIGHT_COLOR: "rgba(30, 136, 229, 0.1)",
};

// Canvas grid constants
export const GRID = {
  COLOR: "rgba(0, 0, 0, 0.05)",
  MAJOR_COLOR: "rgba(0, 0, 0, 0.1)",
  SIZE: 8,
  MAJOR_EVERY: 10,
};

// Editor animation durations in milliseconds
export const ANIMATIONS = {
  PANEL_TRANSITION: 300,
  TOOLTIP_DELAY: 500,
  TOAST_DURATION: 5000,
  DROPDOWN_TRANSITION: 200,
  MODAL_TRANSITION: 300,
};

// Maximum upload file sizes in bytes
export const MAX_UPLOAD_SIZES = {
  IMAGE: 5 * 1024 * 1024, // 5MB
  VIDEO: 50 * 1024 * 1024, // 50MB
  FONT: 2 * 1024 * 1024, // 2MB
  DOCUMENT: 10 * 1024 * 1024, // 10MB
};

// Allowed file types for uploads
export const ALLOWED_FILE_TYPES = {
  IMAGE: [".jpg", ".jpeg", ".png", ".gif", ".svg", ".webp"],
  VIDEO: [".mp4", ".webm", ".ogg", ".mov"],
  FONT: [".ttf", ".otf", ".woff", ".woff2"],
  DOCUMENT: [
    ".pdf",
    ".doc",
    ".docx",
    ".xls",
    ".xlsx",
    ".ppt",
    ".pptx",
    ".txt",
    ".md",
  ],
};

// Editor toast notification types
export const TOAST_TYPES = {
  SUCCESS: "success",
  ERROR: "error",
  WARNING: "warning",
  INFO: "info",
};

// Editor confirmation dialog types
export const DIALOG_TYPES = {
  SAVE: "save",
  DELETE: "delete",
  PUBLISH: "publish",
  EXIT: "exit",
  DISCARD: "discard",
};

// Editor export formats
export const EXPORT_FORMATS = {
  HTML: "html",
  REACT: "react",
  VUE: "vue",
  JSON: "json",
};

// Editor code syntax highlighting themes
export const CODE_THEMES = {
  LIGHT: "light",
  DARK: "dark",
  GITHUB: "github",
  MONOKAI: "monokai",
  DRACULA: "dracula",
};

// Editor code languages
export const CODE_LANGUAGES = {
  HTML: "html",
  CSS: "css",
  JAVASCRIPT: "javascript",
  TYPESCRIPT: "typescript",
  JSON: "json",
  JSX: "jsx",
  TSX: "tsx",
};

// Default template settings
export const DEFAULT_TEMPLATE_SETTINGS = {
  name: "New Template",
  description: "",
  thumbnail: "",
  category: "general",
  tags: [],
};

// Default project settings
export const DEFAULT_PROJECT_SETTINGS = {
  name: "New Project",
  description: "",
  favicon: "",
  seo: {
    title: "",
    description: "",
    keywords: "",
    ogImage: "",
  },
  analytics: {
    googleAnalyticsId: "",
    facebookPixelId: "",
  },
  customCode: {
    head: "",
    bodyStart: "",
    bodyEnd: "",
  },
  fonts: [],
};
