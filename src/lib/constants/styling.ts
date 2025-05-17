// Color palette
export const COLORS = {
  PRIMARY: {
    50: "#e3f2fd",
    100: "#bbdefb",
    200: "#90caf9",
    300: "#64b5f6",
    400: "#42a5f5",
    500: "#2196f3", // Primary color
    600: "#1e88e5",
    700: "#1976d2",
    800: "#1565c0",
    900: "#0d47a1",
  },
  SECONDARY: {
    50: "#e8f5e9",
    100: "#c8e6c9",
    200: "#a5d6a7",
    300: "#81c784",
    400: "#66bb6a",
    500: "#4caf50", // Secondary color
    600: "#43a047",
    700: "#388e3c",
    800: "#2e7d32",
    900: "#1b5e20",
  },
  ACCENT: {
    50: "#fff8e1",
    100: "#ffecb3",
    200: "#ffe082",
    300: "#ffd54f",
    400: "#ffca28",
    500: "#ffc107", // Accent color
    600: "#ffb300",
    700: "#ffa000",
    800: "#ff8f00",
    900: "#ff6f00",
  },
  GREY: {
    50: "#fafafa",
    100: "#f5f5f5",
    200: "#eeeeee",
    300: "#e0e0e0",
    400: "#bdbdbd",
    500: "#9e9e9e",
    600: "#757575",
    700: "#616161",
    800: "#424242",
    900: "#212121",
  },
  ERROR: {
    50: "#ffebee",
    100: "#ffcdd2",
    200: "#ef9a9a",
    300: "#e57373",
    400: "#ef5350",
    500: "#f44336", // Error color
    600: "#e53935",
    700: "#d32f2f",
    800: "#c62828",
    900: "#b71c1c",
  },
  SUCCESS: {
    50: "#e8f5e9",
    100: "#c8e6c9",
    200: "#a5d6a7",
    300: "#81c784",
    400: "#66bb6a",
    500: "#4caf50", // Success color
    600: "#43a047",
    700: "#388e3c",
    800: "#2e7d32",
    900: "#1b5e20",
  },
  WARNING: {
    50: "#fffde7",
    100: "#fff9c4",
    200: "#fff59d",
    300: "#fff176",
    400: "#ffee58",
    500: "#ffeb3b", // Warning color
    600: "#fdd835",
    700: "#fbc02d",
    800: "#f9a825",
    900: "#f57f17",
  },
  INFO: {
    50: "#e1f5fe",
    100: "#b3e5fc",
    200: "#81d4fa",
    300: "#4fc3f7",
    400: "#29b6f6",
    500: "#03a9f4", // Info color
    600: "#039be5",
    700: "#0288d1",
    800: "#0277bd",
    900: "#01579b",
  },
  COMMON: {
    WHITE: "#ffffff",
    BLACK: "#000000",
    TRANSPARENT: "transparent",
  },
};

// Typography
export const TYPOGRAPHY = {
  FONT_FAMILIES: {
    PRIMARY: "'Inter', sans-serif",
    SECONDARY: "'Roboto', sans-serif",
    HEADING: "'Poppins', sans-serif",
    MONOSPACE: "'Roboto Mono', monospace",
  },
  FONT_SIZES: {
    XS: "0.75rem", // 12px
    SM: "0.875rem", // 14px
    BASE: "1rem", // 16px
    LG: "1.125rem", // 18px
    XL: "1.25rem", // 20px
    "2XL": "1.5rem", // 24px
    "3XL": "1.875rem", // 30px
    "4XL": "2.25rem", // 36px
    "5XL": "3rem", // 48px
    "6XL": "3.75rem", // 60px
    "7XL": "4.5rem", // 72px
    "8XL": "6rem", // 96px
  },
  FONT_WEIGHTS: {
    THIN: 100,
    EXTRA_LIGHT: 200,
    LIGHT: 300,
    REGULAR: 400,
    MEDIUM: 500,
    SEMI_BOLD: 600,
    BOLD: 700,
    EXTRA_BOLD: 800,
    BLACK: 900,
  },
  LINE_HEIGHTS: {
    NONE: 1,
    TIGHT: 1.25,
    SNUG: 1.375,
    NORMAL: 1.5,
    RELAXED: 1.625,
    LOOSE: 2,
  },
  LETTER_SPACINGS: {
    TIGHTER: "-0.05em",
    TIGHT: "-0.025em",
    NORMAL: "0em",
    WIDE: "0.025em",
    WIDER: "0.05em",
    WIDEST: "0.1em",
  },
};

