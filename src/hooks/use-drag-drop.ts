import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { moveComponent } from "../redux/slices/builderSlice";
import { useComponents } from "./use-components";
import { useComponentFocus } from "./use-component-focus";
import { useEditorState } from "./use-editor-state";

export interface DragItem {
  id: string;
  type: string;
  parentId: string | null;
  isNew?: boolean;
  data?: any;
}

export interface DropResult {
  id?: string;
  parentId: string | null;
  index: number;
}

/**
 * Custom hook to handle drag and drop functionality for components
 */
export const useDragDrop = () => {
  const dispatch = useDispatch();
  const { isEditing } = useEditorState();
  const { canAcceptChildren, addNewComponent } = useComponents();
  const { setFocus } = useComponentFocus();

  // Track the currently dragged item
  const [draggedItem, setDraggedItem] = useState<DragItem | null>(null);
  const [dropTarget, setDropTarget] = useState<string | null>(null);
  const [dropIndicatorPosition, setDropIndicatorPosition] = useState<{
    x: number;
    y: number;
    width: number;
  } | null>(null);

  // Refs to store drag-related data
  const dragStartPositionRef = useRef<{ x: number; y: number } | null>(null);
  const draggingRef = useRef<boolean>(false);

  /**
   * Update drag UI based on current position
   */
  const updateDragUI = useCallback(
    (x: number, y: number) => {
      if (!draggedItem) return;

      // Find element under cursor
      const elementsAtPoint = document.elementsFromPoint(x, y);
      let dropZoneElement = null;

      // Find first element that's a valid drop target
      for (const element of elementsAtPoint) {
        if (element.getAttribute("data-droppable") === "true") {
          dropZoneElement = element;
          break;
        }
      }

      if (dropZoneElement) {
        const componentId = dropZoneElement.getAttribute("data-component-id");
        const componentType = dropZoneElement.getAttribute(
          "data-component-type"
        );

        // Check if this is a valid drop target (can accept children)
        if (
          componentId &&
          componentType &&
          canAcceptChildren(componentType as any)
        ) {
          setDropTarget(componentId);

          // Calculate position for drop indicator
          const rect = dropZoneElement.getBoundingClientRect();
          setDropIndicatorPosition({
            x: rect.left,
            y: rect.top,
            width: rect.width,
          });
        } else {
          setDropTarget(null);
          setDropIndicatorPosition(null);
        }
      } else {
        setDropTarget(null);
        setDropIndicatorPosition(null);
      }
    },
    [draggedItem, canAcceptChildren]
  );

  /**
   * Handle drop operation
   */
  const handleDrop = useCallback(
    (x: number, y: number) => {
      if (!draggedItem || !dropTarget) return;

      // Find the drop target elements
      const elementsAtPoint = document.elementsFromPoint(x, y);
      let dropZoneElement = null;
      let dropIndex = -1;

      // Find first element that's a valid drop target
      for (const element of elementsAtPoint) {
        if (element.getAttribute("data-droppable") === "true") {
          dropZoneElement = element;

          // Try to get the index for positioning
          const indexAttr = element.getAttribute("data-drop-index");
          if (indexAttr) {
            dropIndex = parseInt(indexAttr, 10);
          }
          break;
        }
      }

      if (dropZoneElement) {
        const componentId = dropZoneElement.getAttribute("data-component-id");

        if (componentId) {
          if (draggedItem.isNew) {
            // Create a new component
            const newComponentId = addNewComponent(
              draggedItem.type as any,
              componentId,
              draggedItem.data,
              dropIndex >= 0 ? dropIndex : undefined
            );

            if (newComponentId) {
              setFocus(newComponentId);
            }
          } else {
            // Move an existing component
            dispatch(
              moveComponent({
                componentId: draggedItem.id,
                newParentId: componentId,
                index: dropIndex,
              })
            );

            setFocus(draggedItem.id);
          }
        }
      }
    },
    [draggedItem, dropTarget, dispatch, addNewComponent, setFocus]
  );

  /**
   * Start dragging a component
   * @param item - The drag item
   * @param event - The drag event
   */
  const startDrag = useCallback(
    (item: DragItem, event: React.MouseEvent | React.TouchEvent) => {
      if (!isEditing) return;

      // Get initial position from mouse or touch event
      const clientX =
        "touches" in event ? event.touches[0].clientX : event.clientX;
      const clientY =
        "touches" in event ? event.touches[0].clientY : event.clientY;

      dragStartPositionRef.current = { x: clientX, y: clientY };
      draggingRef.current = true;
      setDraggedItem(item);

      // Add global event listeners for drag movement and end
      const handleDragMove = (e: MouseEvent | TouchEvent) => {
        const currentX = "touches" in e ? e.touches[0].clientX : e.clientX;
        const currentY = "touches" in e ? e.touches[0].clientY : e.clientY;

        // Update UI during drag
        updateDragUI(currentX, currentY);
      };

      const handleDragEnd = (e: MouseEvent | TouchEvent) => {
        const currentX =
          "touches" in e
            ? e.changedTouches && e.changedTouches[0]
              ? e.changedTouches[0].clientX
              : 0
            : e.clientX;
        const currentY =
          "touches" in e
            ? e.changedTouches && e.changedTouches[0]
              ? e.changedTouches[0].clientY
              : 0
            : e.clientY;

        // Handle drop at current position
        handleDrop(currentX, currentY);

        // Clean up
        draggingRef.current = false;
        setDraggedItem(null);
        setDropTarget(null);
        setDropIndicatorPosition(null);

        window.removeEventListener("mousemove", handleDragMove);
        window.removeEventListener("touchmove", handleDragMove);
        window.removeEventListener("mouseup", handleDragEnd);
        window.removeEventListener("touchend", handleDragEnd);
      };

      window.addEventListener("mousemove", handleDragMove);
      window.addEventListener("touchmove", handleDragMove);
      window.addEventListener("mouseup", handleDragEnd);
      window.addEventListener("touchend", handleDragEnd);
    },
    [isEditing, updateDragUI, handleDrop]
  );

  // Clean up any lingering state on unmount
  useEffect(() => {
    return () => {
      draggingRef.current = false;
      dragStartPositionRef.current = null;
      setDraggedItem(null);
      setDropTarget(null);
      setDropIndicatorPosition(null);
    };
  }, []);

  return {
    startDrag,
    draggedItem,
    dropTarget,
    dropIndicatorPosition,
    isDragging: draggingRef.current,
  };
};

export default useDragDrop;
