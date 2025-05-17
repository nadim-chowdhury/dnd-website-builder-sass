import React, { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ColumnProps {
  children?: ReactNode;
  width?: string;
  className?: string;
  style?: React.CSSProperties;
  responsive?: {
    mobile?: string;
    tablet?: string;
    desktop?: string;
  };
  alignment?: "start" | "center" | "end" | "stretch";
  padding?: string;
  id?: string;
}

const Column = ({
  children,
  width = "100%",
  className = "",
  style = {},
  responsive = {
    mobile: "100%",
    tablet: "50%",
    desktop: width,
  },
  alignment = "start",
  padding = "1rem",
  id,
}: ColumnProps) => {
  // Convert alignment to flex classes
  const alignmentClasses = {
    start: "items-start",
    center: "items-center",
    end: "items-end",
    stretch: "items-stretch",
  };

  // Build responsive classes
  const responsiveClasses = [
    `w-full`, // Default for mobile
    responsive.tablet && `md:w-[${responsive.tablet}]`,
    responsive.desktop && `lg:w-[${responsive.desktop}]`,
  ].filter(Boolean);

  const combinedClassName = cn(
    "flex flex-col",
    alignmentClasses[alignment],
    ...responsiveClasses,
    className
  );

  const combinedStyle = {
    padding,
    ...style,
  };

  return (
    <div
      id={id}
      className={combinedClassName}
      style={combinedStyle}
      data-component-type="column"
      data-builder-droppable="true"
    >
      {children}
    </div>
  );
};

// Metadata used by the builder
Column.displayName = "Column";
Column.builderId = "layout/column";
Column.builderCategory = "Layout";
Column.builderDescription = "A flexible column container for layout";
Column.builderIcon = "ColumnsIcon";

// Default props for when component is first added to the canvas
Column.defaultProps = {
  width: "100%",
  responsive: {
    mobile: "100%",
    tablet: "50%",
    desktop: "33.333%",
  },
  alignment: "start",
  padding: "1rem",
};

export default Column;
