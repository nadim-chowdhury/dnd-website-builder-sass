import { z } from "zod";

// Style schema definitions
export const StyleSchema = z.object({
  width: z.string().optional(),
  height: z.string().optional(),
  minWidth: z.string().optional(),
  minHeight: z.string().optional(),
  maxWidth: z.string().optional(),
  maxHeight: z.string().optional(),
  display: z
    .enum([
      "block",
      "inline",
      "flex",
      "grid",
      "none",
      "inline-block",
      "inline-flex",
      "inline-grid",
    ])
    .optional(),
  position: z
    .enum(["static", "relative", "absolute", "fixed", "sticky"])
    .optional(),
  top: z.string().optional(),
  right: z.string().optional(),
  bottom: z.string().optional(),
  left: z.string().optional(),
  margin: z.string().optional(),
  marginTop: z.string().optional(),
  marginRight: z.string().optional(),
  marginBottom: z.string().optional(),
  marginLeft: z.string().optional(),
  padding: z.string().optional(),
  paddingTop: z.string().optional(),
  paddingRight: z.string().optional(),
  paddingBottom: z.string().optional(),
  paddingLeft: z.string().optional(),
  color: z.string().optional(),
  backgroundColor: z.string().optional(),
  backgroundImage: z.string().optional(),
  backgroundSize: z.string().optional(),
  backgroundPosition: z.string().optional(),
  backgroundRepeat: z.string().optional(),
  border: z.string().optional(),
  borderTop: z.string().optional(),
  borderRight: z.string().optional(),
  borderBottom: z.string().optional(),
  borderLeft: z.string().optional(),
  borderRadius: z.string().optional(),
  boxShadow: z.string().optional(),
  opacity: z.number().min(0).max(1).optional(),
  zIndex: z.number().optional(),
  overflow: z.enum(["visible", "hidden", "scroll", "auto"]).optional(),

  // Typography
  fontFamily: z.string().optional(),
  fontSize: z.string().optional(),
  fontWeight: z
    .union([
      z.literal("normal"),
      z.literal("bold"),
      z.literal("100"),
      z.literal("200"),
      z.literal("300"),
      z.literal("400"),
      z.literal("500"),
      z.literal("600"),
      z.literal("700"),
      z.literal("800"),
      z.literal("900"),
    ])
    .optional(),
  lineHeight: z.string().optional(),
  letterSpacing: z.string().optional(),
  textAlign: z.enum(["left", "center", "right", "justify"]).optional(),
  textDecoration: z.string().optional(),
  textTransform: z
    .enum(["none", "capitalize", "uppercase", "lowercase"])
    .optional(),

  // Flex & Grid
  flexDirection: z
    .enum(["row", "row-reverse", "column", "column-reverse"])
    .optional(),
  flexWrap: z.enum(["nowrap", "wrap", "wrap-reverse"]).optional(),
  flexGrow: z.number().optional(),
  flexShrink: z.number().optional(),
  flexBasis: z.string().optional(),
  justifyContent: z
    .enum([
      "flex-start",
      "flex-end",
      "center",
      "space-between",
      "space-around",
      "space-evenly",
    ])
    .optional(),
  alignItems: z
    .enum(["stretch", "flex-start", "flex-end", "center", "baseline"])
    .optional(),
  alignContent: z
    .enum([
      "stretch",
      "flex-start",
      "flex-end",
      "center",
      "space-between",
      "space-around",
    ])
    .optional(),
  gridTemplateColumns: z.string().optional(),
  gridTemplateRows: z.string().optional(),
  gridGap: z.string().optional(),
  gridColumnGap: z.string().optional(),
  gridRowGap: z.string().optional(),

  // Animation
  transition: z.string().optional(),
  transform: z.string().optional(),
  animation: z.string().optional(),

  // Responsive styles
  sm: z.lazy(() => StyleSchema.optional()),
  md: z.lazy(() => StyleSchema.optional()),
  lg: z.lazy(() => StyleSchema.optional()),
  xl: z.lazy(() => StyleSchema.optional()),

  // Custom properties
  cursor: z
    .enum([
      "default",
      "pointer",
      "text",
      "move",
      "not-allowed",
      "grab",
      "grabbing",
    ])
    .optional(),
  userSelect: z.enum(["none", "auto", "text", "all"]).optional(),
});

// Event handler schema
export const EventHandlerSchema = z.object({
  type: z.enum([
    "click",
    "hover",
    "mouseenter",
    "mouseleave",
    "focus",
    "blur",
    "submit",
    "change",
    "scroll",
    "keydown",
    "keyup",
  ]),
  action: z.enum([
    "navigate",
    "toggle",
    "submit",
    "openDialog",
    "closeDialog",
    "toggleDialog",
    "custom",
  ]),
  target: z.string().optional(),
  params: z.record(z.any()).optional(),
  customCode: z.string().optional(),
});

// Component schema
export const BaseComponentSchema = z.object({
  id: z.string().uuid(),
  type: z.string(),
  name: z.string().optional(),
  content: z.string().optional(),
  attributes: z
    .record(z.string().or(z.number()).or(z.boolean()).nullable())
    .optional(),
  styles: StyleSchema.optional(),
  events: z.array(EventHandlerSchema).optional(),
  parentId: z.string().nullable().optional(),
  order: z.number().int().nonnegative().optional(),
  visible: z.boolean().default(true),
  locked: z.boolean().default(false),
  isContainer: z.boolean().default(false),
  metadata: z.record(z.any()).optional(),
});

