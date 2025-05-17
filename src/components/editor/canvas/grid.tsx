import React from "react";
import { cn } from "@/lib/utils";
import DropZone from "./drop-zone";
import { useDragDrop } from "@/hooks/use-drag-drop";
import { useSelector } from "react-redux";
import { selectBuilderComponents } from "@/redux/selectors/builder-selectors";

interface GridProps {
  className?: string;
  columns?: number;
}

/**
 * Grid component for the editor canvas
 * Displays a grid of drop zones for component placement
 */
const Grid: React.FC<GridProps> = ({ className = "", columns = 3 }) => {
  const { isDragging, draggedComponent } = useDragDrop();
  const components = useSelector(selectBuilderComponents);

  // Don't render if not dragging or no component to place
  if (!isDragging || !draggedComponent) {
    return null;
  }

  // Don't show the grid if there are already components on the canvas
  if (components.length > 0) {
    return null;
  }

  // Generate cells for the grid
  const cells = Array.from({ length: columns * 3 }).map((_, index) => {
    return (
      <div key={`grid-cell-${index}`} className="relative min-h-[150px]">
        <DropZone
          index={index}
          placeholder={`Drop ${draggedComponent.name} here`}
          className="h-full"
        />
      </div>
    );
  });

  return (
    <div
      className={cn(
        "absolute inset-0 grid z-10 p-8 pointer-events-none",
        className
      )}
      style={{
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
        gap: "1rem",
      }}
    >
      {cells}
    </div>
  );
};

export default Grid;
