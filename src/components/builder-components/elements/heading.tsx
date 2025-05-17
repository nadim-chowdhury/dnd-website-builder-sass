import React from "react";
import { cn } from "@/lib/utils";

export interface HeadingProps {
  id: string;
  content?: string;
  className?: string;
  style?: React.CSSProperties;
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  alignment?: "left" | "center" | "right" | "justify";
  isEditing?: boolean;
  isSelected?: boolean;
}

const alignmentClasses = {
  left: "text-left",
  center: "text-center",
  right: "text-right",
  justify: "text-justify",
};

/**
 * Heading component for the website builder
 * Supports h1-h6 levels with customizable alignment and styling
 */
export default function Heading({
  id,
  content = "Heading",
  className = "",
  style = {},
  level = 2,
  alignment = "left",
  isEditing = false,
  isSelected = false,
}: HeadingProps) {
  const TagName = `h${level}` as keyof JSX.IntrinsicElements;

  const headingClasses = cn(
    "font-bold tracking-tight",
    level === 1 && "text-4xl lg:text-5xl mb-6",
    level === 2 && "text-3xl lg:text-4xl mb-5",
    level === 3 && "text-2xl lg:text-3xl mb-4",
    level === 4 && "text-xl lg:text-2xl mb-3",
    level === 5 && "text-lg lg:text-xl mb-2",
    level === 6 && "text-base lg:text-lg mb-2",
    alignmentClasses[alignment],
    isSelected && !isEditing && "ring-2 ring-primary ring-offset-2",
    className
  );

  return (
    <TagName
      id={id}
      className={headingClasses}
      style={style}
      data-component-type="heading"
      data-heading-level={level}
      contentEditable={isEditing}
      suppressContentEditableWarning={isEditing}
    >
      {content}
    </TagName>
  );
}