// Specific component types that extend BaseComponentSchema
export const ContainerComponentSchema = BaseComponentSchema.extend({
  type: z.literal("container"),
  isContainer: z.literal(true),
  children: z.array(z.string()),
  layout: z.enum(["flex", "grid", "normal"]).optional(),
});

export const TextComponentSchema = BaseComponentSchema.extend({
  type: z.literal("text"),
  content: z.string(),
});

export const HeadingComponentSchema = BaseComponentSchema.extend({
  type: z.literal("heading"),
  content: z.string(),
  level: z.enum(["h1", "h2", "h3", "h4", "h5", "h6"]),
});

export const ImageComponentSchema = BaseComponentSchema.extend({
  type: z.literal("image"),
  attributes: z
    .object({
      src: z.string(),
      alt: z.string().optional(),
      width: z.number().or(z.string()).optional(),
      height: z.number().or(z.string()).optional(),
      loading: z.enum(["eager", "lazy"]).optional(),
      objectFit: z
        .enum(["contain", "cover", "fill", "none", "scale-down"])
        .optional(),
    })
    .optional(),
});

export const ButtonComponentSchema = BaseComponentSchema.extend({
  type: z.literal("button"),
  content: z.string(),
  attributes: z
    .object({
      disabled: z.boolean().optional(),
      type: z.enum(["button", "submit", "reset"]).optional(),
      variant: z
        .enum(["primary", "secondary", "outline", "ghost", "link"])
        .optional(),
      size: z.enum(["sm", "md", "lg", "xl"]).optional(),
    })
    .optional(),
});

export const FormComponentSchema = BaseComponentSchema.extend({
  type: z.literal("form"),
  isContainer: z.literal(true),
  children: z.array(z.string()),
  attributes: z
    .object({
      action: z.string().optional(),
      method: z.enum(["get", "post"]).optional(),
      enctype: z
        .enum([
          "application/x-www-form-urlencoded",
          "multipart/form-data",
          "text/plain",
        ])
        .optional(),
      validateOnSubmit: z.boolean().optional(),
      successRedirect: z.string().optional(),
    })
    .optional(),
});

export const InputComponentSchema = BaseComponentSchema.extend({
  type: z.literal("input"),
  attributes: z
    .object({
      type: z.enum([
        "text",
        "email",
        "password",
        "number",
        "date",
        "time",
        "datetime-local",
        "tel",
        "url",
        "search",
        "file",
        "color",
        "range",
        "hidden",
      ]),
      name: z.string(),
      placeholder: z.string().optional(),
      value: z.string().optional(),
      required: z.boolean().optional(),
      disabled: z.boolean().optional(),
      readonly: z.boolean().optional(),
      min: z.number().or(z.string()).optional(),
      max: z.number().or(z.string()).optional(),
      step: z.number().or(z.string()).optional(),
      pattern: z.string().optional(),
      validation: z.record(z.any()).optional(),
    })
    .optional(),
});

export const GridComponentSchema = BaseComponentSchema.extend({
  type: z.literal("grid"),
  isContainer: z.literal(true),
  children: z.array(z.string()),
  attributes: z
    .object({
      columns: z.number().or(z.string()).optional(),
      rows: z.number().or(z.string()).optional(),
      gap: z.string().optional(),
      templateColumns: z.string().optional(),
      templateRows: z.string().optional(),
      autoFlow: z
        .enum(["row", "column", "row dense", "column dense"])
        .optional(),
    })
    .optional(),
});

export const SectionComponentSchema = BaseComponentSchema.extend({
  type: z.literal("section"),
  isContainer: z.literal(true),
  children: z.array(z.string()),
});

// Component registry schema
export const ComponentSchema = z.discriminatedUnion("type", [
  ContainerComponentSchema,
  TextComponentSchema,
  HeadingComponentSchema,
  ImageComponentSchema,
  ButtonComponentSchema,
  FormComponentSchema,
  InputComponentSchema,
  GridComponentSchema,
  SectionComponentSchema,
  // Add fallback for other component types
  BaseComponentSchema,
]);

// Export types
export type Style = z.infer<typeof StyleSchema>;
export type EventHandler = z.infer<typeof EventHandlerSchema>;
export type BaseComponent = z.infer<typeof BaseComponentSchema>;
export type ContainerComponent = z.infer<typeof ContainerComponentSchema>;
export type TextComponent = z.infer<typeof TextComponentSchema>;
export type HeadingComponent = z.infer<typeof HeadingComponentSchema>;
export type ImageComponent = z.infer<typeof ImageComponentSchema>;
export type ButtonComponent = z.infer<typeof ButtonComponentSchema>;
export type FormComponent = z.infer<typeof FormComponentSchema>;
export type InputComponent = z.infer<typeof InputComponentSchema>;
export type GridComponent = z.infer<typeof GridComponentSchema>;
export type SectionComponent = z.infer<typeof SectionComponentSchema>;
export type Component = z.infer<typeof ComponentSchema>;

// Utility function to validate a component
export const validateComponent = (component: unknown): Component => {
  return ComponentSchema.parse(component);
};

// Factory function to create a new component with default values
export function createComponent<T extends BaseComponent>(
  type: string,
  overrides: Partial<T> = {}
): T {
  const base: BaseComponent = {
    id: crypto.randomUUID(),
    type,
    visible: true,
    locked: false,
    isContainer: false,
    ...overrides,
  };

  return base as T;
}