// Spacing values (padding, margin, etc.)
export const SPACING = {
  0: "0",
  0.5: "0.125rem", // 2px
  1: "0.25rem", // 4px
  1.5: "0.375rem", // 6px
  2: "0.5rem", // 8px
  2.5: "0.625rem", // 10px
  3: "0.75rem", // 12px
  3.5: "0.875rem", // 14px
  4: "1rem", // 16px
  5: "1.25rem", // 20px
  6: "1.5rem", // 24px
  7: "1.75rem", // 28px
  8: "2rem", // 32px
  9: "2.25rem", // 36px
  10: "2.5rem", // 40px
  11: "2.75rem", // 44px
  12: "3rem", // 48px
  14: "3.5rem", // 56px
  16: "4rem", // 64px
  20: "5rem", // 80px
  24: "6rem", // 96px
  28: "7rem", // 112px
  32: "8rem", // 128px
  36: "9rem", // 144px
  40: "10rem", // 160px
  44: "11rem", // 176px
  48: "12rem", // 192px
  52: "13rem", // 208px
  56: "14rem", // 224px
  60: "15rem", // 240px
  64: "16rem", // 256px
  72: "18rem", // 288px
  80: "20rem", // 320px
  96: "24rem", // 384px
};

// Border radius
export const BORDER_RADIUS = {
  NONE: "0",
  SM: "0.125rem", // 2px
  DEFAULT: "0.25rem", // 4px
  MD: "0.375rem", // 6px
  LG: "0.5rem", // 8px
  XL: "0.75rem", // 12px
  "2XL": "1rem", // 16px
  "3XL": "1.5rem", // 24px
  FULL: "9999px",
};

// Border widths
export const BORDER_WIDTH = {
  DEFAULT: "1px",
  0: "0",
  2: "2px",
  4: "4px",
  8: "8px",
};

// Box shadows
export const BOX_SHADOW = {
  NONE: "none",
  SM: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
  DEFAULT: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
  MD: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
  LG: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
  XL: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
  "2XL": "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
  INNER: "inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)",
};

// Z-index values
export const Z_INDEX = {
  AUTO: "auto",
  0: "0",
  10: "10",
  20: "20",
  30: "30",
  40: "40",
  50: "50",
  DROPDOWN: "1000",
  STICKY: "1020",
  FIXED: "1030",
  MODAL_BACKDROP: "1040",
  MODAL: "1050",
  POPOVER: "1060",
  TOOLTIP: "1070",
};

// Opacity levels
export const OPACITY = {
  0: "0",
  5: "0.05",
  10: "0.1",
  20: "0.2",
  25: "0.25",
  30: "0.3",
  40: "0.4",
  50: "0.5",
  60: "0.6",
  70: "0.7",
  75: "0.75",
  80: "0.8",
  90: "0.9",
  95: "0.95",
  100: "1",
};

// Transitions
export const TRANSITION = {
  PROPERTY: {
    NONE: "none",
    ALL: "all",
    DEFAULT:
      "background-color, border-color, color, fill, stroke, opacity, box-shadow, transform",
    COLORS: "background-color, border-color, color, fill, stroke",
    OPACITY: "opacity",
    SHADOW: "box-shadow",
    TRANSFORM: "transform",
  },
  TIMING_FUNCTION: {
    LINEAR: "linear",
    EASE: "ease",
    EASE_IN: "ease-in",
    EASE_OUT: "ease-out",
    EASE_IN_OUT: "ease-in-out",
  },
  DURATION: {
    75: "75ms",
    100: "100ms",
    150: "150ms",
    200: "200ms",
    300: "300ms",
    500: "500ms",
    700: "700ms",
    1000: "1000ms",
  },
};

