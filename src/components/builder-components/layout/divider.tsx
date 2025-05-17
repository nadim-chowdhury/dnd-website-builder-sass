import React from "react";
import { cn } from "@/lib/utils";

interface DividerProps {
  width?: string;
  height?: string;
  color?: string;
  style?: "solid" | "dashed" | "dotted" | "double";
  margin?: string;
  className?: string;
  orientation?: "horizontal" | "vertical";
  id?: string;
}

const Divider = ({
  width = "100%",
  height = "1px",
  color = "#e2e8f0",
  style: borderStyle = "solid",
  margin = "1rem 0",
  className = "",
  orientation = "horizontal",
  id,
}: DividerProps) => {
  const isVertical = orientation === "vertical";

  const dividerClassName = cn(
    "divider",
    isVertical ? "h-full w-auto inline-block" : "w-full h-auto block",
    className
  );

  const dividerStyle = {
    width: isVertical ? height : width, // Swap dimensions for vertical divider
    height: isVertical ? width : height,
    margin,
    backgroundColor: borderStyle === "solid" ? color : "transparent",
    borderTop:
      !isVertical && borderStyle !== "solid"
        ? `${height} ${borderStyle} ${color}`
        : undefined,
    borderLeft:
      isVertical && borderStyle !== "solid"
        ? `${height} ${borderStyle} ${color}`
        : undefined,
  };

  return (
    <div
      id={id}
      className={dividerClassName}
      style={dividerStyle}
      role="separator"
      aria-orientation={orientation}
      data-component-type="divider"
    />
  );
};

// Metadata used by the builder
Divider.displayName = "Divider";
Divider.builderId = "layout/divider";
Divider.builderCategory = "Layout";
Divider.builderDescription = "A horizontal or vertical dividing line";
Divider.builderIcon = "MinusIcon";

// Default props for when component is first added to the canvas
Divider.defaultProps = {
  width: "100%",
  height: "1px",
  color: "#e2e8f0",
  style: "solid",
  margin: "1rem 0",
  orientation: "horizontal",
};

export default Divider;
