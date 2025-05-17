import React from "react";
import { cn } from "@/lib/utils";
import { useDragDrop } from "@/hooks/use-drag-drop";
import { useDispatch } from "react-redux";
import { addComponent } from "@/redux/slices/builderSlice";
import { v4 as uuidv4 } from "uuid";

interface DropZoneProps {
  parentId?: string | null;
  index?: number;
  className?: string;
  direction?: "horizontal" | "vertical";
  placeholder?: string;
}

/**
 * DropZone component
 * Handles dropping components onto the canvas or between existing components
 */
const DropZone: React.FC<DropZoneProps> = ({
  parentId = null,
  index = 0,
  className = "",
  direction = "vertical",
  placeholder = "Drop component here",
}) => {
  const dispatch = useDispatch();
  const { isDragging, draggedComponent, endDrag } = useDragDrop();

  // Only show when dragging
  if (!isDragging || !draggedComponent) {
    return null;
  }

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    e.currentTarget.classList.add("bg-blue-200");
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    e.currentTarget.classList.remove("bg-blue-200");
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    e.currentTarget.classList.remove("bg-blue-200");

    if (draggedComponent) {
      const componentId = uuidv4();

      // Create and add the new component
      dispatch(
        addComponent({
          id: componentId,
          type: draggedComponent.type,
          parentId,
          index,
          props: draggedComponent.defaultProps || {},
        })
      );

      // End the drag operation
      endDrag();
    }
  };

  return (
    <div
      className={cn(
        "border-2 border-dashed border-blue-400 bg-blue-50 transition-all ease-in-out duration-200",
        direction === "horizontal"
          ? "h-full mx-1 min-w-[80px]"
          : "w-full my-1 min-h-[80px]",
        isDragging ? "opacity-100" : "opacity-0 pointer-events-none",
        className
      )}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <div className="h-full w-full flex items-center justify-center text-blue-600 text-sm font-medium p-2 text-center">
        {placeholder}
      </div>
    </div>
  );
};

export default DropZone;
