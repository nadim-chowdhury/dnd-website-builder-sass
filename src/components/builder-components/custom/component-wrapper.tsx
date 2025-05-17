"use client";

import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { getComponent } from "./component-registry";
import { cn } from "@/lib/utils";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

type ComponentWrapperProps = {
  componentId: string;
  props?: Record<string, any>;
  children?: React.ReactNode;
  isEditing?: boolean;
  isSelected?: boolean;
  onSelect?: (id: string) => void;
  className?: string;
  style?: React.CSSProperties;
  wrapperClassName?: string;
  id?: string;
};

/**
 * Wrapper for custom components in the builder
 *
 * This component renders a custom component from the registry and adds
 * editing capabilities when in edit mode.
 */
export const ComponentWrapper = ({
  componentId,
  props = {},
  children,
  isEditing = false,
  isSelected = false,
  onSelect,
  className = "",
  style = {},
  wrapperClassName = "",
  id,
}: ComponentWrapperProps) => {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  // Get the component from the registry
  const componentData = useMemo(() => getComponent(componentId), [componentId]);

  // Handle errors with loading the component
  useEffect(() => {
    if (!componentData && componentId) {
      setError(`Component '${componentId}' not found in registry`);
    } else {
      setError(null);
    }
  }, [componentData, componentId]);

  // If component is not found, render error state
  if (error) {
    return (
      <div
        id={id}
        className={cn(
          "relative flex min-h-[50px] w-full flex-col items-center justify-center rounded border border-dashed p-4",
          isSelected && "border-primary ring-2 ring-primary ring-offset-2",
          wrapperClassName
        )}
        onClick={(e) => {
          if (isEditing && onSelect) {
            e.stopPropagation();
            onSelect(id || "");
          }
        }}
        style={style}
      >
        <Alert variant="destructive" className="mb-2">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
        {isEditing && (
          <div className="mt-2 flex gap-2">
            <button
              className="rounded bg-primary px-2 py-1 text-xs text-primary-foreground"
              onClick={(e) => {
                e.stopPropagation();
                router.push("/builder/components");
              }}
            >
              Manage Components
            </button>
          </div>
        )}
      </div>
    );
  }

  if (!componentData) {
    return null;
  }

  const Component = componentData.component;
  const { editableProps = {}, displayName } = componentData.config;

  // Create merged props with editable values
  const mergedProps = {
    ...props,
    className: cn(className, props.className),
    style: { ...style, ...props.style },
    isEditing,
  };

  // If in editing mode, add wrapper for selection
  if (isEditing) {
    return (
      <div
        id={id}
        className={cn(
          "relative",
          isSelected && "outline outline-2 outline-primary",
          wrapperClassName
        )}
        onClick={(e) => {
          if (onSelect) {
            e.stopPropagation();
            onSelect(id || "");
          }
        }}
        data-component-type={componentId}
        data-component-id={id}
      >
        {isSelected && (
          <div className="absolute -top-6 left-0 z-10 rounded-t bg-primary px-2 py-1 text-xs text-primary-foreground">
            {displayName || componentId}
          </div>
        )}
        <Component {...mergedProps}>{children}</Component>
      </div>
    );
  }

  // In preview/published mode, just render the component
  return (
    <div id={id} className={wrapperClassName}>
      <Component {...mergedProps}>{children}</Component>
    </div>
  );
};

export default ComponentWrapper;
