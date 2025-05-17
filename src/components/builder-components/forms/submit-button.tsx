import React from "react";
import { cn } from "@/lib/utils";

export interface SubmitButtonProps {
  id: string;
  content?: string;
  className?: string;
  style?: React.CSSProperties;
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  icon?: string;
  iconPosition?: "left" | "right";
  disabled?: boolean;
  isEditing?: boolean;
  isSelected?: boolean;
  fullWidth?: boolean;
  loadingText?: string;
}

const buttonVariants = {
  primary: "bg-primary text-primary-foreground hover:bg-primary/90",
  secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/90",
  outline:
    "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
  ghost: "hover:bg-accent hover:text-accent-foreground",
};

const buttonSizes = {
  sm: "h-9 px-3 text-sm",
  md: "h-10 px-4 py-2",
  lg: "h-11 px-8 py-3",
};

/**
 * Submit Button component for the website builder forms
 * Includes loading state and various styling options
 */
export default function SubmitButton({
  id,
  content = "Submit",
  className = "",
  style = {},
  variant = "primary",
  size = "md",
  icon,
  iconPosition = "left",
  disabled = false,
  isEditing = false,
  isSelected = false,
  fullWidth = false,
  loadingText = "Submitting...",
}: SubmitButtonProps) {
  const buttonClasses = cn(
    "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
    buttonVariants[variant],
    buttonSizes[size],
    fullWidth && "w-full",
    isSelected && !isEditing && "ring-2 ring-primary",
    className
  );

  const renderIcon = (iconName: string) => {
    return (
      <span className={iconPosition === "left" ? "mr-2" : "ml-2"}>
        <i className={`${iconName}`}></i>
      </span>
    );
  };

  // Spinner for loading state
  const renderSpinner = () => (
    <svg
      className="animate-spin -ml-1 mr-2 h-4 w-4 text-current"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      ></circle>
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      ></path>
    </svg>
  );

  // In editing mode, buttons never show loading state
  // They are also not actually clickable
  if (isEditing) {
    return (
      <div
        id={id}
        className={buttonClasses}
        style={style}
        data-component-type="submit-button"
      >
        {icon && iconPosition === "left" && renderIcon(icon)}
        <span>{content}</span>
        {icon && iconPosition === "right" && renderIcon(icon)}
      </div>
    );
  }

  // In preview/published mode, we render an actual button
  return (
    <button
      id={id}
      type="submit"
      className={buttonClasses}
      style={style}
      disabled={disabled}
      data-component-type="submit-button"
    >
      {/* Show different content based on form state */}
      <>
        {/* This would show when form is actually submitting */}
        {/* {isLoading && (
          <>
            {renderSpinner()}
            <span>{loadingText}</span>
          </>
        )} */}

        {/* Regular state */}
        {/* {!isLoading && ( */}
        <>
          {icon && iconPosition === "left" && renderIcon(icon)}
          <span>{content}</span>
          {icon && iconPosition === "right" && renderIcon(icon)}
        </>
        {/* )} */}
      </>
    </button>
  );
}
