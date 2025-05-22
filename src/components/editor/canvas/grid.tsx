import React from "react";
import { cn } from "@/lib/utils";
import DropZone from "./drop-zone";
import { useDragDrop } from "@/hooks/use-drag-drop";
import { useSelector } from "react-redux";
import { selectComponents } from "@/redux/selectors/builder-selectors";

interface GridProps {
  className?: string;
  columns?: number;
}

/**
 * Grid component for the editor canvas
 * Displays a grid of drop zones for component placement
 */
const Grid: React.FC<GridProps> = ({ className = "", columns = 3 }) => {
  const { isDragging, draggedItem } = useDragDrop();
  const components = useSelector(selectComponents);

  // Don't render if not dragging or no item to place
  if (!isDragging || !draggedItem) {
    return null;
  }

  // Check if there are already components on the canvas
  // Note: selectComponents returns an object, so we check if it has any keys
  const hasExistingComponents = Object.keys(components).length > 0;

  // Don't show the grid if there are already components on the canvas
  if (hasExistingComponents) {
    return null;
  }

  // Generate cells for the grid
  const cells = Array.from({ length: columns * 3 }).map((_, index) => {
    return (
      <div key={`grid-cell-${index}`} className="relative min-h-[150px]">
        <DropZone
          index={index}
          placeholder={`Drop ${draggedItem.type} here`}
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


// src/components/editor/canvas/grid.tsx

// import React from "react";
// import { useSelector } from "react-redux";
// import { RootState } from "@/redux/store";

// /**
//  * Grid component
//  * Renders a grid overlay on the canvas for alignment
//  */
// const Grid: React.FC = () => {
//   const { gridVisible, gridSize } = useSelector(
//     (state: RootState) => state.builder.canvasConfig
//   );

//   if (!gridVisible) {
//     return null;
//   }

//   return (
//     <div
//       className="absolute inset-0 pointer-events-none z-0"
//       style={{
//         backgroundImage: `
//           linear-gradient(to right, rgba(81, 92, 230, 0.1) 1px, transparent 1px),
//           linear-gradient(to bottom, rgba(81, 92, 230, 0.1) 1px, transparent 1px)
//         `,
//         backgroundSize: `${gridSize}px ${gridSize}px`,
//       }}
//     />
//   );
// };

// export default Grid;