/**
 * Components constants for the website builder application
 * Contains component types, categories, and default configuration values
 */

// Component types - used for identifying the type of components
export const COMPONENT_TYPES = {
  // Layout components
  SECTION: "section",
  CONTAINER: "container",
  GRID: "grid",
  COLUMN: "column",
  SPACER: "spacer",
  DIVIDER: "divider",

  // Elements
  HEADING: "heading",
  TEXT: "text",
  BUTTON: "button",
  IMAGE: "image",
  VIDEO: "video",
  ICON: "icon",

  // Forms
  FORM: "form",
  INPUT: "input",
  TEXTAREA: "textarea",
  SELECT: "select",
  CHECKBOX: "checkbox",
  RADIO: "radio",
  SUBMIT_BUTTON: "submit_button",

  // E-commerce
  PRODUCT_LIST: "product_list",
  PRODUCT_CARD: "product_card",
  PRODUCT_FILTER: "product_filter",
  CART: "cart",
  CHECKOUT: "checkout",

  // Common
  HEADER: "header",
  FOOTER: "footer",
  NAVIGATION: "navigation",
  LOGO: "logo",

  // Custom
  CUSTOM: "custom",
};

// Component categories for sidebar organization
export const COMPONENT_CATEGORIES = {
  LAYOUT: "layout",
  ELEMENTS: "elements",
  FORMS: "forms",
  ECOMMERCE: "ecommerce",
  COMMON: "common",
  CUSTOM: "custom",
};

// Maps component types to their categories
export const COMPONENT_TYPE_TO_CATEGORY = {
  // Layout components
  [COMPONENT_TYPES.SECTION]: COMPONENT_CATEGORIES.LAYOUT,
  [COMPONENT_TYPES.CONTAINER]: COMPONENT_CATEGORIES.LAYOUT,
  [COMPONENT_TYPES.GRID]: COMPONENT_CATEGORIES.LAYOUT,
  [COMPONENT_TYPES.COLUMN]: COMPONENT_CATEGORIES.LAYOUT,
  [COMPONENT_TYPES.SPACER]: COMPONENT_CATEGORIES.LAYOUT,
  [COMPONENT_TYPES.DIVIDER]: COMPONENT_CATEGORIES.LAYOUT,

  // Elements
  [COMPONENT_TYPES.HEADING]: COMPONENT_CATEGORIES.ELEMENTS,
  [COMPONENT_TYPES.TEXT]: COMPONENT_CATEGORIES.ELEMENTS,
  [COMPONENT_TYPES.BUTTON]: COMPONENT_CATEGORIES.ELEMENTS,
  [COMPONENT_TYPES.IMAGE]: COMPONENT_CATEGORIES.ELEMENTS,
  [COMPONENT_TYPES.VIDEO]: COMPONENT_CATEGORIES.ELEMENTS,
  [COMPONENT_TYPES.ICON]: COMPONENT_CATEGORIES.ELEMENTS,

  // Forms
  [COMPONENT_TYPES.FORM]: COMPONENT_CATEGORIES.FORMS,
  [COMPONENT_TYPES.INPUT]: COMPONENT_CATEGORIES.FORMS,
  [COMPONENT_TYPES.TEXTAREA]: COMPONENT_CATEGORIES.FORMS,
  [COMPONENT_TYPES.SELECT]: COMPONENT_CATEGORIES.FORMS,
  [COMPONENT_TYPES.CHECKBOX]: COMPONENT_CATEGORIES.FORMS,
  [COMPONENT_TYPES.RADIO]: COMPONENT_CATEGORIES.FORMS,
  [COMPONENT_TYPES.SUBMIT_BUTTON]: COMPONENT_CATEGORIES.FORMS,

  // E-commerce
  [COMPONENT_TYPES.PRODUCT_LIST]: COMPONENT_CATEGORIES.ECOMMERCE,
  [COMPONENT_TYPES.PRODUCT_CARD]: COMPONENT_CATEGORIES.ECOMMERCE,
  [COMPONENT_TYPES.PRODUCT_FILTER]: COMPONENT_CATEGORIES.ECOMMERCE,
  [COMPONENT_TYPES.CART]: COMPONENT_CATEGORIES.ECOMMERCE,
  [COMPONENT_TYPES.CHECKOUT]: COMPONENT_CATEGORIES.ECOMMERCE,

  // Common
  [COMPONENT_TYPES.HEADER]: COMPONENT_CATEGORIES.COMMON,
  [COMPONENT_TYPES.FOOTER]: COMPONENT_CATEGORIES.COMMON,
  [COMPONENT_TYPES.NAVIGATION]: COMPONENT_CATEGORIES.COMMON,
  [COMPONENT_TYPES.LOGO]: COMPONENT_CATEGORIES.COMMON,

  // Custom
  [COMPONENT_TYPES.CUSTOM]: COMPONENT_CATEGORIES.CUSTOM,
};

