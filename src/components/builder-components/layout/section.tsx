import React from "react";
import { cn } from "@/lib/utils";
import { useEditorState } from "@/hooks/use-editor-state";

interface SectionProps {
  id: string;
  children?: React.ReactNode;
  className?: string;
  backgroundColor?: string;
  padding?: string | number;
  margin?: string | number;
  style?: React.CSSProperties;
  fullWidth?: boolean;
  height?: string;
  backgroundImage?: string;
  dataComponent?: string;
}

/**
 * Section component for the website builder
 * Acts as a container for other components with customizable styling
 */
export const Section: React.FC<SectionProps> = ({
  id,
  children,
  className = "",
  backgroundColor = "transparent",
  padding = 4,
  margin = 0,
  style = {},
  fullWidth = false,
  height = "auto",
  backgroundImage,
  dataComponent = "section",
}) => {
  const { selectedComponentId } = useEditorState();
  const isSelected = selectedComponentId === id;

  // Convert padding/margin number to rem if it's a number
  const paddingValue =
    typeof padding === "number" ? `${padding * 0.25}rem` : padding;
  const marginValue =
    typeof margin === "number" ? `${margin * 0.25}rem` : margin;

  // Create background style with image if provided
  const backgroundStyle = backgroundImage
    ? {
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }
    : {};

  return (
    <section
      id={id}
      data-component={dataComponent}
      className={cn(
        "relative",
        fullWidth ? "w-full" : "container mx-auto",
        isSelected && "outline outline-2 outline-blue-500",
        className
      )}
      style={{
        backgroundColor,
        padding: paddingValue,
        margin: marginValue,
        height,
        ...backgroundStyle,
        ...style,
      }}
      data-selected={isSelected}
    >
      <div className="relative z-10">{children}</div>
    </section>
  );
};

export default Section;
