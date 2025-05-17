import React, { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ContainerProps {
  children?: ReactNode;
  maxWidth?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "full" | "none";
  padding?: string;
  margin?: string;
  className?: string;
  style?: React.CSSProperties;
  background?: string;
  id?: string;
  centered?: boolean;
}

const Container = ({
  children,
  maxWidth = "lg",
  padding = "1rem",
  margin = "0 auto",
  className = "",
  style = {},
  background = "transparent",
  id,
  centered = true,
}: ContainerProps) => {
  // Map of maxWidth values to Tailwind classes
  const maxWidthClasses = {
    xs: "max-w-xs",
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
    xl: "max-w-xl",
    "2xl": "max-w-2xl",
    full: "max-w-full",
    none: "",
  };

  const containerClassName = cn(
    "w-full",
    maxWidth !== "none" && maxWidthClasses[maxWidth],
    centered && "mx-auto",
    className
  );

  const containerStyle = {
    padding,
    margin: !centered ? margin : undefined,
    background,
    ...style,
  };

  return (
    <div
      id={id}
      className={containerClassName}
      style={containerStyle}
      data-component-type="container"
      data-builder-droppable="true"
    >
      {children}
    </div>
  );
};

// Metadata used by the builder
Container.displayName = "Container";
Container.builderId = "layout/container";
Container.builderCategory = "Layout";
Container.builderDescription =
  "A container with customizable width and padding";
Container.builderIcon = "BoxIcon";

// Default props for when component is first added to the canvas
Container.defaultProps = {
  maxWidth: "lg",
  padding: "1rem",
  margin: "0 auto",
  background: "transparent",
  centered: true,
};

export default Container;
