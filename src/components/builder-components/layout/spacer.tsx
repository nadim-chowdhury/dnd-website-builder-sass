import React from "react";
import { cn } from "@/lib/utils";
import { useEditorState } from "@/hooks/use-editor-state";

interface SpacerProps {
  id: string;
  height?: number | string;
  className?: string;
  style?: React.CSSProperties;
  dataComponent?: string;
}

/**
 * Spacer component for the website builder
 * Creates vertical space between other components
 */
export const Spacer: React.FC<SpacerProps> = ({
  id,
  height = 4,
  className = "",
  style = {},
  dataComponent = "spacer",
}) => {
  const { selectedComponentId } = useEditorState();
  const isSelected = selectedComponentId === id;

  // Convert height to rem if it's a number
  const heightValue =
    typeof height === "number" ? `${height * 0.25}rem` : height;

  return (
    <div
      id={id}
      data-component={dataComponent}
      className={cn(
        "w-full",
        isSelected &&
          "outline outline-2 outline-blue-500 outline-dashed bg-gray-100/40",
        className
      )}
      style={{
        height: heightValue,
        minHeight: heightValue,
        ...style,
      }}
      data-selected={isSelected}
    >
      {isSelected && (
        <div className="flex items-center justify-center h-full text-xs text-gray-500">
          Spacer: {heightValue}
        </div>
      )}
    </div>
  );
};

export default Spacer;