// Component properties that should not be visible in the editor
export const HIDDEN_PROPERTIES = [
  "id",
  "type",
  "children",
  "parent",
  "index",
  "styles",
  "styleMapping",
  "events",
];

// Default component properties
export const DEFAULT_COMPONENT_PROPS = {
  // Layout components
  [COMPONENT_TYPES.SECTION]: {
    backgroundColor: "#ffffff",
    padding: "40px 20px",
    maxWidth: "100%",
  },
  [COMPONENT_TYPES.CONTAINER]: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "0 15px",
  },
  [COMPONENT_TYPES.GRID]: {
    columns: 2,
    gap: "20px",
    autoFlow: "row",
  },
  [COMPONENT_TYPES.COLUMN]: {
    padding: "10px",
  },
  [COMPONENT_TYPES.SPACER]: {
    height: "50px",
  },
  [COMPONENT_TYPES.DIVIDER]: {
    color: "#e0e0e0",
    thickness: "1px",
    style: "solid",
  },

  // Elements
  [COMPONENT_TYPES.HEADING]: {
    text: "Heading",
    level: "h2",
    align: "left",
  },
  [COMPONENT_TYPES.TEXT]: {
    text: "This is a paragraph of text.",
    fontSize: "16px",
    fontWeight: "normal",
  },
  [COMPONENT_TYPES.BUTTON]: {
    text: "Button",
    variant: "primary",
    size: "medium",
    href: "",
  },
  [COMPONENT_TYPES.IMAGE]: {
    src: "/assets/placeholder.jpg",
    alt: "Image description",
    width: "100%",
    height: "auto",
  },
  [COMPONENT_TYPES.VIDEO]: {
    src: "",
    autoplay: false,
    controls: true,
    muted: false,
    loop: false,
  },
  [COMPONENT_TYPES.ICON]: {
    name: "star",
    size: "24px",
    color: "#000000",
  },

  // Forms
  [COMPONENT_TYPES.FORM]: {
    action: "",
    method: "POST",
    submitLabel: "Submit",
  },
  [COMPONENT_TYPES.INPUT]: {
    label: "Input",
    placeholder: "Enter text...",
    type: "text",
    required: false,
  },
  [COMPONENT_TYPES.TEXTAREA]: {
    label: "Textarea",
    placeholder: "Enter long text...",
    rows: 4,
    required: false,
  },
  [COMPONENT_TYPES.SELECT]: {
    label: "Select",
    options: ["Option 1", "Option 2", "Option 3"],
    required: false,
  },
  [COMPONENT_TYPES.CHECKBOX]: {
    label: "Checkbox",
    checked: false,
  },
  [COMPONENT_TYPES.RADIO]: {
    label: "Radio",
    options: ["Option 1", "Option 2", "Option 3"],
    inline: false,
  },
  [COMPONENT_TYPES.SUBMIT_BUTTON]: {
    text: "Submit",
    variant: "primary",
    size: "medium",
  },

  // E-commerce
  [COMPONENT_TYPES.PRODUCT_LIST]: {
    columns: 3,
    limit: 9,
    showPrice: true,
    showDescription: true,
  },
  [COMPONENT_TYPES.PRODUCT_CARD]: {
    product: null,
    showPrice: true,
    showDescription: true,
    showAddToCart: true,
  },
  [COMPONENT_TYPES.PRODUCT_FILTER]: {
    filters: ["category", "price", "rating"],
  },
  [COMPONENT_TYPES.CART]: {
    showThumbnails: true,
    showQuantity: true,
    showRemove: true,
  },
  [COMPONENT_TYPES.CHECKOUT]: {
    steps: ["cart", "shipping", "payment", "confirmation"],
  },

  // Common
  [COMPONENT_TYPES.HEADER]: {
    fixed: false,
    transparent: false,
  },
  [COMPONENT_TYPES.FOOTER]: {
    columns: 3,
    showCopyright: true,
    showSocial: true,
  },
  [COMPONENT_TYPES.NAVIGATION]: {
    items: [
      { label: "Home", href: "/" },
      { label: "About", href: "/about" },
      { label: "Contact", href: "/contact" },
    ],
    orientation: "horizontal",
  },
  [COMPONENT_TYPES.LOGO]: {
    src: "/assets/logo.png",
    alt: "Logo",
    width: "120px",
  },

  // Custom
  [COMPONENT_TYPES.CUSTOM]: {
    componentName: "",
    props: {},
  },
};

