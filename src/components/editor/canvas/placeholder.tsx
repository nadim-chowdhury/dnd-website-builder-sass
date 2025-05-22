import React from "react";
import { cn } from "@/lib/utils";
import { useDispatch } from "react-redux";
import { selectComponent } from "@/redux/slices/builderSlice";
import { AlertTriangle, Code, Component as ComponentIcon } from "lucide-react";

interface PlaceholderProps {
  id: string;
  name: string;
  className?: string;
  width?: string;
  height?: string;
  children?: React.ReactNode;
  errorMessage?: string;
  type?: "missing" | "error" | "loading" | "empty";
  showDetails?: boolean;
  isSelected?: boolean;
  isHovered?: boolean;
}

/**
 * Enhanced Placeholder component
 * Displayed when a component type is not found, when rendering errors occur,
 * or when components are loading/empty
 */
const Placeholder: React.FC<PlaceholderProps> = ({
  id,
  name,
  className = "",
  width = "100%",
  height = "100px",
  children,
  errorMessage,
  type = "missing",
  showDetails = true,
  isSelected = false,
  isHovered = false,
}) => {
  const dispatch = useDispatch();

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(selectComponent(id));
  };

  const handleDoubleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    // Could trigger edit mode or show component picker
    console.log(`Double clicked placeholder: ${name}`);
  };

  const getPlaceholderConfig = () => {
    switch (type) {
      case "error":
        return {
          borderColor: "border-red-400",
          backgroundColor: "bg-red-50",
          textColor: "text-red-600",
          icon: <AlertTriangle className="h-5 w-5" />,
          title: "Component Error",
          message: errorMessage || `Component "${name}" failed to render`,
        };
      case "loading":
        return {
          borderColor: "border-blue-400",
          backgroundColor: "bg-blue-50",
          textColor: "text-blue-600",
          icon: (
            <div className="animate-spin h-5 w-5 border-2 border-blue-600 border-t-transparent rounded-full" />
          ),
          title: "Loading Component",
          message: `Loading "${name}"...`,
        };
      case "empty":
        return {
          borderColor: "border-gray-400",
          backgroundColor: "bg-gray-50",
          textColor: "text-gray-600",
          icon: <ComponentIcon className="h-5 w-5" />,
          title: "Empty Component",
          message: `"${name}" has no content`,
        };
      case "missing":
      default:
        return {
          borderColor: "border-orange-400",
          backgroundColor: "bg-orange-50",
          textColor: "text-orange-600",
          icon: <Code className="h-5 w-5" />,
          title: "Unknown Component",
          message: `Component type "${name}" is not registered`,
        };
    }
  };

  const config = getPlaceholderConfig();

  return (
    <div
      id={id}
      data-component="placeholder"
      data-component-id={id}
      data-component-type={name}
      className={cn(
        "border-2 border-dashed transition-all duration-200 ease-in-out",
        "flex flex-col items-center justify-center p-4 min-h-16 relative",
        "cursor-pointer select-none",
        config.borderColor,
        config.backgroundColor,
        config.textColor,
        {
          "ring-2 ring-blue-500 ring-opacity-50": isSelected,
          "shadow-md transform scale-105": isHovered,
          "hover:shadow-lg hover:border-opacity-80": !isSelected,
        },
        className
      )}
      style={{
        width,
        height: type === "loading" ? "auto" : height,
        minHeight: type === "loading" ? "60px" : height,
      }}
      onClick={handleClick}
      onDoubleClick={handleDoubleClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          handleClick(e as any);
        }
      }}
    >
      {/* Selection indicator */}
      {isSelected && (
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-blue-500 rounded-full border-2 border-white shadow-sm" />
      )}

      {/* Main content */}
      <div className="flex items-center justify-center mb-2">
        <div className="mr-2 flex-shrink-0">{config.icon}</div>
        <span className="font-medium text-sm whitespace-nowrap">
          {config.title}
        </span>
      </div>

      {showDetails && (
        <div className="text-center space-y-2">
          <p className="text-xs leading-relaxed max-w-xs">{config.message}</p>

          {type === "missing" && (
            <div className="text-xs bg-white bg-opacity-50 rounded px-2 py-1 border border-orange-200">
              <code className="font-mono">{name}</code>
            </div>
          )}

          {type === "error" && errorMessage && (
            <details className="text-xs">
              <summary className="cursor-pointer hover:underline">
                View Error Details
              </summary>
              <div className="mt-2 p-2 bg-white bg-opacity-50 rounded border border-red-200 text-left">
                <code className="font-mono whitespace-pre-wrap break-all">
                  {errorMessage}
                </code>
              </div>
            </details>
          )}
        </div>
      )}

      {/* Custom children content */}
      {children && (
        <div className="mt-3 text-xs opacity-75 text-center">{children}</div>
      )}

      {/* Action hints */}
      {type !== "loading" && (
        <div className="absolute bottom-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="text-xs bg-black bg-opacity-75 text-white px-2 py-1 rounded">
            Click to select • Double-click to edit
          </div>
        </div>
      )}
    </div>
  );
};

// Additional placeholder variants for specific use cases
export const ErrorPlaceholder: React.FC<Omit<PlaceholderProps, "type">> = (
  props
) => <Placeholder {...props} type="error" />;

export const LoadingPlaceholder: React.FC<Omit<PlaceholderProps, "type">> = (
  props
) => <Placeholder {...props} type="loading" />;

export const EmptyPlaceholder: React.FC<Omit<PlaceholderProps, "type">> = (
  props
) => <Placeholder {...props} type="empty" />;

export const MissingPlaceholder: React.FC<Omit<PlaceholderProps, "type">> = (
  props
) => <Placeholder {...props} type="missing" />;

export default Placeholder;
