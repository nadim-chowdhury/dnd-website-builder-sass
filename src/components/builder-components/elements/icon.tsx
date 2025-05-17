import React from "react";
import { cn } from "@/lib/utils";

export interface IconProps {
  id: string;
  name?: string;
  className?: string;
  style?: React.CSSProperties;
  size?: "sm" | "md" | "lg" | "xl" | "2xl" | "3xl";
  color?: string;
  isEditing?: boolean;
  isSelected?: boolean;
}

const iconSizes = {
  sm: "w-4 h-4",
  md: "w-6 h-6",
  lg: "w-8 h-8",
  xl: "w-10 h-10",
  "2xl": "w-12 h-12",
  "3xl": "w-16 h-16",
};

/**
 * Icon component for the website builder
 * Uses common icon libraries (requires including the appropriate icon library in your project)
 */
export default function Icon({
  id,
  name = "star", // Default icon
  className = "",
  style = {},
  size = "md",
  color,
  isEditing = false,
  isSelected = false,
}: IconProps) {
  // Determine if this is likely a Font Awesome, Material Icons, or other format
  const isFontAwesome = name.startsWith("fa-") || name.includes(" fa-");
  const isMaterialIcons = !isFontAwesome && !name.includes(" ");

  let iconClasses = "";

  if (isFontAwesome) {
    // For Font Awesome icons
    iconClasses = name;
  } else if (isMaterialIcons) {
    // For Material Icons
    iconClasses = "material-icons";
  } else {
    // For other icon libraries or custom icons
    iconClasses = name;
  }

  const combinedClasses = cn(
    "inline-block",
    iconSizes[size],
    isSelected && !isEditing && "ring-2 ring-primary ring-offset-2",
    className
  );

  const combinedStyles = {
    color: color || undefined,
    ...style,
  };

  if (isMaterialIcons) {
    return (
      <span
        id={id}
        className={cn(iconClasses, combinedClasses)}
        style={combinedStyles}
        data-component-type="icon"
      >
        {name}
      </span>
    );
  }

  return (
    <i
      id={id}
      className={cn(iconClasses, combinedClasses)}
      style={combinedStyles}
      data-component-type="icon"
    ></i>
  );
}
