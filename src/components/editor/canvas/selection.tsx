import React, { useEffect, useRef } from "react";
import { useEditorState } from "@/hooks/use-editor-state";
import { useSelector } from "react-redux";
import { selectBuilderComponents } from "@/redux/selectors/builder-selectors";
import { cn } from "@/lib/utils";

interface SelectionProps {
  className?: string;
}

/**
 * Selection component
 * Renders the selection outline and handles for the currently selected component
 */
const Selection: React.FC<SelectionProps> = ({ className = "" }) => {
  const { selectedComponentId } = useEditorState();
  const components = useSelector(selectBuilderComponents);
  const selectionRef = useRef<HTMLDivElement>(null);

  // Find selected component element and get its position
  useEffect(() => {
    if (!selectedComponentId) return;

    const updateSelectionPosition = () => {
      const selectedElement = document.getElementById(selectedComponentId);
      if (!selectedElement || !selectionRef.current) return;

      const rect = selectedElement.getBoundingClientRect();
      const canvas = selectedElement.closest("[data-canvas]");

      if (!canvas) return;

      const canvasRect = canvas.getBoundingClientRect();

      // Calculate position relative to canvas
      const top = rect.top - canvasRect.top;
      const left = rect.left - canvasRect.left;
      const width = rect.width;
      const height = rect.height;

      // Update selection outline position
      selectionRef.current.style.top = `${top}px`;
      selectionRef.current.style.left = `${left}px`;
      selectionRef.current.style.width = `${width}px`;
      selectionRef.current.style.height = `${height}px`;
      selectionRef.current.style.display = "block";
    };

    // Update position immediately and on resize
    updateSelectionPosition();
    window.addEventListener("resize", updateSelectionPosition);

    // Use MutationObserver to detect DOM changes
    const observer = new MutationObserver(updateSelectionPosition);
    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ["style", "class"],
    });

    return () => {
      window.removeEventListener("resize", updateSelectionPosition);
      observer.disconnect();
    };
  }, [selectedComponentId]);

  // Get selected component info
  const selectedComponent = components.find(
    (c) => c.id === selectedComponentId
  );

  if (!selectedComponentId || !selectedComponent) {
    return null;
  }

  // Positions for the resize handles
  const handles = [
    { position: "top-left", cursor: "nwse-resize" },
    { position: "top", cursor: "ns-resize" },
    { position: "top-right", cursor: "nesw-resize" },
    { position: "right", cursor: "ew-resize" },
    { position: "bottom-right", cursor: "nwse-resize" },
    { position: "bottom", cursor: "ns-resize" },
    { position: "bottom-left", cursor: "nesw-resize" },
    { position: "left", cursor: "ew-resize" },
  ];

  return (
    <div
      ref={selectionRef}
      className={cn(
        "absolute border-2 border-blue-500 pointer-events-none z-50",
        className
      )}
      style={{ display: "none" }}
    >
      {/* Component label */}
      <div className="absolute -top-7 left-0 bg-blue-500 text-white px-2 py-1 text-xs font-medium rounded-t-md">
        {selectedComponent.type}
      </div>

      {/* Resize handles */}
      {handles.map(({ position, cursor }) => (
        <div
          key={position}
          className={cn(
            "absolute w-2 h-2 bg-white border-2 border-blue-500 rounded-sm",
            "pointer-events-auto hover:scale-110 transition-transform",
            position === "top-left" &&
              "top-0 left-0 -translate-x-1/2 -translate-y-1/2",
            position === "top" &&
              "top-0 left-1/2 -translate-x-1/2 -translate-y-1/2",
            position === "top-right" &&
              "top-0 right-0 translate-x-1/2 -translate-y-1/2",
            position === "right" &&
              "top-1/2 right-0 translate-x-1/2 -translate-y-1/2",
            position === "bottom-right" &&
              "bottom-0 right-0 translate-x-1/2 translate-y-1/2",
            position === "bottom" &&
              "bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2",
            position === "bottom-left" &&
              "bottom-0 left-0 -translate-x-1/2 translate-y-1/2",
            position === "left" &&
              "top-1/2 left-0 -translate-x-1/2 -translate-y-1/2"
          )}
          style={{ cursor }}
        />
      ))}

      {/* Action buttons above selection */}
      <div className="absolute -top-7 right-0 flex items-center gap-1">
        <button className="bg-blue-500 text-white p-1 rounded hover:bg-blue-600 transition-colors">
          <span className="sr-only">Duplicate</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-3 w-3"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M7 9a2 2 0 012-2h6a2 2 0 012 2v6a2 2 0 01-2 2H9a2 2 0 01-2-2V9z" />
            <path d="M5 3a2 2 0 00-2 2v6a2 2 0 002 2V5h8a2 2 0 00-2-2H5z" />
          </svg>
        </button>
        <button className="bg-red-500 text-white p-1 rounded hover:bg-red-600 transition-colors">
          <span className="sr-only">Delete</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-3 w-3"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Selection;
