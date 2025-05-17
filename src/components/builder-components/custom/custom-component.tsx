"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

export interface CustomComponentProps {
  id?: string;
  className?: string;
  content?: string;
  settings?: Record<string, any>;
  data?: Record<string, any>;
  isEditing?: boolean;
  isSelected?: boolean;
  children?: React.ReactNode;
  style?: React.CSSProperties;
  [key: string]: any;
}

/**
 * Base component for creating custom components in the builder
 *
 * This component provides a foundation for creating custom components
 * with common functionality like error handling, loading states, etc.
 */
export const CustomComponent = ({
  id,
  className,
  content = "",
  settings = {},
  data = {},
  isEditing = false,
  isSelected = false,
  children,
  style,
  ...rest
}: CustomComponentProps) => {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Handle component initialization
  useEffect(() => {
    const initComponent = async () => {
      try {
        setIsLoading(true);
        // Any initialization logic can go here
        // For example, validating props, fetching initial data, etc.

        // Simulate a brief loading period
        await new Promise((resolve) => setTimeout(resolve, 100));

        // Check for required settings
        if (settings.requiresData && Object.keys(data).length === 0) {
          setError("This component requires data to function properly");
        } else {
          setError(null);
        }
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "An unknown error occurred"
        );
      } finally {
        setIsLoading(false);
      }
    };

    initComponent();
  }, [settings, data]);

  // Handle errors
  if (error && isEditing) {
    return (
      <div
        id={id}
        className={cn(
          "min-h-[100px] w-full rounded border border-dashed p-4",
          isSelected && "border-primary ring-2 ring-primary ring-offset-2",
          className
        )}
        style={style}
      >
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      </div>
    );
  }

  // Handle loading state
  if (isLoading && isEditing) {
    return (
      <div
        id={id}
        className={cn(
          "flex min-h-[100px] w-full items-center justify-center rounded border border-dashed p-4",
          isSelected && "border-primary ring-2 ring-primary ring-offset-2",
          className
        )}
        style={style}
      >
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent"></div>
      </div>
    );
  }

  // Render component content
  const renderContent = () => {
    if (children) {
      return children;
    }

    if (content) {
      return <div dangerouslySetInnerHTML={{ __html: content }} />;
    }

    // Fallback for empty content in edit mode
    if (isEditing) {
      return (
        <div className="flex h-full w-full items-center justify-center p-4 text-sm text-muted-foreground">
          {isSelected
            ? "Edit this component in the sidebar"
            : "Click to select this component"}
        </div>
      );
    }

    return null;
  };

  return (
    <div
      id={id}
      className={cn(
        "custom-component",
        {
          "min-h-[50px] border border-dashed border-muted": isEditing,
          "border-primary": isEditing && isSelected,
        },
        className
      )}
      style={style}
      {...rest}
    >
      {renderContent()}
    </div>
  );
};

export default CustomComponent;
