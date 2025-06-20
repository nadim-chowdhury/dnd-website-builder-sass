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
import { selectComponents } from "@/redux/selectors/builder-selectors";
import { selectComponent } from "@/redux/slices/builderSlice";
import type {
  Component,
  ComponentType,
  ComponentProps,
} from "@/types/components";
// Import the component registry - adjust the path if needed
import ComponentRegistry from "@/lib/component-registry";

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
  const components = useSelector(selectComponents);
  const { isDragging, draggedItem } = useDragDrop();
  const { selectedComponentId } = useEditorState();

  // Get responsive preview values - note the aliasing for compatibility
  const {
    device,
    responsiveMode,
    width: deviceWidth,
    previewWidth,
  } = useResponsivePreview();

  // Use either device or responsiveMode based on what's available
  const currentDevice = device || responsiveMode;
  // Use either deviceWidth or previewWidth based on what's available
  const currentWidth = deviceWidth || previewWidth;

  const [canvasScale, setCanvasScale] = useState<number>(1);

  // Handle click outside components to deselect
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (canvasRef.current && e.target instanceof Node) {
        if (canvasRef.current.contains(e.target)) {
          // Check if the click was directly on the canvas and not on a component
          if (e.target === canvasRef.current) {
            dispatch(selectComponent(null));
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
      if (currentDevice === "mobile") {
        return 0.5;
      } else if (currentDevice === "tablet") {
        return 0.75;
      }
      return 1;
    };

    setCanvasScale(calculateScale());
  }, [currentDevice]);

  // Recursive component rendering function
  const renderComponents = (
    componentItems: Component[],
    parentId: string | null = null
  ) => {
    if (!componentItems) return null;

    return componentItems
      .filter((item) => item.parentId === parentId)
      .map((item) => {
        // Get the React component from our registry based on component type
        const ComponentToRender =
          ComponentRegistry[item.type as keyof typeof ComponentRegistry];

        if (!ComponentToRender) {
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
            <ComponentToRender
              id={item.id}
              {...item.props}
              data-component-id={item.id}
              onClick={(e: React.MouseEvent) => {
                e.stopPropagation();
                dispatch(selectComponent(item.id));
              }}
            >
              {childComponents}
            </ComponentToRender>
          </ErrorBoundary>
        );
      });
  };

  // Transform components to ensure they match the Component type
  const transformComponents = (): Component[] => {
    if (!components) return [];

    return Object.entries(components).map(([id, component]) => ({
      ...component,
      id,
      props: component.props || ({} as ComponentProps), // Ensure props is never undefined
      // Handle styles properly without explicit type
      styles: component.styles || {},
    }));
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
            currentDevice === "desktop" ? "w-full max-w-screen-xl" : "",
            currentDevice === "tablet" ? "w-[768px]" : "",
            currentDevice === "mobile" ? "w-[375px]" : ""
          )}
          style={{ width: currentWidth ? `${currentWidth}px` : undefined }}
        >
          {/* Canvas content */}
          {components && Object.keys(components).length > 0 ? (
            renderComponents(transformComponents())
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
