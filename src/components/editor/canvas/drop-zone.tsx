import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { useDragDrop, DragItem } from "@/hooks/use-drag-drop";
import { useDispatch } from "react-redux";
import { addComponent } from "@/redux/slices/builderSlice";
import { v4 as uuidv4 } from "uuid";
import { ComponentType } from "@/types/components";

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
  const { isDragging, draggedItem } = useDragDrop();
  const [isOver, setIsOver] = useState(false);

  // Only show when dragging
  if (!isDragging || !draggedItem) {
    return null;
  }

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsOver(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsOver(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsOver(false);

    if (draggedItem) {
      const componentId = uuidv4();

      // Create and add the new component
      dispatch(
        addComponent({
          id: componentId,
          name:
            draggedItem.type.charAt(0).toUpperCase() +
            draggedItem.type.slice(1),
          type: draggedItem.type as ComponentType,
          parentId,
          order: index,
          props: draggedItem.data || {},
        })
      );

      // Note: The drag state will be reset by the global handlers in useDragDrop
      // So we don't need to explicitly call an endDrag function
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
        isOver ? "bg-blue-200" : "",
        className
      )}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      data-droppable="true"
      data-component-id={parentId || "root"}
      data-drop-index={index}
    >
      <div className="h-full w-full flex items-center justify-center text-blue-600 text-sm font-medium p-2 text-center">
        {placeholder}
      </div>
    </div>
  );
};

export default DropZone;
