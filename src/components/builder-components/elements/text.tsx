import React from "react";
import { cn } from "@/lib/utils";

export interface TextProps {
  id: string;
  content?: string;
  className?: string;
  style?: React.CSSProperties;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  alignment?: "left" | "center" | "right" | "justify";
  isEditing?: boolean;
  isSelected?: boolean;
  as?: "p" | "span" | "div";
  isBold?: boolean;
  isItalic?: boolean;
  isUnderlined?: boolean;
}

const textSizes = {
  xs: "text-xs",
  sm: "text-sm",
  md: "text-base",
  lg: "text-lg",
  xl: "text-xl",
};

const alignmentClasses = {
  left: "text-left",
  center: "text-center",
  right: "text-right",
  justify: "text-justify",
};

/**
 * Text component for the website builder
 * Supports different sizes, alignments, and text styles
 */
export default function Text({
  id,
  content = "Text content goes here",
  className = "",
  style = {},
  size = "md",
  alignment = "left",
  isEditing = false,
  isSelected = false,
  as: Component = "p",
  isBold = false,
  isItalic = false,
  isUnderlined = false,
}: TextProps) {
  const textClasses = cn(
    textSizes[size],
    alignmentClasses[alignment],
    isBold && "font-bold",
    isItalic && "italic",
    isUnderlined && "underline",
    isSelected && !isEditing && "ring-2 ring-primary ring-offset-2",
    className
  );

  return (
    <Component
      id={id}
      className={textClasses}
      style={style}
      data-component-type="text"
      contentEditable={isEditing}
      suppressContentEditableWarning={isEditing}
    >
      {content}
    </Component>
  );
}