// Rules for component nesting (which components can be placed inside others)
export const COMPONENT_NESTING_RULES = {
  [COMPONENT_TYPES.SECTION]: [
    COMPONENT_TYPES.CONTAINER,
    COMPONENT_TYPES.GRID,
    COMPONENT_TYPES.HEADING,
    COMPONENT_TYPES.TEXT,
    COMPONENT_TYPES.BUTTON,
    COMPONENT_TYPES.IMAGE,
    COMPONENT_TYPES.VIDEO,
    COMPONENT_TYPES.DIVIDER,
    COMPONENT_TYPES.SPACER,
    COMPONENT_TYPES.FORM,
  ],
  [COMPONENT_TYPES.CONTAINER]: [
    COMPONENT_TYPES.GRID,
    COMPONENT_TYPES.HEADING,
    COMPONENT_TYPES.TEXT,
    COMPONENT_TYPES.BUTTON,
    COMPONENT_TYPES.IMAGE,
    COMPONENT_TYPES.VIDEO,
    COMPONENT_TYPES.ICON,
    COMPONENT_TYPES.DIVIDER,
    COMPONENT_TYPES.SPACER,
    COMPONENT_TYPES.FORM,
    COMPONENT_TYPES.NAVIGATION,
    COMPONENT_TYPES.PRODUCT_LIST,
    COMPONENT_TYPES.PRODUCT_FILTER,
    COMPONENT_TYPES.CART,
    COMPONENT_TYPES.CHECKOUT,
  ],
  [COMPONENT_TYPES.GRID]: [COMPONENT_TYPES.COLUMN],
  [COMPONENT_TYPES.COLUMN]: [
    COMPONENT_TYPES.HEADING,
    COMPONENT_TYPES.TEXT,
    COMPONENT_TYPES.BUTTON,
    COMPONENT_TYPES.IMAGE,
    COMPONENT_TYPES.VIDEO,
    COMPONENT_TYPES.ICON,
    COMPONENT_TYPES.DIVIDER,
    COMPONENT_TYPES.SPACER,
    COMPONENT_TYPES.FORM,
    COMPONENT_TYPES.PRODUCT_CARD,
  ],
  [COMPONENT_TYPES.FORM]: [
    COMPONENT_TYPES.INPUT,
    COMPONENT_TYPES.TEXTAREA,
    COMPONENT_TYPES.SELECT,
    COMPONENT_TYPES.CHECKBOX,
    COMPONENT_TYPES.RADIO,
    COMPONENT_TYPES.SUBMIT_BUTTON,
  ],
  [COMPONENT_TYPES.HEADER]: [
    COMPONENT_TYPES.CONTAINER,
    COMPONENT_TYPES.LOGO,
    COMPONENT_TYPES.NAVIGATION,
  ],
  [COMPONENT_TYPES.FOOTER]: [
    COMPONENT_TYPES.CONTAINER,
    COMPONENT_TYPES.LOGO,
    COMPONENT_TYPES.NAVIGATION,
    COMPONENT_TYPES.TEXT,
  ],
};

// Component icons for the sidebar
export const COMPONENT_ICONS = {
  [COMPONENT_TYPES.SECTION]: "layout",
  [COMPONENT_TYPES.CONTAINER]: "box",
  [COMPONENT_TYPES.GRID]: "grid",
  [COMPONENT_TYPES.COLUMN]: "columns",
  [COMPONENT_TYPES.SPACER]: "arrowsVertical",
  [COMPONENT_TYPES.DIVIDER]: "separator",

  [COMPONENT_TYPES.HEADING]: "heading",
  [COMPONENT_TYPES.TEXT]: "text",
  [COMPONENT_TYPES.BUTTON]: "buttonSquare",
  [COMPONENT_TYPES.IMAGE]: "image",
  [COMPONENT_TYPES.VIDEO]: "video",
  [COMPONENT_TYPES.ICON]: "shapes",

  [COMPONENT_TYPES.FORM]: "formInput",
  [COMPONENT_TYPES.INPUT]: "inputText",
  [COMPONENT_TYPES.TEXTAREA]: "textArea",
  [COMPONENT_TYPES.SELECT]: "select",
  [COMPONENT_TYPES.CHECKBOX]: "check",
  [COMPONENT_TYPES.RADIO]: "radio",
  [COMPONENT_TYPES.SUBMIT_BUTTON]: "sendHorizontal",

  [COMPONENT_TYPES.PRODUCT_LIST]: "grid3x3",
  [COMPONENT_TYPES.PRODUCT_CARD]: "creditCard",
  [COMPONENT_TYPES.PRODUCT_FILTER]: "filter",
  [COMPONENT_TYPES.CART]: "shoppingCart",
  [COMPONENT_TYPES.CHECKOUT]: "checkSquare",

  [COMPONENT_TYPES.HEADER]: "header",
  [COMPONENT_TYPES.FOOTER]: "footer",
  [COMPONENT_TYPES.NAVIGATION]: "menu",
  [COMPONENT_TYPES.LOGO]: "crown",

  [COMPONENT_TYPES.CUSTOM]: "puzzle",
};

// Size of component library panel
export const COMPONENT_LIBRARY_SIZE = {
  WIDTH: 300,
  MIN_WIDTH: 250,
  MAX_WIDTH: 400,
};

// Component interaction states
export const COMPONENT_STATES = {
  DEFAULT: "default",
  HOVER: "hover",
  ACTIVE: "active",
  FOCUS: "focus",
  DISABLED: "disabled",
};