// Media query breakpoints
export const BREAKPOINTS = {
  XS: "480px", // Extra small devices (portrait phones)
  SM: "640px", // Small devices (landscape phones)
  MD: "768px", // Medium devices (tablets)
  LG: "1024px", // Large devices (laptops)
  XL: "1280px", // Extra large devices (desktops)
  "2XL": "1536px", // 2X large devices (large desktops)
};

// Media queries
export const MEDIA_QUERIES = {
  XS: `(min-width: ${BREAKPOINTS.XS})`,
  SM: `(min-width: ${BREAKPOINTS.SM})`,
  MD: `(min-width: ${BREAKPOINTS.MD})`,
  LG: `(min-width: ${BREAKPOINTS.LG})`,
  XL: `(min-width: ${BREAKPOINTS.XL})`,
  "2XL": `(min-width: ${BREAKPOINTS["2XL"]})`,
  DARK: "(prefers-color-scheme: dark)",
  LIGHT: "(prefers-color-scheme: light)",
  MOTION_REDUCE: "(prefers-reduced-motion: reduce)",
  MOTION_OK: "(prefers-reduced-motion: no-preference)",
};

// Theme modes
export const THEME_MODES = {
  LIGHT: "light",
  DARK: "dark",
  SYSTEM: "system",
};

// Default component styles
export const DEFAULT_STYLES = {
  // Typography styles
  HEADING: {
    fontFamily: TYPOGRAPHY.FONT_FAMILIES.HEADING,
    fontWeight: TYPOGRAPHY.FONT_WEIGHTS.BOLD,
    lineHeight: TYPOGRAPHY.LINE_HEIGHTS.TIGHT,
    color: COLORS.GREY[900],
    marginBottom: SPACING[4],
    h1: {
      fontSize: TYPOGRAPHY.FONT_SIZES["4XL"],
    },
    h2: {
      fontSize: TYPOGRAPHY.FONT_SIZES["3XL"],
    },
    h3: {
      fontSize: TYPOGRAPHY.FONT_SIZES["2XL"],
    },
    h4: {
      fontSize: TYPOGRAPHY.FONT_SIZES.XL,
    },
    h5: {
      fontSize: TYPOGRAPHY.FONT_SIZES.LG,
    },
    h6: {
      fontSize: TYPOGRAPHY.FONT_SIZES.BASE,
    },
  },

  TEXT: {
    fontFamily: TYPOGRAPHY.FONT_FAMILIES.PRIMARY,
    fontSize: TYPOGRAPHY.FONT_SIZES.BASE,
    fontWeight: TYPOGRAPHY.FONT_WEIGHTS.REGULAR,
    lineHeight: TYPOGRAPHY.LINE_HEIGHTS.NORMAL,
    color: COLORS.GREY[800],
    marginBottom: SPACING[4],
  },

  // Button styles
  BUTTON: {
    fontFamily: TYPOGRAPHY.FONT_FAMILIES.PRIMARY,
    fontWeight: TYPOGRAPHY.FONT_WEIGHTS.MEDIUM,
    borderRadius: BORDER_RADIUS.DEFAULT,
    transition: `${TRANSITION.PROPERTY.ALL} ${TRANSITION.DURATION[300]} ${TRANSITION.TIMING_FUNCTION.EASE_IN_OUT}`,

    // Button variants
    variants: {
      primary: {
        backgroundColor: COLORS.PRIMARY[500],
        color: COLORS.COMMON.WHITE,
        border: "none",
        "&:hover": {
          backgroundColor: COLORS.PRIMARY[600],
        },
        "&:active": {
          backgroundColor: COLORS.PRIMARY[700],
        },
      },
      secondary: {
        backgroundColor: COLORS.SECONDARY[500],
        color: COLORS.COMMON.WHITE,
        border: "none",
        "&:hover": {
          backgroundColor: COLORS.SECONDARY[600],
        },
        "&:active": {
          backgroundColor: COLORS.SECONDARY[700],
        },
      },
      outline: {
        backgroundColor: COLORS.COMMON.TRANSPARENT,
        color: COLORS.PRIMARY[500],
        border: `${BORDER_WIDTH.DEFAULT} solid ${COLORS.PRIMARY[500]}`,
        "&:hover": {
          backgroundColor: COLORS.PRIMARY[50],
        },
        "&:active": {
          backgroundColor: COLORS.PRIMARY[100],
        },
      },
      ghost: {
        backgroundColor: COLORS.COMMON.TRANSPARENT,
        color: COLORS.PRIMARY[500],
        border: "none",
        "&:hover": {
          backgroundColor: COLORS.PRIMARY[50],
        },
        "&:active": {
          backgroundColor: COLORS.PRIMARY[100],
        },
      },
    },

    // Button sizes
    sizes: {
      sm: {
        fontSize: TYPOGRAPHY.FONT_SIZES.XS,
        padding: `${SPACING[1]} ${SPACING[2]}`,
      },
      md: {
        fontSize: TYPOGRAPHY.FONT_SIZES.SM,
        padding: `${SPACING[2]} ${SPACING[4]}`,
      },
      lg: {
        fontSize: TYPOGRAPHY.FONT_SIZES.BASE,
        padding: `${SPACING[3]} ${SPACING[6]}`,
      },
      xl: {
        fontSize: TYPOGRAPHY.FONT_SIZES.LG,
        padding: `${SPACING[4]} ${SPACING[8]}`,
      },
    },
  },

  // Form control styles
  FORM_CONTROL: {
    fontFamily: TYPOGRAPHY.FONT_FAMILIES.PRIMARY,
    fontSize: TYPOGRAPHY.FONT_SIZES.BASE,
    lineHeight: TYPOGRAPHY.LINE_HEIGHTS.NORMAL,
    backgroundColor: COLORS.COMMON.WHITE,
    border: `${BORDER_WIDTH.DEFAULT} solid ${COLORS.GREY[300]}`,
    borderRadius: BORDER_RADIUS.DEFAULT,
    padding: `${SPACING[2]} ${SPACING[3]}`,
    transition: `${TRANSITION.PROPERTY.ALL} ${TRANSITION.DURATION[200]} ${TRANSITION.TIMING_FUNCTION.EASE_IN_OUT}`,
    "&:focus": {
      borderColor: COLORS.PRIMARY[500],
      boxShadow: `0 0 0 1px ${COLORS.PRIMARY[500]}`,
      outline: "none",
    },
    "&:disabled": {
      backgroundColor: COLORS.GREY[100],
      borderColor: COLORS.GREY[200],
      cursor: "not-allowed",
    },
  },
};

