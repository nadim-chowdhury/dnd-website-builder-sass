import React from "react";
import { cn } from "@/lib/utils";
import { useEditorState } from "@/hooks/use-editor-state";

interface GridProps {
  id: string;
  children?: React.ReactNode;
  columns?: number;
  gap?: number;
  className?: string;
  rowGap?: number;
  columnGap?: number;
  autoColumns?: boolean;
  minColumnWidth?: string;
  responsiveBreakpoint?: string;
  style?: React.CSSProperties;
  dataComponent?: string;
}

/**
 * Grid component for the website builder
 * Provides a flexible grid layout system with customizable columns and gaps
 */
export const Grid: React.FC<GridProps> = ({
  id,
  children,
  columns = 3,
  gap = 4,
  rowGap,
  columnGap,
  className = "",
  autoColumns = false,
  minColumnWidth = "250px",
  responsiveBreakpoint = "md",
  style = {},
  dataComponent = "grid",
}) => {
  const { selectedComponentId } = useEditorState();
  const isSelected = selectedComponentId === id;

  // Calculate grid template columns based on props
  const gridTemplateColumns = autoColumns
    ? `repeat(auto-fit, minmax(${minColumnWidth}, 1fr))`
    : `repeat(${columns}, minmax(0, 1fr))`;

  // Use rowGap/columnGap if provided, otherwise use the general gap
  const rowGapValue = rowGap !== undefined ? rowGap : gap;
  const columnGapValue = columnGap !== undefined ? columnGap : gap;

  return (
    <div
      id={id}
      data-component={dataComponent}
      className={cn(
        "grid w-full",
        isSelected && "outline outline-2 outline-blue-500",
        className
      )}
      style={{
        gridTemplateColumns,
        gap: `${rowGapValue * 0.25}rem ${columnGapValue * 0.25}rem`,
        ...style,
      }}
      data-selected={isSelected}
    >
      {children}
    </div>
  );
};

export default Grid;
