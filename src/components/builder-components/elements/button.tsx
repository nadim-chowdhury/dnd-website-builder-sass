import React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps {
  id: string;
  content?: string;
  className?: string;
  style?: React.CSSProperties;
  variant?: "primary" | "secondary" | "outline" | "ghost" | "link";
  size?: "sm" | "md" | "lg";
  icon?: string;
  iconPosition?: "left" | "right";
  url?: string;
  onClick?: () => void;
  isEditing?: boolean;
  isSelected?: boolean;
}

const buttonVariants = {
  primary: "bg-primary text-primary-foreground hover:bg-primary/90",
  secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/90",
  outline:
    "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
  ghost: "hover:bg-accent hover:text-accent-foreground",
  link: "text-primary underline-offset-4 hover:underline",
};

const buttonSizes = {
  sm: "h-9 px-3 text-sm",
  md: "h-10 px-4 py-2",
  lg: "h-11 px-8 py-3",
};

/**
 * Button component for the website builder
 * Supports different variants, sizes, and can include icons
 */
export default function Button({
  id,
  content = "Button",
  className = "",
  style = {},
  variant = "primary",
  size = "md",
  icon,
  iconPosition = "left",
  url,
  onClick,
  isEditing = false,
  isSelected = false,
}: ButtonProps) {
  const buttonClasses = cn(
    "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
    buttonVariants[variant],
    buttonSizes[size],
    isSelected && !isEditing && "ring-2 ring-primary",
    className
  );

  const renderIcon = () => {
    if (!icon) return null;

    return (
      <span className={iconPosition === "left" ? "mr-2" : "ml-2"}>
        <i className={`${icon}`}></i>
      </span>
    );
  };

  const inner = (
    <>
      {icon && iconPosition === "left" && renderIcon()}
      <span>{content}</span>
      {icon && iconPosition === "right" && renderIcon()}
    </>
  );

  // In editing mode, we just render a div to prevent navigation
  if (isEditing) {
    return (
      <div
        id={id}
        className={buttonClasses}
        style={style}
        data-component-type="button"
      >
        {inner}
      </div>
    );
  }

  // In preview or published mode, render an actual button or anchor
  if (url) {
    return (
      <a
        id={id}
        href={url}
        className={buttonClasses}
        style={style}
        data-component-type="button"
      >
        {inner}
      </a>
    );
  }

  return (
    <button
      id={id}
      className={buttonClasses}
      style={style}
      onClick={onClick}
      data-component-type="button"
    >
      {inner}
    </button>
  );
}