// CSS-in-JS utility classes
export const UTILITY_CLASSES = {
  FLEX: {
    DISPLAY: {
      FLEX: "display: flex;",
      INLINE_FLEX: "display: inline-flex;",
    },
    DIRECTION: {
      ROW: "flex-direction: row;",
      ROW_REVERSE: "flex-direction: row-reverse;",
      COLUMN: "flex-direction: column;",
      COLUMN_REVERSE: "flex-direction: column-reverse;",
    },
    WRAP: {
      WRAP: "flex-wrap: wrap;",
      NOWRAP: "flex-wrap: nowrap;",
      WRAP_REVERSE: "flex-wrap: wrap-reverse;",
    },
    JUSTIFY: {
      START: "justify-content: flex-start;",
      CENTER: "justify-content: center;",
      END: "justify-content: flex-end;",
      BETWEEN: "justify-content: space-between;",
      AROUND: "justify-content: space-around;",
      EVENLY: "justify-content: space-evenly;",
    },
    ALIGN_ITEMS: {
      START: "align-items: flex-start;",
      CENTER: "align-items: center;",
      END: "align-items: flex-end;",
      STRETCH: "align-items: stretch;",
      BASELINE: "align-items: baseline;",
    },
    GAP: {
      0: "gap: 0;",
      1: `gap: ${SPACING[1]};`,
      2: `gap: ${SPACING[2]};`,
      3: `gap: ${SPACING[3]};`,
      4: `gap: ${SPACING[4]};`,
      5: `gap: ${SPACING[5]};`,
      6: `gap: ${SPACING[6]};`,
      8: `gap: ${SPACING[8]};`,
      10: `gap: ${SPACING[10]};`,
    },
  },

  TEXT: {
    ALIGN: {
      LEFT: "text-align: left;",
      CENTER: "text-align: center;",
      RIGHT: "text-align: right;",
      JUSTIFY: "text-align: justify;",
    },
    TRANSFORM: {
      UPPERCASE: "text-transform: uppercase;",
      LOWERCASE: "text-transform: lowercase;",
      CAPITALIZE: "text-transform: capitalize;",
      NORMAL: "text-transform: none;",
    },
    DECORATION: {
      UNDERLINE: "text-decoration: underline;",
      LINE_THROUGH: "text-decoration: line-through;",
      NONE: "text-decoration: none;",
    },
    OVERFLOW: {
      ELLIPSIS: `
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      `,
      CLIP: `
        white-space: nowrap;
        overflow: hidden;
        text-overflow: clip;
      `,
    },
  },

  POSITIONING: {
    POSITION: {
      STATIC: "position: static;",
      RELATIVE: "position: relative;",
      ABSOLUTE: "position: absolute;",
      FIXED: "position: fixed;",
      STICKY: "position: sticky;",
    },
    CENTER_ABSOLUTE: `
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    `,
  },
};

