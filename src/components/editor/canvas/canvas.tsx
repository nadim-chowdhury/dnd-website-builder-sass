import React, { useRef, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useDragDrop } from "@/hooks/use-drag-drop";
import { useEditorState } from "@/hooks/use-editor-state";
import { useResponsivePreview } from "@/hooks/use-responsive-preview";
import Grid from "./grid";
import DropZone from "./drop-zone";
import Placeholder from "./placeholder";
import ErrorBoundary from "@/components/common/error-boundary";
import { cn } from "@/lib/utils";
import { selectBuilderComponents } from "@/redux/selectors/builder-selectors";
import { setSelectedComponentId } from "@/redux/slices/builderSlice";
import type { ComponentItem } from "@/types/components";

interface CanvasProps {
  className?: string;
  projectId: string;
}

/**
 * Canvas component
 * The main editing area where components are rendered and can be interacted with
 */
const Canvas: React.FC<CanvasProps> = ({ className = "", projectId }) => {
  const dispatch = useDispatch();
  const canvasRef = useRef<HTMLDivElement>(null);
  const components = useSelector(selectBuilderComponents);
  const { isDragging, draggedComponent } = useDragDrop();
  const { selectedComponentId } = useEditorState();
  const { device, width: deviceWidth } = useResponsivePreview();
  const [canvasScale, setCanvasScale] = useState<number>(1);

  // Handle click outside components to deselect
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (canvasRef.current && e.target instanceof Node) {
        if (canvasRef.current.contains(e.target)) {
          // Check if the click was directly on the canvas and not on a component
          if (e.target === canvasRef.current) {
            dispatch(setSelectedComponentId(null));
          }
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dispatch]);

  // Calculate scale based on device preview
  useEffect(() => {
    const calculateScale = () => {
      if (device === "mobile") {
        return 0.5;
      } else if (device === "tablet") {
        return 0.75;
      }
      return 1;
    };

    setCanvasScale(calculateScale());
  }, [device]);

  // Recursive component rendering function
  const renderComponents = (
    componentItems: ComponentItem[],
    parentId: string | null = null
  ) => {
    if (!componentItems) return null;

    return componentItems
      .filter((item) => item.parentId === parentId)
      .map((item) => {
        // Check if component has a renderer
        const Component = item.type;
        if (!Component) {
          return (
            <Placeholder
              key={item.id}
              id={item.id}
              name={item.type || "Unknown"}
            />
          );
        }

        const childComponents = renderComponents(componentItems, item.id);

        return (
          <ErrorBoundary key={item.id}>
            <Component
              id={item.id}
              {...item.props}
              data-component-id={item.id}
              onClick={(e: React.MouseEvent) => {
                e.stopPropagation();
                dispatch(setSelectedComponentId(item.id));
              }}
            >
              {childComponents}
            </Component>
          </ErrorBoundary>
        );
      });
  };

  return (
    <div
      className={cn(
        "relative overflow-auto bg-gray-100 w-full h-full",
        className
      )}
    >
      <div
        className="min-h-full flex justify-center p-8 transition-all duration-200"
        style={{ transform: `scale(${canvasScale})` }}
      >
        <div
          ref={canvasRef}
          className={cn(
            "bg-white min-h-screen shadow-lg transition-all duration-200",
            device === "desktop" ? "w-full max-w-screen-xl" : "",
            device === "tablet" ? "w-[768px]" : "",
            device === "mobile" ? "w-[375px]" : ""
          )}
          style={{ width: deviceWidth ? `${deviceWidth}px` : undefined }}
        >
          {/* Canvas content */}
          {components && components.length > 0 ? (
            renderComponents(components)
          ) : (
            <div className="h-screen flex items-center justify-center p-4 text-center">
              <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg p-12 max-w-xl mx-auto">
                <h3 className="text-lg font-medium text-gray-700 mb-2">
                  Your canvas is empty
                </h3>
                <p className="text-gray-500 mb-4">
                  Drag components from the sidebar to start building your
                  website
                </p>
              </div>
            </div>
          )}

          {/* Drop zones are shown when dragging */}
          {isDragging && <Grid />}
        </div>
      </div>
    </div>
  );
};

export default Canvas;