/**
 * Maximum allowed length for CSS values
 */
export const MAX_CSS_VALUE_LENGTH = 500;

/**
 * List of allowed CSS properties that can be used
 */
export const ALLOWED_CSS_PROPERTIES = [
  // Layout
  "display",
  "width",
  "height",
  "minWidth",
  "maxWidth",
  "minHeight",
  "maxHeight",
  "overflow",
  "overflowX",
  "overflowY",
  "visibility",
  "zIndex",
  "opacity",
  "flexDirection",
  "flexWrap",
  "flexGrow",
  "flexShrink",
  "flexBasis",
  "flex",
  "justifyContent",
  "alignItems",
  "alignContent",
  "alignSelf",
  "order",
  "gap",
  "columnGap",
  "rowGap",
  "aspectRatio",

  // Typography
  "fontFamily",
  "fontSize",
  "fontWeight",
  "fontStyle",
  "lineHeight",
  "textAlign",
  "textDecoration",
  "textTransform",
  "letterSpacing",
  "wordSpacing",
  "color",
  "wordBreak",
  "whiteSpace",
  "textOverflow",
  "textShadow",

  // Spacing
  "padding",
  "paddingTop",
  "paddingRight",
  "paddingBottom",
  "paddingLeft",
  "margin",
  "marginTop",
  "marginRight",
  "marginBottom",
  "marginLeft",

  // Border
  "border",
  "borderTop",
  "borderRight",
  "borderBottom",
  "borderLeft",
  "borderWidth",
  "borderTopWidth",
  "borderRightWidth",
  "borderBottomWidth",
  "borderLeftWidth",
  "borderStyle",
  "borderTopStyle",
  "borderRightStyle",
  "borderBottomStyle",
  "borderLeftStyle",
  "borderColor",
  "borderTopColor",
  "borderRightColor",
  "borderBottomColor",
  "borderLeftColor",
  "borderRadius",
  "borderTopLeftRadius",
  "borderTopRightRadius",
  "borderBottomLeftRadius",
  "borderBottomRightRadius",

  // Background
  "background",
  "backgroundColor",
  "backgroundImage",
  "backgroundSize",
  "backgroundPosition",
  "backgroundRepeat",
  "backgroundAttachment",
  "backgroundBlendMode",

  // Position
  "position",
  "top",
  "right",
  "bottom",
  "left",
  "float",
  "clear",

  // Effects
  "boxShadow",
  "filter",
  "backdropFilter",
  "transition",
  "transform",
  "transformOrigin",
  "animation",
];

/**
 * Regular expression to validate common CSS units (px, em, rem, %, vh, vw, etc.)
 */
export const CSS_UNIT_REGEX =
  /^(-?\d*\.?\d+)(px|em|rem|%|vh|vw|vmin|vmax|ch|ex|cm|mm|in|pt|pc|fr|s|ms|deg|rad|turn)?$/;

/**
 * Regular expression to validate color values (hex, rgb, rgba, hsl, hsla)
 */
export const COLOR_REGEX =
  /^(#([0-9a-f]{3,8})|(rgb|rgba|hsl|hsla)\(([^()]+)\))$/i;
